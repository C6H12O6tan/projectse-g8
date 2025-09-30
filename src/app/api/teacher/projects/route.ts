// src/app/api/teacher/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, supabaseService } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  const sb = await supabaseServer();
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get('owner');

  // ถ้ามีคุกกี้ session ก็ใช้ auth.getUser() ได้
  const { data: { user } } = await sb.auth.getUser();

  let q = sb.from('projects').select('*').order('created_at', { ascending: false });
  if (owner === 'me') {
    if (!user) return NextResponse.json({ items: [] }, { status: 200 });
    q = q.eq('owner', user.id);
  }

  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data ?? [] });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const title = String(body.title ?? '').trim();
    if (!title) return NextResponse.json({ error: 'กรุณากรอกชื่อผลงาน' }, { status: 400 });

    // ปี: 0–3000 หรือ null
    let year: number | null = null;
    if (body.year !== '' && body.year != null) {
      const y = Number(body.year);
      if (!Number.isInteger(y) || y < 0 || y > 3000) {
        return NextResponse.json({ error: 'ปีที่ตีพิมพ์ต้องเป็นตัวเลข 0–3000' }, { status: 400 });
      }
      year = y;
    }

    // 1) พยายามอ่าน session จากคุกกี้ก่อน
    const sb = await supabaseServer();
    let { data: { user } } = await sb.auth.getUser();

    // 2) ถ้าไม่มีคุกกี้ → ใช้ Authorization: Bearer <token> ตรวจด้วย service
    if (!user) {
      const auth = req.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
      if (token) {
        const svc = supabaseService();
        const { data, error } = await svc.auth.getUser(token);
        if (!error) user = data.user ?? null;
      }
    }
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    // ✅ ใช้ service client insert (ข้าม RLS) แล้วตั้ง owner เอง
    const svc = supabaseService();
    const insert = {
      owner: user.id, // ชื่อคอลัมน์ตาม schema ที่เราตั้ง
      title,
      abstract: (body.summary ?? body.abstract ?? '').toString().trim() || null,
      authors: (body.authors ?? null) as string | null,
      coauthors: (body.coauthors ?? null) as string | null,
      year,
      location: (body.location ?? null) as string | null,
    };

    const { data, error } = await svc.from('projects').insert(insert).select('id').single();
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({ id: data!.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'server error' }, { status: 500 });
  }
}
