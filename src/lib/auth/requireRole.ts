// src/lib/auth/requireRole.ts
import type { NextRequest } from "next/server";
import { supabaseFromRequest } from "@/lib/supabase/route";
import { supabaseRSC } from "@/lib/supabase/rsc";

/** ผลลัพธ์มาตรฐานของการเช็คสิทธิ์แอดมิน */
type Fail = { ok: false; status: 401 | 403 };
type Success = {
  ok: true;
  user: { id: string } & Record<string, any>;
  supabase: any; 
  response?: Response;
};
export type RequireAdminResult = Fail | Success;

export async function requireAdmin(req?: NextRequest): Promise<RequireAdminResult> {
  let supabase: any;
  let response: Response | undefined;

  if (req) {
    const r = supabaseFromRequest(req);
    supabase = r.client;
    response = r.response as unknown as Response;
  } else {
    supabase = await supabaseRSC();
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, status: 401 };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile || profile.role !== "admin") {
    return { ok: false, status: 403 };
  }

  return { ok: true, supabase, user, ...(response ? { response } : {}) };
}
