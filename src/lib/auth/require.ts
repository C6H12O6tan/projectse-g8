// src/lib/auth/require.ts
import { redirect } from "next/navigation";
import { supabaseRSC } from "@/lib/supabase/rsc";

export async function requireAuth() {
  const sb = await supabaseRSC();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");
  return user;
}

export async function requireRole(...roles: Array<"admin" | "officer" | "teacher">) {
  const user = await requireAuth();
  const sb = await supabaseRSC();
  const { data: profile } = await sb
    .from("profiles")
    .select("id, role, email, fullname")
    .eq("id", user.id)
    .single();

  if (!profile || !roles.includes(profile.role as any)) redirect("/");

  return { user, role: profile.role as "admin" | "officer" | "teacher", profile };
}
