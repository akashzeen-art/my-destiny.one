import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "@/components/AuthModal";
import { useSubscription } from "@/contexts/SubscriptionContext";

/**
 * Always-mounted Hutch login modal so gated pages (without Navbar) can open it.
 */
const GlobalAuthModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { pendingPath, closeModal } = useSubscription();

  useEffect(() => {
    const open = () => setIsOpen(true);
    window.addEventListener("open-auth-modal", open);
    return () => window.removeEventListener("open-auth-modal", open);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    closeModal();
  };

  const handleSuccess = () => {
    setIsOpen(false);
    const target = pendingPath;
    closeModal();
    if (target) navigate(target);
  };

  return (
    <AuthModal
      isOpen={isOpen}
      onClose={handleClose}
      onSuccess={handleSuccess}
    />
  );
};

export default GlobalAuthModal;
