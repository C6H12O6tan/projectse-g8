// src/lib/auth/require.ts
import { redirect } from 'next/navigation';
import { supabaseServer } from '@/lib/supabaseServer';
import { getUserRole } from '@/lib/auth';

export type Role = 'admin' | 'officer' | 'teacher' | 'external';

/**
 * ใช้ใน Server Component / Route Handler (ฝั่งเซิร์ฟเวอร์) เท่านั้น
 * ห้ามเรียกจาก client – มี runtime guard ป้องกันไว้แล้ว
 */
export async function requireAuth(
  allowed: Role[] = ['admin', 'officer', 'teacher']
) {
  // ✅ กันการถูกเรียกจาก client
  if (typeof window !== 'undefined') {
    throw new Error('requireAuth() must be called on the server side only');
  }

  const sb = await supabaseServer();
  const { data } = await sb.auth.getUser();
  const user = data?.user;

  if (!user) redirect('/login');

  const role = await getUserRole(user.id);
  if (!allowed.includes(role)) redirect('/login');

  return { user, role };
}
