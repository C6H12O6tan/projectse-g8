'use client';
import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TopBarTeacher from '@/components/TopBarTeacher';

type FormState = {
  title: string;
  summary: string;      // ⬅ เปลี่ยนชื่อฟิลด์ให้ตรง DB
  authors: string;
  coauthors: string;
  year: string;         // รับเป็น string แล้วแปลงก่อนส่ง
  location: string;
};

export default function TeacherProjectNewPage() {
  const r = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    summary: '',
    authors: '',
    coauthors: '',
    year: '',
    location: '',
  });

  const onChange =
    (k: keyof FormState) =>
      (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const y = form.year.trim() ? Number(form.year) : null;
      if (y !== null && (!Number.isInteger(y) || y < 0 || y > 3000)) {
        alert('ปีที่ตีพิมพ์ต้องเป็นตัวเลข 0–3000');
        return;
      }

      // 1) ดึง token และ “บังคับมี token” ก่อนยิง API
      const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
      const sb = supabaseBrowser();
      const { data: s } = await sb.auth.getSession();
      const token = s?.session?.access_token;
      if (!token) {
        alert('กรุณาเข้าสู่ระบบก่อน');
        return;
      }

      const payload = {
        title: form.title.trim(),
        summary: form.summary.trim(),
        authors: form.authors.trim(),
        coauthors: form.coauthors.trim(),
        year: y,
        location: form.location.trim() || null,
      };

      const res = await fetch('/api/teacher/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // 2) แนบ token แน่นอน
        },
        credentials: 'include',             // 3) ส่งคุกกี้ไปด้วย (กันไว้)
        body: JSON.stringify(payload),
      });

      const j = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(j?.error || `Create failed (${res.status})`);
      }

      // ไปหน้ารายละเอียด
      location.replace(`/teacher/project/${j.id}`);
    } catch (err: any) {
      alert(err?.message || 'สร้างโปรเจกต์ไม่สำเร็จ');
      console.error(err);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
          New my projects
        </Typography>

        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="ชื่อผลงาน" required value={form.title} onChange={onChange('title')} />

            <TextField
              label="บทคัดย่อ"
              placeholder="สรุปใจความสำคัญของผลงาน"
              multiline
              minRows={5}
              value={form.summary}            // ⬅ เปลี่ยนเป็น summary
              onChange={onChange('summary')}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="ชื่อผู้เขียน" value={form.authors} onChange={onChange('authors')} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="ชื่อผู้เขียน (ร่วม)" value={form.coauthors} onChange={onChange('coauthors')} />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ปีที่ตีพิมพ์"
                  inputMode="numeric"
                  placeholder="เช่น 2024"
                  fullWidth
                  value={form.year}
                  onChange={(e) => {
                    // รับเฉพาะตัวเลข, ไม่บังคับ 4 หลัก, ตัดเกิน 4 ตัว
                    const next = e.target.value.replace(/\D+/g, '').slice(0, 4);
                    setForm((s) => ({ ...s, year: next }));
                  }}
                  helperText="กรอกตัวเลขได้ (0–3000)"
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="สถานที่จัดเก็บ" value={form.location} onChange={onChange('location')} />
              </Grid>
            </Grid>

            <Stack direction="row" justifyContent="flex-end">
              <Button type="submit" variant="contained" disabled={busy}>
                {busy ? 'กำลังบันทึก…' : 'บันทึก'}
              </Button>
            </Stack>
          </Stack>
        </form>
      </Container>
    </main>
  );
}
