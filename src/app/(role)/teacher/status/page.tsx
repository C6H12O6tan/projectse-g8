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
import Stack from "@mui/material/Stack";
import TopBarTeacher from "@/components/TopBarTeacher";

const ROWS = [
  { name: "Digital learning in higher education", owner: "อ. นีม", email: "neem@psu.ac.th", status: "อนุมัติแล้ว" },
  { name: "AR for Classroom", owner: "อ. N", email: "n@psu.ac.th", status: "รออนุมัติ" },
  { name: "Learning Analytics", owner: "อ. N", email: "n@psu.ac.th", status: "ต้องแก้ไข" },
];

export default function TeacherStatus() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
          ติดตามสถานะผลงาน
        </Typography>
        <Paper elevation={0} sx={{ border: "1px solid #E5E7EB", borderRadius: 2, overflow: "hidden" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ชื่อเรื่อง</TableCell>
                <TableCell>เจ้าของ</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">สถานะ</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {ROWS.map((r, i) => (
                <TableRow key={i} hover>
                  <TableCell>{r.name}</TableCell>
                  <TableCell>{r.owner}</TableCell>
                  <TableCell>{r.email}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" justifyContent="flex-end">
                      <Chip
                        size="small"
                        label={r.status}
                        color={r.status === "อนุมัติแล้ว" ? "success" : r.status === "ต้องแก้ไข" ? "warning" : "default"}
                        variant="outlined"
                      />
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
