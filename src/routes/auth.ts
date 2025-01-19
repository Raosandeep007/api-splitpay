import { Router } from "express";
import { AuthController } from "../controllers/auth";
import { requiredFields } from "../middlewares/requiredfields";
import { asyncHandler } from "../utils/asyncHandler";

export const authRoutes = Router();

authRoutes.post(
  "/google",
  requiredFields(["idToken"]),
  asyncHandler(AuthController.googleLogin),
);

authRoutes.post(
  "/signup",
  requiredFields(["email", "password", "name"]),
  asyncHandler(AuthController.signUpWithPassword),
);

authRoutes.post(
  "/sign-in",
  requiredFields(["email", "password"]),
  asyncHandler(AuthController.signInWithPassword),
);

authRoutes.post(
  "/otp-sign-in",
  requiredFields(["email"]),
  asyncHandler(AuthController.sendOtp),
);

authRoutes.post(
  "/verify-otp",
  requiredFields(["otp", "email"]),
  asyncHandler(AuthController.verifyOtp),
);

authRoutes.post(
  "/refresh-token",
  requiredFields(["refresh"]),
  asyncHandler(AuthController.refreshAccessToken),
);
