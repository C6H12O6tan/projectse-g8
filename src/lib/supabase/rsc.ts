// src/lib/supabase/rsc.ts
import "server-only";
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function supabaseRSC() {
  const store = await cookies(); // Next.js app router cookies

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // ให้ SSR อ่าน cookie ปัจจุบันทั้งหมด
        getAll() {
          return store.getAll().map(c => ({ name: c.name, value: c.value ?? "" }));
        },
        // ให้ SSR เขียน cookie ที่ต้องอัปเดตกลับไป
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            store.set({ name, value, ...(options as CookieOptions) });
          });
        },
      },
    }
  );

  return supabase;
}
