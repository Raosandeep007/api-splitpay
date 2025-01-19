import { Request, Response } from "express";
import { UserService } from "../services/user";
import { UserAuthService } from "../services/auth";

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch users", error });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const user = await UserService.create({ name, email });
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: "Failed to create user", error });
    }
  },

  getProfile: async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const { data, error } = await UserAuthService.getUser(token);

      const email = data.user?.email;

      if (!email) {
        return res
          .status(error?.status || 404)
          .json({ message: "User not found", error });
      }

      const user = await UserService.find({
        email,
      });

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({
        message: "Failed to fetch user profile",
        error,
      });
    }
  },
};
