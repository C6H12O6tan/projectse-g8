import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const Body = z.object({
  current: z.string().min(1),
  next: z.string().min(8),
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

export async function POST(req: NextRequest) {
  const auth = await getUserFromBearer(req);
  if (!auth?.user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const json = await req.json().catch(() => ({}));
  const parsed = Body.safeParse(json);
  if (!parsed.success) return NextResponse.json({ error: "invalid payload" }, { status: 400 });

  const { sb, user } = auth;
  const { current, next } = parsed.data;

  // ยืนยันรหัสผ่านปัจจุบันก่อน (sign-in แบบ background)
  if (!user.email) return NextResponse.json({ error: "missing email" }, { status: 400 });

  const verify = await sb.auth.signInWithPassword({ email: user.email, password: current });
  if (verify.error) return NextResponse.json({ error: "current password incorrect" }, { status: 400 });

  // เปลี่ยนรหัสผ่าน
  const upd = await sb.auth.updateUser({ password: next });
  if (upd.error) return NextResponse.json({ error: upd.error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
