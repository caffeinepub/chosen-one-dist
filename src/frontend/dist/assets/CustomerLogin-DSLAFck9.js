import { h as useNavigate, r as reactExports, j as jsxRuntimeExports, S as ShoppingBag, I as Input, B as Button, N as LogIn, L as Link, l as ue } from "./index-DwqYJl65.js";
import { L as Label } from "./label-ezFZS5E4.js";
import { u as useCustomerAuth, h as hashPin } from "./use-customer-auth-DWGK5YQU.js";
import { E as EyeOff } from "./eye-off-CmIaFgZQ.js";
import { E as Eye } from "./eye-DhqReN6U.js";
function CustomerLogin() {
  const { isCustomerLoggedIn, customerLogin } = useCustomerAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [pin, setPin] = reactExports.useState("");
  const [showPin, setShowPin] = reactExports.useState(false);
  const [isPending, setIsPending] = reactExports.useState(false);
  if (isCustomerLoggedIn) {
    navigate({ to: "/store" });
    return null;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailTrimmed = email.trim();
    if (!emailTrimmed.includes("@") || !emailTrimmed.includes(".")) {
      ue.error("Please enter a valid email address.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      ue.error("PIN must be 4–6 digits.");
      return;
    }
    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await customerLogin(emailTrimmed, pinHash);
      ue.success("Welcome back! 👑 Your purchases are ready.");
      navigate({ to: "/store" });
    } catch (err) {
      const error = err;
      ue.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in",
      "data-ocid": "customer-login-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 sm:w-7 sm:h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: "My Purchases" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in to access and re-download your music" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 sm:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer-login-email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customer-login-email",
                  type: "email",
                  placeholder: "you@example.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  autoComplete: "email",
                  autoFocus: true,
                  disabled: isPending,
                  "data-ocid": "customer-login-email-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer-login-pin", children: "PIN Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "customer-login-pin",
                    type: showPin ? "text" : "password",
                    inputMode: "numeric",
                    placeholder: "Enter your 4–6 digit PIN",
                    value: pin,
                    onChange: (e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPin(v);
                    },
                    maxLength: 6,
                    autoComplete: "current-password",
                    disabled: isPending,
                    className: "pr-10",
                    "data-ocid": "customer-login-pin-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors-fast",
                    onClick: () => setShowPin((v) => !v),
                    "aria-label": showPin ? "Hide PIN" : "Show PIN",
                    tabIndex: -1,
                    children: showPin ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: isPending || !email.trim().includes("@") || pin.length < 4,
                className: "w-full h-11 font-semibold gap-2",
                "data-ocid": "customer-login-submit-btn",
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  isPending ? "Signing in…" : "Sign In to My Purchases"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-primary/5 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
            "New customer?",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-medium", children: "Register after purchase" }),
            " ",
            "to save your music for re-download within 30 days."
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3", children: "Browse the store" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/store",
              className: "text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast",
              "data-ocid": "customer-login-store-link",
              children: "← Back to Music Store"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center mt-6 text-xs text-muted-foreground", children: [
          "Are you an artist?",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-primary hover:text-primary/80 font-medium transition-colors-fast",
              children: "Artist sign in →"
            }
          )
        ] })
      ] })
    }
  );
}
export {
  CustomerLogin as default
};
