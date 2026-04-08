import { t as createLucideIcon, u as useTranslation, c as useActor, r as reactExports, l as ue, N as ArtistStatus, j as jsxRuntimeExports, I as Input, B as Button, o as Separator, z as hashPin, e as useQuery, a as ChartNoAxesColumn, S as ShoppingBag, y as DollarSign, f as createActor } from "./index-gcvG85BJ.js";
import { B as Badge } from "./badge-CnImlErL.js";
import { S as Skeleton, T as TrendingUp } from "./skeleton-DPmAA1F9.js";
import { S as Shield } from "./shield-CrZXF6CV.js";
import { L as Lock } from "./lock-f6iDfLaD.js";
import { K as KeyRound } from "./key-round-DSAMY_7D.js";
import { C as CircleCheck } from "./circle-check-D8LLCo8l.js";
import { R as RefreshCw } from "./refresh-cw-DCeakUg2.js";
import { U as Users } from "./users-DprdoC2E.js";
import { T as Trash2 } from "./trash-2-B3rotxkz.js";
import { E as Eye } from "./eye-Ca1kcx0X.js";
import { M as Music } from "./music-BVc9opxk.js";
import { C as CreditCard } from "./credit-card-Ckwh3erq.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
];
const Settings = createLucideIcon("settings", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m16 11 2 2 4-4", key: "9rsbq5" }],
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const UserCheck = createLucideIcon("user-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "17", x2: "22", y1: "8", y2: "13", key: "3nzzx3" }],
  ["line", { x1: "22", x2: "17", y1: "8", y2: "13", key: "1swrse" }]
];
const UserX = createLucideIcon("user-x", __iconNode);
const ADMIN_TOKEN_KEY = "admin-token";
function formatDate(ts) {
  const ms = Number(ts) / 1e6;
  return new Date(ms).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  });
}
function formatLastLogin(ts) {
  if (ts == null) return "Never";
  const ms = Number(ts) / 1e6;
  const now = Date.now();
  const diffMs = now - ms;
  const diffSec = Math.floor(diffMs / 1e3);
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
    minute: "2-digit"
  });
}
function TrafficPanel({ actor, adminToken }) {
  const {
    data: trafficStats,
    dataUpdatedAt,
    isLoading: trafficLoading,
    refetch
  } = useQuery({
    queryKey: ["admin-traffic-stats", adminToken],
    queryFn: async () => {
      if (!actor || !adminToken) return null;
      const result = await actor.getAdminTrafficStats(adminToken);
      if (result.__kind__ === "ok") return result.ok;
      return null;
    },
    enabled: !!actor && !!adminToken,
    refetchInterval: 1e4
  });
  const { data: tracks = [] } = useQuery({
    queryKey: ["admin-traffic-tracks"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPublishedTracks();
    },
    enabled: !!actor,
    refetchInterval: 3e4
  });
  const topTracks = [...tracks].sort((a, b) => Number(b.saleCount) - Number(a.saleCount)).slice(0, 5);
  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : "—";
  const grossRevenueCents = trafficStats ? Number(trafficStats.grossRevenueCents) : 0;
  const statCards = [
    {
      label: "Active Visitors",
      value: trafficStats ? Number(trafficStats.activeVisitors).toLocaleString() : "—",
      icon: Eye,
      color: "text-red-400",
      bg: "bg-red-500/10 border-red-500/20",
      pulse: true
    },
    {
      label: "Page Views (5 min)",
      value: trafficStats ? Number(trafficStats.pageViewsLast5Min).toLocaleString() : "—",
      icon: Activity,
      color: "text-sky-400",
      bg: "bg-sky-500/10 border-sky-500/20",
      pulse: false
    },
    {
      label: "Previews Played Today",
      value: trafficStats ? Number(trafficStats.totalPreviewsAllTime).toLocaleString() : "—",
      icon: ChartNoAxesColumn,
      color: "text-sky-300",
      bg: "bg-sky-500/10 border-sky-400/20",
      pulse: false
    },
    {
      label: "Purchases (24h)",
      value: trafficStats ? Number(trafficStats.recentPurchases).toLocaleString() : "—",
      icon: ShoppingBag,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10 border-emerald-500/20",
      pulse: false
    },
    {
      label: "New Sign-ups (24h)",
      value: trafficStats ? Number(trafficStats.recentSignups).toLocaleString() : "—",
      icon: Users,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
      pulse: false
    },
    {
      label: "Published Tracks",
      value: trafficStats ? Number(trafficStats.totalPublishedTracks).toLocaleString() : "—",
      icon: Music,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      pulse: false
    },
    {
      label: "Total Sales",
      value: trafficStats ? Number(trafficStats.totalSalesAllTime).toLocaleString() : "—",
      icon: TrendingUp,
      color: "text-amber-400",
      bg: "bg-amber-500/10 border-amber-500/20",
      pulse: false
    },
    {
      label: "Gross Revenue",
      value: `$${(grossRevenueCents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-primary",
      bg: "bg-primary/10 border-primary/20",
      pulse: false
    },
    {
      label: "Artist Payouts (85%)",
      value: `$${(grossRevenueCents * 0.85 / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      icon: ChartNoAxesColumn,
      color: "text-violet-400",
      bg: "bg-violet-500/10 border-violet-500/20",
      pulse: false
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden",
      "data-ocid": "admin-traffic-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Real-Time Platform Traffic" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 ml-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-red-500 animate-pulse" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-red-400 font-semibold", children: "LIVE" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: trafficLoading ? "Refreshing..." : `Updated: ${lastUpdated}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => refetch(),
                disabled: trafficLoading,
                className: "gap-1.5 h-7 text-xs",
                "data-ocid": "traffic-refresh-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `w-3 h-3 ${trafficLoading ? "animate-spin" : ""}`
                    }
                  ),
                  "Refresh"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4", children: statCards.map(({ label, value, icon: Icon, color, bg, pulse }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: `rounded-xl border p-3 sm:p-4 ${bg}`,
              "data-ocid": `traffic-stat-${label.toLowerCase().replace(/[\s()/%]/g, "-")}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2 sm:mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative ${pulse ? "shrink-0" : ""}`, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-4 h-4 ${color}` }),
                    pulse && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-red-500 animate-ping" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium truncate", children: label })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-xl sm:text-2xl font-bold font-display ${color} tabular-nums`,
                    children: value
                  }
                )
              ]
            },
            label
          )) }),
          trafficStats && trafficStats.pageViewsBySection.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
              "Page Views by Section (Last 5 min)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-2", children: trafficStats.pageViewsBySection.map(([section, count]) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-between bg-muted/30 border border-border rounded-lg px-3 py-2",
                "data-ocid": `traffic-section-${section.toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground capitalize truncate", children: section }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-primary tabular-nums ml-2 shrink-0", children: Number(count).toLocaleString() })
                ]
              },
              section
            )) })
          ] }),
          topTracks.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-semibold text-foreground text-sm mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-primary" }),
              "Top Selling Tracks"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topTracks.map((track, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-3 bg-muted/30 border border-border rounded-lg px-3 sm:px-4 py-2.5",
                "data-ocid": `traffic-top-track-${track.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-muted-foreground w-5 shrink-0 text-center", children: idx + 1 }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: track.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground truncate", children: [
                      track.artistName,
                      " · ",
                      track.genre
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 sm:gap-3 shrink-0 text-xs text-muted-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden sm:flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-3 h-3 text-emerald-400" }),
                      Number(track.saleCount).toLocaleString()
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-semibold", children: [
                      "$",
                      (Number(track.priceInCents) / 100).toFixed(2)
                    ] })
                  ] })
                ]
              },
              String(track.id)
            )) })
          ] })
        ] })
      ]
    }
  );
}
function StripeConfigPanel({ actor, adminToken }) {
  const [secretKey, setSecretKey] = reactExports.useState("");
  const [allowedCountries, setAllowedCountries] = reactExports.useState(
    "US,CA,GB,AU,DE,FR,JP,BR,MX"
  );
  const [isSaving, setIsSaving] = reactExports.useState(false);
  const [saveStatus, setSaveStatus] = reactExports.useState(
    "idle"
  );
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const { data: isConfigured, refetch: refetchConfigured } = useQuery({
    queryKey: ["stripe-is-configured"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isStripeConfigured();
    },
    enabled: !!actor
  });
  const handleSave = async (e) => {
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
      const countries = allowedCountries.split(",").map((c) => c.trim().toUpperCase()).filter(Boolean);
      await actor.setStripeConfiguration(adminToken, {
        secretKey: secretKey.trim(),
        allowedCountries: countries
      });
      setSaveStatus("success");
      setSecretKey("");
      ue.success(
        "Stripe configuration saved! Live payments are now active. 💳"
      );
      await refetchConfigured();
    } catch {
      setErrorMsg("Failed to save Stripe configuration. Please try again.");
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "bg-card border border-border rounded-2xl overflow-hidden",
      "data-ocid": "admin-stripe-config-panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-5 h-5 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "Stripe Payment Configuration" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: isConfigured ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-emerald-400 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Live Payments Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Active" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-yellow-400 font-semibold", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Not Configured" })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mb-5 leading-relaxed", children: [
            "Configure your live Stripe secret key to enable real payments (Apple Pay, Google Pay, PayPal, CashApp, Zelle, and card). Use your",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "live" }),
            " key starting with",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "bg-muted/40 px-1 rounded text-xs", children: "sk_live_" }),
            ". Changes take effect immediately."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSave, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "label",
                {
                  htmlFor: "stripe-secret-key",
                  className: "text-sm font-medium text-foreground block mb-2",
                  children: [
                    "Stripe Secret Key ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stripe-secret-key",
                  type: "password",
                  value: secretKey,
                  onChange: (e) => setSecretKey(e.target.value),
                  placeholder: "sk_live_...",
                  className: "bg-secondary border-border font-mono text-sm",
                  "data-ocid": "stripe-secret-key-input",
                  autoComplete: "off"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Your Stripe secret key from the Stripe Dashboard → Developers → API Keys" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "stripe-countries",
                  className: "text-sm font-medium text-foreground block mb-2",
                  children: "Allowed Countries (comma-separated ISO codes)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "stripe-countries",
                  type: "text",
                  value: allowedCountries,
                  onChange: (e) => setAllowedCountries(e.target.value),
                  placeholder: "US,CA,GB,AU,...",
                  className: "bg-secondary border-border font-mono text-sm",
                  "data-ocid": "stripe-countries-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "2-letter country codes for which payment methods are enabled." })
            ] }),
            saveStatus === "error" && errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0" }),
              errorMsg
            ] }),
            saveStatus === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-emerald-400 text-sm bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-4 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 shrink-0" }),
              "Stripe configuration saved. Live payments are active."
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: isSaving || !secretKey.trim(),
                className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold w-full sm:w-auto",
                "data-ocid": "stripe-config-save-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4" }),
                  isSaving ? "Saving..." : "Save Stripe Configuration"
                ]
              }
            ) })
          ] })
        ] })
      ]
    }
  );
}
function AdminPage() {
  const { t } = useTranslation();
  const { actor } = useActor(createActor);
  const [adminToken, setAdminToken] = reactExports.useState(
    () => sessionStorage.getItem(ADMIN_TOKEN_KEY)
  );
  const [loginMode, setLoginMode] = reactExports.useState("login");
  const [pin, setPin] = reactExports.useState("");
  const [showPin, setShowPin] = reactExports.useState(false);
  const [loginError, setLoginError] = reactExports.useState("");
  const [isLoggingIn, setIsLoggingIn] = reactExports.useState(false);
  const [newSetPin, setNewSetPin] = reactExports.useState("");
  const [confirmSetPin, setConfirmSetPin] = reactExports.useState("");
  const [showSetPin, setShowSetPin] = reactExports.useState(false);
  const [showConfirmSetPin, setShowConfirmSetPin] = reactExports.useState(false);
  const [setInitialPinError, setSetInitialPinError] = reactExports.useState("");
  const [isSettingPin, setIsSettingPin] = reactExports.useState(false);
  const [artists, setArtists] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(false);
  const [currentPIN, setCurrentPIN] = reactExports.useState("");
  const [newPIN, setNewPIN] = reactExports.useState("");
  const [confirmPIN, setConfirmPIN] = reactExports.useState("");
  const [changePINError, setChangePINError] = reactExports.useState("");
  const [isChangingPIN, setIsChangingPIN] = reactExports.useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = reactExports.useState(null);
  const [resetPinArtistId, setResetPinArtistId] = reactExports.useState(null);
  const [newArtistPIN, setNewArtistPIN] = reactExports.useState("");
  const [resetPinError, setResetPinError] = reactExports.useState("");
  const [isResettingPIN, setIsResettingPIN] = reactExports.useState(false);
  const refreshIntervalRef = reactExports.useRef(
    null
  );
  const fetchArtists = reactExports.useCallback(async () => {
    var _a, _b;
    if (!actor || !adminToken) return;
    setIsLoading(true);
    try {
      const result = await actor.adminListArtists(adminToken);
      if (result.__kind__ === "ok") {
        setArtists(result.ok);
      } else {
        ue.error(result.err || "Failed to load artists");
        if (((_a = result.err) == null ? void 0 : _a.toLowerCase().includes("session")) || ((_b = result.err) == null ? void 0 : _b.toLowerCase().includes("auth"))) {
          setAdminToken(null);
          sessionStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      }
    } catch {
      ue.error("Failed to load artists");
    } finally {
      setIsLoading(false);
    }
  }, [actor, adminToken]);
  reactExports.useEffect(() => {
    if (adminToken) {
      fetchArtists();
      refreshIntervalRef.current = setInterval(fetchArtists, 3e4);
    }
    return () => {
      if (refreshIntervalRef.current) clearInterval(refreshIntervalRef.current);
    };
  }, [adminToken, fetchArtists]);
  const handleLogin = async (e) => {
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
        ue.success("Welcome, Admin 👑");
      } else {
        setLoginError(result.err || "Invalid admin PIN");
      }
    } catch {
      setLoginError("Login failed. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };
  const callAdminInitializePIN = async (newPinHash) => {
    const rawActor = actor;
    if (typeof (rawActor == null ? void 0 : rawActor.adminInitializePIN) === "function") {
      const result = await rawActor.adminInitializePIN(newPinHash);
      if (result && typeof result === "object") {
        if ("ok" in result) return { __kind__: "ok", ok: null };
        if ("err" in result)
          return { __kind__: "err", err: String(result.err) };
      }
    }
    return { __kind__: "err", err: "adminInitializePIN not available" };
  };
  const handleSetInitialPIN = async (e) => {
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
      const loginResult = await actor.adminLogin(defaultPinHash);
      if (loginResult.__kind__ === "ok") {
        const tempToken = loginResult.ok;
        const changeResult = await actor.adminChangePIN(
          tempToken,
          defaultPinHash,
          newPinHash
        );
        try {
          await actor.adminLogout(tempToken);
        } catch {
        }
        if (changeResult.__kind__ === "ok") {
          const finalLogin = await actor.adminLogin(newPinHash);
          if (finalLogin.__kind__ === "ok") {
            sessionStorage.setItem(ADMIN_TOKEN_KEY, finalLogin.ok);
            setAdminToken(finalLogin.ok);
          }
          ue.success(
            "Admin PIN set to 8914! 👑 Welcome to the control panel."
          );
          setNewSetPin("");
          setConfirmSetPin("");
          setSetInitialPinError("");
          return;
        }
        setSetInitialPinError(
          changeResult.err || "Could not set PIN. If you already have a PIN, use the Sign In tab."
        );
        return;
      }
      const initResult = await callAdminInitializePIN(newPinHash);
      if (initResult.__kind__ === "ok") {
        const finalLogin = await actor.adminLogin(newPinHash);
        if (finalLogin.__kind__ === "ok") {
          sessionStorage.setItem(ADMIN_TOKEN_KEY, finalLogin.ok);
          setAdminToken(finalLogin.ok);
          ue.success("Admin PIN set! 👑 Welcome to the control panel.");
          setNewSetPin("");
          setConfirmSetPin("");
          setSetInitialPinError("");
          return;
        }
        ue.success("Admin PIN set! 👑 Please sign in with your new PIN.");
        setLoginMode("login");
        setNewSetPin("");
        setConfirmSetPin("");
        setSetInitialPinError("");
        return;
      }
      setSetInitialPinError(
        "PIN is already set — please use the Sign In tab to enter your existing PIN."
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
      }
    }
  };
  const handleSuspend = async (artistId) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminSuspendArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        ue.success("Artist suspended");
        await fetchArtists();
      } else {
        ue.error(result.err || "Failed to suspend artist");
      }
    } catch {
      ue.error("Action failed");
    }
  };
  const handleUnsuspend = async (artistId) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminUnsuspendArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        ue.success("Artist reactivated");
        await fetchArtists();
      } else {
        ue.error(result.err || "Failed to unsuspend artist");
      }
    } catch {
      ue.error("Action failed");
    }
  };
  const handleDelete = async (artistId) => {
    if (!actor || !adminToken) return;
    try {
      const result = await actor.adminDeleteArtist(adminToken, artistId);
      if (result.__kind__ === "ok") {
        ue.success("Artist permanently deleted");
        setDeleteConfirmId(null);
        await fetchArtists();
      } else {
        ue.error(result.err || "Failed to delete artist");
      }
    } catch {
      ue.error("Action failed");
    }
  };
  const handleResetArtistPIN = async (artistId, artistName) => {
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
        pinHash
      );
      if (result.__kind__ === "ok") {
        ue.success(`PIN reset successfully for ${artistName}.`);
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
  const handleChangePIN = async (e) => {
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
        newHash
      );
      if (result.__kind__ === "ok") {
        ue.success("Admin PIN updated successfully 👑");
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
    suspended: artists.filter((a) => a.status === ArtistStatus.suspended).length,
    deleted: artists.filter((a) => a.status === ArtistStatus.deleted).length
  };
  const setPinMismatch = confirmSetPin.length > 0 && newSetPin !== confirmSetPin;
  if (!adminToken) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-[80vh] flex items-center justify-center px-4 py-12",
        "data-ocid": "admin-auth-page",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-16 h-16 rounded-full bg-primary/10 border-2 border-primary/40 flex items-center justify-center gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-primary" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground mb-1", children: "Admin Control Panel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-semibold text-sm tracking-wide", children: "👑 Chosen One Productions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-xl border border-border bg-muted/30 p-1 mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setLoginMode("login");
                  setLoginError("");
                  setSetInitialPinError("");
                },
                className: `flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${loginMode === "login" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "admin-tab-login",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3.5 h-3.5" }),
                  "Sign In"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => {
                  setLoginMode("set-pin");
                  setLoginError("");
                  setSetInitialPinError("");
                },
                className: `flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${loginMode === "set-pin" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                "data-ocid": "admin-tab-set-pin",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "w-3.5 h-3.5" }),
                  "First-time Setup"
                ]
              }
            )
          ] }),
          loginMode === "login" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-2xl p-6 sm:p-8 gold-glow",
              "data-ocid": "admin-login-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-5 text-center", children: "Enter your admin PIN to access the control panel." }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "admin-pin",
                        className: "text-sm font-medium text-foreground block mb-2",
                        children: "Admin PIN"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-pin",
                          type: showPin ? "text" : "password",
                          inputMode: "numeric",
                          value: pin,
                          onChange: (e) => {
                            setPin(e.target.value.replace(/\D/g, "").slice(0, 6));
                            setLoginError("");
                          },
                          placeholder: "Enter your PIN",
                          className: "bg-secondary border-border text-center text-lg tracking-widest pr-10",
                          "data-ocid": "admin-pin-input",
                          maxLength: 6,
                          autoFocus: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200",
                          onClick: () => setShowPin((v) => !v),
                          "aria-label": showPin ? "Hide PIN" : "Show PIN",
                          tabIndex: -1,
                          children: showPin ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Hide" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "Show" })
                        }
                      )
                    ] }),
                    loginError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-sm mt-2 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                      loginError
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      disabled: isLoggingIn || pin.length < 4,
                      className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold h-11",
                      "data-ocid": "admin-login-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                        isLoggingIn ? "Authenticating..." : "Enter Admin Panel"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-5", children: [
                  "First time?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-primary hover:underline",
                      onClick: () => setLoginMode("set-pin"),
                      children: "First-time setup →"
                    }
                  )
                ] })
              ]
            }
          ),
          loginMode === "set-pin" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-primary/30 rounded-2xl p-6 sm:p-8",
              "data-ocid": "admin-set-pin-panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-5 h-5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground", children: "First-Time Setup" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mb-5 leading-relaxed", children: [
                  "Use this tab to set your admin PIN for the first time — this only works if no PIN has been set yet. Choose a secure 4–6 digit PIN that only you know. Once set, use the",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Sign In" }),
                  " tab to enter the panel."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSetInitialPIN, className: "space-y-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "admin-set-pin-new",
                        className: "text-sm font-medium text-foreground block",
                        children: "New Admin PIN (4–6 digits)"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-set-pin-new",
                          type: showSetPin ? "text" : "password",
                          inputMode: "numeric",
                          value: newSetPin,
                          onChange: (e) => {
                            setNewSetPin(
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            );
                            setSetInitialPinError("");
                          },
                          placeholder: "Choose a 4–6 digit PIN",
                          className: "bg-secondary border-border text-center text-lg tracking-widest pr-10",
                          "data-ocid": "admin-set-pin-new-input",
                          maxLength: 6,
                          autoFocus: true
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs",
                          onClick: () => setShowSetPin((v) => !v),
                          "aria-label": showSetPin ? "Hide PIN" : "Show PIN",
                          tabIndex: -1,
                          children: showSetPin ? "Hide" : "Show"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "admin-set-pin-confirm",
                        className: "text-sm font-medium text-foreground block",
                        children: "Confirm PIN"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-set-pin-confirm",
                          type: showConfirmSetPin ? "text" : "password",
                          inputMode: "numeric",
                          value: confirmSetPin,
                          onChange: (e) => {
                            setConfirmSetPin(
                              e.target.value.replace(/\D/g, "").slice(0, 6)
                            );
                            setSetInitialPinError("");
                          },
                          placeholder: "Re-enter your PIN",
                          className: `bg-secondary border-border text-center text-lg tracking-widest pr-10 ${setPinMismatch ? "border-destructive focus-visible:ring-destructive" : ""}`,
                          "data-ocid": "admin-set-pin-confirm-input",
                          maxLength: 6
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-xs",
                          onClick: () => setShowConfirmSetPin((v) => !v),
                          "aria-label": showConfirmSetPin ? "Hide PIN" : "Show PIN",
                          tabIndex: -1,
                          children: showConfirmSetPin ? "Hide" : "Show"
                        }
                      )
                    ] }),
                    setPinMismatch && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "PINs do not match" })
                  ] }),
                  newSetPin.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 p-2.5 rounded-lg bg-primary/5 border border-primary/20", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5 text-primary shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: newSetPin.length < 4 ? `Enter ${4 - newSetPin.length} more digit${4 - newSetPin.length === 1 ? "" : "s"}` : newSetPin.length === 6 ? "Strong — 6-digit PIN" : `Good — ${newSetPin.length}-digit PIN` })
                  ] }),
                  setInitialPinError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: setInitialPinError })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "submit",
                      disabled: isSettingPin || newSetPin.length < 4 || newSetPin !== confirmSetPin,
                      className: "w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold h-11",
                      "data-ocid": "admin-set-pin-submit",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }),
                        isSettingPin ? "Setting PIN..." : "Set Admin PIN"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center mt-5", children: [
                  "Already have a PIN?",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      className: "text-primary hover:underline",
                      onClick: () => setLoginMode("login"),
                      children: "Sign in →"
                    }
                  )
                ] })
              ]
            }
          )
        ] })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 py-6 sm:py-10 space-y-6 sm:space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 sm:gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 sm:w-6 sm:h-6 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl sm:text-2xl font-bold text-foreground leading-tight", children: "Admin Control Panel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-sm font-semibold", children: "👑 Chosen One Productions" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: fetchArtists,
            disabled: isLoading,
            className: "gap-2",
            "data-ocid": "admin-refresh-btn",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                RefreshCw,
                {
                  className: `w-4 h-4 ${isLoading ? "animate-spin" : ""}`
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Refresh" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleLogout,
            "data-ocid": "admin-logout-btn",
            children: t("signOut")
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TrafficPanel, { actor, adminToken }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StripeConfigPanel, { actor, adminToken }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-primary/20 rounded-2xl overflow-hidden",
        "data-ocid": "admin-pin-settings-panel",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 justify-between bg-primary/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground leading-tight", children: "Admin PIN Settings" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Change your admin access PIN. Current PIN required." })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 border border-primary/20 rounded-full px-3 py-1 w-fit", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }),
              "Protected"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 bg-muted/30 border border-border rounded-xl px-4 py-3 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary mt-0.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
                "Your admin PIN controls access to this control panel. PINs must be",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "4–6 digits" }),
                ". Your current PIN is required to set a new one. Keep your PIN private."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleChangePIN,
                className: "space-y-5",
                "data-ocid": "admin-pin-settings-form",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "admin-current-pin",
                        className: "text-sm font-medium text-foreground block mb-2",
                        children: [
                          "Current PIN ",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "admin-current-pin",
                        type: "password",
                        inputMode: "numeric",
                        value: currentPIN,
                        onChange: (e) => {
                          setCurrentPIN(e.target.value.replace(/\D/g, ""));
                          setChangePINError("");
                        },
                        placeholder: "Enter current PIN",
                        className: "bg-secondary border-border text-center text-lg tracking-widest max-w-xs",
                        maxLength: 6,
                        "data-ocid": "admin-current-pin",
                        autoComplete: "current-password"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "admin-new-pin",
                          className: "text-sm font-medium text-foreground block mb-2",
                          children: [
                            "New PIN ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-new-pin",
                          type: "password",
                          inputMode: "numeric",
                          value: newPIN,
                          onChange: (e) => {
                            setNewPIN(e.target.value.replace(/\D/g, ""));
                            setChangePINError("");
                          },
                          placeholder: "4–6 digits",
                          className: "bg-secondary border-border text-center text-lg tracking-widest",
                          maxLength: 6,
                          "data-ocid": "admin-new-pin",
                          autoComplete: "new-password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1.5", children: "Numbers only, 4–6 digits" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "label",
                        {
                          htmlFor: "admin-confirm-pin",
                          className: "text-sm font-medium text-foreground block mb-2",
                          children: [
                            "Confirm New PIN ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive", children: "*" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "admin-confirm-pin",
                          type: "password",
                          inputMode: "numeric",
                          value: confirmPIN,
                          onChange: (e) => {
                            setConfirmPIN(e.target.value.replace(/\D/g, ""));
                            setChangePINError("");
                          },
                          placeholder: "Re-enter new PIN",
                          className: `bg-secondary border-border text-center text-lg tracking-widest ${confirmPIN.length > 0 && confirmPIN !== newPIN ? "border-destructive/60" : confirmPIN.length > 0 && confirmPIN === newPIN && newPIN.length >= 4 ? "border-emerald-500/60" : ""}`,
                          maxLength: 6,
                          "data-ocid": "admin-confirm-pin",
                          autoComplete: "new-password"
                        }
                      ),
                      confirmPIN.length > 0 && confirmPIN !== newPIN && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-destructive mt-1.5 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 shrink-0" }),
                        "PINs don't match"
                      ] }),
                      confirmPIN.length > 0 && confirmPIN === newPIN && newPIN.length >= 4 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-400 mt-1.5 flex items-center gap-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3 shrink-0" }),
                        "PINs match"
                      ] })
                    ] })
                  ] }),
                  changePINError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive text-sm bg-destructive/10 border border-destructive/20 rounded-lg px-4 py-3 max-w-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 shrink-0" }),
                    changePINError
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-1", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: isChangingPIN || !currentPIN || newPIN.length < 4 || newPIN !== confirmPIN,
                        className: "bg-primary text-primary-foreground hover:bg-primary/90 gap-2 font-semibold gold-glow",
                        "data-ocid": "admin-pin-settings-submit",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
                          isChangingPIN ? "Updating PIN..." : "Update Admin PIN"
                        ]
                      }
                    ),
                    (currentPIN || newPIN || confirmPIN) && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        onClick: () => {
                          setCurrentPIN("");
                          setNewPIN("");
                          setConfirmPIN("");
                          setChangePINError("");
                        },
                        className: "text-muted-foreground hover:text-foreground",
                        children: "Clear"
                      }
                    )
                  ] })
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4",
        "data-ocid": "admin-stats-bar",
        children: [
          {
            label: "Total Artists",
            value: counts.total,
            color: "text-foreground",
            icon: Users
          },
          {
            label: "Active",
            value: counts.active,
            color: "text-green-400",
            icon: UserCheck
          },
          {
            label: "Suspended",
            value: counts.suspended,
            color: "text-yellow-400",
            icon: UserX
          },
          {
            label: "Deleted",
            value: counts.deleted,
            color: "text-destructive",
            icon: Trash2
          }
        ].map(({ label, value, color, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-border rounded-xl p-3 sm:p-4 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: `w-5 h-5 mx-auto mb-2 ${color}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `text-2xl sm:text-3xl font-bold font-display ${color}`,
                  children: value
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-1 font-medium", children: label })
            ]
          },
          label
        ))
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "bg-card border border-border rounded-2xl overflow-hidden",
        "data-ocid": "admin-artists-table",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-6 py-4 border-b border-border flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-bold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-5 h-5 text-primary" }),
              t("adminArtists")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm", children: [
              artists.length,
              " ",
              artists.length === 1 ? "artist" : "artists"
            ] })
          ] }),
          isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 py-6 space-y-3", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-9 h-9 rounded-full shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-48" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-32" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-6 w-20 rounded-full hidden sm:block" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-24 rounded-lg hidden sm:block" })
          ] }, i)) }) : artists.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-16 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 text-muted-foreground mx-auto mb-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground font-medium", children: "No artists registered yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Artists will appear here once they sign up." })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid px-6 py-2 grid-cols-[1fr_auto_auto_auto_auto] gap-4 border-b border-border bg-muted/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Artist" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Joined" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Last Login" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground text-right", children: "Actions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y divide-border", children: artists.map((artist) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { "data-ocid": `admin-artist-${artist.id}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid px-6 py-4 grid-cols-[1fr_auto_auto_auto_auto] gap-4 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-bold", children: artist.name.charAt(0).toUpperCase() }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: artist.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate font-mono", children: artist.id })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground shrink-0", children: formatDate(artist.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "text-sm shrink-0 tabular-nums",
                    "data-ocid": `admin-artist-last-login-${artist.id}`,
                    title: artist.lastLoginAt ? new Date(
                      Number(artist.lastLoginAt) / 1e6
                    ).toLocaleString() : "Never logged in",
                    children: artist.lastLoginAt ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: formatLastLogin(artist.lastLoginAt) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground italic", children: "Never" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0", children: [
                  artist.status === ArtistStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30 border", children: t("active") }),
                  artist.status === ArtistStatus.suspended && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border", children: t("suspended") }),
                  artist.status === ArtistStatus.deleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/15 text-destructive border-destructive/30 border", children: t("deleted") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 justify-end", children: [
                  artist.status === ArtistStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
                      onClick: () => handleSuspend(artist.id),
                      "data-ocid": `admin-suspend-${artist.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" }),
                        t("suspend")
                      ]
                    }
                  ),
                  artist.status === ArtistStatus.suspended && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 text-xs border-green-500/30 text-green-400 hover:bg-green-500/10",
                      onClick: () => handleUnsuspend(artist.id),
                      "data-ocid": `admin-unsuspend-${artist.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }),
                        t("unsuspend")
                      ]
                    }
                  ),
                  artist.status !== ArtistStatus.deleted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10",
                        onClick: () => {
                          if (resetPinArtistId === artist.id) {
                            setResetPinArtistId(null);
                            setNewArtistPIN("");
                            setResetPinError("");
                          } else {
                            setResetPinArtistId(artist.id);
                            setNewArtistPIN("");
                            setResetPinError("");
                          }
                        },
                        "data-ocid": `admin-reset-pin-btn-${artist.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5" }),
                          "Reset PIN"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: deleteConfirmId === artist.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive font-medium", children: "Confirm?" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "text-xs h-7 px-2 border-destructive/40 text-destructive hover:bg-destructive/10",
                          onClick: () => handleDelete(artist.id),
                          "data-ocid": `admin-delete-confirm-${artist.id}`,
                          children: "Yes"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-xs h-7 px-2",
                          onClick: () => setDeleteConfirmId(null),
                          children: "No"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteConfirmId(artist.id),
                        "data-ocid": `admin-delete-${artist.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          t("delete")
                        ]
                      }
                    ) })
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden px-4 py-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-bold", children: artist.name.charAt(0).toUpperCase() }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate", children: artist.name }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                      artist.status === ArtistStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-500/15 text-green-400 border-green-500/30 border text-xs", children: "Active" }),
                      artist.status === ArtistStatus.suspended && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30 border text-xs", children: "Suspended" }),
                      artist.status === ArtistStatus.deleted && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-destructive/15 text-destructive border-destructive/30 border text-xs", children: "Deleted" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                        "Joined ",
                        formatDate(artist.createdAt)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                      "Last login:",
                      " ",
                      artist.lastLoginAt ? formatLastLogin(artist.lastLoginAt) : "Never"
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                  artist.status === ArtistStatus.active && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 text-xs border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10",
                      onClick: () => handleSuspend(artist.id),
                      "data-ocid": `admin-mobile-suspend-${artist.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserX, { className: "w-3.5 h-3.5" }),
                        "Suspend"
                      ]
                    }
                  ),
                  artist.status === ArtistStatus.suspended && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      size: "sm",
                      variant: "outline",
                      className: "gap-1.5 text-xs border-green-500/30 text-green-400 hover:bg-green-500/10",
                      onClick: () => handleUnsuspend(artist.id),
                      "data-ocid": `admin-mobile-unsuspend-${artist.id}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "w-3.5 h-3.5" }),
                        "Reactivate"
                      ]
                    }
                  ),
                  artist.status !== ArtistStatus.deleted && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5 text-xs border-primary/30 text-primary hover:bg-primary/10",
                        onClick: () => {
                          setResetPinArtistId(
                            resetPinArtistId === artist.id ? null : artist.id
                          );
                          setNewArtistPIN("");
                          setResetPinError("");
                        },
                        "data-ocid": `admin-mobile-reset-pin-${artist.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-3.5 h-3.5" }),
                          "Reset PIN"
                        ]
                      }
                    ),
                    deleteConfirmId === artist.id ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          className: "text-xs border-destructive/40 text-destructive hover:bg-destructive/10",
                          onClick: () => handleDelete(artist.id),
                          "data-ocid": `admin-mobile-delete-confirm-${artist.id}`,
                          children: "Confirm Delete"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "ghost",
                          className: "text-xs",
                          onClick: () => setDeleteConfirmId(null),
                          children: "Cancel"
                        }
                      )
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "sm",
                        variant: "outline",
                        className: "gap-1.5 text-xs border-destructive/30 text-destructive hover:bg-destructive/10",
                        onClick: () => setDeleteConfirmId(artist.id),
                        "data-ocid": `admin-mobile-delete-${artist.id}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                          "Delete"
                        ]
                      }
                    )
                  ] })
                ] })
              ] }),
              resetPinArtistId === artist.id && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "mx-4 sm:mx-6 mb-4 px-4 py-4 bg-primary/5 border border-primary/20 rounded-xl animate-slide-up",
                  "data-ocid": `admin-reset-pin-form-${artist.id}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-amber-400 font-medium mb-3 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
                      "This will log out ",
                      artist.name,
                      " — they must sign in with the new PIN."
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-3 flex-wrap", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[160px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "label",
                          {
                            htmlFor: `reset-pin-input-${artist.id}`,
                            className: "text-xs text-muted-foreground block mb-1.5 font-medium",
                            children: "New PIN (4–6 digits)"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: `reset-pin-input-${artist.id}`,
                            type: "password",
                            inputMode: "numeric",
                            value: newArtistPIN,
                            onChange: (e) => {
                              setNewArtistPIN(
                                e.target.value.replace(/\D/g, "")
                              );
                              setResetPinError("");
                            },
                            placeholder: "e.g. 1234",
                            maxLength: 6,
                            className: "bg-secondary border-border text-center tracking-widest",
                            "data-ocid": `reset-pin-input-${artist.id}`
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Button,
                        {
                          size: "sm",
                          onClick: () => handleResetArtistPIN(artist.id, artist.name),
                          disabled: isResettingPIN || newArtistPIN.length < 4,
                          className: "gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shrink-0",
                          "data-ocid": `reset-pin-confirm-${artist.id}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5" }),
                            isResettingPIN ? "Resetting…" : "Confirm Reset"
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          size: "sm",
                          variant: "outline",
                          onClick: () => {
                            setResetPinArtistId(null);
                            setNewArtistPIN("");
                            setResetPinError("");
                          },
                          className: "shrink-0",
                          "data-ocid": `reset-pin-cancel-${artist.id}`,
                          children: "Cancel"
                        }
                      )
                    ] }),
                    resetPinError && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-destructive text-xs mt-2 flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3 shrink-0" }),
                      resetPinError
                    ] })
                  ]
                }
              ),
              artist.bio && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground pl-0 sm:pl-12 italic", children: [
                '"',
                artist.bio,
                '"'
              ] }) })
            ] }, artist.id)) })
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "opacity-30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pb-4", children: "All actions are permanent and enforced on the backend. Artist data is protected and encrypted." })
  ] });
}
export {
  AdminPage as default
};
