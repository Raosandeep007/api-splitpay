import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!,
);

export const AuthService = {
  signInWithIdToken: async (idToken: string) => {
    return await supabase.auth.signInWithIdToken({
      provider: "google",
      token: idToken,
    });
  },

  refreshSession: async (refreshToken: string) => {
    return await supabase.auth.refreshSession({ refresh_token: refreshToken });
  },

  getUser: async (token: string) => {
    return await supabase.auth.getUser(token);
  },
};
