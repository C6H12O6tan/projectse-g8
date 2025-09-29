import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function POST(req: NextRequest) {
  const { client } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  const bucket = (form.get("bucket") as string) || "papers";
  if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 });

  const filename = `${user.id}/${Date.now()}_${file.name}`;
  const { data, error } = await client.storage.from(bucket).upload(filename, file, { upsert: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data: pub } = client.storage.from(bucket).getPublicUrl(data.path); // thumbnails เป็น public
  return NextResponse.json({ path: data.path, publicUrl: pub?.publicUrl ?? null });
}
