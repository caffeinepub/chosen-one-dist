import { Q as useParams, r as reactExports, c as useActor, e as useQuery, j as jsxRuntimeExports, L as Link, B as Button, l as ue, u as useTranslation, m as ShoppingCart, k as useAppStore, g as useQueryClient, s as LikeResult, f as createActor } from "./index-DkJerdwd.js";
import { B as Badge } from "./badge-DHFyt5Sg.js";
import { S as Skeleton } from "./skeleton-B5my5CIz.js";
import { u as useMutation } from "./useMutation-B16DtIF_.js";
import { P, a as Pause } from "./wavesurfer.esm-D1OwqQyW.js";
import { A as ArrowLeft } from "./arrow-left-BRuK6br4.js";
import { C as Crown } from "./crown-CmnwyTqD.js";
import { Z as Zap } from "./zap-B6QBQ280.js";
import { T as TrendingUp } from "./trending-up-DkilFxdr.js";
import { M as Music } from "./music-B6s2jRtb.js";
import { P as Play } from "./play-D9LgaoRG.js";
import { C as CircleCheck } from "./circle-check-BPRA0Sxx.js";
import { H as Heart } from "./heart-DzE0JXbQ.js";
import { S as Share2 } from "./share-2-BD4lEl_s.js";
const GOLD = "#d4af37";
const GOLD_PROGRESS = "#f5c842";
const GOLD_REGION = "rgba(212,175,55,0.25)";
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
  Folk: "from-amber-900 to-yellow-900",
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
const SOCIAL_ICON_MAP = [
  { key: "instagram", emoji: "📸", label: "Instagram" },
  { key: "twitterX", emoji: "𝕏", label: "Twitter / X" },
  { key: "tiktok", emoji: "🎵", label: "TikTok" },
  { key: "youtube", emoji: "▶️", label: "YouTube" },
  { key: "facebook", emoji: "📘", label: "Facebook" },
  { key: "soundcloud", emoji: "☁️", label: "SoundCloud" },
  { key: "spotify", emoji: "🎧", label: "Spotify" },
  { key: "appleMusic", emoji: "🍎", label: "Apple Music" },
  { key: "website", emoji: "🌐", label: "Website" }
];
function normalizeUrl(url) {
  if (!url) return "#";
  return url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
}
function SocialIcons({ links }) {
  const active = SOCIAL_ICON_MAP.filter((s) => !!links[s.key]);
  if (active.length === 0) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex flex-wrap justify-center gap-2 mt-4",
      "data-ocid": "artist-social-icons",
      children: active.map(({ key, emoji, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: normalizeUrl(links[key]),
          target: "_blank",
          rel: "noopener noreferrer",
          "aria-label": label,
          title: label,
          className: "w-9 h-9 rounded-full bg-muted/50 border border-border flex items-center justify-center text-base hover:bg-primary/20 hover:border-primary/50 transition-all duration-200 hover:scale-110",
          "data-ocid": `artist-social-${key}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm leading-none select-none", children: emoji })
        },
        key
      ))
    }
  );
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
      return isLiked ? actor.unlikeTrack(trackId, likerToken) : actor.likeTrack(trackId, likerToken);
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
    onError: () => ue.error("Could not update like. Please try again.")
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
      className: `flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border transition-smooth ${isLiked ? "bg-red-500/10 border-red-500/40 text-red-400 hover:bg-red-500/20" : "bg-muted/50 border-border text-muted-foreground hover:bg-muted hover:text-foreground"}`,
      "aria-label": isLiked ? t("liked") : t("like"),
      "data-ocid": `artist-track-like-${trackId}`,
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
    const shareData = {
      title: `${track.title} by ${track.artistName}`,
      text: `Check out "${track.title}" by ${track.artistName} on Chosen One Productions Distribution`,
      url: `${window.location.origin}/store?track=${track.id}`
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch {
      }
    } else {
      try {
        await navigator.clipboard.writeText(
          `${shareData.title}
${shareData.text}
${shareData.url}`
        );
        ue.success("Link copied to clipboard!");
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
      className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium border border-border bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground transition-smooth",
      "aria-label": t("share"),
      "data-ocid": `artist-track-share-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
        t("share")
      ]
    }
  );
}
function WaveformPreviewPanel({
  track,
  onIncrementPreview,
  onClose
}) {
  var _a, _b;
  const waveContainerRef = reactExports.useRef(null);
  const wsRef = reactExports.useRef(null);
  const regionRef = reactExports.useRef(null);
  const hasCountedRef = reactExports.useRef(false);
  const [isReady, setIsReady] = reactExports.useState(false);
  const [isPlaying, setIsPlaying] = reactExports.useState(false);
  const [currentTime, setCurrentTime] = reactExports.useState(0);
  const [duration, setDuration] = reactExports.useState(0);
  const [loadError, setLoadError] = reactExports.useState(false);
  const audioUrl = (_b = (_a = track.audioFile) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
  const previewStart = track.previewStartSecs ?? 0;
  const previewEnd = track.previewEndSecs ?? 30;
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
      height: 64,
      normalize: true,
      url: audioUrl
    });
    wsRef.current = ws;
    ws.on("ready", () => {
      setIsReady(true);
      setDuration(ws.getDuration());
      regionRef.current = { start: previewStart, end: previewEnd };
      ws.seekTo(previewStart / ws.getDuration());
    });
    ws.on("audioprocess", (t) => {
      var _a2, _b2;
      setCurrentTime(t);
      const end = ((_a2 = regionRef.current) == null ? void 0 : _a2.end) ?? previewEnd;
      if (t >= end) {
        ws.pause();
        ws.seekTo(
          (((_b2 = regionRef.current) == null ? void 0 : _b2.start) ?? previewStart) / ws.getDuration()
        );
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
        const pos = ws.getCurrentTime();
        const end = ((_a2 = regionRef.current) == null ? void 0 : _a2.end) ?? previewEnd;
        const start = ((_b2 = regionRef.current) == null ? void 0 : _b2.start) ?? previewStart;
        if (pos >= end || pos < start) ws.seekTo(start / dur);
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
      className: "border-t border-primary/20 bg-[#0f0f0f] p-4",
      "data-ocid": `artist-waveform-${track.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "badge-accent text-xs", children: "30s Preview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-xs", children: [
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
              children: "✕"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-lg overflow-hidden bg-[#111] p-2", children: [
          isReady && duration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute top-2 bottom-2 rounded pointer-events-none",
              style: {
                left: `calc(${previewStart / duration * 100}% + 8px)`,
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
              style: { background: "transparent" },
              className: "relative z-10"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handlePlayPause,
              disabled: !isReady || loadError,
              className: "w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary/85 transition-colors disabled:opacity-50 shrink-0 gold-glow",
              "aria-label": isPlaying ? "Pause preview" : "Play preview",
              "data-ocid": `artist-waveform-play-${track.id}`,
              children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(Pause, { className: "w-4 h-4 fill-primary-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-4 h-4 fill-primary-foreground ml-0.5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-10 shrink-0 text-right", children: fmt(Math.max(0, elapsed)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 bg-muted/40 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "h-full rounded-full transition-all duration-100",
                style: { width: `${progressPct}%`, background: GOLD }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-10 shrink-0", children: fmt(windowDuration) })
          ] }),
          !isReady && !loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground animate-pulse", children: "Loading…" }),
          loadError && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive", children: "Preview unavailable" })
        ] })
      ]
    }
  );
}
function ArtistTrackCard({
  track,
  onAddToCart,
  activePreviewId,
  onPreview,
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
      "data-ocid": `artist-profile-track-${track.id}`,
      children: [
        (isBestSeller || isMostViewed) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 z-10 flex gap-1.5 p-2 justify-end", children: [
          isBestSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3 h-3" }),
            " Best Seller"
          ] }),
          isMostViewed && !isBestSeller && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 bg-muted/90 text-foreground text-xs font-bold px-2 py-0.5 rounded-full shadow-lg border border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-3 h-3 text-primary" }),
            " Most Viewed"
          ] })
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
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-12 h-12 text-foreground/20 group-hover:scale-110 transition-smooth" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => onPreview(track),
                  className: "absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center",
                  "aria-label": `Preview ${track.title}`,
                  "data-ocid": `artist-preview-${track.id}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Play, { className: "w-6 h-6 text-primary-foreground fill-primary-foreground ml-1" }) })
                }
              ),
              track.explicit && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 bg-black/70 text-foreground text-xs px-1.5 py-0.5 rounded font-mono font-bold", children: "E" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 left-2 badge-accent capitalize text-xs", children: track.trackType }),
              isPreviewOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1 bg-black/70 rounded-full px-2 py-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: "Preview" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 flex flex-col flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground text-sm leading-tight truncate", children: track.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs shrink-0", children: track.genre }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-base ml-2", children: [
              "$",
              (Number(track.priceInCents) / 100).toFixed(2)
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 text-xs text-muted-foreground", children: [
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LikeButton, { trackId: track.id, initialCount: track.likeCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShareButton, { track })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              size: "sm",
              variant: isInCart ? "secondary" : "default",
              className: `w-full mt-3 gap-2 text-xs ${isInCart ? "border border-primary/30" : ""}`,
              onClick: () => onAddToCart(track),
              "data-ocid": `artist-add-cart-${track.id}`,
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
function TrackSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square w-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" })
    ] })
  ] });
}
function ArtistProfile() {
  var _a;
  const { artistId } = useParams({ strict: false });
  const [activePreviewId, setActivePreviewId] = reactExports.useState(null);
  const [cartItems, setCartItems] = reactExports.useState([]);
  const { actor, isFetching } = useActor(createActor);
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: ["artist-tracks", artistId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTracksByArtist(artistId);
    },
    enabled: !!actor,
    refetchInterval: 3e4
  });
  const { data: artistProfile } = useQuery({
    queryKey: ["artist-public-profile", artistId],
    queryFn: async () => {
      if (!actor) return null;
      const extActor = actor;
      const result = await extActor.getArtistProfile(artistId);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !isFetching
  });
  const artistName = (artistProfile == null ? void 0 : artistProfile.name) ?? ((_a = tracks[0]) == null ? void 0 : _a.artistName) ?? "Artist";
  const artistBio = (artistProfile == null ? void 0 : artistProfile.bio) ?? "";
  const socialLinks = artistProfile ? {
    instagram: artistProfile.instagram,
    twitterX: artistProfile.twitterX,
    tiktok: artistProfile.tiktok,
    youtube: artistProfile.youtube,
    facebook: artistProfile.facebook,
    soundcloud: artistProfile.soundcloud,
    spotify: artistProfile.spotify,
    appleMusic: artistProfile.appleMusic,
    website: artistProfile.website
  } : null;
  const maxSales = Math.max(1, ...tracks.map((t) => Number(t.saleCount)));
  const maxPreviews = Math.max(1, ...tracks.map((t) => Number(t.previewCount)));
  const bestSellerThreshold = maxSales * 0.8;
  const mostViewedThreshold = maxPreviews * 0.8;
  const cartSet = new Set(cartItems.map((t) => String(t.id)));
  const handleAddToCart = (track) => {
    setCartItems((prev) => {
      const alreadyIn = prev.some((t) => t.id === track.id);
      if (alreadyIn) return prev.filter((t) => t.id !== track.id);
      return [...prev, track];
    });
    ue.success(
      `${cartItems.some((t) => t.id === track.id) ? "Removed from" : "Added to"} cart`
    );
  };
  const handlePreview = (track) => {
    setActivePreviewId((prev) => prev === track.id ? null : track.id);
  };
  const showLoader = isLoading || isFetching && tracks.length === 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: "/store",
        className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors",
        "data-ocid": "artist-profile-back",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
          "Back to Store"
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border-b border-primary/20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center text-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 border-2 border-primary/40 flex items-center justify-center shadow-lg",
            style: { width: "4.5rem", height: "4.5rem" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-8 h-8 sm:w-9 sm:h-9 text-primary" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-3xl sm:text-4xl md:text-5xl text-primary tracking-tight", children: showLoader ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-48 mx-auto" }) : artistName }),
          artistBio && !showLoader && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-sm max-w-md mx-auto leading-relaxed", children: artistBio }),
          !artistBio && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-2 text-base", children: "Full Catalog" }),
          !showLoader && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary/70 text-sm mt-1 font-medium", children: [
            tracks.length,
            " ",
            tracks.length === 1 ? "track" : "tracks"
          ] })
        ] }),
        socialLinks && /* @__PURE__ */ jsxRuntimeExports.jsx(SocialIcons, { links: socialLinks }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mt-2 w-full max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-r from-transparent via-primary/40 to-primary/20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-primary/60 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-gradient-to-l from-transparent via-primary/40 to-primary/20" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10", children: showLoader ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4", children: ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10"].map(
      (k) => /* @__PURE__ */ jsxRuntimeExports.jsx(TrackSkeleton, {}, k)
    ) }) : tracks.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-24 gap-4",
        "data-ocid": "artist-no-tracks",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-12 h-12 text-primary/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-display font-bold text-xl text-center", children: "No releases yet 👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-center max-w-xs", children: "This artist hasn't published any tracks yet. Check back soon." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              className: "border-primary/30 text-primary hover:bg-primary/10 mt-2",
              children: "Browse Store"
            }
          ) })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4",
        "data-ocid": "artist-track-grid",
        children: tracks.map((track) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          ArtistTrackCard,
          {
            track,
            onAddToCart: handleAddToCart,
            activePreviewId,
            onPreview: handlePreview,
            isInCart: cartSet.has(String(track.id)),
            isBestSeller: Number(track.saleCount) >= bestSellerThreshold && Number(track.saleCount) > 0,
            isMostViewed: Number(track.previewCount) >= mostViewedThreshold && Number(track.previewCount) > 0
          },
          String(track.id)
        ))
      }
    ) })
  ] });
}
export {
  ArtistProfile as default
};
