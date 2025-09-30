// src/app/(role)/admin/users/page.tsx
import type { Metadata } from "next";
import { Box, Container, Stack, Typography } from "@mui/material";
import AdminUsersTable from "./AdminUsersTable";



export const metadata: Metadata = {
  title: "บัญชีผู้ใช้งาน | Admin",
};

export default function AdminUsersPage() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
        <Typography variant="h6" fontWeight={800} sx={{ flex: 1 }}>
            บัญชีผู้ใช้งาน
          </Typography>
      </Stack>
      <Box>
        <AdminUsersTable />
      </Box>
    </Container>
  );
}
