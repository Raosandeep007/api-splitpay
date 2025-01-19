import { Router } from "express";
import { StorageController } from "../controllers/storage";
import { upload } from "../middlewares/multer";
import { asyncHandler } from "../utils/asyncHandler";

export const fileRoutes = Router();

fileRoutes.get(
  "/:path",

  asyncHandler(StorageController.getFile),
);

fileRoutes.post("/", upload(), asyncHandler(StorageController.uploadFile));
