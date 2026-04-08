import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  LogIn,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { hashPin, useAuth } from "../hooks/use-auth";

// ─── Recovery flow steps ────────────────────────────────────────────────────
type RecoveryStep = "name" | "verify" | "success";

const MAX_ATTEMPTS = 3;

// ─── Component ───────────────────────────────────────────────────────────────
export default function Login() {
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();

  // --- Normal login state ---
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [isPending, setIsPending] = useState(false);

  // --- Recovery flow state ---
  const [mode, setMode] = useState<"login" | "recovery">("login");
  const [recoveryStep, setRecoveryStep] = useState<RecoveryStep>("name");
  const [recoveryName, setRecoveryName] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [newRecoveryPin, setNewRecoveryPin] = useState("");
  const [showNewPin, setShowNewPin] = useState(false);
  const [confirmRecoveryPin, setConfirmRecoveryPin] = useState("");
  const [showConfirmPin, setShowConfirmPin] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");
  const [recoveryPending, setRecoveryPending] = useState(false);

  // Already logged in → redirect to dashboard
  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Normal login submit
  // ──────────────────────────────────────────────────────────────────────────
  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      toast.error("Artist name must be at least 2 characters.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      toast.error("PIN must be 4–6 digits.");
      return;
    }
    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await login(name.trim(), pinHash);
      toast.success(`Welcome back, ${name.trim()}! 👑`);
      navigate({ to: "/dashboard" });
    } catch (err: unknown) {
      const error = err as Error;
      toast.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Recovery: Step 1 — look up security question by name
  // ──────────────────────────────────────────────────────────────────────────
  const handleRecoveryNameSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Backend not available. Please try again.");
      return;
    }
    if (recoveryName.trim().length < 2) {
      setRecoveryError("Please enter your artist name.");
      return;
    }
    setRecoveryError("");
    setRecoveryPending(true);
    try {
      const question = await actor.getArtistSecurityQuestion(
        recoveryName.trim(),
      );
      if (question === null || question === undefined) {
        setRecoveryError(
          "No security question on file — please contact the admin to reset your PIN.",
        );
        return;
      }
      setSecurityQuestion(question);
      setRecoveryStep("verify");
    } catch {
      setRecoveryError("Could not look up account. Please try again.");
    } finally {
      setRecoveryPending(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Recovery: Step 2 — verify answer + set new PIN
  // ──────────────────────────────────────────────────────────────────────────
  const handleRecoveryVerifySubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Backend not available. Please try again.");
      return;
    }
    if (securityAnswer.trim() === "") {
      setRecoveryError("Please enter your answer.");
      return;
    }
    if (!/^\d{4,6}$/.test(newRecoveryPin)) {
      setRecoveryError("New PIN must be 4–6 digits.");
      return;
    }
    if (newRecoveryPin !== confirmRecoveryPin) {
      setRecoveryError("PINs do not match. Please try again.");
      return;
    }

    setRecoveryError("");
    setRecoveryPending(true);
    try {
      const answerHash = await hashPin(securityAnswer.toLowerCase().trim());
      const newPinHash = await hashPin(newRecoveryPin);
      const result = await actor.resetPINWithSecurityAnswer(
        recoveryName.trim(),
        answerHash,
        newPinHash,
      );
      if (result.__kind__ === "ok") {
        setRecoveryStep("success");
      } else {
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        if (remaining <= 0) {
          setIsRateLimited(true);
          setRecoveryError(
            "Too many attempts. Please wait 15 minutes before trying again.",
          );
        } else {
          setRecoveryError(
            `Incorrect answer. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
          );
        }
      }
    } catch {
      setRecoveryError("Something went wrong. Please try again.");
    } finally {
      setRecoveryPending(false);
    }
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Helpers
  // ──────────────────────────────────────────────────────────────────────────
  const resetRecovery = () => {
    setMode("login");
    setRecoveryStep("name");
    setRecoveryName("");
    setSecurityQuestion("");
    setSecurityAnswer("");
    setNewRecoveryPin("");
    setConfirmRecoveryPin("");
    setAttemptsLeft(MAX_ATTEMPTS);
    setIsRateLimited(false);
    setRecoveryError("");
  };

  const enterRecovery = () => {
    setMode("recovery");
    setRecoveryStep("name");
    setRecoveryError("");
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Render helpers
  // ──────────────────────────────────────────────────────────────────────────
  const renderRecoveryContent = () => {
    // Success
    if (recoveryStep === "success") {
      return (
        <div
          className="flex flex-col items-center text-center gap-5 py-4"
          data-ocid="recovery-success"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 gold-glow">
            <CheckCircle2 className="w-7 h-7 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">
              PIN Updated!
            </h3>
            <p className="text-sm text-muted-foreground">
              You can now sign in with your new PIN.
            </p>
          </div>
          <Button
            className="w-full h-11 font-semibold gap-2"
            onClick={resetRecovery}
            data-ocid="recovery-back-signin-btn"
          >
            <LogIn className="w-4 h-4" />
            Back to Sign In
          </Button>
        </div>
      );
    }

    // Step 1 — enter name
    if (recoveryStep === "name") {
      return (
        <form
          onSubmit={handleRecoveryNameSubmit}
          className="space-y-5"
          data-ocid="recovery-step-name"
        >
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Enter your artist name and we'll look up your security question.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="recovery-name">Artist Name</Label>
            <Input
              id="recovery-name"
              type="text"
              placeholder="Your artist / stage name"
              value={recoveryName}
              onChange={(e) => {
                setRecoveryName(e.target.value);
                setRecoveryError("");
              }}
              autoFocus
              disabled={recoveryPending}
              data-ocid="recovery-name-input"
            />
          </div>

          {recoveryError && (
            <div
              className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 rounded-md px-3 py-2"
              data-ocid="recovery-error"
            >
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{recoveryError}</span>
            </div>
          )}

          <Button
            type="submit"
            disabled={recoveryPending || recoveryName.trim().length < 2}
            className="w-full h-11 font-semibold"
            data-ocid="recovery-name-next-btn"
          >
            {recoveryPending ? (
              <span className="animate-spin inline-block">⏳</span>
            ) : null}
            {recoveryPending ? "Looking up…" : "Next →"}
          </Button>
        </form>
      );
    }

    // Step 2 — answer question + new PIN
    return (
      <form
        onSubmit={handleRecoveryVerifySubmit}
        className="space-y-5"
        data-ocid="recovery-step-verify"
      >
        {/* Security question */}
        <div className="rounded-md border border-primary/30 bg-primary/5 px-4 py-3">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium">
            Security Question
          </p>
          <p className="text-sm text-foreground font-medium">
            {securityQuestion}
          </p>
        </div>

        {/* Answer */}
        <div className="space-y-2">
          <Label htmlFor="recovery-answer">Your Answer</Label>
          <Input
            id="recovery-answer"
            type="text"
            placeholder="Type your answer"
            value={securityAnswer}
            onChange={(e) => {
              setSecurityAnswer(e.target.value);
              setRecoveryError("");
            }}
            autoFocus
            disabled={recoveryPending || isRateLimited}
            data-ocid="recovery-answer-input"
          />
        </div>

        {/* New PIN */}
        <div className="space-y-2">
          <Label htmlFor="recovery-new-pin">New PIN (4–6 digits)</Label>
          <div className="relative">
            <Input
              id="recovery-new-pin"
              type={showNewPin ? "text" : "password"}
              inputMode="numeric"
              placeholder="Choose a new PIN"
              value={newRecoveryPin}
              onChange={(e) => {
                setNewRecoveryPin(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                );
                setRecoveryError("");
              }}
              maxLength={6}
              disabled={recoveryPending || isRateLimited}
              className="pr-10"
              data-ocid="recovery-new-pin-input"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setShowNewPin((v) => !v)}
              aria-label={showNewPin ? "Hide PIN" : "Show PIN"}
              tabIndex={-1}
            >
              {showNewPin ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm PIN */}
        <div className="space-y-2">
          <Label htmlFor="recovery-confirm-pin">Confirm New PIN</Label>
          <div className="relative">
            <Input
              id="recovery-confirm-pin"
              type={showConfirmPin ? "text" : "password"}
              inputMode="numeric"
              placeholder="Re-enter your new PIN"
              value={confirmRecoveryPin}
              onChange={(e) => {
                setConfirmRecoveryPin(
                  e.target.value.replace(/\D/g, "").slice(0, 6),
                );
                setRecoveryError("");
              }}
              maxLength={6}
              disabled={recoveryPending || isRateLimited}
              className="pr-10"
              data-ocid="recovery-confirm-pin-input"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              onClick={() => setShowConfirmPin((v) => !v)}
              aria-label={showConfirmPin ? "Hide PIN" : "Show PIN"}
              tabIndex={-1}
            >
              {showConfirmPin ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Error / rate-limit */}
        {recoveryError && (
          <div
            className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 rounded-md px-3 py-2"
            data-ocid="recovery-error"
          >
            <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
            <span>{recoveryError}</span>
          </div>
        )}

        <Button
          type="submit"
          disabled={
            recoveryPending ||
            isRateLimited ||
            securityAnswer.trim() === "" ||
            newRecoveryPin.length < 4 ||
            confirmRecoveryPin.length < 4
          }
          className="w-full h-11 font-semibold gap-2"
          data-ocid="recovery-verify-btn"
        >
          {recoveryPending ? (
            <span className="animate-spin inline-block">⏳</span>
          ) : (
            <KeyRound className="w-4 h-4" />
          )}
          {recoveryPending ? "Verifying…" : "Reset PIN"}
        </Button>
      </form>
    );
  };

  // ──────────────────────────────────────────────────────────────────────────
  // Main render
  // ──────────────────────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in"
      data-ocid="login-page"
    >
      <div className="w-full max-w-md">
        {/* Crown branding */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4">
            <span className="text-2xl sm:text-3xl">👑</span>
          </div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-2">
            {mode === "recovery" ? "Recover PIN" : "Welcome Back"}
          </h1>
          <p className="text-muted-foreground text-sm">
            {mode === "recovery"
              ? "Answer your security question to reset your PIN"
              : "Sign in to your Chosen One Productions account"}
          </p>
        </div>

        {/* Card */}
        <div className="card-elevated p-6 sm:p-8 space-y-6">
          {mode === "login" ? (
            <>
              {/* ── Login form ─────────────────────────────────────────── */}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="login-name">Artist Name</Label>
                  <Input
                    id="login-name"
                    type="text"
                    placeholder="Your artist / stage name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="username"
                    autoFocus
                    disabled={isPending}
                    data-ocid="login-name-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-pin">PIN Code</Label>
                  <div className="relative">
                    <Input
                      id="login-pin"
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
                      data-ocid="login-pin-input"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
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

                <Button
                  type="submit"
                  disabled={isPending || !name.trim() || pin.length < 4}
                  className="w-full h-11 font-semibold gap-2"
                  data-ocid="login-submit-btn"
                >
                  {isPending ? (
                    <span className="animate-spin inline-block">⏳</span>
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  {isPending ? "Signing in…" : "Sign In"}
                </Button>
              </form>

              {/* Forgot PIN link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={enterRecovery}
                  className="text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-2"
                  data-ocid="forgot-pin-link"
                >
                  Forgot PIN?
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs text-muted-foreground">
                  <span className="bg-card px-3">New to Chosen One?</span>
                </div>
              </div>

              {/* Sign up link */}
              <div className="text-center">
                <Link
                  to="/signup"
                  className="text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200"
                  data-ocid="login-signup-link"
                >
                  Create your artist account →
                </Link>
              </div>
            </>
          ) : (
            <>
              {/* ── Recovery flow ──────────────────────────────────────── */}
              {/* Step indicator */}
              {recoveryStep !== "success" && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                  <span
                    className={
                      recoveryStep === "name"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    1. Name
                  </span>
                  <span className="text-border">→</span>
                  <span
                    className={
                      recoveryStep === "verify"
                        ? "text-primary font-semibold"
                        : "text-muted-foreground"
                    }
                  >
                    2. Verify & Reset
                  </span>
                  <span className="text-border">→</span>
                  <span className="text-muted-foreground">3. Done</span>
                </div>
              )}

              {renderRecoveryContent()}

              {/* Always-visible back link during recovery (not on success) */}
              {recoveryStep !== "success" && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={resetRecovery}
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-200"
                    data-ocid="recovery-back-login-link"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Sign In
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Back to home */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          <Link
            to="/"
            className="hover:text-foreground transition-colors duration-200"
          >
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
