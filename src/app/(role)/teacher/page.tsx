"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Box from "@mui/material/Box";
import TopBarTeacher from "@/components/TopBarTeacher";
import { PSU } from "@/theme/brand";

// การ์ด 6 ใบตามแบบ (ตัวอย่าง)
const ITEMS = [
  { id: "1", title: "PHENOROBOT", img: "/mock/1.jpg", tag: "UPDATE 2025" },
  { id: "2", title: "ACADEMIC WORKS & ACHIEVEMENTS", img: "/mock/2.jpg", tag: "UPDATE 2024" },
  { id: "3", title: "PUBLICATIONS AND RESEARCH CONTRIBUTIONS", img: "/mock/3.jpg", tag: "UPDATE 2025" },
  { id: "4", title: "INNOVATIVE RESEARCH IN PUBLISHED MATERIAL", img: "/mock/4.jpg", tag: "UPDATE 2023" },
  { id: "5", title: "ACADEMIC PROJECTS AND SCHOLAR", img: "/mock/5.jpg", tag: "UPDATE 2025" },
  { id: "6", title: "ACADEMIC RESEARCH & CLINICAL WORK", img: "/mock/6.jpg", tag: "UPDATE 2024" },
];

export default function TeacherHome() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Projects &amp; Work</Typography>

        <Grid container spacing={2}>
          {ITEMS.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card elevation={0} sx={{ border: `1px solid ${PSU.cardBorder}`, borderRadius: 3 }}>
                <CardActionArea>
                  <Box sx={{ position: "relative" }}>
                    <CardMedia component="img" height="140" image={it.img} alt={it.title} />
                    <Chip
                      label={it.tag}
                      size="small"
                      sx={{
                        position: "absolute", left: 12, top: 12,
                        bgcolor: PSU.navy, color: PSU.onNavy, borderRadius: 1
                      }}
                    />
                  </Box>
                  <CardContent sx={{ minHeight: 72 }}>
                    <Typography variant="body2" fontWeight={800}>{it.title}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
