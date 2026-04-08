module {
  // ─── Page View Event ──────────────────────────────────────────────────────
  // Stored in a List, pruned to last 5 minutes on every write.
  public type PageViewEvent = {
    section   : Text;  // Home | Store | Upload | Dashboard | Royalties | ArtistProfile | Admin
    sessionId : Text;
    timestamp : Int;   // nanoseconds (Time.now())
  };

  // ─── Admin Traffic Stats ──────────────────────────────────────────────────
  // Returned by getAdminTrafficStats — all numbers are real, computed live.
  public type AdminTrafficStats = {
    activeVisitors       : Nat;          // unique sessionIds seen in last 5 min
    pageViewsLast5Min    : Nat;          // total events in last 5 min
    pageViewsBySection   : [(Text, Nat)]; // per-section counts
    totalPublishedTracks : Nat;          // published tracks
    totalSalesAllTime    : Nat;          // sum of saleCount across all tracks
    totalPreviewsAllTime : Nat;          // sum of previewCount across all tracks
    grossRevenueCents    : Nat;          // sum of (saleCount * priceInCents)
    recentSignups        : Nat;          // artist signups in last 24 hours
    recentPurchases      : Nat;          // purchases in last 24 hours
  };
};
