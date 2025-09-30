'use client';

import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TopBarPublic from '@/components/TopBarPublic';
import { PSU } from '@/theme/brand';

type Item = {
  id: string;
  title: string;
  authors?: string | null;
  dept?: string | null;
  type?: string | null;
  year?: number | null;
};

const DEPTS = ['ทั้งหมด', 'คณะวิทยาศาสตร์', 'ศึกษาศาสตร์', 'วิทยาการคอมพิวเตอร์'];
const TYPES = ['ทั้งหมด', 'วิจัย', 'บทความ', 'รายงาน'];
const YEARS = ['ทั้งหมด', '2568', '2567', '2566', '2558'];

export default function PublicSearchPage() {
  const [q, setQ] = useState('');
  const [dept, setDept] = useState(DEPTS[0]);
  const [type, setType] = useState(TYPES[0]);
  const [year, setYear] = useState<string | number>(YEARS[0]);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const fetchNow = async () => {
    setLoading(true);
    setErr(null);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (dept !== 'ทั้งหมด') params.set('dept', dept);
      if (type !== 'ทั้งหมด') params.set('type', type);
      if (year !== 'ทั้งหมด') params.set('year', String(year));
      params.set('limit', '50');

      const r = await fetch('/api/publications?' + params.toString(), { cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      setItems((j.items ?? []) as Item[]);
    } catch (e: any) {
      setErr(e.message || 'โหลดข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchNow(); }, []);

  const clearAll = () => { setQ(''); setDept(DEPTS[0]); setType(TYPES[0]); setYear(YEARS[0]); };

  return (
    <main>
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          สืบค้นผลงานตีพิมพ์
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={1.2} sx={{ mb: 2 }}>
          <TextField
            fullWidth size="small" placeholder="ชื่อผลงาน, ชื่อผู้วิจัย…"
            value={q} onChange={(e) => setQ(e.target.value)}
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
          />
          <TextField fullWidth size="small" select value={dept} onChange={(e) => setDept(e.target.value)}>
            {DEPTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
          </TextField>
          <TextField fullWidth size="small" select value={type} onChange={(e) => setType(e.target.value)}>
            {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
          </TextField>
          <TextField fullWidth size="small" select value={year} onChange={(e) => setYear(e.target.value)}>
            {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </TextField>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={fetchNow} disabled={loading}>ค้นหา</Button>
            <Button variant="outlined" onClick={clearAll}>ล้างค่า</Button>
          </Stack>
        </Stack>

        {err && <Typography color="error" variant="body2" sx={{ mb: 1 }}>{err}</Typography>}

        <Stack spacing={1.5}>
          {items.map((r) => (
            <Paper key={r.id}
              elevation={0}
              sx={{ p: 2, border: `1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
              <Typography fontWeight={800} sx={{ mb: .5 }}>{r.title}</Typography>
              <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap">
                <Typography variant="body2">{r.authors || ''}</Typography>
                <Stack direction="row" spacing={1}>
                  {r.dept && <Chip size="small" label={r.dept} variant="outlined" />}
                  {r.year && <Chip size="small" label={r.year} variant="outlined" />}
                  {r.type && <Chip size="small" label={r.type} variant="outlined" />}
                </Stack>
                <Stack sx={{ ml: 'auto' }}>
                  <Button size="small" variant="contained" href={`/publications/${r.id}`}>ดูรายละเอียด</Button>
                </Stack>
              </Stack>
            </Paper>
          ))}
          {(!loading && !err && items.length === 0) && (
            <Typography variant="body2" sx={{ opacity: .7 }}>ไม่พบข้อมูล</Typography>
          )}
        </Stack>
      </Container>
    </main>
  );
}
