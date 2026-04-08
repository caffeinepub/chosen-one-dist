import { h as useNavigate, r as reactExports, j as jsxRuntimeExports, S as ShoppingBag, I as Input, B as Button, L as Link, l as ue } from "./index-DwqYJl65.js";
import { L as Label } from "./label-ezFZS5E4.js";
import { u as useCustomerAuth, h as hashPin } from "./use-customer-auth-DWGK5YQU.js";
import { E as EyeOff } from "./eye-off-CmIaFgZQ.js";
import { E as Eye } from "./eye-DhqReN6U.js";
import { U as UserPlus } from "./user-plus-CdaXQTXx.js";
function CustomerSignup() {
  const { isCustomerLoggedIn, customerSignup } = useCustomerAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [pin, setPin] = reactExports.useState("");
  const [confirmPin, setConfirmPin] = reactExports.useState("");
  const [showPin, setShowPin] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [isPending, setIsPending] = reactExports.useState(false);
  if (isCustomerLoggedIn) {
    navigate({ to: "/store" });
    return null;
  }
  const pinMismatch = confirmPin.length > 0 && pin !== confirmPin;
  const emailValid = email.trim().includes("@") && email.trim().includes(".");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailValid) {
      ue.error("Please enter a valid email address.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      ue.error("PIN must be 4–6 digits.");
      return;
    }
    if (pin !== confirmPin) {
      ue.error("PINs do not match.");
      return;
    }
    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await customerSignup(email.trim(), pinHash);
      ue.success(
        "Account created! 👑 You can now re-download your music anytime."
      );
      navigate({ to: "/store" });
    } catch (err) {
      const error = err;
      ue.error(error.message || "Registration failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in",
      "data-ocid": "customer-signup-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-6 h-6 sm:w-7 sm:h-7 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: "Save Your Purchases" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Register with email + PIN to re-download your music within 30 days" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 sm:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer-signup-email", children: "Email Address" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "customer-signup-email",
                  type: "email",
                  placeholder: "you@example.com",
                  value: email,
                  onChange: (e) => setEmail(e.target.value),
                  autoComplete: "email",
                  autoFocus: true,
                  disabled: isPending,
                  "data-ocid": "customer-signup-email-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer-signup-pin", children: "Create PIN (4–6 digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "customer-signup-pin",
                    type: showPin ? "text" : "password",
                    inputMode: "numeric",
                    placeholder: "Choose a 4–6 digit PIN",
                    value: pin,
                    onChange: (e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setPin(v);
                    },
                    maxLength: 6,
                    autoComplete: "new-password",
                    disabled: isPending,
                    className: "pr-10",
                    "data-ocid": "customer-signup-pin-input"
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "customer-signup-confirm", children: "Confirm PIN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "customer-signup-confirm",
                    type: showConfirm ? "text" : "password",
                    inputMode: "numeric",
                    placeholder: "Re-enter your PIN",
                    value: confirmPin,
                    onChange: (e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 6);
                      setConfirmPin(v);
                    },
                    maxLength: 6,
                    autoComplete: "new-password",
                    disabled: isPending,
                    className: `pr-10 ${pinMismatch ? "border-destructive focus-visible:ring-destructive" : ""}`,
                    "data-ocid": "customer-signup-confirm-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors-fast",
                    onClick: () => setShowConfirm((v) => !v),
                    "aria-label": showConfirm ? "Hide PIN" : "Show PIN",
                    tabIndex: -1,
                    children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                  }
                )
              ] }),
              pinMismatch && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "PINs do not match" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 p-3 rounded-md bg-primary/10 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-lg leading-none", children: "👑" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                "Your email and PIN let you sign back in to re-download purchased tracks for up to",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "30 days" }),
                " ",
                "after purchase."
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: isPending || !emailValid || pin.length < 4 || pin !== confirmPin,
                className: "w-full h-11 font-semibold gap-2",
                "data-ocid": "customer-signup-submit-btn",
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  isPending ? "Creating account…" : "Save My Purchases"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3", children: "Already registered?" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/customer-login",
              className: "text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast",
              "data-ocid": "customer-signup-login-link",
              children: "Sign in to My Purchases →"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/store",
            className: "hover:text-foreground transition-colors-fast",
            children: "← Back to Music Store"
          }
        ) })
      ] })
    }
  );
}
export {
  CustomerSignup as default
};
