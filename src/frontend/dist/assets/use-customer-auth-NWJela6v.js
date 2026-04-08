import { k as useAppStore, c as useActor, r as reactExports, f as createActor } from "./index-gcvG85BJ.js";
const CUSTOMER_SESSION_KEY = "chosen-one-customer-session";
async function hashPin(pin) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}
function getStoredCustomerSession() {
  try {
    const raw = localStorage.getItem(CUSTOMER_SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveCustomerSession(session) {
  if (session) {
    localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
  }
}
function useCustomerAuth() {
  const { setCustomerToken, setCustomerEmail } = useAppStore();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [session, setSession] = reactExports.useState(null);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (actorFetching || !actor) return;
    const stored = getStoredCustomerSession();
    if (!stored) {
      setIsLoading(false);
      return;
    }
    actor.validateCustomerSession(stored.token).then((isValid) => {
      if (isValid) {
        setSession(stored);
        setCustomerToken(stored.token);
        setCustomerEmail(stored.email);
      } else {
        saveCustomerSession(null);
        setSession(null);
        setCustomerToken(null);
        setCustomerEmail(null);
      }
    }).catch(() => {
      setSession(stored);
      setCustomerToken(stored.token);
      setCustomerEmail(stored.email);
    }).finally(() => {
      setIsLoading(false);
    });
  }, [actor, actorFetching, setCustomerToken, setCustomerEmail]);
  reactExports.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3e3);
    return () => clearTimeout(timer);
  }, []);
  const customerLogin = reactExports.useCallback(
    async (email, pinHash) => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.loginCustomer(email.trim(), pinHash);
      if (result.__kind__ === "err") {
        throw new Error(
          result.err || "Invalid email or PIN. Please try again."
        );
      }
      const newSession = {
        email: email.trim(),
        token: result.ok,
        createdAt: Date.now()
      };
      saveCustomerSession(newSession);
      setSession(newSession);
      setCustomerToken(result.ok);
      setCustomerEmail(email.trim());
    },
    [actor, setCustomerToken, setCustomerEmail]
  );
  const customerSignup = reactExports.useCallback(
    async (email, pinHash) => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.signupCustomer(email.trim(), pinHash);
      if (result.__kind__ === "err") {
        throw new Error(result.err || "Registration failed. Please try again.");
      }
      const token = result.ok;
      const newSession = {
        email: email.trim(),
        token,
        createdAt: Date.now()
      };
      saveCustomerSession(newSession);
      setSession(newSession);
      setCustomerToken(token);
      setCustomerEmail(email.trim());
      return token;
    },
    [actor, setCustomerToken, setCustomerEmail]
  );
  const customerLogout = reactExports.useCallback(async () => {
    const currentSession = session;
    saveCustomerSession(null);
    setSession(null);
    setCustomerToken(null);
    setCustomerEmail(null);
    if (actor && currentSession) {
      try {
        await actor.logoutCustomer(currentSession.token);
      } catch {
      }
    }
  }, [actor, session, setCustomerToken, setCustomerEmail]);
  return {
    isCustomerLoggedIn: !!session && !isLoading,
    isLoading,
    customerEmail: (session == null ? void 0 : session.email) ?? null,
    customerToken: (session == null ? void 0 : session.token) ?? null,
    customerLogin,
    customerSignup,
    customerLogout
  };
}
export {
  hashPin as h,
  useCustomerAuth as u
};
