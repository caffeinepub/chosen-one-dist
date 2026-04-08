import Types "../types/artists-tracks-payments";
import AdminTypes "../types/admin";

module {
  // Convert an ArtistProfile to the admin view format.
  // lastLoginAt is looked up from the credential record and passed in.
  public func toAdminView(profile : Types.ArtistProfile, lastLoginAt : ?AdminTypes.Timestamp) : AdminTypes.ArtistAdminView {
    {
      id          = profile.id;
      name        = profile.name;
      bio         = profile.bio;
      status      = profile.status;
      createdAt   = profile.createdAt;
      lastLoginAt = lastLoginAt;
    };
  };
};
