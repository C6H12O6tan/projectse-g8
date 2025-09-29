import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: NextRequest) {
  const { client } = supabaseFromRequest(req);
  const url = new URL(req.url);
  const q = (url.searchParams.get("q") || "").trim();
  const field = url.searchParams.get("field") || "";
  const type = url.searchParams.get("type") || "";
  const year = url.searchParams.get("year") || "";

  let query = client.from("publications").select("*").eq("status", "approved");
  if (q) query = query.ilike("title", `%${q}%`);
  if (field) query = query.eq("field", field);
  if (type) query = query.eq("type", type);
  if (year) query = query.eq("year", year);

  const { data, error } = await query.order("year", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data);
}
