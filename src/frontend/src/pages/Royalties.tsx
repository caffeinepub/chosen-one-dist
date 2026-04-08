import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  CreditCard,
  DollarSign,
  Eye,
  Lock,
  Music,
  ShoppingCart,
  TrendingUp,
  Wallet,
  XCircle,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { Backend } from "../backend";
import { createActor } from "../backend";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";
import type {
  BankingInfoPublic,
  PayoutPublic,
  RoyaltyDashboard,
} from "../types";
import { PayoutStatus } from "../types";

/** Unwrap a Result variant, throw on err */
function unwrapResult<T>(
  result: { __kind__: "ok"; ok: T } | { __kind__: "err"; err: string },
): T {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}

function generatePeriods() {
  const periods: { value: string; label: string }[] = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
    periods.push({ value: label, label });
  }
  return periods;
}

const PERIODS = generatePeriods();

const STATUS_CONFIG: Record<
  string,
  { icon: typeof Clock; label: string; colorClass: string }
> = {
  [PayoutStatus.pending]: {
    icon: Clock,
    label: "Pending",
    colorClass: "text-yellow-400",
  },
  [PayoutStatus.processed]: {
    icon: CheckCircle2,
    label: "Paid",
    colorClass: "text-emerald-400",
  },
  [PayoutStatus.failed]: {
    icon: XCircle,
    label: "Failed",
    colorClass: "text-destructive",
  },
};

