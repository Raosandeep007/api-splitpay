import { Router } from "express";
import userRoutes from "./userRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.send("Welcome to Splitpay");
});

router.get("/api", (req, res) => {
  res.send("Welcome to Splitpay API");
});

router.use("/api/users", userRoutes);

export default router;
