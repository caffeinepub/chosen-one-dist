import { Link } from "@tanstack/react-router";
import { ChevronLeft, Clock, Mail, MessageSquare } from "lucide-react";

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

export default function ContactUs() {
  return (
    <LegalPageShell title="Contact Us" icon="📬">
      <p className="text-muted-foreground text-sm leading-relaxed mb-10">
        Have a question, a partnership inquiry, or need support? We'd love to
        hear from you. Reach out to the Chosen One Distribution team using the
        information below.
      </p>

      {/* Contact cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
        <div className="p-6 rounded-xl border border-border bg-card/50 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            Email
          </h3>
          <a
            href="mailto:ChosenOneProductions901@gmail.com"
            className="text-primary hover:underline text-sm break-all"
            data-ocid="contact-email-link"
          >
            ChosenOneProductions901@gmail.com
          </a>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/50 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            Response Time
          </h3>
          <p className="text-muted-foreground text-sm">
            We aim to respond to all inquiries within 1–3 business days.
          </p>
        </div>
        <div className="p-6 rounded-xl border border-border bg-card/50 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-semibold text-foreground mb-2">
            Live Support
          </h3>
          <p className="text-muted-foreground text-sm">
            Use the chat assistant (bottom right) for instant answers to common
            questions.
          </p>
        </div>
      </div>

      {/* What to include */}
      <div className="p-6 rounded-xl border border-border bg-card/50 mb-8">
        <h2 className="font-display font-bold text-lg text-primary mb-4">
          When Emailing, Please Include:
        </h2>
        <ul className="space-y-2 text-sm text-foreground/80">
          <li className="flex gap-2">
            <span className="text-primary">•</span> Your artist name (for
            account-related issues)
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span> A clear description of your
            question or issue
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span> Any relevant screenshots or
            order information
          </li>
          <li className="flex gap-2">
            <span className="text-primary">•</span> Your preferred contact
            method for our reply
          </li>
        </ul>
      </div>

      {/* Other resources */}
      <div className="space-y-3">
        <h2 className="font-display font-bold text-lg text-foreground">
          Other Resources
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              label: "Help Center (FAQ)",
              to: "/help",
              desc: "Answers to common questions",
            },
            {
              label: "File a Complaint",
              to: "/complaint",
              desc: "Submit a formal complaint or dispute",
            },
            {
              label: "Distribution Guide",
              to: "/distribution-guide",
              desc: "Step-by-step getting started guide",
            },
            {
              label: "Royalty FAQ",
              to: "/royalty-faq",
              desc: "Questions about payments and payouts",
            },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="flex items-start gap-3 p-4 rounded-xl border border-border hover:border-primary/40 transition-colors-fast"
            >
              <div>
                <p className="text-sm font-medium text-foreground">{r.label}</p>
                <p className="text-xs text-muted-foreground">{r.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </LegalPageShell>
  );
}
