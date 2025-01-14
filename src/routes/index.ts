import { Router } from "express";
import { authRoutes } from "./auth";
import { userRoutes } from "./user";
// import { authMiddleware } from "../middlewares/authMiddleware";
import { fileRoutes } from "./file";

const router = Router();

router.get("/", (req, res) => {
  // res.redirect("/splitpay");
  res.send("Welcome to Splitpay API");
});

router.use("/auth", authRoutes);
router.use("/file", fileRoutes);

// Under this all routes are protected
// TODO: uncomment this line after implementing authMiddleware
// router.use(authMiddleware);
router.use("/user", userRoutes);

export default router;
