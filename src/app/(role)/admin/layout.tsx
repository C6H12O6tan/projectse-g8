// src/app/(role)/admin/layout.tsx
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { supabaseRSCClient } from "@/lib/supabase/app-rsc"; // ใช้ตัว RSC ที่เราตั้งไว้
import TopBarAdmin from "@/components/TopBarAdmin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await supabaseRSCClient();

  // ต้องล็อกอินก่อน
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // ตรวจ role ที่ profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || profile.role !== "admin") {
    // ไม่ใช่แอดมินเด้งออก
    redirect("/");
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* ไม่ส่ง prop อะไรให้ TopBarAdmin ตามที่ขอ */}
      <TopBarAdmin />

      <main className="container mx-auto px-4 py-6 w-full">
        {children}
      </main>
    </div>
  );
}
