import { Link } from "@tanstack/react-router";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import { useState } from "react";

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

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/60 transition-colors-fast"
        data-ocid={`faq-item-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`}
      >
        <span className="font-medium text-foreground text-sm pr-4">{q}</span>
        {open ? (
          <ChevronUp className="w-4 h-4 text-primary shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border bg-card/30">
          <p className="pt-4">{a}</p>
        </div>
      )}
    </div>
  );
}

const FAQ_CATEGORIES = [
  {
    title: "Uploading Music",
    icon: "🎵",
    faqs: [
      {
        q: "What audio formats are supported for uploads?",
        a: "We support MP3 and WAV formats. Upload your original master file — customers will download in the same format you upload.",
      },
      {
        q: "Can I upload an entire album at once?",
        a: "Yes! You can batch-upload up to 10 songs per album at once. All songs in the batch can share an album name and cover art, and they'll all be listed in the store automatically.",
      },
      {
        q: "How long does it take for my track to appear in the store?",
        a: "Tracks appear in the store immediately after upload. There's no review delay — publish and start selling the same day.",
      },
      {
        q: "Can I set my own price?",
        a: "Absolutely. You set the price per track (or per album) when you upload. You can edit the price at any time from your artist dashboard.",
      },
      {
        q: "What is the waveform preview selector?",
        a: "It's a visual tool that lets you choose any 30-second segment of your track as the customer preview. Drag the selection window to find the catchiest hook. If you skip it, the first 30 seconds are used by default.",
      },
    ],
  },
  {
    title: "Purchases & Downloads",
    icon: "🛒",
    faqs: [
      {
        q: "How do customers download their purchased music?",
        a: "Immediately after a successful Stripe payment, customers are shown a download screen with a button for each track they purchased. Clicking downloads the file directly to their device in the original format.",
      },
      {
        q: "How long do download links stay active?",
        a: "Download links expire 30 days after the purchase date. Customers who registered with email + PIN can re-download any time within that 30-day window from their 'My Purchases' panel.",
      },
      {
        q: "What if a customer didn't register and lost their download?",
        a: "One-time customers (those who skipped registration) receive a single download prompt after checkout. If the page is closed before downloading, the file cannot be re-accessed without registration. We encourage customers to register their purchase.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept all major credit and debit cards, Apple Pay, Google Pay, PayPal, CashApp, and Zelle — all via Stripe.",
      },
      {
        q: "Can customers buy multiple songs at once?",
        a: "Yes. Customers add songs to a cart and complete a single checkout for all items. Each song in the order is then available to download from the post-purchase screen.",
      },
    ],
  },
  {
    title: "Account & PIN",
    icon: "🔐",
    faqs: [
      {
        q: "How do I reset my artist PIN?",
        a: "PIN changes require entering your current PIN for verification. Go to your dashboard settings to change it. If you've forgotten your PIN, contact us at ChosenOneProductions901@gmail.com — PIN recovery is reviewed case by case.",
      },
      {
        q: "Will I be automatically logged out?",
        a: "No. Artist accounts remain logged in until you manually click Sign Out. There's no session timeout — your session persists across browser closes.",
      },
      {
        q: "Can I have more than one artist account?",
        a: "Each artist should have one account. Creating multiple accounts to circumvent a suspension is a violation of our Terms of Service and may result in permanent bans.",
      },
    ],
  },
  {
    title: "Royalties & Payouts",
    icon: "💰",
    faqs: [
      {
        q: "When will I receive my first payout?",
        a: "Payouts are processed once your balance reaches the $10.00 minimum threshold. Add your banking information in the Royalties section to enroll. Once enrolled and above threshold, payouts are processed on a rolling basis.",
      },
      {
        q: "Why haven't I received my payout yet?",
        a: "Check that your banking information is complete and accurate in the Royalties dashboard. Payouts require a minimum balance of $10.00. If everything looks correct and you still haven't received payment, contact us.",
      },
      {
        q: "Is my banking info secure?",
        a: "Yes. Banking information is stored securely and used only for processing royalty payouts. We never share your banking details with third parties other than our payment processor.",
      },
    ],
  },
];

export default function HelpCenter() {
  return (
    <LegalPageShell title="Help Center" icon="🆘">
      <p className="text-muted-foreground mb-10 text-sm leading-relaxed">
        Find answers to common questions about Chosen One Distribution. If you
        can't find what you're looking for,{" "}
        <Link to="/contact" className="text-primary hover:underline">
          contact us directly
        </Link>
        .
      </p>

      {FAQ_CATEGORIES.map((cat) => (
        <section key={cat.title} className="mb-10">
          <h2 className="font-display font-bold text-xl text-primary mb-5 pb-2 border-b border-border flex items-center gap-2">
            <span>{cat.icon}</span> {cat.title}
          </h2>
          <div className="space-y-3">
            {cat.faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-10 p-6 rounded-xl border border-primary/30 bg-primary/5 text-center">
        <p className="text-foreground font-medium mb-2">Still need help?</p>
        <p className="text-muted-foreground text-sm mb-4">
          Can't find your answer above? Reach out to our team directly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast"
          >
            Contact Us
          </Link>
          <Link
            to="/complaint"
            className="inline-flex items-center justify-center px-5 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 transition-colors-fast"
          >
            File a Complaint
          </Link>
        </div>
      </div>
    </LegalPageShell>
  );
}
