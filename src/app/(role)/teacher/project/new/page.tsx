'use client';
import { useState } from 'react';
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
  abstract: string;
  authors: string;
  coauthors: string;
  year: string;        // เก็บเป็นสตริงเพื่อควบคุมอินพุต
  location: string;
};

const clampYear = (raw: string) => {
  const digits = (raw.match(/\d+/g)?.join('') ?? '').replace(/^0+(?=\d)/, '');
  if (!digits) return '';
  const n = Number(digits);
  if (Number.isNaN(n)) return '';
  if (n < 0) return '0';
  if (n > 3000) return '3000';
  return String(n);
};

export default function TeacherProjectNewPage() {
  const r = useRouter();
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: '',
    abstract: '',
    authors: '',
    coauthors: '',
    year: '',
    location: '',
  });

  const onChange =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      if (k === 'year') {
        const v = clampYear(e.target.value);
        setForm((s) => ({ ...s, year: v }));
      } else {
        setForm((s) => ({ ...s, [k]: e.target.value }));
      }
    };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    try {
      const yearClean = clampYear(form.year);
      const payload = {
        title: form.title.trim(),
        abstract: form.abstract.trim() || null,
        authors: form.authors.trim() || null,
        coauthors: form.coauthors.trim() || null,
        year: yearClean ? Number(yearClean) : null,
        location: form.location.trim() || null,
      };

      if (!payload.title) throw new Error('กรุณากรอกชื่อผลงาน');
      if (payload.year !== null && (payload.year < 0 || payload.year > 3000)) {
        throw new Error('ปีที่ตีพิมพ์ต้องเป็นตัวเลขระหว่าง 0–3000');
      }

      const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
      const sb = supabaseBrowser();
      const { data: s } = await sb.auth.getSession();
      const token = s?.session?.access_token;

      const res = await fetch('/api/teacher/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      });

      const j = await res.json();
      if (!res.ok) throw new Error(j?.error || 'สร้างโปรเจกต์ไม่สำเร็จ');

      r.replace(j?.id ? `/teacher/project/${j.id}` : '/teacher/project');
    } catch (err: any) {
      alert(err?.message || 'สร้างโปรเจกต์ไม่สำเร็จ');
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
            <TextField
              label="ชื่อผลงาน"
              required
              fullWidth
              value={form.title}
              onChange={onChange('title')}
            />

            <TextField
              label="บทคัดย่อ"
              multiline
              minRows={5}
              fullWidth
              value={form.abstract}
              onChange={onChange('abstract')}
            />

            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ชื่อผู้เขียน"
                  fullWidth
                  value={form.authors}
                  onChange={onChange('authors')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ชื่อผู้เขียน (ร่วม)"
                  fullWidth
                  value={form.coauthors}
                  onChange={onChange('coauthors')}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="ปีที่ตีพิมพ์"
                  placeholder="เช่น 2025 (ไม่เกิน 3000)"
                  fullWidth
                  value={form.year}
                  onChange={onChange('year')}
                  // ⬇⬇ สำคัญ: ใช้ inputProps แทน pattern บน TextField โดยตรง
                  inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  label="สถานที่จัดเก็บ"
                  fullWidth
                  value={form.location}
                  onChange={onChange('location')}
                />
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
