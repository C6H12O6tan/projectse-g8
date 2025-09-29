"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { PSU } from "@/theme/brand";
import TopBarOfficer from "@/components/TopBarOfficer";
import ProjectThumb from "@/components/cards/ProjectThumb";
import SearchBarRow from "@/components/teacher/SearchBarRow";

const MY = [
  { id:"p1", title:"PhenoRobot", img:"/mock/1.jpg", tag:"UPDATE: 2025", author:"ดร.ธีระ ภัทรพงษ์นันท์" },
  { id:"p2", title:"AR for Classroom", img:"/mock/2.jpg", tag:"UPDATE: 2024", author:"ดร.สมชาย อินทร์ทอง" },
  { id:"p3", title:"Learning Analytics", img:"/mock/3.jpg", tag:"UPDATE: 2023", author:"ดร.ปริณา ตั้งมั่น" },
  { id:"p4", title:"Digital Learning in HE", img:"/mock/4.jpg", tag:"UPDATE: 2025", author:"ดร.บุศบุศ กภักดีผล" },
];

export default function OfficerProjectList() {
  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Projects</Typography>
        <SearchBarRow rightLabel="ตรวจสอบทั้งหมด" rightVariant="contained" rightHref="/officer/review" />

        <Grid container spacing={2}>
          <Grid size={{ xs:12, sm:6, md:4 }}>
            <Card elevation={0} sx={{ borderRadius: 2, border:`2px dashed ${PSU.cardBorder}`, height: 212, display:"grid", placeItems:"center" }}>
              <CardActionArea href="/officer/review" sx={{ height: "100%", width:"100%", display:"grid", placeItems:"center" }}>
                <Typography fontWeight={800} color={PSU.subtext}>ไปหน้าตรวจสอบ…</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {MY.map(it => (
            <Grid key={it.id} size={{ xs:12, sm:6, md:4 }}>
              <ProjectThumb href={`/officer/project/${it.id}`} image={it.img} title={it.title} author={it.author} tag={it.tag} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
