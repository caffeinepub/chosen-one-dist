import Common "common";

module {
  public type ArtistId = Common.ArtistId;
  public type Timestamp = Common.Timestamp;

  // ─── Artist Status ────────────────────────────────────────────────────────
  public type ArtistStatus = { #active; #suspended; #deleted };

  // ─── Admin Credential ─────────────────────────────────────────────────────
  // Hardcoded admin name is "admin". PIN hash is stored and can be changed.
  public type AdminCredential = {
    var pinHash       : Text;   // SHA-256 hex from frontend
    var sessionTokens : [Text]; // active admin session tokens
  };

  // ─── Artist Admin View ────────────────────────────────────────────────────
  public type ArtistAdminView = {
    id          : ArtistId;
    name        : Text;
    bio         : Text;
    status      : ArtistStatus;
    createdAt   : Timestamp;
    lastLoginAt : ?Timestamp;  // optional — null for artists who have never logged in
  };
};
