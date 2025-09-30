import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// เก็บ client ไว้บน globalThis เพื่อรอด Hot Reload/HMR (ไม่สร้างใหม่ซ้ำ)
const globalForSb = globalThis as unknown as {
  __sbClient?: SupabaseClient;
};

function makeClient() {
  if (typeof window === 'undefined') {
    throw new Error('supabaseBrowser() must be used on the client');
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, anon, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      // ตั้ง storageKey ให้ยูนีคสำหรับโปรเจ็กต์นี้ กันชนกับ client อื่น
      storageKey: 'sb-projectse-g8-auth',
    },
  });
}

export function supabaseBrowser(): SupabaseClient {
  if (!globalForSb.__sbClient) {
    globalForSb.__sbClient = makeClient();
  }
  return globalForSb.__sbClient;
}

export default supabaseBrowser;
