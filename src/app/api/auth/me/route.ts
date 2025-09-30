// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  const sb = await supabaseServer();
  const { data, error } = await sb.auth.getUser();
  return NextResponse.json({ data, error });
}
