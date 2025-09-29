// src/app/validate/page.tsx
import { redirect } from "next/navigation";
import { supabaseRSC } from "@/lib/supabase/rsc";

export default async function Validate() {
  const supabase = await supabaseRSC();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role ?? "teacher";
  // ปรับ path ให้ตรงโครงของคุณ เช่น /admin, /officer, /teacher
  if (role === "admin") redirect("/admin");
  if (role === "officer") redirect("/officer");
  redirect("/teacher");
}
