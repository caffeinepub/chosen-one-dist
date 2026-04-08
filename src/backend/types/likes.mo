import Common "common";

module {
  public type TrackId   = Common.TrackId;
  public type ArtistId  = Common.ArtistId;

  // Public shape returned to the frontend (shared-safe)
  public type LikeResult = { #ok; #alreadyLiked; #notLiked };
};
