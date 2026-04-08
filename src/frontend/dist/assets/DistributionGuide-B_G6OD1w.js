import { j as jsxRuntimeExports, L as Link } from "./index-BC7FGAoh.js";
import { C as CircleCheckBig } from "./circle-check-big-CqRJPSMx.js";
import { C as ChevronLeft } from "./chevron-left-CccK--nq.js";
function LegalPageShell({
  title,
  icon,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "legal-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "bg-card border-b border-border py-8 sm:py-12 px-4 sm:px-6",
        style: {
          background: "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.76 0.165 65 / 0.08), transparent 60%), oklch(0.18 0 0)"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors-fast text-sm mb-5 sm:mb-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-4 h-4" }),
                " Back to Home"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl sm:text-4xl", children: icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight", children: title })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 sm:mt-3", children: "Chosen One Distribution · Last updated: April 2026" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12", children })
  ] });
}
const STEPS = [
  {
    step: 1,
    title: "Create Your Artist Account",
    details: [
      "Go to the Sign Up page and enter your artist name and a 4–6 digit PIN.",
      "Your PIN is cryptographically hashed before storage — keep it somewhere safe.",
      "You'll stay logged in automatically until you choose to sign out.",
      "Your artist name appears next to the notification bell once you sign in."
    ]
  },
  {
    step: 2,
    title: "Set Up Your Artist Profile",
    details: [
      "Navigate to your Dashboard and complete your artist profile.",
      "Add a profile photo or artist image for your public profile page.",
      "Add links to your Instagram, Twitter/X, TikTok, YouTube, Facebook, SoundCloud, Spotify, Apple Music, and other platforms — these show as clickable icons on your public profile.",
      "Your public profile page is accessible at /artist/[your-id] — share it with fans."
    ]
  },
  {
    step: 3,
    title: "Upload Your First Track",
    details: [
      "Click Upload in the top navigation or from your Dashboard.",
      "Drag and drop your MP3 or WAV file, or click to browse.",
      "Fill in the track title, genre, and price. Add optional song details (lyrics, credits, notes).",
      "Use the waveform preview selector to choose any 30-second window as the customer preview. Skip to use the first 30 seconds.",
      "Choose Published for immediate listing, or Pre-Sale if you want to list it before the release date."
    ]
  },
  {
    step: 4,
    title: "Upload an Album (Batch Upload)",
    details: [
      "On the Upload page, switch to Album mode.",
      "Upload up to 10 songs at once. All songs can share an album name and cover art.",
      "Set individual prices per song, or set a single album price.",
      "All songs in the batch are listed in the store simultaneously upon publish."
    ]
  },
  {
    step: 5,
    title: "Your Music Goes Live",
    details: [
      "Published tracks appear in the store immediately — no approval queue.",
      "All visitors can see and preview your music without creating an account.",
      "Top-selling and most-viewed songs earn automatic gold badges in the store.",
      "Fans who like your store will receive push notifications when you drop new music."
    ]
  },
  {
    step: 6,
    title: "Manage Your Catalog",
    details: [
      "From your Dashboard, you can edit any track's title, price, genre, preview segment, and song details at any time.",
      "Remove a track from the store instantly from the Dashboard — it will no longer be visible to customers.",
      "View real-time analytics: previews, total listens, units sold, gross revenue, and payout balance."
    ]
  },
  {
    step: 7,
    title: "Set Up Royalty Payouts",
    details: [
      "Navigate to Royalties and enter your banking information.",
      "Required: bank account number, routing number (US) or IBAN/SWIFT (international), account holder name.",
      "Payouts are processed once your balance reaches the $10.00 minimum threshold.",
      "You receive 85% of every sale after Stripe's processing fees."
    ]
  },
  {
    step: 8,
    title: "Grow Your Fanbase",
    details: [
      "Share your track links and artist profile on social media using the share buttons on each song.",
      "Engage with fan comments and ratings on your tracks.",
      "Use the on-site analytics to see which songs drive the most previews and conversions.",
      "Consistent uploads keep your name visible in the store — aim for at least one new release per month."
    ]
  }
];
function DistributionGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Distribution Guide", icon: "🗺️", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-10", children: "Follow these steps to go from signup to your first sale on Chosen One Distribution. This guide covers everything — account setup, uploading, pricing, publishing, catalog management, and getting paid." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8", children: STEPS.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex gap-5",
        "data-ocid": `guide-step-${s.step}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center font-display font-bold text-primary text-sm", children: s.step }),
            s.step < STEPS.length && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px flex-1 bg-border mt-2 min-h-[24px]" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-foreground text-lg mb-3", children: s.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2", children: s.details.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-sm text-foreground/80", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: d })
            ] }, d)) })
          ] })
        ]
      },
      s.step
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 p-6 rounded-xl border border-primary/30 bg-primary/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground mb-2", children: "You're All Set 👑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Ready to start? Head to the upload page and drop your first track." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/upload",
            className: "inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast",
            children: "Upload Your Music"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/artist-resources",
            className: "inline-flex items-center justify-center px-5 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 transition-colors-fast",
            children: "Artist Resources"
          }
        )
      ] })
    ] })
  ] });
}
export {
  DistributionGuide as default
};
