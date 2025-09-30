import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export type Row = { id: string; title: string; status: string; updated: string };

export default function TeacherTable({ rows, title }: { rows: Row[]; title: string }) {
  return (
    <Paper elevation={0} sx={{ border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2, pb: 0 }}>
        <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
        <Button href="/teacher/project" variant="text">ดูทั้งหมด</Button>
      </Stack>
      <Table size="small" aria-label={title}>
        <TableHead>
          <TableRow>
            <TableCell>ชื่อเรื่อง</TableCell>
            <TableCell>สถานะ</TableCell>
            <TableCell align="right">อัปเดตล่าสุด</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell>{r.title}</TableCell>
              <TableCell>{r.status}</TableCell>
              <TableCell align="right">{r.updated}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
