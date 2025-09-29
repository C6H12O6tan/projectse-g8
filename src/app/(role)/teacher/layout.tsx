// src/app/(role)/teacher/layout.tsx
import { supabaseRSC } from "@/lib/supabase/rsc";
import TopBarTeacher from "@/components/TopBarTeacher";

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const sb = await supabaseRSC();
  const { data: { user } } = await sb.auth.getUser();

  let profile:
    | { fullname?: string | null; role?: string | null; email?: string | null }
    | undefined;

  if (user) {
    const { data } = await sb
      .from("profiles")
      .select("fullname, role, email")
      .eq("id", user.id)
      .single();
    profile = data ?? undefined;
  }

  return (
    <>
      <TopBarTeacher profile={profile} />
      {children}
    </>
  );
}
