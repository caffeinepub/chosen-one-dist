import { j as jsxRuntimeExports, L as Link } from "./index-EKiXWDi-.js";
import { C as ChevronLeft } from "./chevron-left-D-Bkfm-i.js";
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "prose-legal", children }) })
  ] });
}
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8 sm:mb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg sm:text-xl text-primary mb-3 sm:mb-4 pb-2 border-b border-border", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-foreground/80 leading-relaxed text-sm sm:text-base", children })
  ] });
}
function TermsOfService() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Terms of Service", icon: "📜", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Agreement to Terms", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'By accessing or using Chosen One Distribution ("the Platform," "we," "our," or "us"), you agree to be bound by these Terms of Service. If you do not agree, you may not use the Platform. These Terms apply to all visitors, users, and artists who access or use the Platform in any capacity.' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution is a global music distribution platform that allows independent artists to upload, distribute, and sell their music, and allows customers to preview and purchase music tracks." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Account Registration", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Artists must create an account using a name and a 4–6 digit PIN. You are responsible for maintaining the confidentiality of your PIN. Sharing account credentials is prohibited. You must be at least 18 years old to create an artist account, or have the legal authority to enter into a binding agreement." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You agree to provide accurate, current, and complete information during registration. Accounts created with false information may be suspended or terminated at any time." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Artist Content & Uploads", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "By uploading music or any other content to the Platform, you represent and warrant that: (a) you own or have the necessary rights, licenses, and permissions for all content you upload; (b) the content does not infringe upon the intellectual property rights, privacy rights, or any other rights of any third party; (c) the content complies with all applicable laws and regulations." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You retain ownership of your music. By uploading content, you grant Chosen One Distribution a non-exclusive, worldwide, royalty-free license to host, display, distribute, and make your content available to customers through the Platform for the purpose of facilitating sales." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "AI-generated music is permitted on the Platform, provided you have the necessary rights to distribute the generated work." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Prohibited Uses", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "You may not use the Platform to:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Upload content that infringes copyrights, trademarks, or other intellectual property rights" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Upload content that is defamatory, obscene, harassing, threatening, or unlawful" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Use any automated means to access or scrape the Platform without permission" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Attempt to interfere with, disrupt, or disable any aspect of the Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Create multiple accounts to circumvent suspensions or bans" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Engage in fraudulent transactions or attempt to manipulate royalty calculations" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Distribute malware, viruses, or other harmful code through the Platform" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Payments and Royalties", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "All payments are processed through Stripe. Customers pay for music using supported payment methods. Artists receive 85% of each sale after Stripe's processing fees. Payouts require valid banking information on file. See our",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/royalty-policy", className: "text-primary hover:underline", children: "Royalty Policy" }),
        " ",
        "for full details on payout schedules and thresholds."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution is not responsible for payment failures caused by issues with Stripe, customer banks, or invalid banking information provided by artists." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Downloads and Expiry", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upon successful payment, customers receive immediate access to download their purchased tracks in the original format (MP3 or WAV). Download links expire after 30 days from the date of purchase. Customers who register with email and PIN may re-download within the 30-day window." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Admin Rights and Account Termination", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution reserves the right to suspend, restrict, or terminate any artist or customer account at any time for violations of these Terms, suspicious activity, or at our sole discretion. Artists whose accounts are terminated will receive any outstanding royalties that have met the minimum payout threshold at the time of termination." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Limitation of Liability", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To the maximum extent permitted by law, Chosen One Distribution shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, arising out of or related to your use of the Platform. Our total liability to you for any claim shall not exceed the amount paid by you to us in the 12 months prior to the claim." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "9. Changes to These Terms", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may update these Terms from time to time. When we do, we will post the revised Terms on this page with an updated effective date. Continued use of the Platform after changes constitutes acceptance of the revised Terms." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "10. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For questions about these Terms, contact us at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "mailto:ChosenOneProductions901@gmail.com",
          className: "text-primary hover:underline",
          children: "ChosenOneProductions901@gmail.com"
        }
      ),
      "."
    ] }) })
  ] });
}
export {
  TermsOfService as default
};
