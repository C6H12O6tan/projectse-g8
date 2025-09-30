'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchRounded from '@mui/icons-material/SearchRounded';

import TopBarAdmin from '@/components/TopBarAdmin';      // ← ไม่มีให้ใช้ TopBarPublic แทน
import ProjectThumb from '@/components/cards/ProjectThumb';

type Pub = {
  id: string;
  title: string;
  authors?: string | null;
  author?: string | null;          // เผื่อบาง API คืน field นี้
  year?: number | null;
  thumb_url?: string | null;
};

export default function AdminHome() {
  const [items, setItems] = useState<Pub[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setErr(null);
      try {
        const r = await fetch('/api/publications?limit=12', { cache: 'no-store' });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        setItems(j.items || []);
      } catch (e: any) {
        setErr(e.message || 'load error');
      }
    })();
  }, []);

  return (
    <main>
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" spacing={60} sx={{ mb: 1 }} flexWrap="wrap">
          <Typography variant="h6" fontWeight={800} sx={{ mr: 'auto' }}>
            Projects &amp; Work
          </Typography>

          {/* ช่องค้นหาเล็ก + ปุ่มค้นหาขั้นสูง */}
          <Box component="form" action="/admin/search" sx={{ display: 'flex', gap: 1 }}>
            <TextField
              name="q"
              placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
              size="small"
              sx={{
                minWidth: { xs: 160, sm: 240, md: 300 },
                '& .MuiOutlinedInput-root': {
                  borderRadius: 999,
                  backgroundColor: '#f6f8fb',
                  height: 36,
                },
                '& .MuiOutlinedInput-input': { py: 0.5 },
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
                px: 1.75,
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

        {err && <Typography color="error" variant="body2" sx={{ mb: 1 }}>{err}</Typography>}

        <Grid container spacing={2}>
          {items.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectThumb
                href={`/admin/publications/${it.id}`}
                title={it.title}
                author={(it.authors ?? it.author) || ''}
                tag={it.year ? `UPDATE: ${it.year}` : undefined}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
