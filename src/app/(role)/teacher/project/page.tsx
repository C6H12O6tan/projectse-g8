"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TopBarTeacher from "@/components/TopBarTeacher";
import { PSU } from "@/theme/brand";
import Link from "next/link";

const MY = [
  { id: "p1", title: "PHENOROBOT", img: "/mock/1.jpg", tag: "UPDATE 2025" },
  { id: "p2", title: "AR for Classroom", img: "/mock/2.jpg", tag: "UPDATE 2024" },
  { id: "p3", title: "Learning Analytics", img: "/mock/3.jpg", tag: "UPDATE 2023" },
  { id: "p4", title: "Digital Learning in HE", img: "/mock/4.jpg", tag: "UPDATE 2025" },
  { id: "p5", title: "Academic Research", img: "/mock/5.jpg", tag: "UPDATE 2024" },
];

export default function TeacherProjectList() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>My Projects</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="outlined">ค้นหา</Button>
            <Button variant="contained" href="/teacher/project/new">New Project</Button>
          </Stack>
        </Stack>

        <Grid container spacing={2}>
          {/* การ์ด New Project */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card elevation={0} sx={{ border: `2px dashed ${PSU.cardBorder}`, borderRadius: 3 }}>
              <CardActionArea href="/teacher/project/new" sx={{ height: 212, display: "grid", placeItems: "center" }}>
                <Typography fontWeight={800} color={PSU.subtext}>+ NEW PROJECT…</Typography>
              </CardActionArea>
            </Card>
          </Grid>

          {MY.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card elevation={0} sx={{ border: `1px solid ${PSU.cardBorder}`, borderRadius: 3 }}>
                <CardActionArea href={`/teacher/project/${it.id}`}>
                  <div style={{ position: "relative" }}>
                    <CardMedia component="img" height="140" image={it.img} alt={it.title} />
                    <Chip
                      label={it.tag}
                      size="small"
                      sx={{ position: "absolute", left: 12, top: 12, bgcolor: PSU.navy, color: PSU.onNavy }}
                    />
                  </div>
                  <CardContent sx={{ minHeight: 72 }}>
                    <Typography variant="body2" fontWeight={800}>{it.title}</Typography>
                  </CardContent>
                </CardActionArea>
                <Stack direction="row" spacing={1} sx={{ px: 2, pb: 2 }}>
                  <Button size="small" component={Link as any} href={`/teacher/project/${it.id}`}>View</Button>
                  <Button size="small" component={Link as any} href={`/teacher/project/${it.id}/edit`}>Edit</Button>
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
