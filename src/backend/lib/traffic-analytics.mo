import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import TrafficTypes "../types/traffic-analytics";
import Types "../types/artists-tracks-payments";

module {
  // 5 minutes in nanoseconds — pre-computed literal (no module-level arithmetic)
  let FIVE_MIN_NS : Int = 300_000_000_000;
  // 24 hours in nanoseconds — pre-computed literal
  let DAY_NS : Int = 86_400_000_000_000;

  // ─── Prune page view events older than 5 minutes ─────────────────────────
  public func pruneOldEvents(events : List.List<TrafficTypes.PageViewEvent>) {
    let cutoff = Time.now() - FIVE_MIN_NS;
    // retain only events within window
    let keep = events.filter(func(e : TrafficTypes.PageViewEvent) : Bool {
      e.timestamp >= cutoff
    });
    events.clear();
    events.append(keep);
  };

  // ─── Prune visitor sessions older than 5 minutes ─────────────────────────
  public func pruneOldSessions(sessions : Map.Map<Text, Int>) {
    let cutoff = Time.now() - FIVE_MIN_NS;
    // collect stale keys
    let staleKeys = sessions.entries()
      .filter(func((_, ts) : (Text, Int)) : Bool { ts < cutoff })
      .map(func((k, _) : (Text, Int)) : Text { k })
      .toArray();
    staleKeys.forEach(func(k : Text) { sessions.remove(k) });
  };

  // ─── Record a page view ───────────────────────────────────────────────────
  public func recordView(
    events   : List.List<TrafficTypes.PageViewEvent>,
    sessions : Map.Map<Text, Int>,
    section  : Text,
    sessionId : Text,
  ) {
    let now = Time.now();
    events.add({ section; sessionId; timestamp = now });
    sessions.add(sessionId, now);
    pruneOldEvents(events);
    pruneOldSessions(sessions);
  };

  // ─── Compute active visitor count ────────────────────────────────────────
  public func activeVisitors(sessions : Map.Map<Text, Int>) : Nat {
    sessions.size()
  };

  // ─── Compute page views grouped by section ───────────────────────────────
  public func viewsBySection(events : List.List<TrafficTypes.PageViewEvent>) : [(Text, Nat)] {
    let counts = Map.empty<Text, Nat>();
    events.forEach(func(e : TrafficTypes.PageViewEvent) {
      let current = switch (counts.get(e.section)) {
        case (?n) n;
        case null 0;
      };
      counts.add(e.section, current + 1);
    });
    counts.toArray()
  };

  // ─── Build AdminTrafficStats ──────────────────────────────────────────────
  public func buildStats(
    events   : List.List<TrafficTypes.PageViewEvent>,
    sessions : Map.Map<Text, Int>,
    tracks   : Map.Map<Nat, Types.TrackMetadata>,
    artists  : Map.Map<Text, Types.ArtistProfile>,
    sales    : List.List<Types.Sale>,
  ) : TrafficTypes.AdminTrafficStats {
    let now = Time.now();
    let dayCutoff = now - DAY_NS;

    // Track aggregates
    var totalPublished   : Nat = 0;
    var totalSales       : Nat = 0;
    var totalPreviews    : Nat = 0;
    var grossRevenue     : Nat = 0;

    tracks.forEach(func(_, t : Types.TrackMetadata) {
      if (t.state == #published) {
        totalPublished += 1;
      };
      totalSales    += t.saleCount;
      totalPreviews += t.previewCount;
      grossRevenue  += t.saleCount * t.priceInCents;
    });

    // Recent signups — artists created in last 24 hours
    var recentSignups : Nat = 0;
    artists.forEach(func(_, a : Types.ArtistProfile) {
      if (a.createdAt >= dayCutoff) {
        recentSignups += 1;
      };
    });

    // Recent purchases — sales in last 24 hours
    let recentPurchases = sales.filter(func(s : Types.Sale) : Bool {
      s.createdAt >= dayCutoff
    }).size();

    {
      activeVisitors       = activeVisitors(sessions);
      pageViewsLast5Min    = events.size();
      pageViewsBySection   = viewsBySection(events);
      totalPublishedTracks = totalPublished;
      totalSalesAllTime    = totalSales;
      totalPreviewsAllTime = totalPreviews;
      grossRevenueCents    = grossRevenue;
      recentSignups;
      recentPurchases;
    };
  };
};
