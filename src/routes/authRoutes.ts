import { Router } from "express";
import { AuthController } from "../controllers/authController";
import { requiredFieldsMiddleware } from "../middlewares/requiredfieldsMiddleware";

const router = Router();

router.post(
  "/google",
  requiredFieldsMiddleware(["idToken"]),
  AuthController.googleLogin,
);

router.post(
  "/signup",
  requiredFieldsMiddleware(["email", "password", "name"]),
  AuthController.signUpWithPassword,
);

router.post(
  "/sign-in",
  requiredFieldsMiddleware(["email", "password"]),
  AuthController.signInWithPassword,
);

router.post(
  "/otp-sign-in",
  requiredFieldsMiddleware(["email"]),
  AuthController.sendOtp,
);

router.post(
  "/verify-otp",
  requiredFieldsMiddleware(["otp", "email"]),
  AuthController.verifyOtp,
);

router.post(
  "/refresh-token",
  requiredFieldsMiddleware(["refresh"]),
  AuthController.refreshAccessToken,
);

export default router;
