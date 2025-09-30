import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TopBarOfficer from "@/components/TopBarOfficer";
import { PSU } from "@/theme/brand";

export default function OfficerProjectDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = {
    title: "Digital Learning in Higher Education",
    author: "Jane Cooper",
    year: 2558,
    dept: "คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์",
    file: "paper.pdf",
  };

  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} align="center" sx={{ mb: 2 }}>
          {data.title}
        </Typography>

        <Paper elevation={0} sx={{ p: 2, border:`1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
          <Stack spacing={1.2} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>ผู้เขียน</Typography>
              <Typography variant="body2">{data.author}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>ปีที่ตีพิมพ์</Typography>
              <Typography variant="body2">{data.year}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>สถานที่จัดเก็บ</Typography>
              <Typography variant="body2">{data.dept}</Typography>
            </Stack>
            <Stack direction="row" spacing={2}>
              <Typography variant="body2" sx={{ minWidth: 120 }}>ไฟล์</Typography>
              <Button size="small" variant="outlined">ดาวน์โหลดผลงานตีพิมพ์</Button>
            </Stack>
          </Stack>

          <Typography variant="subtitle2" fontWeight={800} sx={{ mb: .5 }}>ชื่อผลงาน</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>{data.title}</Typography>
          <Typography variant="subtitle2" fontWeight={800}>บทคัดย่อ</Typography>
          <Typography variant="body2" sx={{ mt: .5, whiteSpace: "pre-line" }}>
            (พื้นที่บทคัดย่อ — ใส่ข้อมูลจริงภายหลัง)
          </Typography>

          <Stack direction="row" spacing={1.5} sx={{ mt: 2 }} justifyContent="flex-end">
            <Button variant="contained" color="success">ยืนยันการอนุมัติ</Button>
            <Button variant="outlined" color="error">ปฏิเสธ</Button>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}
