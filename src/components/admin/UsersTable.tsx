"use client";

import * as React from "react";
import {
  Box, Stack, TextField, Button, Table, TableHead, TableBody, TableRow, TableCell,
  IconButton, Pagination, Divider
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Row = {
  id: string;
  role?: string | null;
  display_name?: string | null;
  email?: string | null;
  phone?: string | null;
  created_at?: string | null;
};

export default function UsersTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = React.useState("");
  const [page, setPage] = React.useState(1);
  const pageSize = 10;

  const filtered = React.useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter(r =>
      (r.display_name ?? "").toLowerCase().includes(s) ||
      (r.email ?? "").toLowerCase().includes(s) ||
      (r.role ?? "").toLowerCase().includes(s)
    );
  }, [rows, q]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  // TODO: wire up actions
  const onDelete = (id: string) => alert(`ลบผู้ใช้: ${id}`);
  const onEdit = (id: string) => alert(`แก้ไขผู้ใช้: ${id}`);

  React.useEffect(() => { if (page > pageCount) setPage(1); }, [pageCount, page]);

  return (
    <Box>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="ค้นหา: ชื่อ, อีเมล หรือบทบาท"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ minWidth: 320 }}
        />
        <Box sx={{ flex: 1 }} />
        <Button variant="contained">เพิ่มบุคลากร +</Button>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>ชื่อ-สกุล</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Phone Number</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700, width: 160 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pageRows.length === 0 ? (
            <TableRow><TableCell colSpan={4}>ไม่มีข้อมูลผู้ใช้งาน</TableCell></TableRow>
          ) : pageRows.map((r) => (
            <TableRow key={r.id} hover>
              <TableCell>{r.display_name || r.role || "-"}</TableCell>
              <TableCell>{r.phone || "-"}</TableCell>
              <TableCell>{r.email || "-"}</TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} justifyContent="flex-end">
                  <Button
                    size="small"
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => onDelete(r.id)}
                  >
                    ลบ
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    startIcon={<EditOutlinedIcon />}
                    onClick={() => onEdit(r.id)}
                  >
                    แก้ไข
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Stack alignItems="flex-end" sx={{ mt: 2 }}>
        <Pagination page={page} count={pageCount} onChange={(_, p) => setPage(p)} />
      </Stack>
    </Box>
  );
}
