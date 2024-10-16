import { UserController } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get("/", UserController.getAllUsers);
router.post("/", UserController.createUser);

export default router;
