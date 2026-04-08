import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export interface TransformationOutput {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface RoyaltyDashboard {
    trackBreakdown: Array<TrackRoyalty>;
    availableBalanceCents: bigint;
    periodStats: PeriodStats;
    payouts: Array<PayoutPublic>;
}
export interface TrackMetadataPublic {
    id: TrackId;
    title: string;
    likeCount: bigint;
    trackType: TrackType;
    saleCount: bigint;
    previewEndSecs: number;
    createdAt: Timestamp;
    previewStartSecs: number;
    explicit: boolean;
    artistId: ArtistId;
    description: string;
    audioFile: ExternalBlob;
    songDetails: string;
    state: TrackState;
    previewCount: bigint;
    genre: string;
    preOrder: boolean;
    artistName: string;
    coverArt: ExternalBlob;
    priceInCents: bigint;
    releaseDate: string;
}
export interface ArtistSocialLinks {
    tiktok?: string;
    soundcloud?: string;
    instagram?: string;
    twitterX?: string;
    website?: string;
    facebook?: string;
    spotify?: string;
    youtube?: string;
    appleMusic?: string;
}
export interface ArtistDashboardStats {
    totalTracks: bigint;
    totalEarningsCents: bigint;
    totalPreviews: bigint;
    totalSales: bigint;
}
export interface TrackUploadInput {
    title: string;
    trackType: TrackType;
    previewEndSecs?: number;
    previewStartSecs?: number;
    explicit: boolean;
    description: string;
    audioFile: ExternalBlob;
    songDetails?: string;
    genre: string;
    preOrder: boolean;
    artistName: string;
    coverArt: ExternalBlob;
    priceInCents: bigint;
    releaseDate: string;
}
export interface ArtistTrackSummary {
    id: TrackId;
    title: string;
    trackType: TrackType;
    saleCount: bigint;
    state: TrackState;
    previewCount: bigint;
    genre: string;
    priceInCents: bigint;
    releaseDate: string;
}
export type PayoutId = bigint;
export interface TransformationInput {
    context: Uint8Array;
    response: http_request_result;
}
export interface PeriodStats {
    previews: bigint;
    grossRevenueCents: bigint;
    sales: bigint;
    periodLabel: string;
    payoutCents: bigint;
}
export type StripeSessionStatus = {
    __kind__: "completed";
    completed: {
        userPrincipal?: string;
        response: string;
    };
} | {
    __kind__: "failed";
    failed: {
        error: string;
    };
};
export interface StripeConfiguration {
    allowedCountries: Array<string>;
    secretKey: string;
}
export interface TrackRoyalty {
    title: string;
    earningsCents: bigint;
    previews: bigint;
    grossRevenueCents: bigint;
    sales: bigint;
    trackId: TrackId;
}
export interface BankingInfoPublic {
    routingNumber: string;
    artistId: ArtistId;
    accountHolderName: string;
    bankName: string;
    updatedAt: Timestamp;
    accountNumber: string;
}
export interface DownloadReportEntry {
    expiresAt: Timestamp;
    saleId: SaleId;
    trackTitle: string;
    downloadAvailable: boolean;
    purchasedAt: Timestamp;
    trackId: TrackId;
    artistName: string;
    format: string;
}
export interface RealTimeDashboardStats {
    trackPreviews: bigint;
    totalSales: bigint;
    grossRevenue: bigint;
    artistPayout: bigint;
    totalListens: bigint;
}
export type CommentId = bigint;
export interface ArtistProfilePublic {
    id: ArtistId;
    bio: string;
    status: ArtistStatus;
    tiktok?: string;
    soundcloud?: string;
    instagram?: string;
    name: string;
    createdAt: Timestamp;
    twitterX?: string;
    website?: string;
    facebook?: string;
    spotify?: string;
    youtube?: string;
    appleMusic?: string;
}
export type ArtistId = string;
export interface StoreCommentPublic {
    id: CommentId;
    authorId: ArtistId;
    body: string;
    createdAt: Timestamp;
    authorName: string;
    rating: bigint;
}
export interface ArtistAdminView {
    id: ArtistId;
    bio: string;
    status: ArtistStatus;
    lastLoginAt?: Timestamp;
    name: string;
    createdAt: Timestamp;
}
export interface PayoutPublic {
    id: PayoutId;
    status: PayoutStatus;
    artistId: ArtistId;
    amountCents: bigint;
    processedAt?: Timestamp;
    requestedAt: Timestamp;
}
export interface http_header {
    value: string;
    name: string;
}
export interface http_request_result {
    status: bigint;
    body: Uint8Array;
    headers: Array<http_header>;
}
export interface ShoppingItem {
    productName: string;
    currency: string;
    quantity: bigint;
    priceInCents: bigint;
    productDescription: string;
}
export interface Notification {
    id: bigint;
    notifType: NotificationType;
    artistId: ArtistId;
    message: string;
    recipientToken?: string;
    timestamp: Timestamp;
}
export type TrackId = bigint;
export type SaleId = bigint;
export enum ArtistStatus {
    deleted = "deleted",
    active = "active",
    suspended = "suspended"
}
export enum LikeResult {
    ok = "ok",
    notLiked = "notLiked",
    alreadyLiked = "alreadyLiked"
}
export enum NotificationType {
    artistJoined = "artistJoined",
    newComment = "newComment",
    trackUploaded = "trackUploaded",
    newDrop = "newDrop",
    newSale = "newSale"
}
export enum PayoutStatus {
    pending = "pending",
    processed = "processed",
    failed = "failed"
}
export enum TrackState {
    deleted = "deleted",
    published = "published",
    uploaded = "uploaded",
    preOrder = "preOrder"
}
export enum TrackType {
    album = "album",
    single = "single"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addStoreComment(token: string, authorName: string, body: string, rating: bigint): Promise<{
        __kind__: "ok";
        ok: CommentId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminChangePIN(token: string, currentPinHash: string, newPinHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminDeleteArtist(token: string, artistId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminInitializePIN(newPinHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminListArtists(token: string): Promise<{
        __kind__: "ok";
        ok: Array<ArtistAdminView>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogin(pinHash: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminLogout(token: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminResetArtistPIN(token: string, artistId: string, newPinHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminSuspendArtist(token: string, artistId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    adminUnsuspendArtist(token: string, artistId: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    askSupportChat(question: string, language: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changePIN(token: string, currentPinHash: string, newPinHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    createCheckoutSession(items: Array<ShoppingItem>, successUrl: string, cancelUrl: string): Promise<string>;
    createTrackCheckoutSession(token: string, trackId: TrackId, successUrl: string, cancelUrl: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteArtistAccount(token: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    deleteTrack(token: string, trackId: TrackId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    filterTracksByGenre(genre: string): Promise<Array<TrackMetadataPublic>>;
    fulfillTrackPurchase(token: string, trackId: TrackId, stripeSessionId: string, buyerEmail: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getArtistDashboardStats(token: string): Promise<{
        __kind__: "ok";
        ok: ArtistDashboardStats;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getArtistProfile(artistId: ArtistId): Promise<{
        __kind__: "ok";
        ok: ArtistProfilePublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getArtistSecurityQuestion(artistName: string): Promise<string | null>;
    getArtistStoreLikes(artistId: string): Promise<bigint>;
    getArtistTracks(token: string): Promise<{
        __kind__: "ok";
        ok: Array<ArtistTrackSummary>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getBankingInfo(token: string): Promise<{
        __kind__: "ok";
        ok: BankingInfoPublic | null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCallerUserRole(): Promise<UserRole>;
    getCustomerDownloadReport(customerToken: string): Promise<{
        __kind__: "ok";
        ok: Array<DownloadReportEntry>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getCustomerPurchases(customerToken: string): Promise<{
        __kind__: "ok";
        ok: Array<TrackMetadataPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getDownloadReport(token: string): Promise<{
        __kind__: "ok";
        ok: Array<DownloadReportEntry>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getMailingListSubscribers(): Promise<Array<string>>;
    getMyArtistProfile(token: string): Promise<ArtistProfilePublic | null>;
    getMyPayouts(token: string): Promise<{
        __kind__: "ok";
        ok: Array<PayoutPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getPurchasedTracks(token: string): Promise<{
        __kind__: "ok";
        ok: Array<TrackMetadataPublic>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRealTimeDashboardStats(token: string): Promise<{
        __kind__: "ok";
        ok: RealTimeDashboardStats;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getRecentNotifications(token: string): Promise<Array<Notification>>;
    getRoyaltyDashboard(token: string, periodLabel: string): Promise<{
        __kind__: "ok";
        ok: RoyaltyDashboard;
    } | {
        __kind__: "err";
        err: string;
    }>;
    getStripeSessionStatus(sessionId: string): Promise<StripeSessionStatus>;
    getStripeSessionStatus_internal(sessionId: string): Promise<StripeSessionStatus>;
    getTrack(trackId: TrackId): Promise<TrackMetadataPublic | null>;
    getTrackLikes(trackId: bigint): Promise<bigint>;
    getTracksByArtist(artistId: ArtistId): Promise<Array<TrackMetadataPublic>>;
    hasLikedStore(artistId: string, likerToken: string): Promise<boolean>;
    hasLikedTrack(trackId: bigint, likerToken: string): Promise<boolean>;
    incrementPreviewCount(trackId: TrackId): Promise<void>;
    isAdminSession(token: string): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    isStripeConfigured(): Promise<boolean>;
    likeArtistStore(artistId: string, likerToken: string): Promise<LikeResult>;
    likeTrack(trackId: bigint, likerToken: string): Promise<LikeResult>;
    listPublishedTracks(): Promise<Array<TrackMetadataPublic>>;
    listStoreComments(): Promise<Array<StoreCommentPublic>>;
    loginArtist(name: string, pinHash: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    loginCustomer(email: string, pinHash: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    logoutArtist(token: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    logoutCustomer(token: string): Promise<void>;
    notifyArtistJoined(artistName: string): Promise<void>;
    notifyNewComment(artistId: ArtistId, authorName: string): Promise<void>;
    notifyNewSale(artistId: ArtistId, trackTitle: string): Promise<void>;
    notifyTrackUploaded(token: string, trackTitle: string): Promise<void>;
    publishTrack(token: string, trackId: TrackId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    requestPayout(token: string, amountCents: bigint): Promise<{
        __kind__: "ok";
        ok: PayoutId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    resetPINWithSecurityAnswer(artistName: string, answerHash: string, newPINHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    saveBankingInfo(token: string, accountHolderName: string, bankName: string, routingNumber: string, accountNumber: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    searchTracks(searchTerm: string): Promise<Array<TrackMetadataPublic>>;
    setArtistSecurityQuestion(token: string, question: string, answerHash: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setStripeConfiguration(adminToken: string, config: StripeConfiguration): Promise<void>;
    signupArtist(name: string, pinHash: string): Promise<{
        __kind__: "ok";
        ok: ArtistProfilePublic;
    } | {
        __kind__: "err";
        err: string;
    }>;
    signupCustomer(email: string, pinHash: string): Promise<{
        __kind__: "ok";
        ok: string;
    } | {
        __kind__: "err";
        err: string;
    }>;
    subscribeToMailingList(email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    transform(input: TransformationInput): Promise<TransformationOutput>;
    unlikeArtistStore(artistId: string, likerToken: string): Promise<LikeResult>;
    unlikeTrack(trackId: bigint, likerToken: string): Promise<LikeResult>;
    unpublishTrack(token: string, trackId: TrackId): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateArtistProfile(token: string, name: string, bio: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateArtistSocialLinks(token: string, links: ArtistSocialLinks): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    updateTrackMetadata(token: string, trackId: TrackId, title: string, genre: string, priceInCents: bigint, description: string, releaseDate: string, explicit: boolean, preOrder: boolean, previewStartSecs: number | null, previewEndSecs: number | null, songDetails: string | null): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    uploadTrack(token: string, input: TrackUploadInput): Promise<{
        __kind__: "ok";
        ok: TrackId;
    } | {
        __kind__: "err";
        err: string;
    }>;
    validateCustomerSession(token: string): Promise<boolean>;
    validateSession(token: string): Promise<{
        __kind__: "ok";
        ok: ArtistId;
    } | {
        __kind__: "err";
        err: string;
    }>;
}
