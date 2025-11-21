import { Router } from "express";
import productsController from "../controller/productsController.js";
import verifyToken from "../middleware/authMiddleware.js";
import checkRole from "../middleware/roleMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const route = Router();

route.post("/",verifyToken,checkRole("seller"),upload.single('image'),productsController.createProduct);
route.get("/", productsController.getAllProducts);
route.get("/seller/my-products", verifyToken, checkRole("seller"), productsController.getSellerProducts);
route.get("/:id", productsController.getProductById);
route.delete("/:id",verifyToken,checkRole("seller","admin"), productsController.getProductAndDelete);
route.put("/:id",verifyToken,checkRole("seller"), upload.single('image'), productsController.getProductAndUpdate);
route.patch("/:id",verifyToken,checkRole("seller"), productsController.getProductAndUpdateField);
route.get("/api/products", productsController.getProductByPagination);

export default route;
