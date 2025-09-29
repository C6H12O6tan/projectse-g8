import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: NextRequest) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  // RLS บังคับ owner = auth.uid() อยู่แล้ว
  const { data, error } = await client
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const body = await req.json();
  // ตัวอย่างฟิลด์ขั้นต่ำ: title, abstract, year
  const { data, error } = await client
    .from("projects")
    .insert([{ ...body, owner: user.id }])
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
