import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productSlice";
import orderReducer from "../features/orders/orderSlice";
import sellerReducer from "../features/seller/sellerSlice";
import adminReducer from "../features/admin/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    product: productReducer,
    order: orderReducer,
    seller: sellerReducer,
    admin: adminReducer,
  },
});
