import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

const Params = z.object({ id: z.string().uuid() });

export async function GET(_req: NextRequest, ctx: { params: { id: string } }) {
  const parsed = Params.safeParse(ctx.params);
  if (!parsed.success) return NextResponse.json({ error: 'invalid id' }, { status: 400 });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  const sb = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { id } = parsed.data;
  const { data, error } = await sb
    .from('publications')
    .select('id, project_id, title, abstract, type, authors, year, dept, status, thumb_url, file_path, created_at, updated_at')
    .eq('id', id)
    .eq('status', 'published')
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: 'not found' }, { status: 404 });

  return NextResponse.json(data);
}
