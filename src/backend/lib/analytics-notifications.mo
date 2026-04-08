import Types "../types/analytics-notifications";
import TrackTypes "../types/artists-tracks-payments";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";

module {
  // ─── Notification helpers ─────────────────────────────────────────────────

  public func makeNotification(
    id             : Nat,
    notifType      : Types.NotificationType,
    message        : Text,
    artistId       : Types.ArtistId,
    recipientToken : ?Text,
  ) : Types.Notification {
    {
      id;
      notifType;
      message;
      artistId;
      recipientToken;
      timestamp = Time.now();
    };
  };

  // ─── Mailing List helpers ─────────────────────────────────────────────────

  public func makeSubscriber(email : Text) : Types.MailingSubscriber {
    { email = email; timestamp = Time.now() };
  };

  // ─── Real-time Dashboard Stats ────────────────────────────────────────────

  public func computeRealTimeStats(
    artistTracks : [TrackTypes.TrackMetadata],
    artistSales  : [TrackTypes.Sale],
  ) : Types.RealTimeDashboardStats {
    var previews : Nat = 0;
    for (t in artistTracks.values()) {
      previews += t.previewCount;
    };
    var grossRevenue : Nat = 0;
    for (s in artistSales.values()) {
      grossRevenue += s.grossAmountCents;
    };
    let artistPayout = (grossRevenue * 85) / 100;
    {
      trackPreviews = previews;
      totalListens  = previews;
      totalSales    = artistSales.size();
      grossRevenue  = grossRevenue;
      artistPayout  = artistPayout;
    };
  };

  // ─── Download Report ──────────────────────────────────────────────────────

  // 30 days in nanoseconds (2_592_000_000_000_000)
  let thirtyDaysNanos : Int = 2_592_000_000_000_000;

  public func buildDownloadReport(
    buyerArtistId : Types.ArtistId,
    allSales      : List.List<TrackTypes.Sale>,
    trackLookup   : (TrackTypes.TrackId) -> ?TrackTypes.TrackMetadata,
  ) : [Types.DownloadReportEntry] {
    let now = Time.now();
    allSales
      .filter(func(s : TrackTypes.Sale) : Bool { s.buyerToken == buyerArtistId })
      .map<TrackTypes.Sale, ?Types.DownloadReportEntry>(func(s) {
        switch (trackLookup(s.trackId)) {
          case null { null };
          case (?t) {
            let expiresAt = s.createdAt + thirtyDaysNanos;
            let available = now <= expiresAt;
            ?{
              saleId            = s.id;
              trackId           = t.id;
              trackTitle        = t.title;
              artistName        = t.artistName;
              format            = "mp3";
              purchasedAt       = s.createdAt;
              expiresAt         = expiresAt;
              downloadAvailable = available;
            };
          };
        };
      })
      .filter(func(item : ?Types.DownloadReportEntry) : Bool { item != null })
      .map<(?Types.DownloadReportEntry), Types.DownloadReportEntry>(func(item) {
        switch (item) {
          case (?e) { e };
          case null { Runtime.trap("unreachable") };
        };
      })
      .toArray();
  };
};
