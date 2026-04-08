import Map "mo:core/Map";
import List "mo:core/List";
import Types "../types/artists-tracks-payments";
import AdminTypes "../types/admin";
import TrafficTypes "../types/traffic-analytics";
import TrafficLib "../lib/traffic-analytics";

mixin (
  adminCredential   : AdminTypes.AdminCredential,
  pageViewEvents    : List.List<TrafficTypes.PageViewEvent>,
  visitorSessions   : Map.Map<Text, Int>,
  tracks            : Map.Map<Nat, Types.TrackMetadata>,
  artists           : Map.Map<Text, Types.ArtistProfile>,
  sales             : List.List<Types.Sale>,
) {

  // ─── Token validation (mirrors admin-api pattern, uniquely named) ─────────
  func isValidAdminTokenTraffic(token : Text) : Bool {
    let tokens = adminCredential.sessionTokens;
    switch (tokens.find(func(t : Text) : Bool { t == token })) {
      case (?_) true;
      case null false;
    };
  };

  // ─── Record Page View ─────────────────────────────────────────────────────
  // Public — no auth required. Any visitor can call this to register activity.
  public shared func recordPageView(section : Text, sessionId : Text) : async () {
    TrafficLib.recordView(pageViewEvents, visitorSessions, section, sessionId);
  };

  // ─── Get Admin Traffic Stats ──────────────────────────────────────────────
  // Admin-auth required via token. Returns live platform traffic data.
  public query func getAdminTrafficStats(token : Text) : async { #ok : TrafficTypes.AdminTrafficStats; #err : Text } {
    if (not isValidAdminTokenTraffic(token)) {
      return #err("Unauthorized: Admin access required");
    };
    let stats = TrafficLib.buildStats(pageViewEvents, visitorSessions, tracks, artists, sales);
    #ok(stats);
  };
};
