import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TopBarTeacher from "@/components/TopBarTeacher";
import Footer from "@/components/Footer";

export default function TeacherProjectDetail({ params }: { params: { id: string } }) {
  const { id } = params;

  // mock รายละเอียด
  const data = {
    title: `Digital Learning in Higher Education (ID: ${id})`,
    type: "วิจัย",
    year: 2025,
    status: "เผยแพร่แล้ว",
    authors: ["อ. นีม", "ทีมงาน"],
    department: "เทคโนโลยีการศึกษา",
    abstract: "บทคัดย่อสั้น ๆ (ตัวอย่าง)…",
  };

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800}>{data.title}</Typography>
        <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 2 }}>
          <Chip label={data.type} color="primary" variant="outlined" />
          <Chip label={`YEAR ${data.year}`} variant="outlined" />
          <Chip label={data.status} color="success" variant="outlined" />
        </Stack>

        <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
          <Typography variant="subtitle1" fontWeight={700}>ข้อมูลโดยสรุป</Typography>
          <Typography sx={{ mt: 1 }}>ผู้จัดทำ: {data.authors.join(", ")}</Typography>
          <Typography>หน่วยงาน/ภาควิชา: {data.department}</Typography>

          <Typography variant="subtitle1" fontWeight={700} sx={{ mt: 2 }}>บทคัดย่อ</Typography>
          <Typography sx={{ mt: 1 }}>{data.abstract}</Typography>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained" href={`/teacher/project/${id}/edit`}>แก้ไข</Button>
            <Button variant="outlined">ดาวน์โหลดไฟล์</Button>
          </Stack>
        </Paper>

        <Footer />
      </Container>
    </main>
  );
}
