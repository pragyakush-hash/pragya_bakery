import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getSellerProductsFetch,
  createProductFetch,
  updateProductFetch,
  deleteProductFetch,
} from "./sellerProductAPI";
import { getSellerOrdersFetch } from "./sellerOrderAPI";
import { getSellerStatsFetch } from "./sellerAnalyticsAPI";

// Products
export const getSellerProducts = createAsyncThunk(
  "seller/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const products = await getSellerProductsFetch();
      return products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createProduct = createAsyncThunk(
  "seller/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await createProductFetch(formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "seller/updateProduct",
  async ({ productId, formData }, { rejectWithValue }) => {
    try {
      const response = await updateProductFetch(productId, formData);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await deleteProductFetch(productId);
      return productId;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Orders
export const getSellerOrders = createAsyncThunk(
  "seller/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const orders = await getSellerOrdersFetch();
      return orders;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Analytics
export const getSellerStats = createAsyncThunk(
  "seller/getStats",
  async (_, { rejectWithValue }) => {
    try {
      const stats = await getSellerStatsFetch();
      return stats;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  products: [],
  orders: [],
  stats: {
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  },
  isLoading: false,
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Products
      .addCase(getSellerProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getSellerProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create Product
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products.unshift(action.payload.newProduct);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Update Product
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.products.findIndex(
          (p) => p._id === action.payload.product._id
        );
        if (index !== -1) {
          state.products[index] = action.payload.product;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete Product
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = state.products.filter((p) => p._id !== action.payload);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Orders
      .addCase(getSellerOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getSellerOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Get Stats
      .addCase(getSellerStats.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSellerStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getSellerStats.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = sellerSlice.actions;
export default sellerSlice.reducer;

