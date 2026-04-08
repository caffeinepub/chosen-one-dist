import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Types "../types/artists-tracks-payments";
import AdminTypes "../types/admin";
import AdminLib "../lib/admin";

// Admin hardcoded identity: name = "admin"
// Default PIN hash must be set at first login via adminChangePin.
// The initial PIN is "000000" — the frontend must hash it as SHA-256 before calling.
mixin (
  adminCredential : AdminTypes.AdminCredential,
  artists         : Map.Map<Text, Types.ArtistProfile>,
  credentials     : Map.Map<Text, Types.ArtistCredential>,
  tracks          : Map.Map<Nat, Types.TrackMetadata>,
) {

  // ─── Token helpers ────────────────────────────────────────────────────────

  func generateAdminToken() : Text {
    let ts = Time.now();
    ts.toText() # ":admin";
  };

  func isValidAdminToken(token : Text) : Bool {
    let tokens = adminCredential.sessionTokens;
    let found = tokens.find(func(t : Text) : Bool { t == token });
    switch (found) {
      case (?_) { true };
      case null { false };
    };
  };

  func requireAdmin(token : Text) {
    if (not isValidAdminToken(token)) {
      Runtime.trap("Unauthorized: Admin access required");
    };
  };

  // ─── Admin: Initialize PIN (one-time, unauthenticated) ───────────────────
  // Allows setting the admin PIN when no PIN has been configured yet (pinHash is "")
  // OR when the current hash is still the old factory default SHA-256("000000").
  // After the PIN has been personalized this function becomes a no-op and returns #err.
  public shared func adminInitializePIN(newPinHash : Text) : async { #ok; #err : Text } {
    let oldDefault = "8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92";
    let current = adminCredential.pinHash;
    if (current == "" or current == oldDefault) {
      if (newPinHash.size() == 0) {
        return #err("New PIN hash must not be empty");
      };
      adminCredential.pinHash := newPinHash;
      #ok;
    } else {
      #err("Admin PIN has already been set");
    };
  };

  // ─── Admin Login ──────────────────────────────────────────────────────────
  public shared func adminLogin(pinHash : Text) : async { #ok : Text; #err : Text } {
    if (adminCredential.pinHash != pinHash) {
      return #err("Incorrect admin PIN");
    };
    let token = generateAdminToken();
    adminCredential.sessionTokens := adminCredential.sessionTokens.concat([token]);
    #ok(token);
  };

  // ─── Admin Logout ─────────────────────────────────────────────────────────
  public shared func adminLogout(token : Text) : async { #ok; #err : Text } {
    if (not isValidAdminToken(token)) {
      return #err("Invalid admin token");
    };
    adminCredential.sessionTokens := adminCredential.sessionTokens.filter(func(t : Text) : Bool { t != token });
    #ok;
  };

  // ─── Admin: Change PIN ────────────────────────────────────────────────────
  public shared func adminChangePIN(token : Text, currentPinHash : Text, newPinHash : Text) : async { #ok; #err : Text } {
    if (not isValidAdminToken(token)) {
      return #err("Invalid admin token");
    };
    if (adminCredential.pinHash != currentPinHash) {
      return #err("Current admin PIN is incorrect");
    };
    if (newPinHash.size() == 0) {
      return #err("New PIN hash must not be empty");
    };
    adminCredential.pinHash := newPinHash;
    #ok;
  };

  // ─── Admin: Check Session ─────────────────────────────────────────────────
  public query func isAdminSession(token : Text) : async Bool {
    isValidAdminToken(token);
  };

  // ─── Admin: List All Artists ──────────────────────────────────────────────
  public query func adminListArtists(token : Text) : async { #ok : [AdminTypes.ArtistAdminView]; #err : Text } {
    if (not isValidAdminToken(token)) {
      return #err("Unauthorized: Admin access required");
    };
    let result = artists.values()
      .map(func(p : Types.ArtistProfile) : AdminTypes.ArtistAdminView {
        let lastLogin = switch (credentials.get(p.id)) {
          case (?cred) { cred.lastLoginAt };
          case null    { null };
        };
        AdminLib.toAdminView(p, lastLogin);
      })
      .toArray();
    #ok(result);
  };

  // ─── Admin: Suspend Artist ────────────────────────────────────────────────
  public shared func adminSuspendArtist(token : Text, artistId : Text) : async { #ok; #err : Text } {
    requireAdmin(token);
    switch (artists.get(artistId)) {
      case null { #err("Artist not found") };
      case (?p) {
        switch (p.status) {
          case (#deleted)   { #err("Cannot suspend a deleted account") };
          case (#suspended) { #err("Artist is already suspended") };
          case (#active)    {
            p.status := #suspended;
            // Invalidate all active session tokens so they are kicked out immediately
            switch (credentials.get(artistId)) {
              case (?cred) { cred.sessionTokens := [] };
              case null    {};
            };
            #ok;
          };
        };
      };
    };
  };

  // ─── Admin: Unsuspend Artist ──────────────────────────────────────────────
  public shared func adminUnsuspendArtist(token : Text, artistId : Text) : async { #ok; #err : Text } {
    requireAdmin(token);
    switch (artists.get(artistId)) {
      case null { #err("Artist not found") };
      case (?p) {
        switch (p.status) {
          case (#deleted)   { #err("Cannot unsuspend a deleted account") };
          case (#active)    { #err("Artist is not suspended") };
          case (#suspended) { p.status := #active; #ok };
        };
      };
    };
  };

  // ─── Admin: Reset Artist PIN ──────────────────────────────────────────────
  // Validates admin token, updates the artist's pinHash, and clears all their
  // active session tokens so they must re-login with the new PIN.
  public shared func adminResetArtistPIN(token : Text, artistId : Text, newPinHash : Text) : async { #ok; #err : Text } {
    requireAdmin(token);
    if (newPinHash.size() == 0) {
      return #err("New PIN hash must not be empty");
    };
    switch (credentials.get(artistId)) {
      case null { #err("Artist not found") };
      case (?cred) {
        cred.pinHash := newPinHash;
        cred.sessionTokens := [];
        #ok;
      };
    };
  };

  // ─── Admin: Delete Artist ─────────────────────────────────────────────────
  public shared func adminDeleteArtist(token : Text, artistId : Text) : async { #ok; #err : Text } {
    requireAdmin(token);
    switch (artists.get(artistId)) {
      case null { #err("Artist not found") };
      case (?p) {
        switch (p.status) {
          case (#deleted) { #err("Artist is already deleted") };
          case _          {
            // Mark all artist tracks as deleted
            tracks.forEach(func(_, t : Types.TrackMetadata) {
              if (t.artistId == artistId) {
                t.state := #deleted;
              };
            });
            // Invalidate sessions
            switch (credentials.get(artistId)) {
              case (?cred) { cred.sessionTokens := [] };
              case null    {};
            };
            // Mark artist profile as deleted (preserve record for audit trail)
            p.status := #deleted;
            #ok;
          };
        };
      };
    };
  };
};
