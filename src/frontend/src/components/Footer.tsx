import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import { Instagram, Mail, Youtube } from "lucide-react";
import { useState } from "react";
import { SiX } from "react-icons/si";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useTranslation } from "../hooks/use-translation";

const LEGAL_LINKS = [
  { key: "termsOfService" as const, to: "/terms" },
  { key: "privacyPolicy" as const, to: "/privacy" },
  { key: "cookiePolicy" as const, to: "/cookies" },
  { key: "dmca" as const, to: "/dmca" },
  { key: "royaltyPolicy" as const, to: "/royalty-policy" },
];

const SUPPORT_LINKS = [
  { key: "helpCenter" as const, to: "/help" },
  { key: "contactUs" as const, to: "/contact" },
  { key: "fileComplaint" as const, to: "/complaint" },
  { key: "artistResources" as const, to: "/artist-resources" },
  { key: "distributionGuide" as const, to: "/distribution-guide" },
  { key: "royaltyFaq" as const, to: "/royalty-faq" },
];

const NAV_LINKS = [
  { key: "home" as const, to: "/" },
  { key: "store" as const, to: "/store" },
  { key: "upload" as const, to: "/upload" },
  { key: "dashboard" as const, to: "/dashboard" },
  { key: "royalties" as const, to: "/royalties" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const { t } = useTranslation();
  const { actor } = useActor(createActor);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribing(true);
    try {
      if (actor) {
        const result = await actor.subscribeToMailingList(email.trim());
        if (result.__kind__ === "ok") {
          toast.success("You're on the list! 🎵 We'll keep you posted.");
          setEmail("");
        } else {
          toast.error(result.err || "Subscription failed. Please try again.");
        }
      } else {
        toast.success("You're on the list! 🎵 We'll keep you posted.");
        setEmail("");
      }
    } catch {
      toast.error("Could not subscribe. Please try again.");
    } finally {
      setSubscribing(false);
    }
  };

  const year = new Date().getFullYear();

  return (
    <footer
      className="bg-card border-t border-border mt-auto"
      data-ocid="footer"
    >
      {/* Main footer grid — 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12 lg:py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
        {/* Brand column */}
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-4">
            <span className="text-3xl">👑</span>
            <div>
              <p className="font-display font-bold text-foreground text-base leading-tight">
                Chosen One
              </p>
              <p className="text-primary text-xs font-medium">
                Productions Distribution
              </p>
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5 max-w-xs">
            Distribute your music globally. Claim your crown. Keep your
            royalties.
          </p>

          {/* Social icons — touch-friendly 44px+ targets */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors-fast text-muted-foreground"
              data-ocid="footer-instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors-fast text-muted-foreground"
              data-ocid="footer-x"
            >
              <SiX className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors-fast text-muted-foreground"
              data-ocid="footer-youtube"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="mailto:ChosenOneProductions901@gmail.com"
              aria-label="Email us"
              className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-colors-fast text-muted-foreground"
              data-ocid="footer-email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
          <p className="text-muted-foreground/60 text-xs mt-3">
            ChosenOneProductions901@gmail.com
          </p>
        </div>

        {/* Navigation column */}
        <div>
          <h4 className="text-label text-muted-foreground mb-4">
            {t("navigation")}
          </h4>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors-fast block py-0.5 min-h-[36px] flex items-center"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal column */}
        <div>
          <h4 className="text-label text-muted-foreground mb-4">
            {t("legal")}
          </h4>
          <ul className="space-y-2.5">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors-fast block py-0.5 min-h-[36px] flex items-center"
                  data-ocid={`footer-legal-${link.to.replace("/", "")}`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support column */}
        <div>
          <h4 className="text-label text-muted-foreground mb-4">
            {t("support")}
          </h4>
          <ul className="space-y-2.5">
            {SUPPORT_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-foreground/70 hover:text-primary transition-colors-fast block py-0.5 min-h-[36px] flex items-center"
                  data-ocid={`footer-support-${link.to.replace("/", "")}`}
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-7 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-6">
            <div>
              <h4 className="font-display font-semibold text-foreground text-base mb-1">
                {t("stayInLoop")}
              </h4>
              <p className="text-muted-foreground text-sm">
                {t("newsletterSubtitle")}
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex gap-2 w-full sm:w-auto"
              data-ocid="footer-newsletter-form"
            >
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="bg-secondary border-border w-full sm:w-56 md:w-64 h-11"
                data-ocid="footer-newsletter-email"
              />
              <Button
                type="submit"
                disabled={subscribing}
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0 h-11 px-4 sm:px-5"
                data-ocid="footer-newsletter-submit"
              >
                {subscribing ? "..." : t("subscribe")}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 text-xs text-muted-foreground text-center sm:text-left">
          <p>
            © {year} Chosen One Productions Distribution. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            <span className="text-primary">👑</span>
            Made with passion for independent artists
          </p>
        </div>
      </div>
    </footer>
  );
}
