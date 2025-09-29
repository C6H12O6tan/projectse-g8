import { Card, CardContent, CardHeader, Typography, Stack, Divider, Box, Chip, Button } from "@mui/material";
import { supabaseRSC } from "@/lib/supabase/rsc"; // ตัวที่คุณใช้บนฝั่ง Server Component
import Link from "next/link";

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const supabase = await supabaseRSC();

  // โครง: projects + publications ใต้โปรเจค
  const { data: project, error } = await supabase
    .from("projects")
    .select(`
      id, owner, title, summary, updated_at, created_at,
      publications:publications (
        id, title, year, type, status, thumb_url, file_path, updated_at
      )
    `)
    .eq("id", params.id)
    .single();

  if (error || !project) {
    return <Typography color="error">ไม่พบโปรเจค หรือไม่มีสิทธิ์เข้าถึง</Typography>;
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardHeader
          title={<Typography variant="h5" fontWeight={800}>{project.title}</Typography>}
          subheader={
            <Typography color="text.secondary" fontSize={14}>
              อัปเดตล่าสุด: {new Date(project.updated_at ?? project.created_at).toLocaleString()}
            </Typography>
          }
        />
        <CardContent>
          <Typography fontWeight={700} gutterBottom>สรุปโครงการ</Typography>
          <Typography color="text.secondary">{project.summary || "-"}</Typography>
        </CardContent>
      </Card>

      <Card>
        <CardHeader title={<Typography fontWeight={800}>ผลงานตีพิมพ์ในโปรเจคนี้</Typography>} />
        <CardContent>
          <Stack divider={<Divider />} spacing={2}>
            {(project.publications ?? []).map((p: any) => (
              <Box key={p.id} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                <Box sx={{ minWidth: 0 }}>
                  <Typography fontWeight={800} noWrap title={p.title}>{p.title}</Typography>
                  <Typography color="text.secondary" fontSize={14}>
                    ปี {p.year ?? "-"} • ประเภท {p.type ?? "-"}
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip label={p.status ?? "draft"} size="small" />
                  {p.file_path ? (
                    <Button size="small" component="a" href={p.file_path} target="_blank" rel="noreferrer">
                      เปิดไฟล์
                    </Button>
                  ) : null}
                </Stack>
              </Box>
            ))}
            {(!project.publications || project.publications.length === 0) && (
              <Typography color="text.secondary">ยังไม่มีผลงานตีพิมพ์ในโปรเจคนี้</Typography>
            )}
          </Stack>
        </CardContent>
      </Card>

      <Stack direction="row" spacing={1}>
        <Button variant="contained" component={Link} href="/teacher/project">กลับรายการโปรเจค</Button>
      </Stack>
    </Stack>
  );
}
