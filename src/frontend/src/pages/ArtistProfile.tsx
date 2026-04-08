import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  Heart,
  Music,
  Pause,
  Play,
  Share2,
  ShoppingCart,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import { createActor } from "../backend";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";
import type { ArtistSocialLinks, TrackMetadataPublic } from "../types";
import { LikeResult } from "../types";

// Extended actor type for public profile with social links
type ActorWithProfile = ReturnType<typeof createActor> & {
  getArtistProfile: (artistId: string) => Promise<
    | {
        __kind__: "ok";
        ok: {
          id: string;
          bio: string;
          name: string;
          status: string;
          createdAt: bigint;
          socialLinks?: ArtistSocialLinks;
          instagram?: string;
          twitterX?: string;
          tiktok?: string;
          youtube?: string;
          facebook?: string;
          soundcloud?: string;
          spotify?: string;
          appleMusic?: string;
          website?: string;
        };
      }
    | {
        __kind__: "err";
        err: string;
      }
  >;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const GOLD = "#d4af37";
const GOLD_PROGRESS = "#f5c842";
const GOLD_REGION = "rgba(212,175,55,0.25)";

const GENRE_COLORS: Record<string, string> = {
  "Hip-Hop": "from-amber-950 to-amber-900",
  "R&B": "from-purple-950 to-purple-900",
  Pop: "from-pink-950 to-pink-900",
  Electronic: "from-cyan-950 to-cyan-900",
  Rock: "from-red-950 to-red-900",
  Jazz: "from-indigo-950 to-indigo-900",
  Classical: "from-emerald-950 to-emerald-900",
  Trap: "from-zinc-900 to-zinc-800",
  Soul: "from-yellow-950 to-yellow-900",
  Gospel: "from-orange-950 to-orange-900",
  Reggae: "from-green-950 to-green-900",
  Latin: "from-rose-950 to-rose-900",
  Country: "from-amber-900 to-amber-800",
  Blues: "from-blue-950 to-blue-900",
  Funk: "from-fuchsia-950 to-fuchsia-900",
  House: "from-violet-950 to-violet-900",
  Techno: "from-slate-900 to-slate-800",
  Metal: "from-stone-950 to-stone-900",
  Indie: "from-teal-950 to-teal-900",
  Alternative: "from-lime-950 to-lime-900",
  Folk: "from-amber-900 to-yellow-900",
  Afrobeats: "from-yellow-900 to-orange-900",
  Dancehall: "from-green-900 to-cyan-900",
  "Lo-Fi": "from-neutral-900 to-neutral-800",
  Drill: "from-zinc-950 to-zinc-900",
  Ambient: "from-sky-950 to-sky-900",
  EDM: "from-purple-900 to-pink-900",
  Other: "from-zinc-900 to-zinc-800",
};

function getGenreColor(genre: string): string {
  return GENRE_COLORS[genre] ?? "from-zinc-900 to-zinc-800";
}

// ─── Social Icons ─────────────────────────────────────────────────────────────

const SOCIAL_ICON_MAP: {
  key: keyof ArtistSocialLinks;
  emoji: string;
  label: string;
}[] = [
  { key: "instagram", emoji: "📸", label: "Instagram" },
  { key: "twitterX", emoji: "𝕏", label: "Twitter / X" },
  { key: "tiktok", emoji: "🎵", label: "TikTok" },
  { key: "youtube", emoji: "▶️", label: "YouTube" },
  { key: "facebook", emoji: "📘", label: "Facebook" },
  { key: "soundcloud", emoji: "☁️", label: "SoundCloud" },
  { key: "spotify", emoji: "🎧", label: "Spotify" },
  { key: "appleMusic", emoji: "🍎", label: "Apple Music" },
  { key: "website", emoji: "🌐", label: "Website" },
];

function normalizeUrl(url: string): string {
  if (!url) return "#";
  return url.startsWith("http://") || url.startsWith("https://")
    ? url
    : `https://${url}`;
}

function SocialIcons({ links }: { links: ArtistSocialLinks }) {
  const active = SOCIAL_ICON_MAP.filter((s) => !!links[s.key]);
  if (active.length === 0) return null;

  return (
    <div
      className="flex flex-wrap justify-center gap-2 mt-4"
      data-ocid="artist-social-icons"
    >
      {active.map(({ key, emoji, label }) => (
        <a
          key={key}
          href={normalizeUrl(links[key]!)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          title={label}
          className="w-9 h-9 rounded-full bg-muted/50 border border-border flex items-center justify-center text-base hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 hover:scale-110"
          data-ocid={`artist-social-${key}`}
        >
          <span className="text-sm leading-none select-none">{emoji}</span>
        </a>
      ))}
    </div>
  );
}

interface LikeButtonProps {
  trackId: bigint;
  initialCount: bigint;
}

function LikeButton({ trackId, initialCount }: LikeButtonProps) {
  const { actor } = useActor(createActor);
  const { likerToken } = useAppStore();
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  const { data: isLiked = false } = useQuery<boolean>({
    queryKey: ["track-liked", String(trackId), likerToken],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasLikedTrack(trackId, likerToken);
    },
    enabled: !!actor,
  });

  const { data: likeCount = initialCount } = useQuery<bigint>({
    queryKey: ["track-likes", String(trackId)],
    queryFn: async () => {
      if (!actor) return initialCount;
      return actor.getTrackLikes(trackId);
    },
    enabled: !!actor,
  });

  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      return isLiked
        ? actor.unlikeTrack(trackId, likerToken)
        : actor.likeTrack(trackId, likerToken);
    },
    onSuccess: (result) => {
      if (result === LikeResult.ok || result === LikeResult.notLiked) {
        queryClient.invalidateQueries({
          queryKey: ["track-liked", String(trackId)],
        });
        queryClient.invalidateQueries({
          queryKey: ["track-likes", String(trackId)],
        });
      }
    },
    onError: () => toast.error("Could not update like. Please try again."),
  });

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        likeMutation.mutate();
      }}
      disabled={likeMutation.isPending}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-smooth ${
        isLiked
          ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20"
          : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      aria-label={isLiked ? t("liked") : t("like")}
      data-ocid={`artist-track-like-${trackId}`}
    >
      <Heart
        className={`w-3.5 h-3.5 ${isLiked ? "fill-red-400 text-red-400" : ""} ${likeMutation.isPending ? "animate-pulse" : ""}`}
      />
      <span>{Number(likeCount).toLocaleString()}</span>
    </button>
  );
}

