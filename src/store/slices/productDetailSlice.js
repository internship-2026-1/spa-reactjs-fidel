/**
 * slice para detalles de un producto
 */

import {createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: []
}

const productDetailSlice = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {},
})

export const selectProductById = (id) => (state) =>
  state.productDetail.products.find((p) => p.id === Number(id))

export default productDetailSlice.reducer
