"use client";

import {
  Box, Button, Chip, Dialog, DialogActions, DialogContent, DialogTitle,
  InputAdornment, MenuItem, Pagination, Stack, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
  Typography, Paper, Snackbar, Alert
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { useEffect, useMemo, useState } from "react";

type Row = {
  id: string;
  fullname?: string | null;
  email: string | null;
  phone: string | null;
  role: "admin" | "officer" | "teacher";
  created_at?: string | null;
};

const PAGE_SIZE = 8;

export default function AdminUsersTable() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [toast, setToast] = useState<{open:boolean; msg:string; sev:"success"|"error"}>({open:false,msg:"",sev:"success"});

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(r =>
      (r.fullname ?? "").toLowerCase().includes(term) ||
      (r.email ?? "").toLowerCase().includes(term) ||
      (r.phone ?? "").toLowerCase().includes(term)
    );
  }, [q, rows]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [q]);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users", { cache: "no-store" });
      if (!res.ok) throw new Error(await res.text());
      const data = (await res.json()) as Row[];
      setRows(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setToast({open:true, msg:e?.message ?? "โหลดข้อมูลไม่สำเร็จ", sev:"error"});
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function onAddClick() {
    setEditing(null);
    setOpen(true);
  }
  function onEditClick(row: Row) {
    setEditing(row);
    setOpen(true);
  }

  async function onDelete(row: Row) {
    if (!confirm(`ยืนยันลบผู้ใช้ ${row.email}?`)) return;
    try {
      const res = await fetch("/api/admin/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: row.id }),
      });
      if (!res.ok) throw new Error(await res.text());
      setToast({open:true, msg:"ลบสำเร็จ", sev:"success"});
      load();
    } catch (e: any) {
      setToast({open:true, msg:e?.message ?? "ลบไม่สำเร็จ", sev:"error"});
    }
  }

  function roleChipColor(role: Row["role"]) {
    switch (role) {
      case "admin": return "error";
      case "officer": return "warning";
      default: return "success"; // teacher
    }
  }

  return (
    <Paper elevation={0} sx={{ p: 2.5 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <TextField
          placeholder="ค้นหา: ชื่อ/อีเมล/เบอร์โทร"
          size="small"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          sx={{ width: 320 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />
        <Button variant="contained" startIcon={<PersonAddAltIcon />} onClick={onAddClick}>
          เพิ่มบุคลากร +
        </Button>
      </Stack>

      <TableContainer>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ชื่อ-สกุล</TableCell>
              <TableCell sx={{ fontWeight: 700 }} width={220}>Phone Number</TableCell>
              <TableCell sx={{ fontWeight: 700 }} width={300}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }} width={160} align="center">บทบาท</TableCell>
              <TableCell sx={{ fontWeight: 700 }} width={200} align="right">การจัดการ</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paged.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>
                  <Typography fontWeight={600}>{r.fullname || "-"}</Typography>
                </TableCell>
                <TableCell>{r.phone || "-"}</TableCell>
                <TableCell>{r.email || "-"}</TableCell>
                <TableCell align="center">
                  <Chip
                    label={r.role}
                    color={roleChipColor(r.role) as any}
                    variant="filled"
                    sx={{ textTransform: "none", fontWeight: 700, px: 0.5 }}
                  />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      startIcon={<EditIcon />}
                      onClick={() => onEditClick(r)}
                      sx={{ textTransform: "none", fontWeight: 700, minWidth: 82 }}
                    >
                      แก้ไข
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      startIcon={<DeleteIcon />}
                      onClick={() => onDelete(r)}
                      sx={{ textTransform: "none", fontWeight: 700, minWidth: 82 }}
                    >
                      ลบ
                    </Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}

            {!loading && paged.length === 0 && (
              <TableRow>
                <TableCell colSpan={5}>
                  <Box py={6} textAlign="center" color="text.secondary">
                    ไม่มีข้อมูล
                  </Box>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Stack direction="row" alignItems="center" justifyContent="space-between" p={2}>
          <Typography color="text.secondary" fontSize={13}>
            Showing data {filtered.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
            {" "}to{" "}
            {Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} entries
          </Typography>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, p) => setPage(p)}
            color="primary"
            shape="rounded"
            size="small"
          />
        </Stack>
      </TableContainer>

      <UserDialog
        open={open}
        onClose={() => setOpen(false)}
        editing={editing}
        onSaved={() => {
          setOpen(false);
          load();
        }}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
      >
        <Alert severity={toast.sev} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </Paper>
  );
}

type DialogProps = {
  open: boolean;
  onClose: () => void;
  editing: Row | null;
  onSaved: () => void;
};

function UserDialog({ open, onClose, editing, onSaved }: DialogProps) {
  const isEdit = !!editing;
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<Row["role"]>("teacher");
  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (open) {
      if (editing) {
        setFullname(editing.fullname || "");
        setEmail(editing.email || "");
        setPhone(editing.phone || "");
        setRole(editing.role);
        setPassword("");
      } else {
        setFullname("");
        setEmail("");
        setPhone("");
        setRole("teacher");
        setPassword("");
      }
    }
  }, [open, editing]);

  async function save() {
    setSaving(true);
    try {
      if (isEdit) {
        const res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: editing!.id,
            fullname,
            phone,
            role,
            // email / password ใส่ถ้าคุณอยากให้แก้จากหน้าฟอร์มนี้ด้วย
          }),
        });
        if (!res.ok) throw new Error(await res.text());
      } else {
        // NOTE: จาก API ชุดล่าสุด กำหนดให้ email, password, role ต้องมีค่า
        if (!email || !password) throw new Error("กรอก Email และ Password");
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, fullname, phone, role }),
        });
        if (!res.ok) throw new Error(await res.text());
      }
      onSaved();
    } catch (e: any) {
      alert(e?.message ?? "บันทึกไม่สำเร็จ");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle fontWeight={800}>
        {isEdit ? "แก้ไขข้อมูลผู้ใช้" : "เพิ่มบุคลากร"}
      </DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        <Stack spacing={2} mt={1.5}>
          <TextField
            label="ชื่อ-สกุล"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            fullWidth
          />
          {!isEdit && (
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              helperText="ต้องระบุเมื่อเพิ่มผู้ใช้"
            />
          )}
          {!isEdit && (
            <TextField
              label="รหัสผ่าน"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              helperText="ต้องระบุเมื่อเพิ่มผู้ใช้"
            />
          )}
          <TextField
            label="เบอร์โทร"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
          />
          <TextField
            label="ตำแหน่ง/บทบาท"
            select
            value={role}
            onChange={(e) => setRole(e.target.value as Row["role"])}
            fullWidth
          >
            <MenuItem value="teacher">teacher</MenuItem>
            <MenuItem value="officer">officer</MenuItem>
            <MenuItem value="admin">admin</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={saving}>ยกเลิก</Button>
        <Button onClick={save} variant="contained" disabled={saving}>
          {isEdit ? "บันทึก" : "เพิ่ม"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
