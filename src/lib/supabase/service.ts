// src/lib/supabase/service.ts
import { createClient } from "@supabase/supabase-js";

export function supabaseService() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  if (!url || !key) throw new Error("Missing Supabase env for service client");
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
}
