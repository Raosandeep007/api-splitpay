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
      const access = signInData.session.access_token;
      const refresh = signInData.session.refresh_token;

      let user = await UserService.findUnique({ email });

      if (!user) {
        user = await UserService.createUser({
          email,
          name,
          picture,
        });
      }

      res.status(200).json({
        message: "Login successful",
        data: { ...user, access, refresh },
      });
    } catch (error) {
      res.status(500).json({ error: "Google login failed" });
    }
  },

  refreshAccessToken: async (req: Request, res: Response) => {
    const { refresh } = req.body;

    if (!refresh) {
      return res.status(400).json({ error: "Refresh token is required" });
    }

    try {
      const { data, error } = await AuthService.refreshSession(refresh);

      if (error) {
        return res
          .status(401)
          .json({ error: "Failed to refresh access token" });
      }

      const access = data?.session?.access_token;
      const refreshToken = data?.session?.refresh_token;
      const email = data?.user?.user_metadata?.email;

      let user = await UserService.findUnique({ email });

      if (!access) {
        return res.status(400).json({ error: "No access token returned" });
      }

      res.status(200).json({ ...user, access, refresh: refreshToken });
    } catch (error) {
      console.error("Error refreshing access token:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};
