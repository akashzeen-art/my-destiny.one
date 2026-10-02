import { ReactNode } from "react";

const ServiceGateRoute = ({ children }: { children: ReactNode; featureName?: string }) => (
  <>{children}</>
);

export default ServiceGateRoute;
