import { NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: Request) {
  // แคสต์ชนิดเพื่อใช้ cookies ได้
  const { client, response } = supabaseFromRequest(req as any);
  const { data, error } = await client.from("publications").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return response ?? NextResponse.json(data);
}

export async function POST(req: Request) {
  const { client, response } = supabaseFromRequest(req as any);
  const body = await req.json();
  const { data, error } = await client.from("publications").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return response ?? NextResponse.json(data, { status: 201 });
}
