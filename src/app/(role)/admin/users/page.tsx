// src/app/(role)/admin/users/page.tsx
import { Box, Paper, Typography } from "@mui/material";
import { absFetch } from "@/lib/absfetch";
import UsersTable from "@/components/admin/UsersTable";

export const dynamic = "force-dynamic";

export default async function AdminUsersPage() {
  const res = await absFetch("/api/admin/users", { cache: "no-store" });
  const data = (await res.json()) ?? [];
  const rows = Array.isArray(data) ? data : [];

  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        บัญชีผู้ใช้งาน
      </Typography>
      <Paper sx={{ p: 2 }}>
        <UsersTable rows={rows} />
      </Paper>
    </Box>
  );
}
