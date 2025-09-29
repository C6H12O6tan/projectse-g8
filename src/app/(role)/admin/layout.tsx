// src/app/(role)/admin/layout.tsx
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseRSC } from "@/lib/supabase/rsc";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const sb = await supabaseRSC();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: isAdmin } = await sb
    .from("admin_whitelist")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!isAdmin) redirect("/login");
  return <>{children}</>;
}
