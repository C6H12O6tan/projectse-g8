'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBarOfficer from '@/components/TopBarOfficer';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Snackbar,
  Stack,
  TextField,
  Typography,
  MenuItem,
} from '@mui/material';

type Role = 'admin' | 'officer' | 'teacher' | 'external';

export default function OfficerPersonnelNewPage() {
  const router = useRouter();

  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // ฟอร์ม — ดีฟอลต์ role = teacher (ตามหน้ารายการที่แสดงเฉพาะอาจารย์)
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirm: '',
    display_name: '',
    fullname: '',
    phone: '',
    role: 'teacher' as Role,
  });

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  const getAuthHeaders = async () => {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    try {
      const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
      const sb = supabaseBrowser();
      const { data: s } = await sb.auth.getSession();
      const token = s?.session?.access_token;
      if (token) headers.Authorization = `Bearer ${token}`;
    } catch {
      /* noop */
    }
    return headers;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);

    // ตรวจสอบแบบง่าย
    if (!form.email.trim()) return setErr('กรุณากรอกอีเมล');
    if (form.password.length < 8) return setErr('รหัสผ่านอย่างน้อย 8 ตัวอักษร');
    if (form.password !== form.confirm) return setErr('รหัสผ่านและยืนยันไม่ตรงกัน');

    setBusy(true);
    try {
      const headers = await getAuthHeaders();

      // payload ตาม API แอดมิน (เปลี่ยนชื่อคีย์ได้ตามสคีมาของคุณ)
      const payload = {
        email: form.email.trim(),
        password: form.password,
        display_name: form.display_name.trim() || undefined,
        fullname: form.fullname.trim() || undefined,
        phone: form.phone.trim() || undefined,
        role: form.role, // ปล่อยให้เลือกได้ แต่ตั้งค่าเริ่มต้นเป็น teacher
      };

      const res = await fetch('/api/admin/users', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(j?.error || `สร้างบัญชีไม่สำเร็จ (HTTP ${res.status})`);
      }

      setSnack('สร้างบุคลากรสำเร็จ');
      // กลับไปหน้า personnel ของ officer
      router.replace('/officer/personnel');
    } catch (e: any) {
      setErr(e.message || 'สร้างบุคลากรไม่สำเร็จ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h5" fontWeight={900}>เพิ่มบุคลากร</Typography>
        </Stack>

        <Card variant="outlined" sx={{ borderRadius: 3 }}>
          <CardHeader title="ข้อมูลบัญชีผู้ใช้" />
          <CardContent>
            <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
              <Grid container spacing={2}>
                <Grid size= {{xs: 12, md: 6}}>
                  <TextField
                    label="อีเมล"
                    type="email"
                    required
                    fullWidth
                    value={form.email}
                    onChange={onChange('email')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    select
                    label="บทบาท"
                    fullWidth
                    value={form.role}
                    onChange={(e) => setForm((s) => ({ ...s, role: e.target.value as Role }))}
                  >
                    {/* เหลือเฉพาะ teacher ให้ตรง requirement; ถ้าต้องการเปิดเลือกอื่นค่อยปลดคอมเมนต์ */}
                    <MenuItem value="teacher">teacher</MenuItem>
                    {/* <MenuItem value="officer">officer</MenuItem>
                    <MenuItem value="admin">admin</MenuItem> */}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="รหัสผ่าน (อย่างน้อย 8 ตัว)"
                    type="password"
                    required
                    fullWidth
                    value={form.password}
                    onChange={onChange('password')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="ยืนยันรหัสผ่าน"
                    type="password"
                    required
                    fullWidth
                    value={form.confirm}
                    onChange={onChange('confirm')}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="ชื่อที่แสดง (Display name)"
                    fullWidth
                    value={form.display_name}
                    onChange={onChange('display_name')}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="ชื่อ-นามสกุล (Fullname)"
                    fullWidth
                    value={form.fullname}
                    onChange={onChange('fullname')}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="เบอร์โทรศัพท์"
                    fullWidth
                    inputProps={{ inputMode: 'tel' }}
                    value={form.phone}
                    onChange={onChange('phone')}
                  />
                </Grid>
              </Grid>

              <Stack direction="row" justifyContent="flex-end" gap={1}>
                <Button onClick={() => router.back()} disabled={busy}>ยกเลิก</Button>
                <Button type="submit" variant="contained" disabled={busy}>
                  {busy ? 'กำลังบันทึก…' : 'บันทึก'}
                </Button>
              </Stack>

              {err && (
                <Typography color="error" variant="body2">{err}</Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>

      <Snackbar
        open={!!snack}
        onClose={() => setSnack(null)}
        autoHideDuration={2600}
        message={snack || ''}
      />
    </main>
  );
}
