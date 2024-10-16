import { Request, Response, NextFunction } from "express";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  // Verify token logic (mocked)
  if (token === "valid_token") {
    next();
  } else {
    res.status(403).json({ error: "Invalid token" });
  }
};
