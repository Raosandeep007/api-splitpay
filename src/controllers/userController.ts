import { Request, Response } from "express";
import { UserService } from "../services/userService";
import { AuthService } from "../services/authService";

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const user = await UserService.create({ name, email });
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  getProfile: async (req: Request, res: Response) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { data, error } = await AuthService.getUser(token);

    try {
      const email = data.user?.email;
      if (!email) {
        return res
          .status(404)
          .json({ error: error?.message || "User not found" });
      }

      const user = await UserService.find({
        email,
      });

      res.status(200).json({ data: user });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({
        error: "Failed to fetch user profile",
      });
    }
  },
};
