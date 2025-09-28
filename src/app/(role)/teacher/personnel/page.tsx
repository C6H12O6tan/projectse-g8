import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleTabs from "@/components/RoleTabs";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function TeacherPersonnel() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/teacher" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="ข้อมูลบุคลากร (อาจารย์)" subtitle="แก้ไขข้อมูลส่วนตัว/ลิงก์ผลงานวิชาการ" />
        <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
          <Stack spacing={2}>
            <TextField label="ชื่อ-นามสกุล" />
            <TextField label="อีเมล" />
            <TextField label="ตำแหน่ง/หน่วยงาน" />
            <TextField label="ORCID / Google Scholar / Scopus" />
            <Stack direction="row" spacing={1}>
              <Button variant="contained">บันทึก</Button>
              <Button variant="text">ยกเลิก</Button>
            </Stack>
          </Stack>
        </Paper>
        <Footer />
      </Container>
    </main>
  );
}
