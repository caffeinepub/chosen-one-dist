import { h as useNavigate, c as useActor, d as useAuth, i as useCartStore, r as reactExports, v as useSearch, l as ue, j as jsxRuntimeExports, B as Button, m as ShoppingCart, L as Link, o as Separator, X, I as Input, D as Download, R as Receipt, f as createActor } from "./index-EKiXWDi-.js";
import { B as Badge } from "./badge-D8mlIGNm.js";
import { L as Label } from "./label-D5Si_j0s.js";
import { u as useCustomerAuth, h as hashPin } from "./use-customer-auth-xF0SAFXB.js";
import { C as Crown } from "./crown-CRHRVPMK.js";
import { R as RefreshCw } from "./refresh-cw-Ci7RUGhw.js";
import { M as Music } from "./music-q1p1z5Ag.js";
import { L as Lock } from "./lock-BV3DYFVa.js";
import { A as ArrowLeft } from "./arrow-left-CAkTKFZZ.js";
import { T as Trash2 } from "./trash-2-Bokv42SM.js";
import { C as CircleCheck } from "./circle-check-C5A0w8xA.js";
import { U as UserPlus } from "./user-plus-C_XBsVaP.js";
import { C as CircleAlert } from "./circle-alert-ClKUnhjt.js";
const CART_SNAPSHOT_KEY = "cod_cart_snapshot";
function saveCartSnapshot(snapshot) {
  try {
    localStorage.setItem(CART_SNAPSHOT_KEY, JSON.stringify(snapshot));
  } catch {
  }
}
function loadCartSnapshot() {
  try {
    const raw = localStorage.getItem(CART_SNAPSHOT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.savedAt > 2 * 60 * 60 * 1e3) {
      localStorage.removeItem(CART_SNAPSHOT_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}
function clearCartSnapshot() {
  try {
    localStorage.removeItem(CART_SNAPSHOT_KEY);
  } catch {
  }
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
function getFileExtension(url) {
  const lower = url.toLowerCase();
  if (lower.includes(".wav") || lower.includes("wav")) return "wav";
  if (lower.includes(".flac") || lower.includes("flac")) return "flac";
  return "mp3";
}
function getGenreColor(genre) {
  const map = {
    "Hip-Hop": "from-amber-950 to-amber-900",
    "R&B": "from-purple-950 to-purple-900",
    Pop: "from-pink-950 to-pink-900",
    Electronic: "from-cyan-950 to-cyan-900",
    Rock: "from-red-950 to-red-900"
  };
  return map[genre] ?? "from-zinc-900 to-zinc-800";
}
function serializeTracks(tracks) {
  return tracks.map((t) => ({ ...t, id: String(t.id) }));
}
function deserializeTracks(tracks) {
  return tracks.map((t) => ({ ...t, id: BigInt(t.id) }));
}
function SuccessScreen({
  tracks,
  sessionId,
  isFulfilling,
  fulfillError,
  onReturnToStore
}) {
  const handleDownloadReceipt = () => {
    const canvas = document.createElement("canvas");
    const W = 600;
    const lineH = 28;
    const padding = 40;
    const headerH = 180;
    const footerH = 80;
    const itemsH = Math.max(tracks.length * lineH + 60, 80);
    canvas.width = W;
    canvas.height = headerH + itemsH + footerH + padding * 2;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
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
    ctx.fillText(`Receipt ${receiptId}`, padding, 158);
    ctx.textAlign = "right";
    ctx.fillText(
      `Date: ${(/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      W - padding,
      158
    );
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
    for (const item of tracks) {
      ctx.textAlign = "left";
      ctx.fillStyle = "#e8e8e8";
      ctx.font = "bold 13px Georgia, serif";
      ctx.fillText(
        item.title.length > 38 ? `${item.title.slice(0, 36)}…` : item.title,
        padding,
        y + lineH - 8
      );
      ctx.fillStyle = "#888";
      ctx.font = "11px monospace";
      ctx.fillText(`by ${item.artistName}`, padding, y + lineH + 6);
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
    ctx.textAlign = "center";
    ctx.fillStyle = "#d4af37";
    ctx.font = "13px Georgia, serif";
    ctx.fillText(
      "Thank you for supporting independent artists 👑",
      W / 2,
      y + 10
    );
    const dateStr = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `receipt-${dateStr}-${sessionId.slice(-6) || "purchase"}.png`;
    link.click();
    ue.success("Receipt downloaded!");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-screen flex items-center justify-center p-4",
      style: { background: "#0a0a0a" },
      "data-ocid": "success-screen",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center animate-crown-glow-pulse",
              style: {
                background: "rgba(212,175,55,0.12)",
                border: "2px solid rgba(212,175,55,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10", style: { color: "#d4af37" } })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-4 text-xs uppercase tracking-widest font-semibold",
              style: { color: "#d4af37" },
              children: "Purchase Complete"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mt-1", children: "Thank You! 👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Chosen One Distribution" })
        ] }),
        isFulfilling && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 px-4 py-3 rounded-lg mb-4 text-sm",
            style: {
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: "w-4 h-4 animate-spin shrink-0",
                  style: { color: "#d4af37" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Recording your purchase…" })
            ]
          }
        ),
        fulfillError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-start gap-2 px-4 py-3 rounded-lg mb-4 text-xs",
            style: {
              background: "rgba(239,68,68,0.06)",
              border: "1px solid rgba(239,68,68,0.2)"
            },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 text-red-400 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                "Could not record this purchase to your account (",
                fulfillError,
                "), but your downloads are still available below."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "rounded-xl overflow-hidden mb-6",
            style: {
              border: "1px solid rgba(212,175,55,0.25)",
              background: "rgba(212,175,55,0.04)"
            },
            "data-ocid": "success-track-list",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "px-4 py-3 border-b",
                  style: { borderColor: "rgba(212,175,55,0.15)" },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                    tracks.length,
                    " track",
                    tracks.length !== 1 ? "s" : "",
                    " purchased — download",
                    tracks.length !== 1 ? "s" : "",
                    " ready"
                  ] })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 space-y-3", children: tracks.map((t) => {
                const ext = t.audioFileUrl ? getFileExtension(t.audioFileUrl) : "mp3";
                const format = ext.toUpperCase();
                const filename = `${t.artistName} - ${t.title}.${ext}`;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(t.genre ?? "")} flex items-center justify-center shrink-0`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-foreground/30" })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: t.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      t.artistName,
                      t.audioFileUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          className: "ml-1 font-mono",
                          style: { color: "#d4af37" },
                          children: [
                            "· ",
                            format
                          ]
                        }
                      )
                    ] })
                  ] }),
                  t.audioFileUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      onClick: () => {
                        triggerDownload(t.audioFileUrl, filename);
                        ue.success(`Downloading "${t.title}" (${format})`);
                      },
                      className: "gap-1 text-xs shrink-0 min-h-[36px]",
                      style: { background: "#d4af37", color: "#000" },
                      "data-ocid": `success-download-${String(t.id)}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: format })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      disabled: true,
                      className: "gap-1 text-xs shrink-0 min-h-[36px] opacity-50",
                      "data-ocid": `success-download-unavailable-${String(t.id)}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "N/A" })
                      ]
                    }
                  )
                ] }, String(t.id));
              }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: handleDownloadReceipt,
              variant: "outline",
              className: "w-full gap-2 min-h-[44px]",
              style: { borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" },
              "data-ocid": "success-receipt-btn",
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
              onClick: onReturnToStore,
              className: "w-full gap-2 min-h-[44px]",
              "data-ocid": "success-return-store",
              children: "Return to Store"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground mt-6", children: [
          "Registered customers can re-download from",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", className: "text-primary hover:underline", children: "My Purchases" }),
          " ",
          "within 30 days."
        ] })
      ] })
    }
  );
}
function CheckoutPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const { isCustomerLoggedIn, customerToken, customerEmail, customerSignup } = useCustomerAuth();
  const { items: cartItems, clearCart, removeItem } = useCartStore();
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [hasRemovedItem, setHasRemovedItem] = reactExports.useState(false);
  const [showRegisterPrompt, setShowRegisterPrompt] = reactExports.useState(false);
  const [regEmail, setRegEmail] = reactExports.useState("");
  const [regPin, setRegPin] = reactExports.useState("");
  const [regConfirmPin, setRegConfirmPin] = reactExports.useState("");
  const [isRegistering, setIsRegistering] = reactExports.useState(false);
  const [successTracks, setSuccessTracks] = reactExports.useState([]);
  const [successSessionId, setSuccessSessionId] = reactExports.useState("");
  const [isFulfilling, setIsFulfilling] = reactExports.useState(false);
  const [fulfillError, setFulfillError] = reactExports.useState(null);
  const fulfillCalledRef = reactExports.useRef(false);
  const totalCents = cartItems.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0
  );
  const totalDollars = (totalCents / 100).toFixed(2);
  const search = useSearch({ strict: false });
  const isSuccess = (search == null ? void 0 : search.success) === "true";
  const isCancelled = (search == null ? void 0 : search.cancel) === "true";
  const stripeSessionId = (search == null ? void 0 : search.session_id) ?? "";
  reactExports.useEffect(() => {
    if (isCancelled) {
      ue.info("Payment was cancelled — your cart is still saved.");
      window.history.replaceState({}, "", "/checkout");
    }
  }, [isCancelled]);
  reactExports.useEffect(() => {
    if (hasRemovedItem && cartItems.length === 0 && !isSuccess) {
      ue.info("Your cart is empty. Returning to the store.");
      void navigate({ to: "/store" });
    }
  }, [hasRemovedItem, cartItems.length, navigate, isSuccess]);
  const fulfillPurchases = reactExports.useCallback(
    async (tracks, sessionId, token, email) => {
      if (!actor || tracks.length === 0) return;
      if (fulfillCalledRef.current) return;
      fulfillCalledRef.current = true;
      setIsFulfilling(true);
      setFulfillError(null);
      const errors = [];
      for (const track of tracks) {
        const compositeSessionId = tracks.length > 1 ? `${sessionId}_${String(track.id)}` : sessionId;
        try {
          const result = await actor.fulfillTrackPurchase(
            token,
            track.id,
            compositeSessionId,
            email
          );
          if (result.__kind__ === "err") {
            const isAlreadyFulfilled = result.err.toLowerCase().includes("already") || result.err.toLowerCase().includes("duplicate") || result.err.toLowerCase().includes("exists");
            if (!isAlreadyFulfilled) {
              errors.push(`"${track.title}": ${result.err}`);
            }
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : "Unknown error";
          errors.push(`"${track.title}": ${msg}`);
        }
      }
      setIsFulfilling(false);
      if (errors.length > 0) {
        setFulfillError(errors.join("; "));
      }
      clearCartSnapshot();
    },
    [actor]
  );
  reactExports.useEffect(() => {
    if (!isSuccess) return;
    const snapshot = loadCartSnapshot();
    if (!snapshot || snapshot.tracks.length === 0) return;
    const tracks = deserializeTracks(
      snapshot.tracks
    );
    setSuccessTracks(tracks);
    setSuccessSessionId(stripeSessionId || snapshot.token || "");
    if (actor && stripeSessionId) {
      void fulfillPurchases(
        tracks,
        stripeSessionId,
        snapshot.token,
        snapshot.customerEmail
      );
    } else if (actor && !stripeSessionId) {
      clearCartSnapshot();
    }
  }, [isSuccess, actor, stripeSessionId, fulfillPurchases]);
  const handleRemoveItem = (trackId) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    removeItem(trackId);
    setHasRemovedItem(true);
    if (item) ue.success(`"${item.track.title}" removed from cart`);
  };
  const processPayment = async () => {
    if (!actor || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const origin = window.location.origin;
      const activeToken = customerToken ?? sessionToken ?? "";
      const successUrl = `${origin}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`;
      const cancelUrl = `${origin}/checkout?cancel=true`;
      let url = null;
      const tracksSnapshot = cartItems.map((i) => {
        var _a, _b;
        return {
          id: i.track.id,
          title: i.track.title,
          artistName: i.track.artistName,
          audioFileUrl: (_b = (_a = i.track.audioFile) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a),
          genre: i.track.genre
        };
      });
      saveCartSnapshot({
        tracks: serializeTracks(tracksSnapshot),
        token: activeToken,
        customerEmail: customerEmail ?? null,
        savedAt: Date.now()
      });
      if (cartItems.length === 1) {
        const firstTrack = cartItems[0].track;
        const result = await actor.createTrackCheckoutSession(
          activeToken,
          firstTrack.id,
          successUrl,
          cancelUrl
        );
        if (result.__kind__ === "err") throw new Error(result.err);
        const parsed = JSON.parse(result.ok);
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      } else {
        const items = cartItems.map((item) => ({
          productName: item.track.title,
          currency: "usd",
          quantity: BigInt(1),
          priceInCents: item.track.priceInCents,
          productDescription: `${item.track.title} by ${item.track.artistName}`
        }));
        const sessionUrl = await actor.createCheckoutSession(
          items,
          successUrl,
          cancelUrl
        );
        const parsed = JSON.parse(sessionUrl);
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      }
      clearCart();
      window.location.href = url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      ue.error(`Payment error: ${msg}`);
      clearCartSnapshot();
      setIsProcessing(false);
    }
  };
  if (isSuccess && successTracks.length > 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      SuccessScreen,
      {
        tracks: successTracks,
        sessionId: successSessionId,
        isFulfilling,
        fulfillError,
        onReturnToStore: () => {
          setSuccessTracks([]);
          void navigate({ to: "/store" });
        }
      }
    );
  }
  if (isSuccess && successTracks.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-crown-glow-pulse",
              style: {
                background: "rgba(212,175,55,0.12)",
                border: "2px solid rgba(212,175,55,0.5)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-10 h-10", style: { color: "#d4af37" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Payment Successful! 👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Preparing your downloads…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RefreshCw,
              {
                className: "w-3.5 h-3.5 animate-spin",
                style: { color: "#d4af37" }
              }
            ),
            "Loading your tracks"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => void navigate({ to: "/store" }),
              variant: "outline",
              className: "gap-2 min-h-[44px]",
              style: { borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" },
              children: "Go to My Purchases"
            }
          )
        ] })
      }
    );
  }
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center p-6",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto",
              style: {
                background: "rgba(212,175,55,0.1)",
                border: "1px solid rgba(212,175,55,0.3)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-8 h-8", style: { color: "#d4af37" } })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your cart is empty" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add some tracks from the store before checking out." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              className: "gap-2 min-h-[44px]",
              style: { background: "#d4af37", color: "#000" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4" }),
                "Browse Store"
              ]
            }
          ) })
        ] })
      }
    );
  }
  if (isProcessing) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center",
        style: { background: "#0a0a0a" },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-20 h-20 rounded-full flex items-center justify-center mx-auto",
              style: {
                background: "rgba(212,175,55,0.1)",
                border: "2px solid rgba(212,175,55,0.4)"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: "w-10 h-10 animate-spin",
                  style: { color: "#d4af37" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-xl text-foreground", children: "Preparing your secure checkout…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "You'll be redirected to complete your payment securely." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5", style: { color: "#d4af37" } }),
            "Secured by Chosen One Distribution • Platform Pay"
          ] })
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen",
      style: { background: "#0a0a0a" },
      "data-ocid": "checkout-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "sticky top-0 z-20 border-b",
            style: { background: "#111", borderColor: "rgba(212,175,55,0.2)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => void navigate({ to: "/store" }),
                  className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px]",
                  "data-ocid": "checkout-back-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Store" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Back" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5", style: { color: "#d4af37" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm sm:text-base", children: "Platform Pay" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground ml-1" })
            ] })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-7 h-7 shrink-0", style: { color: "#d4af37" } }),
              "Review Your Order"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Confirm your cart then proceed to secure payment. You'll only enter your payment details once on the next screen." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl overflow-hidden",
              style: {
                border: "1px solid rgba(212,175,55,0.25)",
                background: "#111"
              },
              "data-ocid": "order-summary",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "px-4 sm:px-5 py-3 sm:py-4 border-b flex items-center gap-2",
                    style: { borderColor: "rgba(212,175,55,0.15)" },
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4", style: { color: "#d4af37" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm uppercase tracking-wide", children: "Your Cart" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Badge,
                        {
                          variant: "secondary",
                          className: "ml-auto text-xs",
                          style: {
                            background: "rgba(212,175,55,0.1)",
                            color: "#d4af37",
                            border: "1px solid rgba(212,175,55,0.3)"
                          },
                          children: [
                            cartItems.length,
                            " track",
                            cartItems.length !== 1 ? "s" : ""
                          ]
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-5 space-y-3", children: cartItems.map((item) => {
                  var _a, _b;
                  const coverUrl = (_b = (_a = item.track.coverArt) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "flex items-center gap-3 group/orderitem",
                      "data-ocid": `order-item-${String(item.track.id)}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: `w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
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
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.track.title }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.track.artistName })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: "font-bold text-sm shrink-0",
                            style: { color: "#d4af37" },
                            children: [
                              "$",
                              (Number(item.track.priceInCents) / 100).toFixed(2)
                            ]
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => handleRemoveItem(item.track.id),
                            className: "flex items-center justify-center w-8 h-8 rounded-md border transition-colors shrink-0 opacity-60 group-hover/orderitem:opacity-100 min-h-[32px] min-w-[32px]",
                            style: {
                              borderColor: "rgba(212,175,55,0.25)",
                              color: "#d4af37"
                            },
                            "aria-label": `Remove "${item.track.title}"`,
                            "data-ocid": `order-remove-${String(item.track.id)}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                          }
                        )
                      ]
                    },
                    String(item.track.id)
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "rgba(212,175,55,0.12)" } }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-4 space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                      "$",
                      totalDollars
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Processing fee" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Included" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { style: { background: "rgba(212,175,55,0.12)" } }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: "Total" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-2xl font-bold font-display",
                        style: { color: "#d4af37" },
                        children: [
                          "$",
                          totalDollars
                        ]
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5 space-y-2", children: [
                  "Instant download after payment",
                  "Original MP3 or WAV format",
                  "Re-download within 30 days",
                  "85% goes directly to the artist"
                ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-2 text-xs text-muted-foreground",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }),
                      benefit
                    ]
                  },
                  benefit
                )) })
              ]
            }
          ),
          !isCustomerLoggedIn && !showRegisterPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 sm:p-5 space-y-3",
              style: {
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.18)"
              },
              "data-ocid": "checkout-register-prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UserPlus,
                    {
                      className: "w-4 h-4 shrink-0",
                      style: { color: "#d4af37" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Save for re-downloads (optional)" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Register with email + PIN to re-download within",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold", style: { color: "#d4af37" }, children: "30 days" }),
                  ". You can skip this and still purchase."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xs:flex-row gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      onClick: () => setShowRegisterPrompt(true),
                      className: "flex-1 gap-1.5 text-xs min-h-[44px]",
                      style: { background: "#d4af37", color: "#000" },
                      "data-ocid": "checkout-register-open-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                        "Register to save purchases"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      className: "w-full xs:w-auto text-xs border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]",
                      "data-ocid": "checkout-customer-login-link",
                      children: "Already registered"
                    }
                  ) })
                ] })
              ]
            }
          ),
          showRegisterPrompt && !isCustomerLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-4 sm:p-5 space-y-4",
              style: {
                background: "rgba(212,175,55,0.04)",
                border: "1px solid rgba(212,175,55,0.18)"
              },
              "data-ocid": "checkout-register-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4", style: { color: "#d4af37" } }),
                    "Save Purchases 👑"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowRegisterPrompt(false),
                      className: "p-1.5 rounded hover:bg-muted/50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center",
                      "aria-label": "Close",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", className: "text-xs", children: "Email Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reg-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: regEmail,
                        onChange: (e) => setRegEmail(e.target.value),
                        className: "h-11 text-sm",
                        "data-ocid": "reg-email-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-pin", className: "text-xs", children: "PIN (4–6 digits)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "reg-pin",
                          type: "password",
                          inputMode: "numeric",
                          placeholder: "••••",
                          value: regPin,
                          onChange: (e) => setRegPin(e.target.value.replace(/\D/g, "").slice(0, 6)),
                          maxLength: 6,
                          className: "h-11 text-sm font-mono",
                          "data-ocid": "reg-pin-input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-confirm", className: "text-xs", children: "Confirm PIN" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "reg-confirm",
                          type: "password",
                          inputMode: "numeric",
                          placeholder: "••••",
                          value: regConfirmPin,
                          onChange: (e) => setRegConfirmPin(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          ),
                          maxLength: 6,
                          className: `h-11 text-sm font-mono ${regConfirmPin.length > 0 && regPin !== regConfirmPin ? "border-destructive" : ""}`,
                          "data-ocid": "reg-confirm-input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      disabled: isRegistering || !regEmail.includes("@") || regPin.length < 4 || regPin !== regConfirmPin,
                      onClick: async () => {
                        setIsRegistering(true);
                        try {
                          const pinHash = await hashPin(regPin);
                          await customerSignup(regEmail.trim(), pinHash);
                          ue.success(
                            "Account created! Your purchases are saved. 👑"
                          );
                          setShowRegisterPrompt(false);
                        } catch (err) {
                          ue.error(
                            err.message || "Registration failed."
                          );
                        } finally {
                          setIsRegistering(false);
                        }
                      },
                      className: "w-full gap-1.5 text-xs min-h-[44px]",
                      style: { background: "#d4af37", color: "#000" },
                      "data-ocid": "reg-submit-btn",
                      children: [
                        isRegistering ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                        isRegistering ? "Saving…" : "Save My Purchases"
                      ]
                    }
                  )
                ] })
              ]
            }
          ),
          isCustomerLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 px-4 py-3 rounded-lg",
              style: {
                background: "rgba(52,211,153,0.05)",
                border: "1px solid rgba(52,211,153,0.2)"
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  "Signed in as",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: customerEmail }),
                  ". Purchases will be saved."
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-xl p-5 sm:p-6 space-y-4",
              style: {
                background: "rgba(212,175,55,0.06)",
                border: "1px solid rgba(212,175,55,0.3)"
              },
              "data-ocid": "checkout-pay-section",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold text-sm", children: "Ready to complete your purchase?" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "You'll be taken to a secure payment screen where you can pay with card, Apple Pay, Google Pay, or other methods. Your billing address and payment info are entered just once there." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    type: "button",
                    onClick: () => void processPayment(),
                    disabled: isProcessing,
                    className: "w-full gap-2 font-bold text-base",
                    style: {
                      background: "linear-gradient(135deg, #d4af37, #f5c842)",
                      color: "#000",
                      minHeight: "56px"
                    },
                    "data-ocid": "proceed-to-payment-btn",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-5 h-5" }),
                      "Complete Purchase — $",
                      totalDollars
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3", style: { color: "#d4af37" } }),
                  "Secured by Chosen One Distribution • Platform Pay"
                ] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  CheckoutPage as default
};
