import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";

export const AuthController = {
  googleLogin: async (req: Request, res: Response) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: "ID token is required" });
    }

    try {
      const { data: signInData, error: signInError } =
        await AuthService.signInWithIdToken(idToken);

      if (signInError) {
        return res.status(400).json({ error: "Invalid Google ID token" });
      }

      const { email, name, picture } = signInData.user.user_metadata;

      let user = await UserService.findUnique({ email });

      if (!user) {
        user = await UserService.createUser({
          email,
          name,
          picture,
        });
      }

      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      res.status(500).json({ error: "Google login failed" });
    }
  },
};
