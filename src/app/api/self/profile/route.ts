import { NextResponse } from "next/server";
import { supabaseRSCClient } from "@/lib/supabase/app-rsc";

// GET: โปรไฟล์ของผู้ใช้ปัจจุบัน
export async function GET() {
  try {
    const sb = await supabaseRSCClient();
    const { data: { user }, error: uerr } = await sb.auth.getUser();
    if (uerr) throw uerr;
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { data, error } = await sb
      .from("profiles")
      .select("id, email, display_name, phone, role, created_at")
      .eq("id", user.id)
      .single();
    if (error) throw error;

    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}

// PATCH: อัปเดต display_name / phone (ของตัวเอง)
export async function PATCH(req: Request) {
  try {
    const sb = await supabaseRSCClient();
    const { data: { user }, error: uerr } = await sb.auth.getUser();
    if (uerr) throw uerr;
    if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

    const { display_name, phone } = (await req.json()) as {
      display_name?: string;
      phone?: string;
    };

    const patch: Record<string, any> = {};
    if (typeof display_name !== "undefined") patch.display_name = display_name;
    if (typeof phone !== "undefined") patch.phone = phone;

    if (Object.keys(patch).length > 0) {
      const { error } = await sb.from("profiles").update(patch).eq("id", user.id);
      if (error) throw error;
    }

    // optional: sync metadata
    await sb.auth.updateUser({ data: { display_name, phone } }).catch(() => {});

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}
