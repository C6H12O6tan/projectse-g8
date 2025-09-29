import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const payload = await req.json();
  const { data, error } = await client
    .from("projects")
    .update(payload)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { error } = await client.from("projects").delete().eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
