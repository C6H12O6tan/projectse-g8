"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import TopBarTeacher from "@/components/TopBarTeacher";
import ProjectThumb from "@/components/cards/ProjectThumb";

const ITEMS = [
  { id: "1", title: "PHENOROBOT", author: "ดร.ธีระ ภัทรพงษ์นันท์", img: "/mock/1.jpg", tag: "UPDATE: 2025" },
  { id: "2", title: "ACADEMIC WORKS & ACHIEVEMENTS", author: "ดร.สมชาย จินทร์ทอง", img: "/mock/2.jpg", tag: "UPDATE: 2024" },
  { id: "3", title: "PUBLICATIONS AND RESEARCH CONTRIBUTIONS", author: "ดร.สุภาพร ศรีวัฒน์", img: "/mock/3.jpg", tag: "UPDATE: 2025" },
  { id: "4", title: "INNOVATIVE RESEARCH IN PUBLISHED MATERIAL", author: "ดร.กิตติพล วงศ์หิรัญ", img: "/mock/4.jpg", tag: "UPDATE: 2025" },
  { id: "5", title: "ACADEMIC PROJECTS AND JOURNALS", author: "ดร.บุศบุศ กภักดีผล", img: "/mock/5.jpg", tag: "UPDATE: 2025" },
  { id: "6", title: "ACADEMIC RESEARCH & CLINICAL WORK", author: "ดร.ปริณา ตั้งมั่น", img: "/mock/6.jpg", tag: "UPDATE: 2024" },
];

export default function TeacherHome() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>Projects &amp; Work</Typography>
        </Stack>

        <Grid container spacing={2}>
          {ITEMS.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectThumb
                href="/teacher/project"
                image={it.img}
                title={it.title}
                author={it.author}
                tag={it.tag}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
