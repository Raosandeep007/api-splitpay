import { Router } from "express";
import { UserController } from "../controllers/userController";

const router = Router();

// router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);
router.get("/profile", UserController.getProfile);

export default router;
