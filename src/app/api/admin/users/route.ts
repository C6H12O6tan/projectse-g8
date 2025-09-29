// src/app/api/admin/users/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth/requireAdminFromReq";

// GET /api/admin/users
export async function GET(req: NextRequest) {
  const gate = await requireAdminFromRequest(req);
  if (!gate.ok) return NextResponse.json({ error: "forbidden" }, { status: gate.status });

  const { client, response } = gate;

  // ดึงรายการผู้ใช้จาก profiles (ปรับ field ตาม schema ที่มีจริง)
  const { data, error } = await client
    .from("profiles")
    .select("id, fullname, phone, email")
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: response.headers });

  return new NextResponse(JSON.stringify({ users: data ?? [] }), {
    status: 200,
    headers: response.headers, // สำคัญ: ส่ง cookies ที่ setAll กลับไป
  });
}
