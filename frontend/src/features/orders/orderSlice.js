import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getallOrderByUserFetch, placedOrderFetch } from "./orderAPI";

export const placedOrder = createAsyncThunk(
  "user/placedOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await placedOrderFetch(orderData);
      console.log(response, "response for placedOrderFetch");
      return response;
    } catch (error) {
      console.log(error, "error add to cart");
      return rejectWithValue(error);
    }
  }
);

export const getAllOrderByUser = createAsyncThunk(
  "user/getAllOrderByUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await getallOrderByUserFetch();
      console.log(response, "response for getAllOrderByUser in slice");
      return response;
    } catch (error) {
      console.log(error, "error in getall order");
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  orders: [],
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // orders
      .addCase(placedOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(placedOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(placedOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // getAllOrderByUser
      .addCase(getAllOrderByUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllOrderByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getAllOrderByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const userSelector = (state) => state.order;
export default orderSlice.reducer;
