import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

router.post("/", UserController.createUser);
router.get("/profile", UserController.getProfile);
router.get("/all", UserController.getAllUsers);

export default router;
