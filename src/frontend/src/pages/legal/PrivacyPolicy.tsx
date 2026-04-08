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

export default function PrivacyPolicy() {
  return (
    <LegalPageShell title="Privacy Policy" icon="🔒">
      <Section title="1. Introduction">
        <p>
          Chosen One Distribution ("we," "our," or "us") respects your privacy.
          This Privacy Policy explains how we collect, use, store, and protect
          your personal information when you use our Platform. By using the
          Platform, you consent to the practices described in this Policy.
        </p>
      </Section>

      <Section title="2. Information We Collect">
        <p>
          <strong className="text-foreground">Artist Information:</strong> When
          you register as an artist, we collect your artist name and a hashed
          version of your PIN. We never store your raw PIN — it is
          cryptographically hashed before storage.
        </p>
        <p>
          <strong className="text-foreground">Customer Information:</strong>{" "}
          Customers who choose to register for re-downloads provide an email
          address and create a PIN. This information is used solely for
          re-download authentication.
        </p>
        <p>
          <strong className="text-foreground">Purchase Data:</strong> We store
          records of completed purchases including the songs purchased, purchase
          timestamp, and total amount paid. This data is used for download
          access, receipts, and royalty calculations.
        </p>
        <p>
          <strong className="text-foreground">Banking Information:</strong>{" "}
          Artists who enroll for payouts provide banking details. This
          information is stored securely and used exclusively for processing
          royalty payouts.
        </p>
        <p>
          <strong className="text-foreground">Usage Analytics:</strong> We
          collect anonymized analytics including page views, song previews, and
          purchase events to improve platform performance and provide artists
          with real-time dashboard data.
        </p>
        <p>
          <strong className="text-foreground">Mailing List:</strong> Users who
          subscribe to our mailing list provide an email address, which is used
          to send platform updates. Subscriber emails are routed to
          ChosenOneProductions901@gmail.com.
        </p>
      </Section>

      <Section title="3. How We Use Your Information">
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>To provide and maintain Platform functionality</li>
          <li>To process payments and calculate artist royalties</li>
          <li>To authenticate users and protect account security</li>
          <li>To provide download access for purchased music</li>
          <li>To send mailing list updates to subscribers</li>
          <li>To display real-time analytics on artist dashboards</li>
          <li>To enforce our Terms of Service and prevent fraud</li>
        </ul>
      </Section>

      <Section title="4. Data Storage on the Internet Computer">
        <p>
          This Platform is built on the Internet Computer, a decentralized
          blockchain network. Data stored on the Internet Computer is replicated
          across a network of nodes and benefits from the security properties of
          the blockchain. Data cannot be unilaterally deleted by a single party
          without proper canister-level authorization.
        </p>
      </Section>

      <Section title="5. Data Sharing">
        <p>
          We do not sell, rent, or share your personal information with third
          parties for marketing purposes. Information may be shared with Stripe
          solely for the purpose of processing payments. We may disclose
          information when required by law or to protect the rights and safety
          of users.
        </p>
      </Section>

      <Section title="6. Your Rights (GDPR / CCPA)">
        <p>
          Depending on your jurisdiction, you may have the right to: access,
          correct, or delete your personal data; opt out of certain data
          processing; and receive a copy of your data in a portable format. To
          exercise any of these rights, contact us at{" "}
          <a
            href="mailto:ChosenOneProductions901@gmail.com"
            className="text-primary hover:underline"
          >
            ChosenOneProductions901@gmail.com
          </a>
          .
        </p>
        <p>
          California residents have additional rights under the California
          Consumer Privacy Act (CCPA), including the right to know what personal
          information is collected and the right to opt out of the sale of
          personal information (which we do not do).
        </p>
      </Section>

      <Section title="7. Cookies">
        <p>
          We use cookies and similar technologies to maintain session state,
          remember preferences, and collect analytics data. See our{" "}
          <Link to="/cookies" className="text-primary hover:underline">
            Cookie Policy
          </Link>{" "}
          for full details.
        </p>
      </Section>

      <Section title="8. Children's Privacy">
        <p>
          The Platform is not intended for users under the age of 13. We do not
          knowingly collect personal information from children under 13. If you
          believe a child has provided us with personal information, please
          contact us immediately.
        </p>
      </Section>

      <Section title="9. Contact">
        <p>
          For privacy-related questions, contact us at{" "}
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
