import { r as reactExports, j as jsxRuntimeExports, L as Link, B as Button, I as Input } from "./index-DkJerdwd.js";
import { L as Label } from "./label-CvgpiRfx.js";
import { T as Textarea } from "./textarea-BgC_6g8s.js";
import { C as ChevronLeft } from "./chevron-left-dDSYbZM4.js";
import { C as CircleCheckBig } from "./circle-check-big-DVmtTslx.js";
const ISSUE_TYPES = [
  "Copyright / DMCA",
  "Payment Issue",
  "Download Problem",
  "Account Access",
  "Artist Dispute",
  "Inappropriate Content",
  "Royalty Discrepancy",
  "Technical Bug",
  "Other"
];
function FileComplaint() {
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [form, setForm] = reactExports.useState({
    name: "",
    email: "",
    issueType: "",
    description: ""
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.issueType || !form.description.trim())
      return;
    setSubmitted(true);
  };
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
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl sm:text-4xl", children: "📋" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl md:text-4xl text-foreground leading-tight", children: "File a Complaint" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-2 sm:mt-3", children: "Chosen One Distribution · Last updated: April 2026" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-12", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-16", "data-ocid": "complaint-success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center mx-auto mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-10 h-10 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground mb-3", children: "Complaint Received 👑" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6 leading-relaxed", children: "Thank you for reaching out. Your complaint has been noted. For direct communication or if your matter is urgent, please email us directly at:" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "mailto:ChosenOneProductions901@gmail.com",
          className: "inline-block px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90 transition-colors-fast",
          children: "ChosenOneProductions901@gmail.com"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs mt-6", children: "We aim to respond to all complaints within 1–3 business days." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "button",
          variant: "outline",
          className: "mt-6",
          onClick: () => {
            setSubmitted(false);
            setForm({
              name: "",
              email: "",
              issueType: "",
              description: ""
            });
          },
          children: "Submit Another Complaint"
        }
      )
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: [
        "Use this form to submit a formal complaint or dispute. All complaints are reviewed by our team. Provide as much detail as possible so we can address your concern promptly. If your issue requires immediate attention, email us directly at",
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-6",
          "data-ocid": "complaint-form",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "complaint-name", children: "Full Name *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "complaint-name",
                    value: form.name,
                    onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
                    placeholder: "Your name",
                    required: true,
                    "data-ocid": "complaint-name-input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "complaint-email", children: "Email Address *" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "complaint-email",
                    type: "email",
                    value: form.email,
                    onChange: (e) => setForm((f) => ({ ...f, email: e.target.value })),
                    placeholder: "your@email.com",
                    required: true,
                    "data-ocid": "complaint-email-input"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "complaint-type", children: "Issue Type *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  id: "complaint-type",
                  value: form.issueType,
                  onChange: (e) => setForm((f) => ({ ...f, issueType: e.target.value })),
                  required: true,
                  className: "w-full border border-input bg-background rounded-md px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
                  "data-ocid": "complaint-type-select",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select an issue type..." }),
                    ISSUE_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t }, t))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "complaint-desc", children: "Description *" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  id: "complaint-desc",
                  value: form.description,
                  onChange: (e) => setForm((f) => ({ ...f, description: e.target.value })),
                  placeholder: "Describe your complaint in detail. Include any relevant track titles, artist names, order numbers, or dates.",
                  rows: 6,
                  required: true,
                  className: "resize-none",
                  "data-ocid": "complaint-desc-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "submit",
                className: "w-full bg-primary text-primary-foreground hover:bg-primary/90",
                "data-ocid": "complaint-submit-btn",
                children: "Submit Complaint"
              }
            )
          ]
        }
      )
    ] }) })
  ] });
}
export {
  FileComplaint as default
};
