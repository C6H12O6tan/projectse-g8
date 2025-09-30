import { supabaseRSC } from "@/lib/supabase/rsc";
export async function approve(id: string) {
  const sb = await supabaseRSC();
  const { data: { user } } = await sb.auth.getUser();
  return await sb.from("publications").update({ approved: true }).eq("id", id);
}