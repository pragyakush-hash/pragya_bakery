import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ProductDataFetch, ProductDataFetchById } from "./productAPI";

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      return await ProductDataFetch();
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getProductById = createAsyncThunk(
  "product/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await ProductDataFetchById(id);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: null,
    isLoading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // GET ALL PRODUCTS
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload; 
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // GET PRODUCT BY ID
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const productSelector = (state) => state.product;
export default productSlice.reducer;
