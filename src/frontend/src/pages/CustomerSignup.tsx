import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, ShoppingBag, UserPlus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { hashPin, useCustomerAuth } from "../hooks/use-customer-auth";

export default function CustomerSignup() {
  const { isCustomerLoggedIn, customerSignup } = useCustomerAuth();
  const navigate = useNavigate();
  // Optional: ?redirect=store to go back after signup
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  if (isCustomerLoggedIn) {
    navigate({ to: "/store" });
    return null;
  }

  const pinMismatch = confirmPin.length > 0 && pin !== confirmPin;
  const emailValid = email.trim().includes("@") && email.trim().includes(".");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!emailValid) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      toast.error("PIN must be 4–6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      toast.error("PINs do not match.");
      return;
    }

    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await customerSignup(email.trim(), pinHash);
      toast.success(
        "Account created! 👑 You can now re-download your music anytime.",
      );
      navigate({ to: "/store" });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in"
      data-ocid="customer-signup-page"
    >
      <div className="w-full max-w-md">
        {/* Crown branding */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4">
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Save Your Purchases
          </h1>
          <p className="text-muted-foreground text-sm">
            Register with email + PIN to re-download your music within 30 days
          </p>
        </div>

        {/* Signup card */}
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="customer-signup-email">Email Address</Label>
              <Input
                id="customer-signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                disabled={isPending}
                data-ocid="customer-signup-email-input"
              />
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <Label htmlFor="customer-signup-pin">
                Create PIN (4–6 digits)
              </Label>
              <div className="relative">
                <Input
                  id="customer-signup-pin"
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  placeholder="Choose a 4–6 digit PIN"
                  value={pin}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setPin(v);
                  }}
                  maxLength={6}
                  autoComplete="new-password"
                  disabled={isPending}
                  className="pr-10"
                  data-ocid="customer-signup-pin-input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors-fast"
                  onClick={() => setShowPin((v) => !v)}
                  aria-label={showPin ? "Hide PIN" : "Show PIN"}
                  tabIndex={-1}
                >
                  {showPin ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm PIN */}
            <div className="space-y-2">
              <Label htmlFor="customer-signup-confirm">Confirm PIN</Label>
              <div className="relative">
                <Input
                  id="customer-signup-confirm"
                  type={showConfirm ? "text" : "password"}
                  inputMode="numeric"
                  placeholder="Re-enter your PIN"
                  value={confirmPin}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setConfirmPin(v);
                  }}
                  maxLength={6}
                  autoComplete="new-password"
                  disabled={isPending}
                  className={`pr-10 ${pinMismatch ? "border-destructive focus-visible:ring-destructive" : ""}`}
                  data-ocid="customer-signup-confirm-input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors-fast"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide PIN" : "Show PIN"}
                  tabIndex={-1}
                >
                  {showConfirm ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {pinMismatch && (
                <p className="text-xs text-destructive">PINs do not match</p>
              )}
            </div>

            {/* Info box */}
            <div className="flex items-start gap-3 p-3 rounded-md bg-primary/10 border border-primary/20">
              <span className="text-primary text-lg leading-none">👑</span>
              <p className="text-xs text-muted-foreground">
                Your email and PIN let you sign back in to re-download purchased
                tracks for up to{" "}
                <span className="text-primary font-semibold">30 days</span>{" "}
                after purchase.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                isPending || !emailValid || pin.length < 4 || pin !== confirmPin
              }
              className="w-full h-11 font-semibold gap-2"
              data-ocid="customer-signup-submit-btn"
            >
              {isPending ? (
                <span className="animate-spin inline-block">⏳</span>
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {isPending ? "Creating account…" : "Save My Purchases"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-card px-3">Already registered?</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/customer-login"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast"
              data-ocid="customer-signup-login-link"
            >
              Sign in to My Purchases →
            </Link>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          <Link
            to="/store"
            className="hover:text-foreground transition-colors-fast"
          >
            ← Back to Music Store
          </Link>
        </p>
      </div>
    </div>
  );
}
