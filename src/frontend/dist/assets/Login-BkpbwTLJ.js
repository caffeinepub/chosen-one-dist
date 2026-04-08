import { d as useAuth, c as useActor, h as useNavigate, r as reactExports, j as jsxRuntimeExports, I as Input, B as Button, N as LogIn, L as Link, l as ue, A as hashPin, f as createActor } from "./index-BC7FGAoh.js";
import { L as Label } from "./label-vR2P6V67.js";
import { E as EyeOff } from "./eye-off-Dqb_V4a7.js";
import { E as Eye } from "./eye-CCktssmI.js";
import { A as ArrowLeft } from "./arrow-left-DfRHu5ON.js";
import { C as CircleCheck } from "./circle-check-DsrxZxpb.js";
import { C as CircleAlert } from "./circle-alert-CCxb14Th.js";
import { K as KeyRound } from "./key-round-CVy6x8PV.js";
const MAX_ATTEMPTS = 3;
function Login() {
  const { isAuthenticated, login } = useAuth();
  const { actor } = useActor(createActor);
  const navigate = useNavigate();
  const [name, setName] = reactExports.useState("");
  const [pin, setPin] = reactExports.useState("");
  const [showPin, setShowPin] = reactExports.useState(false);
  const [isPending, setIsPending] = reactExports.useState(false);
  const [mode, setMode] = reactExports.useState("login");
  const [recoveryStep, setRecoveryStep] = reactExports.useState("name");
  const [recoveryName, setRecoveryName] = reactExports.useState("");
  const [securityQuestion, setSecurityQuestion] = reactExports.useState("");
  const [securityAnswer, setSecurityAnswer] = reactExports.useState("");
  const [newRecoveryPin, setNewRecoveryPin] = reactExports.useState("");
  const [showNewPin, setShowNewPin] = reactExports.useState(false);
  const [confirmRecoveryPin, setConfirmRecoveryPin] = reactExports.useState("");
  const [showConfirmPin, setShowConfirmPin] = reactExports.useState(false);
  const [attemptsLeft, setAttemptsLeft] = reactExports.useState(MAX_ATTEMPTS);
  const [isRateLimited, setIsRateLimited] = reactExports.useState(false);
  const [recoveryError, setRecoveryError] = reactExports.useState("");
  const [recoveryPending, setRecoveryPending] = reactExports.useState(false);
  if (isAuthenticated) {
    navigate({ to: "/dashboard" });
    return null;
  }
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      ue.error("Artist name must be at least 2 characters.");
      return;
    }
    if (!/^\d{4,6}$/.test(pin)) {
      ue.error("PIN must be 4–6 digits.");
      return;
    }
    setIsPending(true);
    try {
      const pinHash = await hashPin(pin);
      await login(name.trim(), pinHash);
      ue.success(`Welcome back, ${name.trim()}! 👑`);
      navigate({ to: "/dashboard" });
    } catch (err) {
      const error = err;
      ue.error(error.message || "Sign in failed. Please try again.");
    } finally {
      setIsPending(false);
    }
  };
  const handleRecoveryNameSubmit = async (e) => {
    e.preventDefault();
    if (!actor) {
      ue.error("Backend not available. Please try again.");
      return;
    }
    if (recoveryName.trim().length < 2) {
      setRecoveryError("Please enter your artist name.");
      return;
    }
    setRecoveryError("");
    setRecoveryPending(true);
    try {
      const question = await actor.getArtistSecurityQuestion(
        recoveryName.trim()
      );
      if (question === null || question === void 0) {
        setRecoveryError(
          "No security question on file — please contact the admin to reset your PIN."
        );
        return;
      }
      setSecurityQuestion(question);
      setRecoveryStep("verify");
    } catch {
      setRecoveryError("Could not look up account. Please try again.");
    } finally {
      setRecoveryPending(false);
    }
  };
  const handleRecoveryVerifySubmit = async (e) => {
    e.preventDefault();
    if (!actor) {
      ue.error("Backend not available. Please try again.");
      return;
    }
    if (securityAnswer.trim() === "") {
      setRecoveryError("Please enter your answer.");
      return;
    }
    if (!/^\d{4,6}$/.test(newRecoveryPin)) {
      setRecoveryError("New PIN must be 4–6 digits.");
      return;
    }
    if (newRecoveryPin !== confirmRecoveryPin) {
      setRecoveryError("PINs do not match. Please try again.");
      return;
    }
    setRecoveryError("");
    setRecoveryPending(true);
    try {
      const answerHash = await hashPin(securityAnswer.toLowerCase().trim());
      const newPinHash = await hashPin(newRecoveryPin);
      const result = await actor.resetPINWithSecurityAnswer(
        recoveryName.trim(),
        answerHash,
        newPinHash
      );
      if (result.__kind__ === "ok") {
        setRecoveryStep("success");
      } else {
        const remaining = attemptsLeft - 1;
        setAttemptsLeft(remaining);
        if (remaining <= 0) {
          setIsRateLimited(true);
          setRecoveryError(
            "Too many attempts. Please wait 15 minutes before trying again."
          );
        } else {
          setRecoveryError(
            `Incorrect answer. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`
          );
        }
      }
    } catch {
      setRecoveryError("Something went wrong. Please try again.");
    } finally {
      setRecoveryPending(false);
    }
  };
  const resetRecovery = () => {
    setMode("login");
    setRecoveryStep("name");
    setRecoveryName("");
    setSecurityQuestion("");
    setSecurityAnswer("");
    setNewRecoveryPin("");
    setConfirmRecoveryPin("");
    setAttemptsLeft(MAX_ATTEMPTS);
    setIsRateLimited(false);
    setRecoveryError("");
  };
  const enterRecovery = () => {
    setMode("recovery");
    setRecoveryStep("name");
    setRecoveryError("");
  };
  const renderRecoveryContent = () => {
    if (recoveryStep === "success") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex flex-col items-center text-center gap-5 py-4",
          "data-ocid": "recovery-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/15 gold-glow", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-7 h-7 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-lg text-foreground mb-1", children: "PIN Updated!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "You can now sign in with your new PIN." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                className: "w-full h-11 font-semibold gap-2",
                onClick: resetRecovery,
                "data-ocid": "recovery-back-signin-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  "Back to Sign In"
                ]
              }
            )
          ]
        }
      );
    }
    if (recoveryStep === "name") {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleRecoveryNameSubmit,
          className: "space-y-5",
          "data-ocid": "recovery-step-name",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Enter your artist name and we'll look up your security question." }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "recovery-name", children: "Artist Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "recovery-name",
                  type: "text",
                  placeholder: "Your artist / stage name",
                  value: recoveryName,
                  onChange: (e) => {
                    setRecoveryName(e.target.value);
                    setRecoveryError("");
                  },
                  autoFocus: true,
                  disabled: recoveryPending,
                  "data-ocid": "recovery-name-input"
                }
              )
            ] }),
            recoveryError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-start gap-2 text-destructive text-sm bg-destructive/10 rounded-md px-3 py-2",
                "data-ocid": "recovery-error",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: recoveryError })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                type: "submit",
                disabled: recoveryPending || recoveryName.trim().length < 2,
                className: "w-full h-11 font-semibold",
                "data-ocid": "recovery-name-next-btn",
                children: [
                  recoveryPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : null,
                  recoveryPending ? "Looking up…" : "Next →"
                ]
              }
            )
          ]
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "form",
      {
        onSubmit: handleRecoveryVerifySubmit,
        className: "space-y-5",
        "data-ocid": "recovery-step-verify",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-primary/30 bg-primary/5 px-4 py-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 uppercase tracking-wider font-medium", children: "Security Question" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: securityQuestion })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "recovery-answer", children: "Your Answer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Input,
              {
                id: "recovery-answer",
                type: "text",
                placeholder: "Type your answer",
                value: securityAnswer,
                onChange: (e) => {
                  setSecurityAnswer(e.target.value);
                  setRecoveryError("");
                },
                autoFocus: true,
                disabled: recoveryPending || isRateLimited,
                "data-ocid": "recovery-answer-input"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "recovery-new-pin", children: "New PIN (4–6 digits)" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "recovery-new-pin",
                  type: showNewPin ? "text" : "password",
                  inputMode: "numeric",
                  placeholder: "Choose a new PIN",
                  value: newRecoveryPin,
                  onChange: (e) => {
                    setNewRecoveryPin(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    );
                    setRecoveryError("");
                  },
                  maxLength: 6,
                  disabled: recoveryPending || isRateLimited,
                  className: "pr-10",
                  "data-ocid": "recovery-new-pin-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200",
                  onClick: () => setShowNewPin((v) => !v),
                  "aria-label": showNewPin ? "Hide PIN" : "Show PIN",
                  tabIndex: -1,
                  children: showNewPin ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "recovery-confirm-pin", children: "Confirm New PIN" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "recovery-confirm-pin",
                  type: showConfirmPin ? "text" : "password",
                  inputMode: "numeric",
                  placeholder: "Re-enter your new PIN",
                  value: confirmRecoveryPin,
                  onChange: (e) => {
                    setConfirmRecoveryPin(
                      e.target.value.replace(/\D/g, "").slice(0, 6)
                    );
                    setRecoveryError("");
                  },
                  maxLength: 6,
                  disabled: recoveryPending || isRateLimited,
                  className: "pr-10",
                  "data-ocid": "recovery-confirm-pin-input"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200",
                  onClick: () => setShowConfirmPin((v) => !v),
                  "aria-label": showConfirmPin ? "Hide PIN" : "Show PIN",
                  tabIndex: -1,
                  children: showConfirmPin ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
                }
              )
            ] })
          ] }),
          recoveryError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-start gap-2 text-destructive text-sm bg-destructive/10 rounded-md px-3 py-2",
              "data-ocid": "recovery-error",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 mt-0.5 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: recoveryError })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "submit",
              disabled: recoveryPending || isRateLimited || securityAnswer.trim() === "" || newRecoveryPin.length < 4 || confirmRecoveryPin.length < 4,
              className: "w-full h-11 font-semibold gap-2",
              "data-ocid": "recovery-verify-btn",
              children: [
                recoveryPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "w-4 h-4" }),
                recoveryPending ? "Verifying…" : "Reset PIN"
              ]
            }
          )
        ]
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "min-h-[80vh] flex items-center justify-center px-4 py-10 sm:py-12 animate-fade-in",
      "data-ocid": "login-page",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-6 sm:mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/15 gold-glow mb-3 sm:mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl sm:text-3xl", children: "👑" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-2", children: mode === "recovery" ? "Recover PIN" : "Welcome Back" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: mode === "recovery" ? "Answer your security question to reset your PIN" : "Sign in to your Chosen One Productions account" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated p-6 sm:p-8 space-y-6", children: mode === "login" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLoginSubmit, className: "space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-name", children: "Artist Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input,
                {
                  id: "login-name",
                  type: "text",
                  placeholder: "Your artist / stage name",
                  value: name,
                  onChange: (e) => setName(e.target.value),
                  autoComplete: "username",
                  autoFocus: true,
                  disabled: isPending,
                  "data-ocid": "login-name-input"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "login-pin", children: "PIN Code" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "login-pin",
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
                    "data-ocid": "login-pin-input"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200",
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
                disabled: isPending || !name.trim() || pin.length < 4,
                className: "w-full h-11 font-semibold gap-2",
                "data-ocid": "login-submit-btn",
                children: [
                  isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "animate-spin inline-block", children: "⏳" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
                  isPending ? "Signing in…" : "Sign In"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: enterRecovery,
              className: "text-xs text-muted-foreground hover:text-primary transition-colors duration-200 underline underline-offset-2",
              "data-ocid": "forgot-pin-link",
              children: "Forgot PIN?"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full border-t border-border" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex justify-center text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-card px-3", children: "New to Chosen One?" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/signup",
              className: "text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200",
              "data-ocid": "login-signup-link",
              children: "Create your artist account →"
            }
          ) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          recoveryStep !== "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: recoveryStep === "name" ? "text-primary font-semibold" : "text-muted-foreground",
                children: "1. Name"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: recoveryStep === "verify" ? "text-primary font-semibold" : "text-muted-foreground",
                children: "2. Verify & Reset"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border", children: "→" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "3. Done" })
          ] }),
          renderRecoveryContent(),
          recoveryStep !== "success" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center pt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: resetRecovery,
              className: "inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors duration-200",
              "data-ocid": "recovery-back-login-link",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-3 h-3" }),
                "Back to Sign In"
              ]
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center mt-6 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "hover:text-foreground transition-colors duration-200",
            children: "← Back to home"
          }
        ) })
      ] })
    }
  );
}
export {
  Login as default
};
