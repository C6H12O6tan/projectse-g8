// src/app/(role)/admin/layout.tsx
import AppTopNav from "@/components/TopBarAdmin";
import { Container, Box } from "@mui/material";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <AppTopNav />
        <Container maxWidth="lg">
          <Box sx={{ py: 4 }}>{children}</Box>
        </Container>
      </body>
    </html>
  );
}
