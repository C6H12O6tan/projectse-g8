// src/app/(role)/admin/layout.tsx
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseRSC } from "@/lib/supabase/rsc";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseRSC();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/login");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user!.id)
      .single();

    if (!profile || profile.role !== "admin") {
      redirect("/login");
    }
  } catch {
    // ถ้าเกิด error ระหว่างตรวจสิทธิ์ ป้องกันด้วยการพาไปล็อกอินใหม่
    redirect("/login");
  }

  return <>{children}</>;
}
