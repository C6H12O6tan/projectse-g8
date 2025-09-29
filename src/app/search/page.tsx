"use client";
import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import ExternalGrid from "@/components/ExternalGrid";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";

export default function SearchPage() {
    return (
        <main>
            <TopBar />
            <Container className="container" sx={{ py: 4 }}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>ค้นหา</Typography>
                <Paper elevation={0} sx={{ p: 2, borderRadius: 2, border: '1px solid #eee', mb: 2 }}>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField fullWidth label="คำค้น" placeholder="ชื่อผลงาน / ผู้จัดทำ / คำสำคัญ" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth label="ปี">
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                <MenuItem value="2024">2024</MenuItem>
                                <MenuItem value="2023">2023</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth label="ประเภท">
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                <MenuItem value="วิจัย">วิจัย</MenuItem>
                                <MenuItem value="วิชาการ">วิชาการ</MenuItem>
                            </TextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField fullWidth label="ชื่อผู้วิจัย" placeholder="เช่น ดร.สมชาย" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <TextField select fullWidth label="หน่วยงานภาควิชา">
                                <MenuItem value="">ทั้งหมด</MenuItem>
                                <MenuItem value="เทคโนโลยีการศึกษา">เทคโนโลยีการศึกษา</MenuItem>
                                <MenuItem value="เคมี">เคมี</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>
                    <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button variant="contained">ค้นหา</Button>
                        <Button>ล้างค่า</Button>
                    </Stack>
                </Paper>

                <ExternalGrid />
                <Footer />
            </Container>
        </main>
    );
}
