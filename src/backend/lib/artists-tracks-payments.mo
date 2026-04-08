import Types "../types/artists-tracks-payments";

module {
  // ─── Artist helpers ────────────────────────────────────────────────────────
  public func toPublicProfile(profile : Types.ArtistProfile) : Types.ArtistProfilePublic {
    {
      id         = profile.id;
      name       = profile.name;
      bio        = profile.bio;
      status     = profile.status;
      instagram  = profile.instagram;
      twitterX   = profile.twitterX;
      tiktok     = profile.tiktok;
      youtube    = profile.youtube;
      facebook   = profile.facebook;
      soundcloud = profile.soundcloud;
      spotify    = profile.spotify;
      appleMusic = profile.appleMusic;
      website    = profile.website;
      createdAt  = profile.createdAt;
    };
  };

  // ─── Track helpers ─────────────────────────────────────────────────────────
  public func toPublicTrack(track : Types.TrackMetadata, likeCount : Nat) : Types.TrackMetadataPublic {
    {
      id                = track.id;
      artistId          = track.artistId;
      title             = track.title;
      artistName        = track.artistName;
      genre             = track.genre;
      trackType         = track.trackType;
      priceInCents      = track.priceInCents;
      description       = track.description;
      releaseDate       = track.releaseDate;
      explicit          = track.explicit;
      preOrder          = track.preOrder;
      state             = track.state;
      previewCount      = track.previewCount;
      saleCount         = track.saleCount;
      likeCount;
      previewStartSecs  = track.previewStartSecs;
      previewEndSecs    = track.previewEndSecs;
      songDetails       = track.songDetails;
      audioFile         = track.audioFile;
      coverArt          = track.coverArt;
      createdAt         = track.createdAt;
    };
  };

  public func toTrackSummary(track : Types.TrackMetadata) : Types.ArtistTrackSummary {
    {
      id           = track.id;
      title        = track.title;
      genre        = track.genre;
      trackType    = track.trackType;
      releaseDate  = track.releaseDate;
      previewCount = track.previewCount;
      saleCount    = track.saleCount;
      state        = track.state;
      priceInCents = track.priceInCents;
    };
  };

  // ─── Sale helpers ──────────────────────────────────────────────────────────
  // Artists receive 85% of each sale
  public func artistEarnings(grossCents : Nat) : Nat {
    (grossCents * 85) / 100;
  };

  public func platformFee(grossCents : Nat) : Nat {
    grossCents - artistEarnings(grossCents);
  };

  // ─── Banking helpers ───────────────────────────────────────────────────────
  public func toPublicBanking(info : Types.BankingInfo) : Types.BankingInfoPublic {
    {
      artistId          = info.artistId;
      accountHolderName = info.accountHolderName;
      bankName          = info.bankName;
      routingNumber     = info.routingNumber;
      accountNumber     = info.accountNumber;
      updatedAt         = info.updatedAt;
    };
  };

  // ─── Payout helpers ────────────────────────────────────────────────────────
  public func toPublicPayout(payout : Types.Payout) : Types.PayoutPublic {
    {
      id          = payout.id;
      artistId    = payout.artistId;
      amountCents = payout.amountCents;
      status      = payout.status;
      requestedAt = payout.requestedAt;
      processedAt = payout.processedAt;
    };
  };

  // ─── Comment helpers ───────────────────────────────────────────────────────
  public func toPublicComment(comment : Types.StoreComment) : Types.StoreCommentPublic {
    {
      id         = comment.id;
      authorId   = comment.authorId;
      authorName = comment.authorName;
      body       = comment.body;
      rating     = comment.rating;
      createdAt  = comment.createdAt;
    };
  };

  // ─── Dashboard computation ─────────────────────────────────────────────────
  public func computeDashboardStats(
    artistTracks : [Types.TrackMetadata],
    artistSales  : [Types.Sale],
  ) : Types.ArtistDashboardStats {
    var totalPreviews : Nat = 0;
    for (t in artistTracks.values()) {
      totalPreviews += t.previewCount;
    };

    var totalEarnings : Nat = 0;
    for (s in artistSales.values()) {
      totalEarnings += s.artistEarningsCents;
    };

    {
      totalTracks        = artistTracks.size();
      totalPreviews      = totalPreviews;
      totalSales         = artistSales.size();
      totalEarningsCents = totalEarnings;
    };
  };

  public func computeRoyaltyDashboard(
    artistTracks          : [Types.TrackMetadata],
    artistSales           : [Types.Sale],
    artistPayouts         : [Types.Payout],
    availableBalanceCents : Nat,
    periodLabel           : Text,
  ) : Types.RoyaltyDashboard {
    // Period stats
    var previews : Nat = 0;
    var gross    : Nat = 0;
    for (t in artistTracks.values()) {
      previews += t.previewCount;
    };
    for (s in artistSales.values()) {
      gross += s.grossAmountCents;
    };
    let payoutCents = artistEarnings(gross);

    let periodStats : Types.PeriodStats = {
      periodLabel       = periodLabel;
      previews          = previews;
      sales             = artistSales.size();
      grossRevenueCents = gross;
      payoutCents       = payoutCents;
    };

    // Per-track breakdown
    let breakdown = artistTracks.map(func(t : Types.TrackMetadata) : Types.TrackRoyalty {
      var trackGross : Nat = 0;
      var trackSales : Nat = 0;
      for (s in artistSales.values()) {
        if (s.trackId == t.id) {
          trackGross += s.grossAmountCents;
          trackSales += 1;
        };
      };
      {
        trackId           = t.id;
        title             = t.title;
        previews          = t.previewCount;
        sales             = trackSales;
        grossRevenueCents = trackGross;
        earningsCents     = artistEarnings(trackGross);
      };
    });

    let publicPayouts = artistPayouts.map(func(p : Types.Payout) : Types.PayoutPublic {
      toPublicPayout(p);
    });

    {
      periodStats           = periodStats;
      trackBreakdown        = breakdown;
      availableBalanceCents = availableBalanceCents;
      payouts               = publicPayouts;
    };
  };
};
