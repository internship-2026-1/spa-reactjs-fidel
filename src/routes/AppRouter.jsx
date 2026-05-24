/**
 * manejo de rutas centralizada
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { SimpleLayout } from "../layout/SimpleLayout";
//import { MainLayout } from "../layout/MainLayout";

//mis primera paginas
import Login from "../modules/public/login/index";
import Register from "../modules/public/register/register";

//Layouts

import { MainLayout } from "../layouts/MainLayout";
import { StorefrontLayout } from "../layouts/StorefrontLayout";

//public
//

//private
import Dashboard from "../modules/private/dashboard/dasboard";
import Products from "../modules/private/products/products";
import Categories from "../modules/private/categories/categories";
import Orders from "../modules/private/orders/orders";
import Users from "../modules/private/users/users";
import Integration from "../modules/private/integrations/integration";

//home
import Home from "../modules/public/home/home";
import Sistemas from "../modules/public/sistemas/sistemas";
import Cart from "../modules/public/cart/cart";
import Promotions from "../modules/public/promotions/promotions";
import Checkout from "../modules/public/checkout/checkout";

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*rutas publicas*/}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <SimpleLayout>
                  <Login />
                </SimpleLayout>
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <SimpleLayout>
                  <Register />
                </SimpleLayout>
              </PublicRoute>
            }
          />

          {/*rutas privadas = PrivateRoute*/}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/productos"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Products />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/categorias"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Categories />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/pedidos"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Orders />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/usuarios"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Users />
                </MainLayout>
              </PrivateRoute>
            }
          />
          <Route
            path="/integracion"
            element={
              <PrivateRoute>
                <MainLayout>
                  <Integration />
                </MainLayout>
              </PrivateRoute>
            }
          />

          {/*HOME*/}
          <Route
            path="/home"
            element={
              <StorefrontLayout>
                <Home />
              </StorefrontLayout>
            }
          />
          <Route 
          path="/sistemas"
          element={
            <StorefrontLayout>
              <Sistemas/>
            </StorefrontLayout>
          }
          />

          <Route
            path="/cart"
            element={
              <StorefrontLayout>
                <Cart />
              </StorefrontLayout>
            }
          />

          <Route
            path="/promotions"
            element={
              <StorefrontLayout>
                <Promotions />
              </StorefrontLayout>
            }
          />

          <Route
            path="/checkout"
            element={
             <PrivateRoute>
              <StorefrontLayout>
                <Checkout />
              </StorefrontLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
