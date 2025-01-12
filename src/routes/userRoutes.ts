import { Router } from "express";
import { UserController } from "../controllers/userController";
import { requiredFieldsMiddleware } from "../middlewares/requiredfieldsMiddleware";

const router = Router();

router.post(
  "/",
  requiredFieldsMiddleware(["name", "email"]),
  UserController.createUser,
);
router.get("/profile", UserController.getProfile);
router.get("/all", UserController.getAllUsers);

export default router;
