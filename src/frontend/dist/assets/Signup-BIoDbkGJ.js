import { d as useAuth, h as useNavigate, k as useAppStore, r as reactExports, j as jsxRuntimeExports, I as Input, B as Button, L as Link, l as ue, z as hashPin } from "./index-BpAo5YMU.js";
import { L as Label } from "./label-1OkuH9Nb.js";
import { E as EyeOff } from "./eye-off-Cc9Ur50y.js";
import { E as Eye } from "./eye-CjyP1uAs.js";
import { U as UserPlus } from "./user-plus-CCvurduJ.js";
function Signup() {
  const { isAuthenticated, signup } = useAuth();
  const navigate = useNavigate();
  const { showCrownBanner } = useAppStore();
  const [name, setName] = reactExports.useState("");
  const [pin, setPin] = reactExports.useState("");
  const [confirmPin, setConfirmPin] = reactExports.useState("");
  const [showPin, setShowPin] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [isPending, setIsPending] = reactExports.useState(false);
  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }
  const pinMismatch = confirmPin.length > 0 && pin !== confirmPin;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      ue.error("Artist name must be at least 2 characters.");
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
      await signup(name.trim(), pinHash);
      ue.success(`Account created! Welcome, ${name.trim()} 👑`);
      showCrownBanner(`Welcome to Chosen One 👑 ${name.trim()}`);
      navigate({ to: "/dashboard" });
    } catch (err) {
      const error = err;
      ue.error(error.message || "Signup failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in",
      "data-ocid": "signup-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl", children: "👑" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: "Join Chosen One" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Create your artist account and start distributing music" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated p-6 sm:p-8 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-name", children: "Artist / Stage Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "signup-name",
                  type: "text",
                  placeholder: "e.g. DJ Chosen One",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  autoComplete: "username",
                  autoFocus: true,
                  disabled: isPending,
                  "data-ocid": "signup-name-input"
                }
              ),
              name.trim().length > 0 && name.trim().length < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: "Name must be at least 2 characters" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-pin", children: "Create PIN (4–6 digits)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "signup-pin",
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
                    "data-ocid": "signup-pin-input"
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
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signup-confirm-pin", children: "Confirm PIN" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "signup-confirm-pin",
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
                    "data-ocid": "signup-confirm-pin-input"
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-md bg-primary/10 border border-primary/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-semibold", children: "85%" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "of every sale goes directly to you as the artist" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: isPending || name.trim().length < 2 || pin.length < 4 || pin !== confirmPin,
                className: "w-full h-11 font-semibold gap-2",
                "data-ocid": "signup-submit-btn",
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  isPending ? "Creating account…" : "Create Account"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3", children: "Already have an account?" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-sm text-primary hover:text-primary/80 font-medium transition-colors-fast",
              "data-ocid": "signup-login-link",
              children: "Sign in instead →"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "hover:text-foreground transition-colors-fast", children: "← Back to home" }) })
      ] })
    }
  );
}
export {
  Signup as default
};
