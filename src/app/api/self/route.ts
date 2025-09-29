// src/app/api/self/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function GET(req: NextRequest) {
  const { client, response } = supabaseFromRequest(req);

  const { data: { session } } = await client.auth.getSession();
  const { data: { user } } = await client.auth.getUser();

  // แนบ response.headers เพื่อส่งคุกกี้ที่ supabase setAll กลับไป
  return NextResponse.json(
    { hasSession: !!session, userId: user?.id ?? null },
    { headers: response.headers }
  );
}
