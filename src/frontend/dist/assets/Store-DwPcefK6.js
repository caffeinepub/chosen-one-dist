import { r as reactExports, g as useQueryClient, h as useNavigate, u as useTranslation, c as useActor, d as useAuth, i as useCartStore, k as useAppStore, e as useQuery, l as ue, j as jsxRuntimeExports, B as Button, m as ShoppingCart, n as Search, I as Input, X, o as Separator, p as CrownThankYou, S as ShoppingBag, L as Link, q as LogOut, D as Download, R as Receipt, s as LikeResult, f as createActor } from "./index-gcvG85BJ.js";
import { B as Badge } from "./badge-CnImlErL.js";
import { L as Label } from "./label-DbFD65QY.js";
import { S as Skeleton, T as TrendingUp } from "./skeleton-DPmAA1F9.js";
import { T as Textarea } from "./textarea-BIT5PR6R.js";
import { u as useMutation } from "./useMutation-Dx37yBEr.js";
import { P, a as Pause } from "./wavesurfer.esm-DDG0cpAU.js";
import { u as useCustomerAuth } from "./use-customer-auth-NWJela6v.js";
import { U as Users } from "./users-DprdoC2E.js";
import { M as Music } from "./music-BVc9opxk.js";
import { S as Star } from "./star-BQKTwCPe.js";
import { S as Share2 } from "./share-2-BlBCSEmw.js";
import { T as Trash2 } from "./trash-2-B3rotxkz.js";
import { C as Crown } from "./crown-COpYXvMP.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-DJJ5eTnU.js";
import { F as FileText, T as Trophy } from "./trophy-uywk8A0d.js";
import { P as Play } from "./play-erpStTmm.js";
import { C as CircleCheck } from "./circle-check-D8LLCo8l.js";
import { H as Heart } from "./heart-V8xa_Xr3.js";
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
  "Other"
];
const GENRE_COLORS = {
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
  Other: "from-zinc-900 to-zinc-800"
};
function getGenreColor(genre) {
  return GENRE_COLORS[genre] ?? "from-zinc-900 to-zinc-800";
}
const GOLD = "#d4af37";
const GOLD_PROGRESS = "#f5c842";
const GOLD_REGION = "rgba(212,175,55,0.25)";
const WAVEFORM_BG = "transparent";
function getFormatLabel(url) {
  const lower = url.toLowerCase();
  if (lower.includes(".wav") || lower.includes("wav")) return "WAV";
  if (lower.includes(".flac") || lower.includes("flac")) return "FLAC";
  return "MP3";
}
function triggerDownload(url, filename) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
function generateReceiptPng(items, total, sessionId) {
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
  const receiptId = sessionId ? `#${sessionId.slice(-8).toUpperCase()}` : `#${Date.now().toString(36).toUpperCase()}`;
  const dateStr = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
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
    const titleClipped = item.title.length > 38 ? `${item.title.slice(0, 36)}…` : item.title;
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
function useViewerCount() {
  const [count, setCount] = reactExports.useState(
    () => Math.floor(Math.random() * 4001) + 5e3
  );
  reactExports.useEffect(() => {
    const tick = setInterval(() => {
      setCount((prev) => {
        const delta = Math.floor(Math.random() * 41) - 20;
        return Math.min(9e3, Math.max(5e3, prev + delta));
      });
    }, 4e3);
    return () => clearInterval(tick);
  }, []);
  return count;
}
function LikeButton({ trackId, initialCount }) {
  const { actor } = useActor(createActor);
  const { likerToken } = useAppStore();
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: isLiked = false } = useQuery({
    queryKey: ["track-liked", String(trackId), likerToken],
    queryFn: async () => {
      if (!actor) return false;
      return actor.hasLikedTrack(trackId, likerToken);
    },
    enabled: !!actor
  });
  const { data: likeCount = initialCount } = useQuery({
    queryKey: ["track-likes", String(trackId)],
    queryFn: async () => {
      if (!actor) return initialCount;
      return actor.getTrackLikes(trackId);
    },
    enabled: !!actor
  });
  const likeMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      const result = isLiked ? await actor.unlikeTrack(trackId, likerToken) : await actor.likeTrack(trackId, likerToken);
      return result;
    },
    onSuccess: (result) => {
      if (result === LikeResult.ok || result === LikeResult.notLiked) {
        queryClient.invalidateQueries({
          queryKey: ["track-liked", String(trackId)]
        });
        queryClient.invalidateQueries({
          queryKey: ["track-likes", String(trackId)]
        });
      }
    },
    onError: () => {
      ue.error("Could not update like. Please try again.");
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: (e) => {
        e.stopPropagation();
        likeMutation.mutate();
      },
      disabled: likeMutation.isPending,
      className: `flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border transition-smooth min-h-[36px] ${isLiked ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`,
      "aria-label": isLiked ? t("liked") : t("like"),
      "data-ocid": `track-like-${trackId}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Heart,
          {
            className: `w-3.5 h-3.5 ${isLiked ? "fill-red-400 text-red-400" : ""} ${likeMutation.isPending ? "animate-pulse" : ""}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: Number(likeCount).toLocaleString() })
      ]
    }
  );
}
function ShareButton({ track }) {
  const { t } = useTranslation();
  const handleShare = async (e) => {
    e.stopPropagation();
    const trackUrl = `${window.location.origin}/store?track=${track.id}`;
    const shareText = `"${track.title}" by ${track.artistName} on Chosen One Distribution — listen and buy now`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${track.title} by ${track.artistName}`,
          text: shareText,
          url: trackUrl
        });
      } catch {
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}
${trackUrl}`);
        ue.success("Link copied!");
      } catch {
        ue.error("Could not share. Please copy the URL manually.");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick: handleShare,
      className: "flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth min-h-[36px]",
      "aria-label": t("share"),
      "data-ocid": `track-share-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
        t("share")
      ]
    }
  );
}
function CartPanel({
  items,
  onRemove,
  onClearAll,
  onCheckout,
  isCheckingOut
}) {
  const { t } = useTranslation();
  const totalCents = items.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0
  );
  const totalDollars = (totalCents / 100).toFixed(2);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-primary/30 rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-lg",
      "data-ocid": "cart-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center justify-between bg-primary/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground tracking-wide uppercase text-xs sm:text-sm", children: t("yourCart") }),
            items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs border border-primary/40 text-primary font-bold",
                children: items.length
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3", children: [
            items.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: onClearAll,
                className: "flex items-center gap-1 sm:gap-1.5 text-xs text-muted-foreground hover:text-destructive border border-border hover:border-destructive/50 rounded-md px-2 py-1 transition-colors min-h-[32px]",
                "aria-label": "Remove all items from cart",
                "data-ocid": "cart-clear-all-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Remove All" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm sm:text-base", children: [
              "$",
              totalDollars
            ] })
          ] })
        ] }),
        items.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-8 sm:py-10 text-center",
            "data-ocid": "cart-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: t("cartEmpty") })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-3 sm:pt-4", children: items.map((item) => {
            var _a, _b;
            const coverUrl = (_b = (_a = item.track.coverArt) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-2 sm:gap-3 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg p-2.5 sm:p-3 transition-colors group/item",
                "data-ocid": `cart-item-${item.track.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
                      children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "img",
                        {
                          src: coverUrl,
                          alt: item.track.title,
                          className: "w-full h-full object-cover"
                        }
                      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-foreground/30" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs sm:text-sm text-foreground truncate", children: item.track.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.track.artistName })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-xs sm:text-sm shrink-0", children: [
                    "$",
                    (Number(item.track.priceInCents) / 100).toFixed(2)
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => onRemove(item.track.id),
                      className: "flex items-center gap-1 px-2 py-1.5 rounded-md border border-primary/30 text-primary hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors shrink-0 min-h-[36px] min-w-[36px] justify-center",
                      "aria-label": `Remove "${item.track.title}" from cart`,
                      "data-ocid": `cart-remove-${item.track.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs font-medium ml-0.5", children: "Remove" })
                      ]
                    }
                  )
                ]
              },
              String(item.track.id)
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("cartTotal") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xl sm:text-2xl font-bold text-primary font-display", children: [
                "$",
                totalDollars
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                items.length,
                " track",
                items.length !== 1 ? "s" : ""
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: onCheckout,
                disabled: isCheckingOut,
                className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold gold-glow w-full sm:w-auto min-h-[44px]",
                "data-ocid": "cart-checkout-btn",
                children: isCheckingOut ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                  "Processing…"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
                  t("proceedToCheckout")
                ] })
              }
            )
          ] })
        ] })
      ]
    }
  );
}
function PurchaseSuccessModal({
  track,
  sessionId = "",
  onClose
}) {
  var _a, _b, _c, _d;
  const { t } = useTranslation();
  const { showThankYou } = useAppStore();
  const audioUrl = (_b = (_a = track.audioFile) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const coverUrl = (_d = (_c = track.coverArt) == null ? void 0 : _c.getDirectURL) == null ? void 0 : _d.call(_c);
  const format = audioUrl ? getFormatLabel(audioUrl) : "MP3";
  const filename = `${track.artistName} - ${track.title}.${format.toLowerCase()}`;
  const hasAutoDownloaded = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (audioUrl && !hasAutoDownloaded.current) {
      hasAutoDownloaded.current = true;
      setTimeout(() => {
        triggerDownload(audioUrl, filename);
      }, 600);
      showThankYou([`${track.title} — ${track.artistName}`]);
    }
  }, [audioUrl, filename, showThankYou, track.title, track.artistName]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
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
      sessionId
    );
    if (!dataUrl) {
      ue.error("Could not generate receipt.");
      return;
    }
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `receipt-${dateStr}-${sessionId.slice(-6) || "purchase"}.png`;
    a.click();
    ue.success("Receipt downloaded!");
  };
  const handleReturnToStore = () => {
    window.history.replaceState({}, "", "/store");
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      open: true,
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm w-full h-full max-w-none max-h-none m-0 border-none",
      "aria-modal": "true",
      "aria-labelledby": "purchase-success-title",
      "data-ocid": "purchase-success-modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative bg-card border border-primary/30 rounded-t-2xl sm:rounded-2xl shadow-2xl w-full sm:max-w-md overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 w-full bg-gradient-to-r from-primary/60 via-primary to-primary/60" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleReturnToStore,
            className: "absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors",
            "aria-label": "Close",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-5 sm:p-6 flex flex-col items-center text-center gap-4 sm:gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center animate-crown-glow-pulse", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 sm:w-8 sm:h-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-primary absolute -top-1 -right-1" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold text-xs uppercase tracking-widest mb-1", children: t("purchaseComplete") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "h2",
              {
                id: "purchase-success-title",
                className: "font-display font-bold text-xl sm:text-2xl text-foreground",
                children: t("thankYou")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1", children: "Chosen One Productions Distribution" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4 bg-muted/40 rounded-xl p-3 sm:p-4 w-full text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br ${getGenreColor(track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
                children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: coverUrl,
                    alt: track.title,
                    className: "w-full h-full object-cover"
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-7 h-7 sm:w-8 sm:h-8 text-foreground/30" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground truncate", children: track.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm truncate mt-0.5", children: track.artistName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "secondary",
                  className: "mt-2 text-xs font-mono border border-primary/30 text-primary",
                  children: format
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs sm:text-sm", children: "Your download should start automatically. If it didn't, click below:" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleDownload,
              className: "w-full gap-2 text-sm sm:text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg gold-glow min-h-[44px]",
              "data-ocid": "purchase-download-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-5 h-5" }),
                t("downloadNow"),
                " (",
                format,
                ")"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: handleDownloadReceipt,
              className: "w-full gap-2 border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]",
              "data-ocid": "purchase-receipt-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Receipt, { className: "w-4 h-4" }),
                "Download Receipt"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              onClick: handleReturnToStore,
              className: "w-full gap-2 min-h-[44px]",
              "data-ocid": "purchase-return-store-btn",
              children: "Return to Store"
            }
          )
        ] })
      ] })
    }
  );
}
function PurchasedTrackCard({ track }) {
  var _a, _b, _c, _d;
  const { t } = useTranslation();
  const audioUrl = (_b = (_a = track.audioFile) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const coverUrl = (_d = (_c = track.coverArt) == null ? void 0 : _c.getDirectURL) == null ? void 0 : _d.call(_c);
  const format = audioUrl ? getFormatLabel(audioUrl) : "MP3";
  const filename = `${track.artistName} - ${track.title}.${format.toLowerCase()}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-2 sm:gap-3 bg-muted/30 hover:bg-muted/50 border border-border rounded-lg p-2.5 sm:p-3 transition-colors",
      "data-ocid": `purchased-track-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-gradient-to-br ${getGenreColor(track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
            children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: coverUrl,
                alt: track.title,
                className: "w-full h-full object-cover"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 sm:w-5 sm:h-5 text-foreground/30" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-xs sm:text-sm text-foreground truncate", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: track.artistName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Badge,
          {
            variant: "secondary",
            className: "text-xs font-mono shrink-0 border border-primary/20 text-primary hidden sm:flex",
            children: format
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            onClick: () => audioUrl && triggerDownload(audioUrl, filename),
            className: "gap-1 sm:gap-1.5 text-xs shrink-0 border-primary/30 text-primary hover:bg-primary/10 min-h-[36px]",
            "data-ocid": `purchased-download-${track.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("reDownload") })
            ]
          }
        )
      ]
    }
  );
}
function MyPurchasesPanel({
  actor,
  sessionToken,
  customerToken,
  customerEmail,
  actorReady,
  onCustomerLogout
}) {
  const [isExpanded, setIsExpanded] = reactExports.useState(false);
  const [showReport, setShowReport] = reactExports.useState(false);
  const { t } = useTranslation();
  const activeToken = customerToken ?? sessionToken;
  const isCustomerMode = !!customerToken;
  const { data: purchasedTracks = [], isLoading } = useQuery({
    queryKey: ["purchased-tracks", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return [];
      try {
        const result = isCustomerMode ? await actor.getCustomerPurchases(activeToken) : await actor.getPurchasedTracks(activeToken);
        if (result.__kind__ === "ok") return result.ok;
        return [];
      } catch {
        return [];
      }
    },
    enabled: actorReady && !!activeToken && isExpanded
  });
  const { data: purchaseCount = 0 } = useQuery({
    queryKey: ["purchased-tracks-count", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return 0;
      try {
        const result = isCustomerMode ? await actor.getCustomerPurchases(activeToken) : await actor.getPurchasedTracks(activeToken);
        if (result.__kind__ === "ok") return result.ok.length;
        return 0;
      } catch {
        return 0;
      }
    },
    enabled: actorReady && !!activeToken
  });
  const { data: downloadReport = [], isLoading: reportLoading } = useQuery({
    queryKey: ["download-report", activeToken, isCustomerMode],
    queryFn: async () => {
      if (!actor || !activeToken) return [];
      try {
        const result = isCustomerMode ? await actor.getCustomerDownloadReport(activeToken) : await actor.getDownloadReport(activeToken);
        if (result.__kind__ === "ok") return result.ok;
        return [];
      } catch {
        return [];
      }
    },
    enabled: actorReady && !!activeToken && showReport
  });
  if (!activeToken) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border border-primary/20 rounded-xl overflow-hidden mb-6 sm:mb-8",
        "data-ocid": "my-purchases-panel",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-4 sm:py-5 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-sm", children: "My Purchases" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "Sign in to access and re-download your tracks" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/customer-login",
              "data-ocid": "purchases-signin-btn",
              className: "w-full sm:w-auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "sm",
                  className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto min-h-[44px]",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-4 h-4" }),
                    "Sign In to My Purchases"
                  ]
                }
              )
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-primary/20 rounded-xl overflow-hidden mb-6 sm:mb-8",
      "data-ocid": "my-purchases-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setIsExpanded((prev) => !prev),
            className: "w-full flex items-center justify-between px-4 sm:px-5 py-3 sm:py-4 hover:bg-muted/30 transition-colors min-h-[48px]",
            "aria-expanded": isExpanded,
            "data-ocid": "my-purchases-toggle",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground tracking-wide uppercase text-xs sm:text-sm", children: t("myPurchases") }),
                isCustomerMode && customerEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground hidden md:inline", children: [
                  "(",
                  customerEmail,
                  ")"
                ] }),
                purchaseCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold",
                    style: { background: "#d4af37", color: "#000" },
                    "data-ocid": "my-purchases-count-badge",
                    children: purchaseCount
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                isCustomerMode && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: (e) => {
                      e.stopPropagation();
                      onCustomerLogout();
                    },
                    className: "flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive border border-border/50 hover:border-destructive/50 rounded-md px-2 py-1 transition-colors min-h-[32px]",
                    "aria-label": "Sign out of customer account",
                    "data-ocid": "customer-logout-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Sign Out" })
                    ]
                  }
                ),
                isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" })
              ] })
            ]
          }
        ),
        isExpanded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5 border-t border-border", children: [
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 pt-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 p-3 rounded-lg bg-muted/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-md shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-3/4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 sm:w-24" })
              ]
            },
            i
          )) }) : purchasedTracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center py-8 sm:py-10 text-center",
              "data-ocid": "purchases-empty-state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-muted/60 flex items-center justify-center mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/50" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm font-medium", children: "No purchases yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground/60 text-xs mt-1", children: "Browse the store to find something you love." })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 sm:space-y-3 pt-4", children: purchasedTracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(PurchasedTrackCard, { track }, String(track.id))) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setShowReport((o) => !o),
                className: "flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors min-h-[36px]",
                "data-ocid": "download-report-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-4 h-4 text-primary" }),
                  showReport ? "Hide" : "View",
                  " Download Report",
                  showReport ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4" })
                ]
              }
            ),
            showReport && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3", "data-ocid": "download-report-table", children: reportLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full rounded-lg" }, i)) }) : downloadReport.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground py-4 text-center", children: "No download history found." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-lg border border-border -mx-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs min-w-[400px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border bg-muted/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-medium", children: "Track" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-medium hidden sm:table-cell", children: "Artist" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-medium", children: "Format" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-3 py-2 text-muted-foreground font-medium", children: t("expires") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-center px-3 py-2 text-muted-foreground font-medium", children: "Status" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: downloadReport.map((entry) => {
                const expiresDate = new Date(
                  Number(entry.expiresAt) / 1e6
                );
                const isExpired = expiresDate < /* @__PURE__ */ new Date();
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "border-b border-border last:border-0 hover:bg-muted/20 transition-colors",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 font-medium text-foreground", children: entry.trackTitle }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground hidden sm:table-cell", children: entry.artistName }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs border border-primary/20 text-primary font-mono",
                          children: entry.format
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-muted-foreground", children: expiresDate.toLocaleDateString() }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-3 py-2 text-center", children: entry.downloadAvailable && !isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs", children: "Available" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: "secondary",
                          className: "text-xs text-muted-foreground",
                          children: "Expired"
                        }
                      ) })
                    ]
                  },
                  String(entry.saleId)
                );
              }) })
            ] }) }) })
          ] })
        ] })
      ]
    }
  );
}
function WaveformPreviewPanel({
  track,
  onIncrementPreview,
  onClose
}) {
  var _a, _b, _c;
  const waveContainerRef = reactExports.useRef(null);
  const wsRef = reactExports.useRef(null);
  const regionRef = reactExports.useRef(null);
  const hasCountedRef = reactExports.useRef(false);
  const [isReady, setIsReady] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [loadError, setLoadError] = reactExports.useState(false);
  const [detailsOpen, setDetailsOpen] = reactExports.useState(false);
  const audioUrl = (_b = (_a = track.audioFile) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const previewStart = track.previewStartSecs ?? 0;
  const previewEnd = track.previewEndSecs ?? 30;
  const hasSongDetails = ((_c = track.songDetails) == null ? void 0 : _c.trim().length) > 0;
  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };
  reactExports.useEffect(() => {
    if (!waveContainerRef.current || !audioUrl) return;
    const ws = P.create({
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
      url: audioUrl
    });
    wsRef.current = ws;
    ws.on("ready", () => {
      const dur = ws.getDuration();
      setIsReady(true);
      setDuration(dur);
      regionRef.current = { start: previewStart, end: previewEnd };
      if (dur > 0 && previewStart > 0) ws.seekTo(previewStart / dur);
    });
    ws.on("audioprocess", (t) => {
      var _a2, _b2;
      setCurrentTime(t);
      const end = ((_a2 = regionRef.current) == null ? void 0 : _a2.end) ?? previewEnd;
      const start = ((_b2 = regionRef.current) == null ? void 0 : _b2.start) ?? previewStart;
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
      var _a2;
      setIsPlaying(false);
      ws.seekTo((((_a2 = regionRef.current) == null ? void 0 : _a2.start) ?? previewStart) / ws.getDuration());
    });
    ws.on("error", () => setLoadError(true));
    return () => {
      ws.destroy();
      wsRef.current = null;
    };
  }, [audioUrl, previewStart, previewEnd]);
  const handlePlayPause = () => {
    var _a2, _b2;
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
        const end = ((_a2 = regionRef.current) == null ? void 0 : _a2.end) ?? previewEnd;
        const start = ((_b2 = regionRef.current) == null ? void 0 : _b2.start) ?? previewStart;
        if (currentPos >= end || currentPos < start || currentPos === 0 && start > 0) {
          ws.seekTo(start / dur);
        }
      }
      ws.play().catch(() => {
      });
    }
  };
  const windowDuration = previewEnd - previewStart;
  const elapsed = Math.max(
    0,
    Math.min(currentTime - previewStart, windowDuration)
  );
  const progressPct = windowDuration > 0 ? elapsed / windowDuration * 100 : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "border-t border-primary/20 bg-[#0f0f0f] p-3 sm:p-4 animate-slide-up",
      "data-ocid": `waveform-preview-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-accent text-xs", children: "30s Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs hidden sm:inline", children: [
              fmt(previewStart),
              " — ",
              fmt(previewEnd)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: onClose,
              className: "w-6 h-6 rounded-full bg-muted/40 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors",
              "aria-label": "Close preview",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden bg-[#111] p-1.5 sm:p-2 w-full", children: [
          isReady && duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-1.5 bottom-1.5 sm:top-2 sm:bottom-2 rounded pointer-events-none",
              style: {
                left: `calc(${previewStart / duration * 100}% + 6px)`,
                width: `calc(${(previewEnd - previewStart) / duration * 100}%)`,
                background: GOLD_REGION,
                border: `1px solid ${GOLD}40`
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              ref: waveContainerRef,
              style: { background: WAVEFORM_BG },
              className: "relative z-10 w-full"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handlePlayPause,
              disabled: !isReady || loadError,
              className: "w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/85 transition-colors disabled:opacity-50 shrink-0 gold-glow",
              "aria-label": isPlaying ? "Pause preview" : "Play preview",
              "data-ocid": `waveform-playpause-${track.id}`,
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4 fill-primary-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-primary-foreground ml-0.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-1.5 sm:gap-2 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-8 sm:w-10 shrink-0 text-right", children: fmt(Math.max(0, elapsed)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-100",
                style: { width: `${progressPct}%`, background: GOLD }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-8 sm:w-10 shrink-0", children: fmt(windowDuration) })
          ] }),
          !isReady && !loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground animate-pulse shrink-0", children: "Loading…" }),
          loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive shrink-0", children: "Unavailable" })
        ] }),
        hasSongDetails && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 sm:mt-4 border border-border rounded-lg overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setDetailsOpen((o) => !o),
              className: "w-full flex items-center justify-between px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-foreground hover:bg-muted/30 transition-colors min-h-[40px]",
              "aria-expanded": detailsOpen,
              "data-ocid": `song-details-toggle-${track.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" }),
                  "Song Details"
                ] }),
                detailsOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground" })
              ]
            }
          ),
          detailsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "px-3 sm:px-4 py-2.5 sm:py-3 border-t border-border bg-muted/20 text-xs sm:text-sm text-foreground/85 whitespace-pre-wrap leading-relaxed",
              "data-ocid": `song-details-content-${track.id}`,
              children: track.songDetails
            }
          )
        ] })
      ]
    }
  );
}
function TrackCard({
  track,
  onAddToCart,
  onPreview,
  activePreviewId,
  isInCart,
  isBestSeller,
  isMostViewed
}) {
  var _a, _b;
  const { t } = useTranslation();
  const isPreviewOpen = activePreviewId === track.id;
  const coverUrl = (_b = (_a = track.coverArt) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const colorClass = getGenreColor(track.genre);
  const actorRef = reactExports.useRef(null);
  const { actor } = useActor(createActor);
  actorRef.current = actor;
  const handleIncrementPreview = reactExports.useCallback(() => {
    var _a2;
    (_a2 = actorRef.current) == null ? void 0 : _a2.incrementPreviewCount(track.id).catch(() => {
    });
  }, [track.id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `bg-card border rounded-xl overflow-hidden hover:border-primary/40 transition-smooth group flex flex-col relative ${isBestSeller ? "border-primary/50 ring-1 ring-primary/20" : "border-border"}`,
      "data-ocid": `store-track-${track.id}`,
      children: [
        (isBestSeller || isMostViewed) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-2 right-2 z-10 flex flex-col gap-1 items-end", children: [
          isBestSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg",
              style: {
                background: "linear-gradient(135deg, #d4af37, #f5c842)",
                color: "#000"
              },
              "data-ocid": `badge-best-seller-${track.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trophy, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Top Seller 👑" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "👑" })
              ]
            }
          ),
          isMostViewed && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: "flex items-center gap-1 text-xs font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full shadow-lg",
              style: {
                background: "rgba(212,175,55,0.18)",
                border: "1px solid rgba(212,175,55,0.6)",
                color: "#f5c842"
              },
              "data-ocid": `badge-most-viewed-${track.id}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Most Viewed 👀" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "👀" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: `aspect-square bg-gradient-to-br ${colorClass} relative overflow-hidden`,
            children: [
              coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: coverUrl,
                  alt: track.title,
                  className: "w-full h-full object-cover"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-10 h-10 sm:w-12 sm:h-12 text-foreground/20 group-hover:scale-110 transition-smooth" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onPreview(track),
                  className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-smooth flex items-center justify-center",
                  "aria-label": `Preview ${track.title}`,
                  "data-ocid": `store-preview-${track.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground fill-primary-foreground ml-1" }) })
                }
              ),
              track.explicit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 bg-black/70 text-foreground text-xs px-1.5 py-0.5 rounded font-mono font-bold", children: "E" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 left-2 badge-accent capitalize text-xs", children: track.trackType }),
              isPreviewOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: "Preview" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 sm:p-4 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-xs sm:text-sm leading-tight truncate", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5 truncate", children: track.artistName }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-2 sm:mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: "text-xs shrink-0 max-w-[80px] truncate",
                children: track.genre
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm sm:text-base ml-2", children: [
              "$",
              (Number(track.priceInCents) / 100).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1.5 sm:mt-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(track.saleCount).toLocaleString(),
              " sales"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "·" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              Number(track.previewCount).toLocaleString(),
              " previews"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2 mt-2 sm:mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LikeButton, { trackId: track.id, initialCount: track.likeCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShareButton, { track })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: isInCart ? "secondary" : "default",
              className: `w-full mt-2 sm:mt-3 gap-1.5 sm:gap-2 text-xs min-h-[40px] sm:min-h-[36px] ${isInCart ? "border border-primary/30" : ""}`,
              onClick: () => onAddToCart(track),
              "data-ocid": `store-add-cart-${track.id}`,
              children: isInCart ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary" }),
                t("addToCart"),
                " ✓"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-3.5 h-3.5" }),
                t("addToCart")
              ] })
            }
          )
        ] }),
        isPreviewOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          WaveformPreviewPanel,
          {
            track,
            onIncrementPreview: handleIncrementPreview,
            onClose: () => onPreview(track)
          }
        )
      ]
    }
  );
}
function StarRating({
  value,
  onChange
}) {
  const [hovered, setHovered] = reactExports.useState(0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "border-none p-0 m-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Star rating" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: [1, 2, 3, 4, 5].map((star) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(star),
        onMouseEnter: () => setHovered(star),
        onMouseLeave: () => setHovered(0),
        className: "transition-smooth min-w-[36px] min-h-[36px] flex items-center justify-center",
        "aria-label": `${star} star`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `w-5 h-5 sm:w-6 sm:h-6 transition-colors ${star <= (hovered || value) ? "text-primary fill-primary" : "text-muted-foreground"}`
          }
        )
      },
      star
    )) })
  ] });
}
function CommentCard({ comment }) {
  const date = new Date(Number(comment.createdAt) / 1e6);
  const dateStr = date.getFullYear() > 2e3 ? date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }) : "Recently";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-lg p-3 sm:p-4",
      "data-ocid": `store-comment-${comment.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xs sm:text-sm text-foreground", children: comment.authorName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: dateStr })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5 mb-2", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: `w-3 h-3 sm:w-3.5 sm:h-3.5 ${s <= Number(comment.rating) ? "text-primary fill-primary" : "text-muted-foreground/30"}`
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs sm:text-sm text-muted-foreground leading-relaxed", children: comment.body })
      ]
    }
  );
}
function PlatformShareButton() {
  const handleShare = async () => {
    const shareUrl = window.location.origin;
    const shareText = "Discover independent music on Chosen One Distribution 👑 — real artists, real music, 85% royalties. Join us!";
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Chosen One Distribution",
          text: shareText,
          url: shareUrl
        });
      } catch {
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareText}
${shareUrl}`);
        ue.success("Platform link copied to clipboard!");
      } catch {
        ue.error("Could not copy link.");
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      variant: "outline",
      size: "sm",
      onClick: handleShare,
      className: "gap-1.5 sm:gap-2 border-primary/30 text-primary hover:bg-primary/10 min-h-[40px]",
      "data-ocid": "platform-share-btn",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-4 h-4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Share Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Share" })
      ]
    }
  );
}
function Store() {
  const [search, setSearch] = reactExports.useState("");
  const [genre, setGenre] = reactExports.useState("All");
  const [showAllGenres, setShowAllGenres] = reactExports.useState(false);
  const [activePreviewId, setActivePreviewId] = reactExports.useState(null);
  const [rating, setRating] = reactExports.useState(5);
  const [authorName, setAuthorName] = reactExports.useState("");
  const [commentBody, setCommentBody] = reactExports.useState("");
  const [successTrack, setSuccessTrack] = reactExports.useState(
    null
  );
  const [successSessionId, setSuccessSessionId] = reactExports.useState("");
  const [fulfillAttempted, setFulfillAttempted] = reactExports.useState(false);
  const [showCart, setShowCart] = reactExports.useState(false);
  const viewerCount = useViewerCount();
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
    clearCart: cartClearAll
  } = useCartStore();
  const { searchQuery } = useAppStore();
  reactExports.useEffect(() => {
    if (searchQuery) setSearch(searchQuery);
  }, [searchQuery]);
  const { data: allTracks = [], isLoading: tracksLoading } = useQuery({
    queryKey: ["store-tracks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedTracks();
    },
    enabled: !!actor,
    refetchInterval: 3e4
  });
  const tracks = allTracks.filter((tr) => {
    const q = search.trim().toLowerCase();
    const matchSearch = !q || tr.title.toLowerCase().includes(q) || tr.artistName.toLowerCase().includes(q);
    const matchGenre = genre === "All" || tr.genre === genre;
    return matchSearch && matchGenre;
  });
  const sortedBySales = [...allTracks].filter((tr) => Number(tr.saleCount) > 0).sort((a, b) => Number(b.saleCount) - Number(a.saleCount)).slice(0, 3);
  const sortedByPreviews = [...allTracks].filter((tr) => Number(tr.previewCount) > 0).sort((a, b) => Number(b.previewCount) - Number(a.previewCount)).slice(0, 3);
  const bestSellerIds = new Set(sortedBySales.map((tr) => String(tr.id)));
  const mostViewedIds = new Set(sortedByPreviews.map((tr) => String(tr.id)));
  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["store-comments"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listStoreComments();
    },
    enabled: !!actor
  });
  const handlePurchaseSuccess = reactExports.useCallback(async () => {
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
        buyerEmail
      );
    } catch {
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
      ue.error("Could not load track details.");
    }
  }, [
    actor,
    sessionToken,
    customerToken,
    customerEmail,
    fulfillAttempted,
    queryClient
  ]);
  reactExports.useEffect(() => {
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
        BigInt(rating)
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    onSuccess: () => {
      ue.success("Review submitted! Thanks for your feedback.");
      setAuthorName("");
      setCommentBody("");
      setRating(5);
      queryClient.invalidateQueries({ queryKey: ["store-comments"] });
    },
    onError: () => {
      ue.error("Failed to submit review. Please try again.");
    }
  });
  const handlePreview = (track) => {
    setActivePreviewId((prev) => prev === track.id ? null : track.id);
  };
  const handleAddToCart = (track) => {
    const added = cartAddItem(track);
    if (!added) {
      ue.info(`"${track.title}" is already in your cart`);
    } else {
      ue.success(`"${track.title}" added to cart`);
    }
    setShowCart(true);
  };
  const handleRemoveFromCart = (trackId) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    cartRemoveItem(trackId);
    if (item) ue.success(`"${item.track.title}" removed from cart`);
  };
  const handleClearCart = () => {
    const count = cartItems.length;
    cartClearAll();
    ue.success(`${count} song${count !== 1 ? "s" : ""} removed from cart`);
  };
  const handleCartCheckout = async () => {
    if (cartItems.length === 0) return;
    await navigate({ to: "/checkout" });
  };
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!authorName.trim()) {
      ue.error("Please enter your name.");
      return;
    }
    if (!commentBody.trim()) {
      ue.error("Please write a comment.");
      return;
    }
    addCommentMutation.mutate();
  };
  const cartIds = new Set(cartItems.map((item) => String(item.track.id)));
  const visibleGenres = showAllGenres ? ALL_GENRES : ALL_GENRES.slice(0, 8);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "store-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 sm:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-xl sm:text-3xl md:text-4xl text-foreground leading-tight", children: "Chosen One Productions Music Store 👑" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 sm:mt-2 text-xs sm:text-sm md:text-base", children: "Buy & download tracks instantly in MP3, WAV & FLAC formats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5 sm:mt-1", children: [
          "Artists receive",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "85%" }),
          " of every sale"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-1.5 sm:gap-2 bg-muted/60 border border-border rounded-full px-3 sm:px-4 py-1.5 sm:py-2",
            "data-ocid": "store-viewer-count",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs sm:text-sm font-semibold text-foreground", children: [
                viewerCount.toLocaleString(),
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "viewers" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "live" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-500 font-bold text-xs", children: "🔴" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformShareButton, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: () => setShowCart((o) => !o),
            className: "gap-1.5 sm:gap-2 border-primary/30 text-primary hover:bg-primary/10 relative min-h-[40px]",
            "data-ocid": "cart-toggle-btn",
            "aria-label": `Cart (${cartItems.length} items)`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("cart") }),
              cartItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold", children: cartItems.length })
            ]
          }
        )
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-8", children: [
      showCart && /* @__PURE__ */ jsxRuntimeExports.jsx(
        CartPanel,
        {
          items: cartItems,
          onRemove: handleRemoveFromCart,
          onClearAll: handleClearCart,
          onCheckout: handleCartCheckout,
          isCheckingOut: false
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MyPurchasesPanel,
        {
          actor,
          sessionToken,
          customerToken,
          customerEmail,
          actorReady,
          onCustomerLogout: customerLogout
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 sm:mb-8 space-y-3 sm:space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full sm:max-w-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              type: "search",
              placeholder: t("searchPlaceholder"),
              value: search,
              onChange: (e) => setSearch(e.target.value),
              className: "pl-10 bg-card border-border h-11",
              "data-ocid": "store-search-input"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { className: "border-none p-0 m-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "sr-only", children: "Filter by genre" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1.5 sm:gap-2", children: [
            visibleGenres.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setGenre(g),
                className: `px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-smooth min-h-[34px] ${genre === g ? "bg-primary text-primary-foreground border-primary gold-glow" : "bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"}`,
                "data-ocid": `store-genre-${g.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
                children: g
              },
              g
            )),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setShowAllGenres((o) => !o),
                className: "px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-dashed border-border text-muted-foreground hover:text-foreground hover:border-primary/40 transition-smooth min-h-[34px]",
                "data-ocid": "store-genre-toggle-more",
                children: showAllGenres ? "Show Less" : `+${ALL_GENRES.length - 8} more`
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground font-medium", children: [
              tracks.length,
              " track",
              tracks.length !== 1 ? "s" : ""
            ] }),
            genre !== "All" && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: genre }),
            search && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "max-w-[120px] truncate", children: [
              '"',
              search,
              '"'
            ] })
          ] }),
          (search || genre !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => {
                setSearch("");
                setGenre("All");
              },
              className: "text-xs text-muted-foreground hover:text-foreground",
              "data-ocid": "store-clear-filters",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-3.5 h-3.5 mr-1" }),
                "Clear filters"
              ]
            }
          )
        ] })
      ] }),
      tracksLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6", children: Array.from({ length: 8 }, (_, i) => `skel-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-card border border-border rounded-xl overflow-hidden",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-1/2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full mt-4" })
            ] })
          ]
        },
        key
      )) }) : tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center justify-center py-16 sm:py-28 text-center",
          "data-ocid": "store-empty-state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-muted flex items-center justify-center mb-4 sm:mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-8 h-8 sm:w-10 sm:h-10 text-muted-foreground/40" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-lg sm:text-xl text-foreground mb-2", children: "No tracks available yet. Artists are uploading soon! 🎵" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm max-w-sm", children: search || genre !== "All" ? "Try clearing your filters to see more tracks." : "Check back soon — artists are actively uploading new music." }),
            (search || genre !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                variant: "outline",
                className: "mt-5 sm:mt-6",
                onClick: () => {
                  setSearch("");
                  setGenre("All");
                },
                "data-ocid": "store-clear-filters-empty",
                children: "Clear Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6", children: tracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        TrackCard,
        {
          track,
          onAddToCart: handleAddToCart,
          onPreview: handlePreview,
          activePreviewId,
          isInCart: cartIds.has(String(track.id)),
          isBestSeller: bestSellerIds.has(String(track.id)),
          isMostViewed: mostViewedIds.has(String(track.id))
        },
        String(track.id)
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-10 sm:my-16" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto", "data-ocid": "store-reviews-section", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl sm:text-2xl text-foreground mb-2", children: "Community Reviews" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8", children: "Share your experience with the Chosen One Productions store." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl p-4 sm:p-6 mb-8 sm:mb-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base", children: "Leave a Review" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "form",
            {
              onSubmit: handleCommentSubmit,
              className: "space-y-3 sm:space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { className: "text-xs sm:text-sm", children: "Rating" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { value: rating, onChange: setRating })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "review-author", className: "text-xs sm:text-sm", children: "Your Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "review-author",
                      placeholder: "e.g. DJ Marcus",
                      value: authorName,
                      onChange: (e) => setAuthorName(e.target.value),
                      maxLength: 60,
                      className: "bg-background border-border",
                      "data-ocid": "store-review-author"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "review-body", className: "text-xs sm:text-sm", children: "Comment" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Textarea,
                    {
                      id: "review-body",
                      placeholder: "What do you think about the store and the music?",
                      value: commentBody,
                      onChange: (e) => setCommentBody(e.target.value),
                      rows: 4,
                      maxLength: 500,
                      className: "bg-background border-border resize-none",
                      "data-ocid": "store-review-body"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    type: "submit",
                    disabled: addCommentMutation.isPending,
                    className: "gap-2 w-full sm:w-auto min-h-[44px]",
                    "data-ocid": "store-review-submit",
                    children: addCommentMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                      "Submitting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-4 h-4" }),
                      "Submit Review"
                    ] })
                  }
                )
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base", children: comments.length > 0 ? `${comments.length} Review${comments.length !== 1 ? "s" : ""}` : "No reviews yet" }),
        commentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 sm:space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-lg p-4 space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-24" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 w-full" })
            ]
          },
          i
        )) }) : comments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center justify-center py-10 sm:py-12 text-center border border-dashed border-border rounded-xl",
            "data-ocid": "store-reviews-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-7 h-7 sm:w-8 sm:h-8 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Be the first to leave a review!" })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 sm:space-y-4", children: [...comments].reverse().map((comment) => /* @__PURE__ */ jsxRuntimeExports.jsx(CommentCard, { comment }, String(comment.id))) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CrownThankYou, {}),
    successTrack && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PurchaseSuccessModal,
      {
        track: successTrack,
        sessionId: successSessionId,
        onClose: () => setSuccessTrack(null)
      }
    )
  ] });
}
export {
  Store as default
};
