import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import {
  createSubscription,
  loadSubscription,
  type PlanId,
  type Subscription,
} from "@/lib/subscription";
import { STORAGE_KEYS } from "@/lib/config";
import { useAuth } from "@/contexts/AuthContext";

interface SubscriptionContextType {
  subscription: Subscription | null;
  hasAccess: boolean;
  isModalOpen: boolean;
  pendingPath: string | null;
  modalStep: 1 | 2 | 3;
  requestService: (path: string) => void;
  openSubscribeModal: (path?: string) => void;
  closeModal: () => void;
  setModalStep: (step: 1 | 2 | 3) => void;
  subscribe: (mobile: string, planId: PlanId) => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(
  undefined,
);

export const useSubscription = (): SubscriptionContextType => {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }
  return ctx;
};

interface SubscriptionProviderProps {
  children: React.ReactNode;
}

export const SubscriptionProvider: React.FC<SubscriptionProviderProps> = ({
  children,
}) => {
  const navigate = useNavigate();
  const { isActive } = useAuth();
  const [subscription, setSubscription] = useState<Subscription | null>(() =>
    loadSubscription(),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);

  const hasAccess = isActive;

  useEffect(() => {
    const onStorage = () => setSubscription(loadSubscription());
    const onHutch = () => setSubscription(loadSubscription());
    window.addEventListener("storage", onStorage);
    window.addEventListener("hutch-session-activated", onHutch);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("hutch-session-activated", onHutch);
    };
  }, []);

  const openSubscribeModal = useCallback(
    (path?: string) => {
      if (path) navigate(path);
    },
    [navigate],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setModalStep(1);
    setPendingPath(null);
  }, []);

  const requestService = useCallback(
    (path: string) => {
      navigate(path);
    },
    [navigate],
  );

  /** Legacy local subscribe — kept for checkout demos; Hutch login is primary. */
  const subscribe = useCallback(
    async (mobile: string, planId: PlanId): Promise<boolean> => {
      await new Promise((r) => setTimeout(r, 400));
      const sub = createSubscription(mobile, planId);
      setSubscription(sub);
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, `standalone_${sub.mobile}`);

      setIsModalOpen(false);
      setModalStep(1);

      const target = pendingPath || "/dashboard";
      setPendingPath(null);
      navigate(target);
      return true;
    },
    [navigate, pendingPath],
  );

  const value: SubscriptionContextType = {
    subscription,
    hasAccess,
    isModalOpen,
    pendingPath,
    modalStep,
    requestService,
    openSubscribeModal,
    closeModal,
    setModalStep,
    subscribe,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export default SubscriptionProvider;
