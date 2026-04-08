import { j as jsxRuntimeExports, L as Link } from "./index-gcvG85BJ.js";
import { C as ChevronLeft } from "./chevron-left-jWGIkQQp.js";
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
function Section({
  title,
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mb-8 sm:mb-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-lg sm:text-xl text-primary mb-3 sm:mb-4 pb-2 border-b border-border", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 text-foreground/80 leading-relaxed text-sm sm:text-base", children })
  ] });
}
function PrivacyPolicy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Privacy Policy", icon: "🔒", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. Introduction", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'Chosen One Distribution ("we," "our," or "us") respects your privacy. This Privacy Policy explains how we collect, use, store, and protect your personal information when you use our Platform. By using the Platform, you consent to the practices described in this Policy.' }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Information We Collect", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Artist Information:" }),
        " When you register as an artist, we collect your artist name and a hashed version of your PIN. We never store your raw PIN — it is cryptographically hashed before storage."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Customer Information:" }),
        " ",
        "Customers who choose to register for re-downloads provide an email address and create a PIN. This information is used solely for re-download authentication."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Purchase Data:" }),
        " We store records of completed purchases including the songs purchased, purchase timestamp, and total amount paid. This data is used for download access, receipts, and royalty calculations."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Banking Information:" }),
        " ",
        "Artists who enroll for payouts provide banking details. This information is stored securely and used exclusively for processing royalty payouts."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Usage Analytics:" }),
        " We collect anonymized analytics including page views, song previews, and purchase events to improve platform performance and provide artists with real-time dashboard data."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Mailing List:" }),
        " Users who subscribe to our mailing list provide an email address, which is used to send platform updates. Subscriber emails are routed to ChosenOneProductions901@gmail.com."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "3. How We Use Your Information", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide and maintain Platform functionality" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To process payments and calculate artist royalties" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To authenticate users and protect account security" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To provide download access for purchased music" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To send mailing list updates to subscribers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To display real-time analytics on artist dashboards" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "To enforce our Terms of Service and prevent fraud" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "4. Data Storage on the Internet Computer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This Platform is built on the Internet Computer, a decentralized blockchain network. Data stored on the Internet Computer is replicated across a network of nodes and benefits from the security properties of the blockchain. Data cannot be unilaterally deleted by a single party without proper canister-level authorization." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "5. Data Sharing", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We do not sell, rent, or share your personal information with third parties for marketing purposes. Information may be shared with Stripe solely for the purpose of processing payments. We may disclose information when required by law or to protect the rights and safety of users." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "6. Your Rights (GDPR / CCPA)", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Depending on your jurisdiction, you may have the right to: access, correct, or delete your personal data; opt out of certain data processing; and receive a copy of your data in a portable format. To exercise any of these rights, contact us at",
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
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "California residents have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and the right to opt out of the sale of personal information (which we do not do)." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Cookies", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "We use cookies and similar technologies to maintain session state, remember preferences, and collect analytics data. See our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cookies", className: "text-primary hover:underline", children: "Cookie Policy" }),
      " ",
      "for full details."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "8. Children's Privacy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "The Platform is not intended for users under the age of 13. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information, please contact us immediately." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "9. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For privacy-related questions, contact us at",
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
  PrivacyPolicy as default
};
