import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleTabs from "@/components/RoleTabs";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function TeacherSetting() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/teacher" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="ตั้งค่า (อาจารย์)" subtitle="ภาษา/การแจ้งเตือน/ค่าทั่วไป" />
        <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
          <Stack spacing={2}>
            <TextField label="ภาษา/รูปแบบวันที่" />
            <TextField label="อีเมลแจ้งเตือน" />
            <Button variant="contained">บันทึก</Button>
          </Stack>
        </Paper>
        <Footer />
      </Container>
    </main>
  );
}
