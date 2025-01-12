import { Request, Response } from "express";

export const requiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: Function) => {
    const missingFields = fields.filter((field) => !req.body[field]);
    if (missingFields.length) {
      res
        .status(400)
        .json({ error: `${missingFields.join(", ")} are required` });
      return;
    }
    next();
  };
};
