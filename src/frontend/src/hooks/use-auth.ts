import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useState } from "react";
import { createActor } from "../backend";
import { useAppStore } from "../store";

const SESSION_KEY = "chosen-one-session";

export interface AuthSession {
  artistName: string;
  token: string; // backend-issued session token
  createdAt: number;
}

// Hash a PIN string using Web Crypto SHA-256, return hex string
export async function hashPin(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getStoredSession(): AuthSession | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  } catch {
    return null;
  }
}

function saveSession(session: AuthSession | null): void {
  if (session) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    localStorage.removeItem(SESSION_KEY);
  }
}

export function useAuth() {
  const { setArtistName } = useAppStore();
  const { actor, isFetching: actorFetching } = useActor(createActor);
  const [session, setSession] = useState<AuthSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore + validate session on mount
  useEffect(() => {
    if (actorFetching || !actor) return;

    const stored = getStoredSession();
    if (!stored) {
      setIsLoading(false);
      return;
    }

    // Validate the stored token with the backend
    actor
      .validateSession(stored.token)
      .then((result) => {
        if (result.__kind__ === "ok") {
          setSession(stored);
          setArtistName(stored.artistName);
        } else {
          // Token invalid — clear local state
          saveSession(null);
          setSession(null);
          setArtistName("");
        }
      })
      .catch(() => {
        // Network error — keep session optimistically so UX isn't broken
        setSession(stored);
        setArtistName(stored.artistName);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [actor, actorFetching, setArtistName]);

  // Safety fallback: if actor never initializes (mock/dev), unblock isLoading after 3s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const login = useCallback(
    async (name: string, pinHash: string): Promise<void> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.loginArtist(name, pinHash);
      if (result.__kind__ === "err") {
        throw new Error(result.err || "Invalid name or PIN. Please try again.");
      }
      const newSession: AuthSession = {
        artistName: name,
        token: result.ok,
        createdAt: Date.now(),
      };
      saveSession(newSession);
      setSession(newSession);
      setArtistName(name);
    },
    [actor, setArtistName],
  );

  const signup = useCallback(
    async (name: string, pinHash: string): Promise<void> => {
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.signupArtist(name, pinHash);
      if (result.__kind__ === "err") {
        throw new Error(result.err || "Signup failed. Please try again.");
      }
      // After signup, login to get a session token
      const loginResult = await actor.loginArtist(name, pinHash);
      if (loginResult.__kind__ === "err") {
        throw new Error(
          loginResult.err ||
            "Account created but login failed. Please sign in.",
        );
      }
      const newSession: AuthSession = {
        artistName: name,
        token: loginResult.ok,
        createdAt: Date.now(),
      };
      saveSession(newSession);
      setSession(newSession);
      setArtistName(name);
    },
    [actor, setArtistName],
  );

  const logout = useCallback(async () => {
    const currentSession = session;
    // Clear local state immediately for instant UX
    saveSession(null);
    setSession(null);
    setArtistName("");
    // Best-effort backend logout to revoke token
    if (actor && currentSession) {
      try {
        await actor.logoutArtist(currentSession.token);
      } catch {
        // Ignore — local state already cleared
      }
    }
  }, [actor, session, setArtistName]);

  const changePIN = useCallback(
    async (currentPinHash: string, newPinHash: string): Promise<void> => {
      if (!session) throw new Error("Not logged in.");
      if (!actor) throw new Error("Backend not available. Please try again.");
      const result = await actor.changePIN(
        session.token,
        currentPinHash,
        newPinHash,
      );
      if (result.__kind__ === "err") {
        throw new Error(result.err || "Failed to update PIN.");
      }
    },
    [actor, session],
  );

  return {
    isAuthenticated: !!session && !isLoading,
    isLoading,
    isLoggingIn: false, // kept for backwards compat
    artistName: session?.artistName ?? "",
    sessionToken: session?.token ?? null,
    login,
    signup,
    logout,
    changePIN,
  };
}
