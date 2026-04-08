import { j as jsxRuntimeExports, L as Link, r as reactExports } from "./index-BpAo5YMU.js";
import { C as ChevronLeft } from "./chevron-left-DqICLvsv.js";
import { C as ChevronUp, a as ChevronDown } from "./chevron-up-BfZAOPNX.js";
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
function FAQItem({ q, a }) {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-border rounded-xl overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((o) => !o),
        className: "w-full flex items-center justify-between px-5 py-4 text-left hover:bg-card/60 transition-colors-fast",
        "data-ocid": `royalty-faq-${q.slice(0, 20).replace(/\s+/g, "-").toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm pr-4", children: q }),
          open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "w-4 h-4 text-primary shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "w-4 h-4 text-muted-foreground shrink-0" })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-4 text-muted-foreground text-sm leading-relaxed border-t border-border bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-4", children: a }) })
  ] });
}
const FAQS = [
  {
    q: "What is the royalty split on Chosen One Distribution?",
    a: "Artists keep 85% of every sale. Chosen One Distribution retains 15% to cover platform costs. Stripe's payment processing fee is deducted before the split, ensuring your 85% is calculated from the net amount received by the platform."
  },
  {
    q: "How exactly are my earnings calculated?",
    a: "When a customer buys your $1.99 track, Stripe deducts their fee (~$0.28 + 2.9%). The remaining amount is split 85/15. Your earnings are tracked in real-time on your Royalties dashboard and update with every sale."
  },
  {
    q: "When will I receive my payout?",
    a: "Payouts are processed on a rolling basis once your account balance meets the $10.00 minimum threshold. Add your banking information in the Royalties section — once enrolled, payouts are triggered automatically when you hit the threshold."
  },
  {
    q: "What is the minimum payout threshold?",
    a: "The minimum payout is $10.00 USD. Balances below this amount roll over to the next period. There is no maximum limit — you can earn and receive any amount above the threshold."
  },
  {
    q: "What banking information do I need to enroll for payouts?",
    a: "US artists: bank account number and routing number. International artists: IBAN and SWIFT/BIC code. All artists: account holder name and billing address. Enter this information in the Royalties section of your dashboard."
  },
  {
    q: "Are international payouts supported?",
    a: "Yes. Payouts are processed through Stripe's global payout network, which supports most countries. Additional fees may apply for cross-border transfers and currency conversion. Check Stripe's website for supported countries and local payout rates."
  },
  {
    q: "Do I need to pay taxes on my royalty income?",
    a: "Yes. You are solely responsible for reporting and paying taxes on your royalty income. Chosen One Distribution does not withhold taxes unless required by law. US artists earning over $600/year may need to provide a W-9. International artists may need a W-8BEN."
  },
  {
    q: "What happens to my royalties if my account is suspended?",
    a: "If your account is suspended or terminated, any accrued balance that has met the $10.00 minimum threshold will be paid out. Balances below the threshold may be forfeited depending on the reason for suspension."
  },
  {
    q: "Can I see my earnings history?",
    a: "Yes. Your Royalties dashboard shows a complete history of all sales, including track titles, sale dates, amounts, and your royalty share for each transaction."
  },
  {
    q: "What if I believe my royalties are incorrect?",
    a: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      "Contact us within 60 days of the relevant transaction at",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "mailto:ChosenOneProductions901@gmail.com",
          className: "text-primary hover:underline",
          children: "ChosenOneProductions901@gmail.com"
        }
      ),
      " ",
      "with your artist name, the track title, and the sale date. We'll review and respond within 10 business days."
    ] })
  },
  {
    q: "How do I update my banking information?",
    a: "Go to Royalties → Payout Settings and edit your banking details. Changes take effect for the next payout cycle. Verify the new details carefully to avoid missed or misdirected payments."
  },
  {
    q: "Does AI-generated music qualify for royalties?",
    a: "Yes. AI-generated music is fully supported on Chosen One Distribution. As long as you have the rights to distribute the work, it qualifies for the same 85% royalty split as any other track."
  }
];
function RoyaltyFAQ() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Royalty FAQ", icon: "💎", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: [
      "Common questions about how royalties work on Chosen One Distribution — from the 85% split to payout schedules, banking requirements, and international transfers. For the full policy, see our",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/royalty-policy", className: "text-primary hover:underline", children: "Royalty Policy" }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mb-10", children: FAQS.map((faq) => /* @__PURE__ */ jsxRuntimeExports.jsx(FAQItem, { q: faq.q, a: faq.a }, faq.q)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 rounded-xl border border-primary/30 bg-primary/5 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium mb-2", children: "Still have royalty questions?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mb-4", children: "Read the full Royalty Policy or contact us directly." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/royalty-policy",
            className: "inline-flex items-center justify-center px-5 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast",
            children: "Full Royalty Policy"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            className: "inline-flex items-center justify-center px-5 py-2 rounded-lg border border-border text-foreground font-medium text-sm hover:border-primary/40 transition-colors-fast",
            children: "Contact Support"
          }
        )
      ] })
    ] })
  ] });
}
export {
  RoyaltyFAQ as default
};
