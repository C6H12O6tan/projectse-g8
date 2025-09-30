'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import SearchRounded from '@mui/icons-material/SearchRounded';
import AddRounded from '@mui/icons-material/AddRounded';
import TopBarTeacher from '@/components/TopBarTeacher';

type Project = {
  id: string;
  title: string;
  authors?: string | null;
  year?: number | null;
  created_at?: string;
};

export default function TeacherProjectIndex() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const res = await fetch('/api/teacher/projects?owner=me', { cache: 'no-store' });
        const j = await res.json();
        if (!res.ok) throw new Error(j?.error || 'load failed');
        setItems(j.items || []);
      } catch (e: any) {
        setErr(e.message || 'load failed');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        {/* หัวเรื่อง + ช่องค้นหาด้านขวา (ระยะห่างตามสเปก) */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight={800}>
            My Projects
          </Typography>

          {/* ช่องค้นหา (ส่งไป /teacher/search) + ปุ่มค้นหาขั้นสูง — ขนาดเล็ก */}
          <Box component="form" action="/teacher/search" sx={{ display: 'flex', gap: 2 }}>
            <TextField
              name="q"
              placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
              size="small"
              sx={{
                minWidth: { xs: 180, sm: 280, md: 360 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 999,
                  backgroundColor: '#f6f8fb',
                  height: 38,
                },
                '& .MuiOutlinedInput-input': { py: 0.6 },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: '#D7DDE5' },
                '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#C8D3E0' },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ color: 'text.disabled', pl: 1 }}>
                    <SearchRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="outlined"
              size="small"
              sx={{
                borderRadius: 999,
                px: 2,
                whiteSpace: 'nowrap',
                borderColor: '#3b82f6',
                color: '#2563eb',
                background: '#F8FAFF',
                '&:hover': { borderColor: '#2563eb', background: '#EEF4FF' },
              }}
            >
              ค้นหาขั้นสูง
            </Button>
          </Box>
        </Stack>

        {err && (
          <Typography color="error" variant="body2" sx={{ mb: 1 }}>
            {err}
          </Typography>
        )}

        {/* กริดการ์ด */}
        <Grid container spacing={2}>
          {/* ไทล์สร้างโปรเจกต์ใหม่ */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              variant="outlined"
              sx={{
                height: '100%',
                borderRadius: 3,
                display: 'grid',
                placeItems: 'center',
                p: 0,
              }}
            >
              <CardActionArea
                component={Link}
                href="/teacher/project/new"
                sx={{ height: '100%', p: 3, display: 'grid', placeItems: 'center' }}
              >
                <Stack alignItems="center" spacing={1.25}>
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: '50%',
                      bgcolor: '#e9eef9',
                      color: '#2155CD',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <AddRounded fontSize="large" />
                  </Box>
                  <Typography sx={{ color: 'text.secondary' }}>NEW PROJECT…</Typography>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>

          {/* รายการโปรเจกต์ */}
          {items.map((p) => (
            <Grid key={p.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CardItem p={p} />
            </Grid>
          ))}

          {/* ขณะโหลดและยังไม่มีข้อมูลแสดง placeholder หลวม ๆ */}
          {loading && items.length === 0 && (
            <Grid size={{ xs: 12 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                กำลังโหลดข้อมูล…
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </main>
  );
}

/** การ์ดแสดงโปรเจกต์ (inline เพื่อหลีกเลี่ยง dependency อื่น) */
function CardItem({ p }: { p: Project }) {
  const author = (p.authors || '').toString();
  return (
    <Card
      elevation={4}
      sx={{
        height: '100%',
        borderRadius: 4,
        bgcolor: '#1f2d5b', // กรมท่า
        color: '#fff',
        boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
      }}
    >
      <CardActionArea component={Link} href={`/teacher/project/${p.id}`} sx={{ p: 2 }}>
        <CardContent sx={{ p: 0 }}>
          {/* ชื่อโปรเจกต์ */}
          <Typography variant="subtitle2" fontWeight={800} sx={{ mb: 1, letterSpacing: 0.1 }}>
            {p.title || '-'}
          </Typography>

          {/* รูปตัวอย่าง/placeholder */}
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16 / 7',
              borderRadius: 3,
              overflow: 'hidden',
              bgcolor: 'rgba(255,255,255,0.15)',
              mb: 2,
              display: 'grid',
              placeItems: 'center',
              color: 'rgba(255,255,255,0.8)',
              fontSize: 12,
            }}
          >
            ไม่มีรูปตัวอย่าง
          </Box>

          {/* ป้ายปี & ผู้เขียน */}
          <Stack direction="row" spacing={1} alignItems="center">
            {(p.year ?? null) && (
              <Chip
                label={`UPDATE: ${p.year}`}
                size="small"
                sx={{
                  bgcolor: '#d9e6a3',
                  color: '#23330a',
                  fontWeight: 700,
                  borderRadius: '999px',
                }}
              />
            )}
            {author && (
              <Typography variant="caption" sx={{ ml: 1, opacity: 0.9 }}>
                {author}
              </Typography>
            )}
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
