"use client";

import { useEffect, useState } from "react";
import { fetchJSON } from "@/lib/http";
import { Box, Button, Paper, Stack, Typography, Chip, CircularProgress } from "@mui/material";

type Pub = {
  id: string;
  title: string;
  field?: string;
  type?: string;
  year?: number;
  status?: "pending"|"approved"|"rejected";
  owner?: string;
};

export default function OfficerReviewPage() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState<Pub[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      const data = await fetchJSON<Pub[]>("/api/officer/publications?status=pending", { cache: "no-store" as any });
      setRows(data);
      setErr(null);
    } catch (e:any) {
      setErr(e.message || "โหลดไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  }

  async function update(id: string, status: "approved"|"rejected") {
    await fetchJSON(`/api/officer/publications/${id}`, { method: "PATCH", json: { status } });
    await load();
  }

  useEffect(() => { load(); }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>รายการรออนุมัติ</Typography>
      {loading ? <CircularProgress/> : err ? <Typography color="error">{err}</Typography> : (
        <Stack spacing={1.5}>
          {rows.map(r => (
            <Paper key={r.id} sx={{ p:2, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <Box>
                <Typography fontWeight={700}>{r.title}</Typography>
                <Stack direction="row" gap={1} mt={0.5}>
                  {r.field && <Chip size="small" label={r.field}/>}
                  {r.type && <Chip size="small" label={r.type}/>}
                  {r.year && <Chip size="small" label={`ปี ${r.year}`}/>}
                </Stack>
              </Box>
              <Stack direction="row" gap={1}>
                <Button size="small" color="success" variant="contained" onClick={() => update(r.id, "approved")}>อนุมัติ</Button>
                <Button size="small" color="error" variant="outlined" onClick={() => update(r.id, "rejected")}>ปัดตก</Button>
              </Stack>
            </Paper>
          ))}
          {rows.length===0 && <Typography color="text.secondary">ไม่มีรายการค้าง</Typography>}
        </Stack>
      )}
    </Box>
  );
}
