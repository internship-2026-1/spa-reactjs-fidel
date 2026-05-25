/**
 * rutas publicas lo resuelve provider
 */
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PublicRoute({ children }) {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  const defaultPath = role === "admin" ? "/dashboard" : "/orders";
  const from = location.state?.from || defaultPath;

  return !isAuthenticated ? children : <Navigate to={from} replace />;
}