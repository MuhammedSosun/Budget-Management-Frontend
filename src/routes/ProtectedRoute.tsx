import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, isChecking } = useAuth();
  const location = useLocation();

  if (isChecking) {
    return null;
  }

  if (!user) {
    return <Navigate to={`/login?returnUrl=${location.pathname}`} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
