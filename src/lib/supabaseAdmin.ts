// src/lib/supabaseAdmin.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

export function supabaseAdmin(): SupabaseClient {
  // กันไม่ให้ถูกใช้ฝั่ง client หรือใน pages/ ที่เป็น Client Component
  if (typeof window !== 'undefined') {
    throw new Error('supabaseAdmin() must be used on the server side only');
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY; // service role (server only)

  if (!url) throw new Error('Missing env: NEXT_PUBLIC_SUPABASE_URL');
  if (!key) throw new Error('Missing env: SUPABASE_SERVICE_ROLE_KEY');

  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

export default supabaseAdmin;
