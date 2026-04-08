import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  Bell,
  CreditCard,
  Download,
  Globe,
  Heart,
  Music,
  Play,
  Shield,
  ShoppingBag,
  Star,
  TrendingUp,
  Upload,
  Users,
  Zap,
} from "lucide-react";
import { createActor } from "../backend";
import { CrownRollBanner } from "../components/CrownRollBanner";
import { useAuth } from "../hooks/use-auth";
import { useTranslation } from "../hooks/use-translation";
import type { ArtistDashboardStats } from "../types";

// ─── Scorpion + Crown SVG background ─────────────────────────────────────────

function ScorpionCrownBg() {
  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden flex items-center justify-center"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-[260px] h-[320px] sm:w-[380px] sm:h-[460px] md:w-[520px] md:h-[640px] lg:w-[620px] lg:h-[760px] opacity-[0.09] select-none"
        style={{ color: "#d4af37" }}
        role="img"
        aria-label="Scorpion with crown decorative background"
      >
        <title>Scorpion with crown</title>
        {/* Crown */}
        <path
          d="M140 130 L160 80 L200 110 L240 80 L260 130 L200 115 Z"
          fill="currentColor"
        />
        <rect
          x="138"
          y="128"
          width="124"
          height="14"
          rx="4"
          fill="currentColor"
        />
        <circle cx="160" cy="80" r="7" fill="currentColor" />
        <circle cx="200" cy="110" r="7" fill="currentColor" />
        <circle cx="240" cy="80" r="7" fill="currentColor" />

        {/* Scorpion body */}
        <ellipse cx="200" cy="205" rx="30" ry="38" fill="currentColor" />
        <ellipse cx="200" cy="260" rx="25" ry="22" fill="currentColor" />
        <ellipse cx="200" cy="295" rx="21" ry="16" fill="currentColor" />
        <ellipse cx="200" cy="324" rx="17" ry="13" fill="currentColor" />
        <ellipse cx="200" cy="349" rx="13" ry="11" fill="currentColor" />
        <ellipse cx="200" cy="370" rx="10" ry="9" fill="currentColor" />
        <ellipse cx="210" cy="392" rx="9" ry="8" fill="currentColor" />
        <ellipse cx="228" cy="408" rx="8" ry="7" fill="currentColor" />
        <ellipse cx="248" cy="416" rx="7" ry="6" fill="currentColor" />
        <path
          d="M248 410 Q280 400 275 385 Q270 375 262 380"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="275" cy="381" r="5" fill="currentColor" />
        <ellipse cx="200" cy="172" rx="22" ry="18" fill="currentColor" />
        <circle cx="192" cy="167" r="3.5" fill="currentColor" opacity="0.5" />
        <circle cx="208" cy="167" r="3.5" fill="currentColor" opacity="0.5" />
        <path
          d="M178 180 Q155 165 148 150 Q145 140 155 138"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 138 Q142 128 150 122"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M148 138 Q138 135 140 145"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M222 180 Q245 165 252 150 Q255 140 245 138"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M252 138 Q258 128 250 122"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M252 138 Q262 135 260 145"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Legs left */}
        <line
          x1="175"
          y1="200"
          x2="135"
          y2="215"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="135"
          y1="215"
          x2="110"
          y2="230"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="172"
          y1="215"
          x2="128"
          y2="235"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="128"
          y1="235"
          x2="100"
          y2="252"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="172"
          y1="230"
          x2="125"
          y2="255"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="125"
          y1="255"
          x2="98"
          y2="274"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="175"
          y1="247"
          x2="130"
          y2="274"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="130"
          y1="274"
          x2="106"
          y2="295"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Legs right */}
        <line
          x1="225"
          y1="200"
          x2="265"
          y2="215"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="265"
          y1="215"
          x2="290"
          y2="230"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="228"
          y1="215"
          x2="272"
          y2="235"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="272"
          y1="235"
          x2="300"
          y2="252"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="228"
          y1="230"
          x2="275"
          y2="255"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="275"
          y1="255"
          x2="302"
          y2="274"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <line
          x1="225"
          y1="247"
          x2="270"
          y2="274"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <line
          x1="270"
          y1="274"
          x2="294"
          y2="295"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

// ─── Platform features grid data ──────────────────────────────────────────────

