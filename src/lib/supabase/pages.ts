// src/lib/supabase/pages.ts
import type { IncomingMessage, ServerResponse } from "http";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export function supabasePages(req: IncomingMessage & { cookies?: Record<string, string> }, res: ServerResponse) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  if (!url || !anon) throw new Error("Missing Supabase env");

  return createServerClient(url, anon, {
    cookies: {
      getAll() {
        const result: { name: string; value: string }[] = [];
        const source = req.cookies ?? {};
        for (const [name, value] of Object.entries(source)) {
          if (typeof value === "string") result.push({ name, value });
        }
        return result;
      },
      setAll(cookiesToSet) {
        // pages router ไม่มีตัว set ง่าย ๆ — ปล่อยว่างหรือจัดการเองที่ framework layer
        // (ส่วนใหญ่ไม่จำเป็นใน pages)
      },
    },
  });
}
