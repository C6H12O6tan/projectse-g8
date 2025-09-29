// src/lib/supabase/rsc.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * สร้าง Supabase client สำหรับใช้งานใน Server Component (RSC)
 * ทำงานบน App Router เท่านั้น
 */
export async function supabaseRSC(): Promise<SupabaseClient> {
  const store = await cookies(); // Next 15: เป็น async
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error("Missing Supabase env vars");

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        // แปลงเป็นรูปแบบ { name, value }[]
        return store.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        // เขียน cookie กลับเข้า response ของ App Router
        cookiesToSet.forEach(({ name, value, options }) => {
          store.set({ name, value, ...(options as CookieOptions | undefined) });
        });
      },
    },
  });
}
