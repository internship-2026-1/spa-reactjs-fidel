/**
 * este slice es para orders
 */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../config";
import { apiService } from "../../services";

//get/post url order
const urlEndpoint = 'apps/orders/orders/'

//fetch order
export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(
        `${config.appURLcore}${urlEndpoint}`
      );

      console.log("ORDERS RESPONSE", response);
      console.log("ORDERS BODY", response.body);

      return response.body ?? [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al obtener pedidos");
    }
  }
);
//create
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post(
        `${config.appURLcore}${urlEndpoint}`,
        payload
      );

      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear pedido");
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
};


const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //case para fetch
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //case para create
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const selectOrders = (state) => state.orders.items;
export const selectOrdersLoading = (state) => state.orders.loading;
export const selectOrdersError = (state) => state.orders.error;

export default ordersSlice.reducer;