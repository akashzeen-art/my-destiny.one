import React, { createContext, useCallback, useContext, useState } from "react";
import { STORAGE_KEYS } from "@/lib/config";

export interface HutchSession {
  msisdn: string;
  actDate: string;
  renewDate: string;
  pricePoint: string;
  validity: string;
  unsubUrl: string;
}

interface AuthContextType {
  user: HutchSession | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isActive: boolean;
  login: (msisdn: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  savePendingMsisdn: (msisdn: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

function loadSession(): HutchSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.HUTCH_SESSION);
    return raw ? (JSON.parse(raw) as HutchSession) : null;
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
  localStorage.setItem(STORAGE_KEYS.HUTCH_PENDING_MSISDN, msisdn);
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<HutchSession | null>(() => loadSession());
  const [isLoading] = useState(false);

  const login = useCallback(async (msisdn: string): Promise<{ success: boolean; error?: string }> => {
    const digits = msisdn.replace(/\D/g, "");
    if (digits.length < 9) {
      return { success: false, error: "Enter a valid 9-digit mobile number." };
    }

    const now = new Date();
    const renew = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace("T", " ").slice(0, 19);
    const session: HutchSession = {
      msisdn: "94" + digits.slice(-9),
      actDate: fmt(now),
      renewDate: fmt(renew),
      pricePoint: "LKR 10",
      validity: "1",
      unsubUrl: "",
    };

    setUser(session);
    persistSession(session);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    persistSession(null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isAuthenticated: !!user,
      isActive: !!user,
      login,
      logout,
      savePendingMsisdn,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
