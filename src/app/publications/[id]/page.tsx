import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

export default function PublicationDetail({ params }: { params: { id: string }}) {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={700}>รายละเอียดผลงาน #{params.id}</Typography>
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          <Chip label="หมวดหมู่: วิจัย" size="small" />
          <Chip label="ปี: 2024" size="small" />
        </Stack>

        <Paper elevation={0} sx={{ p: 2, border: '1px solid #eee', borderRadius: 2, mt: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>บทคัดย่อ</Typography>
          <Typography variant="body1" sx={{ mt: 1 }}>
            ข้อมูลตัวอย่าง (จะดึงจริงทีหลัง)
          </Typography>
        </Paper>

        <Stack direction="row" spacing={1} sx={{ mt: 3 }}>
          <Button variant="contained">ดาวน์โหลดไฟล์</Button>
          <Button variant="outlined">เปิดลิงก์</Button>
        </Stack>
        <Footer />
      </Container>
    </main>
  );
}
