// src/lib/supabase/app-rsc.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/** ใช้ใน RSC/Server เท่านั้น: อ่าน cookie ได้ (ไม่ set cookie ในที่นี้) */
export async function supabaseRSCClient() {
  // Next.js 15: cookies() คืนค่าเป็น Promise
  const store = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const client = createServerClient(url, anon, {
    cookies: {
      get(name: string) {
        return store.get(name)?.value;
      },
      // no-op ใน RSC
      set(_name: string, _value: string, _options?: CookieOptions) {},
      remove(_name: string, _options?: CookieOptions) {},
    },
  });

  return client;
}
