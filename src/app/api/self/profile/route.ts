import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const Update = z.object({
  display_name: z.string().trim().optional(),
  fullname: z.string().trim().optional(),
  phone: z.string().trim().optional(),
});

async function getUserFromBearer(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) return null;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data } = await sb.auth.getUser();
  return { user: data?.user ?? null, sb };
}

// GET: อ่านโปรไฟล์ของตัวเอง (ใช้ RLS; ต้องแนบ Bearer)
export async function GET(req: NextRequest) {
  const auth = await getUserFromBearer(req);
  if (!auth?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const { sb, user } = auth;
  const { data, error } = await sb
    .from("profiles")
    .select("id,email,display_name,fullname,phone,role")
    .eq("id", user.id)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? {});
}

// PATCH: อัปเดตโปรไฟล์ตัวเอง (ใช้ RLS; ต้องแนบ Bearer)
export async function PATCH(req: NextRequest) {
  const auth = await getUserFromBearer(req);
  if (!auth?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => ({}));
  const parsed = Update.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }

  const { sb, user } = auth;
  const payload = parsed.data;

  const { data, error } = await sb
    .from("profiles")
    .update(payload)
    .eq("id", user.id)
    .select("id,email,display_name,fullname,phone,role")
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data ?? {});
}
