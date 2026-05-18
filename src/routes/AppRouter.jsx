/**
 * manejo de rutas centralizada
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";



//pruebas
import TestAuth from "../modules/public/login/TestAuth";

export function AppRouter() {
    return (
        <BrowserRouter>
        <AuthProvider>
            <Routes>
                <Route>
                    <Route path="/loginTest" element={<TestAuth />} />
                </Route>
            </Routes>
        </AuthProvider>
        </BrowserRouter>
    )
}