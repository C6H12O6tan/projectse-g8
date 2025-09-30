// src/lib/auth.ts
import { NextRequest } from "next/server";
import { supabaseServer } from "./supabaseServer";
import { supabaseAdmin } from "./supabaseAdmin";

export type Role = "admin" | "officer" | "teacher" | "external";

/** อ่านผู้ใช้ปัจจุบันจาก Supabase (SSR) */
export async function getSessionUser(_req?: NextRequest) {
  const sb = await supabaseServer();
  const { data, error } = await sb.auth.getUser();
  return error ? null : data.user ?? null;
}

/** คืนบทบาทของผู้ใช้ตามสคีมาปัจจุบัน: profiles.id + admin_whitelist (user_id/email) */
export async function getUserRole(userId: string): Promise<Role> {
  // ใช้ service role เพื่อไม่ติด RLS
  const admin = supabaseAdmin();

  // 1) โปรไฟล์: ใช้ id เป็นหลัก
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  const profRole = (profile?.role ?? null) as Role | null;
  if (profRole === "admin")   return "admin";
  if (profRole === "officer") return "officer";
  if (profRole === "teacher") return "teacher";

  // 2) whitelist: user_id ก่อน
  const { count: byIdCount } = await admin
    .from("admin_whitelist")
    .select("user_id", { count: "exact", head: true })
    .eq("user_id", userId);
  if ((byIdCount ?? 0) > 0) return "admin";

  // 3) whitelist: email (case-insensitive)
  const { data: me } = await admin.auth.admin.getUserById(userId);
  const email = me?.user?.email?.toLowerCase() || null;
  if (email) {
    const { count: byEmailCount } = await admin
      .from("admin_whitelist")
      .select("email", { count: "exact", head: true })
      .eq("email", email);
    if ((byEmailCount ?? 0) > 0) return "admin";
  }

  return "external";
}

/** ต้องล็อกอิน */
export async function requireUser() {
  const user = await getSessionUser();
  if (!user) {
    const err: any = new Error("unauthorized");
    err.status = 401;
    throw err;
  }
  return user;
}

/** ต้องมีบทบาทตามที่กำหนด (มี dev bypass ด้วย ADMIN_EMAIL ถ้าตั้งไว้) */
export async function requireRole(roles: Role[]) {
  const user = await requireUser();
  const role = await getUserRole(user.id);

  const adminEmail = process.env.ADMIN_EMAIL?.toLowerCase();
  const userEmail  = user.email?.toLowerCase();
  const devBypass  = adminEmail && userEmail && adminEmail === userEmail;

  if (!roles.includes(role) && !devBypass) {
    const err: any = new Error("forbidden");
    err.status = 403;
    throw err;
  }
  return { user, role: devBypass ? ("admin" as Role) : role };
}
