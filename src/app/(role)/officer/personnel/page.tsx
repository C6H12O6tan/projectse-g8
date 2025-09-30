"use client";

import { useEffect, useMemo, useState } from "react";
import TopBarOfficer from "@/components/TopBarOfficer";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import AddRounded from "@mui/icons-material/AddRounded";

type Role = "admin" | "officer" | "teacher" | "external";
type UserRow = {
  id: string;
  email: string;
  fullname?: string | null;
  phone?: string | null;
  role: Role;
};

export default function OfficerPersonnelPage() {
  const [items, setItems] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // search + paging
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  // delete dialog
  const [del, setDel] = useState<UserRow | null>(null);

  // ------- API helpers (ใช้ชุดเดียวกับ admin) -------
  const authHeaders = async (): Promise<Record<string, string>> => {
    const headers: Record<string, string> = {};
    try {
      const { supabaseBrowser } = await import("@/lib/supabaseBrowser");
      const sb = supabaseBrowser();
      const { data: s } = await sb.auth.getSession();
      const token = s?.session?.access_token;
      if (token) headers["Authorization"] = `Bearer ${token}`;
    } catch {
      /* no-op */
    }
    return headers;
  };

  // ✅ กรอง “เฉพาะอาจารย์” ตั้งแต่โหลดข้อมูล
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = await authHeaders();
      const r = await fetch("/api/admin/users", {
        headers,
        cache: "no-store",
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || `HTTP ${r.status}`);
      }
      const j = await r.json();
      const arr: UserRow[] = (j?.items ?? j) as UserRow[];
      setItems((arr ?? []).filter((u) => u.role === "teacher"));
    } catch (e: any) {
      setError(e.message || "โหลดข้อมูลไม่สำเร็จ");
    } finally {
      setLoading(false);
    }
  };

  const doDelete = async (id: string) => {
    try {
      const headers = await authHeaders();
      const r = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE",
        headers,
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || "ลบไม่สำเร็จ");
      }
      setSnack("ลบผู้ใช้งานแล้ว");
      setItems((s) => s.filter((x) => x.id !== id));
    } catch (e: any) {
      setError(e.message || "ลบไม่สำเร็จ");
    } finally {
      setDel(null);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // filter + paging (ทำบนชุดที่เป็นอาจารย์อยู่แล้ว)
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    if (!kw) return items;
    return items.filter((u) =>
      [u.fullname, u.email, u.phone].some((v) =>
        (v ?? "").toString().toLowerCase().includes(kw)
      )
    );
  }, [items, q]);

  const paged = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  // reset page when query/limit changes
  useEffect(() => {
    setPage(1);
  }, [q, limit]);

  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        {/* Header + actions */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Typography variant="h5" fontWeight={900}>
            บุคลากรสายวิชาการ
          </Typography>
          <Stack direction="row" gap={1} alignItems="center">
            <TextField
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="ค้นหา: ชื่อ อีเมล เบอร์โทร…"
              size="small"
              sx={{
                minWidth: { xs: 220, sm: 300 },
                "& .MuiOutlinedInput-root": { borderRadius: 999 },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRounded fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              href="/officer/personnel/new" // ใช้ฟอร์มเดียวกับแอดมินได้เลย
              variant="contained"
              startIcon={<AddRounded />}
              sx={{ borderRadius: 999 }}
            >
              เพิ่มบุคลากร
            </Button>
          </Stack>
        </Stack>

        <Paper variant="outlined" sx={{ borderRadius: 3 }}>
          <Box
            sx={{
              px: 2,
              py: 1.5,
              display: "flex",
              gap: 1,
              alignItems: "center",
            }}
          >
            <Typography variant="body2" sx={{ opacity: 0.75, flex: 1 }}>
              Showing data{" "}
              {filtered.length ? (page - 1) * limit + 1 : 0} to{" "}
              {Math.min(page * limit, filtered.length)} of {filtered.length} entries
            </Typography>
            <Select
              size="small"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              {[10, 20, 50].map((n) => (
                <MenuItem key={n} value={n}>
                  {n}/page
                </MenuItem>
              ))}
            </Select>
          </Box>

          {/* Table */}
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 720 }}>
              <TableHead>
                <TableRow>
                  <TableCell>ชื่อ-สกุล</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="right">จัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress size={22} sx={{ mr: 1 }} /> กำลังโหลด…
                    </TableCell>
                  </TableRow>
                ) : paged.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      ไม่พบข้อมูล
                    </TableCell>
                  </TableRow>
                ) : (
                  paged.map((u) => (
                    <TableRow key={u.id} hover>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {u.fullname || "-"}
                      </TableCell>
                      <TableCell>{u.phone || "-"}</TableCell>
                      <TableCell>{u.email}</TableCell>
                      <TableCell>
                        <Chip
                          size="small"
                          label={u.role}
                          color="success"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="แก้ไข">
                          <IconButton
                            size="small"
                            href={`/admin/users/${u.id}`} // ใช้หน้าแก้ไขของแอดมิน
                          >
                            <EditRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="ลบ">
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => setDel(u)}
                          >
                            <DeleteOutlineRounded fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </Box>

          {/* pagination */}
          <Stack direction="row" justifyContent="center" sx={{ py: 1.5 }}>
            <Button
              size="small"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ก่อนหน้า
            </Button>
            <Box sx={{ px: 1.5, display: "grid", placeItems: "center" }}>
              {page}
            </Box>
            <Button
              size="small"
              disabled={page * limit >= filtered.length}
              onClick={() => setPage((p) => p + 1)}
            >
              ถัดไป
            </Button>
          </Stack>
        </Paper>
      </Container>

      {/* delete confirm */}
      <Dialog open={!!del} onClose={() => setDel(null)}>
        <DialogTitle>ลบบุคลากร</DialogTitle>
        <DialogContent>
          ต้องการลบ <b>{del?.fullname || del?.email}</b> ออกจากระบบใช่หรือไม่
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDel(null)}>ยกเลิก</Button>
          <Button
            color="error"
            variant="contained"
            onClick={() => del && doDelete(del.id)}
          >
            ลบ
          </Button>
        </DialogActions>
      </Dialog>

      {error && (
        <Snackbar
          open
          onClose={() => setError(null)}
          autoHideDuration={3500}
          message={error}
        />
      )}
      <Snackbar
        open={!!snack}
        onClose={() => setSnack(null)}
        autoHideDuration={2600}
        message={snack || ""}
      />
    </main>
  );
}
