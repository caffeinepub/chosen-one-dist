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

export default function RoyaltyPolicy() {
  return (
    <LegalPageShell title="Royalty Policy" icon="💰">
      <Section title="1. Artist Revenue Split">
        <p>
          Chosen One Distribution operates on an 85/15 revenue split. Artists
          receive <strong className="text-primary">85%</strong> of the net sale
          price of each track after Stripe payment processing fees. The
          remaining 15% is retained by Chosen One Distribution to cover platform
          operating costs, infrastructure, and development.
        </p>
        <p>
          Example: If a customer purchases a track for $1.99, the artist
          receives approximately $1.69 (before Stripe's processing fee of
          approximately $0.28 + 2.9%, which is deducted from the Platform's
          share). Artists always receive 85% of the final net amount.
        </p>
      </Section>

      <Section title="2. Payment Processing">
        <p>
          All payments on the Platform are processed in real-time through
          Stripe. Stripe charges standard processing fees (approximately 2.9% +
          $0.30 per transaction in the US; rates vary internationally). Stripe's
          fee is deducted before the 85/15 split is calculated, ensuring your
          85% is calculated from the amount actually received by the Platform.
        </p>
      </Section>

      <Section title="3. Payout Schedule">
        <p>
          Royalties accrue in your artist dashboard as sales occur. Payouts are
          processed on a rolling basis once your account balance meets the
          minimum payout threshold. You can view your real-time earnings in the{" "}
          <Link to="/royalties" className="text-primary hover:underline">
            Royalties Dashboard
          </Link>
          .
        </p>
      </Section>

      <Section title="4. Minimum Payout Threshold">
        <p>
          Payouts are issued once your accrued balance reaches a minimum of{" "}
          <strong className="text-foreground">$10.00 USD</strong>. Balances
          below this threshold will roll over to the next payout period. There
          is no maximum payout limit.
        </p>
      </Section>

      <Section title="5. Banking Information Requirements">
        <p>
          To receive payouts, artists must provide valid banking information
          through the Royalties Dashboard. Required information includes: bank
          account number, routing number (US) or IBAN/SWIFT (international),
          account holder name, and billing address.
        </p>
        <p>
          Chosen One Distribution is not responsible for failed payouts caused
          by incorrect or outdated banking information. Artists are responsible
          for keeping their banking information current.
        </p>
      </Section>

      <Section title="6. International Payouts">
        <p>
          International payouts are supported through Stripe's global payout
          infrastructure. Additional fees may apply for cross-border transfers
          and currency conversion. Artists outside the US should confirm
          Stripe's availability in their country before enrolling for payouts.
        </p>
      </Section>

      <Section title="7. Tax Responsibilities">
        <p>
          Artists are solely responsible for reporting and paying taxes on their
          royalty income in accordance with the laws of their jurisdiction.
          Chosen One Distribution does not withhold taxes on behalf of artists
          unless required by law. US-based artists earning more than $600/year
          may be required to provide a W-9 form. International artists may need
          to provide a W-8BEN form.
        </p>
      </Section>

      <Section title="8. Royalty Disputes">
        <p>
          If you believe there is an error in your royalty calculations, contact
          us within 60 days of the relevant transaction. We will review your
          claim and provide a resolution within 10 business days.
        </p>
        <p>
          Contact:{" "}
          <a
            href="mailto:ChosenOneProductions901@gmail.com"
            className="text-primary hover:underline"
          >
            ChosenOneProductions901@gmail.com
          </a>
        </p>
      </Section>
    </LegalPageShell>
  );
}
