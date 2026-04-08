import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  AlertTriangle,
  BarChart2,
  CheckCircle2,
  CreditCard,
  DollarSign,
  Eye,
  KeyRound,
  Lock,
  Music,
  RefreshCw,
  Settings,
  Shield,
  ShoppingBag,
  Trash2,
  TrendingUp,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createActor } from "../backend";
import { ArtistStatus } from "../backend";
import type {
  AdminTrafficStats,
  ArtistAdminView,
  TrackMetadataPublic,
} from "../backend";
import { hashPin } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";

const ADMIN_TOKEN_KEY = "admin-token";

function formatDate(ts: bigint): string {
  const ms = Number(ts) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatLastLogin(ts: bigint | null | undefined): string {
  if (ts == null) return "Never";
  const ms = Number(ts) / 1_000_000;
  const now = Date.now();
  const diffMs = now - ms;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHr = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHr / 24);

  if (diffSec < 60) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr} hour${diffHr === 1 ? "" : "s"} ago`;
  if (diffDay === 1) return "Yesterday";
  if (diffDay < 7) return `${diffDay} days ago`;

  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

// ─── Real-Time Traffic Panel ──────────────────────────────────────────────────

interface TrafficPanelProps {
  actor: ReturnType<typeof createActor> | null;
  adminToken: string;
}

function TrafficPanel({ actor, adminToken }: TrafficPanelProps) {
  const {
    data: trafficStats,
    dataUpdatedAt,
    isLoading: trafficLoading,
    refetch,
  } = useQuery<AdminTrafficStats | null>({
    queryKey: ["admin-traffic-stats", adminToken],
    queryFn: async () => {
      if (!actor || !adminToken) return null;
      const result = await actor.getAdminTrafficStats(adminToken);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !!adminToken,
    refetchInterval: 10_000,
  });

  const { data: tracks = [] } = useQuery<TrackMetadataPublic[]>({
    queryKey: ["admin-traffic-tracks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedTracks();
    },
    enabled: !!actor,
    refetchInterval: 30_000,
  });

  const topTracks = [...tracks]
    .sort((a, b) => Number(b.saleCount) - Number(a.saleCount))
    .slice(0, 5);

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString()
    : "—";

  const grossRevenueCents = trafficStats
    ? Number(trafficStats.grossRevenueCents)
    : 0;

  const statCards = [
    {
      label: "Active Visitors",
      value: trafficStats
        ? Number(trafficStats.activeVisitors).toLocaleString()
        : "—",
      icon: Eye,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      pulse: true,
    },
    {
      label: "Page Views (5 min)",
      value: trafficStats
        ? Number(trafficStats.pageViewsLast5Min).toLocaleString()
        : "—",
      icon: Activity,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
      pulse: false,
    },
    {
      label: "Previews Played Today",
      value: trafficStats
        ? Number(trafficStats.totalPreviewsAllTime).toLocaleString()
        : "—",
      icon: BarChart2,
      color: "text-sky-300",
      bg: "bg-sky-500/10 border-sky-400/20",
      pulse: false,
    },
    {
      label: "Purchases (24h)",
      value: trafficStats
        ? Number(trafficStats.recentPurchases).toLocaleString()
        : "—",
      icon: ShoppingBag,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      pulse: false,
    },
    {
      label: "New Sign-ups (24h)",
      value: trafficStats
        ? Number(trafficStats.recentSignups).toLocaleString()
        : "—",
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
      pulse: false,
    },
    {
      label: "Published Tracks",
      value: trafficStats
        ? Number(trafficStats.totalPublishedTracks).toLocaleString()
        : "—",
      icon: Music,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      pulse: false,
    },
    {
      label: "Total Sales",
      value: trafficStats
        ? Number(trafficStats.totalSalesAllTime).toLocaleString()
        : "—",
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      pulse: false,
    },
    {
      label: "Gross Revenue",
      value: `$${(grossRevenueCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      pulse: false,
    },
    {
      label: "Artist Payouts (85%)",
      value: `$${((grossRevenueCents * 0.85) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: BarChart2,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
      pulse: false,
    },
  ];

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-ocid="admin-traffic-panel"
    >
      <div className="px-4 sm:px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Activity className="w-5 h-5 text-primary shrink-0" />
          <h2 className="font-display font-bold text-foreground">
            Real-Time Platform Traffic
          </h2>
          <span className="flex items-center gap-1.5 ml-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs text-red-400 font-semibold">LIVE</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground hidden sm:block">
            {trafficLoading ? "Refreshing..." : `Updated: ${lastUpdated}`}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={trafficLoading}
            className="gap-1.5 h-7 text-xs"
            data-ocid="traffic-refresh-btn"
          >
            <RefreshCw
              className={`w-3 h-3 ${trafficLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </Button>
        </div>
      </div>

      <div className="p-4 sm:p-6 space-y-6">
        {/* Stat grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {statCards.map(({ label, value, icon: Icon, color, bg, pulse }) => (
            <div
              key={label}
              className={`rounded-xl border p-3 sm:p-4 ${bg}`}
              data-ocid={`traffic-stat-${label.toLowerCase().replace(/[\s()/%]/g, "-")}`}
            >
              <div className="flex items-center gap-2 mb-2 sm:mb-3">
                <div className={`relative ${pulse ? "shrink-0" : ""}`}>
                  <Icon className={`w-4 h-4 ${color}`} />
                  {pulse && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  )}
                </div>
                <span className="text-xs text-muted-foreground font-medium truncate">
                  {label}
                </span>
              </div>
              <p
                className={`text-xl sm:text-2xl font-bold font-display ${color} tabular-nums`}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Page views by section */}
        {trafficStats && trafficStats.pageViewsBySection.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" />
              Page Views by Section (Last 5 min)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {trafficStats.pageViewsBySection.map(([section, count]) => (
                <div
                  key={section}
                  className="flex items-center justify-between bg-muted/30 border border-border rounded-lg px-3 py-2"
                  data-ocid={`traffic-section-${section.toLowerCase()}`}
                >
                  <span className="text-xs font-medium text-foreground capitalize truncate">
                    {section}
                  </span>
                  <span className="text-xs font-bold text-primary tabular-nums ml-2 shrink-0">
                    {Number(count).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top tracks */}
        {topTracks.length > 0 && (
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Top Selling Tracks
            </h3>
            <div className="space-y-2">
              {topTracks.map((track, idx) => (
                <div
                  key={String(track.id)}
                  className="flex items-center gap-3 bg-muted/30 border border-border rounded-lg px-3 sm:px-4 py-2.5"
                  data-ocid={`traffic-top-track-${track.id}`}
                >
                  <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 text-center">
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {track.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {track.artistName} · {track.genre}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3 shrink-0 text-xs text-muted-foreground">
                    <span className="hidden sm:flex items-center gap-1">
                      <ShoppingBag className="w-3 h-3 text-emerald-400" />
                      {Number(track.saleCount).toLocaleString()}
                    </span>
                    <span className="text-primary font-semibold">
                      ${(Number(track.priceInCents) / 100).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Stripe Config Panel ──────────────────────────────────────────────────────

interface StripeConfigPanelProps {
  actor: ReturnType<typeof createActor> | null;
  adminToken: string;
}

function StripeConfigPanel({ actor, adminToken }: StripeConfigPanelProps) {
  const [secretKey, setSecretKey] = useState("");
  const [allowedCountries, setAllowedCountries] = useState(
    "US,CA,GB,AU,DE,FR,JP,BR,MX",
  );
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  const { data: isConfigured, refetch: refetchConfigured } = useQuery<boolean>({
    queryKey: ["stripe-is-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !adminToken) return;
    if (!secretKey.trim()) {
      setErrorMsg("Secret key is required.");
      setSaveStatus("error");
      return;
    }
    setIsSaving(true);
    setSaveStatus("idle");
    setErrorMsg("");
    try {
      const countries = allowedCountries
        .split(",")
        .map((c) => c.trim().toUpperCase())
        .filter(Boolean);
      await actor.setStripeConfiguration({
        secretKey: secretKey.trim(),
        allowedCountries: countries,
      });
      setSaveStatus("success");
      setSecretKey("");
      toast.success(
        "Stripe configuration saved! Live payments are now active. 💳",
      );
      await refetchConfigured();
    } catch {
      setErrorMsg("Failed to save Stripe configuration. Please try again.");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div
      className="bg-card border border-border rounded-2xl overflow-hidden"
      data-ocid="admin-stripe-config-panel"
    >
      <div className="px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="font-display font-bold text-foreground">
            Stripe Payment Configuration
          </h2>
        </div>
        <div className="flex items-center gap-2">
          {isConfigured ? (
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Live Payments Active</span>
              <span className="sm:hidden">Active</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-yellow-400 font-semibold">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Not Configured</span>
            </span>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
          Configure your live Stripe secret key to enable real payments (Apple
          Pay, Google Pay, PayPal, CashApp, Zelle, and card). Use your{" "}
          <strong className="text-foreground">live</strong> key starting with{" "}
          <code className="bg-muted/40 px-1 rounded text-xs">sk_live_</code>.
          Changes take effect immediately.
        </p>

        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label
              htmlFor="stripe-secret-key"
              className="text-sm font-medium text-foreground block mb-2"
            >
              Stripe Secret Key <span className="text-destructive">*</span>
            </label>
            <Input
              id="stripe-secret-key"
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              placeholder="sk_live_..."
              className="bg-secondary border-border font-mono text-sm"
              data-ocid="stripe-secret-key-input"
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              Your Stripe secret key from the Stripe Dashboard → Developers →
              API Keys
            </p>
          </div>

          <div>
            <label
              htmlFor="stripe-countries"
              className="text-sm font-medium text-foreground block mb-2"
            >
              Allowed Countries (comma-separated ISO codes)
            </label>
            <Input
              id="stripe-countries"
              type="text"
              value={allowedCountries}
              onChange={(e) => setAllowedCountries(e.target.value)}
              placeholder="US,CA,GB,AU,..."
              className="bg-secondary border-border font-mono text-sm"
              data-ocid="stripe-countries-input"
            />
            <p className="text-xs text-muted-foreground mt-1.5">
              2-letter country codes for which payment methods are enabled.
            </p>
          </div>

          {saveStatus === "error" && errorMsg && (
            <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              {errorMsg}
            </div>
          )}

          {saveStatus === "success" && (
            <div className="flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              Stripe configuration saved. Live payments are active.
            </div>
          )}

          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              disabled={isSaving || !secretKey.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold w-full sm:w-auto"
              data-ocid="stripe-config-save-btn"
            >
              <CreditCard className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Stripe Configuration"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Page ───────────────────────────────────────────────────────────────

type LoginMode = "login" | "set-pin";

export default function AdminPage() {
  const { t } = useTranslation();
  const { actor } = useActor(createActor);

  const [adminToken, setAdminToken] = useState<string | null>(() =>
    sessionStorage.getItem(ADMIN_TOKEN_KEY),
  );

  // Login form state
  const [loginMode, setLoginMode] = useState<LoginMode>("login");
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Set initial PIN state
  const [newSetPin, setNewSetPin] = useState("");
  const [confirmSetPin, setConfirmSetPin] = useState("");
  const [showSetPin, setShowSetPin] = useState(false);
  const [showConfirmSetPin, setShowConfirmSetPin] = useState(false);
  const [setInitialPinError, setSetInitialPinError] = useState("");
  const [isSettingPin, setIsSettingPin] = useState(false);

  // Dashboard state
  const [artists, setArtists] = useState<ArtistAdminView[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [currentPIN, setCurrentPIN] = useState("");
  const [newPIN, setNewPIN] = useState("");
  const [confirmPIN, setConfirmPIN] = useState("");
  const [changePINError, setChangePINError] = useState("");
  const [isChangingPIN, setIsChangingPIN] = useState(false);

  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [resetPinArtistId, setResetPinArtistId] = useState<string | null>(null);
  const [newArtistPIN, setNewArtistPIN] = useState("");
  const [resetPinError, setResetPinError] = useState("");
  const [isResettingPIN, setIsResettingPIN] = useState(false);

  const refreshIntervalRef = useRef<ReturnType<typeof setInterval> | null>(
    null,
  );

  const fetchArtists = useCallback(async () => {
    if (!actor || !adminToken) return;
    setIsLoading(true);
    try {
      const result = await actor.adminListArtists(adminToken);
      if (result.__kind__ === "ok") {
        setArtists(result.ok);
      } else {
        toast.error(result.err || "Failed to load artists");
        if (
          result.err?.toLowerCase().includes("session") ||
          result.err?.toLowerCase().includes("auth")
        ) {
          setAdminToken(null);
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      }
    } catch {
      toast.error("Failed to load artists");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);

  useEffect(() => {
    if (adminToken) {
      fetchArtists();
      refreshIntervalRef.current = setInterval(fetchArtists, 30_000);
    }
    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, [adminToken, fetchArtists]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor || !pin.trim()) return;
    setIsLoggingIn(true);
    setLoginError("");
    try {
      const pinHash = await hashPin(pin.trim());
      const result = await actor.adminLogin(pinHash);
      if (result.__kind__ === "ok") {
        sessionStorage.setItem(ADMIN_TOKEN_KEY, result.ok);
        setAdminToken(result.ok);
        setPin("");
        toast.success("Welcome, Admin 👑");
      } else {
        setLoginError(result.err || "Invalid admin PIN");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Set initial admin PIN (first-time setup using empty current hash as default)
  // Call adminInitializePIN via raw actor — function is deployed on the canister
  // but may not yet be in the generated bindings DID file.
  const callAdminInitializePIN = async (
    newPinHash: string,
  ): Promise<
    { __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }
  > => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rawActor = actor as any;
    if (typeof rawActor?.adminInitializePIN === "function") {
      const result = await rawActor.adminInitializePIN(newPinHash);
      // Normalize candid variant shape
      if (result && typeof result === "object") {
        if ("ok" in result) return { __kind__: "ok", ok: null };
        if ("err" in result)
          return { __kind__: "err", err: String(result.err) };
      }
    }
    return { __kind__: "err", err: "adminInitializePIN not available" };
  };

  const handleSetInitialPIN = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    setSetInitialPinError("");

    if (!/^\d{4,6}$/.test(newSetPin)) {
      setSetInitialPinError("PIN must be 4–6 digits (numbers only).");
      return;
    }
    if (newSetPin !== confirmSetPin) {
      setSetInitialPinError("PINs do not match. Please try again.");
      return;
    }

    setIsSettingPin(true);
    try {
      const newPinHash = await hashPin(newSetPin);
      const defaultPinHash = await hashPin("000000");

      // Path A: try logging in with the factory default (000000) first
      const loginResult = await actor.adminLogin(defaultPinHash);
      if (loginResult.__kind__ === "ok") {
        const tempToken = loginResult.ok;
        // Default login worked — change from default to new PIN
        const changeResult = await actor.adminChangePIN(
          tempToken,
          defaultPinHash,
          newPinHash,
        );
        try {
          await actor.adminLogout(tempToken);
        } catch {
          /* ignore */
        }
        if (changeResult.__kind__ === "ok") {
          // Auto sign in with the new PIN
          const finalLogin = await actor.adminLogin(newPinHash);
          if (finalLogin.__kind__ === "ok") {
            sessionStorage.setItem(ADMIN_TOKEN_KEY, finalLogin.ok);
            setAdminToken(finalLogin.ok);
          }
          toast.success(
            "Admin PIN set to 8914! 👑 Welcome to the control panel.",
          );
          setNewSetPin("");
          setConfirmSetPin("");
          setSetInitialPinError("");
          return;
        }
        setSetInitialPinError(
          changeResult.err ||
            "Could not set PIN. If you already have a PIN, use the Sign In tab.",
        );
        return;
      }

      // Path B: default login rejected — try adminInitializePIN directly
      // (works when pinHash is empty or equals SHA-256('000000') on the backend)
      const initResult = await callAdminInitializePIN(newPinHash);
      if (initResult.__kind__ === "ok") {
        // PIN was set — auto sign in with the new PIN
        const finalLogin = await actor.adminLogin(newPinHash);
        if (finalLogin.__kind__ === "ok") {
          sessionStorage.setItem(ADMIN_TOKEN_KEY, finalLogin.ok);
          setAdminToken(finalLogin.ok);
          toast.success("Admin PIN set! 👑 Welcome to the control panel.");
          setNewSetPin("");
          setConfirmSetPin("");
          setSetInitialPinError("");
          return;
        }
        // PIN set but auto-login failed — prompt them to sign in manually
        toast.success("Admin PIN set! 👑 Please sign in with your new PIN.");
        setLoginMode("login");
        setNewSetPin("");
        setConfirmSetPin("");
        setSetInitialPinError("");
        return;
      }

      // Path C: both paths failed — PIN is already set
      setSetInitialPinError(
        "PIN is already set — please use the Sign In tab to enter your existing PIN.",
      );
    } catch {
      setSetInitialPinError("Failed to set PIN. Please try again.");
    } finally {
      setIsSettingPin(false);
    }
  };

  const handleLogout = async () => {
    const token = adminToken;
    setAdminToken(null);
    sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    setArtists([]);
    if (actor && token) {
      try {
        await actor.adminLogout(token);
      } catch {
        // ignore — local state cleared
      }
    }
  };

  const handleSuspend = async (artistId: string) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminSuspendArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        toast.success("Artist suspended");
        await fetchArtists();
      } else {
        toast.error(result.err || "Failed to suspend artist");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const handleUnsuspend = async (artistId: string) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminUnsuspendArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        toast.success("Artist reactivated");
        await fetchArtists();
      } else {
        toast.error(result.err || "Failed to unsuspend artist");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const handleDelete = async (artistId: string) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminDeleteArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        toast.success("Artist permanently deleted");
        setDeleteConfirmId(null);
        await fetchArtists();
      } else {
        toast.error(result.err || "Failed to delete artist");
      }
    } catch {
      toast.error("Action failed");
    }
  };

  const handleResetArtistPIN = async (artistId: string, artistName: string) => {
    if (!actor || !adminToken) return;
    const localPin = newArtistPIN.trim();
    if (!/^\d{4,6}$/.test(localPin)) {
      setResetPinError("PIN must be 4–6 digits (numbers only).");
      return;
    }
    setIsResettingPIN(true);
    setResetPinError("");
    try {
      const pinHash = await hashPin(localPin);
      const result = await actor.adminResetArtistPIN(
        adminToken,
        artistId,
        pinHash,
      );
      if (result.__kind__ === "ok") {
        toast.success(`PIN reset successfully for ${artistName}.`);
        setResetPinArtistId(null);
        setNewArtistPIN("");
        setResetPinError("");
      } else {
        setResetPinError(result.err || "Failed to reset PIN.");
      }
    } catch {
      setResetPinError("Failed to reset PIN. Please try again.");
    } finally {
      setIsResettingPIN(false);
    }
  };

  const handleChangePIN = async (e: React.FormEvent) => {
    e.preventDefault();
    setChangePINError("");
    if (!actor || !adminToken) return;
    if (newPIN.length < 4 || newPIN.length > 6) {
      setChangePINError("New PIN must be 4–6 digits.");
      return;
    }
    if (newPIN !== confirmPIN) {
      setChangePINError("New PINs do not match.");
      return;
    }
    setIsChangingPIN(true);
    try {
      const currentHash = await hashPin(currentPIN);
      const newHash = await hashPin(newPIN);
      const result = await actor.adminChangePIN(
        adminToken,
        currentHash,
        newHash,
      );
      if (result.__kind__ === "ok") {
        toast.success("Admin PIN updated successfully 👑");
        setCurrentPIN("");
        setNewPIN("");
        setConfirmPIN("");
      } else {
        setChangePINError(result.err || "Failed to change PIN.");
      }
    } catch {
      setChangePINError("Failed to change PIN. Please try again.");
    } finally {
      setIsChangingPIN(false);
    }
  };

  const counts = {
    total: artists.length,
    active: artists.filter((a) => a.status === ArtistStatus.active).length,
    suspended: artists.filter((a) => a.status === ArtistStatus.suspended)
      .length,
    deleted: artists.filter((a) => a.status === ArtistStatus.deleted).length,
  };

  const setPinMismatch =
    confirmSetPin.length > 0 && newSetPin !== confirmSetPin;

  // ── Login / Setup Screen ──────────────────────────────────────────────────────
  if (!adminToken) {
    return (
      <div
        className="min-h-[80vh] flex items-center justify-center px-4 py-12"
        data-ocid="admin-auth-page"
      >
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="relative w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center gold-glow">
                <Shield className="w-7 h-7 text-primary" />
              </div>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground mb-1">
              Admin Control Panel
            </h1>
            <p className="text-primary font-semibold text-sm tracking-wide">
              👑 Chosen One Productions
            </p>
          </div>

          {/* Mode tabs */}
          <div className="flex rounded-xl border border-border bg-muted/30 p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setLoginMode("login");
                setLoginError("");
                setSetInitialPinError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                loginMode === "login"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin-tab-login"
            >
              <Lock className="w-3.5 h-3.5" />
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setLoginMode("set-pin");
                setLoginError("");
                setSetInitialPinError("");
              }}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                loginMode === "set-pin"
                  ? "bg-card text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              data-ocid="admin-tab-set-pin"
            >
              <Settings className="w-3.5 h-3.5" />
              First-time Setup
            </button>
          </div>

          {/* Login panel */}
          {loginMode === "login" && (
            <div
              className="bg-card border border-border rounded-2xl p-6 sm:p-8 gold-glow"
              data-ocid="admin-login-panel"
            >
              <p className="text-muted-foreground text-sm mb-5 text-center">
                Enter your admin PIN to access the control panel.
              </p>
              <form onSubmit={handleLogin} className="space-y-5">
                <div>
                  <label
                    htmlFor="admin-pin"
                    className="text-sm font-medium text-foreground block mb-2"
                  >
                    Admin PIN
                  </label>
                  <div className="relative">
                    <Input
                      id="admin-pin"
                      type={showPin ? "text" : "password"}
                      inputMode="numeric"
                      value={pin}
                      onChange={(e) => {
                        setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                        setLoginError("");
                      }}
                      placeholder="Enter your PIN"
                      className="bg-secondary border-border text-center text-lg tracking-widest pr-10"
                      data-ocid="admin-pin-input"
                      maxLength={6}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200"
                      onClick={() => setShowPin((v) => !v)}
                      aria-label={showPin ? "Hide PIN" : "Show PIN"}
                      tabIndex={-1}
                    >
                      {showPin ? (
                        <span className="text-xs">Hide</span>
                      ) : (
                        <span className="text-xs">Show</span>
                      )}
                    </button>
                  </div>
                  {loginError && (
                    <p className="text-destructive text-sm mt-2 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      {loginError}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isLoggingIn || pin.length < 4}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold h-11"
                  data-ocid="admin-login-btn"
                >
                  <Lock className="w-4 h-4" />
                  {isLoggingIn ? "Authenticating..." : "Enter Admin Panel"}
                </Button>
              </form>
              <p className="text-xs text-muted-foreground text-center mt-5">
                First time?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setLoginMode("set-pin")}
                >
                  First-time setup →
                </button>
              </p>
            </div>
          )}

          {/* Set initial PIN panel */}
          {loginMode === "set-pin" && (
            <div
              className="bg-card border border-primary/30 rounded-2xl p-6 sm:p-8"
              data-ocid="admin-set-pin-panel"
            >
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="w-5 h-5 text-primary" />
                <h2 className="font-display font-bold text-foreground">
                  First-Time Setup
                </h2>
              </div>
              <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                Use this tab to set your admin PIN for the first time — this
                only works if no PIN has been set yet. Choose a secure 4–6 digit
                PIN that only you know. Once set, use the{" "}
                <strong className="text-foreground">Sign In</strong> tab to
                enter the panel.
              </p>

              <form onSubmit={handleSetInitialPIN} className="space-y-4">
                {/* New PIN */}
                <div className="space-y-2">
                  <label
                    htmlFor="admin-set-pin-new"
                    className="text-sm font-medium text-foreground block"
                  >
                    New Admin PIN (4–6 digits)
                  </label>
                  <div className="relative">
                    <Input
                      id="admin-set-pin-new"
                      type={showSetPin ? "text" : "password"}
                      inputMode="numeric"
                      value={newSetPin}
                      onChange={(e) => {
                        setNewSetPin(
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        );
                        setSetInitialPinError("");
                      }}
                      placeholder="Choose a 4–6 digit PIN"
                      className="bg-secondary border-border text-center text-lg tracking-widest pr-10"
                      data-ocid="admin-set-pin-new-input"
                      maxLength={6}
                      autoFocus
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs"
                      onClick={() => setShowSetPin((v) => !v)}
                      aria-label={showSetPin ? "Hide PIN" : "Show PIN"}
                      tabIndex={-1}
                    >
                      {showSetPin ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Confirm PIN */}
                <div className="space-y-2">
                  <label
                    htmlFor="admin-set-pin-confirm"
                    className="text-sm font-medium text-foreground block"
                  >
                    Confirm PIN
                  </label>
                  <div className="relative">
                    <Input
                      id="admin-set-pin-confirm"
                      type={showConfirmSetPin ? "text" : "password"}
                      inputMode="numeric"
                      value={confirmSetPin}
                      onChange={(e) => {
                        setConfirmSetPin(
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        );
                        setSetInitialPinError("");
                      }}
                      placeholder="Re-enter your PIN"
                      className={`bg-secondary border-border text-center text-lg tracking-widest pr-10 ${
                        setPinMismatch
                          ? "border-destructive focus-visible:ring-destructive"
                          : ""
                      }`}
                      data-ocid="admin-set-pin-confirm-input"
                      maxLength={6}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs"
                      onClick={() => setShowConfirmSetPin((v) => !v)}
                      aria-label={showConfirmSetPin ? "Hide PIN" : "Show PIN"}
                      tabIndex={-1}
                    >
                      {showConfirmSetPin ? "Hide" : "Show"}
                    </button>
                  </div>
                  {setPinMismatch && (
                    <p className="text-xs text-destructive">
                      PINs do not match
                    </p>
                  )}
                </div>

                {/* PIN strength hint */}
                {newSetPin.length > 0 && (
                  <div className="flex items-center gap-1.5 p-2.5 rounded-lg bg-primary/5 border border-primary/20">
                    <KeyRound className="w-3.5 h-3.5 text-primary shrink-0" />
                    <p className="text-xs text-muted-foreground">
                      {newSetPin.length < 4
                        ? `Enter ${4 - newSetPin.length} more digit${4 - newSetPin.length === 1 ? "" : "s"}`
                        : newSetPin.length === 6
                          ? "Strong — 6-digit PIN"
                          : `Good — ${newSetPin.length}-digit PIN`}
                    </p>
                  </div>
                )}

                {/* Error */}
                {setInitialPinError && (
                  <div className="flex items-start gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5">
                    <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{setInitialPinError}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={
                    isSettingPin ||
                    newSetPin.length < 4 ||
                    newSetPin !== confirmSetPin
                  }
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold h-11"
                  data-ocid="admin-set-pin-submit"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  {isSettingPin ? "Setting PIN..." : "Set Admin PIN"}
                </Button>
              </form>

              <p className="text-xs text-muted-foreground text-center mt-5">
                Already have a PIN?{" "}
                <button
                  type="button"
                  className="text-primary hover:underline"
                  onClick={() => setLoginMode("login")}
                >
                  Sign in →
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ── Admin Dashboard ──────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-8">
      {/* Page Header */}
      <div className="bg-card border border-border rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 gold-glow">
            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
          </div>
          <div>
            <h1 className="font-display text-xl sm:text-2xl font-bold text-foreground leading-tight">
              Admin Control Panel
            </h1>
            <p className="text-primary text-sm font-semibold">
              👑 Chosen One Productions
            </p>
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchArtists}
            disabled={isLoading}
            className="gap-2"
            data-ocid="admin-refresh-btn"
          >
            <RefreshCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            data-ocid="admin-logout-btn"
          >
            {t("signOut")}
          </Button>
        </div>
      </div>

      {/* Real-Time Traffic Panel */}
      <TrafficPanel actor={actor} adminToken={adminToken} />

      {/* Stripe Configuration */}
      <StripeConfigPanel actor={actor} adminToken={adminToken} />

      {/* PIN Settings — dedicated always-visible section */}
      <div
        className="bg-card border border-primary/20 rounded-2xl overflow-hidden"
        data-ocid="admin-pin-settings-panel"
      >
        {/* Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 justify-between bg-primary/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
              <KeyRound className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground leading-tight">
                Admin PIN Settings
              </h2>
              <p className="text-xs text-muted-foreground">
                Change your admin access PIN. Current PIN required.
              </p>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 border border-primary/20 rounded-full px-3 py-1 w-fit">
            <Lock className="w-3 h-3" />
            Protected
          </span>
        </div>

        <div className="p-4 sm:p-6">
          {/* Info notice */}
          <div className="flex items-start gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 mb-6">
            <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your admin PIN controls access to this control panel. PINs must be{" "}
              <strong className="text-foreground">4–6 digits</strong>. Your
              current PIN is required to set a new one. Keep your PIN private.
            </p>
          </div>

          <form
            onSubmit={handleChangePIN}
            className="space-y-5"
            data-ocid="admin-pin-settings-form"
          >
            {/* Current PIN */}
            <div>
              <label
                htmlFor="admin-current-pin"
                className="text-sm font-medium text-foreground block mb-2"
              >
                Current PIN <span className="text-destructive">*</span>
              </label>
              <Input
                id="admin-current-pin"
                type="password"
                inputMode="numeric"
                value={currentPIN}
                onChange={(e) => {
                  setCurrentPIN(e.target.value.replace(/\D/g, ""));
                  setChangePINError("");
                }}
                placeholder="Enter current PIN"
                className="bg-secondary border-border text-center text-lg tracking-widest max-w-xs"
                maxLength={6}
                data-ocid="admin-current-pin"
                autoComplete="current-password"
              />
            </div>

            {/* New PIN + Confirm — side by side on sm+ */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
              <div>
                <label
                  htmlFor="admin-new-pin"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  New PIN <span className="text-destructive">*</span>
                </label>
                <Input
                  id="admin-new-pin"
                  type="password"
                  inputMode="numeric"
                  value={newPIN}
                  onChange={(e) => {
                    setNewPIN(e.target.value.replace(/\D/g, ""));
                    setChangePINError("");
                  }}
                  placeholder="4–6 digits"
                  className="bg-secondary border-border text-center text-lg tracking-widest"
                  maxLength={6}
                  data-ocid="admin-new-pin"
                  autoComplete="new-password"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Numbers only, 4–6 digits
                </p>
              </div>
              <div>
                <label
                  htmlFor="admin-confirm-pin"
                  className="text-sm font-medium text-foreground block mb-2"
                >
                  Confirm New PIN <span className="text-destructive">*</span>
                </label>
                <Input
                  id="admin-confirm-pin"
                  type="password"
                  inputMode="numeric"
                  value={confirmPIN}
                  onChange={(e) => {
                    setConfirmPIN(e.target.value.replace(/\D/g, ""));
                    setChangePINError("");
                  }}
                  placeholder="Re-enter new PIN"
                  className={`bg-secondary border-border text-center text-lg tracking-widest ${
                    confirmPIN.length > 0 && confirmPIN !== newPIN
                      ? "border-destructive/60"
                      : confirmPIN.length > 0 &&
                          confirmPIN === newPIN &&
                          newPIN.length >= 4
                        ? "border-emerald-500/60"
                        : ""
                  }`}
                  maxLength={6}
                  data-ocid="admin-confirm-pin"
                  autoComplete="new-password"
                />
                {confirmPIN.length > 0 && confirmPIN !== newPIN && (
                  <p className="text-xs text-destructive mt-1.5 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 shrink-0" />
                    PINs don't match
                  </p>
                )}
                {confirmPIN.length > 0 &&
                  confirmPIN === newPIN &&
                  newPIN.length >= 4 && (
                    <p className="text-xs text-emerald-400 mt-1.5 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 shrink-0" />
                      PINs match
                    </p>
                  )}
              </div>
            </div>

            {/* Error */}
            {changePINError && (
              <div className="flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 max-w-lg">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                {changePINError}
              </div>
            )}

            {/* Submit row */}
            <div className="flex items-center gap-3 pt-1">
              <Button
                type="submit"
                disabled={
                  isChangingPIN ||
                  !currentPIN ||
                  newPIN.length < 4 ||
                  newPIN !== confirmPIN
                }
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold gold-glow"
                data-ocid="admin-pin-settings-submit"
              >
                <KeyRound className="w-4 h-4" />
                {isChangingPIN ? "Updating PIN..." : "Update Admin PIN"}
              </Button>
              {(currentPIN || newPIN || confirmPIN) && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setCurrentPIN("");
                    setNewPIN("");
                    setConfirmPIN("");
                    setChangePINError("");
                  }}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Stats Bar */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
        data-ocid="admin-stats-bar"
      >
        {[
          {
            label: "Total Artists",
            value: counts.total,
            color: "text-foreground",
            icon: Users,
          },
          {
            label: "Active",
            value: counts.active,
            color: "text-green-400",
            icon: UserCheck,
          },
          {
            label: "Suspended",
            value: counts.suspended,
            color: "text-yellow-400",
            icon: UserX,
          },
          {
            label: "Deleted",
            value: counts.deleted,
            color: "text-destructive",
            icon: Trash2,
          },
        ].map(({ label, value, color, icon: Icon }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-xl p-3 sm:p-4 text-center"
          >
            <Icon className={`w-5 h-5 mx-auto mb-2 ${color}`} />
            <p
              className={`text-2xl sm:text-3xl font-bold font-display ${color}`}
            >
              {value}
            </p>
            <p className="text-muted-foreground text-xs mt-1 font-medium">
              {label}
            </p>
          </div>
        ))}
      </div>

      {/* Artists Table */}
      <div
        className="bg-card border border-border rounded-2xl overflow-hidden"
        data-ocid="admin-artists-table"
      >
        <div className="px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between">
          <h2 className="font-display font-bold text-foreground flex items-center gap-2">
            <Users className="w-5 h-5 text-primary" />
            {t("adminArtists")}
          </h2>
          <span className="text-muted-foreground text-sm">
            {artists.length} {artists.length === 1 ? "artist" : "artists"}
          </span>
        </div>

        {isLoading ? (
          <div className="px-4 sm:px-6 py-6 space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <Skeleton className="w-9 h-9 rounded-full shrink-0" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <Skeleton className="h-6 w-20 rounded-full hidden sm:block" />
                <Skeleton className="h-8 w-24 rounded-lg hidden sm:block" />
              </div>
            ))}
          </div>
        ) : artists.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <Users className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground font-medium">
              No artists registered yet
            </p>
            <p className="text-muted-foreground text-sm mt-1">
              Artists will appear here once they sign up.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop header — hidden on mobile */}
            <div className="hidden sm:grid px-6 py-2 grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border bg-muted/30">
              <span className="text-xs text-muted-foreground">Artist</span>
              <span className="text-xs text-muted-foreground">Joined</span>
              <span className="text-xs text-muted-foreground">Last Login</span>
              <span className="text-xs text-muted-foreground">Status</span>
              <span className="text-xs text-muted-foreground text-right">
                Actions
              </span>
            </div>
            <ul className="divide-y divide-border">
              {artists.map((artist) => (
                <li key={artist.id} data-ocid={`admin-artist-${artist.id}`}>
                  {/* Desktop row */}
                  <div className="hidden sm:grid px-6 py-4 grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                        <span className="text-primary text-sm font-bold">
                          {artist.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {artist.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate font-mono">
                          {artist.id}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground shrink-0">
                      {formatDate(artist.createdAt)}
                    </span>
                    <span
                      className="text-sm shrink-0 tabular-nums"
                      data-ocid={`admin-artist-last-login-${artist.id}`}
                      title={
                        artist.lastLoginAt
                          ? new Date(
                              Number(artist.lastLoginAt) / 1_000_000,
                            ).toLocaleString()
                          : "Never logged in"
                      }
                    >
                      {artist.lastLoginAt ? (
                        <span className="text-foreground">
                          {formatLastLogin(artist.lastLoginAt)}
                        </span>
                      ) : (
                        <span className="text-muted-foreground italic">
                          Never
                        </span>
                      )}
                    </span>
                    <div className="shrink-0">
                      {artist.status === ArtistStatus.active && (
                        <Badge className="bg-green-500/15 text-green-400 border-green-500/30 border">
                          {t("active")}
                        </Badge>
                      )}
                      {artist.status === ArtistStatus.suspended && (
                        <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border">
                          {t("suspended")}
                        </Badge>
                      )}
                      {artist.status === ArtistStatus.deleted && (
                        <Badge className="bg-destructive/15 text-destructive border-destructive/30 border">
                          {t("deleted")}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 justify-end">
                      {artist.status === ArtistStatus.active && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                          onClick={() => handleSuspend(artist.id)}
                          data-ocid={`admin-suspend-${artist.id}`}
                        >
                          <UserX className="w-3.5 h-3.5" />
                          {t("suspend")}
                        </Button>
                      )}
                      {artist.status === ArtistStatus.suspended && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs border-green-500/30 text-green-400 hover:bg-green-500/10"
                          onClick={() => handleUnsuspend(artist.id)}
                          data-ocid={`admin-unsuspend-${artist.id}`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          {t("unsuspend")}
                        </Button>
                      )}
                      {artist.status !== ArtistStatus.deleted && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10"
                            onClick={() => {
                              if (resetPinArtistId === artist.id) {
                                setResetPinArtistId(null);
                                setNewArtistPIN("");
                                setResetPinError("");
                              } else {
                                setResetPinArtistId(artist.id);
                                setNewArtistPIN("");
                                setResetPinError("");
                              }
                            }}
                            data-ocid={`admin-reset-pin-btn-${artist.id}`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            Reset PIN
                          </Button>
                          <div>
                            {deleteConfirmId === artist.id ? (
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs text-destructive font-medium">
                                  Confirm?
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="text-xs h-7 px-2 border-destructive/40 text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDelete(artist.id)}
                                  data-ocid={`admin-delete-confirm-${artist.id}`}
                                >
                                  Yes
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-xs h-7 px-2"
                                  onClick={() => setDeleteConfirmId(null)}
                                >
                                  No
                                </Button>
                              </div>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                                onClick={() => setDeleteConfirmId(artist.id)}
                                data-ocid={`admin-delete-${artist.id}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                {t("delete")}
                              </Button>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Mobile row */}
                  <div className="sm:hidden px-4 py-4">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="text-primary text-sm font-bold">
                          {artist.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {artist.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          {artist.status === ArtistStatus.active && (
                            <Badge className="bg-green-500/15 text-green-400 border-green-500/30 border text-xs">
                              Active
                            </Badge>
                          )}
                          {artist.status === ArtistStatus.suspended && (
                            <Badge className="bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border text-xs">
                              Suspended
                            </Badge>
                          )}
                          {artist.status === ArtistStatus.deleted && (
                            <Badge className="bg-destructive/15 text-destructive border-destructive/30 border text-xs">
                              Deleted
                            </Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Joined {formatDate(artist.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Last login:{" "}
                          {artist.lastLoginAt
                            ? formatLastLogin(artist.lastLoginAt)
                            : "Never"}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {artist.status === ArtistStatus.active && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
                          onClick={() => handleSuspend(artist.id)}
                          data-ocid={`admin-mobile-suspend-${artist.id}`}
                        >
                          <UserX className="w-3.5 h-3.5" />
                          Suspend
                        </Button>
                      )}
                      {artist.status === ArtistStatus.suspended && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-1.5 text-xs border-green-500/30 text-green-400 hover:bg-green-500/10"
                          onClick={() => handleUnsuspend(artist.id)}
                          data-ocid={`admin-mobile-unsuspend-${artist.id}`}
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          Reactivate
                        </Button>
                      )}
                      {artist.status !== ArtistStatus.deleted && (
                        <>
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10"
                            onClick={() => {
                              setResetPinArtistId(
                                resetPinArtistId === artist.id
                                  ? null
                                  : artist.id,
                              );
                              setNewArtistPIN("");
                              setResetPinError("");
                            }}
                            data-ocid={`admin-mobile-reset-pin-${artist.id}`}
                          >
                            <KeyRound className="w-3.5 h-3.5" />
                            Reset PIN
                          </Button>
                          {deleteConfirmId === artist.id ? (
                            <>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-xs border-destructive/40 text-destructive hover:bg-destructive/10"
                                onClick={() => handleDelete(artist.id)}
                                data-ocid={`admin-mobile-delete-confirm-${artist.id}`}
                              >
                                Confirm Delete
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-xs"
                                onClick={() => setDeleteConfirmId(null)}
                              >
                                Cancel
                              </Button>
                            </>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10"
                              onClick={() => setDeleteConfirmId(artist.id)}
                              data-ocid={`admin-mobile-delete-${artist.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              Delete
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* Inline PIN Reset Form */}
                  {resetPinArtistId === artist.id && (
                    <div
                      className="mx-4 sm:mx-6 mb-4 px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl animate-slide-up"
                      data-ocid={`admin-reset-pin-form-${artist.id}`}
                    >
                      <p className="text-xs text-amber-400 font-medium mb-3 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        This will log out {artist.name} — they must sign in with
                        the new PIN.
                      </p>
                      <div className="flex items-end gap-3 flex-wrap">
                        <div className="flex-1 min-w-[160px]">
                          <label
                            htmlFor={`reset-pin-input-${artist.id}`}
                            className="text-xs text-muted-foreground block mb-1.5 font-medium"
                          >
                            New PIN (4–6 digits)
                          </label>
                          <Input
                            id={`reset-pin-input-${artist.id}`}
                            type="password"
                            inputMode="numeric"
                            value={newArtistPIN}
                            onChange={(e) => {
                              setNewArtistPIN(
                                e.target.value.replace(/\D/g, ""),
                              );
                              setResetPinError("");
                            }}
                            placeholder="e.g. 1234"
                            maxLength={6}
                            className="bg-secondary border-border text-center tracking-widest"
                            data-ocid={`reset-pin-input-${artist.id}`}
                          />
                        </div>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleResetArtistPIN(artist.id, artist.name)
                          }
                          disabled={isResettingPIN || newArtistPIN.length < 4}
                          className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shrink-0"
                          data-ocid={`reset-pin-confirm-${artist.id}`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {isResettingPIN ? "Resetting…" : "Confirm Reset"}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setResetPinArtistId(null);
                            setNewArtistPIN("");
                            setResetPinError("");
                          }}
                          className="shrink-0"
                          data-ocid={`reset-pin-cancel-${artist.id}`}
                        >
                          Cancel
                        </Button>
                      </div>
                      {resetPinError && (
                        <p className="text-destructive text-xs mt-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-3 h-3 shrink-0" />
                          {resetPinError}
                        </p>
                      )}
                    </div>
                  )}

                  {artist.bio && (
                    <div className="px-4 sm:px-6 pb-3">
                      <p className="text-xs text-muted-foreground pl-0 sm:pl-12 italic">
                        "{artist.bio}"
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <Separator className="opacity-30" />

      <p className="text-center text-xs text-muted-foreground pb-4">
        All actions are permanent and enforced on the backend. Artist data is
        protected and encrypted.
      </p>
    </div>
  );
}
