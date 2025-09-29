"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TopBarPublic from "@/components/TopBarPublic";
import ProjectThumb from "@/components/cards/ProjectThumb";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const ITEMS = [
  { id: "1", title: "Digital Learning in Higher Education", author: "Jane Cooper", tag: "UPDATE: 2025" },
  { id: "2", title: "AI in Classroom Settings", author: "Floyd Miles", tag: "UPDATE: 2024" },
  { id: "3", title: "Leadership in University Reform", author: "Ronald Richards", tag: "UPDATE: 2024" },
];

export default function PublicationsList() {
  return (
    <main>
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>Projects</Typography>
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
