import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, LogIn, ShoppingBag } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { hashPin, useCustomerAuth } from "../hooks/use-customer-auth";

export default function CustomerLogin() {
  const { isCustomerLoggedIn, customerLogin } = useCustomerAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isPending, setIsPending] = useState(false);

  if (isCustomerLoggedIn) {
    navigate({ to: "/store" });
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const emailTrimmed = email.trim();
    if (!emailTrimmed.includes("@") || !emailTrimmed.includes(".")) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      toast.error("PIN must be 4–6 digits.");
      return;
    }

    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await customerLogin(emailTrimmed, pinHash);
      toast.success("Welcome back! 👑 Your purchases are ready.");
      navigate({ to: "/store" });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in"
      data-ocid="customer-login-page"
    >
      <div className="w-full max-w-md">
        {/* Crown branding */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4">
            <ShoppingBag className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            My Purchases
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in to access and re-download your music
          </p>
        </div>

        {/* Login card */}
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="customer-login-email">Email Address</Label>
              <Input
                id="customer-login-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                disabled={isPending}
                data-ocid="customer-login-email-input"
              />
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <Label htmlFor="customer-login-pin">PIN Code</Label>
              <div className="relative">
                <Input
                  id="customer-login-pin"
                  type={showPin ? "text" : "password"}
                  inputMode="numeric"
                  placeholder="Enter your 4–6 digit PIN"
                  value={pin}
                  onChange={(e) => {
                    const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                    setPin(v);
                  }}
                  maxLength={6}
                  autoComplete="current-password"
                  disabled={isPending}
                  className="pr-10"
                  data-ocid="customer-login-pin-input"
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                isPending || !email.trim().includes("@") || pin.length < 4
              }
              className="w-full h-11 font-semibold gap-2"
              data-ocid="customer-login-submit-btn"
            >
              {isPending ? (
                <span className="animate-spin inline-block">⏳</span>
              ) : (
                <LogIn className="w-4 h-4" />
              )}
              {isPending ? "Signing in…" : "Sign In to My Purchases"}
            </Button>
          </form>

          {/* Note */}
          <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-xs text-muted-foreground text-center">
              New customer?{" "}
              <span className="text-primary font-medium">
                Register after purchase
              </span>{" "}
              to save your music for re-download within 30 days.
            </p>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-card px-3">Browse the store</span>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/store"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast"
              data-ocid="customer-login-store-link"
            >
              ← Back to Music Store
            </Link>
          </div>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          Are you an artist?{" "}
          <Link
            to="/login"
            className="text-primary hover:text-primary/80 font-medium transition-colors-fast"
          >
            Artist sign in →
          </Link>
        </p>
      </div>
    </div>
  );
}
