import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ExternalGrid from "@/components/ExternalGrid";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function PublicationsList() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={700}>รายการผลงาน</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="text">เรียง: ล่าสุด</Button>
            <Button variant="text">ตัวกรอง</Button>
          </Stack>
        </Stack>
        <ExternalGrid />
        <Footer />
      </Container>
    </main>
  );
}
