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

export default function DMCA() {
  return (
    <LegalPageShell title="DMCA Policy" icon="⚖️">
      <Section title="1. Our Commitment to Copyright">
        <p>
          Chosen One Distribution respects the intellectual property rights of
          others and expects our users to do the same. We comply with the
          Digital Millennium Copyright Act (DMCA) and respond promptly to valid
          notices of alleged copyright infringement.
        </p>
      </Section>

      <Section title="2. Filing a DMCA Takedown Notice">
        <p>
          If you believe that content on our Platform infringes your copyright,
          you may submit a takedown notice to us. Your notice must include all
          of the following:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            A physical or electronic signature of the copyright owner or
            authorized agent
          </li>
          <li>
            Identification of the copyrighted work(s) you claim have been
            infringed
          </li>
          <li>
            Identification of the specific content on our Platform that is
            allegedly infringing (include the track title, artist name, and URL
            or page location)
          </li>
          <li>
            Your contact information: name, address, telephone number, and email
            address
          </li>
          <li>
            A statement that you have a good-faith belief that the use is not
            authorized by the copyright owner, its agent, or the law
          </li>
          <li>
            A statement, under penalty of perjury, that the information in your
            notice is accurate and that you are the copyright owner or
            authorized to act on the owner's behalf
          </li>
        </ul>
        <p className="mt-3">
          Send DMCA notices to:{" "}
          <a
            href="mailto:ChosenOneProductions901@gmail.com"
            className="text-primary hover:underline"
          >
            ChosenOneProductions901@gmail.com
          </a>{" "}
          with the subject line:{" "}
          <strong className="text-foreground">DMCA Takedown Notice</strong>
        </p>
      </Section>

      <Section title="3. Our Response to Takedown Notices">
        <p>Upon receiving a complete and valid DMCA notice, we will:</p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>
            Promptly remove or disable access to the allegedly infringing
            content
          </li>
          <li>
            Notify the artist who uploaded the content that it has been removed
          </li>
          <li>
            Take appropriate action against repeat infringers, up to and
            including account termination
          </li>
        </ul>
      </Section>

      <Section title="4. Counter-Notice Procedure">
        <p>
          If you believe your content was removed in error, you may submit a
          counter-notice. Your counter-notice must include:
        </p>
        <ul className="list-disc pl-5 space-y-1 mt-2">
          <li>Your physical or electronic signature</li>
          <li>
            Identification of the removed content and its location before
            removal
          </li>
          <li>
            A statement under penalty of perjury that you have a good-faith
            belief the content was removed by mistake or misidentification
          </li>
          <li>Your name, address, telephone number, and email address</li>
          <li>
            A statement that you consent to the jurisdiction of the Federal
            District Court for the judicial district in which your address is
            located
          </li>
        </ul>
        <p className="mt-3">
          Upon receiving a valid counter-notice, we will forward it to the
          original complainant. If the complainant does not file a court action
          within 10–14 business days, the content may be restored.
        </p>
      </Section>

      <Section title="5. Repeat Infringer Policy">
        <p>
          Chosen One Distribution has a policy of terminating, in appropriate
          circumstances, the accounts of users who are repeat infringers of
          intellectual property rights. We reserve the right to terminate any
          artist account that has received multiple valid DMCA takedown notices.
        </p>
      </Section>

      <Section title="6. False Notices">
        <p>
          Be aware that knowingly making a false DMCA claim can result in legal
          liability. Under Section 512(f) of the DMCA, any person who knowingly
          materially misrepresents that material is infringing may be subject to
          damages, including costs and attorneys' fees.
        </p>
      </Section>
    </LegalPageShell>
  );
}
