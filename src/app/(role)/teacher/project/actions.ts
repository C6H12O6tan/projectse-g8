import { supabaseRSC } from "@/lib/supabase/rsc";

export async function listMyProjects() {
  const sb = await supabaseRSC();                     // ✅
  const { data: { user } } = await sb.auth.getUser();
  return await sb.from("projects").select("*").eq("owner", user?.id);
}

export async function createProject(payload: any) {
  const sb = await supabaseRSC();                     // ✅
  const { data: { user } } = await sb.auth.getUser();
  return await sb.from("projects").insert({ ...payload, owner: user?.id });
}