// ─── Share Button ─────────────────────────────────────────────────────────────

function ShareButton({ track }: { track: TrackMetadataPublic }) {
  const { t } = useTranslation();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: `${track.title} by ${track.artistName}`,
      text: `Check out "${track.title}" by ${track.artistName} on Chosen One Productions Distribution`,
      url: `${window.location.origin}/store?track=${track.id}`,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
        /* cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}\n${shareData.text}\n${shareData.url}`,
        );
        toast.success("Link copied to clipboard!");
      } catch {
        toast.error("Could not share. Please copy the URL manually.");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth"
      aria-label={t("share")}
      data-ocid={`artist-track-share-${track.id}`}
    >
      <Share2 className="w-3.5 h-3.5" />
      {t("share")}
    </button>
  );
}

// ─── Waveform Preview Panel ───────────────────────────────────────────────────

interface WaveformPreviewPanelProps {
  track: TrackMetadataPublic;
  onIncrementPreview: () => void;
  onClose: () => void;
}

function WaveformPreviewPanel({
  track,
  onIncrementPreview,
  onClose,
}: WaveformPreviewPanelProps) {
  const waveContainerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WaveSurfer | null>(null);
  const regionRef = useRef<{ start: number; end: number } | null>(null);
  const hasCountedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loadError, setLoadError] = useState(false);

  const audioUrl = track.audioFile?.getDirectURL?.();
  const previewStart = track.previewStartSecs ?? 0;
  const previewEnd = track.previewEndSecs ?? 30;

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (!waveContainerRef.current || !audioUrl) return;
    const ws = WaveSurfer.create({
      container: waveContainerRef.current,
      waveColor: GOLD,
      progressColor: GOLD_PROGRESS,
      cursorColor: GOLD_PROGRESS,
      cursorWidth: 2,
      barWidth: 2,
      barGap: 1,
      barRadius: 2,
      height: 64,
      normalize: true,
      url: audioUrl,
    });
    wsRef.current = ws;
    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
      regionRef.current = { start: previewStart, end: previewEnd };
      ws.seekTo(previewStart / ws.getDuration());
    });
    ws.on("audioprocess", (t: number) => {
      setCurrentTime(t);
      const end = regionRef.current?.end ?? previewEnd;
      if (t >= end) {
        ws.pause();
        ws.seekTo(
          (regionRef.current?.start ?? previewStart) / ws.getDuration(),
        );
        setIsPlaying(false);
      }
    });
    ws.on("play", () => setIsPlaying(true));
    ws.on("pause", () => setIsPlaying(false));
    ws.on("finish", () => {
      setIsPlaying(false);
      ws.seekTo((regionRef.current?.start ?? previewStart) / ws.getDuration());
    });
    ws.on("error", () => setLoadError(true));
    return () => {
      ws.destroy();
      wsRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl, previewStart, previewEnd]);

  const handlePlayPause = () => {
    const ws = wsRef.current;
    if (!ws || !isReady) return;
    if (isPlaying) {
      ws.pause();
    } else {
      if (!hasCountedRef.current) {
        hasCountedRef.current = true;
        onIncrementPreview();
      }
      const dur = ws.getDuration();
      if (dur > 0) {
        const pos = ws.getCurrentTime();
        const end = regionRef.current?.end ?? previewEnd;
        const start = regionRef.current?.start ?? previewStart;
        if (pos >= end || pos < start) ws.seekTo(start / dur);
      }
      ws.play().catch(() => {});
    }
  };

  const windowDuration = previewEnd - previewStart;
  const elapsed = Math.max(
    0,
    Math.min(currentTime - previewStart, windowDuration),
  );
  const progressPct = windowDuration > 0 ? (elapsed / windowDuration) * 100 : 0;

  return (
    <div
      className="border-t border-primary/20 bg-[#0f0f0f] p-4"
      data-ocid={`artist-waveform-${track.id}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="badge-accent text-xs">30s Preview</span>
          <span className="text-muted-foreground text-xs">
            {fmt(previewStart)} — {fmt(previewEnd)}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          aria-label="Close preview"
        >
          ✕
        </button>
      </div>

      <div className="relative rounded-lg overflow-hidden bg-[#111] p-2">
        {isReady && duration > 0 && (
          <div
            className="absolute top-2 bottom-2 rounded pointer-events-none"
            style={{
              left: `calc(${(previewStart / duration) * 100}% + 8px)`,
              width: `calc(${((previewEnd - previewStart) / duration) * 100}%)`,
              background: GOLD_REGION,
              border: `1px solid ${GOLD}40`,
            }}
          />
        )}
        <div
          ref={waveContainerRef}
          style={{ background: "transparent" }}
          className="relative z-10"
        />
      </div>

      <div className="flex items-center gap-3 mt-3">
        <button
          type="button"
          onClick={handlePlayPause}
          disabled={!isReady || loadError}
          className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/85 transition-colors disabled:opacity-50 shrink-0 gold-glow"
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
          data-ocid={`artist-waveform-play-${track.id}`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-primary-foreground" />
          ) : (
            <Play className="w-4 h-4 fill-primary-foreground ml-0.5" />
          )}
        </button>
        <div className="flex-1 flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground w-10 shrink-0 text-right">
            {fmt(Math.max(0, elapsed))}
          </span>
          <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progressPct}%`, background: GOLD }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-10 shrink-0">
            {fmt(windowDuration)}
          </span>
        </div>
        {!isReady && !loadError && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Loading…
          </span>
        )}
        {loadError && (
          <span className="text-xs text-destructive">Preview unavailable</span>
        )}
      </div>
    </div>
  );
}

// ─── Track Card ───────────────────────────────────────────────────────────────

interface TrackCardProps {
  track: TrackMetadataPublic;
  onAddToCart: (track: TrackMetadataPublic) => void;
  activePreviewId: bigint | null;
  onPreview: (track: TrackMetadataPublic) => void;
  isInCart: boolean;
  isBestSeller: boolean;
  isMostViewed: boolean;
}

function ArtistTrackCard({
  track,
  onAddToCart,
  activePreviewId,
  onPreview,
  isInCart,
  isBestSeller,
  isMostViewed,
}: TrackCardProps) {
  const { t } = useTranslation();
  const isPreviewOpen = activePreviewId === track.id;
  const coverUrl = track.coverArt?.getDirectURL?.();
  const colorClass = getGenreColor(track.genre);
  const actorRef = useRef<ReturnType<typeof createActor> | null>(null);
  const { actor } = useActor(createActor);
  actorRef.current = actor;

  const handleIncrementPreview = useCallback(() => {
    actorRef.current?.incrementPreviewCount(track.id).catch(() => {});
  }, [track.id]);

  return (
    <div
      className={`bg-card border rounded-xl overflow-hidden hover:border-primary/40 transition-smooth group flex flex-col relative ${
        isBestSeller
          ? "border-primary/50 ring-1 ring-primary/20"
          : "border-border"
      }`}
      data-ocid={`artist-profile-track-${track.id}`}
    >
      {(isBestSeller || isMostViewed) && (
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1.5 p-2 justify-end">
          {isBestSeller && (
            <span className="flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
              <Zap className="w-3 h-3" /> Best Seller
            </span>
          )}
          {isMostViewed && !isBestSeller && (
            <span className="flex items-center gap-1 bg-muted/90 text-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-lg border border-border">
              <TrendingUp className="w-3 h-3 text-primary" /> Most Viewed
            </span>
          )}
        </div>
      )}

      {/* Cover Art */}
      <div
        className={`aspect-square bg-gradient-to-br ${colorClass} relative overflow-hidden`}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Music className="w-12 h-12 text-foreground/20 group-hover:scale-110 transition-smooth" />
          </div>
        )}
        <button
          type="button"
          onClick={() => onPreview(track)}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center"
          aria-label={`Preview ${track.title}`}
          data-ocid={`artist-preview-${track.id}`}
        >
          <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg gold-glow">
            <Play className="w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" />
          </div>
        </button>
        {track.explicit && (
          <span className="absolute top-2 right-2 bg-black/70 text-foreground text-xs px-1.5 py-0.5 rounded font-mono font-bold">
            E
          </span>
        )}
        <span className="absolute bottom-2 left-2 badge-accent capitalize text-xs">
          {track.trackType}
        </span>
        {isPreviewOpen && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-semibold">Preview</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-foreground text-sm leading-tight truncate">
          {track.title}
        </h3>
        <div className="flex items-center justify-between mt-3">
          <Badge variant="secondary" className="text-xs shrink-0">
            {track.genre}
          </Badge>
          <span className="text-primary font-bold text-base ml-2">
            ${(Number(track.priceInCents) / 100).toFixed(2)}
          </span>
        </div>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span>{Number(track.saleCount).toLocaleString()} sales</span>
          <span>·</span>
          <span>{Number(track.previewCount).toLocaleString()} previews</span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <LikeButton trackId={track.id} initialCount={track.likeCount} />
          <ShareButton track={track} />
        </div>

        <Button
          size="sm"
          variant={isInCart ? "secondary" : "default"}
          className={`w-full mt-3 gap-2 text-xs ${isInCart ? "border border-primary/30" : ""}`}
          onClick={() => onAddToCart(track)}
          data-ocid={`artist-add-cart-${track.id}`}
        >
          {isInCart ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              {t("addToCart")} ✓
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              {t("addToCart")}
            </>
          )}
        </Button>
      </div>

      {isPreviewOpen && (
        <WaveformPreviewPanel
          track={track}
          onIncrementPreview={handleIncrementPreview}
          onClose={() => onPreview(track)}
        />
      )}
    </div>
  );
}

