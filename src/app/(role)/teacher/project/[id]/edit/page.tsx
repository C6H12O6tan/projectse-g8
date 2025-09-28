import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopBarTeacher from "@/components/TopBarTeacher";
import Footer from "@/components/Footer";
import { ProjectPayload } from "@/components/teacher/ProjectForm";
import EditPageClient from "./EditPageClient";

export default function TeacherProjectEdit({ params }: { params: { id: string } }) {
  const { id } = params;

  const initial: Partial<ProjectPayload> = {
    title: `ตัวอย่างแก้ไข #${id}`,
    type: "วิจัย",
    authors: "อ. นีม, ทีมงาน",
    year: "2025",
    department: "เทคโนโลยีการศึกษา",
    abstract: "บทคัดย่อ (ตัวอย่าง)",
  };

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          Edit my projects #{id}
        </Typography>

        {/* ✅ ฟังก์ชัน onSubmit จะถูกประกาศใน Client wrapper */}
        <EditPageClient id={id} initial={initial} />

        <Footer />
      </Container>
    </main>
  );
}
