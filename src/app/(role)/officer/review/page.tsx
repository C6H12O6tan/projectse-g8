'use client';

import { useMemo, useState } from 'react';
import TopBarOfficer from '@/components/TopBarOfficer';
import {
  Box, Container, Typography, TextField, InputAdornment, Select, MenuItem,
  Table, TableHead, TableRow, TableCell, TableBody, Button, Paper, Chip,
  Pagination, Stack
} from '@mui/material';
import SearchRounded from '@mui/icons-material/SearchRounded';
import { useRouter } from 'next/navigation';

type Row = {
  id: string;
  title: string;
  author: string;
  year: number;
  status: 'pending'|'reviewing'|'approved'|'rejected';
};

const MOCK: Row[] = [
  { id:'1', title:'Digital Learning in Higher Education', author:'Jane Cooper', year:2568, status:'pending' },
  { id:'2', title:'AI in Classroom Settings', author:'Floyd Miles', year:2568, status:'pending' },
  { id:'3', title:'Leadership in University Reform', author:'Ronald Richards', year:2568, status:'pending' },
  { id:'4', title:'Online vs. Offline Learning', author:'Marvin McKinney', year:2567, status:'approved' },
  { id:'5', title:'Green University Initiatives', author:'Jerome Bell', year:2567, status:'rejected' },
  { id:'6', title:'STEM Education Trends', author:'Kathryn Murphy', year:2567, status:'approved' },
  { id:'7', title:'Cybersecurity in Academia', author:'(208) 555–0112', year:2567, status:'approved' },
  { id:'8', title:'Student Engagement Tactics', author:'(704) 555–0127', year:2567, status:'approved' },
];

function StatusChip({ s }: { s: Row['status'] }) {
  if (s === 'approved') return <Chip label="อนุมัติแล้ว" size="small" color="success" variant="outlined" />;
  if (s === 'rejected') return <Chip label="รอการแก้ไข" size="small" color="warning" variant="outlined" />;
  if (s === 'reviewing') return <Chip label="รอการอนุมัติ" size="small" color="info" variant="outlined" />;
  return <Chip label="ตรวจสอบ" size="small" />;
}

export default function OfficerReviewList() {
  const r = useRouter();
  const [q, setQ] = useState('');
  const [year, setYear] = useState<number | 'all'>('all');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    let x = MOCK;
    if (q.trim()) {
      const t = q.toLowerCase();
      x = x.filter(v =>
        v.title.toLowerCase().includes(t) || v.author.toLowerCase().includes(t)
      );
    }
    if (year !== 'all') x = x.filter(v => v.year === year);
    return x;
  }, [q, year]);

  // paginate (ตัวอย่างละ 8 รายการต่อหน้า)
  const pageSize = 8;
  const total = Math.max(1, Math.ceil(filtered.length / pageSize));
  const view = filtered.slice((page-1)*pageSize, page*pageSize);

  return (
    <main>
      <TopBarOfficer />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={800} sx={{ mb: 2 }}>
          อนุมัติผลงานตีพิมพ์
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <TextField
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            size="small"
            value={q}
            onChange={e => setQ(e.target.value)}
            sx={{
              minWidth: { xs: 200, md: 360 },
              '& .MuiOutlinedInput-root': { borderRadius: 999, height: 38 },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRounded fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Select
            size="small"
            value={year}
            onChange={e => setYear(e.target.value as any)}
            sx={{ borderRadius: 999, height: 38 }}
          >
            <MenuItem value="all">ปีทั้งหมด</MenuItem>
            <MenuItem value={2568}>2568</MenuItem>
            <MenuItem value={2567}>2567</MenuItem>
          </Select>
        </Stack>

        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #E9EEF4' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>ชื่อผลงาน</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>ชื่อ-นามสกุล</TableCell>
                <TableCell sx={{ fontWeight: 700 }} width={120}>ปีที่ตีพิมพ์</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="right" width={180}>ตรวจสอบ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {view.map(row => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.author}</TableCell>
                  <TableCell>{row.year}</TableCell>
                  <TableCell align="right">
                    {row.status === 'pending' ? (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => r.push(`/officer/review/${row.id}`)}
                        sx={{ borderRadius: 999 }}
                      >
                        ยืนยันการอนุมัติ
                      </Button>
                    ) : (
                      <StatusChip s={row.status} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>

        <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
          <Pagination count={total} page={page} onChange={(_, p) => setPage(p)} shape="rounded" />
        </Stack>
      </Container>
    </main>
  );
}
