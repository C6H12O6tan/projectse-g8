export const toStrArray = (v: any): string[] => {
  if (!v) return [];
  if (Array.isArray(v)) return v.map(String).map(s => s.trim()).filter(Boolean);
  if (typeof v === "string") return v.split(",").map(s => s.trim()).filter(Boolean);
  return [];
};

export const serializePublication = (row: any) => ({
  id: row.id,
  owner: row.owner ?? null,
  project_id: row.project_id ?? null,
  title: row.title ?? "",
  abstract: row.abstract ?? "",
  type: row.type ?? null,
  authors: toStrArray(row.authors),   // <- แปลงให้เป็น string[]
  year: row.year ?? null,
  dept: row.dept ?? null,
  status: row.status ?? null,
  thumbUrl: row.thumb_url ?? null,
  filePath: row.file_path ?? null,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});