const PLATFORM_FEATURES = [
  {
    icon: Upload,
    title: "Upload Singles & Albums",
    desc: "Upload individual tracks or batch-upload up to 10 songs per album. All tracks go live in the global store instantly.",
  },
  {
    icon: CreditCard,
    title: "Real Stripe Payments",
    desc: "Live payment processing via Stripe — credit/debit cards, Apple Pay, Google Pay, PayPal, CashApp, and Zelle all supported.",
  },
  {
    icon: TrendingUp,
    title: "85% Artist Royalties",
    desc: "Artists keep 85 cents of every dollar earned. Royalties paid directly to your bank account with full transparency.",
  },
  {
    icon: Play,
    title: "Waveform Preview Selector",
    desc: "Choose any 30-second window of your track as the customer preview. Drag the waveform to pick the perfect hook.",
  },
  {
    icon: Globe,
    title: "8 Languages Supported",
    desc: "Reach a global audience with multilingual support: English, Spanish, French, Portuguese, German, Japanese, Korean, and Arabic.",
  },
  {
    icon: BarChart2,
    title: "Real-Time Analytics",
    desc: "Track previews, streams, sales, gross revenue, and payouts all update live on your artist dashboard.",
  },
  {
    icon: Bell,
    title: "Fan Push Notifications",
    desc: "Customers who like your store get notified the moment you drop a new track, driving more first-day sales.",
  },
  {
    icon: Download,
    title: "Instant Downloads",
    desc: "Customers download their purchased songs immediately in the original format (MP3 or WAV). No delays, no waiting.",
  },
  {
    icon: Star,
    title: "Top Seller Highlights",
    desc: "Your best-performing songs earn gold badges in the store — boosting visibility and discovery automatically.",
  },
  {
    icon: Heart,
    title: "Community Engagement",
    desc: "Songs collect comments, ratings, and likes. Fans build playlists and follow their favorite artists directly on the platform.",
  },
  {
    icon: Shield,
    title: "Admin & Content Controls",
    desc: "Full admin oversight — suspend, cancel, or remove any artist account. Stripe key management and real-time traffic analytics.",
  },
  {
    icon: Users,
    title: "Artist Profile Pages",
    desc: "Every artist gets a profile page with their full catalog, bio, and social media links — Instagram, TikTok, Spotify, and more.",
  },
];

const MAIN_FEATURES = [
  {
    icon: CreditCard,
    title: "Real Stripe Payments",
    desc: "Powered by Stripe — real credit card processing, instant checkout, and secure transactions. No simulated payments.",
    badge: "🔒 Verified",
  },
  {
    icon: TrendingUp,
    title: "Keep 85%",
    desc: "Artists keep 85 cents of every dollar earned. Transparent royalties paid directly to your bank account — no hidden fees.",
    badge: "💰 85% Split",
  },
  {
    icon: Zap,
    title: "Instant Upload",
    desc: "Upload your tracks in minutes. Set your price, publish globally, and start earning the same day.",
    badge: "⚡ Live Fast",
  },
];

// ─── Artist stats (authenticated only) ───────────────────────────────────────

