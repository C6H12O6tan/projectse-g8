// src/lib/supabaseServer.ts
import { cookies } from 'next/headers';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';

/**
 * Server client ที่อ่าน session จาก cookies ของ request ปัจจุบัน
 * - NOTE: ใน Next 15+ ต้อง await cookies()
 */
export async function supabaseServer() {
  const cookieStore = await cookies(); // ✅ ต้อง await

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(_name: string, _value: string, _options: CookieOptions) {
          // no-op ใน server context
        },
        remove(_name: string, _options: CookieOptions) {
          // no-op ใน server context
        },
      },
    }
  );
}

/**
 * Admin client (service role) — ใช้เฉพาะฝั่ง server
 * ต้องมี env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
export async function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey);
}
