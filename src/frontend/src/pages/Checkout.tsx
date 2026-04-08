import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  Crown,
  Download,
  Lock,
  Music,
  Receipt,
  RefreshCw,
  ShoppingCart,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useCustomerAuth } from "../hooks/use-customer-auth";
import { hashPin } from "../hooks/use-customer-auth";
import { useCartStore } from "../store/cart";

// ─── Helpers ──────────────────────────────────────────────────────────────────

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

function getFormatLabel(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes(".wav") || lower.includes("wav")) return "WAV";
  if (lower.includes(".flac") || lower.includes("flac")) return "FLAC";
  return "MP3";
}

function getGenreColor(genre: string): string {
  const map: Record<string, string> = {
    "Hip-Hop": "from-amber-950 to-amber-900",
    "R&B": "from-purple-950 to-purple-900",
    Pop: "from-pink-950 to-pink-900",
    Electronic: "from-cyan-950 to-cyan-900",
    Rock: "from-red-950 to-red-900",
  };
  return map[genre] ?? "from-zinc-900 to-zinc-800";
}

// ─── Success Screen ───────────────────────────────────────────────────────────

interface SuccessTrack {
  id: bigint;
  title: string;
  artistName: string;
  audioFileUrl?: string;
  genre?: string;
}

function SuccessScreen({
  tracks,
  sessionId,
  onReturnToStore,
}: {
  tracks: SuccessTrack[];
  sessionId: string;
  onReturnToStore: () => void;
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
    const receiptId = sessionId
      ? `#${sessionId.slice(-8).toUpperCase()}`
      : `#${Date.now().toString(36).toUpperCase()}`;
    ctx.fillText(`Receipt ${receiptId}`, padding, 158);
    ctx.textAlign = "right";
    ctx.fillText(
      `Date: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
      W - padding,
      158,
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
        y + lineH - 8,
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
      y + 10,
    );
    const dateStr = new Date().toISOString().slice(0, 10);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = `receipt-${dateStr}-${sessionId.slice(-6) || "purchase"}.png`;
    link.click();
    toast.success("Receipt downloaded!");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "#0a0a0a" }}
    >
      <div className="w-full max-w-md">
        {/* Crown animation ring */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center animate-crown-glow-pulse"
              style={{
                background: "rgba(212,175,55,0.12)",
                border: "2px solid rgba(212,175,55,0.5)",
              }}
            >
              <Crown className="w-10 h-10" style={{ color: "#d4af37" }} />
            </div>
          </div>
          <p
            className="mt-4 text-xs uppercase tracking-widest font-semibold"
            style={{ color: "#d4af37" }}
          >
            Purchase Complete
          </p>
          <h1 className="font-display font-bold text-2xl text-foreground mt-1">
            Thank You! 👑
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Chosen One Distribution
          </p>
        </div>

        {/* Track list */}
        <div
          className="rounded-xl overflow-hidden mb-6"
          style={{
            border: "1px solid rgba(212,175,55,0.25)",
            background: "rgba(212,175,55,0.04)",
          }}
        >
          <div
            className="px-4 py-3 border-b"
            style={{ borderColor: "rgba(212,175,55,0.15)" }}
          >
            <p className="text-sm font-semibold text-foreground">
              {tracks.length} track{tracks.length !== 1 ? "s" : ""} purchased
            </p>
          </div>
          <div className="p-4 space-y-3">
            {tracks.map((t) => (
              <div key={String(t.id)} className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(t.genre ?? "")} flex items-center justify-center shrink-0`}
                >
                  <Music className="w-4 h-4 text-foreground/30" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {t.title}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    {t.artistName}
                  </p>
                </div>
                {t.audioFileUrl && (
                  <Button
                    size="sm"
                    onClick={() => {
                      if (t.audioFileUrl) {
                        const format = getFormatLabel(t.audioFileUrl);
                        triggerDownload(
                          t.audioFileUrl,
                          `${t.artistName} - ${t.title}.${format.toLowerCase()}`,
                        );
                      }
                    }}
                    className="gap-1 text-xs shrink-0 min-h-[36px]"
                    style={{ background: "#d4af37", color: "#000" }}
                    data-ocid={`success-download-${t.id}`}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="w-full gap-2 min-h-[44px]"
            style={{ borderColor: "rgba(212,175,55,0.4)", color: "#d4af37" }}
            data-ocid="success-receipt-btn"
          >
            <Receipt className="w-4 h-4" />
            Download Receipt
          </Button>
          <Button
            variant="outline"
            onClick={onReturnToStore}
            className="w-full gap-2 min-h-[44px]"
            data-ocid="success-return-store"
          >
            Return to Store
          </Button>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Registered customers can re-download from{" "}
          <Link to="/store" className="text-primary hover:underline">
            My Purchases
          </Link>{" "}
          within 30 days.
        </p>
      </div>
    </div>
  );
}

// ─── Main Checkout Page ────────────────────────────────────────────────────────

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { sessionToken } = useAuth();
  const { isCustomerLoggedIn, customerToken, customerEmail, customerSignup } =
    useCustomerAuth();
  const { items: cartItems, clearCart, removeItem } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [hasRemovedItem, setHasRemovedItem] = useState(false);

  // Optional registration before checkout
  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regConfirmPin, setRegConfirmPin] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  // Success screen
  const [successTracks, setSuccessTracks] = useState<SuccessTrack[]>([]);

  const totalCents = cartItems.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0,
  );
  const totalDollars = (totalCents / 100).toFixed(2);

  // Check for success/cancel query params
  const search = useSearch({ strict: false }) as Record<string, string>;
  const isSuccess = search?.success === "true";
  const isCancelled = search?.cancel === "true";

  useEffect(() => {
    if (isCancelled) {
      toast.info("Payment was cancelled — your cart is still saved.");
      window.history.replaceState({}, "", "/checkout");
    }
  }, [isCancelled]);

  useEffect(() => {
    if (hasRemovedItem && cartItems.length === 0 && !isSuccess) {
      toast.info("Your cart is empty. Returning to the store.");
      void navigate({ to: "/store" });
    }
  }, [hasRemovedItem, cartItems.length, navigate, isSuccess]);

  // Reset state on country change tracking
  const prevHasRemovedRef = useRef(hasRemovedItem);
  prevHasRemovedRef.current = hasRemovedItem;

  const handleRemoveItem = (trackId: bigint) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    removeItem(trackId);
    setHasRemovedItem(true);
    if (item) toast.success(`"${item.track.title}" removed from cart`);
  };

  const processPayment = async () => {
    if (!actor || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const origin = window.location.origin;
      const activeToken = customerToken ?? sessionToken ?? "";
      const successUrl = `${origin}/checkout?success=true`;
      const cancelUrl = `${origin}/checkout?cancel=true`;

      let url: string | null = null;

      if (cartItems.length === 1) {
        const firstTrack = cartItems[0].track;
        const result = await actor.createTrackCheckoutSession(
          activeToken,
          firstTrack.id,
          successUrl,
          cancelUrl,
        );
        if (result.__kind__ === "err") throw new Error(result.err);
        const parsed = JSON.parse(result.ok) as {
          url?: string;
          error?: string;
        };
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      } else {
        const items = cartItems.map((item) => ({
          productName: item.track.title,
          currency: "usd",
          quantity: BigInt(1),
          priceInCents: item.track.priceInCents,
          productDescription: `${item.track.title} by ${item.track.artistName}`,
        }));
        const sessionUrl = await actor.createCheckoutSession(
          items,
          successUrl,
          cancelUrl,
        );
        const parsed = JSON.parse(sessionUrl) as {
          url?: string;
          error?: string;
        };
        url = parsed.url ?? null;
        if (!url) throw new Error(parsed.error ?? "No checkout URL returned");
      }

      // Snapshot cart before clearing, then redirect to Stripe
      const tracksSnapshot: SuccessTrack[] = cartItems.map((i) => ({
        id: i.track.id,
        title: i.track.title,
        artistName: i.track.artistName,
        audioFileUrl: i.track.audioFile?.getDirectURL?.(),
        genre: i.track.genre,
      }));
      clearCart();
      setSuccessTracks(tracksSnapshot);

      // Redirect to Stripe Checkout — handles all payment methods and address
      window.location.href = url;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Payment failed";
      toast.error(`Payment error: ${msg}`);
      setIsProcessing(false);
    }
  };

  // ── Special screens ──────────────────────────────────────────────────────────

  if (isSuccess && successTracks.length > 0) {
    return (
      <SuccessScreen
        tracks={successTracks}
        sessionId=""
        onReturnToStore={() => {
          setSuccessTracks([]);
          void navigate({ to: "/store" });
        }}
      />
    );
  }

  if (isSuccess) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <div className="text-center space-y-4">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto animate-crown-glow-pulse"
            style={{
              background: "rgba(212,175,55,0.12)",
              border: "2px solid rgba(212,175,55,0.5)",
            }}
          >
            <Crown className="w-10 h-10" style={{ color: "#d4af37" }} />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground">
            Payment Successful! 👑
          </h1>
          <p className="text-muted-foreground text-sm">
            Your download is being prepared in the store.
          </p>
          <Button
            onClick={() => void navigate({ to: "/store" })}
            className="gap-2 min-h-[44px]"
            style={{ background: "#d4af37", color: "#000" }}
          >
            <Download className="w-4 h-4" />
            Go to My Downloads
          </Button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-6"
        style={{ background: "#0a0a0a" }}
      >
        <div className="text-center space-y-5">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "1px solid rgba(212,175,55,0.3)",
            }}
          >
            <ShoppingCart className="w-8 h-8" style={{ color: "#d4af37" }} />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground text-sm">
            Add some tracks from the store before checking out.
          </p>
          <Link to="/store">
            <Button
              className="gap-2 min-h-[44px]"
              style={{ background: "#d4af37", color: "#000" }}
            >
              <Music className="w-4 h-4" />
              Browse Store
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <div className="text-center space-y-5">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto"
            style={{
              background: "rgba(212,175,55,0.1)",
              border: "2px solid rgba(212,175,55,0.4)",
            }}
          >
            <RefreshCw
              className="w-10 h-10 animate-spin"
              style={{ color: "#d4af37" }}
            />
          </div>
          <h2 className="font-display font-bold text-xl text-foreground">
            Preparing your secure checkout…
          </h2>
          <p className="text-muted-foreground text-sm">
            You'll be redirected to complete your payment securely.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Lock className="w-3.5 h-3.5" style={{ color: "#d4af37" }} />
            Secured by Chosen One Distribution • Platform Pay
          </div>
        </div>
      </div>
    );
  }

  // ── Main checkout view ───────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen"
      style={{ background: "#0a0a0a" }}
      data-ocid="checkout-page"
    >
      {/* Header */}
      <div
        className="sticky top-0 z-20 border-b"
        style={{ background: "#111", borderColor: "rgba(212,175,55,0.2)" }}
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => void navigate({ to: "/store" })}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px]"
            data-ocid="checkout-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Store</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5" style={{ color: "#d4af37" }} />
            <span className="font-display font-bold text-foreground text-sm sm:text-base">
              Platform Pay
            </span>
          </div>
          <Lock className="w-4 h-4 text-muted-foreground ml-1" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
        {/* Page title */}
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground flex items-center gap-3">
            <Crown className="w-7 h-7 shrink-0" style={{ color: "#d4af37" }} />
            Review Your Order
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Confirm your cart then proceed to secure payment. You'll only enter
            your payment details once on the next screen.
          </p>
        </div>

        {/* ── Order Summary ── */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(212,175,55,0.25)",
            background: "#111",
          }}
          data-ocid="order-summary"
        >
          {/* Header */}
          <div
            className="px-4 sm:px-5 py-3 sm:py-4 border-b flex items-center gap-2"
            style={{ borderColor: "rgba(212,175,55,0.15)" }}
          >
            <ShoppingCart className="w-4 h-4" style={{ color: "#d4af37" }} />
            <span className="font-display font-bold text-foreground text-sm uppercase tracking-wide">
              Your Cart
            </span>
            <Badge
              variant="secondary"
              className="ml-auto text-xs"
              style={{
                background: "rgba(212,175,55,0.1)",
                color: "#d4af37",
                border: "1px solid rgba(212,175,55,0.3)",
              }}
            >
              {cartItems.length} track{cartItems.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {/* Items */}
          <div className="p-4 sm:p-5 space-y-3">
            {cartItems.map((item) => {
              const coverUrl = item.track.coverArt?.getDirectURL?.();
              return (
                <div
                  key={String(item.track.id)}
                  className="flex items-center gap-3 group/orderitem"
                  data-ocid={`order-item-${item.track.id}`}
                >
                  <div
                    className={`w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`}
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
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {item.track.artistName}
                    </p>
                  </div>
                  <span
                    className="font-bold text-sm shrink-0"
                    style={{ color: "#d4af37" }}
                  >
                    ${(Number(item.track.priceInCents) / 100).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(item.track.id)}
                    className="flex items-center justify-center w-8 h-8 rounded-md border transition-colors shrink-0 opacity-60 group-hover/orderitem:opacity-100 min-h-[32px] min-w-[32px]"
                    style={{
                      borderColor: "rgba(212,175,55,0.25)",
                      color: "#d4af37",
                    }}
                    aria-label={`Remove "${item.track.title}"`}
                    data-ocid={`order-remove-${item.track.id}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          <Separator style={{ background: "rgba(212,175,55,0.12)" }} />

          {/* Totals */}
          <div className="px-4 sm:px-5 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">${totalDollars}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing fee</span>
              <span className="text-foreground">Included</span>
            </div>
            <Separator style={{ background: "rgba(212,175,55,0.12)" }} />
            <div className="flex justify-between items-center">
              <span className="font-bold text-foreground text-sm">Total</span>
              <span
                className="text-2xl font-bold font-display"
                style={{ color: "#d4af37" }}
              >
                ${totalDollars}
              </span>
            </div>
          </div>

          {/* Benefits */}
          <div className="px-4 sm:px-5 pb-4 sm:pb-5 space-y-2">
            {[
              "Instant download after payment",
              "Original MP3 or WAV format",
              "Re-download within 30 days",
              "85% goes directly to the artist",
            ].map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 text-xs text-muted-foreground"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                {benefit}
              </div>
            ))}
          </div>
        </div>

        {/* ── Optional customer registration ── */}
        {!isCustomerLoggedIn && !showRegisterPrompt && (
          <div
            className="rounded-xl p-4 sm:p-5 space-y-3"
            style={{
              background: "rgba(212,175,55,0.04)",
              border: "1px solid rgba(212,175,55,0.18)",
            }}
            data-ocid="checkout-register-prompt"
          >
            <div className="flex items-center gap-2">
              <UserPlus
                className="w-4 h-4 shrink-0"
                style={{ color: "#d4af37" }}
              />
              <p className="text-sm font-semibold text-foreground">
                Save for re-downloads (optional)
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Register with email + PIN to re-download within{" "}
              <span className="font-semibold" style={{ color: "#d4af37" }}>
                30 days
              </span>
              . You can skip this and still purchase.
            </p>
            <div className="flex flex-col xs:flex-row gap-2">
              <Button
                type="button"
                size="sm"
                onClick={() => setShowRegisterPrompt(true)}
                className="flex-1 gap-1.5 text-xs min-h-[44px]"
                style={{ background: "#d4af37", color: "#000" }}
                data-ocid="checkout-register-open-btn"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Register to save purchases
              </Button>
              <Link to="/customer-login">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="w-full xs:w-auto text-xs border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]"
                  data-ocid="checkout-customer-login-link"
                >
                  Already registered
                </Button>
              </Link>
            </div>
          </div>
        )}

        {showRegisterPrompt && !isCustomerLoggedIn && (
          <div
            className="rounded-xl p-4 sm:p-5 space-y-4"
            style={{
              background: "rgba(212,175,55,0.04)",
              border: "1px solid rgba(212,175,55,0.18)",
            }}
            data-ocid="checkout-register-form"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground flex items-center gap-2">
                <UserPlus className="w-4 h-4" style={{ color: "#d4af37" }} />
                Save Purchases 👑
              </p>
              <button
                type="button"
                onClick={() => setShowRegisterPrompt(false)}
                className="p-1.5 rounded hover:bg-muted/50 transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="reg-email" className="text-xs">
                  Email Address
                </Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="you@example.com"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  className="h-11 text-sm"
                  data-ocid="reg-email-input"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="reg-pin" className="text-xs">
                    PIN (4–6 digits)
                  </Label>
                  <Input
                    id="reg-pin"
                    type="password"
                    inputMode="numeric"
                    placeholder="••••"
                    value={regPin}
                    onChange={(e) =>
                      setRegPin(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    maxLength={6}
                    className="h-11 text-sm font-mono"
                    data-ocid="reg-pin-input"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="reg-confirm" className="text-xs">
                    Confirm PIN
                  </Label>
                  <Input
                    id="reg-confirm"
                    type="password"
                    inputMode="numeric"
                    placeholder="••••"
                    value={regConfirmPin}
                    onChange={(e) =>
                      setRegConfirmPin(
                        e.target.value.replace(/\D/g, "").slice(0, 6),
                      )
                    }
                    maxLength={6}
                    className={`h-11 text-sm font-mono ${regConfirmPin.length > 0 && regPin !== regConfirmPin ? "border-destructive" : ""}`}
                    data-ocid="reg-confirm-input"
                  />
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                disabled={
                  isRegistering ||
                  !regEmail.includes("@") ||
                  regPin.length < 4 ||
                  regPin !== regConfirmPin
                }
                onClick={async () => {
                  setIsRegistering(true);
                  try {
                    const pinHash = await hashPin(regPin);
                    await customerSignup(regEmail.trim(), pinHash);
                    toast.success(
                      "Account created! Your purchases are saved. 👑",
                    );
                    setShowRegisterPrompt(false);
                  } catch (err) {
                    toast.error(
                      (err as Error).message || "Registration failed.",
                    );
                  } finally {
                    setIsRegistering(false);
                  }
                }}
                className="w-full gap-1.5 text-xs min-h-[44px]"
                style={{ background: "#d4af37", color: "#000" }}
                data-ocid="reg-submit-btn"
              >
                {isRegistering ? (
                  <span className="w-3.5 h-3.5 border border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <UserPlus className="w-3.5 h-3.5" />
                )}
                {isRegistering ? "Saving…" : "Save My Purchases"}
              </Button>
            </div>
          </div>
        )}

        {isCustomerLoggedIn && (
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              background: "rgba(52,211,153,0.05)",
              border: "1px solid rgba(52,211,153,0.2)",
            }}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <p className="text-xs text-muted-foreground">
              Signed in as{" "}
              <span className="text-foreground font-medium">
                {customerEmail}
              </span>
              . Purchases will be saved.
            </p>
          </div>
        )}

        {/* ── Single pay CTA ── */}
        <div
          className="rounded-xl p-5 sm:p-6 space-y-4"
          style={{
            background: "rgba(212,175,55,0.06)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
          data-ocid="checkout-pay-section"
        >
          <div className="text-center space-y-1">
            <p className="text-foreground font-semibold text-sm">
              Ready to complete your purchase?
            </p>
            <p className="text-muted-foreground text-xs">
              You'll be taken to a secure payment screen where you can pay with
              card, Apple Pay, Google Pay, or other methods. Your billing
              address and payment info are entered just once there.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => void processPayment()}
            disabled={isProcessing}
            className="w-full gap-2 font-bold text-base"
            style={{
              background: "linear-gradient(135deg, #d4af37, #f5c842)",
              color: "#000",
              minHeight: "56px",
            }}
            data-ocid="proceed-to-payment-btn"
          >
            <Lock className="w-5 h-5" />
            Complete Purchase — ${totalDollars}
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <Lock className="w-3 h-3" style={{ color: "#d4af37" }} />
            Secured by Chosen One Distribution • Platform Pay
          </div>
        </div>
      </div>
    </div>
  );
}
