import { ReactNode, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import LoginPrompt from "@/components/LoginPrompt";

interface ServiceGateRouteProps {
  children: ReactNode;
  featureName?: string;
}

const ServiceGateRoute = ({ children, featureName = "this service" }: ServiceGateRouteProps) => {
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
        description={`Sign in with your mobile number to use ${featureName}.`}
      />
    );
  }

  return <>{children}</>;
};

export default ServiceGateRoute;
