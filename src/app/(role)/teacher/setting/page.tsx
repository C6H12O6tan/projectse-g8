"use client";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import TopBarTeacher from "@/components/TopBarTeacher";

export default function TeacherSetting() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>ข้อมูลส่วนบุคคล</Typography>

        <Paper elevation={0} sx={{ p: 2, border: "1px solid #E5E7EB", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 3 }} sx={{ display:"grid", placeItems:"center" }}>
              <Avatar sx={{ width: 120, height: 120 }}>T</Avatar>
              <Button sx={{ mt: 1 }} variant="outlined">Change Profile</Button>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="ชื่อ-นามสกุล" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="อีเมล" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="ตำแหน่ง" defaultValue="Teacher" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="สังกัด" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="ORCID" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="Google Scholar" /></Grid>
                <Grid size={{ xs:12 }}>
                  <Button variant="contained">Update</Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </main>
  );
}
