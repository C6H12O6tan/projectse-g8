// src/lib/supabase/app-browser.ts
import { createBrowserClient as createBrowserClientSSR } from "@supabase/ssr";

/** สร้าง Supabase client สำหรับฝั่ง Browser */
export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createBrowserClientSSR(url, anon);
}

export type BrowserSupabase = ReturnType<typeof createBrowserClient>;
