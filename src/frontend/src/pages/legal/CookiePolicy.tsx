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
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8 sm:mb-10">
      <h2 className="font-display font-bold text-lg sm:text-xl text-primary mb-3 sm:mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      <div className="space-y-3 text-foreground/80 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}

const COOKIE_TYPES = [
  {
    name: "Strictly Necessary Cookies",
    purpose:
      "Required for the Platform to function. These include session authentication tokens that keep you logged in as an artist and maintain your shopping cart state.",
    canOptOut: false,
  },
  {
    name: "Preference Cookies",
    purpose:
      "Remember your settings such as language preference and dark mode. These cookies persist your choices so you don't have to reset them on every visit.",
    canOptOut: true,
  },
  {
    name: "Analytics Cookies",
    purpose:
      "Collect anonymized data about how users interact with the Platform — which pages are viewed, how many times songs are previewed, and general traffic patterns. This data powers the artist analytics dashboard.",
    canOptOut: true,
  },
  {
    name: "Payment Session Cookies",
    purpose:
      "Used by Stripe during checkout to maintain the payment session. These are set by Stripe and governed by Stripe's own privacy and cookie policy.",
    canOptOut: false,
  },
];

export default function CookiePolicy() {
  return (
    <LegalPageShell title="Cookie Policy" icon="🍪">
      <Section title="1. What Are Cookies?">
        <p>
          Cookies are small text files placed on your device by a website or web
          application when you visit it. They help the site remember information
          about your visit — like your preferred language or login state —
          making your next visit easier and the site more useful.
        </p>
        <p>
          We also use similar technologies like local storage and session
          storage for some of these purposes. This policy covers all such
          technologies collectively referred to as "cookies."
        </p>
      </Section>

      <Section title="2. Types of Cookies We Use">
        <div className="space-y-5 mt-2">
          {COOKIE_TYPES.map((c) => (
            <div
              key={c.name}
              className="p-4 rounded-xl border border-border bg-card/50"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-foreground text-sm">
                  {c.name}
                </h3>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.canOptOut ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
                >
                  {c.canOptOut ? "Optional" : "Required"}
                </span>
              </div>
              <p className="text-muted-foreground text-xs">{c.purpose}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="3. How to Control Cookies">
        <p>
          Most web browsers allow you to control cookies through their settings.
          You can typically:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>View what cookies have been set and delete them</li>
          <li>Block third-party cookies</li>
          <li>
            Block all cookies (note: this will break login and cart
            functionality)
          </li>
          <li>Set preferences for specific websites</li>
        </ul>
        <p className="mt-3">
          For instructions specific to your browser, visit the browser's help
          section or a resource like allaboutcookies.org.
        </p>
      </Section>

      <Section title="4. Third-Party Cookies">
        <p>
          Stripe, our payment processor, may set cookies during the checkout
          process. These cookies are subject to{" "}
          <a
            href="https://stripe.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Stripe's Privacy Policy
          </a>{" "}
          and are not within our control.
        </p>
      </Section>

      <Section title="5. Changes to This Policy">
        <p>
          We may update this Cookie Policy from time to time. Changes will be
          posted on this page with an updated effective date. Your continued use
          of the Platform after any changes constitutes acceptance.
        </p>
      </Section>

      <Section title="6. Contact">
        <p>
          For questions about our use of cookies, contact us at{" "}
          <a
            href="mailto:ChosenOneProductions901@gmail.com"
            className="text-primary hover:underline"
          >
            ChosenOneProductions901@gmail.com
          </a>
          .
        </p>
      </Section>
    </LegalPageShell>
  );
}
