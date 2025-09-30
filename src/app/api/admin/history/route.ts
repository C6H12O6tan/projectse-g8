import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getUserRole } from "@/lib/auth";

const Q = z.object({ id: z.string().uuid() });

/** อ่าน user จาก Authorization header (Bearer) แล้วตรวจว่าเป็น admin */
async function requireAdmin(req: NextRequest) {
  const auth = req.headers.get("authorization") || "";
  if (!auth.toLowerCase().startsWith("bearer ")) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const sb = createClient(url, anon, {
    global: { headers: { Authorization: auth } },
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await sb.auth.getUser();
  if (error || !data?.user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const role = await getUserRole(data.user.id);
  if (role !== "admin") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  // ผ่านสิทธิ์
  return null as NextResponse | null;
}

export async function GET(req: NextRequest) {
  // ✅ ตรวจสิทธิ์จาก Bearer
  const guard = await requireAdmin(req);
  if (guard) return guard;

  // ✅ ใช้ service role เพื่อไม่ติด RLS
  const admin = supabaseAdmin();
  const { data, error } = await admin
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ items: data ?? [] });
}

export async function DELETE(req: NextRequest) {
  // ✅ ตรวจสิทธิ์จาก Bearer
  const guard = await requireAdmin(req);
  if (guard) return guard;

  const { searchParams } = new URL(req.url);
  const parsed = Q.safeParse({ id: searchParams.get("id") });
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
  const { id } = parsed.data;

  // ✅ ใช้ service role ลบ (ไม่ติด RLS)
  const admin = supabaseAdmin();
  const { error } = await admin.from("audit_logs").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
