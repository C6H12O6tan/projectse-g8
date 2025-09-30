"use client";
import { useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import RoleTopBar from "@/components/RoleTopBar";
import Footer from "@/components/Footer";
import { ROLE_COLORS } from "@/theme/brand";

export default function TeacherPersonnel() {
  const C = ROLE_COLORS.teacher;
  const [name, setName] = useState("อ. นีม");
  const [email, setEmail] = useState("neem@example.edu");
  const [position, setPosition] = useState("อาจารย์ประจำ / เทคโนโลยีการศึกษา");
  const [orcid, setOrcid] = useState("");
  const [scholar, setScholar] = useState("");
  const [scopus, setScopus] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);

  const uploadMock = () => setAvatar("mock://avatar");

  return (
    <main>
      <RoleTopBar role="teacher" />
      <div style={{ background: C.primary, color: C.onPrimary, borderBottom: `3px solid ${C.accent}` }}>
        <Container className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
          ข้อมูลบุคลากร (อาจารย์)
        </Container>
      </div>

      <Container className="container" sx={{ py: 3 }}>
        <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
          <Grid container spacing={2}>
            <Grid size={{ xs:12, md:3 }} sx={{ display:"grid", placeItems:"center" }}>
              <Stack spacing={1} alignItems="center">
                <Avatar sx={{ width: 96, height: 96 }}>{avatar ? "" : name?.[0] || "A"}</Avatar>
                <Button variant="outlined" onClick={uploadMock}>เปลี่ยนรูป (จำลอง)</Button>
              </Stack>
            </Grid>
            <Grid size={{ xs:12, md:9 }}>
              <Stack spacing={2}>
                <TextField label="ชื่อ-นามสกุล" value={name} onChange={e=>setName(e.target.value)} />
                <TextField label="อีเมล" value={email} onChange={e=>setEmail(e.target.value)} />
                <TextField label="ตำแหน่ง/หน่วยงาน" value={position} onChange={e=>setPosition(e.target.value)} />
                <Typography variant="subtitle2" sx={{ mt: 1 }}>ลิงก์ผลงานวิชาการ</Typography>
                <TextField label="ORCID" value={orcid} onChange={e=>setOrcid(e.target.value)} placeholder="https://orcid.org/..." />
                <TextField label="Google Scholar" value={scholar} onChange={e=>setScholar(e.target.value)} placeholder="https://scholar.google.com/..." />
                <TextField label="Scopus" value={scopus} onChange={e=>setScopus(e.target.value)} placeholder="https://www.scopus.com/..." />
                <Stack direction="row" spacing={1}>
                  <Button variant="contained">บันทึก</Button>
                  <Button variant="text">ยกเลิก</Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
        <Footer />
      </Container>
    </main>
  );
}
