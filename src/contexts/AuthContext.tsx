import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STORAGE_KEYS } from "@/lib/config";
import {
  hutchLogin,
  isValidHutchMsisdn,
  normalizeHutchMsisdn,
  type HutchSession,
} from "@/lib/hutchApi";

export type { HutchSession };

interface LoginResult {
  success: boolean;
  redirectURL?: string;
  error?: string;
}

interface AuthContextType {
  user: HutchSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  /** ACTIVE Hutch subscriber — portal content access */
  isActive: boolean;
  login: (msisdn: string) => Promise<LoginResult>;
  logout: () => void;
  /** Persist MSISDN before redirecting inactive users to subscribe */
  savePendingMsisdn: (msisdn: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

function loadSession(): HutchSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HUTCH_SESSION);
    if (!raw) return null;
    return JSON.parse(raw) as HutchSession;
  } catch {
    return null;
  }
}

function persistSession(session: HutchSession | null): void {
  if (session) {
    localStorage.setItem(STORAGE_KEYS.HUTCH_SESSION, JSON.stringify(session));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `hutch_${session.msisdn}`);
  } else {
    localStorage.removeItem(STORAGE_KEYS.HUTCH_SESSION);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_DATA);
    localStorage.removeItem(STORAGE_KEYS.SUBSCRIPTION);
  }
}

export function savePendingMsisdn(msisdn: string): void {
  localStorage.setItem(
    STORAGE_KEYS.HUTCH_PENDING_MSISDN,
    normalizeHutchMsisdn(msisdn),
  );
}

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<HutchSession | null>(() => loadSession());
  const [isLoading, setIsLoading] = useState(false);

  const applyActiveSession = useCallback((session: HutchSession) => {
    setUser(session);
    persistSession(session);
    localStorage.removeItem(STORAGE_KEYS.HUTCH_PENDING_MSISDN);
    window.dispatchEvent(
      new CustomEvent("hutch-session-activated", { detail: session }),
    );
  }, []);

  const login = useCallback(
    async (msisdnRaw: string): Promise<LoginResult> => {
      if (!isValidHutchMsisdn(msisdnRaw)) {
        return {
          success: false,
          error: "Enter a valid Hutch mobile number (e.g. 7XXXXXXXX).",
        };
      }

      setIsLoading(true);
      try {
        const result = await hutchLogin(msisdnRaw);
        if (result.status === "ACTIVE") {
          applyActiveSession(result.session);
          return { success: true };
        }
        return { success: false, redirectURL: result.redirectURL };
      } catch {
        return {
          success: false,
          error: "Unable to verify subscription. Please try again.",
        };
      } finally {
        setIsLoading(false);
      }
    },
    [applyActiveSession],
  );

  const logout = useCallback(() => {
    setUser(null);
    persistSession(null);
  }, []);

  // Resume session after subscription redirect (?msisdn= or pending)
  useEffect(() => {
    if (user) return;

    const params = new URLSearchParams(window.location.search);
    const urlMsisdn = params.get("msisdn");
    if (urlMsisdn) {
      void login(urlMsisdn).then((result) => {
        if (result.success) {
          const url = new URL(window.location.href);
          url.searchParams.delete("msisdn");
          window.history.replaceState({}, "", url.toString());
        }
      });
      return;
    }

    const pending = localStorage.getItem(STORAGE_KEYS.HUTCH_PENDING_MSISDN);
    if (pending) {
      void login(pending).then((result) => {
        if (result.success) {
          localStorage.removeItem(STORAGE_KEYS.HUTCH_PENDING_MSISDN);
        }
      });
    }
  }, [user, login]);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    isActive: !!user,
    login,
    logout,
    savePendingMsisdn,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
