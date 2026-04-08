import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Crown,
  Download,
  FileText,
  Heart,
  LogOut,
  Music,
  Pause,
  Play,
  Receipt,
  Search,
  Share2,
  ShoppingBag,
  ShoppingCart,
  Star,
  Trash2,
  TrendingUp,
  Trophy,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import WaveSurfer from "wavesurfer.js";
import { createActor } from "../backend";
import { CrownThankYou } from "../components/CrownThankYou";
import { useAuth } from "../hooks/use-auth";
import { useCustomerAuth } from "../hooks/use-customer-auth";
import { useTranslation } from "../hooks/use-translation";
import { useAppStore } from "../store";
import { useCartStore } from "../store/cart";
import type {
  DownloadReportEntry,
  StoreCommentPublic,
  TrackMetadataPublic,
} from "../types";
import { LikeResult } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const ALL_GENRES = [
  "All",
  "Hip-Hop",
  "R&B",
  "Pop",
  "Electronic",
  "Rock",
  "Jazz",
  "Classical",
  "Trap",
  "Soul",
  "Gospel",
  "Reggae",
  "Latin",
  "Country",
  "Blues",
  "Funk",
  "House",
  "Techno",
  "Metal",
  "Indie",
  "Alternative",
  "Folk",
  "Afrobeats",
  "Dancehall",
  "Lo-Fi",
  "Drill",
  "Ambient",
  "EDM",
  "Other",
] as const;

type GenreFilter = (typeof ALL_GENRES)[number] | string;

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
  Folk: "from-amber-900 to-orange-900",
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

const GOLD = "#d4af37";
const GOLD_PROGRESS = "#f5c842";
const GOLD_REGION = "rgba(212,175,55,0.25)";
const WAVEFORM_BG = "transparent";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getFormatLabel(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".wav") || lower.includes("wav")) return "WAV";
  if (lower.includes(".flac") || lower.includes("flac")) return "FLAC";
  return "MP3";
}

function triggerDownload(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// ─── Receipt Generator ────────────────────────────────────────────────────────

interface ReceiptItem {
  title: string;
  artist: string;
  price: number;
}

function generateReceiptPng(
  items: ReceiptItem[],
  total: number,
  sessionId: string,
): string {
  const canvas = document.createElement("canvas");
  const W = 600;
  const lineH = 28;
  const padding = 40;
  const headerH = 180;
  const footerH = 80;
  const itemsH = Math.max(items.length * lineH + 60, 80);
  canvas.width = W;
  canvas.height = headerH + itemsH + footerH + padding * 2;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";

  const H = canvas.height;
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 3;
  ctx.strokeRect(12, 12, W - 24, H - 24);
  ctx.font = "52px serif";
  ctx.textAlign = "center";
  ctx.fillText("👑", W / 2, 68);
  ctx.fillStyle = "#d4af37";
  ctx.font = "bold 22px Georgia, serif";
  ctx.fillText("CHOSEN ONE DISTRIBUTION", W / 2, 98);
  ctx.fillStyle = "#b8962e";
  ctx.font = "13px Georgia, serif";
  ctx.fillText("Official Purchase Receipt", W / 2, 120);
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, 136);
  ctx.lineTo(W - padding, 136);
  ctx.stroke();
  ctx.textAlign = "left";
  ctx.fillStyle = "#888";
  ctx.font = "12px monospace";
  const receiptId = sessionId
    ? `#${sessionId.slice(-8).toUpperCase()}`
    : `#${Date.now().toString(36).toUpperCase()}`;
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  ctx.fillText(`Receipt ${receiptId}`, padding, 158);
  ctx.textAlign = "right";
  ctx.fillText(`Date: ${dateStr}`, W - padding, 158);
  ctx.textAlign = "left";
  ctx.fillStyle = "#aaa";
  ctx.fillText("Sold to: Valued Customer", padding, 176);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, 190);
  ctx.lineTo(W - padding, 190);
  ctx.stroke();
  let y = 220;
  ctx.font = "11px monospace";
  ctx.fillStyle = "#888";
  ctx.fillText("ITEM", padding, y - 10);
  ctx.textAlign = "right";
  ctx.fillText("PRICE", W - padding, y - 10);
  ctx.strokeStyle = "#222";
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 14;
  for (const item of items) {
    ctx.textAlign = "left";
    ctx.fillStyle = "#e8e8e8";
    ctx.font = "bold 13px Georgia, serif";
    const titleClipped =
      item.title.length > 38 ? `${item.title.slice(0, 36)}…` : item.title;
    ctx.fillText(titleClipped, padding, y + lineH - 8);
    ctx.fillStyle = "#888";
    ctx.font = "11px monospace";
    ctx.fillText(`by ${item.artist}`, padding, y + lineH + 6);
    ctx.textAlign = "right";
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 14px Georgia, serif";
    ctx.fillText(`$${item.price.toFixed(2)}`, W - padding, y + lineH - 4);
    y += lineH + 16;
  }
  y += 6;
  ctx.strokeStyle = "#d4af37";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 24;
  ctx.textAlign = "left";
  ctx.fillStyle = "#888";
  ctx.font = "12px monospace";
  ctx.fillText("TOTAL PAID", padding, y + 4);
  ctx.textAlign = "right";
  ctx.fillStyle = "#f5c842";
  ctx.font = "bold 22px Georgia, serif";
  ctx.fillText(`$${total.toFixed(2)}`, W - padding, y + 6);
  y += 40;
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(padding, y);
  ctx.lineTo(W - padding, y);
  ctx.stroke();
  y += 24;
  ctx.textAlign = "center";
  ctx.fillStyle = "#d4af37";
  ctx.font = "13px Georgia, serif";
  ctx.fillText("Thank you for supporting independent artists 👑", W / 2, y);
  y += 20;
  ctx.fillStyle = "#555";
  ctx.font = "11px monospace";
  ctx.fillText("chosenonedist.com", W / 2, y);
  return canvas.toDataURL("image/png");
}

