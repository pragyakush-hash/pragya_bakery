import express from "express";
import adminAnalyticsController from "../controller/adminAnalyticsController.js";
import verifyToken from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get("/total-users", verifyToken, checkRole("admin"), adminAnalyticsController.getTotalUsers);
router.get("/total-orders", verifyToken, checkRole("admin"), adminAnalyticsController.getTotalOrders);
router.get("/total-revenue", verifyToken, checkRole("admin"), adminAnalyticsController.getTotalRevenue);
router.get("/total-products", verifyToken, checkRole("admin"), adminAnalyticsController.getTotalProducts);
router.get("/total-sellers", verifyToken, checkRole("admin"), adminAnalyticsController.getTotalSellers);
router.get("/stats", verifyToken, checkRole("admin"), adminAnalyticsController.getAdminStats);

export default router;
