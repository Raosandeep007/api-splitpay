import { Request, Response } from "express";
import { StorageService } from "../services/storage";

export const StorageController = {
  uploadFile: async (req: Request, res: Response) => {
    try {
      const { file: multerFile } = req;

      if (!multerFile) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const file = new File([multerFile.buffer], multerFile.originalname, {
        type: multerFile.mimetype,
        lastModified: Date.now(),
      });

      const { data, error } = await StorageService.uploadFile({
        file,
        name: multerFile.originalname,
      });

      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },

  getFile: async (req: Request, res: Response) => {
    try {
      const { path } = req.params;
      const { data, error } = await StorageService.getFile(path);
      if (error) {
        return res.status(500).json({ error });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
