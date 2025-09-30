import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { supabaseServer } from '@/lib/supabaseServer';
import { getUserRole } from '@/lib/auth';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization') || '';

  // มี Bearer token → ใช้เพื่ออ่าน user ทันที (ตอนเพิ่งล็อกอิน)
  if (auth.toLowerCase().startsWith('bearer ')) {
    const url  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const sb = createClient(url, anon, {
      global: { headers: { Authorization: auth } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data } = await sb.auth.getUser();
    if (data?.user) {
      const role = await getUserRole(data.user.id);
      return NextResponse.json({ user: { id: data.user.id, email: data.user.email }, role });
    }
  }

  // fallback: ใช้คุกกี้ฝั่งเซิร์ฟเวอร์ (กรณีมีอยู่แล้ว)
  const s = await supabaseServer();
  const { data } = await s.auth.getUser();
  if (!data?.user) return NextResponse.json({ user: null, role: null });
  const role = await getUserRole(data.user.id);
  return NextResponse.json({ user: { id: data.user.id, email: data.user.email }, role });
}
