import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer, supabaseAdmin } from '@/lib/supabaseServer';

export async function GET(req: NextRequest) {
  const sb = await supabaseServer();
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get('owner'); // "me" หรือ null

  const { data: { user } } = await sb.auth.getUser();

  let q = sb
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

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
    const body = await req.json();
    const sb = await supabaseServer();

    // หา user จาก session ปัจจุบันก่อน
    let { data: { user } } = await sb.auth.getUser();

    // ถ้าไม่มี session ให้ลองเช็คจาก Authorization: Bearer <token>
    if (!user) {
      const auth = req.headers.get('authorization') || '';
      const token = auth.startsWith('Bearer ') ? auth.slice(7) : null;
      if (token) {
        const admin = await supabaseAdmin();
        const { data, error } = await admin.auth.getUser(token);
        if (!error) user = data.user ?? null;
      }
    }
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    const title = String(body.title ?? '').trim();
    if (!title) return NextResponse.json({ error: 'กรุณากรอกชื่อผลงาน' }, { status: 400 });

    const year =
      body.year === '' || body.year == null ? null : Number(body.year);
    if (year !== null && Number.isNaN(year)) {
      return NextResponse.json({ error: 'ปีที่ตีพิมพ์ไม่ถูกต้อง' }, { status: 400 });
    }

    const insert = {
      owner: user.id,
      title,
      abstract: body.abstract ?? null,
      authors: body.authors ?? null,
      coauthors: body.coauthors ?? null,
      year,
      location: body.location ?? null,
    };

    const { data, error } = await sb
      .from('projects')
      .insert(insert)
      .select('id')
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ id: data!.id }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'server error' }, { status: 500 });
  }
}
