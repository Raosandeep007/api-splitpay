import multer from "multer";
import { Request, Response } from "express";

export const upload = () => {
  return (req: Request, res: Response, next: Function) => {
    const storage = multer.memoryStorage(); // Stores the file in memory. You can use disk storage if needed.
    const upload = multer({ storage });
    upload.single("file")(req, res, (err) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      next();
    });
  };
};
