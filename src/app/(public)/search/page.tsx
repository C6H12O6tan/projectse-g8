"use client";
import { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Chip from "@mui/material/Chip";
import TopBarPublic from "@/components/TopBarPublic";
import { PSU } from "@/theme/brand";

type Item = { id: string; title: string; author: string; dept: string; type: string; year: number };

const MOCK: Item[] = [
  { id: "1", title: "Digital Learning in Higher Education", author: "Jane Cooper", dept: "คณะวิทยาศาสตร์", type: "วิจัย", year: 2558 },
  { id: "2", title: "AI in Classroom Settings", author: "Floyd Miles", dept: "ศึกษาศาสตร์", type: "บทความ", year: 2568 },
];

const DEPTS = ["ทั้งหมด", "คณะวิทยาศาสตร์", "ศึกษาศาสตร์", "วิทยาการคอมพิวเตอร์"];
const TYPES = ["ทั้งหมด", "วิจัย", "บทความ", "รายงาน"];
const YEARS = ["ทั้งหมด", "2568", "2567", "2566", "2558"];

export default function PublicSearch() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState(DEPTS[0]);
  const [type, setType] = useState(TYPES[0]);
  const [year, setYear] = useState<string | number>(YEARS[0]);

  const results = useMemo(
    () =>
      MOCK.filter((it) => {
        const k = q.trim().toLowerCase();
        const okQ = !k || it.title.toLowerCase().includes(k) || it.author.toLowerCase().includes(k);
        const okDept = dept === "ทั้งหมด" || it.dept === dept;
        const okType = type === "ทั้งหมด" || it.type === type;
        const okYear = year === "ทั้งหมด" || it.year === Number(year);
        return okQ && okDept && okType && okYear;
      }),
    [q, dept, type, year]
  );

  const clearAll = () => {
    setQ(""); setDept(DEPTS[0]); setType(TYPES[0]); setYear(YEARS[0]);
  };

  return (
    <main>
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>สืบค้นผลงานตีพิมพ์</Typography>

        <Grid container spacing={1} sx={{ mb: 2 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth size="small" placeholder="ชื่อผลงาน,ชื่อผู้วิจัย…"
              value={q} onChange={(e) => setQ(e.target.value)}
              slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField fullWidth size="small" select value={dept} onChange={(e) => setDept(e.target.value)}>
              {DEPTS.map((d) => <MenuItem key={d} value={d}>{d}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2.5 }}>
            <TextField fullWidth size="small" select value={type} onChange={(e) => setType(e.target.value)}>
              {TYPES.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: 2.5 }}>
            <TextField fullWidth size="small" select value={year} onChange={(e) => setYear(e.target.value)}>
              {YEARS.map((y) => <MenuItem key={y} value={y}>{y}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid size={{ xs: 12, md: "auto" }}>
            <Stack direction="row" spacing={1}><Button variant="contained">ค้นหา</Button><Button variant="outlined" onClick={clearAll}>ล้างค่า</Button></Stack>
          </Grid>
        </Grid>

        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1 }}>ผลงานตีพิมพ์ {results.length ? `(${results.length})` : ""}</Typography>

        <Stack spacing={1.5}>
          {results.map((r) => (
            <Paper key={r.id} elevation={0}
              sx={{ p: 2, border: `1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
              <Typography fontWeight={800} sx={{ mb: .5 }}>{r.title}</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Typography variant="body2">{r.author}</Typography>
                <Stack direction="row" spacing={1}>
                  <Chip size="small" label={r.dept} variant="outlined" />
                  <Chip size="small" label={r.year} variant="outlined" />
                  <Chip size="small" label={r.type} variant="outlined" />
                </Stack>
                <Stack sx={{ ml: "auto" }}>
                  <Button size="small" variant="contained" href={`/publications/${r.id}`}>ดูรายละเอียด</Button>
                </Stack>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Container>
    </main>
  );
}
