"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import ProjectThumb from "@/components/cards/ProjectThumb";
import { PSU } from "@/theme/brand";
import TopBarTeacher from "@/components/TopBarTeacher";
import SearchBarRow from "@/components/teacher/SearchBarRow";

type MyCard = { id: string; title: string; img?: string; tag?: string; author?: string };
const MY: MyCard[] = [
  { id: "p1", title: "PHENOROBOT", img: "/mock/1.jpg", tag: "UPDATE: 2025", author: "ดร.ธีระ ภัทรพงษ์นันท์" },
  { id: "p2", title: "AR for Classroom", img: "/mock/2.jpg", tag: "UPDATE: 2024", author: "ดร.สมชาย จินทร์ทอง" },
  { id: "p3", title: "Learning Analytics", img: "/mock/3.jpg", tag: "UPDATE: 2023", author: "ดร.ปริณา ตั้งมั่น" },
  { id: "p4", title: "Digital Learning in HE", img: "/mock/4.jpg", tag: "UPDATE: 2025", author: "ดร.บุศบุศ กภักดีผล" },
  { id: "p5", title: "Academic Research", img: "/mock/5.jpg", tag: "UPDATE: 2024", author: "ดร.กิตติพล วงศ์หิรัญ" },
];

export default function TeacherProjectList() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
          My Projects
        </Typography>

        {/* ปุ่ม NEW PROJECT อยู่ชิดขวาตามแบบ */}
        <SearchBarRow
          rightLabel="NEW PROJECT"
          rightVariant="contained"
          rightHref="/teacher/project/new"
        />

        <Grid container spacing={2}>
          {/* การ์ดสร้างโปรเจกต์ใหม่แบบ dashed (ซ้ายบน) */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 2,
                border: `2px dashed ${PSU.cardBorder}`,
                height: 212,
                display: "grid",
                placeItems: "center",
              }}
            >
              <CardActionArea
                href="/teacher/project/new"
                sx={{ height: "100%", width: "100%", display: "grid", placeItems: "center" }}
              >
                <Typography fontWeight={800} color={PSU.subtext}>+ NEW PROJECT…</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {/* รายการโปรเจกต์ */}
          {MY.map(it => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectThumb href={`/teacher/project/${it.id}`} image={it.img} title={it.title} author={it.author} tag={it.tag} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
