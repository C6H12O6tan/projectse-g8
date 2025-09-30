import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { supabaseServer } from "@/lib/supabaseServer";
import { serializePublication } from "@/lib/serialize";
import { requireRole } from "@/lib/auth";

const QuerySchema = z.object({
  q: z.string().trim().optional(),
  dept: z.string().trim().optional(),
  type: z.string().trim().optional(),
  year: z.coerce.number().int().optional(),
  status: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(20),
  cursor: z.string().uuid().optional(),
  sort: z.enum(["newest","oldest"]).default("newest"),
});

export async function GET(req: NextRequest) {
  const qs = QuerySchema.parse(Object.fromEntries(req.nextUrl.searchParams));
  const sb = await supabaseServer();

  let q = sb.from("publications").select("*");

  if (qs.q)      q = q.ilike("title", `%${qs.q}%`);
  if (qs.dept)   q = q.eq("dept", qs.dept);
  if (qs.type)   q = q.eq("type", qs.type);
  if (qs.year)   q = q.eq("year", qs.year);
  if (qs.status) q = q.eq("status", qs.status);

  q = q.order("year", { ascending: qs.sort === "oldest" })
       .order("created_at", { ascending: qs.sort === "oldest" });

  if (qs.cursor) q = q.gt("id", qs.cursor);

  const { data, error } = await q.limit(qs.limit + 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const hasMore = (data?.length || 0) > qs.limit;
  const slice = hasMore ? data!.slice(0, qs.limit) : (data || []);
  const items = slice.map(serializePublication);
  const nextCursor = hasMore ? data![qs.limit].id : null;

  return NextResponse.json({ items, nextCursor });
}

const BodyCreate = z.object({
  title: z.string().min(1),
  abstract: z.string().optional(),
  type: z.string().optional(),
  authors: z.union([z.array(z.string()), z.string()]).optional(),
  year: z.number().int().optional(),
  dept: z.string().optional(),
  status: z.string().optional(),
  thumbUrl: z.string().optional(),
  filePath: z.string().optional(),
  project_id: z.string().uuid().optional(),
});

export async function POST(req: NextRequest) {
  await requireRole(["admin", "officer", "teacher"]);
  const body = BodyCreate.parse(await req.json());

  const sb = await supabaseServer();

  const authorsText =
    Array.isArray(body.authors) ? body.authors.join(", ") :
    typeof body.authors === "string" ? body.authors : "";

  const { data, error } = await sb
    .from("publications")
    .insert({
      title: body.title,
      abstract: body.abstract ?? null,
      type: body.type ?? null,
      authors: authorsText,
      year: body.year ?? null,
      dept: body.dept ?? null,
      status: body.status ?? "pending",
      thumb_url: body.thumbUrl ?? null,
      file_path: body.filePath ?? null,
      project_id: body.project_id ?? null,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ id: data.id });
}
