import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const Query = z.object({
  q: z.string().optional(),
  dept: z.string().optional(),
  type: z.string().optional(),
  year: z.string().optional(), // รับเป็น string แล้วค่อยแปลงเป็น number
  limit: z.coerce.number().min(1).max(100).default(24),
  offset: z.coerce.number().min(0).default(0),
});

export async function GET(req: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const sp = Object.fromEntries(req.nextUrl.searchParams.entries());
  const parsed = Query.safeParse(sp);
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid query' }, { status: 400 });
  }
  const { q, dept, type, year, limit, offset } = parsed.data;

  let query = sb
    .from('publications')
    .select('id, project_id, title, abstract, type, authors, year, dept, status, thumb_url, created_at, updated_at', { count: 'exact' })
    .eq('status', 'published') // เฉพาะเผยแพร่แล้ว
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);

  if (q && q.trim()) {
    const k = `%${q.trim()}%`;
    // ค้นทั้ง title/abstract/authors
    query = query.or(`title.ilike.${k},abstract.ilike.${k},authors.ilike.${k}`);
  }
  if (dept && dept !== 'ทั้งหมด') query = query.eq('dept', dept);
  if (type && type !== 'ทั้งหมด') query = query.eq('type', type);
  if (year && year !== 'ทั้งหมด') {
    const y = Number(year);
    if (!Number.isNaN(y)) query = query.eq('year', y);
  }

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ items: data ?? [], total: count ?? 0 });
}
