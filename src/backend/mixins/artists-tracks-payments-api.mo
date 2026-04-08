import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "../types/artists-tracks-payments";
import Lib "../lib/artists-tracks-payments";

mixin (
  accessControlState : AccessControl.AccessControlState,
  credentials        : Map.Map<Text, Types.ArtistCredential>,
  artists            : Map.Map<Text, Types.ArtistProfile>,
  tracks             : Map.Map<Nat, Types.TrackMetadata>,
  sales              : List.List<Types.Sale>,
  banking            : Map.Map<Text, Types.BankingInfo>,
  payouts            : List.List<Types.Payout>,
  storeComments      : List.List<Types.StoreComment>,
  nextTrackId        : { var value : Nat },
  nextSaleId         : { var value : Nat },
  nextPayoutId       : { var value : Nat },
  nextCommentId      : { var value : Nat },
  stripeConfig       : { var value : ?Stripe.StripeConfiguration },
  transform          : OutCall.Transform,
) {

  // Lockout window: 15 minutes in nanoseconds
  let LOCKOUT_WINDOW_NS : Int = 15 * 60 * 1_000_000_000;
  let MAX_RECOVERY_ATTEMPTS : Nat = 3;

  func requireStripeConfig() : Stripe.StripeConfiguration {
    switch (stripeConfig.value) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  // ─── Token helpers ────────────────────────────────────────────────────────

  // Generate a simple opaque token from timestamp + name
  func generateToken(name : Text) : Text {
    let ts = Time.now();
    ts.toText() # ":" # name;
  };

  // Look up ArtistId by session token; returns null if token is invalid
  func resolveToken(token : Text) : ?Types.ArtistId {
    var found : ?Types.ArtistId = null;
    credentials.forEach(func(artistId, cred) {
      if (found == null) {
        let tokens = cred.sessionTokens;
        let hasToken = tokens.find(func(t : Text) : Bool { t == token });
        switch (hasToken) {
          case (?_) { found := ?artistId };
          case null {};
        };
      };
    });
    found;
  };

  // ─── Auth: Signup ─────────────────────────────────────────────────────────
  public shared func signupArtist(name : Text, pinHash : Text) : async { #ok : Types.ArtistProfilePublic; #err : Text } {
    if (name.size() < 2) {
      return #err("Name must be at least 2 characters");
    };
    if (pinHash.size() == 0) {
      return #err("PIN hash must not be empty");
    };
    if (artists.containsKey(name)) {
      return #err("An artist with that name already exists");
    };
    let now = Time.now();
    let profile : Types.ArtistProfile = {
      id               = name;
      var name         = name;
      var bio          = "";
      var status       = #active;
      var instagram    = null;
      var twitterX     = null;
      var tiktok       = null;
      var youtube      = null;
      var facebook     = null;
      var soundcloud   = null;
      var spotify      = null;
      var appleMusic   = null;
      var website      = null;
      createdAt        = now;
    };
    let cred : Types.ArtistCredential = {
      artistId                   = name;
      var pinHash                = pinHash;
      var sessionTokens          = [];
      var lastLoginAt            = null;
      var securityQuestion       = null;
      var securityAnswerHash     = null;
      var failedRecoveryAttempts = 0;
      var lastFailedRecoveryAt   = null;
    };
    artists.add(name, profile);
    credentials.add(name, cred);
    #ok(Lib.toPublicProfile(profile));
  };

  // ─── Auth: Login ──────────────────────────────────────────────────────────
  public shared func loginArtist(name : Text, pinHash : Text) : async { #ok : Text; #err : Text } {
    switch (credentials.get(name)) {
      case null { #err("Artist not found") };
      case (?cred) {
        if (cred.pinHash != pinHash) {
          return #err("Incorrect PIN");
        };
        // Check account status before issuing a token
        switch (artists.get(name)) {
          case null { return #err("Artist profile not found") };
          case (?p) {
            switch (p.status) {
              case (#suspended) { return #err("Your account has been suspended. Please contact support.") };
              case (#deleted)   { return #err("This account no longer exists.") };
              case (#active)    {};
            };
          };
        };
        let token = generateToken(name);
        cred.sessionTokens := cred.sessionTokens.concat([token]);
        cred.lastLoginAt   := ?Time.now();
        #ok(token);
      };
    };
  };

  // ─── Auth: Validate Session ───────────────────────────────────────────────
  public query func validateSession(token : Text) : async { #ok : Types.ArtistId; #err : Text } {
    switch (resolveToken(token)) {
      case null    { #err("Invalid or expired session token") };
      case (?aid)  { #ok(aid) };
    };
  };

  // ─── Auth: Logout ─────────────────────────────────────────────────────────
  public shared func logoutArtist(token : Text) : async { #ok; #err : Text } {
    switch (resolveToken(token)) {
      case null { #err("Token not found") };
      case (?artistId) {
        switch (credentials.get(artistId)) {
          case null { #err("Credential record missing") };
          case (?cred) {
            cred.sessionTokens := cred.sessionTokens.filter(func(t : Text) : Bool { t != token });
            #ok;
          };
        };
      };
    };
  };

  // ─── Auth: Change PIN ─────────────────────────────────────────────────────
  public shared func changePIN(token : Text, currentPinHash : Text, newPinHash : Text) : async { #ok; #err : Text } {
    if (newPinHash.size() == 0) {
      return #err("New PIN hash must not be empty");
    };
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (credentials.get(artistId)) {
      case null { #err("Credential record missing") };
      case (?cred) {
        if (cred.pinHash != currentPinHash) {
          return #err("Current PIN is incorrect");
        };
        cred.pinHash := newPinHash;
        #ok;
      };
    };
  };

  // ─── Security Question: Set / Clear ──────────────────────────────────────
  // Passing an empty question string clears the security question.
  public shared func setArtistSecurityQuestion(token : Text, question : Text, answerHash : Text) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (credentials.get(artistId)) {
      case null    { #err("Credential record missing") };
      case (?cred) {
        if (question.size() == 0) {
          // Empty question = clear/remove the security question
          cred.securityQuestion   := null;
          cred.securityAnswerHash := null;
        } else {
          cred.securityQuestion   := ?question;
          cred.securityAnswerHash := ?answerHash;
        };
        #ok;
      };
    };
  };

  // ─── Security Question: Get (public, no auth) ─────────────────────────────
  public query func getArtistSecurityQuestion(artistName : Text) : async ?Text {
    switch (credentials.get(artistName)) {
      case null    { null };
      case (?cred) { cred.securityQuestion };
    };
  };

  // ─── PIN Recovery via Security Answer ────────────────────────────────────
  public shared func resetPINWithSecurityAnswer(artistName : Text, answerHash : Text, newPINHash : Text) : async { #ok; #err : Text } {
    if (newPINHash.size() == 0) {
      return #err("New PIN hash must not be empty");
    };
    switch (credentials.get(artistName)) {
      case null    { return #err("Artist not found") };
      case (?cred) {
        let now = Time.now();

        // (a)/(b) Lockout check: >= MAX_RECOVERY_ATTEMPTS failures within LOCKOUT_WINDOW_NS
        if (cred.failedRecoveryAttempts >= MAX_RECOVERY_ATTEMPTS) {
          switch (cred.lastFailedRecoveryAt) {
            case (?lastFailed) {
              let elapsed = now - lastFailed;
              if (elapsed < LOCKOUT_WINDOW_NS) {
                let remainingSecs = (LOCKOUT_WINDOW_NS - elapsed) / 1_000_000_000;
                return #err("Too many failed attempts. Try again in " # remainingSecs.toText() # " seconds");
              };
              // Lockout window has passed — reset the counter
              cred.failedRecoveryAttempts := 0;
              cred.lastFailedRecoveryAt   := null;
            };
            case null {
              // Inconsistent state: attempts >= max but no timestamp — reset
              cred.failedRecoveryAttempts := 0;
            };
          };
        };

        // (c) Verify the security answer
        switch (cred.securityAnswerHash) {
          case null {
            return #err("No security question has been set for this account");
          };
          case (?storedHash) {
            if (storedHash != answerHash) {
              // (d) Wrong answer — increment attempts
              cred.failedRecoveryAttempts += 1;
              cred.lastFailedRecoveryAt   := ?now;
              let remaining : Nat = if (MAX_RECOVERY_ATTEMPTS > cred.failedRecoveryAttempts) {
                MAX_RECOVERY_ATTEMPTS - cred.failedRecoveryAttempts
              } else { 0 };
              return #err("Incorrect answer. " # remaining.toText() # " attempt(s) remaining");
            };
          };
        };

        // (e) Correct answer — reset PIN, clear sessions, reset attempt counters
        cred.pinHash                := newPINHash;
        cred.sessionTokens          := [];
        cred.failedRecoveryAttempts := 0;
        cred.lastFailedRecoveryAt   := null;
        #ok;
      };
    };
  };

  // ─── Artist Profile ───────────────────────────────────────────────────────
  public query func getMyArtistProfile(token : Text) : async ?Types.ArtistProfilePublic {
    switch (resolveToken(token)) {
      case null        { null };
      case (?artistId) {
        switch (artists.get(artistId)) {
          case null  { null };
          case (?p)  { ?Lib.toPublicProfile(p) };
        };
      };
    };
  };

  public shared func updateArtistProfile(token : Text, name : Text, bio : Text) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (artists.get(artistId)) {
      case null  { #err("Artist profile not found") };
      case (?p)  {
        p.name := name;
        p.bio  := bio;
        #ok;
      };
    };
  };

  public shared func deleteArtistAccount(token : Text) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    if (not artists.containsKey(artistId)) {
      return #err("Artist profile not found");
    };
    // Mark all tracks as deleted
    tracks.forEach(func(_, t) {
      if (t.artistId == artistId) {
        t.state := #deleted;
      };
    });
    artists.remove(artistId);
    banking.remove(artistId);
    credentials.remove(artistId);
    #ok;
  };

  // ─── Track Upload & Management ────────────────────────────────────────────
  public shared func uploadTrack(token : Text, input : Types.TrackUploadInput) : async { #ok : Types.TrackId; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    if (not artists.containsKey(artistId)) {
      return #err("Must be a registered artist to upload tracks");
    };
    // Suspended artists cannot upload
    switch (artists.get(artistId)) {
      case (?p) {
        switch (p.status) {
          case (#suspended) { return #err("Your account has been suspended and cannot upload tracks.") };
          case (#deleted)   { return #err("This account no longer exists.") };
          case (#active)    {};
        };
      };
      case null {};
    };
    if (input.priceInCents < 1) {
      return #err("Price must be at least 1 cent");
    };
    let startSecs : Float = switch (input.previewStartSecs) {
      case (?s) { s };
      case null { 0.0 };
    };
    let endSecs : Float = switch (input.previewEndSecs) {
      case (?e) { e };
      case null { startSecs + 30.0 };
    };
    let details : Text = switch (input.songDetails) {
      case (?d) { d };
      case null { "" };
    };
    let id = nextTrackId.value;
    nextTrackId.value += 1;
    let track : Types.TrackMetadata = {
      id                    = id;
      artistId              = artistId;
      var title             = input.title;
      var artistName        = input.artistName;
      var genre             = input.genre;
      var trackType         = input.trackType;
      var priceInCents      = input.priceInCents;
      var description       = input.description;
      var releaseDate       = input.releaseDate;
      var explicit          = input.explicit;
      var preOrder          = input.preOrder;
      var state             = #uploaded;
      var previewCount      = 0;
      var saleCount         = 0;
      var previewStartSecs  = startSecs;
      var previewEndSecs    = endSecs;
      var songDetails       = details;
      audioFile             = input.audioFile;
      coverArt              = input.coverArt;
      createdAt             = Time.now();
    };
    tracks.add(id, track);
    #ok(id);
  };

  public shared func publishTrack(token : Text, trackId : Types.TrackId) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (tracks.get(trackId)) {
      case null  { #err("Track not found") };
      case (?t)  {
        if (t.artistId != artistId) {
          return #err("Unauthorized: Not your track");
        };
        switch (t.state) {
          case (#deleted) { #err("Cannot publish a deleted track") };
          case _          { t.state := #published; #ok };
        };
      };
    };
  };

  public shared func unpublishTrack(token : Text, trackId : Types.TrackId) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (tracks.get(trackId)) {
      case null  { #err("Track not found") };
      case (?t)  {
        if (t.artistId != artistId) {
          return #err("Unauthorized: Not your track");
        };
        switch (t.state) {
          case (#deleted) { #err("Cannot unpublish a deleted track") };
          case _          { t.state := #uploaded; #ok };
        };
      };
    };
  };

  public shared func deleteTrack(token : Text, trackId : Types.TrackId) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (tracks.get(trackId)) {
      case null  { #err("Track not found") };
      case (?t)  {
        if (t.artistId != artistId) {
          return #err("Unauthorized: Not your track");
        };
        t.state := #deleted;
        #ok;
      };
    };
  };

  public shared func updateTrackMetadata(
    token            : Text,
    trackId          : Types.TrackId,
    title            : Text,
    genre            : Text,
    priceInCents     : Nat,
    description      : Text,
    releaseDate      : Text,
    explicit         : Bool,
    preOrder         : Bool,
    previewStartSecs : ?Float,
    previewEndSecs   : ?Float,
    songDetails      : ?Text,
  ) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (tracks.get(trackId)) {
      case null  { #err("Track not found") };
      case (?t)  {
        if (t.artistId != artistId) {
          return #err("Unauthorized: Not your track");
        };
        if (priceInCents < 1) {
          return #err("Price must be at least 1 cent");
        };
        t.title        := title;
        t.genre        := genre;
        t.priceInCents := priceInCents;
        t.description  := description;
        t.releaseDate  := releaseDate;
        t.explicit     := explicit;
        t.preOrder     := preOrder;
        switch (previewStartSecs) {
          case (?s) { t.previewStartSecs := s };
          case null {};
        };
        switch (previewEndSecs) {
          case (?e) { t.previewEndSecs := e };
          case null {};
        };
        switch (songDetails) {
          case (?d) { t.songDetails := d };
          case null {};
        };
        #ok;
      };
    };
  };

  // ─── Artist Profile Page: all published tracks by a given artist ─────────
  public query func getTracksByArtist(artistId : Types.ArtistId) : async [Types.TrackMetadataPublic] {
    tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool {
        t.artistId == artistId and (switch (t.state) { case (#published) true; case _ false })
      })
      .map<Types.TrackMetadata, Types.TrackMetadataPublic>(func(t) { Lib.toPublicTrack(t, 0) })
      .toArray();
  };

  // ─── Public Artist Profile (for fans) ─────────────────────────────────────
  public query func getArtistProfile(artistId : Types.ArtistId) : async { #ok : Types.ArtistProfilePublic; #err : Text } {
    switch (artists.get(artistId)) {
      case null  { #err("Artist not found") };
      case (?p)  {
        switch (p.status) {
          case (#deleted)   { #err("Artist not found") };
          case (#suspended) { #err("This artist account is currently suspended") };
          case (#active)    { #ok(Lib.toPublicProfile(p)) };
        };
      };
    };
  };

  // ─── Update Artist Social Links ───────────────────────────────────────────
  public shared func updateArtistSocialLinks(token : Text, links : Types.ArtistSocialLinks) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (artists.get(artistId)) {
      case null  { #err("Artist profile not found") };
      case (?p)  {
        p.instagram    := links.instagram;
        p.twitterX     := links.twitterX;
        p.tiktok       := links.tiktok;
        p.youtube      := links.youtube;
        p.facebook     := links.facebook;
        p.soundcloud   := links.soundcloud;
        p.spotify      := links.spotify;
        p.appleMusic   := links.appleMusic;
        p.website      := links.website;
        #ok;
      };
    };
  };

  // ─── Music Store ──────────────────────────────────────────────────────────
  public query func listPublishedTracks() : async [Types.TrackMetadataPublic] {
    tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool {
        switch (t.state) { case (#published) true; case _ false };
      })
      .map<Types.TrackMetadata, Types.TrackMetadataPublic>(func(t) { Lib.toPublicTrack(t, 0) })
      .toArray();
  };

  public query func searchTracks(searchTerm : Text) : async [Types.TrackMetadataPublic] {
    let lower = searchTerm.toLower();
    tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool {
        switch (t.state) { case (#published) true; case _ false };
      })
      .filter(func(t : Types.TrackMetadata) : Bool {
        t.title.toLower().contains(#text lower) or t.artistName.toLower().contains(#text lower)
      })
      .map<Types.TrackMetadata, Types.TrackMetadataPublic>(func(t) { Lib.toPublicTrack(t, 0) })
      .toArray();
  };

  public query func filterTracksByGenre(genre : Text) : async [Types.TrackMetadataPublic] {
    let lower = genre.toLower();
    tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool {
        switch (t.state) { case (#published) true; case _ false };
      })
      .filter(func(t : Types.TrackMetadata) : Bool {
        t.genre.toLower() == lower
      })
      .map<Types.TrackMetadata, Types.TrackMetadataPublic>(func(t) { Lib.toPublicTrack(t, 0) })
      .toArray();
  };

  public query func getTrack(trackId : Types.TrackId) : async ?Types.TrackMetadataPublic {
    switch (tracks.get(trackId)) {
      case null  { null };
      case (?t)  { ?Lib.toPublicTrack(t, 0) };
    };
  };

  // ─── Preview Tracking ────────────────────────────────────────────────────
  public shared func incrementPreviewCount(trackId : Types.TrackId) : async () {
    switch (tracks.get(trackId)) {
      case null  { Runtime.trap("Track not found") };
      case (?t)  { t.previewCount += 1 };
    };
  };

  // ─── Purchase / Stripe Checkout ──────────────────────────────────────────
  public shared func createTrackCheckoutSession(
    token      : Text,
    trackId    : Types.TrackId,
    successUrl : Text,
    cancelUrl  : Text,
  ) : async { #ok : Text; #err : Text } {
    // token is optional — if provided and valid, it associates the session with
    // a customer or artist account for re-downloads. Anonymous purchases are allowed.
    let cfg = requireStripeConfig();
    let t = switch (tracks.get(trackId)) {
      case null  { return #err("Track not found") };
      case (?t)  { t };
    };
    switch (t.state) {
      case (#published) {};
      case (#preOrder)  {};
      case _            { return #err("Track is not available for purchase") };
    };
    let item : Stripe.ShoppingItem = {
      currency           = "usd";
      productName        = t.title;
      productDescription = t.artistName # " - " # t.genre;
      priceInCents       = t.priceInCents;
      quantity           = 1;
    };
    let url = await Stripe.createCheckoutSession(cfg, Principal.anonymous(), [item], successUrl, cancelUrl, transform);
    #ok(url);
  };

  public func getStripeSessionStatus_internal(sessionId : Text) : async Stripe.StripeSessionStatus {
    let cfg = requireStripeConfig();
    await Stripe.getSessionStatus(cfg, sessionId, transform);
  };

  public shared func fulfillTrackPurchase(
    token           : Text,
    trackId         : Types.TrackId,
    stripeSessionId : Text,
    buyerEmail      : ?Text,
  ) : async { #ok; #err : Text } {
    // token is optional — used only to associate the sale with a known buyer for re-downloads.
    // If token is empty or invalid, the sale is recorded as an anonymous/guest purchase.
    let resolvedBuyerToken : Text = switch (resolveToken(token)) {
      case (?_aid) { token };
      case null    { token }; // keep whatever was passed (may be a customer token or empty)
    };
    let t = switch (tracks.get(trackId)) {
      case null  { return #err("Track not found") };
      case (?t)  { t };
    };
    // Prevent duplicate fulfillment
    let alreadyFulfilled = sales.find(func(s : Types.Sale) : Bool {
      s.stripeSessionId == stripeSessionId and s.trackId == trackId
    });
    switch (alreadyFulfilled) {
      case (?_) { return #err("Purchase already fulfilled") };
      case null {};
    };

    let gross    = t.priceInCents;
    let earnings = Lib.artistEarnings(gross);
    let fee      = Lib.platformFee(gross);

    let saleId = nextSaleId.value;
    nextSaleId.value += 1;
    let sale : Types.Sale = {
      id                  = saleId;
      trackId             = trackId;
      artistId            = t.artistId;
      buyerToken          = resolvedBuyerToken;
      buyerEmail          = buyerEmail;
      grossAmountCents    = gross;
      artistEarningsCents = earnings;
      platformFeeCents    = fee;
      stripeSessionId     = stripeSessionId;
      createdAt           = Time.now();
    };
    sales.add(sale);
    t.saleCount += 1;
    #ok;
  };

  // ─── Artist Dashboard ─────────────────────────────────────────────────────
  public query func getArtistDashboardStats(token : Text) : async { #ok : Types.ArtistDashboardStats; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let artistTracks = tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool { t.artistId == artistId })
      .toArray();
    let artistSales = sales.filter(func(s : Types.Sale) : Bool { s.artistId == artistId })
      .toArray();
    #ok(Lib.computeDashboardStats(artistTracks, artistSales));
  };

  public query func getArtistTracks(token : Text) : async { #ok : [Types.ArtistTrackSummary]; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let result = tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool { t.artistId == artistId })
      .filter(func(t : Types.TrackMetadata) : Bool {
        switch (t.state) { case (#deleted) false; case _ true };
      })
      .map(func(t : Types.TrackMetadata) : Types.ArtistTrackSummary { Lib.toTrackSummary(t) })
      .toArray();
    #ok(result);
  };

  // ─── Royalty Dashboard ───────────────────────────────────────────────────
  public query func getRoyaltyDashboard(token : Text, periodLabel : Text) : async { #ok : Types.RoyaltyDashboard; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let artistTracks = tracks.values()
      .filter(func(t : Types.TrackMetadata) : Bool { t.artistId == artistId })
      .toArray();
    let artistSales = sales.filter(func(s : Types.Sale) : Bool { s.artistId == artistId })
      .toArray();
    let artistPayouts = payouts.filter(func(p : Types.Payout) : Bool { p.artistId == artistId })
      .toArray();

    var totalEarned : Nat = 0;
    for (s in artistSales.values()) {
      totalEarned += s.artistEarningsCents;
    };
    var totalPaidOut : Nat = 0;
    for (p in artistPayouts.values()) {
      switch (p.status) {
        case (#processed) { totalPaidOut += p.amountCents };
        case _            {};
      };
    };
    var available : Nat = 0;
    if (totalEarned > totalPaidOut) { available := totalEarned - totalPaidOut };

    #ok(Lib.computeRoyaltyDashboard(artistTracks, artistSales, artistPayouts, available, periodLabel));
  };

  // ─── Banking Info ────────────────────────────────────────────────────────
  public query func getBankingInfo(token : Text) : async { #ok : ?Types.BankingInfoPublic; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    switch (banking.get(artistId)) {
      case null  { #ok(null) };
      case (?b)  { #ok(?Lib.toPublicBanking(b)) };
    };
  };

  public shared func saveBankingInfo(
    token             : Text,
    accountHolderName : Text,
    bankName          : Text,
    routingNumber     : Text,
    accountNumber     : Text,
  ) : async { #ok; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    if (not artists.containsKey(artistId)) {
      return #err("Must be a registered artist");
    };
    switch (banking.get(artistId)) {
      case (?b) {
        b.accountHolderName := accountHolderName;
        b.bankName          := bankName;
        b.routingNumber     := routingNumber;
        b.accountNumber     := accountNumber;
        b.updatedAt         := Time.now();
      };
      case null {
        let info : Types.BankingInfo = {
          artistId              = artistId;
          var accountHolderName = accountHolderName;
          var bankName          = bankName;
          var routingNumber     = routingNumber;
          var accountNumber     = accountNumber;
          var updatedAt         = Time.now();
        };
        banking.add(artistId, info);
      };
    };
    #ok;
  };

  // ─── Payout ──────────────────────────────────────────────────────────────
  public shared func requestPayout(token : Text, amountCents : Nat) : async { #ok : Types.PayoutId; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    if (not artists.containsKey(artistId)) {
      return #err("Must be a registered artist");
    };
    if (amountCents == 0) {
      return #err("Payout amount must be greater than zero");
    };

    var totalEarned : Nat = 0;
    sales.forEach(func(s : Types.Sale) {
      if (s.artistId == artistId) {
        totalEarned += s.artistEarningsCents;
      };
    });
    var totalPaidOut : Nat = 0;
    payouts.forEach(func(p : Types.Payout) {
      if (p.artistId == artistId) {
        switch (p.status) {
          case (#processed) { totalPaidOut += p.amountCents };
          case _            {};
        };
      };
    });
    var available : Nat = 0;
    if (totalEarned > totalPaidOut) { available := totalEarned - totalPaidOut };
    if (amountCents > available) {
      return #err("Insufficient available balance");
    };

    let id = nextPayoutId.value;
    nextPayoutId.value += 1;
    let payout : Types.Payout = {
      id              = id;
      artistId        = artistId;
      amountCents     = amountCents;
      var status      = #pending;
      requestedAt     = Time.now();
      var processedAt = null;
    };
    payouts.add(payout);
    #ok(id);
  };

  public query func getMyPayouts(token : Text) : async { #ok : [Types.PayoutPublic]; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let result = payouts.filter(func(p : Types.Payout) : Bool { p.artistId == artistId })
      .map<Types.Payout, Types.PayoutPublic>(func(p) { Lib.toPublicPayout(p) })
      .toArray();
    #ok(result);
  };

  // ─── Store Comments / Ratings ────────────────────────────────────────────
  public shared func addStoreComment(token : Text, authorName : Text, body : Text, rating : Nat) : async { #ok : Types.CommentId; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Must be logged in to leave a comment") };
      case (?aid)  { aid };
    };
    if (rating < 1 or rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    let id = nextCommentId.value;
    nextCommentId.value += 1;
    let comment : Types.StoreComment = {
      id             = id;
      authorId       = artistId;
      var authorName = authorName;
      var body       = body;
      rating         = rating;
      createdAt      = Time.now();
    };
    storeComments.add(comment);
    #ok(id);
  };

  public query func listStoreComments() : async [Types.StoreCommentPublic] {
    storeComments.map<Types.StoreComment, Types.StoreCommentPublic>(func(c) { Lib.toPublicComment(c) })
      .toArray();
  };

  // ─── Purchase History ────────────────────────────────────────────────────
  public query func getPurchasedTracks(token : Text) : async { #ok : [Types.TrackMetadataPublic]; #err : Text } {
    let artistId = switch (resolveToken(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    // Collect unique trackIds purchased by this buyer (buyerToken == artistId)
    let result = sales
      .filter(func(s : Types.Sale) : Bool { s.buyerToken == artistId })
      .map<Types.Sale, ?Types.TrackMetadataPublic>(func(s) {
        switch (tracks.get(s.trackId)) {
          case null  { null };
          case (?t)  { ?Lib.toPublicTrack(t, 0) };
        };
      })
      .filter(func(item : ?Types.TrackMetadataPublic) : Bool { item != null })
      .map<(?Types.TrackMetadataPublic), Types.TrackMetadataPublic>(func(item) {
        switch (item) {
          case (?t) { t };
          case null { Runtime.trap("unreachable") };
        };
      })
      .toArray();
    #ok(result);
  };
};
