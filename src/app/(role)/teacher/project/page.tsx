"use client";

import { useEffect, useState } from "react";
import { fetchJSON } from "@/lib/http";
import {
  Box, Button, Chip, CircularProgress, Stack, Typography, Paper
} from "@mui/material";
import Link from "next/link";

type Project = {
  id: string;
  title: string;
  abstract?: string;
  year?: number | string;
  created_at?: string;
};

export default function TeacherProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Project[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchJSON<Project[]>("/api/teacher/projects", { cache: "no-store" as any });
      setRows(data);
      setErr(null);
    } catch (e: any) {
      setErr(e.message || "Load failed");
    } finally {
      setLoading(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("ลบโปรเจกต์นี้?")) return;
    await fetchJSON(`/api/teacher/projects/${id}`, { method: "DELETE" });
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" fontWeight={800}>โปรเจกต์ของฉัน</Typography>
        <Button component={Link} href="/teacher/project/new" variant="contained">+ สร้างโปรเจกต์</Button>
      </Stack>

      {loading ? <CircularProgress /> : err ? <Typography color="error">{err}</Typography> : (
        <Stack spacing={1.5}>
          {rows.map(p => (
            <Paper key={p.id} sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Box>
                <Typography fontWeight={700}>{p.title}</Typography>
                <Typography variant="body2" color="text.secondary" noWrap>{p.abstract}</Typography>
                <Stack direction="row" gap={1} mt={0.5}>
                  {p.year ? <Chip size="small" label={`ปี: ${p.year}`} /> : null}
                </Stack>
              </Box>
              <Stack direction="row" gap={1}>
                <Button size="small" component={Link} href={`/teacher/project/${p.id}/edit`}>แก้ไข</Button>
                <Button size="small" color="error" onClick={() => remove(p.id)}>ลบ</Button>
              </Stack>
            </Paper>
          ))}
          {rows.length === 0 && <Typography color="text.secondary">ยังไม่มีโปรเจกต์</Typography>}
        </Stack>
      )}
    </Box>
  );
}
