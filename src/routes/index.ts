import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
// import { authMiddleware } from "../middlewares/authMiddleware";
import { fileRoutes } from "./file";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/splitpay");
});

router.get("/splitpay", (req, res) => {
  res.send("Welcome to Splitpay API");
});

router.use("/splitpay/auth", authRoutes);
router.use("/splitpay/file", fileRoutes);

// Under this all routes are protected
// TODO: uncomment this line after implementing authMiddleware
// router.use(authMiddleware);
router.use("/splitpay/user", userRoutes);

export default router;
