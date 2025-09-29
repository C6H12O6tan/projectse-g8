// src/app/(role)/admin/history/page.tsx
import { Box, Paper, Typography } from "@mui/material";
import { absFetch } from "@/lib/absfetch";
import HistoryTable from "@/components/admin/HistoryTable";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminHistoryPage() {
  // แนบคุกกี้ (กันเคสบาง runtime ไม่ส่ง cookie อัตโนมัติ)
  const jar = await cookies();
  const cookie = jar.getAll().map(c => `${c.name}=${c.value}`).join("; ");
  const headersInit = cookie ? { cookie } : undefined;

  const res = await absFetch("/api/admin/history", {
    cache: "no-store",
    headers: headersInit,
  });

  if (!res.ok) {
    return (
      <Box>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
          ประวัติการใช้งาน
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Typography color="error">
            โหลดข้อมูลไม่สำเร็จ ({res.status})
          </Typography>
        </Paper>
      </Box>
    );
  }

  const data = await res.json();
  const rows = Array.isArray(data) ? data : [];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        ประวัติการใช้งาน
      </Typography>
      <Paper sx={{ p: 2 }}>
        <HistoryTable rows={rows} />
      </Paper>
    </Box>
  );
}
