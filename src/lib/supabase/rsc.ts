// src/lib/supabase/rsc.ts
import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/** ใช้เฉพาะใต้ app/** */
export async function supabaseRSC() {
  const store = await cookies(); // Next 15: เป็น Promise

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        /** ✅ รูปแบบใหม่: คืน cookies ทั้งหมด */
        getAll() {
          // Next returns { name: string; value: string }[]
          return store.getAll();
        },
        /** ✅ รูปแบบใหม่: เซ็ตหลายคุกกี้ในครั้งเดียว */
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              // type ของ options เข้ากันกับ next/headers
              store.set(name, value, options as CookieOptions | undefined);
            });
          } catch {
            // no-op
          }
        },
      },
    }
  );
}
