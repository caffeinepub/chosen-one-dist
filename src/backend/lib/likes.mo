import Map  "mo:core/Map";
import Set  "mo:core/Set";
import Types "../types/likes";

module {
  // ─── Track Likes ────────────────────────────────────────────────────────────

  /// Like a track. Returns #alreadyLiked if the token has already liked it.
  public func likeTrack(
    trackLikes : Map.Map<Types.TrackId, Set.Set<Text>>,
    trackId    : Types.TrackId,
    likerToken : Text,
  ) : Types.LikeResult {
    let likers = switch (trackLikes.get(trackId)) {
      case (?s) { s };
      case null {
        let s = Set.empty<Text>();
        trackLikes.add(trackId, s);
        s;
      };
    };
    if (likers.contains(likerToken)) {
      #alreadyLiked;
    } else {
      likers.add(likerToken);
      #ok;
    };
  };

  /// Unlike a track. Returns #notLiked if the token had not liked it.
  public func unlikeTrack(
    trackLikes : Map.Map<Types.TrackId, Set.Set<Text>>,
    trackId    : Types.TrackId,
    likerToken : Text,
  ) : Types.LikeResult {
    switch (trackLikes.get(trackId)) {
      case null { #notLiked };
      case (?likers) {
        if (likers.contains(likerToken)) {
          likers.remove(likerToken);
          #ok;
        } else {
          #notLiked;
        };
      };
    };
  };

  /// Return the total number of likes for a track.
  public func getTrackLikes(
    trackLikes : Map.Map<Types.TrackId, Set.Set<Text>>,
    trackId    : Types.TrackId,
  ) : Nat {
    switch (trackLikes.get(trackId)) {
      case null    { 0 };
      case (?likers) { likers.size() };
    };
  };

  // ─── Artist Store Likes ─────────────────────────────────────────────────────

  /// Like an artist store.
  public func likeArtistStore(
    storeLikes : Map.Map<Types.ArtistId, Set.Set<Text>>,
    artistId   : Types.ArtistId,
    likerToken : Text,
  ) : Types.LikeResult {
    let likers = switch (storeLikes.get(artistId)) {
      case (?s) { s };
      case null {
        let s = Set.empty<Text>();
        storeLikes.add(artistId, s);
        s;
      };
    };
    if (likers.contains(likerToken)) {
      #alreadyLiked;
    } else {
      likers.add(likerToken);
      #ok;
    };
  };

  /// Unlike an artist store.
  public func unlikeArtistStore(
    storeLikes : Map.Map<Types.ArtistId, Set.Set<Text>>,
    artistId   : Types.ArtistId,
    likerToken : Text,
  ) : Types.LikeResult {
    switch (storeLikes.get(artistId)) {
      case null { #notLiked };
      case (?likers) {
        if (likers.contains(likerToken)) {
          likers.remove(likerToken);
          #ok;
        } else {
          #notLiked;
        };
      };
    };
  };

  /// Return the total number of likes for an artist store.
  public func getArtistStoreLikes(
    storeLikes : Map.Map<Types.ArtistId, Set.Set<Text>>,
    artistId   : Types.ArtistId,
  ) : Nat {
    switch (storeLikes.get(artistId)) {
      case null      { 0 };
      case (?likers) { likers.size() };
    };
  };

  // ─── Helpers ────────────────────────────────────────────────────────────────

  /// Check whether a liker token has already liked a track.
  public func hasLikedTrack(
    trackLikes : Map.Map<Types.TrackId, Set.Set<Text>>,
    trackId    : Types.TrackId,
    likerToken : Text,
  ) : Bool {
    switch (trackLikes.get(trackId)) {
      case null      { false };
      case (?likers) { likers.contains(likerToken) };
    };
  };

  /// Check whether a liker token has already liked an artist store.
  public func hasLikedStore(
    storeLikes : Map.Map<Types.ArtistId, Set.Set<Text>>,
    artistId   : Types.ArtistId,
    likerToken : Text,
  ) : Bool {
    switch (storeLikes.get(artistId)) {
      case null      { false };
      case (?likers) { likers.contains(likerToken) };
    };
  };
};
