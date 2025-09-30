// src/lib/auth/requireAdminFromRequest.ts
import type { NextRequest } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";

export async function requireAdminFromRequest(req: NextRequest) {
  const { client, response } = supabaseFromRequest(req);

  // 1) เอา session/user ปัจจุบัน
  const { data: { user }, error: userErr } = await client.auth.getUser();
  if (userErr || !user) {
    return { ok: false as const, status: 401 as const, response };
  }

  // 2) เช็ค role จาก profiles
  const { data: profile, error: profErr } = await client
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profErr || !profile || profile.role !== "admin") {
    return { ok: false as const, status: 403 as const, response };
  }

  // ผ่าน ✅
  return { ok: true as const, status: 200 as const, client, response, user };
}
