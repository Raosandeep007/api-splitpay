import { Router } from "express";
import userRoutes from "./userRoutes";
import authRoutes from "./authRoutes";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", (req, res) => {
  res.redirect("/splitpay");
});

router.get("/splitpay", (req, res) => {
  res.send("Welcome to Splitpay API");
});

router.use("/splitpay/auth", authRoutes);

// Under this all routes are protected
// TODO: uncomment this line after implementing authMiddleware
// router.use(authMiddleware);
router.use("/splitpay/user", userRoutes);

export default router;
