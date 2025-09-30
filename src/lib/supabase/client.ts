import { createClient, type SupabaseClient } from "@supabase/supabase-js";
let _client: SupabaseClient | null = null;

export const supabaseBrowser = () => {
  if (_client) return _client;
  const url  = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url)  throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_URL");
  if (!anon) throw new Error("Missing env: NEXT_PUBLIC_SUPABASE_ANON_KEY");
  _client = createClient(url, anon, { auth: { persistSession: true, autoRefreshToken: true } });
  return _client;
};
