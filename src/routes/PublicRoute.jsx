/**
 * rutas publicas lo resuelve provider
 */

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PublicRoute({ children }){
    const { isAuthenticated } = useAuth(); 

    return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
}