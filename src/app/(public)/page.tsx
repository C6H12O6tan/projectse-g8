'use client';
import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TopBarPublic from '@/components/TopBarPublic';
import ProjectThumb from '@/components/cards/ProjectThumb';

type Pub = {
  id: string; title: string; authors?: string | null; year?: number | null;
  dept?: string | null; type?: string | null; thumb_url?: string | null;
};

export default function PublicHome() {
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
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>Projects &amp; Work</Typography>
          <Button variant="outlined" href="/search">ค้นหาขั้นสูง</Button>
        </Stack>
        {err && <Typography color="error" variant="body2" sx={{ mb: 1 }}>{err}</Typography>}
        <Grid container spacing={2}>
          {items.map((it) => (
            <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <ProjectThumb
                href={`/publications/${it.id}`}
                title={it.title}
                author={it.authors || ''}
                tag={it.year ? `UPDATE: ${it.year}` : undefined}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
  );
}
