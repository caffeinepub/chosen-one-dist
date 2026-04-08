import Common "common";
import Storage "mo:caffeineai-object-storage/Storage";
import AdminTypes "admin";

module {
  public type ArtistId  = Common.ArtistId;
  public type UserId    = Common.UserId;          // = ArtistId = Text
  public type SessionToken = Common.SessionToken;
  public type TrackId   = Common.TrackId;
  public type SaleId    = Common.SaleId;
  public type PayoutId  = Common.PayoutId;
  public type CommentId = Common.CommentId;
  public type Timestamp = Common.Timestamp;

  // Re-export ArtistStatus so this module stays self-contained
  public type ArtistStatus = AdminTypes.ArtistStatus;

  // ─── Credentials ──────────────────────────────────────────────────────────
  public type ArtistCredential = {
    artistId                    : ArtistId;
    var pinHash                 : Text;                   // SHA-256 hex from frontend
    var sessionTokens           : [SessionToken];         // active tokens (stay until logout)
    var lastLoginAt             : ?Timestamp;             // updated on every successful login
    var securityQuestion        : ?Text;                  // optional question key/text
    var securityAnswerHash      : ?Text;                  // SHA-256 hash of lowercased trimmed answer
    var failedRecoveryAttempts  : Nat;                    // count of failed resetPINWithSecurityAnswer calls
    var lastFailedRecoveryAt    : ?Timestamp;             // timestamp of most recent failed attempt
  };

  // ─── Social Links ──────────────────────────────────────────────────────────
  public type ArtistSocialLinks = {
    instagram  : ?Text;
    twitterX   : ?Text;
    tiktok     : ?Text;
    youtube    : ?Text;
    facebook   : ?Text;
    soundcloud : ?Text;
    spotify    : ?Text;
    appleMusic : ?Text;
    website    : ?Text;
  };

  // ─── Artist ────────────────────────────────────────────────────────────────
  public type ArtistProfile = {
    id               : ArtistId;
    var name         : Text;
    var bio          : Text;
    var status       : ArtistStatus;
    var instagram    : ?Text;
    var twitterX     : ?Text;
    var tiktok       : ?Text;
    var youtube      : ?Text;
    var facebook     : ?Text;
    var soundcloud   : ?Text;
    var spotify      : ?Text;
    var appleMusic   : ?Text;
    var website      : ?Text;
    createdAt        : Timestamp;
  };

  public type ArtistProfilePublic = {
    id         : ArtistId;
    name       : Text;
    bio        : Text;
    status     : ArtistStatus;
    instagram  : ?Text;
    twitterX   : ?Text;
    tiktok     : ?Text;
    youtube    : ?Text;
    facebook   : ?Text;
    soundcloud : ?Text;
    spotify    : ?Text;
    appleMusic : ?Text;
    website    : ?Text;
    createdAt  : Timestamp;
  };

  // ─── Track ─────────────────────────────────────────────────────────────────
  public type TrackType = { #single; #album };

  public type TrackState = { #uploaded; #published; #preOrder; #deleted };

  public type TrackMetadata = {
    id                    : TrackId;
    artistId              : ArtistId;
    var title             : Text;
    var artistName        : Text;
    var genre             : Text;
    var trackType         : TrackType;
    var priceInCents      : Nat;
    var description       : Text;
    var releaseDate       : Text;
    var explicit          : Bool;
    var preOrder          : Bool;
    var state             : TrackState;
    var previewCount      : Nat;
    var saleCount         : Nat;
    var previewStartSecs  : Float;   // seconds into track where 30-sec preview starts
    var previewEndSecs    : Float;   // always previewStartSecs + 30.0
    var songDetails       : Text;    // optional artist notes/credits/lyrics
    audioFile             : Storage.ExternalBlob;
    coverArt              : Storage.ExternalBlob;
    createdAt             : Timestamp;
  };

  public type TrackMetadataPublic = {
    id                : TrackId;
    artistId          : ArtistId;
    title             : Text;
    artistName        : Text;
    genre             : Text;
    trackType         : TrackType;
    priceInCents      : Nat;
    description       : Text;
    releaseDate       : Text;
    explicit          : Bool;
    preOrder          : Bool;
    state             : TrackState;
    previewCount      : Nat;
    saleCount         : Nat;
    likeCount         : Nat;
    previewStartSecs  : Float;
    previewEndSecs    : Float;
    songDetails       : Text;
    audioFile         : Storage.ExternalBlob;
    coverArt          : Storage.ExternalBlob;
    createdAt         : Timestamp;
  };

  // Input for uploading a new track
  public type TrackUploadInput = {
    title               : Text;
    artistName          : Text;
    genre               : Text;
    trackType           : TrackType;
    priceInCents        : Nat;
    description         : Text;
    releaseDate         : Text;
    explicit            : Bool;
    preOrder            : Bool;
    audioFile           : Storage.ExternalBlob;
    coverArt            : Storage.ExternalBlob;
    previewStartSecs    : ?Float;   // optional; defaults to 0.0
    previewEndSecs      : ?Float;   // optional; defaults to 30.0
    songDetails         : ?Text;    // optional artist notes/credits/lyrics
  };

  // ─── Customer Credentials ─────────────────────────────────────────────────
  // Separate auth system for customers (email + PIN, no artist association).
  public type CustomerCredential = {
    email                      : Text;
    var pinHash                : Text;         // SHA-256 hex from frontend
    var customerSessionTokens  : [SessionToken];
    createdAt                  : Timestamp;
  };

  // ─── Sale ──────────────────────────────────────────────────────────────────
  public type Sale = {
    id                   : SaleId;
    trackId              : TrackId;
    artistId             : ArtistId;
    buyerToken           : SessionToken;       // token of buyer at purchase time
    buyerEmail           : ?Text;              // optional — set when customer is registered
    grossAmountCents     : Nat;
    artistEarningsCents  : Nat;                // 85%
    platformFeeCents     : Nat;                // 15%
    stripeSessionId      : Text;
    createdAt            : Timestamp;
  };

  // ─── Banking ───────────────────────────────────────────────────────────────
  public type BankingInfo = {
    artistId                : ArtistId;
    var accountHolderName   : Text;
    var bankName            : Text;
    var routingNumber       : Text;
    var accountNumber       : Text;
    var updatedAt           : Timestamp;
  };

  public type BankingInfoPublic = {
    artistId          : ArtistId;
    accountHolderName : Text;
    bankName          : Text;
    routingNumber     : Text;
    accountNumber     : Text;
    updatedAt         : Timestamp;
  };

  // ─── Payout ────────────────────────────────────────────────────────────────
  public type PayoutStatus = { #pending; #processed; #failed };

  public type Payout = {
    id              : PayoutId;
    artistId        : ArtistId;
    amountCents     : Nat;
    var status      : PayoutStatus;
    requestedAt     : Timestamp;
    var processedAt : ?Timestamp;
  };

  public type PayoutPublic = {
    id          : PayoutId;
    artistId    : ArtistId;
    amountCents : Nat;
    status      : PayoutStatus;
    requestedAt : Timestamp;
    processedAt : ?Timestamp;
  };

  // ─── Dashboard Stats ───────────────────────────────────────────────────────
  public type ArtistDashboardStats = {
    totalTracks        : Nat;
    totalPreviews      : Nat;
    totalSales         : Nat;
    totalEarningsCents : Nat;
  };

  public type ArtistTrackSummary = {
    id           : TrackId;
    title        : Text;
    genre        : Text;
    trackType    : TrackType;
    releaseDate  : Text;
    previewCount : Nat;
    saleCount    : Nat;
    state        : TrackState;
    priceInCents : Nat;
  };

  // ─── Royalty Dashboard ─────────────────────────────────────────────────────
  public type PeriodStats = {
    periodLabel       : Text;
    previews          : Nat;
    sales             : Nat;
    grossRevenueCents : Nat;
    payoutCents       : Nat; // 85%
  };

  public type TrackRoyalty = {
    trackId           : TrackId;
    title             : Text;
    previews          : Nat;
    sales             : Nat;
    grossRevenueCents : Nat;
    earningsCents     : Nat;
  };

  public type RoyaltyDashboard = {
    periodStats           : PeriodStats;
    trackBreakdown        : [TrackRoyalty];
    availableBalanceCents : Nat;
    payouts               : [PayoutPublic];
  };

  // ─── Comment / Rating ──────────────────────────────────────────────────────
  public type StoreComment = {
    id              : CommentId;
    authorId        : ArtistId;
    var authorName  : Text;
    var body        : Text;
    rating          : Nat; // 1-5
    createdAt       : Timestamp;
  };

  public type StoreCommentPublic = {
    id         : CommentId;
    authorId   : ArtistId;
    authorName : Text;
    body       : Text;
    rating     : Nat;
    createdAt  : Timestamp;
  };
};
