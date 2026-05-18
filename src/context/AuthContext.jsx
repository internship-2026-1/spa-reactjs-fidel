/**
 * manejo de sesion global
 */
import { createContext, useContext, useState } from "react";
import { localStorageService,sessionStorageService } from "../services";


const AuthContext = createContext(null);

const MenuAdmin = [
    {
        name: "Dashboard",
        path: "/Dashboard",
        icon: "Dashboard",
    },
    {
        name: "Usuarios",
        path: "/Usuarios",
        icon: "users",
    }
];

const MenuUsers = [
    {
        name: "Dashboard",
        path: "/Dashboard",
        icon: "Dashboard",
    }
]


export function AuthProvider({ children }){
    const [ user, setUser] = useState(sessionStorageService.get("user"));
    const [ token, setToken] = useState(sessionStorageService.get("token"));
    const [ role, setRole ] = useState(sessionStorageService.get("user")?.role ?? null)
    const [ menu, setMenu ] = useState(null);

    const Login = (userData, accessToken, refreshToken ) => {
        sessionStorageService.set("user", userData);
        sessionStorageService.set("token", accessToken);

        if(refreshToken) sessionStorageService.set("refreshToken", refreshToken);

        setUser(userData);
        setToken(accessToken);
        setRole(userData.role);
        if(userData.role === 'admin'){
            console.log("MenuAdmin")
            setMenu(MenuAdmin);
        }else {
            console.log("MenuUsers")
            setMenu(MenuUsers);
        }
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
        <AuthContext.Provider value={{user, token, role, menu, Login, logout, isAuthenticated: !!token}}>
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
