import { Router } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();

router.post("/google", AuthController.googleLogin);
router.post("/refresh-token", AuthController.refreshAccessToken);

export default router;
