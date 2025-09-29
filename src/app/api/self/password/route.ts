import { NextResponse } from "next/server";
import { supabaseRSCClient } from "@/lib/supabase/app-rsc";

export async function POST(req: Request) {
  try {
    const sb = await supabaseRSCClient();
    const { data: { user }, error: uerr } = await sb.auth.getUser();
    if (uerr) throw uerr;
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { password } = (await req.json()) as { password?: string };
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "รหัสผ่านต้องยาวอย่างน้อย 6 ตัวอักษร" }, { status: 400 });
    }

    const { error } = await sb.auth.updateUser({ password });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}
