import { Request, Response } from "express";
import { UserService } from "../services/userService";

export const UserController = {
  getAllUsers: async (req: Request, res: Response) => {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  createUser: async (req: Request, res: Response) => {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  },
};
