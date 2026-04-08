import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { hashPin, useAuth } from "../hooks/use-auth";
import { useAppStore } from "../store";

export default function Signup() {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();
  const { showCrownBanner } = useAppStore();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // Already logged in → redirect to dashboard
  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  const pinMismatch = confirmPin.length > 0 && pin !== confirmPin;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (name.trim().length < 2) {
      toast.error("Artist name must be at least 2 characters.");
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
      await signup(name.trim(), pinHash);
      toast.success(`Account created! Welcome, ${name.trim()} 👑`);
      showCrownBanner(`Welcome to Chosen One 👑 ${name.trim()}`);
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in"
      data-ocid="signup-page"
    >
      <div className="w-full max-w-md">
        {/* Crown branding */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl">👑</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            Join Chosen One
          </h1>
          <p className="text-muted-foreground text-sm">
            Create your artist account and start distributing music
          </p>
        </div>

        {/* Signup card */}
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Artist Name */}
            <div className="space-y-2">
              <Label htmlFor="signup-name">Artist / Stage Name</Label>
              <Input
                id="signup-name"
                type="text"
                placeholder="e.g. DJ Chosen One"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="username"
                autoFocus
                disabled={isPending}
                data-ocid="signup-name-input"
              />
              {name.trim().length > 0 && name.trim().length < 2 && (
                <p className="text-xs text-destructive">
                  Name must be at least 2 characters
                </p>
              )}
            </div>

            {/* PIN */}
            <div className="space-y-2">
              <Label htmlFor="signup-pin">Create PIN (4–6 digits)</Label>
              <div className="relative">
                <Input
                  id="signup-pin"
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
                  data-ocid="signup-pin-input"
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
              <Label htmlFor="signup-confirm-pin">Confirm PIN</Label>
              <div className="relative">
                <Input
                  id="signup-confirm-pin"
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
                  data-ocid="signup-confirm-pin-input"
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

            {/* Artist receives info */}
            <div className="flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20">
              <span className="text-primary text-sm font-semibold">85%</span>
              <p className="text-xs text-muted-foreground">
                of every sale goes directly to you as the artist
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={
                isPending ||
                name.trim().length < 2 ||
                pin.length < 4 ||
                pin !== confirmPin
              }
              className="w-full h-11 font-semibold gap-2"
              data-ocid="signup-submit-btn"
            >
              {isPending ? (
                <span className="animate-spin inline-block">⏳</span>
              ) : (
                <UserPlus className="w-4 h-4" />
              )}
              {isPending ? "Creating account…" : "Create Account"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs text-muted-foreground">
              <span className="bg-card px-3">Already have an account?</span>
            </div>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast"
              data-ocid="signup-login-link"
            >
              Sign in instead →
            </Link>
          </div>
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors-fast">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
