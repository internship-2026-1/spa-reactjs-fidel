/**
 * rutas publicas lo resuelve provider
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PublicRoute({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const from = location.state?.from || "/dashboard";

  return !isAuthenticated ? children : <Navigate to={from} replace />;
}