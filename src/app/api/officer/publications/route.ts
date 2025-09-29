import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: NextRequest) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  // อาศัย RLS ที่ให้ officer เห็นได้ทั้งหมด
  const status = new URL(req.url).searchParams.get("status") ?? "pending";
  const q = client.from("publications").select("*").order("created_at", { ascending: false });
  const { data, error } = await q.eq("status", status);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
