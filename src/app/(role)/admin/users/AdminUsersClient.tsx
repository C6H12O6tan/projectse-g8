"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, MenuItem, Paper, Stack, TextField, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

type Role = "admin" | "officer" | "teacher";
type Row = { id: string; email: string | null; fullname: string | null; phone: string | null; role: Role | null; created_at?: string };

export default function AdminUsersClient() {
  const [rows, setRows] = useState<Row[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);

  const [form, setForm] = useState({
    email: "", password: "", fullname: "", phone: "", role: "teacher" as Role,
  });

  const filtered = useMemo(() => {
    if (!q.trim()) return rows;
    const k = q.toLowerCase();
    return rows.filter(r =>
      (r.fullname ?? "").toLowerCase().includes(k) ||
      (r.email ?? "").toLowerCase().includes(k) ||
      (r.role ?? "").toLowerCase().includes(k)
    );
  }, [q, rows]);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/admin/users", { cache: "no-store" });
    const data = await res.json();
    setRows(Array.isArray(data) ? data : []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null);
    setForm({ email: "", password: "", fullname: "", phone: "", role: "teacher" });
    setOpen(true);
  }
  function openEdit(row: Row) {
    setEditing(row);
    setForm({
      email: row.email ?? "",
      password: "",
      fullname: row.fullname ?? "",
      phone: row.phone ?? "",
      role: (row.role ?? "teacher") as Role,
    });
    setOpen(true);
  }
  async function handleSubmit() {
    try {
      const body: any = { ...form };
      if (editing) {
        body.id = editing.id;
        if (!body.password) delete body.password;
        const res = await fetch("/api/admin/users", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || "update failed");
      } else {
        if (!body.email || !body.password) {
          alert("กรอก Email และ Password");
          return;
        }
        const res = await fetch("/api/admin/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const j = await res.json();
        if (!res.ok) throw new Error(j.error || "create failed");
      }
      setOpen(false);
      await load();
    } catch (e: any) {
      alert(e.message || "error");
    }
  }
  async function handleDelete(row: Row) {
    if (!confirm(`ลบผู้ใช้ ${row.fullname || row.email || row.id}?`)) return;
    const url = `/api/admin/users?id=${encodeURIComponent(row.id)}`;
    const res = await fetch(url, { method: "DELETE" });
    const j = await res.json();
    if (!res.ok) {
      alert(j.error || "delete failed");
      return;
    }
    await load();
  }

  return (
    <Stack spacing={2} sx={{ maxWidth: 1050, mx: "auto", p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" fontWeight={800}>บัญชีผู้ใช้งาน</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={openCreate}>
          เพิ่มบุคลากร +
        </Button>
      </Stack>

      <TextField
        placeholder="ค้นหา: ชื่อ/อีเมล/บทบาท"
        value={q}
        onChange={e => setQ(e.target.value)}
        size="small"
        sx={{ width: 360 }}
      />

      <Stack spacing={1.25}>
        {loading && <Typography color="text.secondary">กำลังโหลด…</Typography>}
        {!loading && filtered.length === 0 && (
          <Typography color="text.secondary">ไม่มีข้อมูลผู้ใช้งาน</Typography>
        )}

        {filtered.map(r => (
          <Paper key={r.id} sx={{ p: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography fontWeight={800}>{r.fullname || "-"}</Typography>
              <Typography color="text.secondary" fontSize={14}>{r.email || "-"}</Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <Typography sx={{ px: 1.25, py: 0.5, borderRadius: 1, bgcolor: "success.light", color: "success.contrastText" }}>
                {r.role || "-"}
              </Typography>
              <IconButton onClick={() => openEdit(r)}><EditIcon /></IconButton>
              <IconButton color="error" onClick={() => handleDelete(r)}><DeleteIcon /></IconButton>
            </Stack>
          </Paper>
        ))}
      </Stack>

      {/* Dialog เพิ่ม/แก้ไข */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "แก้ไขผู้ใช้" : "เพิ่มบุคลากร"}</DialogTitle>
        <DialogContent>
          <Stack spacing={1.5} sx={{ pt: 1 }}>
            <TextField
              label="ชื่อ-นามสกุล"
              value={form.fullname}
              onChange={e => setForm(v => ({ ...v, fullname: e.target.value }))}
              fullWidth
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                label="อีเมล"
                value={form.email}
                onChange={e => setForm(v => ({ ...v, email: e.target.value }))}
                fullWidth
              />
              <TextField
                label={editing ? "ตั้งรหัสผ่านใหม่ (ไม่บังคับ)" : "รหัสผ่าน"}
                type="password"
                value={form.password}
                onChange={e => setForm(v => ({ ...v, password: e.target.value }))}
                fullWidth
              />
            </Stack>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <TextField
                label="เบอร์โทรศัพท์"
                value={form.phone}
                onChange={e => setForm(v => ({ ...v, phone: e.target.value }))}
                fullWidth
              />
              <TextField
                label="ตำแหน่ง/บทบาท"
                select
                value={form.role}
                onChange={e => setForm(v => ({ ...v, role: e.target.value as Role }))}
                fullWidth
              >
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="officer">Officer</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
              </TextField>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>ยกเลิก</Button>
          <Button variant="contained" onClick={handleSubmit}>{editing ? "บันทึก" : "เพิ่ม"}</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
