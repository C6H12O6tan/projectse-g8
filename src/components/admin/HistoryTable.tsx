"use client";

import * as React from "react";
import {
  Box, Stack, TextField, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Chip
} from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import dayjs from "dayjs";

type Row = {
  id: number;
  name: string;
  uid: string;
  address: string;
  amount?: number | null;
  created_at?: string | null;
};

export default function HistoryTable({ rows }: { rows: Row[] }) {
  const [q, setQ] = React.useState("");

  const filtered = React.useMemo(() => {
    if (!q.trim()) return rows;
    const s = q.toLowerCase();
    return rows.filter(r =>
      r.name.toLowerCase().includes(s) ||
      r.uid.toLowerCase().includes(s) ||
      r.address.toLowerCase().includes(s)
    );
  }, [rows, q]);

  const onDelete = (id: number) => alert(`ลบรายการ: ${id}`);

  return (
    <Box>
      <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 2 }}>
        <TextField
          size="small"
          placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ minWidth: 360 }}
        />
      </Stack>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 700 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>UID</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Address</TableCell>
            <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
            <TableCell align="right" sx={{ fontWeight: 700 }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtered.length === 0 ? (
            <TableRow><TableCell colSpan={5}>ไม่มีประวัติการใช้งาน</TableCell></TableRow>
          ) : filtered.map(r => (
            <TableRow key={r.id} hover>
              <TableCell>
                <Stack spacing={0.25}>
                  <Box sx={{ fontWeight: 700 }}>{r.name}</Box>
                  <Box sx={{ color: "text.secondary", fontSize: 12 }}>
                    {dayjs(r.created_at ?? undefined).format("DD/MM/YYYY HH:mm")}
                  </Box>
                </Stack>
              </TableCell>
              <TableCell>{r.uid}</TableCell>
              <TableCell>{r.address}</TableCell>
              <TableCell>
                {r.amount != null ? (
                  <Chip label={r.amount} size="small" />
                ) : "-"}
              </TableCell>
              <TableCell align="right">
                <IconButton color="error" onClick={() => onDelete(r.id)}>
                  <DeleteOutlineIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