function ArtistStatsSection() {
  const { actor, isFetching } = useActor(createActor);
  const { isAuthenticated, sessionToken } = useAuth();
  const { t } = useTranslation();

  const { data: stats, isLoading } = useQuery<ArtistDashboardStats>({
    queryKey: ["artistDashboardStats"],
    queryFn: async () => {
      if (!actor) throw new Error("No actor");
      const result = await actor.getArtistDashboardStats(sessionToken!);
      if (result.__kind__ === "err") throw new Error(result.err);
      return result.ok;
    },
    enabled: isAuthenticated && !!actor && !isFetching && !!sessionToken,
  });

  if (!isAuthenticated) {
    return (
      <section
        className="bg-card border-y border-border py-12 px-4 sm:px-6"
        data-ocid="home-signin-cta"
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-4xl sm:text-5xl block mb-4">👑</span>
          <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-foreground mb-3">
            Already an Artist on Chosen One?
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 max-w-lg mx-auto text-sm sm:text-base">
            Sign in to view your dashboard, track sales, and manage your
            royalties.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 sm:px-10 gold-glow transition-smooth w-full sm:w-auto"
            data-ocid="home-signin-btn"
          >
            <Link to="/login">{t("signIn")} to Your Dashboard</Link>
          </Button>
        </div>
      </section>
    );
  }

  const formatCents = (cents: bigint) =>
    `$${(Number(cents) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const artistStats = [
    {
      label: t("tracks"),
      value: isLoading ? null : String(stats?.totalTracks ?? 0),
      icon: Music,
    },
    {
      label: t("trackPreviews"),
      value: isLoading ? null : String(stats?.totalPreviews ?? 0),
      icon: Play,
    },
    {
      label: t("totalSales"),
      value: isLoading ? null : String(stats?.totalSales ?? 0),
      icon: ShoppingBag,
    },
    {
      label: t("grossRevenue"),
      value: isLoading
        ? null
        : stats
          ? formatCents(stats.totalEarningsCents)
          : "$0.00",
      icon: TrendingUp,
    },
  ];

  return (
    <section
      className="bg-card border-y border-border py-10 sm:py-12 px-4 sm:px-6"
      data-ocid="artist-stats-section"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
          <div className="flex items-center gap-3 flex-1">
            <span className="text-2xl">👑</span>
            <div>
              <h2 className="font-display font-bold text-lg sm:text-xl text-foreground">
                {t("dashboardTitle")}
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm">
                Your personal stats at a glance
              </p>
            </div>
          </div>
          <Link to="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="text-xs w-full sm:w-auto"
              data-ocid="artist-stats-view-dashboard"
            >
              Full Dashboard
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {artistStats.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="card-elevated p-4 sm:p-5"
              data-ocid={`artist-stat-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="flex items-start justify-between mb-2 sm:mb-3">
                <p className="text-label text-muted-foreground text-xs leading-tight">
                  {label}
                </p>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-md bg-primary/15 flex items-center justify-center shrink-0">
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-primary" />
                </div>
              </div>
              {value === null ? (
                <Skeleton className="h-6 sm:h-7 w-14 sm:w-16 shimmer" />
              ) : (
                <p className="font-display font-bold text-xl sm:text-2xl text-foreground">
                  {value}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col" data-ocid="home-page">
      <CrownRollBanner />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 100% 70% at 50% -10%, oklch(0.76 0.165 65 / 0.12), transparent 65%), oklch(0.14 0 0)",
        }}
        data-ocid="hero-section"
      >
        <ScorpionCrownBg />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <Badge className="bg-primary/15 text-primary border-primary/30 mb-5 sm:mb-6 text-xs px-3 sm:px-4 py-1 sm:py-1.5 animate-fade-in">
            🎵 Independent Music Distribution Platform
          </Badge>

          <div className="animate-slide-up">
            <span className="text-5xl sm:text-6xl md:text-8xl block mb-3 sm:mb-4">
              👑
            </span>
            <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-foreground leading-[1.08] mb-4 max-w-4xl">
              Release Your Music.
              <br />
              <span className="text-primary">Reign Supreme.</span>
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 mb-5 sm:mb-6 animate-fade-in w-full justify-center">
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
              🎶 AI music is welcome
            </span>
            <span className="hidden sm:block text-muted-foreground/40">·</span>
            <span className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-border bg-card/60 text-foreground font-semibold text-xs sm:text-sm">
              <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
              We build communities
            </span>
          </div>

          <p className="text-muted-foreground text-base sm:text-lg md:text-xl max-w-2xl mb-8 sm:mb-10 leading-relaxed animate-fade-in px-2">
            Distribute your music globally, collect real payments, and keep{" "}
            <strong className="text-primary font-bold">85%</strong> of every
            sale. Built for independent artists who demand more.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up w-full sm:w-auto">
            <Link to="/upload" data-ocid="hero-cta-start">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 text-sm sm:text-base px-6 sm:px-10 gold-glow transition-smooth w-full sm:w-auto min-h-[48px]"
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Distributing
              </Button>
            </Link>
            <Link to="/store" data-ocid="hero-cta-store">
              <Button
                size="lg"
                variant="outline"
                className="border-border gap-2 text-sm sm:text-base px-6 sm:px-8 hover:border-primary/40 transition-smooth w-full sm:w-auto min-h-[48px]"
              >
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {t("store")}
              </Button>
            </Link>
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.76 0.165 65 / 0.4), transparent)",
          }}
        />
      </section>

      {/* ── Authenticated Artist Stats ─────────────────────────────────────── */}
      <ArtistStatsSection />

      {/* ── Feature Highlights ────────────────────────────────────────────── */}
      <section
        className="bg-background py-14 sm:py-20 px-4 sm:px-6"
        data-ocid="features-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
              🎵 Why Artists Choose Us
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-base sm:text-lg">
              Real payments. Real ownership. Real results.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {MAIN_FEATURES.map(({ icon: Icon, title, desc, badge }) => (
              <div
                key={title}
                className="card-elevated p-5 sm:p-7 hover:border-primary/40 transition-smooth group relative overflow-hidden"
                data-ocid={`feature-${title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 100%, oklch(0.76 0.165 65 / 0.06), transparent)",
                  }}
                />
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-4 sm:mb-5 group-hover:bg-primary/25 transition-smooth">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <h3 className="font-display font-bold text-foreground text-base sm:text-lg">
                    {title}
                  </h3>
                </div>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">
                  {desc}
                </p>
                <span className="badge-accent text-xs">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About Us ──────────────────────────────────────────────────────── */}
      <section
        className="bg-card border-y border-border py-14 sm:py-20 px-4 sm:px-6"
        data-ocid="about-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-14">
            <Badge className="bg-primary/15 text-primary border-primary/30 mb-3 sm:mb-4 text-xs px-3 sm:px-4 py-1 sm:py-1.5">
              About Us
            </Badge>
            <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-5">
              👑 What Is Chosen One Distribution?
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
              Chosen One Distribution is a global music distribution platform
              built exclusively for independent artists. We believe every artist
              deserves the tools to distribute their music worldwide, collect
              real payments, and own their career — without giving away the
              majority of what they earn.
            </p>
          </div>

          {/* Mission statements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10 sm:mb-14">
            <div className="card-elevated p-6 sm:p-8 border-primary/20 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 0% 100%, oklch(0.76 0.165 65 / 0.08), transparent)",
                }}
              />
              <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">
                🎶
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-primary mb-2 sm:mb-3">
                AI Music is Welcome
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                We embrace the future of music creation. AI-generated music is
                welcome on our platform. Artists leveraging artificial
                intelligence to create tracks can upload, sell, and profit just
                like any other creator. Innovation belongs on stage.
              </p>
            </div>
            <div className="card-elevated p-6 sm:p-8 border-primary/20 relative overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 100% 100%, oklch(0.76 0.165 65 / 0.08), transparent)",
                }}
              />
              <span className="text-3xl sm:text-4xl block mb-3 sm:mb-4">
                🌍
              </span>
              <h3 className="font-display font-bold text-lg sm:text-xl text-primary mb-2 sm:mb-3">
                We Build Communities
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                Music is more than a transaction — it's a connection. Fans can
                like songs, leave comments, share tracks, and follow their
                favorite artists. We build the community layer that turns
                one-time buyers into lifelong supporters.
              </p>
            </div>
          </div>

          {/* Platform features grid */}
          <div className="text-center mb-7 sm:mb-10">
            <h3 className="font-display font-bold text-xl sm:text-2xl text-foreground mb-2">
              Everything the Platform Offers
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              A complete toolkit built from the ground up for independent music
              distribution.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5">
            {PLATFORM_FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl border border-border bg-background hover:border-primary/30 transition-smooth"
                data-ocid={`about-feature-${title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display font-semibold text-foreground text-sm mb-1">
                    {title}
                  </h4>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Releases ─────────────────────────────────────────────── */}
      <section
        className="bg-muted/30 border-y border-border py-12 sm:py-16 px-4 sm:px-6"
        data-ocid="featured-tracks-section"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 sm:mb-8">
            <div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-foreground">
                🎶 Featured Releases
              </h2>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1">
                Top tracks from independent artists
              </p>
            </div>
            <Link to="/store" data-ocid="featured-view-all">
              <Button variant="outline" size="sm" className="text-xs">
                {t("store")}
              </Button>
            </Link>
          </div>

          <div
            className="flex flex-col items-center justify-center py-12 sm:py-16 text-center"
            data-ocid="featured-tracks-empty"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 sm:mb-5">
              <Music className="w-7 h-7 sm:w-9 sm:h-9 text-primary/60" />
            </div>
            <h3 className="font-display font-semibold text-foreground text-base sm:text-lg mb-2">
              No featured releases yet
            </h3>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-xs mb-5 sm:mb-6">
              Be the first to drop a track. Upload your music and get featured
              in the store.
            </p>
            <Link to="/store" data-ocid="featured-empty-browse-btn">
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:border-primary/40 transition-smooth w-full sm:w-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                Browse the Store
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section
        className="bg-background py-14 sm:py-20 px-4 sm:px-6"
        data-ocid="home-cta-section"
      >
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-5xl sm:text-6xl block mb-5 sm:mb-6">👑</span>
          <h2 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-3 sm:mb-4">
            Ready to Claim Your Crown?
          </h2>
          <p className="text-muted-foreground mb-6 sm:mb-8 text-base sm:text-lg max-w-xl mx-auto">
            Join independent artists distributing music globally and keeping
            what they earn. Real Stripe payments, real royalties.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link to="/upload" data-ocid="home-bottom-cta">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6 sm:px-10 gold-glow transition-smooth w-full sm:w-auto min-h-[48px]"
              >
                <Music className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Distributing Today
              </Button>
            </Link>
            <Link to="/royalties" data-ocid="home-royalties-cta">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 px-6 sm:px-8 hover:border-primary/40 transition-smooth w-full sm:w-auto min-h-[48px]"
              >
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" />
                {t("royalties")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