export default function Royalties() {
  const { t } = useTranslation();
  const [period, setPeriod] = useState(PERIODS[0].value);
  const [activeTab, setActiveTab] = useState<"overview" | "banking">(
    "overview",
  );
  const { isAuthenticated, sessionToken } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const actorReady =
    !!actor && !actorFetching && isAuthenticated && !!sessionToken;

  const { data: royalties, isLoading: royaltiesLoading } =
    useQuery<RoyaltyDashboard>({
      queryKey: ["royalty-dashboard", period],
      queryFn: async () => {
        const result = await actor!.getRoyaltyDashboard(sessionToken!, period);
        return unwrapResult(result);
      },
      enabled: actorReady,
    });

  const { data: banking } = useQuery<BankingInfoPublic | null>({
    queryKey: ["banking-info"],
    queryFn: async () => {
      const result = await actor!.getBankingInfo(sessionToken!);
      return unwrapResult(result);
    },
    enabled: actorReady,
  });

  const { data: payouts, isLoading: payoutsLoading } = useQuery<PayoutPublic[]>(
    {
      queryKey: ["my-payouts"],
      queryFn: async () => {
        const result = await actor!.getMyPayouts(sessionToken!);
        return unwrapResult(result);
      },
      enabled: actorReady,
    },
  );

  const available = royalties
    ? Number(royalties.availableBalanceCents) / 100
    : 0;
  const availableCents = royalties
    ? royalties.availableBalanceCents
    : BigInt(0);

  const payoutMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (!sessionToken) throw new Error("Not logged in.");
      if (availableCents <= BigInt(0))
        throw new Error("No balance available for payout.");
      const result = await actor.requestPayout(sessionToken, availableCents);
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-payouts"] });
      queryClient.invalidateQueries({ queryKey: ["royalty-dashboard"] });
      toast.success(
        "Payout requested! Funds will be deposited to your bank account. 💰",
      );
    },
    onError: (err: Error) =>
      toast.error(err.message || "Payout request failed."),
  });

  if (!isAuthenticated) {
    return (
      <div
        className="max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center"
        data-ocid="royalties-auth-gate"
      >
        <div className="text-6xl mb-6">👑</div>
        <h2 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-3">
          {t("royaltiesTitle")}
        </h2>
        <p className="text-muted-foreground mb-8">
          Sign in to view your earnings, track sales, and request instant
          payouts.
        </p>
        <Button
          asChild
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
          data-ocid="royalties-login-btn"
        >
          <Link to="/login">{t("signIn")}</Link>
        </Button>
      </div>
    );
  }

  const periodStats = royalties?.periodStats;

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10"
      data-ocid="royalties-page"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="font-display font-bold text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2">
            {t("royaltiesTitle")} 👑
          </h1>
          <p className="text-muted-foreground text-sm">
            Track your earnings, request payouts, and manage banking info.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/15 border border-primary/30 self-start sm:self-auto">
          <span className="text-primary text-sm font-semibold">
            {t("payoutRate")}
          </span>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex items-center gap-2 mb-6 sm:mb-8">
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("overview")}
          className={
            activeTab === "overview" ? "bg-primary text-primary-foreground" : ""
          }
          data-ocid="royalties-tab-overview"
        >
          <TrendingUp className="w-4 h-4 mr-1.5" />
          <span className="hidden sm:inline">{t("periodStats")}</span>
          <span className="sm:hidden">Overview</span>
        </Button>
        <Button
          variant={activeTab === "banking" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTab("banking")}
          className={
            activeTab === "banking" ? "bg-primary text-primary-foreground" : ""
          }
          data-ocid="royalties-tab-banking"
        >
          <CreditCard className="w-4 h-4 mr-1.5" />
          <span className="hidden sm:inline">{t("bankingInfo")}</span>
          <span className="sm:hidden">Banking</span>
          {banking && (
            <span className="ml-1.5 w-2 h-2 rounded-full bg-emerald-400 inline-block" />
          )}
        </Button>
      </div>

      {activeTab === "overview" ? (
        <>
          {/* Period Selector + Download */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5 sm:mb-6">
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger
                className="w-full sm:w-52 bg-card border-border"
                data-ocid="royalties-period-select"
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {PERIODS.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 w-full sm:w-auto"
              disabled={!royalties?.trackBreakdown?.length}
              onClick={() => {
                if (!royalties?.trackBreakdown?.length) return;
                const rows = [
                  [
                    "Track Title",
                    "Previews",
                    "Sales",
                    "Gross Revenue ($)",
                    "Your Earnings ($)",
                  ],
                  ...royalties.trackBreakdown.map((row) => [
                    row.title,
                    String(Number(row.previews)),
                    String(Number(row.sales)),
                    (Number(row.grossRevenueCents) / 100).toFixed(2),
                    (Number(row.earningsCents) / 100).toFixed(2),
                  ]),
                ];
                const csv = rows
                  .map((r) => r.map((v) => `"${v}"`).join(","))
                  .join("\n");
                const blob = new Blob([csv], { type: "text/csv" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `royalties-${period.replace(/\s+/g, "-")}.csv`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              data-ocid="royalties-download-report-btn"
            >
              <TrendingUp className="w-4 h-4" />
              Download Report
            </Button>
          </div>

          {/* Stats Cards: 2-col mobile, 4-col desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            {royaltiesLoading
              ? ["s0", "s1", "s2", "s3"].map((key) => (
                  <div key={key} className="card-elevated p-4 sm:p-5">
                    <Skeleton className="h-3 w-20 mb-3" />
                    <Skeleton className="h-7 w-16" />
                  </div>
                ))
              : [
                  {
                    label: t("trackPreviews"),
                    value: Number(periodStats?.previews ?? 0).toLocaleString(),
                    icon: Eye,
                    sub: t("totalListens"),
                  },
                  {
                    label: t("totalSales"),
                    value: Number(periodStats?.sales ?? 0).toLocaleString(),
                    icon: ShoppingCart,
                    sub: t("unitsSold"),
                  },
                  {
                    label: t("grossRevenue"),
                    value: `$${(Number(periodStats?.grossRevenueCents ?? 0) / 100).toFixed(2)}`,
                    icon: DollarSign,
                    sub: t("beforeSplit"),
                  },
                  {
                    label: t("yourPayout"),
                    value: `$${(Number(periodStats?.payoutCents ?? 0) / 100).toFixed(2)}`,
                    icon: Wallet,
                    sub: t("payoutRate"),
                    highlight: true,
                  },
                ].map(({ label, value, icon: Icon, sub, highlight }) => (
                  <div
                    key={label}
                    className={`card-elevated p-4 sm:p-5 ${highlight ? "border-primary/40" : ""}`}
                  >
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight pr-1">
                        {label}
                      </p>
                      <Icon
                        className={`w-4 h-4 shrink-0 ${highlight ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <p
                      className={`font-display font-bold text-xl sm:text-2xl ${highlight ? "text-primary" : "text-foreground"}`}
                    >
                      {value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{sub}</p>
                  </div>
                ))}
          </div>

          {/* Royalty Breakdown */}
          {royaltiesLoading ? (
            <div className="card-elevated p-4 sm:p-6 mb-6 sm:mb-8">
              <Skeleton className="h-5 w-40 mb-4" />
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} className="h-10 w-full mb-2" />
              ))}
            </div>
          ) : !royalties?.trackBreakdown ||
            royalties.trackBreakdown.length === 0 ? (
            <div
              className="card-elevated flex flex-col items-center py-12 sm:py-16 text-center mb-6 sm:mb-8 px-4"
              data-ocid="royalties-empty-tracks"
            >
              <Music className="w-12 h-12 text-muted-foreground/30 mb-4" />
              <h3 className="font-display font-semibold text-foreground mb-2">
                No royalty data yet.
              </h3>
              <p className="text-muted-foreground text-sm">
                Upload and sell tracks to see your earnings! 🎵
              </p>
            </div>
          ) : (
            <div className="card-elevated overflow-hidden mb-6 sm:mb-8">
              <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
                <h2 className="font-display font-semibold text-foreground">
                  Royalty Breakdown
                </h2>
                <Badge variant="secondary" className="text-xs">
                  {royalties.trackBreakdown.length} tracks
                </Badge>
              </div>
              {/* Mobile: stacked cards */}
              <div className="sm:hidden divide-y divide-border">
                {royalties.trackBreakdown.map((row) => (
                  <div
                    key={String(row.trackId)}
                    className="p-4 space-y-2"
                    data-ocid={`royalties-track-row-${row.trackId}`}
                  >
                    <div className="flex items-center gap-2">
                      <Music className="w-4 h-4 text-muted-foreground shrink-0" />
                      <span className="font-medium text-foreground truncate">
                        {row.title}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs pl-6">
                      <div>
                        <span className="text-muted-foreground">
                          Previews:{" "}
                        </span>
                        <span className="text-foreground">
                          {Number(row.previews).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Sales: </span>
                        <span className="text-foreground">
                          {Number(row.sales).toLocaleString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gross: </span>
                        <span className="text-foreground">
                          ${(Number(row.grossRevenueCents) / 100).toFixed(2)}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Your cut:{" "}
                        </span>
                        <span className="font-semibold text-primary">
                          ${(Number(row.earningsCents) / 100).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Desktop table */}
              <div className="hidden sm:block overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-xs text-muted-foreground">
                      <th className="text-left px-6 py-3 font-medium">
                        Track Title
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        {t("trackPreviews")}
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        {t("totalSales")}
                      </th>
                      <th className="text-right px-4 py-3 font-medium">
                        {t("grossRevenue")}
                      </th>
                      <th className="text-right px-6 py-3 font-medium">
                        {t("yourPayout")} (85%)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {royalties.trackBreakdown.map((row) => (
                      <tr
                        key={String(row.trackId)}
                        className="hover:bg-secondary/50 transition-colors-fast"
                        data-ocid={`royalties-track-row-${row.trackId}`}
                      >
                        <td className="px-6 py-3">
                          <div className="flex items-center gap-3">
                            <Music className="w-4 h-4 text-muted-foreground shrink-0" />
                            <span className="font-medium text-foreground truncate max-w-48">
                              {row.title}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {Number(row.previews).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          {Number(row.sales).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right text-muted-foreground">
                          ${(Number(row.grossRevenueCents) / 100).toFixed(2)}
                        </td>
                        <td className="px-6 py-3 text-right font-semibold text-primary">
                          ${(Number(row.earningsCents) / 100).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Instant Payout */}
          <div
            className="card-elevated p-4 sm:p-6 mb-6 sm:mb-8 border-primary/20"
            data-ocid="royalties-instant-payout"
          >
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-primary" />
              <h2 className="font-display font-bold text-lg text-foreground">
                INSTANT PAYOUT
              </h2>
              <Badge className="ml-auto bg-primary/15 text-primary border border-primary/30 text-xs">
                {t("payoutRate")}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mb-4 sm:mb-5">
              Funds deposited directly to your bank account. No delays, no
              middlemen.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">
                  {t("availableBalance")}
                </p>
                {royaltiesLoading ? (
                  <Skeleton className="h-9 w-32" />
                ) : (
                  <p className="font-display font-bold text-3xl text-primary">
                    ${available.toFixed(2)}
                  </p>
                )}
              </div>
              <Button
                type="button"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold w-full sm:w-auto"
                onClick={() => payoutMutation.mutate()}
                disabled={
                  payoutMutation.isPending || available <= 0 || !banking
                }
                data-ocid="royalties-instant-payout-btn"
              >
                <Zap className="w-4 h-4" />
                {payoutMutation.isPending
                  ? "Processing..."
                  : t("requestPayout")}
              </Button>
            </div>
            {!banking && (
              <div className="mt-4 flex items-center gap-2 p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20">
                <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                <p className="text-xs text-yellow-400">
                  Add your banking information in the Banking tab to enable
                  payouts.
                </p>
              </div>
            )}
          </div>

          {/* Payout History */}
          <PayoutHistoryTable
            payouts={payouts ?? null}
            payoutsLoading={payoutsLoading}
            t={t}
          />
        </>
      ) : (
        <BankingTab
          banking={banking ?? null}
          actor={actor}
          sessionToken={sessionToken}
          queryClient={queryClient}
          t={t}
        />
      )}
    </div>
  );
}

function PayoutHistoryTable({
  payouts,
  payoutsLoading,
  t,
}: {
  payouts: PayoutPublic[] | null;
  payoutsLoading: boolean;
  t: (key: import("../types").TranslationKey) => string;
}) {
  return (
    <div
      className="card-elevated overflow-hidden"
      data-ocid="royalties-payout-history"
    >
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border">
        <h2 className="font-display font-semibold text-foreground">
          {t("payoutHistory")}
        </h2>
        {payouts && payouts.length > 0 && (
          <Badge variant="secondary" className="text-xs">
            {payouts.length} payouts
          </Badge>
        )}
      </div>

      {payoutsLoading ? (
        <div className="p-4 sm:p-6 space-y-3">
          {Array.from({ length: 3 }, (_, i) => `payout-skel-${i}`).map(
            (key) => (
              <div key={key} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            ),
          )}
        </div>
      ) : !payouts || payouts.length === 0 ? (
        <div
          className="flex flex-col items-center py-12 sm:py-14 text-center px-4"
          data-ocid="royalties-empty-payouts"
        >
          <DollarSign className="w-10 h-10 text-muted-foreground/30 mb-3" />
          <p className="text-muted-foreground text-sm">
            No payouts yet. Your earnings will appear here once you request a
            payout.
          </p>
        </div>
      ) : (
        <>
          {/* Mobile: stacked cards */}
          <div className="sm:hidden divide-y divide-border">
            {payouts.map((payout) => {
              const config =
                STATUS_CONFIG[payout.status] ??
                STATUS_CONFIG[PayoutStatus.pending];
              const StatusIcon = config.icon;
              const requestedDate = new Date(
                Number(payout.requestedAt) / 1_000_000,
              ).toLocaleDateString();
              return (
                <div
                  key={String(payout.id)}
                  className="p-4"
                  data-ocid={`royalties-payout-row-${payout.id}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`flex items-center gap-1.5 text-xs font-medium ${config.colorClass}`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {config.label}
                    </span>
                    <span className="font-semibold text-primary">
                      ${(Number(payout.amountCents) / 100).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {requestedDate}
                  </p>
                </div>
              );
            })}
          </div>
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="text-left px-6 py-3 font-medium">
                    Date Requested
                  </th>
                  <th className="text-left px-4 py-3 font-medium">Status</th>
                  <th className="text-right px-4 py-3 font-medium">Amount</th>
                  <th className="text-right px-6 py-3 font-medium">
                    Processed
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {payouts.map((payout) => {
                  const config =
                    STATUS_CONFIG[payout.status] ??
                    STATUS_CONFIG[PayoutStatus.pending];
                  const StatusIcon = config.icon;
                  const requestedDate = new Date(
                    Number(payout.requestedAt) / 1_000_000,
                  ).toLocaleDateString();
                  const processedDate = payout.processedAt
                    ? new Date(
                        Number(payout.processedAt) / 1_000_000,
                      ).toLocaleDateString()
                    : "—";
                  return (
                    <tr
                      key={String(payout.id)}
                      className="hover:bg-secondary/50 transition-colors-fast"
                      data-ocid={`royalties-payout-row-${payout.id}`}
                    >
                      <td className="px-6 py-3 text-muted-foreground">
                        {requestedDate}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`flex items-center gap-1.5 text-xs font-medium ${config.colorClass}`}
                        >
                          <StatusIcon className="w-3.5 h-3.5" />
                          {config.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-primary">
                        ${(Number(payout.amountCents) / 100).toFixed(2)}
                      </td>
                      <td className="px-6 py-3 text-right text-muted-foreground">
                        {processedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

function BankingTab({
  banking,
  actor,
  sessionToken,
  queryClient,
  t,
}: {
  banking: BankingInfoPublic | null;
  actor: Backend | null;
  sessionToken: string | null;
  queryClient: ReturnType<typeof useQueryClient>;
  t: (key: import("../types").TranslationKey) => string;
}) {
  const [form, setForm] = useState({
    accountHolderName: banking?.accountHolderName ?? "",
    bankName: banking?.bankName ?? "",
    routingNumber: banking?.routingNumber ?? "",
    accountNumber: banking?.accountNumber ?? "",
  });
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  useEffect(() => {
    if (banking) {
      setForm({
        accountHolderName: banking.accountHolderName,
        bankName: banking.bankName,
        routingNumber: banking.routingNumber,
        accountNumber: banking.accountNumber,
      });
    }
  }, [banking]);

  function validate(): boolean {
    const next: Partial<typeof form> = {};
    if (!form.accountHolderName.trim())
      next.accountHolderName = "Account holder name is required.";
    if (!form.bankName.trim()) next.bankName = "Bank name is required.";
    if (!/^\d{9}$/.test(form.routingNumber))
      next.routingNumber = "Routing number must be exactly 9 digits.";
    if (!form.accountNumber.trim())
      next.accountNumber = "Account number is required.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      if (!sessionToken) throw new Error("Not logged in.");
      const result = await actor.saveBankingInfo(
        sessionToken,
        form.accountHolderName,
        form.bankName,
        form.routingNumber,
        form.accountNumber,
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banking-info"] });
      toast.success("Banking info saved! ✅");
    },
    onError: () => toast.error("Failed to save banking info."),
  });

  const set = (key: keyof typeof form, val: string) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  return (
    <div
      className="w-full max-w-xl space-y-4 sm:space-y-6"
      data-ocid="royalties-banking-tab"
    >
      {/* 85% Split callout */}
      <div className="card-elevated p-4 border-primary/30 flex items-center gap-3 sm:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
          <span className="text-primary font-bold text-base sm:text-lg">
            85%
          </span>
        </div>
        <div>
          <p className="font-semibold text-foreground text-sm">
            {t("payoutRate")}
          </p>
          <p className="text-muted-foreground text-xs mt-0.5">
            You keep 85% of every sale. Chosen One Distribution retains 15%
            platform fee.
          </p>
        </div>
      </div>

      <div className="card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5">
        <div className="flex items-center gap-3 mb-1 sm:mb-2">
          <CreditCard className="w-5 h-5 text-primary" />
          <h2 className="font-display font-semibold text-foreground text-lg">
            {t("bankingInfo")}
          </h2>
          {banking && (
            <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs ml-auto">
              Saved
            </Badge>
          )}
        </div>

        <Separator />

        {/* Account holder name — full width */}
        <div className="space-y-2">
          <Label htmlFor="bank-account-name">{t("accountHolder")}</Label>
          <Input
            id="bank-account-name"
            value={form.accountHolderName}
            onChange={(e) => set("accountHolderName", e.target.value)}
            placeholder="Full legal name as it appears on your bank account"
            className="bg-secondary border-border"
            data-ocid="banking-account-name-input"
          />
          {errors.accountHolderName && (
            <p className="text-destructive text-xs">
              {errors.accountHolderName}
            </p>
          )}
        </div>

        {/* Bank name — full width */}
        <div className="space-y-2">
          <Label htmlFor="bank-name">{t("bankName")}</Label>
          <Input
            id="bank-name"
            value={form.bankName}
            onChange={(e) => set("bankName", e.target.value)}
            placeholder="e.g. Chase, Wells Fargo, Bank of America"
            className="bg-secondary border-border"
            data-ocid="banking-bank-name-input"
          />
          {errors.bankName && (
            <p className="text-destructive text-xs">{errors.bankName}</p>
          )}
        </div>

        {/* Routing + Account — stacked on mobile, side-by-side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bank-routing">{t("routingNumber")}</Label>
            <Input
              id="bank-routing"
              value={form.routingNumber}
              onChange={(e) =>
                set("routingNumber", e.target.value.replace(/\D/g, ""))
              }
              placeholder="9 digits"
              maxLength={9}
              inputMode="numeric"
              className="bg-secondary border-border font-mono"
              data-ocid="banking-routing-input"
            />
            {errors.routingNumber ? (
              <p className="text-destructive text-xs">{errors.routingNumber}</p>
            ) : (
              <p className="text-muted-foreground text-xs">
                9-digit ABA routing number
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="bank-account">{t("accountNumber")}</Label>
            <Input
              id="bank-account"
              value={form.accountNumber}
              onChange={(e) => set("accountNumber", e.target.value)}
              placeholder="Account number"
              className="bg-secondary border-border font-mono"
              data-ocid="banking-account-input"
            />
            {errors.accountNumber && (
              <p className="text-destructive text-xs">{errors.accountNumber}</p>
            )}
          </div>
        </div>

        {/* Security disclaimer */}
        <div className="flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <Lock className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-yellow-400 mb-0.5">
              Real banking information required for payout processing.
            </p>
            <p className="text-xs text-yellow-400/80">
              Your information is stored securely and used only for processing
              your royalty payouts. Chosen One Distribution will never share
              your banking details with third parties.
            </p>
          </div>
        </div>

        <Button
          type="button"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            if (validate()) saveMutation.mutate();
          }}
          disabled={saveMutation.isPending}
          data-ocid="banking-save-btn"
        >
          {saveMutation.isPending
            ? "Saving..."
            : banking
              ? "Update Banking Info"
              : t("saveBanking")}
        </Button>
      </div>

      {/* Payout note */}
      <div className="card-elevated p-4 flex items-start gap-3">
        <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          Payouts are processed from the Overview tab once you have an available
          balance. Standard bank transfers may take 2–5 business days depending
          on your financial institution.
        </p>
      </div>
    </div>
  );
}
