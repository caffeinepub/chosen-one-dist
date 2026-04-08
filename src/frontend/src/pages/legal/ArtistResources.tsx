import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

function LegalPageShell({
  title,
  icon,
  children,
}: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background" data-ocid="legal-page">
      <div
        className="bg-card border-b border-border py-8 sm:py-12 px-4 sm:px-6"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.165 65 / 0.08), transparent 60%), oklch(0.18 0 0)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors-fast text-sm mb-5 sm:mb-6"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-3xl sm:text-4xl">{icon}</span>
            <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight">
              {title}
            </h1>
          </div>
          <p className="text-muted-foreground text-sm mt-2 sm:mt-3">
            Chosen One Distribution · Last updated: April 2026
          </p>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  icon,
  children,
}: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="font-display font-bold text-lg sm:text-xl text-primary mb-3 sm:mb-4 pb-2 border-b border-border flex items-center gap-2">
        <span>{icon}</span> {title}
      </h2>
      <div className="space-y-3 text-foreground/80 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}

const TIPS = [
  {
    icon: "📝",
    title: "Optimize Your Metadata",
    points: [
      "Use your real artist name consistently across all uploads — it builds brand recognition.",
      "Write detailed, keyword-rich descriptions for each track. Think about what fans might search for.",
      "Always assign accurate genre tags. Songs in the wrong genre get fewer organic plays.",
      "Include featured artist names in the title when applicable (e.g., 'Track Name ft. Artist Name').",
      "Add Song Details: lyrics, production credits, sample clearances, inspiration notes. Fans love the story behind a song.",
    ],
  },
  {
    icon: "💲",
    title: "Pricing Strategies",
    points: [
      "Singles: $0.99–$1.99 is the sweet spot for casual buyers. $0.99 maximizes volume; $1.49–$1.99 signals premium quality.",
      "Albums: Price each song at a slight discount compared to buying individually to encourage full-album purchases.",
      "Never price below $0.49 — it undervalues your work and rarely increases sales volume meaningfully.",
      "For pre-sale listings, set a competitive price to drive early adopter momentum and build buzz before release.",
      "Top-seller status (earned automatically) drives discovery — a competitive price at launch helps you earn that badge faster.",
    ],
  },
  {
    icon: "📣",
    title: "Promotional Tips",
    points: [
      "Share your track link on Instagram, TikTok, and Twitter/X immediately after upload. The first 48 hours drive the most traffic.",
      "Link your artist profile in your social media bios so fans can go straight to your catalog.",
      "Ask your fans to like your store — they'll get push notifications every time you drop new music.",
      "Use the platform share button to generate a clean, shareable link for each track.",
      "Encourage fans to leave comments and ratings — social proof drives sales from new visitors.",
    ],
  },
  {
    icon: "🎛️",
    title: "Waveform Preview Best Practices",
    points: [
      "Choose the hook or the most emotionally impactful 30-second window — not the intro.",
      "Avoid starting the preview on a silent or very quiet section of the track.",
      "If your song has a standout chorus, feature that as the preview window.",
      "Listen to the preview after setting it to make sure it starts clean and ends at a natural moment.",
      "Update your preview whenever you release a remastered version of the track.",
    ],
  },
  {
    icon: "📊",
    title: "Royalty Maximization",
    points: [
      "Keep your banking information up to date in the Royalties dashboard to avoid missed payouts.",
      "Release consistently — multiple uploads spread over time maintain visibility and steady income.",
      "Respond to comments on your tracks to build community and encourage repeat buyers.",
      "Promote your profile page link so fans can discover your full catalog, not just one song.",
      "Pre-sale listings generate buzz before release — use them for your most anticipated drops.",
    ],
  },
];

export default function ArtistResources() {
  return (
    <LegalPageShell title="Artist Resources" icon="🎤">
      <p className="text-muted-foreground text-sm leading-relaxed mb-10">
        Everything you need to succeed on Chosen One Distribution — from
        metadata optimization to pricing strategies and royalty maximization
        tips. These guides are written specifically for independent artists
        distributing music on our platform.
      </p>

      {TIPS.map((tip) => (
        <Section key={tip.title} title={tip.title} icon={tip.icon}>
          <ul className="space-y-2">
            {tip.points.map((p) => (
              <li key={p} className="flex gap-2">
                <span className="text-primary mt-0.5">→</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </Section>
      ))}

      <div className="mt-8 p-6 rounded-xl border border-primary/30 bg-primary/5">
        <h3 className="font-display font-bold text-foreground mb-2">
          Need More Help?
        </h3>
        <p className="text-muted-foreground text-sm mb-4">
          Check our step-by-step Distribution Guide or reach out to our team
          directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/distribution-guide"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast"
          >
            Distribution Guide
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 transition-colors-fast"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </LegalPageShell>
  );
}
