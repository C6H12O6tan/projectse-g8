// src/lib/supabase/rsc.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * ใช้ใน Server Component (RSC) เท่านั้น — อ่าน cookie ได้อย่างเดียว
 * ห้าม set cookie ใน RSC (Next จะเตือน) จึงทำ setAll เป็น no-op
 */
export async function supabaseRSC() {
  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // อ่านทั้งหมดจาก cookie store (ต้อง await ก่อน)
        async getAll() {
          const jar = await cookies();
          const all = jar.getAll(); // -> { name: string; value: string }[]
          // แปลงเป็นรูปแบบที่ @supabase/ssr ต้องการ
          return all.map(
            (c: { name: string; value: string }) => ({ name: c.name, value: c.value })
          );
        },
        // ใน RSC ห้ามแก้ cookie: ทำเป็น no-op ไป
        setAll(_cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) {
          /* no-op: cannot set cookies in RSC */
        },
      },
    }
  );

  return client;
}

/** helper: ดึง user ปัจจุบันจาก RSC ได้สะดวก */
export async function currentUserRSC() {
  const supabase = await supabaseRSC();
  const { data } = await supabase.auth.getUser();
  return data.user ?? null;
}
