// src/app/(role)/teacher/project/page.tsx
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Image from "next/image";
import { supabaseRSC } from "@/lib/supabase/rsc";
import TopBarTeacher from "@/components/TopBarTeacher";
import { PSU } from "@/theme/brand";

type ProjectRow = {
  id: string;
  title: string;
  author?: string | null;
  thumb?: string | null;       // URL รูปปก (bucket: thumbnails)
  update_year?: number | null; // ปี update บน ribbon
};

export default async function TeacherProjectsPage() {
  const sb = await supabaseRSC();
  const { data: projects, error } = await sb
    .from("projects")
    .select("id,title,author,thumb,update_year")
    .order("updated_at", { ascending: false });

  // กันเคส error
  const rows: ProjectRow[] = error ? [] : (projects as ProjectRow[]);

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 4 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
          My Projects
        </Typography>

        <Grid container spacing={2}>
          {rows.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <Card sx={{ bgcolor: PSU.navy, color: "#fff", borderRadius: 3, overflow: "hidden" }}>
                <Box sx={{ position: "relative", height: 140 }}>
                  <Image
                    src={p.thumb || "/pro1.jpg"} // รูปปก default ที่นีมส่งมา
                    alt={p.title}
                    fill
                    sizes="400px"
                    style={{ objectFit: "cover" }}
                  />
                  {!!p.update_year && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        left: 8,
                        px: 1.2,
                        py: 0.4,
                        bgcolor: PSU.navy,
                        borderRadius: 999,
                        fontSize: 12,
                        boxShadow: PSU.cardShadow,
                      }}
                    >
                      UPDATE: {p.update_year}
                    </Box>
                  )}
                </Box>
                <CardContent sx={{ minHeight: 120 }}>
                  <Typography fontWeight={800} sx={{ mb: 0.5 }}>
                    {p.title}
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.85 }}>
                    {p.author || "—"}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
