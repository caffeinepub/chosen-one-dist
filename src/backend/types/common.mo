module {
  public type ArtistId = Text;          // artist name as unique identity key
  public type SessionToken = Text;      // opaque session token
  public type UserId = ArtistId;        // alias kept for back-compat within domain types
  public type TrackId = Nat;
  public type SaleId = Nat;
  public type PayoutId = Nat;
  public type CommentId = Nat;
  public type Timestamp = Int;
};
