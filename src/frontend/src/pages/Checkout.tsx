import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Crown,
  Lock,
  Music,
  ShoppingCart,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useCustomerAuth } from "../hooks/use-customer-auth";
import { hashPin } from "../hooks/use-customer-auth";
import { useCartStore } from "../store/cart";

const PAYMENT_METHODS = [
  { id: "apple-pay", label: "Apple Pay", icon: "🍎" },
  { id: "google-pay", label: "Google Pay", icon: "G" },
  { id: "paypal", label: "PayPal", icon: "P" },
  { id: "cashapp", label: "Cash App", icon: "$" },
  { id: "zelle", label: "Zelle", icon: "Z" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
] as const;

type PaymentMethod = (typeof PAYMENT_METHODS)[number]["id"];

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g) ?? [];
  return groups.join(" ");
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
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

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { isAuthenticated, sessionToken } = useAuth();
  const { isCustomerLoggedIn, customerToken, customerEmail, customerSignup } =
    useCustomerAuth();
  const { items: cartItems, clearCart, removeItem } = useCartStore();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [hasRemovedItem, setHasRemovedItem] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [showRegisterPrompt, setShowRegisterPrompt] = useState(false);
  const [regEmail, setRegEmail] = useState("");
  const [regPin, setRegPin] = useState("");
  const [regConfirmPin, setRegConfirmPin] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const totalCents = cartItems.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0,
  );
  const totalDollars = (totalCents / 100).toFixed(2);

  const handleRemoveItem = (trackId: bigint) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    removeItem(trackId);
    setHasRemovedItem(true);
    if (item) toast.success(`"${item.track.title}" removed from cart`);
  };

  useEffect(() => {
    if (hasRemovedItem && cartItems.length === 0) {
      toast.info("Your cart is empty. Returning to the store.");
      void navigate({ to: "/store" });
    }
  }, [hasRemovedItem, cartItems.length, navigate]);

  const handleAlternativePay = async (_method: PaymentMethod) => {
    if (!actor || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const origin = window.location.origin;
      const firstTrack = cartItems[0].track;
      const activeToken = customerToken ?? sessionToken ?? "";

      if (cartItems.length === 1) {
        const successUrl = `${origin}/store?purchase=success&trackId=${firstTrack.id}&session={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/checkout`;
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
        if (parsed.url) {
          clearCart();
          window.location.href = parsed.url;
        } else throw new Error(parsed.error ?? "No checkout URL returned");
      } else {
        const items = cartItems.map((item) => ({
          productName: item.track.title,
          currency: "usd",
          quantity: BigInt(1),
          priceInCents: item.track.priceInCents,
          productDescription: `${item.track.title} by ${item.track.artistName}`,
        }));
        const trackIds = cartItems.map((i) => i.track.id);
        const successUrl = `${origin}/store?purchase=success&trackIds=${trackIds.join(",")}&session={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/checkout`;
        const sessionUrl = await actor.createCheckoutSession(
          items,
          successUrl,
          cancelUrl,
        );
        const parsed = JSON.parse(sessionUrl) as {
          url?: string;
          error?: string;
        };
        if (parsed.url) {
          clearCart();
          window.location.href = parsed.url;
        } else throw new Error(parsed.error ?? "No checkout URL returned");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      toast.error(`Payment error: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardName.trim()) {
      toast.error("Please enter the cardholder name.");
      return;
    }
    const rawDigits = cardNumber.replace(/\s/g, "");
    if (rawDigits.length < 13) {
      toast.error("Please enter a valid card number.");
      return;
    }
    if (cardExpiry.length < 5) {
      toast.error("Please enter a valid expiry date.");
      return;
    }
    if (cardCvc.length < 3) {
      toast.error("Please enter a valid CVC.");
      return;
    }
    await handleAlternativePay("card");
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto" />
          <h2 className="font-display font-bold text-2xl text-foreground">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground text-sm">
            Add some tracks from the store before checking out.
          </p>
          <Link to="/store">
            <Button className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <Music className="w-4 h-4" />
              Browse Store
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background" data-ocid="checkout-page">
      {/* Sticky header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/store" })}
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px]"
            data-ocid="checkout-back-btn"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Store</span>
            <span className="sm:hidden">Back</span>
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
            <span className="font-display font-bold text-foreground text-xs sm:text-sm">
              Chosen One Distribution
            </span>
          </div>
          <Lock className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">
          Secure Checkout
        </h1>
        <p className="text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8">
          Your payment is secured by Stripe. All transactions are encrypted.
        </p>

        {/* Mobile: order summary appears first (above payment form) */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Left column — payment form */}
          <div className="lg:col-span-3 space-y-5 sm:space-y-6">
            {/* Payment method selector */}
            <div
              className="bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4"
              data-ocid="payment-method-selector"
            >
              <h2 className="font-display font-semibold text-foreground text-sm sm:text-base">
                Payment Method
              </h2>

              {/* Non-card methods — horizontally scrollable on mobile */}
              <div
                className="flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:gap-3 scrollbar-hide"
                style={{ WebkitOverflowScrolling: "touch" }}
              >
                {PAYMENT_METHODS.filter((m) => m.id !== "card").map(
                  (method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => {
                        setSelectedMethod(method.id);
                        handleAlternativePay(method.id);
                      }}
                      disabled={isProcessing}
                      className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-smooth text-xs sm:text-sm font-medium shrink-0 sm:shrink min-h-[44px] ${
                        selectedMethod === method.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-muted/50"
                      }`}
                      data-ocid={`payment-method-${method.id}`}
                    >
                      <span className="text-sm w-4 text-center shrink-0">
                        {method.icon}
                      </span>
                      <span className="whitespace-nowrap">{method.label}</span>
                    </button>
                  ),
                )}
              </div>

              <Separator />

              {/* Card toggle */}
              <button
                type="button"
                onClick={() => setSelectedMethod("card")}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg border transition-smooth text-sm font-medium min-h-[44px] ${
                  selectedMethod === "card"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted/30 text-foreground hover:border-primary/40"
                }`}
                data-ocid="payment-method-card-toggle"
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                Pay with Card (Visa, Mastercard, Amex)
              </button>

              {/* Card Entry Form */}
              {selectedMethod === "card" && (
                <form
                  onSubmit={handleCardSubmit}
                  className="space-y-4 pt-2"
                  data-ocid="card-entry-form"
                >
                  {/* Cardholder name — full-width */}
                  <div className="space-y-1.5">
                    <Label htmlFor="card-name" className="text-sm">
                      Cardholder Name
                    </Label>
                    <Input
                      id="card-name"
                      type="text"
                      placeholder="John Smith"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      autoComplete="cc-name"
                      className="bg-background border-border h-11 w-full"
                      data-ocid="card-name-input"
                    />
                  </div>

                  {/* Card number — full-width */}
                  <div className="space-y-1.5">
                    <Label htmlFor="card-number" className="text-sm">
                      Card Number
                    </Label>
                    <div className="relative">
                      <Input
                        id="card-number"
                        type="text"
                        inputMode="numeric"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) =>
                          setCardNumber(formatCardNumber(e.target.value))
                        }
                        autoComplete="cc-number"
                        maxLength={19}
                        className="bg-background border-border h-11 pr-10 font-mono w-full"
                        data-ocid="card-number-input"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    </div>
                  </div>

                  {/* Expiry + CVC — side-by-side even on mobile */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="card-expiry" className="text-sm">
                        Expiry
                      </Label>
                      <Input
                        id="card-expiry"
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) =>
                          setCardExpiry(formatExpiry(e.target.value))
                        }
                        autoComplete="cc-exp"
                        maxLength={5}
                        className="bg-background border-border h-11 font-mono"
                        data-ocid="card-expiry-input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="card-cvc" className="text-sm">
                        CVC
                      </Label>
                      <Input
                        id="card-cvc"
                        type="text"
                        inputMode="numeric"
                        placeholder="•••"
                        value={cardCvc}
                        onChange={(e) =>
                          setCardCvc(
                            e.target.value.replace(/\D/g, "").slice(0, 4),
                          )
                        }
                        autoComplete="cc-csc"
                        maxLength={4}
                        className="bg-background border-border h-11 font-mono"
                        data-ocid="card-cvc-input"
                      />
                    </div>
                  </div>

                  {/* Accepted cards */}
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1">
                    {["VISA", "MC", "AMEX", "DISC"].map((brand) => (
                      <span
                        key={brand}
                        className="text-xs font-bold px-2 py-0.5 bg-muted/60 border border-border rounded text-muted-foreground font-mono"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>

                  {/* Submit — full width */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full gap-2 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gold-glow"
                    data-ocid="card-pay-btn"
                  >
                    {isProcessing ? (
                      <>
                        <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Processing Payment…
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        Pay ${totalDollars} Securely
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Security note */}
            <div className="flex items-start gap-3 px-4 py-3 bg-muted/20 border border-border rounded-lg">
              <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground">
                Payments are processed securely via{" "}
                <span className="text-foreground font-medium">Stripe</span>.
                Your card details are never stored on our servers. PCI DSS
                compliant.
              </p>
            </div>

            {/* Customer Registration Prompt */}
            {!isCustomerLoggedIn && !isAuthenticated && !showRegisterPrompt && (
              <div
                className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 space-y-3"
                data-ocid="checkout-register-prompt"
              >
                <div className="flex items-center gap-2.5">
                  <UserPlus className="w-4 h-4 text-primary shrink-0" />
                  <p className="text-sm font-semibold text-foreground">
                    Save your purchases for re-download
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Register with an email and PIN to access your purchases
                  anytime within{" "}
                  <span className="text-primary font-semibold">30 days</span>.
                </p>
                <div className="flex flex-col xs:flex-row gap-2">
                  <Button
                    type="button"
                    size="sm"
                    className="flex-1 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs min-h-[44px]"
                    onClick={() => setShowRegisterPrompt(true)}
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

            {/* Registration form */}
            {!isCustomerLoggedIn && showRegisterPrompt && (
              <div
                className="bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 space-y-4"
                data-ocid="checkout-register-form"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4 text-primary" />
                    <p className="text-sm font-semibold text-foreground">
                      Save Purchases 👑
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowRegisterPrompt(false)}
                    className="p-1.5 rounded hover:bg-muted/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Close registration form"
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
                      className="h-11 text-sm bg-background border-border"
                      data-ocid="reg-email-input"
                    />
                  </div>
                  {/* PIN fields side-by-side on mobile too */}
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
                          setRegPin(
                            e.target.value.replace(/\D/g, "").slice(0, 6),
                          )
                        }
                        maxLength={6}
                        className="h-11 text-sm bg-background border-border font-mono"
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
                        className={`h-11 text-sm bg-background border-border font-mono ${
                          regConfirmPin.length > 0 && regPin !== regConfirmPin
                            ? "border-destructive"
                            : ""
                        }`}
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
                    className="w-full gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px]"
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
                        const error = err as Error;
                        toast.error(
                          error.message ||
                            "Registration failed. Please try again.",
                        );
                      } finally {
                        setIsRegistering(false);
                      }
                    }}
                    data-ocid="reg-submit-btn"
                  >
                    {isRegistering ? (
                      <span className="w-3.5 h-3.5 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    ) : (
                      <UserPlus className="w-3.5 h-3.5" />
                    )}
                    {isRegistering ? "Saving…" : "Save My Purchases"}
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    Or{" "}
                    <button
                      type="button"
                      onClick={() => setShowRegisterPrompt(false)}
                      className="text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      skip for now
                    </button>{" "}
                    (one-time download only)
                  </p>
                </div>
              </div>
            )}

            {/* Logged-in customer confirmation */}
            {isCustomerLoggedIn && (
              <div className="flex items-center gap-3 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <p className="text-xs text-muted-foreground">
                  Signed in as{" "}
                  <span className="text-foreground font-medium">
                    {customerEmail}
                  </span>
                  . Your purchases will be saved for re-download.
                </p>
              </div>
            )}
          </div>

          {/* Right column — order summary (appears on top on mobile, right on desktop) */}
          <div className="lg:col-span-2">
            <div
              className="bg-card border border-primary/20 rounded-xl overflow-hidden lg:sticky lg:top-24"
              data-ocid="order-summary"
            >
              <div className="px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center gap-2.5">
                <ShoppingCart className="w-4 h-4 text-primary" />
                <span className="font-display font-bold text-foreground text-sm uppercase tracking-wide">
                  Order Summary
                </span>
                <Badge
                  variant="secondary"
                  className="ml-auto text-xs border border-primary/30 text-primary"
                >
                  {cartItems.length} track{cartItems.length !== 1 ? "s" : ""}
                </Badge>
              </div>

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
                      <span className="text-primary font-bold text-sm shrink-0">
                        ${(Number(item.track.priceInCents) / 100).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item.track.id)}
                        className="flex items-center justify-center w-8 h-8 rounded-md border border-primary/25 text-primary hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors shrink-0 opacity-60 group-hover/orderitem:opacity-100 min-h-[32px] min-w-[32px]"
                        aria-label={`Remove "${item.track.title}" from order`}
                        data-ocid={`order-remove-${item.track.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="px-4 sm:px-5 py-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">${totalDollars}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Processing fee</span>
                  <span className="text-foreground">Included</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-bold text-foreground">Total</span>
                  <span className="text-xl sm:text-2xl font-bold text-primary font-display">
                    ${totalDollars}
                  </span>
                </div>
              </div>

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
          </div>
        </div>
      </div>
    </div>
  );
}
