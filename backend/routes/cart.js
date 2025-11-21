import { Router } from "express";
import verifyToken from "../middleware/authMiddleware.js";
import cartController from "../controller/cartController.js";

const route = Router();

route.post("/add", verifyToken, cartController.addToCart);
route.get("/", verifyToken, cartController.viewCart);
route.delete("/:id", verifyToken, cartController.deleteCartItem);
export default route;
