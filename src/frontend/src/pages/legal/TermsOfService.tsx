import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

function LegalPageShell({
  title,
  icon,
  children,
}: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background" data-ocid="legal-page">
      {/* Header banner */}
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="prose-legal">{children}</div>
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

export default function TermsOfService() {
  return (
    <LegalPageShell title="Terms of Service" icon="📜">
      <Section title="1. Agreement to Terms">
        <p>
          By accessing or using Chosen One Distribution ("the Platform," "we,"
          "our," or "us"), you agree to be bound by these Terms of Service. If
          you do not agree, you may not use the Platform. These Terms apply to
          all visitors, users, and artists who access or use the Platform in any
          capacity.
        </p>
        <p>
          Chosen One Distribution is a global music distribution platform that
          allows independent artists to upload, distribute, and sell their
          music, and allows customers to preview and purchase music tracks.
        </p>
      </Section>

      <Section title="2. Account Registration">
        <p>
          Artists must create an account using a name and a 4–6 digit PIN. You
          are responsible for maintaining the confidentiality of your PIN.
          Sharing account credentials is prohibited. You must be at least 18
          years old to create an artist account, or have the legal authority to
          enter into a binding agreement.
        </p>
        <p>
          You agree to provide accurate, current, and complete information
          during registration. Accounts created with false information may be
          suspended or terminated at any time.
        </p>
      </Section>

      <Section title="3. Artist Content & Uploads">
        <p>
          By uploading music or any other content to the Platform, you represent
          and warrant that: (a) you own or have the necessary rights, licenses,
          and permissions for all content you upload; (b) the content does not
          infringe upon the intellectual property rights, privacy rights, or any
          other rights of any third party; (c) the content complies with all
          applicable laws and regulations.
        </p>
        <p>
          You retain ownership of your music. By uploading content, you grant
          Chosen One Distribution a non-exclusive, worldwide, royalty-free
          license to host, display, distribute, and make your content available
          to customers through the Platform for the purpose of facilitating
          sales.
        </p>
        <p>
          AI-generated music is permitted on the Platform, provided you have the
          necessary rights to distribute the generated work.
        </p>
      </Section>

      <Section title="4. Prohibited Uses">
        <p>You may not use the Platform to:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            Upload content that infringes copyrights, trademarks, or other
            intellectual property rights
          </li>
          <li>
            Upload content that is defamatory, obscene, harassing, threatening,
            or unlawful
          </li>
          <li>
            Use any automated means to access or scrape the Platform without
            permission
          </li>
          <li>
            Attempt to interfere with, disrupt, or disable any aspect of the
            Platform
          </li>
          <li>Create multiple accounts to circumvent suspensions or bans</li>
          <li>
            Engage in fraudulent transactions or attempt to manipulate royalty
            calculations
          </li>
          <li>
            Distribute malware, viruses, or other harmful code through the
            Platform
          </li>
        </ul>
      </Section>

      <Section title="5. Payments and Royalties">
        <p>
          All payments are processed through Stripe. Customers pay for music
          using supported payment methods. Artists receive 85% of each sale
          after Stripe's processing fees. Payouts require valid banking
          information on file. See our{" "}
          <Link to="/royalty-policy" className="text-primary hover:underline">
            Royalty Policy
          </Link>{" "}
          for full details on payout schedules and thresholds.
        </p>
        <p>
          Chosen One Distribution is not responsible for payment failures caused
          by issues with Stripe, customer banks, or invalid banking information
          provided by artists.
        </p>
      </Section>

      <Section title="6. Downloads and Expiry">
        <p>
          Upon successful payment, customers receive immediate access to
          download their purchased tracks in the original format (MP3 or WAV).
          Download links expire after 30 days from the date of purchase.
          Customers who register with email and PIN may re-download within the
          30-day window.
        </p>
      </Section>

      <Section title="7. Admin Rights and Account Termination">
        <p>
          Chosen One Distribution reserves the right to suspend, restrict, or
          terminate any artist or customer account at any time for violations of
          these Terms, suspicious activity, or at our sole discretion. Artists
          whose accounts are terminated will receive any outstanding royalties
          that have met the minimum payout threshold at the time of termination.
        </p>
      </Section>

      <Section title="8. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Chosen One Distribution shall
          not be liable for any indirect, incidental, special, consequential, or
          punitive damages, including lost profits, arising out of or related to
          your use of the Platform. Our total liability to you for any claim
          shall not exceed the amount paid by you to us in the 12 months prior
          to the claim.
        </p>
      </Section>

      <Section title="9. Changes to These Terms">
        <p>
          We may update these Terms from time to time. When we do, we will post
          the revised Terms on this page with an updated effective date.
          Continued use of the Platform after changes constitutes acceptance of
          the revised Terms.
        </p>
      </Section>

      <Section title="10. Contact">
        <p>
          For questions about these Terms, contact us at{" "}
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
