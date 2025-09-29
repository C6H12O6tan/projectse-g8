import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import TopBarTeacher from "@/components/TopBarTeacher";
import { PSU } from "@/theme/brand";

export default function TeacherProjectDetail({ params }: { params: { id: string } }) {
  const { id } = params;
  const data = { title: "Digital Learning in Higher Education", type:"วิจัย", year:2025, status:"เผยแพร่แล้ว", author:"Jane Cooper" };

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} align="center" sx={{ mb: 2 }}>{data.title}</Typography>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <Chip label={data.type} variant="outlined" />
          <Chip label={`YEAR ${data.year}`} variant="outlined" />
          <Chip label={data.status} color="success" variant="outlined" />
        </Stack>

        <Paper elevation={0} sx={{ p: 2, border:`1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
          <Typography variant="subtitle2" fontWeight={800} sx={{ mb: .5 }}>รายละเอียดผลงาน</Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            ผู้เขียน: {data.author} • สถานที่จัดเก็บ: คณะวิทยาศาสตร์ ม.อ.
          </Typography>
          <Typography variant="subtitle2" fontWeight={800}>บทคัดย่อ</Typography>
          <Typography variant="body2" sx={{ mt: .5, whiteSpace: "pre-line" }}>
            (ใส่บทคัดย่อจริงภายหลัง)
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" href={`/teacher/project/${id}/edit`}>แก้ไขข้อมูล</Button>
            <Button variant="outlined">ดาวน์โหลดไฟล์</Button>
          </Stack>
        </Paper>
      </Container>
    </main>
  );
}
