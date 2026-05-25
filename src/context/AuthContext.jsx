/**
 * manejo de sesion global
 */
import { createContext, useContext, useState } from "react";
import { localStorageService,sessionStorageService } from "../services";


const AuthContext = createContext(null);

const menusByRole = {
  admin: [
    { name: "Dashboard",   path: "/dashboard",  icon: "dashboard" },
    { name: "Productos",   path: "/productos",  icon: "box"       },
    { name: "Categorías",  path: "/categorias", icon: "tag"       },
    { name: "Pedidos",     path: "/pedidos",    icon: "orders"    },
    { name: "Usuarios",      path: "/usuarios",     icon: "users"       },
    { name: "Integración",   path: "/integracion",  icon: "integration" },
  ],
  b2c: [
    { name: "Mis pedidos", path: "/orders", icon: "orders" },
    { name: "Perfil", path: "/profile", icon: "user" },
  ],
  b2b: [
    { name: "Mis pedidos", path: "/orders", icon: "orders" },
    { name: "Perfil", path: "/profile", icon: "user" },
  ],
};


export function AuthProvider({ children }){
    const [ user, setUser] = useState(sessionStorageService.get("user"));
    const [ token, setToken] = useState(sessionStorageService.get("token"));
    const [ role, setRole ] = useState(sessionStorageService.get("user")?.role ?? null)
    const [ menu, setMenu ] = useState(() => {
        const stored = sessionStorageService.get("user");
        return stored ? (menusByRole[stored.role] ?? menusByRole.b2c ) : null;
    });

    const loginCTX = (userData, accessToken, refreshToken ) => {
        sessionStorageService.set("user", userData);
        sessionStorageService.set("token", accessToken);
        //sessionStorage.setItem("jwt", accessToken);

        if(refreshToken) sessionStorageService.set("refreshToken", refreshToken);

        setUser(userData);
        setToken(accessToken);
        setRole(userData.role);
        setMenu(menusByRole[userData.role] ?? menusByRole.b2c)
    };

    const logout = () => {
        sessionStorageService.clearAppData("user");
        //sessionStorageService.remove("user");
        //sessionStorageService.remove("token");
        //sessionStorageService.remove("refreshToken");
        setUser(null);
        setToken(null);
        setRole(null);
        setMenu(null);
    };

    return(
        //esto es renderizar provider
        <AuthContext.Provider value={{user, token, role, menu, loginCTX, logout, isAuthenticated: !!token}}>
            { children } {/**renderizar componentes hijos */}
        </AuthContext.Provider>
    );
}

// esto es un hook personalizado
export function useAuth(){
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth se debe usar nada mas en el authprovider");
    return ctx;
}
