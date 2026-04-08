import Map "mo:core/Map";
import Set "mo:core/Set";
import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import Stripe "mo:caffeineai-stripe/stripe";
import OutCall "mo:caffeineai-http-outcalls/outcall";
import Types "types/artists-tracks-payments";
import AdminTypes "types/admin";
import AnalyticsTypes "types/analytics-notifications";
import LikesTypes "types/likes";
import ArtistsMixin "mixins/artists-tracks-payments-api";
import AnalyticsMixin "mixins/analytics-notifications-api";
import LikesMixin "mixins/likes-api";
import AdminMixin "mixins/admin-api";

import SupportChatMixin "mixins/support-chat-api";
import CustomerAuthMixin "mixins/customer-auth-api";





actor {
  // ─── Authorization ────────────────────────────────────────────────────────
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // ─── Object Storage ──────────────────────────────────────────────────────
  include MixinObjectStorage();

  // ─── State ───────────────────────────────────────────────────────────────
  // Credentials keyed by ArtistId (Text = artist name)
  let credentials     = Map.empty<Text, Types.ArtistCredential>();
  // Artist profiles keyed by ArtistId (Text = artist name)
  let artists         = Map.empty<Text, Types.ArtistProfile>();
  let tracks          = Map.empty<Nat, Types.TrackMetadata>();
  let sales           = List.empty<Types.Sale>();
  let banking         = Map.empty<Text, Types.BankingInfo>();
  let payouts         = List.empty<Types.Payout>();
  let storeComments   = List.empty<Types.StoreComment>();

  // ─── Customer Credentials ─────────────────────────────────────────────────
  // Keyed by email (Text); separate from artist credentials.
  let customerCredentials = Map.empty<Text, Types.CustomerCredential>();

  let notifications      = List.empty<AnalyticsTypes.Notification>();
  let mailingSubscribers = List.empty<AnalyticsTypes.MailingSubscriber>();

  // ─── Likes State ─────────────────────────────────────────────────────────
  // trackLikes : trackId -> Set of likerTokens
  let trackLikes = Map.empty<LikesTypes.TrackId, Set.Set<Text>>();
  // storeLikes  : artistId -> Set of likerTokens
  let storeLikes  = Map.empty<LikesTypes.ArtistId, Set.Set<Text>>();

  let _nextTrackId   = { var value : Nat = 0 };
  let _nextSaleId    = { var value : Nat = 0 };
  let _nextPayoutId  = { var value : Nat = 0 };
  let _nextCommentId = { var value : Nat = 0 };
  let _nextNotifId   = { var value : Nat = 0 };
  let _stripeConfig  = { var value : ?Stripe.StripeConfiguration = null };

  // ─── Admin State ──────────────────────────────────────────────────────────
  // pinHash is intentionally empty so the frontend can call adminInitializePIN()
  // once on first load, passing SHA-256 of the owner's chosen PIN (e.g. "8914").
  // After that, adminInitializePIN becomes a no-op and adminChangePIN is used.
  let _adminCredential : AdminTypes.AdminCredential = {
    var pinHash       = "";
    var sessionTokens = [];
  };
  // ─── Stripe transform (required by caffeineai-stripe) ────────────────────
  public query func transform(input : OutCall.TransformationInput) : async OutCall.TransformationOutput {
    OutCall.transform(input);
  };

  // ─── Stripe API (must live in actor per platform requirements) ───────────
  public query func isStripeConfigured() : async Bool {
    _stripeConfig.value != null;
  };

  public shared func setStripeConfiguration(adminToken : Text, config : Stripe.StripeConfiguration) : async () {
    let tokens = _adminCredential.sessionTokens;
    let found = tokens.find(func(t : Text) : Bool { t == adminToken });
    switch (found) {
      case null { Runtime.trap("Unauthorized: Admin access required") };
      case (?_) {};
    };
    _stripeConfig.value := ?config;
  };

  func requireStripeConfigActor() : Stripe.StripeConfiguration {
    switch (_stripeConfig.value) {
      case null { Runtime.trap("Stripe is not configured") };
      case (?c) { c };
    };
  };

  public shared ({ caller }) func createCheckoutSession(items : [Stripe.ShoppingItem], successUrl : Text, cancelUrl : Text) : async Text {
    // Anonymous callers are allowed — no login required to purchase
    let effectiveCaller = if (caller.isAnonymous()) { Principal.anonymous() } else { caller };
    await Stripe.createCheckoutSession(requireStripeConfigActor(), effectiveCaller, items, successUrl, cancelUrl, transform);
  };

  public func getStripeSessionStatus(sessionId : Text) : async Stripe.StripeSessionStatus {
    await Stripe.getSessionStatus(requireStripeConfigActor(), sessionId, transform);
  };

  // ─── Domain Mixin ─────────────────────────────────────────────────────────
  include ArtistsMixin(
    accessControlState,
    credentials,
    artists,
    tracks,
    sales,
    banking,
    payouts,
    storeComments,
    _nextTrackId,
    _nextSaleId,
    _nextPayoutId,
    _nextCommentId,
    _stripeConfig,
    transform,
  );

  // ─── Analytics & Notifications Mixin ─────────────────────────────────────
  include AnalyticsMixin(
    accessControlState,
    credentials,
    artists,
    tracks,
    sales,
    notifications,
    mailingSubscribers,
    _nextNotifId,
    storeLikes,
  );

  // ─── Likes Mixin ──────────────────────────────────────────────────────────
  include LikesMixin(trackLikes, storeLikes);

  // ─── Admin Mixin ──────────────────────────────────────────────────────────
  include AdminMixin(
    _adminCredential,
    artists,
    credentials,
    tracks,
  );
  // ─── Support Chat Mixin ───────────────────────────────────────────────────
  include SupportChatMixin(transform);

  // ─── Customer Auth & Purchase History Mixin ───────────────────────────────
  include CustomerAuthMixin(
    customerCredentials,
    sales,
    tracks,
  );
};
