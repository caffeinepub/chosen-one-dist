import { j as jsxRuntimeExports, L as Link } from "./index-BC7FGAoh.js";
import { C as ChevronLeft } from "./chevron-left-CccK--nq.js";
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
function RoyaltyPolicy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Royalty Policy", icon: "💰", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. Artist Revenue Split", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Chosen One Distribution operates on an 85/15 revenue split. Artists receive ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-primary", children: "85%" }),
        " of the net sale price of each track after Stripe payment processing fees. The remaining 15% is retained by Chosen One Distribution to cover platform operating costs, infrastructure, and development."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Example: If a customer purchases a track for $1.99, the artist receives approximately $1.69 (before Stripe's processing fee of approximately $0.28 + 2.9%, which is deducted from the Platform's share). Artists always receive 85% of the final net amount." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "2. Payment Processing", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "All payments on the Platform are processed in real-time through Stripe. Stripe charges standard processing fees (approximately 2.9% + $0.30 per transaction in the US; rates vary internationally). Stripe's fee is deducted before the 85/15 split is calculated, ensuring your 85% is calculated from the amount actually received by the Platform." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "3. Payout Schedule", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Royalties accrue in your artist dashboard as sales occur. Payouts are processed on a rolling basis once your account balance meets the minimum payout threshold. You can view your real-time earnings in the",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/royalties", className: "text-primary hover:underline", children: "Royalties Dashboard" }),
      "."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "4. Minimum Payout Threshold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Payouts are issued once your accrued balance reaches a minimum of",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "$10.00 USD" }),
      ". Balances below this threshold will roll over to the next payout period. There is no maximum payout limit."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "5. Banking Information Requirements", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "To receive payouts, artists must provide valid banking information through the Royalties Dashboard. Required information includes: bank account number, routing number (US) or IBAN/SWIFT (international), account holder name, and billing address." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution is not responsible for failed payouts caused by incorrect or outdated banking information. Artists are responsible for keeping their banking information current." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. International Payouts", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "International payouts are supported through Stripe's global payout infrastructure. Additional fees may apply for cross-border transfers and currency conversion. Artists outside the US should confirm Stripe's availability in their country before enrolling for payouts." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "7. Tax Responsibilities", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Artists are solely responsible for reporting and paying taxes on their royalty income in accordance with the laws of their jurisdiction. Chosen One Distribution does not withhold taxes on behalf of artists unless required by law. US-based artists earning more than $600/year may be required to provide a W-9 form. International artists may need to provide a W-8BEN form." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "8. Royalty Disputes", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you believe there is an error in your royalty calculations, contact us within 60 days of the relevant transaction. We will review your claim and provide a resolution within 10 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
        "Contact:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "mailto:ChosenOneProductions901@gmail.com",
            className: "text-primary hover:underline",
            children: "ChosenOneProductions901@gmail.com"
          }
        )
      ] })
    ] })
  ] });
}
export {
  RoyaltyPolicy as default
};
