// src/app/(role)/admin/page.tsx
import { Typography, Paper, Box } from "@mui/material";
import { absFetch } from "@/lib/absfetch";

export default async function AdminHome() {
  const res = await absFetch("/api/admin/users", { cache: "no-store" });
  const rows = (await res.json()) ?? [];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        ระบบบริหารจัดการผลงานตีพิมพ์ — แผงควบคุม
      </Typography>
      <Paper sx={{ p: 3 }}>
        ผู้ใช้ทั้งหมด: {Array.isArray(rows) ? rows.length : 0}
      </Paper>
    </Box>
  );
}
