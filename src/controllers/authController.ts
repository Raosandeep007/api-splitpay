import { User } from "@prisma/client";
import { Request, Response } from "express";
import { AuthService } from "../services/authService";
import { UserService } from "../services/userService";

type UserResponse = User & {
  access: string;
  refresh: string;
};

const handleUserResponse = (
  res: Response,
  response: { status: number; data: UserResponse },
) => {
  res.status(response.status).json({ data: response.data });
};

export const AuthController = {
  googleLogin: async (req: Request, res: Response) => {
    const { idToken } = req.body;

    try {
      const { data: signInData, error } =
        await AuthService.authenticateWithGoogleToken(idToken);

      if (error) {
        return res
          .status(error.status || 400)
          .json({ error, message: "Invalid Google ID token" });
      }

      const { email, name, picture } = signInData.user.user_metadata;
      const { access_token: access, refresh_token: refresh } =
        signInData.session;

      let user = await UserService.find({ email });
      if (!user) {
        user = await UserService.create({ email, name, picture });
      }

      return handleUserResponse(res, {
        status: 200,
        data: {
          id: user.id,
          email: user.email,
          name: user.name,
          picture: user.picture,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          access,
          refresh,
        },
      });
    } catch (error) {
      return res.status(500).json({ error, message: "Google login failed" });
    }
  },

  signUpWithPassword: async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    try {
      const { data, error } = await AuthService.signUp({
        email,
        password,
        name,
      });

      if (error) {
        return res
          .status(error.status || 400)
          .json({ error, message: "Failed to sign up" });
      }

      let user = await UserService.find({ email });

      if (user) {
        return res.status(400).json({ error, message: "User already exists" });
      }

      user = await UserService.create({ email, name, picture: "" });

      const { access_token: access, refresh_token } = data.session || {};

      if (!access || !refresh_token) {
        return res
          .status(400)
          .json({ error, message: "No access token returned" });
      }

      return handleUserResponse(res, {
        status: 200,
        data: { ...user, access, refresh: refresh_token },
      });
    } catch (error) {
      return res.status(500).json({ error, message: "Sign up failed" });
    }
  },

  signInWithPassword: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await UserService.find({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const { data, error } = await AuthService.signIn({ email, password });

      if (error) {
        return res
          .status(error.status || 400)
          .json({ error, message: "Failed to sign in" });
      }

      const { access_token: access, refresh_token: refresh } =
        data.session || {};

      if (!access) {
        return res
          .status(400)
          .json({ error, message: "No access token returned" });
      }

      if (!user) {
        return res.status(400).json({ error, message: "User not found" });
      }

      return handleUserResponse(res, {
        status: 200,
        data: {
          ...user,
          access,
          refresh,
        },
      });
    } catch (error) {
      return res.status(500).json({ error, message: "Sign in failed" });
    }
  },

  sendOtp: async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
      const user = await UserService.find({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const { data, error } = await AuthService.otpSignIn({ email });

      if (error) {
        return res.status(400).json({ error });
      }

      return res.status(200).json({ message: `OTP sent to ${email}` });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Sign in with OTP failed" });
    }
  },

  verifyOtp: async (req: Request, res: Response) => {
    const { otp, email } = req.body;

    try {
      const user = await UserService.find({ email });

      if (!user) {
        return res.status(404).json({ message: "User does not exist" });
      }

      const { data, error } = await AuthService.verifyOtp({
        otp,
        email,
        type: "email",
      });

      if (error) {
        return res.status(400).json({ error });
      }

      const { session } = data || {};
      const { access_token: access, refresh_token: refresh } = session || {};

      if (!access || !refresh) {
        return res
          .status(400)
          .json({ error, message: "No access token returned" });
      }

      if (!user) {
        return res.status(400).json({ error, message: "User not found" });
      }

      return handleUserResponse(res, {
        status: 200,
        data: {
          ...user,
          access,
          refresh,
        },
      });
    } catch (error) {
      return res.status(500).json({ error, message: "Failed to verify OTP" });
    }
  },

  refreshAccessToken: async (req: Request, res: Response) => {
    const { refresh } = req.body;

    try {
      const { data, error } = await AuthService.refreshSession(refresh);

      if (error) {
        return res
          .status(error.status || 401)
          .json({ error, message: "Failed to refresh" });
      }

      const { access_token: access, refresh_token, user } = data.session || {};

      if (!access || !refresh_token) {
        return res
          .status(400)
          .json({ error, message: "No access token returned" });
      }

      if (!user) {
        return res.status(400).json({ error, message: "User not found" });
      }

      return handleUserResponse(res, {
        status: 200,
        data: {
          id: user.id,
          email: user.user_metadata.email,
          name: user.user_metadata.name,
          picture: user.user_metadata.picture,
          createdAt: new Date(user.created_at),
          updatedAt: new Date(user.updated_at || ""),
          access,
          refresh: refresh_token,
        },
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error, message: "Failed to refresh access token" });
    }
  },
};
