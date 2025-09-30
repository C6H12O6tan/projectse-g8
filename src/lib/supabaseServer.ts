// src/lib/supabaseServer.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr';

/**
 * สร้าง Supabase client สำหรับฝั่งเซิร์ฟเวอร์ (RSC/Route Handler)
 * - ไม่มีการ import 'next/headers' ที่ top-level อีกต่อไป
 * - ป้องกันการเรียกจากฝั่ง client
 */
export async function supabaseServer() {
  if (typeof window !== 'undefined') {
    throw new Error('supabaseServer() must be used on the server side only');
  }

  // ✅ import ตอนรันจริงฝั่ง server เท่านั้น
  const { cookies, headers } = await import('next/headers');
  const cookieStore = await cookies();
  const hdrs = await headers();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  // Next 15+: ต้องใช้ getAll/setAll ตามสเปกใหม่
  const client = createServerClient(url, anon, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (cookiesToSet: { name: string; value: string; options: CookieOptions }[]) => {
        cookiesToSet.forEach(({ name, value, options }) => {
          cookieStore.set(name, value, options);
        });
      },
    },
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      headers: {
        // ถ้าต้องการ pass header บางตัวไปยัง Supabase
        'X-Forwarded-For': hdrs.get('x-forwarded-for') ?? '',
      },
    },
  });

  return client;
}

export default supabaseServer;
