// src/app/api/admin/self-test/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: NextRequest) {
  const { client, response } = supabaseFromRequest(req);
  const { data: { user } } = await client.auth.getUser();
  if (!user) return NextResponse.json({ ok: false, reason: "no-session" }, { status: 401, headers: response.headers });

  const { data: profile } = await client.from("profiles").select("role, fullname, email").eq("id", user.id).single();
  return NextResponse.json({ ok: true, user, profile }, { headers: response.headers });
}
