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
const COOKIE_TYPES = [
  {
    name: "Strictly Necessary Cookies",
    purpose: "Required for the Platform to function. These include session authentication tokens that keep you logged in as an artist and maintain your shopping cart state.",
    canOptOut: false
  },
  {
    name: "Preference Cookies",
    purpose: "Remember your settings such as language preference and dark mode. These cookies persist your choices so you don't have to reset them on every visit.",
    canOptOut: true
  },
  {
    name: "Analytics Cookies",
    purpose: "Collect anonymized data about how users interact with the Platform — which pages are viewed, how many times songs are previewed, and general traffic patterns. This data powers the artist analytics dashboard.",
    canOptOut: true
  },
  {
    name: "Payment Session Cookies",
    purpose: "Used by Stripe during checkout to maintain the payment session. These are set by Stripe and governed by Stripe's own privacy and cookie policy.",
    canOptOut: false
  }
];
function CookiePolicy() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "Cookie Policy", icon: "🍪", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "1. What Are Cookies?", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Cookies are small text files placed on your device by a website or web application when you visit it. They help the site remember information about your visit — like your preferred language or login state — making your next visit easier and the site more useful." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: 'We also use similar technologies like local storage and session storage for some of these purposes. This policy covers all such technologies collectively referred to as "cookies."' })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "2. Types of Cookies We Use", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5 mt-2", children: COOKIE_TYPES.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-4 rounded-xl border border-border bg-card/50",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: c.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs px-2 py-0.5 rounded-full font-medium ${c.canOptOut ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`,
                children: c.canOptOut ? "Optional" : "Required"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: c.purpose })
        ]
      },
      c.name
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. How to Control Cookies", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Most web browsers allow you to control cookies through their settings. You can typically:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "View what cookies have been set and delete them" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Block third-party cookies" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Block all cookies (note: this will break login and cart functionality)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Set preferences for specific websites" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "For instructions specific to your browser, visit the browser's help section or a resource like allaboutcookies.org." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "4. Third-Party Cookies", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "Stripe, our payment processor, may set cookies during the checkout process. These cookies are subject to",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "https://stripe.com/privacy",
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-primary hover:underline",
          children: "Stripe's Privacy Policy"
        }
      ),
      " ",
      "and are not within our control."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "5. Changes to This Policy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated effective date. Your continued use of the Platform after any changes constitutes acceptance." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. Contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "For questions about our use of cookies, contact us at",
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
  CookiePolicy as default
};
