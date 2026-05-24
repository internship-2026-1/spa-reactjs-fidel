import { configureStore } from "@reduxjs/toolkit";
//slices creados
import cartReducer from './slices/cartSlice';
import homeReducer from './slices/homeSlice';
import usersReducer from './slices/usersSlice';
import productsReducer from './slices/productsSlice';
import categoriesReducer from './slices/categoriesSlice';
import ordersReducer from './slices/ordersSlice';
import checkoutReducer from './slices/checkoutSlice';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        home: homeReducer,
        users: usersReducer,
        products: productsReducer,
        categories: categoriesReducer,
        orders: ordersReducer,
        checkout: checkoutReducer,
    }
})
