import { h as useNavigate, c as useActor, d as useAuth, i as useCartStore, r as reactExports, l as ue, j as jsxRuntimeExports, m as ShoppingCart, L as Link, B as Button, o as Separator, I as Input, X, f as createActor } from "./index-gcvG85BJ.js";
import { B as Badge } from "./badge-CnImlErL.js";
import { L as Label } from "./label-DbFD65QY.js";
import { u as useCustomerAuth, h as hashPin } from "./use-customer-auth-NWJela6v.js";
import { M as Music } from "./music-BVc9opxk.js";
import { A as ArrowLeft } from "./arrow-left-B76nnb83.js";
import { C as Crown } from "./crown-COpYXvMP.js";
import { L as Lock } from "./lock-f6iDfLaD.js";
import { C as CreditCard } from "./credit-card-Ckwh3erq.js";
import { U as UserPlus } from "./user-plus-D7DqJkJi.js";
import { C as CircleCheck } from "./circle-check-D8LLCo8l.js";
import { T as Trash2 } from "./trash-2-B3rotxkz.js";
const PAYMENT_METHODS = [
  { id: "apple-pay", label: "Apple Pay", icon: "🍎" },
  { id: "google-pay", label: "Google Pay", icon: "G" },
  { id: "paypal", label: "PayPal", icon: "P" },
  { id: "cashapp", label: "Cash App", icon: "$" },
  { id: "zelle", label: "Zelle", icon: "Z" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" }
];
function formatCardNumber(value) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  const groups = digits.match(/.{1,4}/g) ?? [];
  return groups.join(" ");
}
function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
}
function getGenreColor(genre) {
  const map = {
    "Hip-Hop": "from-amber-950 to-amber-900",
    "R&B": "from-purple-950 to-purple-900",
    Pop: "from-pink-950 to-pink-900",
    Electronic: "from-cyan-950 to-cyan-900",
    Rock: "from-red-950 to-red-900"
  };
  return map[genre] ?? "from-zinc-900 to-zinc-800";
}
function CheckoutPage() {
  const navigate = useNavigate();
  const { actor } = useActor(createActor);
  const { isAuthenticated, sessionToken } = useAuth();
  const { isCustomerLoggedIn, customerToken, customerEmail, customerSignup } = useCustomerAuth();
  const { items: cartItems, clearCart, removeItem } = useCartStore();
  const [selectedMethod, setSelectedMethod] = reactExports.useState("card");
  const [cardName, setCardName] = reactExports.useState("");
  const [cardNumber, setCardNumber] = reactExports.useState("");
  const [cardExpiry, setCardExpiry] = reactExports.useState("");
  const [cardCvc, setCardCvc] = reactExports.useState("");
  const [hasRemovedItem, setHasRemovedItem] = reactExports.useState(false);
  const [isProcessing, setIsProcessing] = reactExports.useState(false);
  const [showRegisterPrompt, setShowRegisterPrompt] = reactExports.useState(false);
  const [regEmail, setRegEmail] = reactExports.useState("");
  const [regPin, setRegPin] = reactExports.useState("");
  const [regConfirmPin, setRegConfirmPin] = reactExports.useState("");
  const [isRegistering, setIsRegistering] = reactExports.useState(false);
  const totalCents = cartItems.reduce(
    (sum, item) => sum + Number(item.track.priceInCents),
    0
  );
  const totalDollars = (totalCents / 100).toFixed(2);
  const handleRemoveItem = (trackId) => {
    const item = cartItems.find((i) => i.track.id === trackId);
    removeItem(trackId);
    setHasRemovedItem(true);
    if (item) ue.success(`"${item.track.title}" removed from cart`);
  };
  reactExports.useEffect(() => {
    if (hasRemovedItem && cartItems.length === 0) {
      ue.info("Your cart is empty. Returning to the store.");
      void navigate({ to: "/store" });
    }
  }, [hasRemovedItem, cartItems.length, navigate]);
  const handleAlternativePay = async (_method) => {
    if (!actor || cartItems.length === 0) return;
    setIsProcessing(true);
    try {
      const origin = window.location.origin;
      const firstTrack = cartItems[0].track;
      const activeToken = customerToken ?? sessionToken ?? "";
      if (cartItems.length === 1) {
        const successUrl = `${origin}/store?purchase=success&trackId=${firstTrack.id}&session={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/checkout`;
        const result = await actor.createTrackCheckoutSession(
          activeToken,
          firstTrack.id,
          successUrl,
          cancelUrl
        );
        if (result.__kind__ === "err") throw new Error(result.err);
        const parsed = JSON.parse(result.ok);
        if (parsed.url) {
          clearCart();
          window.location.href = parsed.url;
        } else throw new Error(parsed.error ?? "No checkout URL returned");
      } else {
        const items = cartItems.map((item) => ({
          productName: item.track.title,
          currency: "usd",
          quantity: BigInt(1),
          priceInCents: item.track.priceInCents,
          productDescription: `${item.track.title} by ${item.track.artistName}`
        }));
        const trackIds = cartItems.map((i) => i.track.id);
        const successUrl = `${origin}/store?purchase=success&trackIds=${trackIds.join(",")}&session={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${origin}/checkout`;
        const sessionUrl = await actor.createCheckoutSession(
          items,
          successUrl,
          cancelUrl
        );
        const parsed = JSON.parse(sessionUrl);
        if (parsed.url) {
          clearCart();
          window.location.href = parsed.url;
        } else throw new Error(parsed.error ?? "No checkout URL returned");
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Checkout failed";
      ue.error(`Payment error: ${msg}`);
    } finally {
      setIsProcessing(false);
    }
  };
  const handleCardSubmit = async (e) => {
    e.preventDefault();
    if (!cardName.trim()) {
      ue.error("Please enter the cardholder name.");
      return;
    }
    const rawDigits = cardNumber.replace(/\s/g, "");
    if (rawDigits.length < 13) {
      ue.error("Please enter a valid card number.");
      return;
    }
    if (cardExpiry.length < 5) {
      ue.error("Please enter a valid expiry date.");
      return;
    }
    if (cardCvc.length < 3) {
      ue.error("Please enter a valid CVC.");
      return;
    }
    await handleAlternativePay();
  };
  if (cartItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-16 h-16 text-muted-foreground/30 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Your cart is empty" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Add some tracks from the store before checking out." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/store", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "gap-2 bg-primary text-primary-foreground hover:bg-primary/90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4" }),
        "Browse Store"
      ] }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", "data-ocid": "checkout-page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-card border-b border-border sticky top-0 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => navigate({ to: "/store" }),
          className: "flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors text-sm min-h-[44px]",
          "data-ocid": "checkout-back-btn",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: "Back to Store" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sm:hidden", children: "Back" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-4 h-4 sm:w-5 sm:h-5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-xs sm:text-sm", children: "Chosen One Distribution" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-muted-foreground" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl sm:text-3xl text-foreground mb-1 sm:mb-2", children: "Secure Checkout" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs sm:text-sm mb-6 sm:mb-8", children: "Your payment is secured by Stripe. All transactions are encrypted." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col-reverse lg:grid lg:grid-cols-5 gap-6 sm:gap-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-3 space-y-5 sm:space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-card border border-border rounded-xl p-4 sm:p-6 space-y-4",
              "data-ocid": "payment-method-selector",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-sm sm:text-base", children: "Payment Method" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex gap-2 overflow-x-auto pb-1 sm:grid sm:grid-cols-3 sm:gap-3 scrollbar-hide",
                    style: { WebkitOverflowScrolling: "touch" },
                    children: PAYMENT_METHODS.filter((m) => m.id !== "card").map(
                      (method) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            setSelectedMethod(method.id);
                            handleAlternativePay(method.id);
                          },
                          disabled: isProcessing,
                          className: `flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg border transition-smooth text-xs sm:text-sm font-medium shrink-0 sm:shrink min-h-[44px] ${selectedMethod === method.id ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-foreground hover:border-primary/40 hover:bg-muted/50"}`,
                          "data-ocid": `payment-method-${method.id}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm w-4 text-center shrink-0", children: method.icon }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: method.label })
                          ]
                        },
                        method.id
                      )
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedMethod("card"),
                    className: `w-full flex items-center gap-2 px-4 py-3 rounded-lg border transition-smooth text-sm font-medium min-h-[44px] ${selectedMethod === "card" ? "border-primary bg-primary/10 text-primary" : "border-border bg-muted/30 text-foreground hover:border-primary/40"}`,
                    "data-ocid": "payment-method-card-toggle",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "w-4 h-4 shrink-0" }),
                      "Pay with Card (Visa, Mastercard, Amex)"
                    ]
                  }
                ),
                selectedMethod === "card" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "form",
                  {
                    onSubmit: handleCardSubmit,
                    className: "space-y-4 pt-2",
                    "data-ocid": "card-entry-form",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "card-name", className: "text-sm", children: "Cardholder Name" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "card-name",
                            type: "text",
                            placeholder: "John Smith",
                            value: cardName,
                            onChange: (e) => setCardName(e.target.value),
                            autoComplete: "cc-name",
                            className: "bg-background border-border h-11 w-full",
                            "data-ocid": "card-name-input"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "card-number", className: "text-sm", children: "Card Number" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "card-number",
                              type: "text",
                              inputMode: "numeric",
                              placeholder: "1234 5678 9012 3456",
                              value: cardNumber,
                              onChange: (e) => setCardNumber(formatCardNumber(e.target.value)),
                              autoComplete: "cc-number",
                              maxLength: 19,
                              className: "bg-background border-border h-11 pr-10 font-mono w-full",
                              "data-ocid": "card-number-input"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CreditCard, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3 sm:gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "card-expiry", className: "text-sm", children: "Expiry" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "card-expiry",
                              type: "text",
                              inputMode: "numeric",
                              placeholder: "MM/YY",
                              value: cardExpiry,
                              onChange: (e) => setCardExpiry(formatExpiry(e.target.value)),
                              autoComplete: "cc-exp",
                              maxLength: 5,
                              className: "bg-background border-border h-11 font-mono",
                              "data-ocid": "card-expiry-input"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "card-cvc", className: "text-sm", children: "CVC" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Input,
                            {
                              id: "card-cvc",
                              type: "text",
                              inputMode: "numeric",
                              placeholder: "•••",
                              value: cardCvc,
                              onChange: (e) => setCardCvc(
                                e.target.value.replace(/\D/g, "").slice(0, 4)
                              ),
                              autoComplete: "cc-csc",
                              maxLength: 4,
                              className: "bg-background border-border h-11 font-mono",
                              "data-ocid": "card-cvc-input"
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1", children: ["VISA", "MC", "AMEX", "DISC"].map((brand) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "text-xs font-bold px-2 py-0.5 bg-muted/60 border border-border rounded text-muted-foreground font-mono",
                          children: brand
                        },
                        brand
                      )) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Button,
                        {
                          type: "submit",
                          disabled: isProcessing,
                          className: "w-full gap-2 h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90 gold-glow",
                          "data-ocid": "card-pay-btn",
                          children: isProcessing ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }),
                            "Processing Payment…"
                          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
                            "Pay $",
                            totalDollars,
                            " Securely"
                          ] })
                        }
                      )
                    ]
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 px-4 py-3 bg-muted/20 border border-border rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Payments are processed securely via",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: "Stripe" }),
              ". Your card details are never stored on our servers. PCI DSS compliant."
            ] })
          ] }),
          !isCustomerLoggedIn && !isAuthenticated && !showRegisterPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 space-y-3",
              "data-ocid": "checkout-register-prompt",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Save your purchases for re-download" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground leading-relaxed", children: [
                  "Register with an email and PIN to access your purchases anytime within",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-semibold", children: "30 days" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col xs:flex-row gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      className: "flex-1 gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90 text-xs min-h-[44px]",
                      onClick: () => setShowRegisterPrompt(true),
                      "data-ocid": "checkout-register-open-btn",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                        "Register to save purchases"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/customer-login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      variant: "outline",
                      className: "w-full xs:w-auto text-xs border-primary/30 text-primary hover:bg-primary/10 min-h-[44px]",
                      "data-ocid": "checkout-customer-login-link",
                      children: "Already registered"
                    }
                  ) })
                ] })
              ]
            }
          ),
          !isCustomerLoggedIn && showRegisterPrompt && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "bg-primary/5 border border-primary/20 rounded-xl p-4 sm:p-5 space-y-4",
              "data-ocid": "checkout-register-form",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4 text-primary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Save Purchases 👑" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowRegisterPrompt(false),
                      className: "p-1.5 rounded hover:bg-muted/50 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center",
                      "aria-label": "Close registration form",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-muted-foreground" })
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-email", className: "text-xs", children: "Email Address" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Input,
                      {
                        id: "reg-email",
                        type: "email",
                        placeholder: "you@example.com",
                        value: regEmail,
                        onChange: (e) => setRegEmail(e.target.value),
                        className: "h-11 text-sm bg-background border-border",
                        "data-ocid": "reg-email-input"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-pin", className: "text-xs", children: "PIN (4–6 digits)" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "reg-pin",
                          type: "password",
                          inputMode: "numeric",
                          placeholder: "••••",
                          value: regPin,
                          onChange: (e) => setRegPin(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          ),
                          maxLength: 6,
                          className: "h-11 text-sm bg-background border-border font-mono",
                          "data-ocid": "reg-pin-input"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "reg-confirm", className: "text-xs", children: "Confirm PIN" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "reg-confirm",
                          type: "password",
                          inputMode: "numeric",
                          placeholder: "••••",
                          value: regConfirmPin,
                          onChange: (e) => setRegConfirmPin(
                            e.target.value.replace(/\D/g, "").slice(0, 6)
                          ),
                          maxLength: 6,
                          className: `h-11 text-sm bg-background border-border font-mono ${regConfirmPin.length > 0 && regPin !== regConfirmPin ? "border-destructive" : ""}`,
                          "data-ocid": "reg-confirm-input"
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Button,
                    {
                      type: "button",
                      size: "sm",
                      disabled: isRegistering || !regEmail.includes("@") || regPin.length < 4 || regPin !== regConfirmPin,
                      className: "w-full gap-1.5 text-xs bg-primary text-primary-foreground hover:bg-primary/90 min-h-[44px]",
                      onClick: async () => {
                        setIsRegistering(true);
                        try {
                          const pinHash = await hashPin(regPin);
                          await customerSignup(regEmail.trim(), pinHash);
                          ue.success(
                            "Account created! Your purchases are saved. 👑"
                          );
                          setShowRegisterPrompt(false);
                        } catch (err) {
                          const error = err;
                          ue.error(
                            error.message || "Registration failed. Please try again."
                          );
                        } finally {
                          setIsRegistering(false);
                        }
                      },
                      "data-ocid": "reg-submit-btn",
                      children: [
                        isRegistering ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3.5 h-3.5 border border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-3.5 h-3.5" }),
                        isRegistering ? "Saving…" : "Save My Purchases"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
                    "Or",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => setShowRegisterPrompt(false),
                        className: "text-primary hover:text-primary/80 font-medium transition-colors",
                        children: "skip for now"
                      }
                    ),
                    " ",
                    "(one-time download only)"
                  ] })
                ] })
              ]
            }
          ),
          isCustomerLoggedIn && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-emerald-400 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              "Signed in as",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: customerEmail }),
              ". Your purchases will be saved for re-download."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-card border border-primary/20 rounded-xl overflow-hidden lg:sticky lg:top-24",
            "data-ocid": "order-summary",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-3 sm:py-4 border-b border-border flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingCart, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-foreground text-sm uppercase tracking-wide", children: "Order Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    className: "ml-auto text-xs border border-primary/30 text-primary",
                    children: [
                      cartItems.length,
                      " track",
                      cartItems.length !== 1 ? "s" : ""
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 sm:p-5 space-y-3", children: cartItems.map((item) => {
                var _a, _b;
                const coverUrl = (_b = (_a = item.track.coverArt) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-3 group/orderitem",
                    "data-ocid": `order-item-${item.track.id}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 rounded-md bg-gradient-to-br ${getGenreColor(item.track.genre)} flex items-center justify-center shrink-0 overflow-hidden`,
                          children: coverUrl ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: coverUrl,
                              alt: item.track.title,
                              className: "w-full h-full object-cover"
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Music, { className: "w-4 h-4 text-foreground/30" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: item.track.title }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: item.track.artistName })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-primary font-bold text-sm shrink-0", children: [
                        "$",
                        (Number(item.track.priceInCents) / 100).toFixed(2)
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleRemoveItem(item.track.id),
                          className: "flex items-center justify-center w-8 h-8 rounded-md border border-primary/25 text-primary hover:bg-destructive/10 hover:border-destructive/50 hover:text-destructive transition-colors shrink-0 opacity-60 group-hover/orderitem:opacity-100 min-h-[32px] min-w-[32px]",
                          "aria-label": `Remove "${item.track.title}" from order`,
                          "data-ocid": `order-remove-${item.track.id}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" })
                        }
                      )
                    ]
                  },
                  String(item.track.id)
                );
              }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-4 space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Subtotal" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground", children: [
                    "$",
                    totalDollars
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Processing fee" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "Included" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground", children: "Total" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xl sm:text-2xl font-bold text-primary font-display", children: [
                    "$",
                    totalDollars
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-5 pb-4 sm:pb-5 space-y-2", children: [
                "Instant download after payment",
                "Original MP3 or WAV format",
                "Re-download within 30 days",
                "85% goes directly to the artist"
              ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-xs text-muted-foreground",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-400 shrink-0" }),
                    benefit
                  ]
                },
                benefit
              )) })
            ]
          }
        ) })
      ] })
    ] })
  ] });
}
export {
  CheckoutPage as default
};
