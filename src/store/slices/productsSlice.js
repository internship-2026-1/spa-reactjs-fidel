/**
 * clice para products
 */
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit"
import { apiService } from "../../services";
import { config } from "../../config";
import { act } from "react";

const urlEndpoint = "apps/products/products/";

export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",

    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`${config.appURLcore}${urlEndpoint}`);
            console.log("RESPUESTA API:", response);
            
            return response.body ?? [];
        } catch (error) {
            return rejectWithValue(error.message || "Error al obtener los productos a la tabla")
        }
    }
)

//update para productos
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.put(
        `${config.appURLcore}${urlEndpoint}${id}/`,
        data
      );

      return {
        id,
        ...response.body,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar el producto");
    }
  }
);




const initialState = {
    items: [],
    loading: false,
    error: null,
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        // case para fetchproducts
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            console.log("PAYLOAD PRODUCTOS:", action.payload);
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        //case para update productos
        .addCase(updateProduct.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateProduct.fulfilled, (state, action) => {
          state.loading = false;
        
          const index = state.items.findIndex((p) => p.id === action.payload.id);
        
          if (index !== -1) {
            state.items[index] = {
              ...state.items[index],
              ...action.payload,
            };
          }
        })
        .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});


export const selectProducts = (state) => state.products.items;

export const selectProductsLoading = (state) => state.products.loading;

export const selectProductsError = (state) => state.products.error;

export default productsSlice.reducer;