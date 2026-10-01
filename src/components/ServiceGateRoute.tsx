import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface ServiceGateRouteProps {
  children: ReactNode;
  featureName?: string;
}

/**
 * Portal content requires an ACTIVE Hutch subscription (CP Login, pid 21).
 * Guests see login prompt + auth modal; INACTIVE users are redirected at login.
 */
const ServiceGateRoute = ({
  children,
  featureName = "this service",
}: ServiceGateRouteProps) => {
  const { isActive } = useAuth();

  useEffect(() => {
    if (!isActive) {
      window.dispatchEvent(new CustomEvent("open-auth-modal"));
    }
  }, [isActive]);

  if (!isActive) {
    return (
      <LoginPrompt
        featureName={featureName}
        description={`Enter your Hutch mobile number to use ${featureName}. If you are not subscribed, you will be redirected to activate the service.`}
      />
    );
  }

  return <>{children}</>;
};

export default ServiceGateRoute;
