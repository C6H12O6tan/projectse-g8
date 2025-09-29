"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import TopBarAdmin from "@/components/TopBarAdmin";
import { PSU } from "@/theme/brand";

const ROWS = [
  { name:"Jane Cooper", phone:"(225) 555-0118", email:"jane@microsoft.com" },
  { name:"Floyd Miles", phone:"(205) 555-0100", email:"floyd@yahoo.com" },
  { name:"Ronald Richards", phone:"(302) 555-0107", email:"ronald@adobe.com" },
  { name:"Marvin McKinney", phone:"(252) 555-0126", email:"marvin@tesla.com" },
];

export default function AdminUsers() {
  return (
    <main>
      <TopBarAdmin />
      <Container className="container" sx={{ py: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" fontWeight={800}>บัญชีผู้ใช้งาน</Typography>
          <Stack direction="row" spacing={1}>
            <TextField
              size="small"
              placeholder="Search"
              slotProps={{ input:{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> } }}
            />
            <Button variant="contained">เพิ่มบุคลากร +</Button>
          </Stack>
        </Stack>

        <Paper elevation={0} sx={{ border:`1px solid ${PSU.cardBorder}`, borderRadius:2, overflow:"hidden", boxShadow: PSU.cardShadow }}>
          <Table size="small" sx={{ "& th, & td": { height: 56 } }}>
            <TableHead>
              <TableRow>
                <TableCell>ชื่อ-สกุล</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right" width={160}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((r, idx) => (
                <TableRow key={idx} hover>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.phone}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Button size="small" variant="outlined" color="error">ลบ</Button>
                      <Button size="small" variant="contained">แก้ไข</Button>
                    </Stack>
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
