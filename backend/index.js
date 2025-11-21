import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.js";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import cartRoutes from "./routes/cart.js";
import otpRoutes from "./routes/otp.js";
import adminAnalytics from "./routes/adminAnalytics.js";
import sellerAnalytics from "./routes/sellerAnalytics.js";
import userAnalytics from "./routes/userAnalytics.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/sendotp", otpRoutes);
app.use("/api/analytics/admin", adminAnalytics);
app.use("/api/analytics/seller", sellerAnalytics);
app.use("/api/analytics/user", userAnalytics);



app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
