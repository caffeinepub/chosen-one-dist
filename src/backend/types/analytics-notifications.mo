import Common "common";

module {
  public type ArtistId   = Common.ArtistId;
  public type TrackId    = Common.TrackId;
  public type SaleId     = Common.SaleId;
  public type Timestamp  = Common.Timestamp;

  // ─── Notifications ────────────────────────────────────────────────────────
  public type NotificationType = {
    #artistJoined;
    #trackUploaded;
    #newSale;
    #newComment;
    #newDrop;
  };

  public type Notification = {
    id             : Nat;
    notifType      : NotificationType;
    message        : Text;
    artistId       : ArtistId;
    // null = broadcast to all (artist/admin); ?token = targeted fan notification
    recipientToken : ?Text;
    timestamp      : Timestamp;
  };

  // ─── Mailing List ─────────────────────────────────────────────────────────
  public type MailingSubscriber = {
    email     : Text;
    timestamp : Timestamp;
  };

  // ─── Download Report ──────────────────────────────────────────────────────
  public type DownloadReportEntry = {
    saleId            : SaleId;
    trackId           : TrackId;
    trackTitle        : Text;
    artistName        : Text;
    format            : Text;      // "mp3" or "wav"
    purchasedAt       : Timestamp;
    expiresAt         : Timestamp;
    downloadAvailable : Bool;
  };

  // ─── Real-time Dashboard Stats ────────────────────────────────────────────
  public type RealTimeDashboardStats = {
    trackPreviews : Nat;   // total preview count across all artist tracks
    totalListens  : Nat;   // same as trackPreviews (alias expected by frontend)
    totalSales    : Nat;   // count of sales records for this artist
    grossRevenue  : Nat;   // sum of grossAmountCents in cents
    artistPayout  : Nat;   // 85% of grossRevenue in cents
  };
};
