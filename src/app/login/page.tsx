"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { roleToPath } from "@/lib/role";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", role: "" }); // ← ค่าตั้งต้น

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace(roleToPath(form.role));
  };

  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ minHeight: "80vh", display:"grid", placeItems:"center" }}>
        <Card sx={{ width: 420, borderRadius: 3 }} variant="outlined">
          <CardHeader title="เข้าสู่ระบบ (Demo Frontend)" />
          <CardContent>
            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField
                  name="email"
                  type="email"
                  label="อีเมล"
                  required
                  value={form.email}
                  onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))}
                />
                <TextField
                  name="password"
                  type="password"
                  label="รหัสผ่าน"
                  required
                  value={form.password}
                  onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))}
                />
                <TextField
                  name="role"
                  select
                  label="บทบาท (จำลอง)"
                  value={form.role}                 // ← คุมค่าเสมอ
                  onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="officer">Officer</MenuItem>
                  <MenuItem value="teacher">Teacher</MenuItem>
                </TextField>
                <Button type="submit" variant="contained">เข้าสู่ระบบ</Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </main>
  );
}
