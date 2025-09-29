import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server-admin";

async function assertAdmin() {
  const admin = supabaseAdmin();
  const { error } = await admin.auth.admin.listUsers();
  if (error) throw error;
  return true;
}

// GET: ดึงรายการ พร้อม display_name
export async function GET() {
  try {
    await assertAdmin();
    const db = supabaseAdmin();
    const { data, error } = await db
      .from("profiles")
      .select("id, email, display_name, fullname, phone, role, created_at")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return NextResponse.json(data ?? []);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}

// POST: เพิ่มผู้ใช้ใหม่ (รับ display_name)
export async function POST(req: Request) {
  try {
    await assertAdmin();

    const {
      email,
      password,
      display_name,
      fullname, // เผื่อมีส่งมา (optional)
      phone,
      role,
    } = (await req.json()) as {
      email: string;
      password: string;
      display_name?: string;
      fullname?: string;
      phone?: string;
      role: "admin" | "officer" | "teacher";
    };

    if (!email || !password || !role) {
      throw new Error("email, password, role จำเป็นต้องมี");
    }

    const admin = supabaseAdmin();

    // สร้างใน Auth (เก็บ display_name ลง user_metadata)
    const { data: created, error: createErr } = await admin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { display_name, fullname, phone, role },
    });
    if (createErr) throw createErr;

    const uid = created.user?.id!;

    // upsert โปรไฟล์: เน้นใช้ display_name เป็นหลัก (fullname เก็บเสริมได้)
    const { error: upErr } = await admin
      .from("profiles")
      .upsert(
        {
          id: uid,
          email,
          display_name: display_name ?? null,
          fullname: fullname ?? null,
          phone: phone ?? null,
          role,
        },
        { onConflict: "id" }
      );
    if (upErr) throw upErr;

    return NextResponse.json({ ok: true, id: uid });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}

// PATCH: แก้ไขข้อมูล (รองรับ display_name)
export async function PATCH(req: Request) {
  try {
    await assertAdmin();

    const {
      id,
      email,
      display_name,
      fullname,
      phone,
      role,
      password,
    } = (await req.json()) as {
      id: string;
      email?: string;
      display_name?: string;
      fullname?: string;
      phone?: string;
      role?: "admin" | "officer" | "teacher";
      password?: string;
    };

    if (!id) throw new Error("missing id");

    const admin = supabaseAdmin();

    // อัปเดต Auth (email/password/metadata)
    const authUpdate: Record<string, any> = {};
    if (email) authUpdate.email = email;
    if (password) authUpdate.password = password;

    if (
      typeof display_name !== "undefined" ||
      typeof fullname !== "undefined" ||
      typeof phone !== "undefined" ||
      typeof role !== "undefined"
    ) {
      authUpdate.user_metadata = { display_name, fullname, phone, role };
    }

    if (Object.keys(authUpdate).length > 0) {
      const { error: auErr } = await admin.auth.admin.updateUserById(id, authUpdate);
      if (auErr) throw auErr;
    }

    // อัปเดต profiles
    const patch: Record<string, any> = {};
    if (typeof email !== "undefined") patch.email = email;
    if (typeof display_name !== "undefined") patch.display_name = display_name;
    if (typeof fullname !== "undefined") patch.fullname = fullname;
    if (typeof phone !== "undefined") patch.phone = phone;
    if (typeof role !== "undefined") patch.role = role;

    if (Object.keys(patch).length > 0) {
      const { error: pErr } = await admin.from("profiles").update(patch).eq("id", id);
      if (pErr) throw pErr;
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}

// DELETE: ลบ (อ่าน id จาก JSON body)
export async function DELETE(req: Request) {
  try {
    await assertAdmin();

    const { id } = (await req.json().catch(() => ({}))) as { id?: string };
    if (!id) throw new Error("missing id");

    const admin = supabaseAdmin();

    const { error: d1 } = await admin.from("profiles").delete().eq("id", id);
    if (d1) throw d1;

    const { error: d2 } = await admin.auth.admin.deleteUser(id);
    if (d2) throw d2;

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "failed" }, { status: 400 });
  }
}
