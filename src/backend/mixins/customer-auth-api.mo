import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import TrackTypes "../types/artists-tracks-payments";
import AnalyticsTypes "../types/analytics-notifications";
import Lib "../lib/artists-tracks-payments";

// ─── Customer Auth & Purchase History Mixin ──────────────────────────────────
// Manages a separate credential store for customers (email + PIN).
// Customer sessions are completely independent from artist sessions.
mixin (
  customerCredentials : Map.Map<Text, TrackTypes.CustomerCredential>,
  sales               : List.List<TrackTypes.Sale>,
  tracks              : Map.Map<Nat, TrackTypes.TrackMetadata>,
) {

  // ─── Token helpers ────────────────────────────────────────────────────────

  func generateCustomerToken(email : Text) : Text {
    let ts = Time.now();
    "cust:" # ts.toText() # ":" # email;
  };

  // Returns the email associated with a customer session token, or null.
  func resolveCustomerToken(token : Text) : ?Text {
    var found : ?Text = null;
    customerCredentials.forEach(func(email, cred) {
      if (found == null) {
        let hasToken = cred.customerSessionTokens.find(func(t : Text) : Bool { t == token });
        switch (hasToken) {
          case (?_) { found := ?email };
          case null {};
        };
      };
    });
    found;
  };

  // ─── Signup ───────────────────────────────────────────────────────────────
  public shared func signupCustomer(email : Text, pinHash : Text) : async { #ok : Text; #err : Text } {
    if (email.size() < 3 or not email.contains(#char '@')) {
      return #err("Invalid email address");
    };
    if (pinHash.size() == 0) {
      return #err("PIN hash must not be empty");
    };
    if (customerCredentials.containsKey(email)) {
      return #err("An account with that email already exists");
    };
    let token = generateCustomerToken(email);
    let cred : TrackTypes.CustomerCredential = {
      email                     = email;
      var pinHash               = pinHash;
      var customerSessionTokens = [token];
      createdAt                 = Time.now();
    };
    customerCredentials.add(email, cred);
    #ok(token);
  };

  // ─── Login ────────────────────────────────────────────────────────────────
  public shared func loginCustomer(email : Text, pinHash : Text) : async { #ok : Text; #err : Text } {
    switch (customerCredentials.get(email)) {
      case null { #err("No account found for that email") };
      case (?cred) {
        if (cred.pinHash != pinHash) {
          return #err("Incorrect PIN");
        };
        let token = generateCustomerToken(email);
        cred.customerSessionTokens := cred.customerSessionTokens.concat([token]);
        #ok(token);
      };
    };
  };

  // ─── Validate Session ─────────────────────────────────────────────────────
  public query func validateCustomerSession(token : Text) : async Bool {
    resolveCustomerToken(token) != null;
  };

  // ─── Logout ───────────────────────────────────────────────────────────────
  public shared func logoutCustomer(token : Text) : async () {
    switch (resolveCustomerToken(token)) {
      case null { /* token not found, no-op */ };
      case (?email) {
        switch (customerCredentials.get(email)) {
          case null {};
          case (?cred) {
            cred.customerSessionTokens := cred.customerSessionTokens.filter(
              func(t : Text) : Bool { t != token }
            );
          };
        };
      };
    };
  };

  // ─── Get Customer Purchases ───────────────────────────────────────────────
  // Returns all tracks bought by this customer.
  // Matches by buyerEmail (if the sale has one and it matches this customer),
  // or falls back to buyerToken match for guest purchases.
  public query func getCustomerPurchases(customerToken : Text) : async { #ok : [TrackTypes.TrackMetadataPublic]; #err : Text } {
    let email = switch (resolveCustomerToken(customerToken)) {
      case null    { return #err("Invalid or expired customer session token") };
      case (?e)    { e };
    };
    let matchingSales = sales.filter(func(s : TrackTypes.Sale) : Bool {
      switch (s.buyerEmail) {
        case (?e) { e == email };
        case null { s.buyerToken == customerToken };
      }
    });
    let result = matchingSales
      .map<TrackTypes.Sale, ?TrackTypes.TrackMetadataPublic>(func(s) {
        switch (tracks.get(s.trackId)) {
          case null  { null };
          case (?t)  { ?Lib.toPublicTrack(t, 0) };
        };
      })
      .filter(func(item : ?TrackTypes.TrackMetadataPublic) : Bool { item != null })
      .map<(?TrackTypes.TrackMetadataPublic), TrackTypes.TrackMetadataPublic>(func(item) {
        switch (item) {
          case (?t) { t };
          case null { Runtime.trap("unreachable") };
        };
      })
      .toArray();
    #ok(result);
  };

  // ─── Get Customer Download Report ─────────────────────────────────────────
  // Same 30-day expiry logic, filtered to this customer's purchases only.
  let thirtyDaysNs : Int = 30 * 24 * 60 * 60 * 1_000_000_000;

  public query func getCustomerDownloadReport(customerToken : Text) : async { #ok : [AnalyticsTypes.DownloadReportEntry]; #err : Text } {
    let email = switch (resolveCustomerToken(customerToken)) {
      case null    { return #err("Invalid or expired customer session token") };
      case (?e)    { e };
    };
    let now = Time.now();
    let matchingSales = sales.filter(func(s : TrackTypes.Sale) : Bool {
      switch (s.buyerEmail) {
        case (?e) { e == email };
        case null { s.buyerToken == customerToken };
      }
    });
    let report = matchingSales
      .map<TrackTypes.Sale, ?AnalyticsTypes.DownloadReportEntry>(func(s) {
        switch (tracks.get(s.trackId)) {
          case null { null };
          case (?t) {
            let expiresAt = s.createdAt + thirtyDaysNs;
            ?{
              saleId            = s.id;
              trackId           = s.trackId;
              trackTitle        = t.title;
              artistName        = t.artistName;
              format            = if (s.trackId % 2 == 0) { "mp3" } else { "wav" }; // placeholder; real format stored in audioFile metadata
              purchasedAt       = s.createdAt;
              expiresAt         = expiresAt;
              downloadAvailable = now <= expiresAt;
            };
          };
        };
      })
      .filter(func(e : ?AnalyticsTypes.DownloadReportEntry) : Bool { e != null })
      .map<(?AnalyticsTypes.DownloadReportEntry), AnalyticsTypes.DownloadReportEntry>(func(e) {
        switch (e) {
          case (?entry) { entry };
          case null     { Runtime.trap("unreachable") };
        };
      })
      .toArray();
    #ok(report);
  };
};
