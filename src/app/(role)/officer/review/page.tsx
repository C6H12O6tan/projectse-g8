"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TopBarOfficer from "@/components/TopBarOfficer";
import { PSU } from "@/theme/brand";

const ROWS = [
  { id:"1", title:"Digital Learning in Higher Education", name:"Jane Cooper", year:2568, status:"ตรวจสอบแล้ว" },
  { id:"2", title:"AI in Classroom Settings", name:"Floyd Miles", year:2568, status:"ตรวจสอบแล้ว" },
  { id:"3", title:"Leadership in University Reform", name:"Ronald Richards", year:2568, status:"ตรวจสอบแล้ว" },
  { id:"4", title:"Online vs. Offline Learning", name:"Marvin McKinney", year:2567, status:"ตรวจสอบ" },
  { id:"5", title:"Green University Initiatives", name:"Jerome Bell", year:2567, status:"ตรวจสอบแล้ว" },
  { id:"6", title:"STEM Education Trends", name:"Kathryn Murphy", year:2567, status:"ตรวจสอบแล้ว" },
];

export default function OfficerReview() {
  const chip = (s: string) =>
    s === "ตรวจสอบแล้ว" ? { label:"ตรวจสอบแล้ว", color:"success" as const } :
    { label:"ตรวจสอบ", color:"warning" as const };

  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
          ตรวจสอบความถูกต้องผลงานตีพิมพ์ทั้งหมด
        </Typography>

        <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
          <TextField
            size="small"
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            slotProps={{ input: { startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
          />
        </Stack>

        <Paper elevation={0} sx={{ border:`1px solid ${PSU.cardBorder}`, borderRadius: 2, overflow: "hidden", boxShadow: PSU.cardShadow }}>
          <Table size="small" sx={{ "& th, & td": { height: 56 } }}>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อผลงาน</TableCell>
                <TableCell>ชื่อ-นามสกุล</TableCell>
                <TableCell>ปีที่ตีพิมพ์</TableCell>
                <TableCell align="right">สถานะ</TableCell>
                <TableCell align="right" width={140}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.year}</TableCell>
                  <TableCell align="right">
                    <Chip size="small" variant="outlined" color={chip(r.status).color} label={chip(r.status).label}/>
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="contained" href={`/officer/project/${r.id}`}>ตรวจสอบ</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </main>
  );
}
