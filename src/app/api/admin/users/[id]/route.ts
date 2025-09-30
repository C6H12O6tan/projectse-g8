// src/app/api/admin/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth/requireAdminFromReq";
import { supabaseService } from "@/lib/supabase/service";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdminFromRequest(req);
  if (!check.ok) return NextResponse.json({ error: "forbidden" }, { status: check.status });

  const body = await req.json().catch(() => ({}));
  const { fullname, role, email } = body as Partial<{ fullname: string; role: "admin"|"officer"|"teacher"; email: string }>;

  const { client, response } = check;

  // อัปเดต profiles
  const { data, error } = await client
    .from("profiles")
    .update({ ...(fullname && { fullname }), ...(role && { role }), ...(email && { email }) })
    .eq("id", params.id)
    .select("id, fullname, email, role")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, response);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const check = await requireAdminFromRequest(req);
  if (!check.ok) return NextResponse.json({ error: "forbidden" }, { status: check.status });

  // ลบทั้ง auth user และแถวใน profiles
  const admin = supabaseService();
  const { error: delAuthErr } = await admin.auth.admin.deleteUser(params.id);
  if (delAuthErr) return NextResponse.json({ error: delAuthErr.message }, { status: 500 });

  const { client, response } = check;
  const { error: delProfErr } = await client.from("profiles").delete().eq("id", params.id);
  if (delProfErr) return NextResponse.json({ error: delProfErr.message }, { status: 500 });

  return NextResponse.json({ ok: true }, response);
}
