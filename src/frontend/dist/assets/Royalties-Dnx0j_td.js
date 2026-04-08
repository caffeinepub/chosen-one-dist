import { t as createLucideIcon, u as useTranslation, r as reactExports, d as useAuth, c as useActor, g as useQueryClient, e as useQuery, j as jsxRuntimeExports, B as Button, L as Link, m as ShoppingCart, z as DollarSign, l as ue, P as PayoutStatus, o as Separator, I as Input, f as createActor } from "./index-vY0Feq6b.js";
import { B as Badge } from "./badge-DAcj_hkK.js";
import { L as Label } from "./label-D3yUzoai.js";
import { S as Select, i as SelectTrigger, j as SelectValue, k as SelectContent, l as SelectItem } from "./select-D8Rd37_4.js";
import { S as Skeleton } from "./skeleton-D87ZoAe2.js";
import { u as useMutation } from "./useMutation-BtA4rbge.js";
import { T as TrendingUp } from "./trending-up-DYewfokG.js";
import { C as CreditCard } from "./credit-card-BqS9jeaS.js";
import { E as Eye } from "./eye-BG9TlMJv.js";
import { M as Music } from "./music-C7o3CuoA.js";
import { Z as Zap } from "./zap-DRCgrXYY.js";
import { C as CircleAlert } from "./circle-alert-SpGyCgnm.js";
import { C as CircleCheck } from "./circle-check-Biq4gKIp.js";
import { C as Clock } from "./clock-BYTeTgdd.js";
import { L as Lock } from "./lock-CSaY1fQz.js";
import "./chevron-up-GNmc8wHA.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
  ["path", { d: "m9 9 6 6", key: "z0biqf" }]
];
const CircleX = createLucideIcon("circle-x", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1",
      key: "18etb6"
    }
  ],
  ["path", { d: "M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4", key: "xoc0q4" }]
];
const Wallet = createLucideIcon("wallet", __iconNode);
function unwrapResult(result) {
  if (result.__kind__ === "err") throw new Error(result.err);
  return result.ok;
}
function generatePeriods() {
  const periods = [];
  const now = /* @__PURE__ */ new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const label = d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric"
    });
    periods.push({ value: label, label });
  }
  return periods;
}
const PERIODS = generatePeriods();
const STATUS_CONFIG = {
  [PayoutStatus.pending]: {
    icon: Clock,
    label: "Pending",
    colorClass: "text-yellow-400"
  },
  [PayoutStatus.processed]: {
    icon: CircleCheck,
    label: "Paid",
    colorClass: "text-emerald-400"
  },
  [PayoutStatus.failed]: {
    icon: CircleX,
    label: "Failed",
    colorClass: "text-destructive"
  }
};
function Royalties() {
  var _a;
  const { t } = useTranslation();
  const [period, setPeriod] = reactExports.useState(PERIODS[0].value);
  const [activeTab, setActiveTab] = reactExports.useState(
    "overview"
  );
  const { isAuthenticated, sessionToken } = useAuth();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const queryClient = useQueryClient();
  const actorReady = !!actor && !actorFetching && isAuthenticated && !!sessionToken;
  const { data: royalties, isLoading: royaltiesLoading } = useQuery({
    queryKey: ["royalty-dashboard", period],
    queryFn: async () => {
      const result = await actor.getRoyaltyDashboard(sessionToken, period);
      return unwrapResult(result);
    },
    enabled: actorReady
  });
  const { data: banking } = useQuery({
    queryKey: ["banking-info"],
    queryFn: async () => {
      const result = await actor.getBankingInfo(sessionToken);
      return unwrapResult(result);
    },
    enabled: actorReady
  });
  const { data: payouts, isLoading: payoutsLoading } = useQuery(
    {
      queryKey: ["my-payouts"],
      queryFn: async () => {
        const result = await actor.getMyPayouts(sessionToken);
        return unwrapResult(result);
      },
      enabled: actorReady
    }
  );
  const available = royalties ? Number(royalties.availableBalanceCents) / 100 : 0;
  const availableCents = royalties ? royalties.availableBalanceCents : BigInt(0);
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
      ue.success(
        "Payout requested! Funds will be deposited to your bank account. 💰"
      );
    },
    onError: (err) => ue.error(err.message || "Payout request failed.")
  });
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-2xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center",
        "data-ocid": "royalties-auth-gate",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-6xl mb-6", children: "👑" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-3", children: t("royaltiesTitle") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8", children: "Sign in to view your earnings, track sales, and request instant payouts." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              className: "bg-primary text-primary-foreground hover:bg-primary/90 px-8",
              "data-ocid": "royalties-login-btn",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: t("signIn") })
            }
          )
        ]
      }
    );
  }
  const periodStats = royalties == null ? void 0 : royalties.periodStats;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10",
      "data-ocid": "royalties-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2", children: [
              t("royaltiesTitle"),
              " 👑"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Track your earnings, request payouts, and manage banking info." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/15 border border-primary/30 self-start sm:self-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-semibold", children: t("payoutRate") }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: activeTab === "overview" ? "default" : "outline",
              size: "sm",
              onClick: () => setActiveTab("overview"),
              className: activeTab === "overview" ? "bg-primary text-primary-foreground" : "",
              "data-ocid": "royalties-tab-overview",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 mr-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("periodStats") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Overview" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: activeTab === "banking" ? "default" : "outline",
              size: "sm",
              onClick: () => setActiveTab("banking"),
              className: activeTab === "banking" ? "bg-primary text-primary-foreground" : "",
              "data-ocid": "royalties-tab-banking",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 mr-1.5" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: t("bankingInfo") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Banking" }),
                banking && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 w-2 h-2 rounded-full bg-emerald-400 inline-block" })
              ]
            }
          )
        ] }),
        activeTab === "overview" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5 sm:mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: period, onValueChange: setPeriod, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                SelectTrigger,
                {
                  className: "w-full sm:w-52 bg-card border-border",
                  "data-ocid": "royalties-period-select",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {})
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: PERIODS.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: p.value, children: p.label }, p.value)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                className: "gap-1.5 w-full sm:w-auto",
                disabled: !((_a = royalties == null ? void 0 : royalties.trackBreakdown) == null ? void 0 : _a.length),
                onClick: () => {
                  var _a2;
                  if (!((_a2 = royalties == null ? void 0 : royalties.trackBreakdown) == null ? void 0 : _a2.length)) return;
                  const rows = [
                    [
                      "Track Title",
                      "Previews",
                      "Sales",
                      "Gross Revenue ($)",
                      "Your Earnings ($)"
                    ],
                    ...royalties.trackBreakdown.map((row) => [
                      row.title,
                      String(Number(row.previews)),
                      String(Number(row.sales)),
                      (Number(row.grossRevenueCents) / 100).toFixed(2),
                      (Number(row.earningsCents) / 100).toFixed(2)
                    ])
                  ];
                  const csv = rows.map((r) => r.map((v) => `"${v}"`).join(",")).join("\n");
                  const blob = new Blob([csv], { type: "text/csv" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `royalties-${period.replace(/\s+/g, "-")}.csv`;
                  a.click();
                  URL.revokeObjectURL(url);
                },
                "data-ocid": "royalties-download-report-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" }),
                  "Download Report"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8", children: royaltiesLoading ? ["s0", "s1", "s2", "s3"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20 mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-7 w-16" })
          ] }, key)) : [
            {
              label: t("trackPreviews"),
              value: Number((periodStats == null ? void 0 : periodStats.previews) ?? 0).toLocaleString(),
              icon: Eye,
              sub: t("totalListens")
            },
            {
              label: t("totalSales"),
              value: Number((periodStats == null ? void 0 : periodStats.sales) ?? 0).toLocaleString(),
              icon: ShoppingCart,
              sub: t("unitsSold")
            },
            {
              label: t("grossRevenue"),
              value: `$${(Number((periodStats == null ? void 0 : periodStats.grossRevenueCents) ?? 0) / 100).toFixed(2)}`,
              icon: DollarSign,
              sub: t("beforeSplit")
            },
            {
              label: t("yourPayout"),
              value: `$${(Number((periodStats == null ? void 0 : periodStats.payoutCents) ?? 0) / 100).toFixed(2)}`,
              icon: Wallet,
              sub: t("payoutRate"),
              highlight: true
            }
          ].map(({ label, value, icon: Icon, sub, highlight }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `card-elevated p-4 sm:p-5 ${highlight ? "border-primary/40" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2 sm:mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium uppercase tracking-wide leading-tight pr-1", children: label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Icon,
                    {
                      className: `w-4 h-4 shrink-0 ${highlight ? "text-primary" : "text-muted-foreground"}`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display font-bold text-xl sm:text-2xl ${highlight ? "text-primary" : "text-foreground"}`,
                    children: value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: sub })
              ]
            },
            label
          )) }),
          royaltiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-6 mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40 mb-4" }),
            [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-full mb-2" }, i))
          ] }) : !(royalties == null ? void 0 : royalties.trackBreakdown) || royalties.trackBreakdown.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated flex flex-col items-center py-12 sm:py-16 text-center mb-6 sm:mb-8 px-4",
              "data-ocid": "royalties-empty-tracks",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-12 h-12 text-muted-foreground/30 mb-4" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-2", children: "No royalty data yet." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Upload and sell tracks to see your earnings! 🎵" })
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated overflow-hidden mb-6 sm:mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: "Royalty Breakdown" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
                royalties.trackBreakdown.length,
                " tracks"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: royalties.trackBreakdown.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4 space-y-2",
                "data-ocid": `royalties-track-row-${row.trackId}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate", children: row.title })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-4 gap-y-1 text-xs pl-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Previews:",
                        " "
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: Number(row.previews).toLocaleString() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Sales: " }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: Number(row.sales).toLocaleString() })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Gross: " }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                        "$",
                        (Number(row.grossRevenueCents) / 100).toFixed(2)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
                        "Your cut:",
                        " "
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                        "$",
                        (Number(row.earningsCents) / 100).toFixed(2)
                      ] })
                    ] })
                  ] })
                ]
              },
              String(row.trackId)
            )) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Track Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: t("trackPreviews") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: t("totalSales") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: t("grossRevenue") }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("th", { className: "text-right px-6 py-3 font-medium", children: [
                  t("yourPayout"),
                  " (85%)"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: royalties.trackBreakdown.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-secondary/50 transition-colors-fast",
                  "data-ocid": `royalties-track-row-${row.trackId}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-muted-foreground shrink-0" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-48", children: row.title })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: Number(row.previews).toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right text-muted-foreground", children: Number(row.sales).toLocaleString() }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right text-muted-foreground", children: [
                      "$",
                      (Number(row.grossRevenueCents) / 100).toFixed(2)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-6 py-3 text-right font-semibold text-primary", children: [
                      "$",
                      (Number(row.earningsCents) / 100).toFixed(2)
                    ] })
                  ]
                },
                String(row.trackId)
              )) })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "card-elevated p-4 sm:p-6 mb-6 sm:mb-8 border-primary/20",
              "data-ocid": "royalties-instant-payout",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg text-foreground", children: "INSTANT PAYOUT" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "ml-auto bg-primary/15 text-primary border border-primary/30 text-xs", children: t("payoutRate") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4 sm:mb-5", children: "Funds deposited directly to your bank account. No delays, no middlemen." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1", children: t("availableBalance") }),
                    royaltiesLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-9 w-32" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-3xl text-primary", children: [
                      "$",
                      available.toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "lg",
                      className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold w-full sm:w-auto",
                      onClick: () => payoutMutation.mutate(),
                      disabled: payoutMutation.isPending || available <= 0 || !banking,
                      "data-ocid": "royalties-instant-payout-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                        payoutMutation.isPending ? "Processing..." : t("requestPayout")
                      ]
                    }
                  )
                ] }),
                !banking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 p-3 rounded-md bg-yellow-500/10 border border-yellow-500/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-yellow-400 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-400", children: "Add your banking information in the Banking tab to enable payouts." })
                ] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            PayoutHistoryTable,
            {
              payouts: payouts ?? null,
              payoutsLoading,
              t
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          BankingTab,
          {
            banking: banking ?? null,
            actor,
            sessionToken,
            queryClient,
            t
          }
        )
      ]
    }
  );
}
function PayoutHistoryTable({
  payouts,
  payoutsLoading,
  t
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-elevated overflow-hidden",
      "data-ocid": "royalties-payout-history",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 sm:px-6 py-4 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground", children: t("payoutHistory") }),
          payouts && payouts.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "text-xs", children: [
            payouts.length,
            " payouts"
          ] })
        ] }),
        payoutsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-6 space-y-3", children: Array.from({ length: 3 }, (_, i) => `payout-skel-${i}`).map(
          (key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-32" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-24" })
          ] }, key)
        ) }) : !payouts || payouts.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center py-12 sm:py-14 text-center px-4",
            "data-ocid": "royalties-empty-payouts",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: "w-10 h-10 text-muted-foreground/30 mb-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "No payouts yet. Your earnings will appear here once you request a payout." })
            ]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:hidden divide-y divide-border", children: payouts.map((payout) => {
            const config = STATUS_CONFIG[payout.status] ?? STATUS_CONFIG[PayoutStatus.pending];
            const StatusIcon = config.icon;
            const requestedDate = new Date(
              Number(payout.requestedAt) / 1e6
            ).toLocaleDateString();
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "p-4",
                "data-ocid": `royalties-payout-row-${payout.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `flex items-center gap-1.5 text-xs font-medium ${config.colorClass}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3.5 h-3.5" }),
                          config.label
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-primary", children: [
                      "$",
                      (Number(payout.amountCents) / 100).toFixed(2)
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: requestedDate })
                ]
              },
              String(payout.id)
            );
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-6 py-3 font-medium", children: "Date Requested" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-3 font-medium", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-3 font-medium", children: "Amount" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-6 py-3 font-medium", children: "Processed" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: payouts.map((payout) => {
              const config = STATUS_CONFIG[payout.status] ?? STATUS_CONFIG[PayoutStatus.pending];
              const StatusIcon = config.icon;
              const requestedDate = new Date(
                Number(payout.requestedAt) / 1e6
              ).toLocaleDateString();
              const processedDate = payout.processedAt ? new Date(
                Number(payout.processedAt) / 1e6
              ).toLocaleDateString() : "—";
              return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "hover:bg-secondary/50 transition-colors-fast",
                  "data-ocid": `royalties-payout-row-${payout.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-muted-foreground", children: requestedDate }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `flex items-center gap-1.5 text-xs font-medium ${config.colorClass}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIcon, { className: "w-3.5 h-3.5" }),
                          config.label
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3 text-right font-semibold text-primary", children: [
                      "$",
                      (Number(payout.amountCents) / 100).toFixed(2)
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-6 py-3 text-right text-muted-foreground", children: processedDate })
                  ]
                },
                String(payout.id)
              );
            }) })
          ] }) })
        ] })
      ]
    }
  );
}
function BankingTab({
  banking,
  actor,
  sessionToken,
  queryClient,
  t
}) {
  const [form, setForm] = reactExports.useState({
    accountHolderName: (banking == null ? void 0 : banking.accountHolderName) ?? "",
    bankName: (banking == null ? void 0 : banking.bankName) ?? "",
    routingNumber: (banking == null ? void 0 : banking.routingNumber) ?? "",
    accountNumber: (banking == null ? void 0 : banking.accountNumber) ?? ""
  });
  const [errors, setErrors] = reactExports.useState({});
  reactExports.useEffect(() => {
    if (banking) {
      setForm({
        accountHolderName: banking.accountHolderName,
        bankName: banking.bankName,
        routingNumber: banking.routingNumber,
        accountNumber: banking.accountNumber
      });
    }
  }, [banking]);
  function validate() {
    const next = {};
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
        form.accountNumber
      );
      return unwrapResult(result);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["banking-info"] });
      ue.success("Banking info saved! ✅");
    },
    onError: () => ue.error("Failed to save banking info.")
  });
  const set = (key, val) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: void 0 }));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "w-full max-w-xl space-y-4 sm:space-y-6",
      "data-ocid": "royalties-banking-tab",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 border-primary/30 flex items-center gap-3 sm:gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/15 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-base sm:text-lg", children: "85%" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm", children: t("payoutRate") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-0.5", children: "You keep 85% of every sale. Chosen One Distribution retains 15% platform fee." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 sm:p-6 space-y-4 sm:space-y-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1 sm:mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: t("bankingInfo") }),
            banking && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 text-xs ml-auto", children: "Saved" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bank-account-name", children: t("accountHolder") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bank-account-name",
                value: form.accountHolderName,
                onChange: (e) => set("accountHolderName", e.target.value),
                placeholder: "Full legal name as it appears on your bank account",
                className: "bg-secondary border-border",
                "data-ocid": "banking-account-name-input"
              }
            ),
            errors.accountHolderName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", children: errors.accountHolderName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bank-name", children: t("bankName") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "bank-name",
                value: form.bankName,
                onChange: (e) => set("bankName", e.target.value),
                placeholder: "e.g. Chase, Wells Fargo, Bank of America",
                className: "bg-secondary border-border",
                "data-ocid": "banking-bank-name-input"
              }
            ),
            errors.bankName && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", children: errors.bankName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bank-routing", children: t("routingNumber") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bank-routing",
                  value: form.routingNumber,
                  onChange: (e) => set("routingNumber", e.target.value.replace(/\D/g, "")),
                  placeholder: "9 digits",
                  maxLength: 9,
                  inputMode: "numeric",
                  className: "bg-secondary border-border font-mono",
                  "data-ocid": "banking-routing-input"
                }
              ),
              errors.routingNumber ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", children: errors.routingNumber }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "9-digit ABA routing number" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "bank-account", children: t("accountNumber") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "bank-account",
                  value: form.accountNumber,
                  onChange: (e) => set("accountNumber", e.target.value),
                  placeholder: "Account number",
                  className: "bg-secondary border-border font-mono",
                  "data-ocid": "banking-account-input"
                }
              ),
              errors.accountNumber && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-destructive text-xs", children: errors.accountNumber })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 sm:p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-yellow-400 shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-yellow-400 mb-0.5", children: "Real banking information required for payout processing." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-yellow-400/80", children: "Your information is stored securely and used only for processing your royalty payouts. Chosen One Distribution will never share your banking details with third parties." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
              onClick: () => {
                if (validate()) saveMutation.mutate();
              },
              disabled: saveMutation.isPending,
              "data-ocid": "banking-save-btn",
              children: saveMutation.isPending ? "Saving..." : banking ? "Update Banking Info" : t("saveBanking")
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-4 flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-muted-foreground shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Payouts are processed from the Overview tab once you have an available balance. Standard bank transfers may take 2–5 business days depending on your financial institution." })
        ] })
      ]
    }
  );
}
export {
  Royalties as default
};
