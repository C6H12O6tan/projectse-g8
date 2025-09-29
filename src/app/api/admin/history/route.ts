// src/app/api/admin/history/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { requireAdminFromRequest } from "@/lib/auth/requireAdminFromReq";

// GET /api/admin/history
export async function GET(req: NextRequest) {
  const gate = await requireAdminFromRequest(req);
  if (!gate.ok) return NextResponse.json({ message: "unauthorized" }, { status: gate.status });

  const { client, response } = gate;

  // ตัวอย่าง: ดึงประวัติจากตาราง publications ร่วมกับเจ้าของงาน
  // ปรับชื่อคอลัมน์ให้ตรง schema จริงของคุณ
  const { data, error } = await client
    .from("publications")
    .select(`
      id,
      title,
      amount,          -- ถ้าไม่มีให้ลบออก
      owner:profiles!publications_owner_fkey(id, fullname, email), -- ชื่อ fkey ปรับตามจริง
      created_at
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500, headers: response.headers });

  return new NextResponse(JSON.stringify({ history: data ?? [] }), {
    status: 200,
    headers: response.headers,
  });
}
