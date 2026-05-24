/**
 * slice para categoriesSlice
 */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiService } from '../../services';
import { config } from '../../config';

const urlEndpoint = "apps/catalogs/catalogs/"

export const fetchCategories = createAsyncThunk(
    "categories/fetchCategories",

    async (_, { rejectWithValue }) => {
        try {
            const response = await apiService.get(`${config.appURLcore}${urlEndpoint}`);
            //manejadno errores
            //console.log("respuesta de get category", response);

            return response.body ?? [];

        } catch (error) {
            return rejectWithValue( error.mesage || "Error al obtener las categorias a la tabla")
        };
    },
);

//create
export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiService.post(`${config.appURLcore}${urlEndpoint}`, payload );
      //manejando errores
      console.log("respuesta de post category", response);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear la categoria");
    }
  }
);

//patch
export const patchCategory = createAsyncThunk(
  "categories/patchCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(`${config.appURLcore}${urlEndpoint}${id}/`, data );
      //manejando errores
      console.log("respuesta de path category", response);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar la categoria");
    }
  }
);

//


const initialState = {
    items: [],
    loading: false,
    error: null,
};

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //case para fetch
        .addCase( fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase( fetchCategories.fulfilled, (state, action) => {
            console.log("PAYLOAD CATEGORIAS", action.payload)
            state.loading = false;
            state.items = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action ) => {
            state.loading = false;
            state.error = action.payload;
        })
        //case para create
        .addCase(createCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(createCategory.fulfilled, (state, action) => {
          state.loading = false;
          state.items.unshift(action.payload);
        })
        .addCase(createCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        //case para patch
        .addCase(patchCategory.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(patchCategory.fulfilled, (state, action) => {
          state.loading = false;
          const index = state.items.findIndex((c) => c.id === action.payload.id);
          if (index !== -1) {
            state.items[index] = action.payload;
          }
        })
        .addCase(patchCategory.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
});

export const selectCategories = (state) => state.categories.items;
export const selectCategoriesLoading = (state) => state.categories.loading;
export const selectCategoriesError = (state) => state.categories.error;

export default categoriesSlice.reducer;