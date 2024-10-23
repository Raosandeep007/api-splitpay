import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { data, error } = await AuthService.getUser(token);

  if (error || !data) {
    return res.status(403).json({ error: "Forbidden" });
  }

  req.user = data; // Attach user info to the request
  next();
};
