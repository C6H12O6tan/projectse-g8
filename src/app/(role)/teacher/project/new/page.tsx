"use client";
import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleTabs from "@/components/RoleTabs";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function TeacherProjectNew() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/teacher" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="อัปโหลดผลงานใหม่" subtitle="กรอกแบบฟอร์มและอัปโหลดไฟล์แนบ" />
        <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:8 }}>
              <TextField fullWidth label="ชื่อผลงาน" />
            </Grid>
            <Grid size={{ xs:12, md:4 }}>
              <TextField select fullWidth label="ประเภท">
                <MenuItem value="วิจัย">วิจัย</MenuItem>
                <MenuItem value="วิชาการ">วิชาการ</MenuItem>
                <MenuItem value="นวัตกรรม">นวัตกรรม</MenuItem>
              </TextField>
            </Grid>
            <Grid size={{ xs:12, md:6 }}>
              <TextField fullWidth label="ผู้จัดทำ (คั่นด้วย ,)" />
            </Grid>
            <Grid size={{ xs:12, md:3 }}>
              <TextField fullWidth type="number" label="ปีที่ตีพิมพ์" />
            </Grid>
            <Grid size={{ xs:12, md:3 }}>
              <TextField fullWidth label="หน่วยงาน/ภาควิชา" />
            </Grid>

            <Grid size={{ xs:12 }}>
              <TextField fullWidth multiline minRows={4} label="บทคัดย่อ" />
            </Grid>

            <Grid size={{ xs:12 }}>
              <Typography variant="body2" color="text.secondary">แนบไฟล์ (จำลอง – ยังไม่เชื่อมหลังบ้าน)</Typography>
              <Button variant="outlined" sx={{ mt: 1 }}>เลือกไฟล์</Button>
            </Grid>
          </Grid>

          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button variant="contained">บันทึกแบบร่าง</Button>
            <Button variant="outlined">ส่งตรวจสอบ</Button>
          </Stack>
        </Paper>
        <Footer />
      </Container>
    </main>
  );
}
