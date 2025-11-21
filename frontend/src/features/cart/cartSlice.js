import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCartFetch,
  viewCartItemsFetch,
  deleteCartItemFetch,
} from "./cartAPI";

export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      await addToCartFetch({ productId, quantity });
      // Refresh cart to get updated items with populated product data
      const refreshedCart = await viewCartItemsFetch();
      console.log(refreshedCart, "refreshed cart after add");
      return refreshedCart;
    } catch (error) {
      console.log(error, "error add to cart");
      return rejectWithValue(error);
    }
  }
);
export const viewAllCartItems = createAsyncThunk(
  "user/viewAllCartItems",
  async (_, { rejectWithValue }) => {
    try {
      const response = await viewCartItemsFetch();
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteItemFromCart = createAsyncThunk(
  "user/deleteItemFromCart",
  async (cartItemId, { rejectWithValue }) => {
    try {
      await deleteCartItemFetch(cartItemId);
      const refreshedCart = await viewCartItemsFetch();
      return refreshedCart;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  cartItems: [],
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // add to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        // Backend returns updated cart items, use them directly
        state.cartItems = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // view all cart items
      .addCase(viewAllCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(viewAllCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(viewAllCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      //delete item from cart
      .addCase(deleteItemFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItemFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cartItems = action.payload;
      })
      .addCase(deleteItemFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userSelector = (state) => state.cart;
export default cartSlice.reducer;
