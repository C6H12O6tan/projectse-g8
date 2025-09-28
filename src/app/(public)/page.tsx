"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import ExternalGrid from "@/components/ExternalGrid";
import Footer from "@/components/Footer";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";

export default function PublicHome() {
  return (
    <main>
      <TopBar />

      {/* HERO */}
      <div style={{ background:'#fff', borderBottom:'1px solid #eee' }}>
        <Container className="container" sx={{ py: 4 }}>
          <Typography variant="h3" sx={{ mb: 1 }}>คลังผลงานวิชาการ</Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            ค้นหา/สำรวจผลงานล่าสุดจากคณะ/สาขา ตามหมวดหมู่และปีที่ตีพิมพ์
          </Typography>

          {/* SEARCH STRIP (ตามแบบ) */}
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border:'1px solid #eee' }}>
            <Grid container spacing={2}>
              <Grid size={{ xs:12, md:6 }}>
                <TextField fullWidth label="คำค้น" placeholder="ชื่อผลงาน / ผู้จัดทำ / คำสำคัญ" />
              </Grid>
              <Grid size={{ xs:12, md:3 }}>
                <TextField select fullWidth label="ปี">
                  <MenuItem value="">ทั้งหมด</MenuItem>
                  <MenuItem value="2024">2024</MenuItem>
                  <MenuItem value="2023">2023</MenuItem>
                </TextField>
              </Grid>
              <Grid size={{ xs:12, md:3 }}>
                <TextField select fullWidth label="ประเภท">
                  <MenuItem value="">ทั้งหมด</MenuItem>
                  <MenuItem value="วิจัย">วิจัย</MenuItem>
                  <MenuItem value="วิชาการ">วิชาการ</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <Button variant="contained">ค้นหา</Button>
              <Link href="/search"><Button>ค้นหาขั้นสูง</Button></Link>
            </Stack>
          </Paper>
        </Container>
      </div>

      {/* LIST ล่าสุด */}
      <Container className="container" sx={{ py: 4 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={700}>ล่าสุด</Typography>
          <Link href="/publications"><Button variant="text">ดูทั้งหมด</Button></Link>
        </Stack>
        <ExternalGrid />
      </Container>

      <Footer />
    </main>
  );
}
