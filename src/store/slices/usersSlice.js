/**
 * slice para usersSlice
 */
import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { apiService } from "../../services";
import { config } from "../../config";

const urlEndpoint = "users/" //get
const urlcreateUser = "register/"//crear usuario

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiService.get(`${config.appURLusers}${urlEndpoint}`);

      console.log("respuesta de fetchUser: ", response)

      return response.body?.results ?? [];
    } catch (error) {
      return rejectWithValue(error.message || "Error al obtener usuarios");
    }
  }
);

//crear usuario
export const createUsers = createAsyncThunk(
  "usurs/createUsers",
  async (payload, {rejectWithValue}) => {
    try {
      const response = await apiService.post(`${config.appURLusers}${urlcreateUser}`, payload);

      //quiero validar error
      console.log("respuesta de post users: ", response);
      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al crear el usuario")
    }
  }
);

//patch usuario
export const patchUser = createAsyncThunk(
  "users/patchUser",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await apiService.patch(
        `${config.appURLusers}users/${id}/`,
        data
      );

      return response.body;
    } catch (error) {
      return rejectWithValue(error.message || "Error al actualizar el usuario");
    }
  }
);





const initialState = {
  items: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //case de fetchusers
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //case post
      .addCase(createUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      //case para patch
      .addCase(patchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(patchUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex((u) => u.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            ...action.payload,
          };
        }
      })
      .addCase(patchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.loading;
export const selectUsersError = (state) => state.users.error;

export default usersSlice.reducer;
