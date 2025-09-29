"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TopBarPublic from "@/components/TopBarPublic";
import ProjectThumb from "@/components/cards/ProjectThumb";

const ITEMS = [
  { id: "1", title: "PhenoRobot", author: "ดร.ธีระ ภัทรพงษ์นันท์", tag: "UPDATE: 2025" },
  { id: "2", title: "Academic Works & Achievements", author: "ดร.สมชาย อินทร์ทอง", tag: "UPDATE: 2024" },
  { id: "3", title: "Publications and Research Contributions", author: "ดร.สุภาพร ศรีวัฒน์", tag: "UPDATE: 2025" },
  { id: "4", title: "Innovative Research & Published Papers", author: "ดร.กิตติพล วงศ์หิรัญ", tag: "UPDATE: 2025" },
  { id: "5", title: "Academic Projects and Journals", author: "ดร.บุศบุศ กภักดีผล", tag: "UPDATE: 2025" },
  { id: "6", title: "Academic Research & Creative Works", author: "ดร.ปริณา ตั้งมั่น", tag: "UPDATE: 2024" },
];

export default function PublicHome() {
  return (
    <main>
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>Projects &amp; Work</Typography>
          <Button variant="outlined" href="/public/search">ค้นหาขั้นสูง</Button>
        </Stack>
        <Grid container spacing={2}>
          {ITEMS.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectThumb href={`/publications/${it.id}`} title={it.title} author={it.author} tag={it.tag} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