// ─── Skeleton Grid ────────────────────────────────────────────────────────────

function TrackSkeleton() {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <div className="p-4 space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <div className="flex justify-between">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-12" />
        </div>
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ArtistProfile() {
  const { artistId } = useParams({ strict: false }) as { artistId: string };
  const [activePreviewId, setActivePreviewId] = useState<bigint | null>(null);
  const [cartItems, setCartItems] = useState<TrackMetadataPublic[]>([]);

  const { actor, isFetching } = useActor(createActor);

  const { data: tracks = [], isLoading } = useQuery<TrackMetadataPublic[]>({
    queryKey: ["artist-tracks", artistId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTracksByArtist(artistId);
    },
    enabled: !!actor,
    refetchInterval: 30_000,
  });

  // Load public artist profile for social links and bio
  const { data: artistProfile } = useQuery({
    queryKey: ["artist-public-profile", artistId],
    queryFn: async () => {
      if (!actor) return null;
      const extActor = actor as unknown as ActorWithProfile;
      const result = await extActor.getArtistProfile(artistId);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching,
  });

  // Derive artist name — prefer profile name, fallback to first track
  const artistName = artistProfile?.name ?? tracks[0]?.artistName ?? "Artist";
  const artistBio = artistProfile?.bio ?? "";
  // Social links are now direct fields on ArtistProfilePublic
  const socialLinks: ArtistSocialLinks | null = artistProfile
    ? {
        instagram: artistProfile.instagram,
        twitterX: artistProfile.twitterX,
        tiktok: artistProfile.tiktok,
        youtube: artistProfile.youtube,
        facebook: artistProfile.facebook,
        soundcloud: artistProfile.soundcloud,
        spotify: artistProfile.spotify,
        appleMusic: artistProfile.appleMusic,
        website: artistProfile.website,
      }
    : null;

  // Compute highlight thresholds (same top-20% logic as Store.tsx)
  const maxSales = Math.max(1, ...tracks.map((t) => Number(t.saleCount)));
  const maxPreviews = Math.max(1, ...tracks.map((t) => Number(t.previewCount)));
  const bestSellerThreshold = maxSales * 0.8;
  const mostViewedThreshold = maxPreviews * 0.8;

  const cartSet = new Set(cartItems.map((t) => String(t.id)));

  const handleAddToCart = (track: TrackMetadataPublic) => {
    setCartItems((prev) => {
      const alreadyIn = prev.some((t) => t.id === track.id);
      if (alreadyIn) return prev.filter((t) => t.id !== track.id);
      return [...prev, track];
    });
    toast.success(
      `${cartItems.some((t) => t.id === track.id) ? "Removed from" : "Added to"} cart`,
    );
  };

  const handlePreview = (track: TrackMetadataPublic) => {
    setActivePreviewId((prev) => (prev === track.id ? null : track.id));
  };

  const showLoader = isLoading || (isFetching && tracks.length === 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          to="/store"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          data-ocid="artist-profile-back"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Store
        </Link>
      </div>

      {/* Hero */}
      <div className="bg-card border-b border-primary/20 relative overflow-hidden">
        {/* decorative gold glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Artist avatar */}
            <div
              className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center shadow-lg"
              style={{ width: "4.5rem", height: "4.5rem" }}
            >
              <Crown className="w-8 h-8 sm:w-9 sm:h-9 text-primary" />
            </div>

            <div className="px-4 sm:px-0">
              <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary tracking-tight">
                {showLoader ? (
                  <Skeleton className="h-10 w-48 mx-auto" />
                ) : (
                  artistName
                )}
              </h1>
              {artistBio && !showLoader && (
                <p className="text-muted-foreground mt-2 text-sm max-w-md mx-auto leading-relaxed">
                  {artistBio}
                </p>
              )}
              {!artistBio && (
                <p className="text-muted-foreground mt-2 text-base">
                  Full Catalog
                </p>
              )}
              {!showLoader && (
                <p className="text-primary/70 text-sm mt-1 font-medium">
                  {tracks.length} {tracks.length === 1 ? "track" : "tracks"}
                </p>
              )}
            </div>

            {/* Social media icons */}
            {socialLinks && <SocialIcons links={socialLinks} />}

            {/* Crown divider */}
            <div className="flex items-center gap-3 mt-2 w-full max-w-xs">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/20" />
              <Crown className="w-5 h-5 text-primary/60 shrink-0" />
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/20" />
            </div>
          </div>
        </div>
      </div>

      {/* Track Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {showLoader ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
              (k) => (
                <TrackSkeleton key={k} />
              ),
            )}
          </div>
        ) : tracks.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-24 gap-4"
            data-ocid="artist-no-tracks"
          >
            <Crown className="w-12 h-12 text-primary/30" />
            <p className="text-primary font-display font-bold text-xl text-center">
              No releases yet 👑
            </p>
            <p className="text-muted-foreground text-sm text-center max-w-xs">
              This artist hasn't published any tracks yet. Check back soon.
            </p>
            <Link to="/store">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 mt-2"
              >
                Browse Store
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
            data-ocid="artist-track-grid"
          >
            {tracks.map((track) => (
              <ArtistTrackCard
                key={String(track.id)}
                track={track}
                onAddToCart={handleAddToCart}
                activePreviewId={activePreviewId}
                onPreview={handlePreview}
                isInCart={cartSet.has(String(track.id))}
                isBestSeller={
                  Number(track.saleCount) >= bestSellerThreshold &&
                  Number(track.saleCount) > 0
                }
                isMostViewed={
                  Number(track.previewCount) >= mostViewedThreshold &&
                  Number(track.previewCount) > 0
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
