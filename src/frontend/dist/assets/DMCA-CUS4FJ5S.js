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
function DMCA() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(LegalPageShell, { title: "DMCA Policy", icon: "⚖️", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "1. Our Commitment to Copyright", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution respects the intellectual property rights of others and expects our users to do the same. We comply with the Digital Millennium Copyright Act (DMCA) and respond promptly to valid notices of alleged copyright infringement." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "2. Filing a DMCA Takedown Notice", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you believe that content on our Platform infringes your copyright, you may submit a takedown notice to us. Your notice must include all of the following:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A physical or electronic signature of the copyright owner or authorized agent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the copyrighted work(s) you claim have been infringed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the specific content on our Platform that is allegedly infringing (include the track title, artist name, and URL or page location)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your contact information: name, address, telephone number, and email address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement that you have a good-faith belief that the use is not authorized by the copyright owner, its agent, or the law" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement, under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the owner's behalf" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-3", children: [
        "Send DMCA notices to:",
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
        "with the subject line:",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "DMCA Takedown Notice" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "3. Our Response to Takedown Notices", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Upon receiving a complete and valid DMCA notice, we will:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Promptly remove or disable access to the allegedly infringing content" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Notify the artist who uploaded the content that it has been removed" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Take appropriate action against repeat infringers, up to and including account termination" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Section, { title: "4. Counter-Notice Procedure", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "If you believe your content was removed in error, you may submit a counter-notice. Your counter-notice must include:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc pl-5 space-y-1 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your physical or electronic signature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Identification of the removed content and its location before removal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement under penalty of perjury that you have a good-faith belief the content was removed by mistake or misidentification" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Your name, address, telephone number, and email address" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3", children: "Upon receiving a valid counter-notice, we will forward it to the original complainant. If the complainant does not file a court action within 10–14 business days, the content may be restored." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "5. Repeat Infringer Policy", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Chosen One Distribution has a policy of terminating, in appropriate circumstances, the accounts of users who are repeat infringers of intellectual property rights. We reserve the right to terminate any artist account that has received multiple valid DMCA takedown notices." }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Section, { title: "6. False Notices", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Be aware that knowingly making a false DMCA claim can result in legal liability. Under Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material is infringing may be subject to damages, including costs and attorneys' fees." }) })
  ] });
}
export {
  DMCA as default
};
