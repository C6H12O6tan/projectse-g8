import { supabaseRSC } from "@/lib/supabase/rsc";

export async function uploadThumbnail(file: File) {
  const sb = await supabaseRSC();                     // ✅
  const path = `thumbs/${Date.now()}-${file.name}`;
  const { data, error } = await sb.storage.from("thumbnails").upload(path, file); // ✅
  if (error) throw error;
  const { data: url } = sb.storage.from("thumbnails").getPublicUrl(path);
  return url.publicUrl;
}
