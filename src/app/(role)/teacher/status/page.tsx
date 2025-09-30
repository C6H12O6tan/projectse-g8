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
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TopBarTeacher from "@/components/TopBarTeacher";
import { PSU } from "@/theme/brand";

const ROWS = [
  { title:"Digital Learning in Higher Education", name:"Jane Cooper", email:"jane@microsoft.com", status:"succeed" },
  { title:"AI in Classroom Settings", name:"Floyd Miles", email:"floyd@yahoo.com", status:"in progress" },
  { title:"Leadership in University Reform", name:"Ronald Richards", email:"ronald@adobe.com", status:"succeed" },
  { title:"Online vs. Offline Learning", name:"Marvin McKinney", email:"marvin@tesla.com", status:"in progress" },
  { title:"Green University Initiatives", name:"Jerome Bell", email:"jerome@google.com", status:"succeed" },
  { title:"STEM Education Trends", name:"Kathryn Murphy", email:"kathryn@microsoft.com", status:"succeed" },
  { title:"Cybersecurity in Academia", name:"Jacob Jones", email:"jacob@yahoo.com", status:"not approved" },
];

export default function TeacherStatus() {
  const chip = (s: string) =>
    s === "succeed" ? { label:"succeed", color:"success" as const } :
    s === "not approved" ? { label:"Not approved", color:"error" as const } :
    { label:"in progress", color:"warning" as const };

  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>สถานะ</Typography>

        <Box sx={{ display:"flex", justifyContent:"flex-end", mb: 1 }}>
          <TextField
            size="small"
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small"/></InputAdornment> }}
          />
        </Box>

        <Paper elevation={0} sx={{ border:`1px solid ${PSU.cardBorder}`, borderRadius: 2, overflow:"hidden", boxShadow: PSU.cardShadow }}>
          <Table size="small" sx={{ "& th, & td": { height: 56 } }}>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อผลงาน</TableCell>
                <TableCell>ชื่อ-นามสกุล</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">สถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((r, i) => (
                <TableRow key={i} hover>
                  <TableCell>{r.title}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell align="right"><Chip size="small" variant="outlined" color={chip(r.status).color} label={chip(r.status).label}/></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </main>
  );
}
