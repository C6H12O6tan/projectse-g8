"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchJSON } from "@/lib/http";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";

type Pub = { id: string; title: string; field?: string; type?: string; year?: number };

// debounce แบบเบา ๆ ไม่ต้องใช้ไลบรารี
function useDebounced<T>(value: T, delay = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function SearchPage() {
  const [q, setQ] = useState("");
  const debouncedQ = useDebounced(q, 350);
  const [rows, setRows] = useState<Pub[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        const url = `/api/publications?q=${encodeURIComponent(debouncedQ)}`;
        const data = await fetchJSON<Pub[]>(url);
        if (!cancelled) {
          setRows(data);
          setErr(null);
        }
      } catch (e: any) {
        if (!cancelled) setErr(e.message || "ค้นหาไม่สำเร็จ");
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQ]);

  const empty = useMemo(() => rows.length === 0 && !err, [rows, err]);

  return (
    <Box sx={{ p: 3, maxWidth: 900 }}>
      <TextField
        fullWidth
        placeholder="ค้นหาผลงาน..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <Stack spacing={1.5} mt={2}>
        {err && <Typography color="error">{err}</Typography>}
        {rows.map((r) => (
          <Paper key={r.id} sx={{ p: 2 }}>
            <Typography fontWeight={700}>{r.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {r.field || "-"} • {r.type || "-"} • {r.year ?? "-"}
            </Typography>
          </Paper>
        ))}
        {empty && <Typography color="text.secondary">ไม่มีผลลัพธ์</Typography>}
      </Stack>
    </Box>
  );
}
