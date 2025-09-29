import { supabaseRSCClient } from "@/lib/supabase/app-rsc";
import SettingsForm, { type Profile } from "./settings-form";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function SettingPage() {
  const sb = await supabaseRSCClient();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await sb
    .from("profiles")
    .select("id, email, display_name, phone, role")
    .eq("id", user.id)
    .single();

  // สร้าง fallback ให้ไม่เป็น null
  const safeProfile: Profile = {
    id: user.id,
    email: (profile?.email ?? user.email) ?? null,
    display_name:
      (profile?.display_name ??
        (user.user_metadata as any)?.display_name) ?? null,
    phone: (profile?.phone ?? (user.user_metadata as any)?.phone) ?? null,
    role:
      (profile?.role ??
        (user.user_metadata as any)?.role ??
        "teacher") as Profile["role"],
  };

  return <SettingsForm profile={safeProfile} />;
}
