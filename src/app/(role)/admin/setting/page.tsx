"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { PSU } from "@/theme/brand";

export default function AdminSetting() {
  return (
    <main>
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>ข้อมูลส่วนบุคคล</Typography>
        <Paper elevation={0} sx={{ p: 2, border:`1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:3 }} sx={{ display:"grid", placeItems:"center" }}>
              <Avatar sx={{ width: 120, height: 120 }}>A</Avatar>
              <Button variant="outlined" sx={{ mt: 1 }}>Change Profile</Button>
            </Grid>
            <Grid size={{ xs:12, md:9 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="ชื่อ-นามสกุล" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="ตำแหน่งงาน" defaultValue="Admin" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="Email" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="สาขาวิชา/สังกัด" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="เพศ" defaultValue="Female" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="วันเกิด" defaultValue="12-05-1912" /></Grid>
                <Grid size={{ xs:12, md:6 }}><TextField fullWidth label="เบอร์โทร" defaultValue="+880 12345-6789" /></Grid>
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
