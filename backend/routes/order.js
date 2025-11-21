import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
import orderController from "../controller/orderController.js";

const route = Router();

route.post("/", verifyToken, checkRole("user"), orderController.createOrder);
route.get("/getAllByUser", verifyToken, orderController.getAllOrdersByUser);
route.get("/", verifyToken, checkRole("admin","seller"), orderController.getAllOrders);
route.patch("/:id", verifyToken, checkRole("admin"), orderController.updateOrderStatus);

export default route;
