import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";
import { useAppStore } from "../store";

const CUSTOMER_SESSION_KEY = "chosen-one-customer-session";

export interface CustomerSession {
  email: string;
  token: string;
  createdAt: number;
}

export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getStoredCustomerSession(): CustomerSession | null {
  try {
    const raw = localStorage.getItem(CUSTOMER_SESSION_KEY);
    return raw ? (JSON.parse(raw) as CustomerSession) : null;
  } catch {
    return null;
  }
}

function saveCustomerSession(session: CustomerSession | null): void {
  if (session) {
    localStorage.setItem(CUSTOMER_SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(CUSTOMER_SESSION_KEY);
  }
}

export function useCustomerAuth() {
  const { setCustomerToken, setCustomerEmail } = useAppStore();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [session, setSession] = useState<CustomerSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore + validate session on mount
  useEffect(() => {
    if (actorFetching || !actor) return;

    const stored = getStoredCustomerSession();
    if (!stored) {
      setIsLoading(false);
      return;
    }

    actor
      .validateCustomerSession(stored.token)
      .then((isValid) => {
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
      })
      .catch(() => {
        // Network error — keep session optimistically
        setSession(stored);
        setCustomerToken(stored.token);
        setCustomerEmail(stored.email);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [actor, actorFetching, setCustomerToken, setCustomerEmail]);

  // Safety fallback
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const customerLogin = useCallback(
    async (email: string, pinHash: string): Promise<void> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.loginCustomer(email.trim(), pinHash);
      if (result.__kind__ === "err") {
        throw new Error(
          result.err || "Invalid email or PIN. Please try again.",
        );
      }
      const newSession: CustomerSession = {
        email: email.trim(),
        token: result.ok,
        createdAt: Date.now(),
      };
      saveCustomerSession(newSession);
      setSession(newSession);
      setCustomerToken(result.ok);
      setCustomerEmail(email.trim());
    },
    [actor, setCustomerToken, setCustomerEmail],
  );

  const customerSignup = useCallback(
    async (email: string, pinHash: string): Promise<string> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.signupCustomer(email.trim(), pinHash);
      if (result.__kind__ === "err") {
        throw new Error(result.err || "Registration failed. Please try again.");
      }
      const token = result.ok;
      const newSession: CustomerSession = {
        email: email.trim(),
        token,
        createdAt: Date.now(),
      };
      saveCustomerSession(newSession);
      setSession(newSession);
      setCustomerToken(token);
      setCustomerEmail(email.trim());
      return token;
    },
    [actor, setCustomerToken, setCustomerEmail],
  );

  const customerLogout = useCallback(async () => {
    const currentSession = session;
    saveCustomerSession(null);
    setSession(null);
    setCustomerToken(null);
    setCustomerEmail(null);
    if (actor && currentSession) {
      try {
        await actor.logoutCustomer(currentSession.token);
      } catch {
        // Ignore
      }
    }
  }, [actor, session, setCustomerToken, setCustomerEmail]);

  return {
    isCustomerLoggedIn: !!session && !isLoading,
    isLoading,
    customerEmail: session?.email ?? null,
    customerToken: session?.token ?? null,
    customerLogin,
    customerSignup,
    customerLogout,
  };
}
