import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const body = await req.json(); // { status: 'approved'|'rejected', remark?: string }
  const { data, error } = await client
    .from("publications")
    .update(body)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
