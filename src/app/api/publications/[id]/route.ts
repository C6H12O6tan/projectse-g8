import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";
import { serializePublication } from "@/lib/serialize";
import { requireRole } from "@/lib/auth";

const Param = z.object({ id: z.string().uuid() });

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  const { id } = Param.parse(params);
  const sb = await supabaseServer();
  const { data, error } = await sb.from("publications").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(serializePublication(data));
}

const BodyPatch = z.object({
  title: z.string().optional(),
  abstract: z.string().nullable().optional(),
  type: z.string().nullable().optional(),
  authors: z.union([z.array(z.string()), z.string(), z.null()]).optional(),
  year: z.number().int().nullable().optional(),
  dept: z.string().nullable().optional(),
  status: z.string().nullable().optional(),
  thumbUrl: z.string().nullable().optional(),
  filePath: z.string().nullable().optional(),
  project_id: z.string().uuid().nullable().optional(),
});

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  await requireRole(["admin", "officer", "teacher"]);
  const { id } = Param.parse(params);
  const body = BodyPatch.parse(await req.json());
  const sb = await supabaseServer();

  const authorsText =
    body.authors === null ? null :
    Array.isArray(body.authors) ? body.authors.join(", ") :
    typeof body.authors === "string" ? body.authors : undefined;

  const { error } = await sb
    .from("publications")
    .update({
      title: body.title ?? undefined,
      abstract: body.abstract ?? undefined,
      type: body.type ?? undefined,
      authors: authorsText,
      year: body.year ?? undefined,
      dept: body.dept ?? undefined,
      status: body.status ?? undefined,
      thumb_url: body.thumbUrl ?? undefined,
      file_path: body.filePath ?? undefined,
      project_id: body.project_id ?? undefined,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await requireRole(["admin"]);
  const { id } = Param.parse(params);
  const sb = await supabaseServer();
  const { error } = await sb.from("publications").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
