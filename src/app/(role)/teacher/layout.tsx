// src/app/(role)/teacher/layout.tsx
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseRSCClient } from "@/lib/supabase/app-rsc";

export default async function TeacherLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseRSCClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,fullname,email")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "teacher") redirect("/");

  return <>{children}</>;
}
