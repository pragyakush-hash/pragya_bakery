import express from "express";
import sellerAnalyticsController from "../controller/sellerAnalyticsController.js";
import verifyToken from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/total-products", verifyToken, checkRole("seller"), sellerAnalyticsController.getSellerTotalProducts);
router.get("/total-orders", verifyToken, checkRole("seller"), sellerAnalyticsController.getSellerTotalOrders);
router.get("/total-revenue", verifyToken, checkRole("seller"), sellerAnalyticsController.getSellerRevenue);
router.get("/stats", verifyToken, checkRole("seller"), sellerAnalyticsController.getSellerStats);

export default router;
