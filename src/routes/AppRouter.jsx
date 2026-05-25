/**
 * manejo de rutas centralizada
 */
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { SimpleLayout } from "../layout/SimpleLayout";
import RoleRoute from "./RoleRoute";
//Layouts

import { MainLayout } from "../layouts/MainLayout";
import { StorefrontLayout } from "../layouts/StorefrontLayout";

//public
import Login from "../modules/public/login/index";
import Register from "../modules/public/register/register";

//private
import Dashboard from "../modules/private/dashboard/dasboard";
import Products from "../modules/private/products/products";
import Categories from "../modules/private/categories/categories";
import Orders from "../modules/private/orders/orders";
import Users from "../modules/private/users/users";
import Integration from "../modules/private/integrations/integration";
import Checkout from "../modules/public/checkout/checkout";
import MyOrders from "../modules/private/miorders/miorders";
import Profile from "../modules/private/profile/profile";

//home
import Home from "../modules/public/home/home";
import Sistemas from "../modules/public/sistemas/sistemas";
import Cart from "../modules/public/cart/cart";
import Promotions from "../modules/public/promotions/promotions";
import CheckoutSuccess from "../modules/public/checkout/checkoutSucces";

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
          {/**ruta dashboard para admin */}
          <Route
            path="/dashboard"
            element={
              <RoleRoute allowedRoles={["admin"]}>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </RoleRoute>
            }
          />

          {/**ruta dashboard para usuario */}

          <Route
            path="/orders"
            element={
              <RoleRoute allowedRoles={["b2c", "b2b"]}>
                <MainLayout>
                  <MyOrders />
                </MainLayout>
              </RoleRoute>
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

          <Route 
          path="/profile"
          element={
            <RoleRoute allowedRoles={["b2c", "b2b"]}>
            <MainLayout>
              <Profile />
            </MainLayout>
            </RoleRoute>
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
                <Sistemas />
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
          <Route
            path="/checkout/success"
            element={
              <StorefrontLayout>
                <CheckoutSuccess />
              </StorefrontLayout>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
