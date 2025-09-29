"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TopBarAdmin from "@/components/TopBarAdmin";
import { PSU } from "@/theme/brand";

const ROWS = [
  { name:"Mithlesh Kumar Singh", uid:"12358G", address:"112 Kritipur, Kathmandu", amount:"-", action:"" },
  { name:"Suron Maharjan", uid:"86523B", address:"Natole, Lalitpur", amount:"113", action:"" },
  { name:"Sandesh Bajracharya", uid:"78365D", address:"Bhinchhebahal, Lalitpur", amount:"114", action:"" },
];

export default function AdminHistory() {
  return (
    <main>
      <TopBarAdmin />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>ประวัติการใช้งาน</Typography>
        <Paper elevation={0} sx={{ border:`1px solid ${PSU.cardBorder}`, borderRadius:2, overflow:"hidden", boxShadow: PSU.cardShadow }}>
          <Table size="small" sx={{ "& th, & td": { height: 56 } }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>UID</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((r, i)=>(
                <TableRow key={i}>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.uid}</TableCell>
                  <TableCell>{r.address}</TableCell>
                  <TableCell>{r.amount}</TableCell>
                  <TableCell>{r.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </main>
  );
}
