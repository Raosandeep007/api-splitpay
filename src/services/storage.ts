import { supabase } from "../../supabase/supabase";

const URL_EXPIRATION = 120;

export const StorageService = {
  uploadFile: async ({ name, file }: { file: File; name: string }) => {
    return await supabase.storage.from("profile").upload(name, file);
  },

  getFile: async (path: string) => {
    return await supabase.storage
      .from("profile")
      .createSignedUrl(path, URL_EXPIRATION);
  },
};
