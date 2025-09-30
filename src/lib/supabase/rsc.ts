import 'server-only';
import { supabaseServer } from '@/lib/supabaseServer';

// shim ให้ import เดิมใช้งานได้
export async function supabaseRSC() {
  return supabaseServer();
}

export default supabaseRSC;
