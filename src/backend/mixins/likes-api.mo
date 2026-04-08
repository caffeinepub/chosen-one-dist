import Map      "mo:core/Map";
import Set      "mo:core/Set";
import Types    "../types/likes";
import LikesLib "../lib/likes";

mixin (
  trackLikes : Map.Map<Types.TrackId, Set.Set<Text>>,
  storeLikes  : Map.Map<Types.ArtistId, Set.Set<Text>>,
) {

  // ─── Track Likes ────────────────────────────────────────────────────────────

  public func likeTrack(trackId : Nat, likerToken : Text) : async Types.LikeResult {
    LikesLib.likeTrack(trackLikes, trackId, likerToken);
  };

  public func unlikeTrack(trackId : Nat, likerToken : Text) : async Types.LikeResult {
    LikesLib.unlikeTrack(trackLikes, trackId, likerToken);
  };

  public query func getTrackLikes(trackId : Nat) : async Nat {
    LikesLib.getTrackLikes(trackLikes, trackId);
  };

  public query func hasLikedTrack(trackId : Nat, likerToken : Text) : async Bool {
    LikesLib.hasLikedTrack(trackLikes, trackId, likerToken);
  };

  // ─── Artist Store Likes ─────────────────────────────────────────────────────

  public func likeArtistStore(artistId : Text, likerToken : Text) : async Types.LikeResult {
    LikesLib.likeArtistStore(storeLikes, artistId, likerToken);
  };

  public func unlikeArtistStore(artistId : Text, likerToken : Text) : async Types.LikeResult {
    LikesLib.unlikeArtistStore(storeLikes, artistId, likerToken);
  };

  public query func getArtistStoreLikes(artistId : Text) : async Nat {
    LikesLib.getArtistStoreLikes(storeLikes, artistId);
  };

  public query func hasLikedStore(artistId : Text, likerToken : Text) : async Bool {
    LikesLib.hasLikedStore(storeLikes, artistId, likerToken);
  };
};
