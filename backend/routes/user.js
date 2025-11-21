import { Router } from "express";
import userController from "../controller/userController.js";
import verifyToken from "../middleware/authMiddleware.js";
import handleValidationErrors from "../middleware/validator/validateRequest.js";
import { loginValidation, registerValidation } from "../middleware/validator/userValidator.js";
import checkRole from "../middleware/roleMiddleware.js";
const router = Router();

//protecetd route

// router.get("/", verifyToken, (req, res) => {
//   res.status(200).json({ message: "Protected route accessed" });
// });

router.post("/",verifyToken,checkRole("seller","admin"), userController.createUser);
router.get("/", verifyToken, checkRole("admin"), userController.getUser);
router.get("/all", verifyToken, checkRole("admin"), userController.getAllUsers);
router.get("/:id", verifyToken, checkRole("admin"), userController.getUserById);
router.delete("/:id",verifyToken, checkRole("admin"),userController.deleteUser);
router.put("/:id", verifyToken, checkRole("admin"), userController.updateUser);
router.post("/register",registerValidation,handleValidationErrors, userController.register);
router.post("/login",loginValidation,handleValidationErrors, userController.login);
router.post("/refresh-token", userController.refreshToken);
router.post("/logout", userController.logout);

/**
 * Complete CRUD operation for user
 * Complete CRUD operation for user/:id
 */

export default router;
