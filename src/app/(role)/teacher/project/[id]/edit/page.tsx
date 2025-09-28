"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import RoleTopBar from "@/components/RoleTopBar";
import Footer from "@/components/Footer";
import { ROLE_COLORS } from "@/theme/brand";
import ProjectForm, { ProjectPayload } from "@/components/teacher/ProjectForm";

export default function TeacherProjectEdit({ params }: { params: { id: string } }) {
  const C = ROLE_COLORS.teacher;

  const initial: Partial<ProjectPayload> = {
    title: `ตัวอย่างแก้ไข #${params.id}`,
    type: "วิจัย",
    authors: "อ. นีม, ทีมงาน",
    year: "2025",
    department: "เทคโนโลยีการศึกษา",
    abstract: "บทคัดย่อ (ตัวอย่าง)",
  };

  const onSubmit = (data: ProjectPayload) => {
    console.log("EDIT submit", { id: params.id, ...data });
    alert("บันทึกการแก้ไข (จำลอง)");
  };

  return (
    <main>
      <RoleTopBar role="teacher" />
      <div style={{ background: C.primary, color: C.onPrimary, borderBottom: `3px solid ${C.accent}` }}>
        <Container className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Typography variant="h6" fontWeight={800}>แก้ไขผลงาน #{params.id}</Typography>
        </Container>
      </div>

      <Container className="container" sx={{ py: 3 }}>
        <ProjectForm mode="edit" initial={initial} onSubmit={onSubmit} />
        <Footer />
      </Container>
    </main>
  );
}
