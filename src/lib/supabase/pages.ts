// src/lib/supabase/pages.ts
import {
  createServerClient,
  type CookieOptions,
  type CookieMethodsServer,
} from "@supabase/ssr";
import type { NextApiRequest, NextApiResponse } from "next";

/** ใช้กับ Page Router เท่านั้น (pages/**) */
export function supabasePages(req: NextApiRequest, res: NextApiResponse) {
  const cookieMethods: CookieMethodsServer = {
    // ✅ คืนเป็นอาร์เรย์ { name, value } ที่ value เป็น string เสมอ (ไม่มี undefined)
    getAll() {
      const result: { name: string; value: string }[] = [];
      const source = req.cookies ?? {};
      for (const [name, value] of Object.entries(source)) {
        if (typeof value === "string") {
          result.push({ name, value });
        }
      }
      return result; // ตรงกับ GetAllCookies (sync array ก็ได้)
    },

    // ✅ ตั้งหลายคุกกี้พร้อมกัน
    setAll(cookiesToSet) {
      const headers: string[] = [];
      for (const { name, value, options } of cookiesToSet) {
        headers.push(serializeCookie(name, value, options as CookieOptions | undefined));
      }

      // merge กับ Set-Cookie เดิมถ้ามี
      const prev = res.getHeader("Set-Cookie");
      if (prev) {
        const merged = Array.isArray(prev) ? prev.concat(headers) : [String(prev), ...headers];
        res.setHeader("Set-Cookie", merged);
      } else {
        res.setHeader("Set-Cookie", headers);
      }
    },
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieMethods }
  );
}

/** ช่วย serialize cookie แบบง่ายสำหรับ Page Router */
function serializeCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
) {
  const parts: string[] = [`${name}=${encodeURIComponent(value)}`];
  if (options.maxAge !== undefined) parts.push(`Max-Age=${options.maxAge}`);
  if (options.path) parts.push(`Path=${options.path}`);
  if (options.domain) parts.push(`Domain=${options.domain}`);
  if (options.sameSite) parts.push(`SameSite=${options.sameSite}`);
  if (options.secure) parts.push("Secure");
  if (options.httpOnly) parts.push("HttpOnly");
  return parts.join("; ");
}
