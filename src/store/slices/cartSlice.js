/**
 * creando la logica de carrito usando redux toolkit
 */

import { createSlice } from '@reduxjs/toolkit'


//creando el primer slice cartslice
const cartSlice = createSlice({
    name: 'cart',

    initialState: { items: [] },
    
    reducers: {
        //agregar
        addItem: (state, action) => {
            const existing = state.items.find((i) => i.id === action.payload.id)

            if(existing) {
                existing.quantity += 1
            } else {
                state.items.push({ ...action.payload, quantity: 1})
            }
        },

        //actualizar
        updateQuantity: (state, action) => {
            const {id, quantity } = action.payload
            const item = state.items.find((i) => i.id === id)

            if (item) item.quantity = Math.max(1, quantity)
        },

        //reomever un elemento del array item
        removeItem: (state, action) => {
            state.items = state.items.filter((i) => i.id !== action.payload)
        },

        //limpiando: dejando el array vacio
        clearCart: (state) => {
            state.items = []
        },
    },
});

// exporto las acciones 
export const { addItem, updateQuantity, removeItem, clearCart } = cartSlice.actions

// selector recodar como explico el inge
export const selectCartItems = (state) => state.cart.items

//sumador del producto
export const selectCartCount = (state) => state.cart.items.reduce((sum, i ) => sum + i.quantity, 0)
 
//limpiar el valor numerico
const parsePrice = (price = 0) => {
  if (typeof price === "number") return price;

  return parseFloat(
    String(price).replace(/[€$Q\s]/g, "").replace(/\./g, "").replace(",", ".")
  ) || 0;
};

//
export const selectCartSubtotal = (state) => 
    state.cart.items.reduce(
        (sum, item) => sum + parsePrice(item.price) * item.quantity,
        0
    )

export default cartSlice.reducer //no me quedo tan claro 

