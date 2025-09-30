// src/lib/supabase/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/** ใช้ใน app/api/* */
export function supabaseFromRequest(req: NextRequest) {
  const res = NextResponse.next();

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // อ่าน cookies ทั้งหมดจาก req
        getAll() {
          return req.cookies.getAll();
        },
        // เขียน cookies ทั้งหมดลง res
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              res.cookies.set({ name, value, ...(options as CookieOptions | undefined) });
            });
          } catch {
            /* no-op */
          }
        },
      },
    }
  );

  return { client, response: res };
}
