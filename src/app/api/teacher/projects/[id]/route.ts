import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabaseServer';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;            // ✅ Next 15 ต้อง await params
  const sb = await supabaseServer();      // ✅ ในโปรเจกต์ของนีม supabaseServer() เป็น async

  const { data, error } = await sb
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  if (!data) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  return NextResponse.json({ item: data });
}
