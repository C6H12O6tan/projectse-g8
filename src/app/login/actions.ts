"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function doLogin(_: unknown, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { ok: false, message: "กรุณากรอกอีเมลและรหัสผ่าน" };
  }

  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        // อ่านคุกกี้ทั้งหมดที่มากับคำขอ
        getAll() {
          return cookieStore.getAll().map((c) => ({
            name: c.name,
            value: c.value!,
          }));
        },
        // ให้ Supabase เขียนคุกกี้ session ลงคำตอบ (ฝั่ง server)
        setAll(cookiesToSet) {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(
              name,
              value,
              options as CookieOptions | undefined
            );
          }
        },
      },
    }
  );

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { ok: false, message: error.message };
  }

  // ถึงตรงนี้คุกกี้ถูกเซ็ตเรียบร้อยแล้ว → เด้งไปตรวจบทบาท
  redirect("/validate");
}
