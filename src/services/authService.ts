import { createClient, EmailOtpType } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const AuthService = {
  authenticateWithGoogleToken: async (idToken: string) => {
    return await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });
  },

  signUp: async ({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }) => {
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          email,
        },
      },
    });
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  otpSignIn: async ({ email }: { email: string }) => {
    return await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
      },
    });
  },

  verifyOtp: async ({
    otp,
    email,
    type,
  }: {
    otp: string;
    email: string;
    type: EmailOtpType;
  }) => {
    return await supabase.auth.verifyOtp({
      email,
      token: otp,
      type,
    });
  },

  refreshSession: async (refreshToken: string) => {
    return await supabase.auth.refreshSession({ refresh_token: refreshToken });
  },

  getUser: async (token: string) => {
    return await supabase.auth.getUser(token);
  },
};
