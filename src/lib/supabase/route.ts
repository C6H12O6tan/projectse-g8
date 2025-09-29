// src/lib/supabase/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/** ใช้ใน app/api/* เพื่อสร้าง supabase client ที่ sync cookies จาก req <-> res */
export function supabaseFromRequest(req: NextRequest) {
  const res = new NextResponse(null);

  const client = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            res.cookies.set({ name, value, ...(options as CookieOptions | undefined) });
          }
        },
      },
    }
  );

  // คืนทั้ง client และ response เพื่อให้ route นำ headers ไปแนบ
  return { client, response: res };
}
