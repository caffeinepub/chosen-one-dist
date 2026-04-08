import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import TrackTypes "../types/artists-tracks-payments";
import Types "../types/analytics-notifications";
import Lib "../lib/analytics-notifications";

mixin (
  accessControlState : AccessControl.AccessControlState,
  credentials        : Map.Map<Text, TrackTypes.ArtistCredential>,
  artists            : Map.Map<Text, TrackTypes.ArtistProfile>,
  tracks             : Map.Map<Nat, TrackTypes.TrackMetadata>,
  sales              : List.List<TrackTypes.Sale>,
  notifications      : List.List<Types.Notification>,
  mailingSubscribers : List.List<Types.MailingSubscriber>,
  nextNotifId        : { var value : Nat },
  storeLikes         : Map.Map<TrackTypes.ArtistId, Set.Set<Text>>,
) {

  // ─── Token resolution (local to analytics mixin) ─────────────────────────

  func resolveTokenAnalytics(token : Text) : ?TrackTypes.ArtistId {
    var found : ?TrackTypes.ArtistId = null;
    credentials.forEach(func(artistId, cred) {
      if (found == null) {
        let hasToken = cred.sessionTokens.find(func(t : Text) : Bool { t == token });
        switch (hasToken) {
          case (?_) { found := ?artistId };
          case null {};
        };
      };
    });
    found;
  };

  // ─── Internal: push a notification ───────────────────────────────────────

  func pushNotification(notifType : Types.NotificationType, message : Text, artistId : TrackTypes.ArtistId, recipientToken : ?Text) {
    let id = nextNotifId.value;
    nextNotifId.value += 1;
    let n = Lib.makeNotification(id, notifType, message, artistId, recipientToken);
    notifications.add(n);
  };

  // ─── Public: called by frontend after artist signs up ────────────────────
  public shared func notifyArtistJoined(artistName : Text) : async () {
    pushNotification(
      #artistJoined,
      artistName # " just joined Chosen One Productions Distribution!",
      artistName,
      null,
    );
  };

  // ─── Public: called by frontend after track is uploaded ──────────────────
  public shared func notifyTrackUploaded(token : Text, trackTitle : Text) : async () {
    let artistId = switch (resolveTokenAnalytics(token)) {
      case null    { Runtime.trap("Invalid session token") };
      case (?aid)  { aid };
    };
    pushNotification(
      #trackUploaded,
      artistId # " uploaded a new track: " # trackTitle,
      artistId,
      null,
    );
    // Fan-out: push a #newDrop notification targeted at each customer who liked this artist's store
    let artistName = switch (artists.get(artistId)) {
      case (?p) { p.name };
      case null { artistId };
    };
    switch (storeLikes.get(artistId)) {
      case null {};
      case (?likers) {
        likers.forEach(func(likerToken : Text) {
          pushNotification(
            #newDrop,
            "New drop: " # trackTitle # " by " # artistName # " — available now on Chosen One Distribution",
            artistId,
            ?likerToken,
          );
        });
      };
    };
  };

  // ─── Public: called internally after a sale is fulfilled ─────────────────
  public shared func notifyNewSale(artistId : TrackTypes.ArtistId, trackTitle : Text) : async () {
    pushNotification(
      #newSale,
      "New sale for \"" # trackTitle # "\" by " # artistId,
      artistId,
      null,
    );
  };

  // ─── Public: called internally after a comment is posted ─────────────────
  public shared func notifyNewComment(artistId : TrackTypes.ArtistId, authorName : Text) : async () {
    pushNotification(
      #newComment,
      authorName # " left a comment on one of your tracks",
      artistId,
      null,
    );
  };

  // ─── Retrieve recent notifications ────────────────────────────────────────
  // Supports artist session tokens (broadcasts to that artist) AND anonymous
  // customer likerTokens (returns their targeted #newDrop fan notifications).
  public query func getRecentNotifications(token : Text) : async [Types.Notification] {
    // Check if token resolves to an artist session
    let artistIdOpt = resolveTokenAnalytics(token);
    switch (artistIdOpt) {
      case (?artistId) {
        // Return broadcast notifications (recipientToken == null) for this artist
        // plus any targeted notifications addressed to this artist's token
        let total = notifications.size();
        let start : Int = if (total > 50) { total - 50 } else { 0 };
        notifications
          .range(start, total)
          .filter(func(n : Types.Notification) : Bool {
            n.artistId == artistId and (
              switch (n.recipientToken) {
                case null    { true };   // broadcast notification for this artist
                case (?_rt)  { false };  // fan-targeted: skip for artist view
              }
            )
          })
          .toArray()
          .reverse();
      };
      case null {
        // Not an artist — treat token as a customer likerToken and return their fan drops
        let total = notifications.size();
        let start : Int = if (total > 50) { total - 50 } else { 0 };
        notifications
          .range(start, total)
          .filter(func(n : Types.Notification) : Bool {
            switch (n.recipientToken) {
              case (?rt) { rt == token };
              case null  { false };
            }
          })
          .toArray()
          .reverse();
      };
    };
  };

  // ─── Real-time dashboard stats ────────────────────────────────────────────
  public query func getRealTimeDashboardStats(token : Text) : async { #ok : Types.RealTimeDashboardStats; #err : Text } {
    let artistId = switch (resolveTokenAnalytics(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let artistTracks = tracks.values()
      .filter(func(t : TrackTypes.TrackMetadata) : Bool { t.artistId == artistId })
      .toArray();
    let artistSales = sales
      .filter(func(s : TrackTypes.Sale) : Bool { s.artistId == artistId })
      .toArray();
    #ok(Lib.computeRealTimeStats(artistTracks, artistSales));
  };

  // ─── Download report ──────────────────────────────────────────────────────
  public query func getDownloadReport(token : Text) : async { #ok : [Types.DownloadReportEntry]; #err : Text } {
    let artistId = switch (resolveTokenAnalytics(token)) {
      case null    { return #err("Invalid or expired session token") };
      case (?aid)  { aid };
    };
    let report = Lib.buildDownloadReport(
      artistId,
      sales,
      func(trackId) { tracks.get(trackId) },
    );
    #ok(report);
  };

  // ─── Mailing list: subscribe ──────────────────────────────────────────────
  public shared func subscribeToMailingList(email : Text) : async { #ok; #err : Text } {
    if (email.size() < 3 or not email.contains(#char '@')) {
      return #err("Invalid email address");
    };
    // De-duplicate: skip if already subscribed
    let alreadySubscribed = mailingSubscribers.find(func(s : Types.MailingSubscriber) : Bool {
      s.email == email
    });
    switch (alreadySubscribed) {
      case (?_) { return #err("Email already subscribed") };
      case null {};
    };
    mailingSubscribers.add(Lib.makeSubscriber(email));
    #ok;
  };

  // ─── Mailing list: admin-only get all subscribers ─────────────────────────
  public query ({ caller }) func getMailingListSubscribers() : async [Text] {
    if (not AccessControl.hasPermission(accessControlState, caller, #admin)) {
      Runtime.trap("Unauthorized: admin only");
    };
    mailingSubscribers
      .map<Types.MailingSubscriber, Text>(func(s) { s.email })
      .toArray();
  };
};
