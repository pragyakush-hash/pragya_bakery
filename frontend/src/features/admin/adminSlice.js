import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getAdminStatsFetch,
  getAllUsersFetch,
  deleteUserFetch,
  updateUserFetch,
  getAllProductsFetch,
  deleteProductFetch,
  getAllOrdersFetch,
  updateOrderStatusFetch,
} from "./adminAPI";

export const getAdminStats = createAsyncThunk(
  "admin/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getAdminStatsFetch();
      return stats;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "admin/getAllUsers",
  async (role, { rejectWithValue }) => {
    try {
      const users = await getAllUsersFetch(role);
      return users;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "admin/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await deleteUserFetch(userId);
      return userId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  "admin/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await updateUserFetch(userId, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllProducts = createAsyncThunk(
  "admin/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await getAllProductsFetch();
      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "admin/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProductFetch(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "admin/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getAllOrdersFetch();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrderStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await updateOrderStatusFetch(orderId, status);
      return { orderId, status };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  stats: {
    totalUsers: 0,
    totalSellers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  },
  users: [],
  products: [],
  orders: [],
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Stats
      .addCase(getAdminStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAdminStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getAdminStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Users
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((u) => u._id !== action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((u) => u._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Products
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      // Orders
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const index = state.orders.findIndex((o) => o._id === action.payload.orderId);
        if (index !== -1) {
          state.orders[index].status = action.payload.status;
        }
      });
  },
});

export const { clearError } = adminSlice.actions;
export default adminSlice.reducer;