// ─── Like Button ─────────────────────────────────────────────────────────────

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
      const result = isLiked
        ? await actor.unlikeTrack(trackId, likerToken)
        : await actor.likeTrack(trackId, likerToken);
      return result;
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
    onError: () => {
      toast.error("Could not update like. Please try again.");
    },
  });

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        likeMutation.mutate();
      }}
      disabled={likeMutation.isPending}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-smooth min-h-[36px] ${
        isLiked
          ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20"
          : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"
      }`}
      aria-label={isLiked ? t("liked") : t("like")}
      data-ocid={`track-like-${trackId}`}
    >
      <Heart
        className={`w-3.5 h-3.5 ${isLiked ? "fill-red-400 text-red-400" : ""} ${likeMutation.isPending ? "animate-pulse" : ""}`}
      />
      <span>{Number(likeCount).toLocaleString()}</span>
    </button>
  );
}

// ─── Share Button ─────────────────────────────────────────────────────────────

interface ShareButtonProps {
  track: TrackMetadataPublic;
}

function ShareButton({ track }: ShareButtonProps) {
  const { t } = useTranslation();

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const trackUrl = `${window.location.origin}/store?track=${track.id}`;
    const shareText = `"${track.title}" by ${track.artistName} on Chosen One Distribution — listen and buy now`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${track.title} by ${track.artistName}`,
          text: shareText,
          url: trackUrl,
        });
      } catch {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${trackUrl}`);
        toast.success("Link copied!");
      } catch {
        toast.error("Could not share. Please copy the URL manually.");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth min-h-[36px]"
      aria-label={t("share")}
      data-ocid={`track-share-${track.id}`}
    >
      <Share2 className="w-3.5 h-3.5" />
      {t("share")}
    </button>
  );
}

// ─── Cart Panel ───────────────────────────────────────────────────────────────

interface CartItem {
  track: TrackMetadataPublic;
}

interface CartPanelProps {
  items: CartItem[];
  onRemove: (trackId: bigint) => void;
  onClearAll: () => void;
  onCheckout: () => void;
  isCheckingOut: boolean;
}

function CartPanel({
  items,
  onRemove,
  onClearAll,
  onCheckout,
  isCheckingOut,
}: CartPanelProps) {
  const { t } = useTranslation();
  const totalCents = items.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0,
  );
  const totalDollars = (totalCents / 100).toFixed(2);

  return (
    <div
      className="bg-card border border-primary/30 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-lg"
      data-ocid="cart-panel"
    >
      {/* Header */}
      <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center justify-between bg-primary/5">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="font-display font-bold text-foreground tracking-wide uppercase text-xs sm:text-sm">
            {t("yourCart")}
          </span>
          {items.length > 0 && (
            <Badge
              variant="secondary"
              className="text-xs border border-primary/40 text-primary font-bold"
            >
              {items.length}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {items.length > 1 && (
            <button
              type="button"
              onClick={onClearAll}
              className="flex items-center gap-1 sm:gap-1.5 text-xs text-muted-foreground hover:text-destructive border border-border hover:border-destructive/50 rounded-md px-2 py-1 transition-colors min-h-[32px]"
              aria-label="Remove all items from cart"
              data-ocid="cart-clear-all-btn"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Remove All</span>
            </button>
          )}
          <span className="text-primary font-bold text-sm sm:text-base">
            ${totalDollars}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-8 sm:py-10 text-center"
          data-ocid="cart-empty-state"
        >
          <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground text-sm">{t("cartEmpty")}</p>
        </div>
      ) : (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5">
          <div className="space-y-2 pt-3 sm:pt-4">
            {items.map((item) => {
              const coverUrl = item.track.coverArt?.getDirectURL?.();
              return (
                <div
                  key={String(item.track.id)}
                  className="flex items-center gap-2 sm:gap-3 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg p-2.5 sm:p-3 transition-colors group/item"
                  data-ocid={`cart-item-${item.track.id}`}
                >
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`}
                  >
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={item.track.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Music className="w-4 h-4 text-foreground/30" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs sm:text-sm text-foreground truncate">
                      {item.track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.track.artistName}
                    </p>
                  </div>
                  <span className="text-primary font-bold text-xs sm:text-sm shrink-0">
                    ${(Number(item.track.priceInCents) / 100).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(item.track.id)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors shrink-0 min-h-[36px] min-w-[36px] justify-center"
                    aria-label={`Remove "${item.track.title}" from cart`}
                    data-ocid={`cart-remove-${item.track.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline text-xs font-medium ml-0.5">
                      Remove
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-muted-foreground">{t("cartTotal")}</p>
              <p className="text-xl sm:text-2xl font-bold text-primary font-display">
                ${totalDollars}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {items.length} track{items.length !== 1 ? "s" : ""}
              </p>
            </div>
            <Button
              onClick={onCheckout}
              disabled={isCheckingOut}
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gold-glow w-full sm:w-auto min-h-[44px]"
              data-ocid="cart-checkout-btn"
            >
              {isCheckingOut ? (
                <>
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Processing…
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  {t("proceedToCheckout")}
                </>
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Purchase Success Modal ───────────────────────────────────────────────────

interface PurchaseSuccessModalProps {
  track: TrackMetadataPublic;
  sessionId?: string;
  onClose: () => void;
}

function PurchaseSuccessModal({
  track,
  sessionId = "",
  onClose,
}: PurchaseSuccessModalProps) {
  const { t } = useTranslation();
  const { showThankYou } = useAppStore();
  const audioUrl = track.audioFile?.getDirectURL?.();
  const coverUrl = track.coverArt?.getDirectURL?.();
  const format = audioUrl ? getFormatLabel(audioUrl) : "MP3";
  const filename = `${track.artistName} - ${track.title}.${format.toLowerCase()}`;
  const hasAutoDownloaded = useRef(false);

  useEffect(() => {
    if (audioUrl && !hasAutoDownloaded.current) {
      hasAutoDownloaded.current = true;
      setTimeout(() => {
        triggerDownload(audioUrl, filename);
      }, 600);
      showThankYou([`${track.title} — ${track.artistName}`]);
    }
  }, [audioUrl, filename, showThankYou, track.title, track.artistName]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleDownload = () => {
    if (audioUrl) triggerDownload(audioUrl, filename);
  };

  const handleDownloadReceipt = () => {
    const priceUsd = Number(track.priceInCents) / 100;
    const dataUrl = generateReceiptPng(
      [{ title: track.title, artist: track.artistName, price: priceUsd }],
      priceUsd,
      sessionId,
    );
    if (!dataUrl) {
      toast.error("Could not generate receipt.");
      return;
    }
    const dateStr = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `receipt-${dateStr}-${sessionId.slice(-6) || "purchase"}.png`;
    a.click();
    toast.success("Receipt downloaded!");
  };

  const handleReturnToStore = () => {
    window.history.replaceState({}, "", "/store");
    onClose();
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm w-full h-full max-w-none max-h-none m-0 border-none"
      aria-modal="true"
      aria-labelledby="purchase-success-title"
      data-ocid="purchase-success-modal"
    >
      <div className="relative bg-card border border-primary/30 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden">
        <div className="h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" />
        <button
          type="button"
          onClick={handleReturnToStore}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-5 sm:p-6 flex flex-col items-center text-center gap-4 sm:gap-5">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center animate-crown-glow-pulse">
              <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            </div>
            <Crown className="w-5 h-5 text-primary absolute -top-1 -right-1" />
          </div>

          <div>
            <p className="text-primary font-semibold text-xs uppercase tracking-widest mb-1">
              {t("purchaseComplete")}
            </p>
            <h2
              id="purchase-success-title"
              className="font-display font-bold text-xl sm:text-2xl text-foreground"
            >
              {t("thankYou")}
            </h2>
            <p className="text-muted-foreground text-xs mt-1">
              Chosen One Productions Distribution
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 bg-muted/40 rounded-xl p-3 sm:p-4 w-full text-left">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br ${getGenreColor(track.genre)} flex items-center justify-center shrink-0 overflow-hidden`}
            >
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={track.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Music className="w-7 h-7 sm:w-8 sm:h-8 text-foreground/30" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-display font-bold text-foreground truncate">
                {track.title}
              </p>
              <p className="text-muted-foreground text-sm truncate mt-0.5">
                {track.artistName}
              </p>
              <Badge
                variant="secondary"
                className="mt-2 text-xs font-mono border border-primary/30 text-primary"
              >
                {format}
              </Badge>
            </div>
          </div>

          <p className="text-muted-foreground text-xs sm:text-sm">
            Your download should start automatically. If it didn't, click below:
          </p>

          <Button
            onClick={handleDownload}
            className="w-full gap-2 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg gold-glow min-h-[44px]"
            data-ocid="purchase-download-btn"
          >
            <Download className="w-5 h-5" />
            {t("downloadNow")} ({format})
          </Button>

          <Button
            variant="outline"
            onClick={handleDownloadReceipt}
            className="w-full gap-2 border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]"
            data-ocid="purchase-receipt-btn"
          >
            <Receipt className="w-4 h-4" />
            Download Receipt
          </Button>

          <Button
            variant="outline"
            onClick={handleReturnToStore}
            className="w-full gap-2 min-h-[44px]"
            data-ocid="purchase-return-store-btn"
          >
            Return to Store
          </Button>
        </div>
      </div>
    </dialog>
  );
}

// ─── My Purchases Panel ───────────────────────────────────────────────────────

function PurchasedTrackCard({ track }: { track: TrackMetadataPublic }) {
  const { t } = useTranslation();
  const audioUrl = track.audioFile?.getDirectURL?.();
  const coverUrl = track.coverArt?.getDirectURL?.();
  const format = audioUrl ? getFormatLabel(audioUrl) : "MP3";
  const filename = `${track.artistName} - ${track.title}.${format.toLowerCase()}`;

  return (
    <div
      className="flex items-center gap-2 sm:gap-3 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg p-2.5 sm:p-3 transition-colors"
      data-ocid={`purchased-track-${track.id}`}
    >
      <div
        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-br ${getGenreColor(track.genre)} flex items-center justify-center shrink-0 overflow-hidden`}
      >
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={track.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <Music className="w-4 h-4 sm:w-5 sm:h-5 text-foreground/30" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-xs sm:text-sm text-foreground truncate">
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">
          {track.artistName}
        </p>
      </div>
      <Badge
        variant="secondary"
        className="text-xs font-mono shrink-0 border border-primary/20 text-primary hidden sm:flex"
      >
        {format}
      </Badge>
      <Button
        size="sm"
        variant="outline"
        onClick={() => audioUrl && triggerDownload(audioUrl, filename)}
        className="gap-1 sm:gap-1.5 text-xs shrink-0 border-primary/30 text-primary hover:bg-primary/10 min-h-[36px]"
        data-ocid={`purchased-download-${track.id}`}
      >
        <Download className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">{t("reDownload")}</span>
      </Button>
    </div>
  );
}

interface MyPurchasesPanelProps {
  actor: ReturnType<typeof createActor> | null;
  sessionToken: string | null;
  customerToken: string | null;
  customerEmail: string | null;
  actorReady: boolean;
  onCustomerLogout: () => void;
}

function MyPurchasesPanel({
  actor,
  sessionToken,
  customerToken,
  customerEmail,
  actorReady,
  onCustomerLogout,
}: MyPurchasesPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const { t } = useTranslation();

  const activeToken = customerToken ?? sessionToken;
  const isCustomerMode = !!customerToken;

  const { data: purchasedTracks = [], isLoading } = useQuery<
    TrackMetadataPublic[]
  >({
    queryKey: ["purchased-tracks", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return [];
      try {
        const result = isCustomerMode
          ? await actor.getCustomerPurchases(activeToken)
          : await actor.getPurchasedTracks(activeToken);
        if (result.__kind__ === "ok") return result.ok;
        return [];
      } catch {
        return [];
      }
    },
    enabled: actorReady && !!activeToken && isExpanded,
  });

  const { data: purchaseCount = 0 } = useQuery<number>({
    queryKey: ["purchased-tracks-count", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return 0;
      try {
        const result = isCustomerMode
          ? await actor.getCustomerPurchases(activeToken)
          : await actor.getPurchasedTracks(activeToken);
        if (result.__kind__ === "ok") return result.ok.length;
        return 0;
      } catch {
        return 0;
      }
    },
    enabled: actorReady && !!activeToken,
  });

  const { data: downloadReport = [], isLoading: reportLoading } = useQuery<
    DownloadReportEntry[]
  >({
    queryKey: ["download-report", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return [];
      try {
        const result = isCustomerMode
          ? await actor.getCustomerDownloadReport(activeToken)
          : await actor.getDownloadReport(activeToken);
        if (result.__kind__ === "ok") return result.ok;
        return [];
      } catch {
        return [];
      }
    },
    enabled: actorReady && !!activeToken && showReport,
  });

  if (!activeToken) {
    return (
      <div
        className="bg-card border border-primary/20 rounded-xl overflow-hidden mb-6 sm:mb-8"
        data-ocid="my-purchases-panel"
      >
        <div className="px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between">
          <div className="flex items-center gap-3">
            <Crown className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="font-display font-bold text-foreground text-sm">
                My Purchases
              </p>
              <p className="text-muted-foreground text-xs mt-0.5">
                Sign in to access and re-download your tracks
              </p>
            </div>
          </div>
          <Link
            to="/customer-login"
            data-ocid="purchases-signin-btn"
            className="w-full sm:w-auto"
          >
            <Button
              size="sm"
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto min-h-[44px]"
            >
              <ShoppingBag className="w-4 h-4" />
              Sign In to My Purchases
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-card border border-primary/20 rounded-xl overflow-hidden mb-6 sm:mb-8"
      data-ocid="my-purchases-panel"
    >
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 hover:bg-muted/30 transition-colors min-h-[48px]"
        aria-expanded={isExpanded}
        data-ocid="my-purchases-toggle"
      >
        <div className="flex items-center gap-2 sm:gap-2.5">
          <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <span className="font-display font-bold text-foreground tracking-wide uppercase text-xs sm:text-sm">
            {t("myPurchases")}
          </span>
          {isCustomerMode && customerEmail && (
            <span className="text-xs text-muted-foreground hidden md:inline">
              ({customerEmail})
            </span>
          )}
          {purchaseCount > 0 && (
            <span
              className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold"
              style={{ background: "#d4af37", color: "#000" }}
              data-ocid="my-purchases-count-badge"
            >
              {purchaseCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isCustomerMode && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onCustomerLogout();
              }}
              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive border border-border/50 hover:border-destructive/50 rounded-md px-2 py-1 transition-colors min-h-[32px]"
              aria-label="Sign out of customer account"
              data-ocid="customer-logout-btn"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border">
          {isLoading ? (
            <div className="space-y-3 pt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg bg-muted/20"
                >
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-md shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                  <Skeleton className="h-8 w-20 sm:w-24" />
                </div>
              ))}
            </div>
          ) : purchasedTracks.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-8 sm:py-10 text-center"
              data-ocid="purchases-empty-state"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted/60 flex items-center justify-center mb-3">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">
                No purchases yet.
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                Browse the store to find something you love.
              </p>
            </div>
          ) : (
            <div className="space-y-2 sm:space-y-3 pt-4">
              {purchasedTracks.map((track) => (
                <PurchasedTrackCard key={String(track.id)} track={track} />
              ))}
            </div>
          )}

          {/* Download Report */}
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border">
            <button
              type="button"
              onClick={() => setShowReport((o) => !o)}
              className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[36px]"
              data-ocid="download-report-toggle"
            >
              <FileText className="w-4 h-4 text-primary" />
              {showReport ? "Hide" : "View"} Download Report
              {showReport ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {showReport && (
              <div className="mt-3" data-ocid="download-report-table">
                {reportLoading ? (
                  <div className="space-y-2">
                    {[1, 2].map((i) => (
                      <Skeleton key={i} className="h-12 w-full rounded-lg" />
                    ))}
                  </div>
                ) : downloadReport.length === 0 ? (
                  <p className="text-xs text-muted-foreground py-4 text-center">
                    No download history found.
                  </p>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-border -mx-1">
                    <table className="w-full text-xs min-w-[400px]">
                      <thead>
                        <tr className="border-b border-border bg-muted/30">
                          <th className="text-left px-3 py-2 text-muted-foreground font-medium">
                            Track
                          </th>
                          <th className="text-left px-3 py-2 text-muted-foreground font-medium hidden sm:table-cell">
                            Artist
                          </th>
                          <th className="text-left px-3 py-2 text-muted-foreground font-medium">
                            Format
                          </th>
                          <th className="text-left px-3 py-2 text-muted-foreground font-medium">
                            {t("expires")}
                          </th>
                          <th className="text-center px-3 py-2 text-muted-foreground font-medium">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {downloadReport.map((entry) => {
                          const expiresDate = new Date(
                            Number(entry.expiresAt) / 1_000_000,
                          );
                          const isExpired = expiresDate < new Date();
                          return (
                            <tr
                              key={String(entry.saleId)}
                              className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors"
                            >
                              <td className="px-3 py-2 font-medium text-foreground">
                                {entry.trackTitle}
                              </td>
                              <td className="px-3 py-2 text-muted-foreground hidden sm:table-cell">
                                {entry.artistName}
                              </td>
                              <td className="px-3 py-2">
                                <Badge
                                  variant="secondary"
                                  className="text-xs border border-primary/20 text-primary font-mono"
                                >
                                  {entry.format}
                                </Badge>
                              </td>
                              <td className="px-3 py-2 text-muted-foreground">
                                {expiresDate.toLocaleDateString()}
                              </td>
                              <td className="px-3 py-2 text-center">
                                {entry.downloadAvailable && !isExpired ? (
                                  <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs">
                                    Available
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs text-muted-foreground"
                                  >
                                    Expired
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WaveformPreviewPanel ─────────────────────────────────────────────────────

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
  const [detailsOpen, setDetailsOpen] = useState(false);

  const audioUrl = track.audioFile?.getDirectURL?.();
  const previewStart = track.previewStartSecs ?? 0;
  const previewEnd = track.previewEndSecs ?? 30;
  const hasSongDetails = track.songDetails?.trim().length > 0;

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
      height: 60,
      normalize: true,
      url: audioUrl,
    });
    wsRef.current = ws;
    ws.on("ready", () => {
      const dur = ws.getDuration();
      setIsReady(true);
      setDuration(dur);
      regionRef.current = { start: previewStart, end: previewEnd };
      if (dur > 0 && previewStart > 0) ws.seekTo(previewStart / dur);
    });
    ws.on("audioprocess", (t: number) => {
      setCurrentTime(t);
      const end = regionRef.current?.end ?? previewEnd;
      const start = regionRef.current?.start ?? previewStart;
      if (t >= end) {
        ws.pause();
        const dur = ws.getDuration();
        if (dur > 0) ws.seekTo(start / dur);
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
        const currentPos = ws.getCurrentTime();
        const end = regionRef.current?.end ?? previewEnd;
        const start = regionRef.current?.start ?? previewStart;
        if (
          currentPos >= end ||
          currentPos < start ||
          (currentPos === 0 && start > 0)
        ) {
          ws.seekTo(start / dur);
        }
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
      className="border-t border-primary/20 bg-[#0f0f0f] p-3 sm:p-4 animate-slide-up"
      data-ocid={`waveform-preview-${track.id}`}
    >
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="badge-accent text-xs">30s Preview</span>
          <span className="text-muted-foreground text-xs hidden sm:inline">
            {fmt(previewStart)} — {fmt(previewEnd)}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          aria-label="Close preview"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Waveform — full width on all screens */}
      <div className="relative rounded-lg overflow-hidden bg-[#111] p-1.5 sm:p-2 w-full">
        {isReady && duration > 0 && (
          <div
            className="absolute top-1.5 bottom-1.5 sm:top-2 sm:bottom-2 rounded pointer-events-none"
            style={{
              left: `calc(${(previewStart / duration) * 100}% + 6px)`,
              width: `calc(${((previewEnd - previewStart) / duration) * 100}%)`,
              background: GOLD_REGION,
              border: `1px solid ${GOLD}40`,
            }}
          />
        )}
        <div
          ref={waveContainerRef}
          style={{ background: WAVEFORM_BG }}
          className="relative z-10 w-full"
        />
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3">
        <button
          type="button"
          onClick={handlePlayPause}
          disabled={!isReady || loadError}
          className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/85 transition-colors disabled:opacity-50 shrink-0 gold-glow"
          aria-label={isPlaying ? "Pause preview" : "Play preview"}
          data-ocid={`waveform-playpause-${track.id}`}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-primary-foreground" />
          ) : (
            <Play className="w-4 h-4 fill-primary-foreground ml-0.5" />
          )}
        </button>

        <div className="flex-1 flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-xs font-mono text-muted-foreground w-8 sm:w-10 shrink-0 text-right">
            {fmt(Math.max(0, elapsed))}
          </span>
          <div className="flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{ width: `${progressPct}%`, background: GOLD }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-8 sm:w-10 shrink-0">
            {fmt(windowDuration)}
          </span>
        </div>

        {!isReady && !loadError && (
          <span className="text-xs text-muted-foreground animate-pulse shrink-0">
            Loading…
          </span>
        )}
        {loadError && (
          <span className="text-xs text-destructive shrink-0">Unavailable</span>
        )}
      </div>

      {hasSongDetails && (
        <div className="mt-3 sm:mt-4 border border-border rounded-lg overflow-hidden">
          <button
            type="button"
            onClick={() => setDetailsOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted/30 transition-colors min-h-[40px]"
            aria-expanded={detailsOpen}
            data-ocid={`song-details-toggle-${track.id}`}
          >
            <span className="flex items-center gap-2">
              <FileText className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              Song Details
            </span>
            {detailsOpen ? (
              <ChevronUp className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            )}
          </button>
          {detailsOpen && (
            <div
              className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-border bg-muted/20 text-xs sm:text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed"
              data-ocid={`song-details-content-${track.id}`}
            >
              {track.songDetails}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── TrackCard ─────────────────────────────────────────────────────────────────

interface TrackCardProps {
  track: TrackMetadataPublic;
  onAddToCart: (track: TrackMetadataPublic) => void;
  onBuyNow: (track: TrackMetadataPublic) => void;
  onPreview: (track: TrackMetadataPublic) => void;
  activePreviewId: bigint | null;
  isInCart: boolean;
  isBestSeller: boolean;
  isMostViewed: boolean;
}

function TrackCard({
  track,
  onAddToCart,
  onBuyNow,
  onPreview,
  activePreviewId,
  isInCart,
  isBestSeller,
  isMostViewed,
}: TrackCardProps) {
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
      data-ocid={`store-track-${track.id}`}
    >
      {/* Highlight badges */}
      {(isBestSeller || isMostViewed) && (
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 items-end">
          {isBestSeller && (
            <span
              className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg"
              style={{
                background: "linear-gradient(135deg, #d4af37, #f5c842)",
                color: "#000",
              }}
              data-ocid={`badge-best-seller-${track.id}`}
            >
              <Trophy className="w-3 h-3" />
              <span className="hidden sm:inline">Top Seller 👑</span>
              <span className="sm:hidden">👑</span>
            </span>
          )}
          {isMostViewed && (
            <span
              className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg"
              style={{
                background: "rgba(212,175,55,0.18)",
                border: "1px solid rgba(212,175,55,0.6)",
                color: "#f5c842",
              }}
              data-ocid={`badge-most-viewed-${track.id}`}
            >
              <TrendingUp className="w-3 h-3" />
              <span className="hidden sm:inline">Most Viewed 👀</span>
              <span className="sm:hidden">👀</span>
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
            <Music className="w-10 h-10 sm:w-12 sm:h-12 text-foreground/20 group-hover:scale-110 transition-smooth" />
          </div>
        )}
        {/* Preview overlay — always visible on touch, hover on desktop */}
        <button
          type="button"
          onClick={() => onPreview(track)}
          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-smooth flex items-center justify-center"
          aria-label={`Preview ${track.title}`}
          data-ocid={`store-preview-${track.id}`}
        >
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg gold-glow">
            <Play className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground ml-1" />
          </div>
        </button>
        {track.explicit && (
          <span className="absolute top-2 left-2 bg-black/70 text-foreground text-xs px-1.5 py-0.5 rounded font-mono font-bold">
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
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-foreground text-xs sm:text-sm leading-tight truncate">
          {track.title}
        </h3>
        <p className="text-muted-foreground text-xs mt-0.5 truncate">
          {track.artistName}
        </p>

        <div className="flex items-center justify-between mt-2 sm:mt-3">
          <Badge
            variant="secondary"
            className="text-xs shrink-0 max-w-[80px] truncate"
          >
            {track.genre}
          </Badge>
          <span className="text-primary font-bold text-sm sm:text-base ml-2">
            ${(Number(track.priceInCents) / 100).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2 mt-1.5 sm:mt-2 text-xs text-muted-foreground">
          <span>{Number(track.saleCount).toLocaleString()} sales</span>
          <span>·</span>
          <span>{Number(track.previewCount).toLocaleString()} previews</span>
        </div>

        {/* Like & Share row — full-width touch targets */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3">
          <LikeButton trackId={track.id} initialCount={track.likeCount} />
          <ShareButton track={track} />
        </div>

        {/* PRIMARY: Buy & Download — goes straight to checkout */}
        <Button
          size="sm"
          className="w-full mt-2 sm:mt-3 gap-1.5 sm:gap-2 text-xs font-bold min-h-[40px] sm:min-h-[40px] gold-glow"
          style={{
            background: "linear-gradient(135deg, #d4af37, #f5c842)",
            color: "#000",
          }}
          onClick={() => onBuyNow(track)}
          data-ocid={`store-buy-now-${track.id}`}
        >
          <Download className="w-3.5 h-3.5" />
          Buy &amp; Download
        </Button>

        {/* SECONDARY: Add to cart (for multi-song purchases) */}
        <Button
          size="sm"
          variant={isInCart ? "secondary" : "outline"}
          className={`w-full mt-1.5 gap-1.5 text-xs min-h-[36px] border-primary/30 text-primary hover:bg-primary/10 ${isInCart ? "opacity-70" : ""}`}
          onClick={() => onAddToCart(track)}
          data-ocid={`store-add-cart-${track.id}`}
        >
          {isInCart ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
              In Cart ✓
            </>
          ) : (
            <>
              <ShoppingCart className="w-3.5 h-3.5" />
              Add to Cart
            </>
          )}
        </Button>
      </div>

      {/* Waveform preview panel */}
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

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({
  value,
  onChange,
}: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <fieldset className="border-none p-0 m-0">
      <legend className="sr-only">Star rating</legend>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            className="transition-smooth min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label={`${star} star`}
          >
            <Star
              className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${star <= (hovered || value) ? "text-primary fill-primary" : "text-muted-foreground"}`}
            />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

// ─── Comment Card ─────────────────────────────────────────────────────────────

function CommentCard({ comment }: { comment: StoreCommentPublic }) {
  const date = new Date(Number(comment.createdAt) / 1_000_000);
  const dateStr =
    date.getFullYear() > 2000
      ? date.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "Recently";

  return (
    <div
      className="bg-card border border-border rounded-lg p-3 sm:p-4"
      data-ocid={`store-comment-${comment.id}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold text-xs sm:text-sm text-foreground">
          {comment.authorName}
        </span>
        <span className="text-xs text-muted-foreground">{dateStr}</span>
      </div>
      <div className="flex gap-0.5 mb-2">
        {[1, 2, 3, 4, 5].map((s) => (
          <Star
            key={s}
            className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${s <= Number(comment.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
          />
        ))}
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        {comment.body}
      </p>
    </div>
  );
}

// ─── Platform Share Button ────────────────────────────────────────────────────

function PlatformShareButton() {
  const handleShare = async () => {
    const shareUrl = window.location.origin;
    const shareText =
      "Discover independent music on Chosen One Distribution 👑 — real artists, real music, 85% royalties. Join us!";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chosen One Distribution",
          text: shareText,
          url: shareUrl,
        });
      } catch {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        toast.success("Platform link copied to clipboard!");
      } catch {
        toast.error("Could not copy link.");
      }
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      className="gap-1.5 sm:gap-2 border-primary/30 text-primary hover:bg-primary/10 min-h-[40px]"
      data-ocid="platform-share-btn"
    >
      <Share2 className="w-4 h-4" />
      <span className="hidden sm:inline">Share Platform</span>
      <span className="sm:hidden">Share</span>
    </Button>
  );
}

// ─── Main Store Page ───────────────────────────────────────────────────────────

export default function Store() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState<GenreFilter>("All");
  const [showAllGenres, setShowAllGenres] = useState(false);
  const [activePreviewId, setActivePreviewId] = useState<bigint | null>(null);
  const [rating, setRating] = useState(5);
  const [authorName, setAuthorName] = useState("");
  const [commentBody, setCommentBody] = useState("");
  const [successTrack, setSuccessTrack] = useState<TrackMetadataPublic | null>(
    null,
  );
  const [successSessionId, setSuccessSessionId] = useState("");
  const [fulfillAttempted, setFulfillAttempted] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { actor, isFetching: actorFetching } = useActor(createActor);
  const { isAuthenticated, sessionToken } = useAuth();
  const { customerToken, customerEmail, customerLogout } = useCustomerAuth();
  const actorReady = !!actor && !actorFetching;

  const {
    items: cartItems,
    addItem: cartAddItem,
    removeItem: cartRemoveItem,
    clearCart: cartClearAll,
  } = useCartStore();

  const { searchQuery } = useAppStore();
  useEffect(() => {
    if (searchQuery) setSearch(searchQuery);
  }, [searchQuery]);

  const { data: allTracks = [], isLoading: tracksLoading } = useQuery<
    TrackMetadataPublic[]
  >({
    queryKey: ["store-tracks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedTracks();
    },
    enabled: !!actor,
    refetchInterval: 30_000,
  });

  const tracks = allTracks.filter((tr) => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      !q ||
      tr.title.toLowerCase().includes(q) ||
      tr.artistName.toLowerCase().includes(q);
    const matchGenre = genre === "All" || tr.genre === genre;
    return matchSearch && matchGenre;
  });

  const sortedBySales = [...allTracks]
    .filter((tr) => Number(tr.saleCount) > 0)
    .sort((a, b) => Number(b.saleCount) - Number(a.saleCount))
    .slice(0, 3);
  const sortedByPreviews = [...allTracks]
    .filter((tr) => Number(tr.previewCount) > 0)
    .sort((a, b) => Number(b.previewCount) - Number(a.previewCount))
    .slice(0, 3);
  const bestSellerIds = new Set(sortedBySales.map((tr) => String(tr.id)));
  const mostViewedIds = new Set(sortedByPreviews.map((tr) => String(tr.id)));

  const { data: comments = [], isLoading: commentsLoading } = useQuery<
    StoreCommentPublic[]
  >({
    queryKey: ["store-comments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listStoreComments();
    },
    enabled: !!actor,
  });

  const handlePurchaseSuccess = useCallback(async () => {
    if (!actor || fulfillAttempted) return;
    const activeToken = sessionToken ?? customerToken ?? "";
    const params = new URLSearchParams(window.location.search);
    if (params.get("purchase") !== "success") return;
    setFulfillAttempted(true);
    const trackIdParam = params.get("trackId");
    const sessionIdParam = params.get("session") ?? "";
    if (!trackIdParam) return;
    const trackId = BigInt(trackIdParam);
    try {
      const buyerEmail = customerEmail ?? null;
      await actor.fulfillTrackPurchase(
        activeToken,
        trackId,
        sessionIdParam,
        buyerEmail,
      );
    } catch {
      // Non-fatal
    }
    try {
      const track = await actor.getTrack(trackId);
      if (track) {
        setSuccessTrack(track);
        setSuccessSessionId(sessionIdParam);
        queryClient.invalidateQueries({ queryKey: ["purchased-tracks"] });
        queryClient.invalidateQueries({ queryKey: ["store-tracks"] });
      }
    } catch {
      toast.error("Could not load track details.");
    }
  }, [
    actor,
    sessionToken,
    customerToken,
    customerEmail,
    fulfillAttempted,
    queryClient,
  ]);

  useEffect(() => {
    if (actorReady && !fulfillAttempted) handlePurchaseSuccess();
  }, [actorReady, handlePurchaseSuccess, fulfillAttempted]);

  const addCommentMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (!isAuthenticated || !sessionToken)
        throw new Error("Please sign in to leave a review.");
      const result = await actor.addStoreComment(
        sessionToken,
        authorName.trim(),
        commentBody.trim(),
        BigInt(rating),
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      toast.success("Review submitted! Thanks for your feedback.");
      setAuthorName("");
      setCommentBody("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["store-comments"] });
    },
    onError: () => {
      toast.error("Failed to submit review. Please try again.");
    },
  });

  const handlePreview = (track: TrackMetadataPublic) => {
    setActivePreviewId((prev) => (prev === track.id ? null : track.id));
  };

  const handleAddToCart = (track: TrackMetadataPublic) => {
    const added = cartAddItem(track);
    if (!added) {
      toast.info(`"${track.title}" is already in your cart`);
    } else {
      toast.success(`"${track.title}" added to cart`);
    }
    setShowCart(true);
  };

  const handleBuyNow = async (track: TrackMetadataPublic) => {
    // Add to cart (idempotent) then navigate directly to checkout
    cartAddItem(track);
    await navigate({ to: "/checkout" });
  };

  const handleRemoveFromCart = (trackId: bigint) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    cartRemoveItem(trackId);
    if (item) toast.success(`"${item.track.title}" removed from cart`);
  };

  const handleClearCart = () => {
    const count = cartItems.length;
    cartClearAll();
    toast.success(`${count} song${count !== 1 ? "s" : ""} removed from cart`);
  };

  const handleCartCheckout = async () => {
    if (cartItems.length === 0) return;
    await navigate({ to: "/checkout" });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!commentBody.trim()) {
      toast.error("Please write a comment.");
      return;
    }
    addCommentMutation.mutate();
  };

  const cartIds = new Set(cartItems.map((item) => String(item.track.id)));
  const visibleGenres = showAllGenres ? ALL_GENRES : ALL_GENRES.slice(0, 8);

  return (
    <div className="min-h-screen bg-background" data-ocid="store-page">
      {/* ── Store Hero Header ──────────────────────────────────────────────── */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div>
              <h1 className="font-display font-bold text-xl sm:text-3xl md:text-4xl text-foreground leading-tight">
                Chosen One Productions Music Store 👑
              </h1>
              <p className="text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base">
                Buy &amp; download tracks instantly in MP3, WAV &amp; FLAC
                formats
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 sm:mt-1">
                Artists receive{" "}
                <span className="text-primary font-semibold">85%</span> of every
                sale
              </p>
            </div>

            {/* Stats row + cart/share — responsive */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <PlatformShareButton />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCart((o) => !o)}
                className="gap-1.5 sm:gap-2 border-primary/30 text-primary hover:bg-primary/10 relative min-h-[40px]"
                data-ocid="cart-toggle-btn"
                aria-label={`Cart (${cartItems.length} items)`}
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">{t("cart")}</span>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8">
        {/* ── Cart Panel ─────────────────────────────────────────────────── */}
        {showCart && (
          <CartPanel
            items={cartItems}
            onRemove={handleRemoveFromCart}
            onClearAll={handleClearCart}
            onCheckout={handleCartCheckout}
            isCheckingOut={false}
          />
        )}

        {/* ── My Purchases Panel ─────────────────────────────────────────── */}
        <MyPurchasesPanel
          actor={actor}
          sessionToken={sessionToken}
          customerToken={customerToken}
          customerEmail={customerEmail}
          actorReady={actorReady}
          onCustomerLogout={customerLogout}
        />

        {/* ── Search & Genre Filters ─────────────────────────────────────── */}
        <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
          {/* Search input — full width on mobile */}
          <div className="relative w-full sm:max-w-xl">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="search"
              placeholder={t("searchPlaceholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border h-11"
              data-ocid="store-search-input"
            />
          </div>

          {/* Genre filter pills — wraps on mobile */}
          <fieldset className="border-none p-0 m-0">
            <legend className="sr-only">Filter by genre</legend>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {visibleGenres.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGenre(g)}
                  className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-smooth min-h-[34px] ${
                    genre === g
                      ? "bg-primary text-primary-foreground border-primary gold-glow"
                      : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
                  }`}
                  data-ocid={`store-genre-${g.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                >
                  {g}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setShowAllGenres((o) => !o)}
                className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth min-h-[34px]"
                data-ocid="store-genre-toggle-more"
              >
                {showAllGenres ? "Show Less" : `+${ALL_GENRES.length - 8} more`}
              </button>
            </div>
          </fieldset>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Music className="w-4 h-4" />
              <span className="text-foreground font-medium">
                {tracks.length} track{tracks.length !== 1 ? "s" : ""}
              </span>
              {genre !== "All" && <Badge variant="secondary">{genre}</Badge>}
              {search && (
                <Badge variant="secondary" className="max-w-[120px] truncate">
                  "{search}"
                </Badge>
              )}
            </div>
            {(search || genre !== "All") && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearch("");
                  setGenre("All");
                }}
                className="text-xs text-muted-foreground hover:text-foreground"
                data-ocid="store-clear-filters"
              >
                <X className="w-3.5 h-3.5 mr-1" />
                Clear filters
              </Button>
            )}
          </div>
        </div>

        {/* ── Track Grid — responsive 1/2/3/4 col ─────────────────────── */}
        {tracksLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((key) => (
              <div
                key={key}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <Skeleton className="aspect-square w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                  <Skeleton className="h-8 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        ) : tracks.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-16 sm:py-28 text-center"
            data-ocid="store-empty-state"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center mb-4 sm:mb-6">
              <Music className="w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/40" />
            </div>
            <h3 className="font-display font-semibold text-lg sm:text-xl text-foreground mb-2">
              No tracks available yet. Artists are uploading soon! 🎵
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {search || genre !== "All"
                ? "Try clearing your filters to see more tracks."
                : "Check back soon — artists are actively uploading new music."}
            </p>
            {(search || genre !== "All") && (
              <Button
                variant="outline"
                className="mt-5 sm:mt-6"
                onClick={() => {
                  setSearch("");
                  setGenre("All");
                }}
                data-ocid="store-clear-filters-empty"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {tracks.map((track) => (
              <TrackCard
                key={String(track.id)}
                track={track}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onPreview={handlePreview}
                activePreviewId={activePreviewId}
                isInCart={cartIds.has(String(track.id))}
                isBestSeller={bestSellerIds.has(String(track.id))}
                isMostViewed={mostViewedIds.has(String(track.id))}
              />
            ))}
          </div>
        )}

        {/* ── Comments & Ratings Section ───────────────────────────────── */}
        <Separator className="my-10 sm:my-16" />

        <div className="max-w-3xl mx-auto" data-ocid="store-reviews-section">
          <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
            Community Reviews
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8">
            Share your experience with the Chosen One Productions store.
          </p>

          <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8 sm:mb-10">
            <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
              Leave a Review
            </h3>
            <form
              onSubmit={handleCommentSubmit}
              className="space-y-3 sm:space-y-4"
            >
              <div className="space-y-1.5">
                <Label className="text-xs sm:text-sm">Rating</Label>
                <StarRating value={rating} onChange={setRating} />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="review-author" className="text-xs sm:text-sm">
                  Your Name
                </Label>
                <Input
                  id="review-author"
                  placeholder="e.g. DJ Marcus"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  maxLength={60}
                  className="bg-background border-border"
                  data-ocid="store-review-author"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="review-body" className="text-xs sm:text-sm">
                  Comment
                </Label>
                <Textarea
                  id="review-body"
                  placeholder="What do you think about the store and the music?"
                  value={commentBody}
                  onChange={(e) => setCommentBody(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="bg-background border-border resize-none"
                  data-ocid="store-review-body"
                />
              </div>

              <Button
                type="submit"
                disabled={addCommentMutation.isPending}
                className="gap-2 w-full sm:w-auto min-h-[44px]"
                data-ocid="store-review-submit"
              >
                {addCommentMutation.isPending ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Submitting…
                  </>
                ) : (
                  <>
                    <Star className="w-4 h-4" />
                    Submit Review
                  </>
                )}
              </Button>
            </form>
          </div>

          <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base">
            {comments.length > 0
              ? `${comments.length} Review${comments.length !== 1 ? "s" : ""}`
              : "No reviews yet"}
          </h3>

          {commentsLoading ? (
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-card border border-border rounded-lg p-4 space-y-2"
                >
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ))}
            </div>
          ) : comments.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 sm:py-12 text-center border border-dashed border-border rounded-xl"
              data-ocid="store-reviews-empty"
            >
              <Star className="w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground/30 mb-3" />
              <p className="text-muted-foreground text-sm">
                Be the first to leave a review!
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {[...comments].reverse().map((comment) => (
                <CommentCard key={String(comment.id)} comment={comment} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Crown Thank You overlay */}
      <CrownThankYou />

      {/* Purchase Success Modal */}
      {successTrack && (
        <PurchaseSuccessModal
          track={successTrack}
          sessionId={successSessionId}
          onClose={() => setSuccessTrack(null)}
        />
      )}
    </div>
  );
}
