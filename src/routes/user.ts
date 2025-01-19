import { Router } from "express";
import { UserController } from "../controllers/user";
import { requiredFields } from "../middlewares/requiredfields";
import { asyncHandler } from "../utils/asyncHandler";

export const userRoutes = Router();

userRoutes.post(
  "/",
  requiredFields(["name", "email"]),
  asyncHandler(UserController.createUser),
);
userRoutes.get("/profile", asyncHandler(UserController.getProfile));
userRoutes.get("/all", asyncHandler(UserController.getAllUsers));
