/**
 * rotas privadas esto lo valida ya el provider
 */
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function PrivateRoute({ children }){
    const { isAuthenticated } = useAuth(); 

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};
