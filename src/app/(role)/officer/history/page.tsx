"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Tooltip,
  Chip,
  Snackbar,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Select,
  Button,
} from "@mui/material";
import SearchRounded from "@mui/icons-material/SearchRounded";
import EditRounded from "@mui/icons-material/EditRounded";
import DeleteOutlineRounded from "@mui/icons-material/DeleteOutlineRounded";
import VisibilityRounded from "@mui/icons-material/VisibilityRounded";
import MoreVertRounded from "@mui/icons-material/MoreVertRounded";

import TopBarOfficer from "@/components/TopBarOfficer";

/** ---------- Types ---------- */
type HistoryRow = {
  id: string | number;   // UID
  name: string;
  address?: string | null;
  scno?: string | null;  // สมมุติเป็นเลขเอกสาร/เลขคำขอ
  amount?: number | null;
  created_at?: string | null;
};

/** ---------- Page ---------- */
export default function OfficerHistoryPage() {
  const [items, setItems] = useState<HistoryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [snack, setSnack] = useState<string | null>(null);

  // ค้นหา/แบ่งหน้า/เรียง
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof HistoryRow>("id");
  const [sortAsc, setSortAsc] = useState(true);

  // โหลดด้วย token (เหมือนฝั่งแอดมิน)
  const authHeaders = async () => {
    const { supabaseBrowser } = await import("@/lib/supabaseBrowser");
    const sb = supabaseBrowser();
    const { data } = await sb.auth.getSession();
    const token = data.session?.access_token;
    const h: Record<string, string> = {};
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
  };

  const loadHistory = async () => {
    setLoading(true);
    setErr(null);
    try {
      const headers = await authHeaders();
      // ทำให้ยืดหยุ่น: ถ้ามี /api/officer/history ใช้อันนั้น
      // ถ้าไม่มี จะ fallback ไป /api/admin/history (รีใช้ของเดิม)
      const tryUrls = ["/api/officer/history", "/api/admin/history"];

      let ok = false;
      for (const u of tryUrls) {
        const r = await fetch(u, { headers, cache: "no-store" });
        if (r.ok) {
          const j = await r.json();
          const arr: HistoryRow[] = (j?.items ?? j) as HistoryRow[];
          setItems(arr ?? []);
          ok = true;
          break;
        }
      }
      if (!ok) throw new Error("ไม่พบ API history ที่ใช้ได้");
    } catch (e: any) {
      setErr(e.message || "โหลดข้อมูลไม่สำเร็จ");
      // มี mock เผื่อไม่มี API ให้เห็นหน้าทันที
      setItems([
        { id: 112, name: "Mithlesh Kumar Singh", address: "Kirtipur, Kathmandu", scno: "12356B", amount: 987659326 },
        { id: 113, name: "Suron Maharjan", address: "Natelto, Lalitpur", scno: "86523B", amount: 987659326 },
        { id: 114, name: "Sandesh Bajracharya", address: "Bhinchhebahal, Lalitpur", scno: "78365D", amount: 987659326 },
        { id: 115, name: "Subin Sedhai", address: "Baneswhor, Kathmandu", scno: "863265F", amount: 987659326 },
        { id: 116, name: "Wonjala Joshi", address: "Bhaisepati, Lalitpur", scno: "459872B", amount: 987659326 },
        { id: 117, name: "Numa Limbu", address: "Sampang Chowk,Dharan", scno: "742562A", amount: 987659326 },
        { id: 118, name: "Nimesh Sthapit", address: "Newroad, Pokhara", scno: "74123B", amount: 987659326 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  // ค้นหา + เรียง
  const filtered = useMemo(() => {
    const kw = q.trim().toLowerCase();
    let arr = !kw
      ? items
      : items.filter((r) =>
          [r.id, r.name, r.address, r.scno, r.amount]
            .map((v) => (v ?? "").toString().toLowerCase())
            .some((s) => s.includes(kw))
        );
    arr = [...arr].sort((a, b) => {
      const va = (a[sortKey] ?? "") as any;
      const vb = (b[sortKey] ?? "") as any;
      if (va < vb) return sortAsc ? -1 : 1;
      if (va > vb) return sortAsc ? 1 : -1;
      return 0;
    });
    return arr;
  }, [items, q, sortKey, sortAsc]);

  const paged = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  // เปลี่ยนคอลัมน์เรียง
  const toggleSort = (key: keyof HistoryRow) => {
    if (key === sortKey) setSortAsc((v) => !v);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  // handlers (แค่โชว์ว่า “ทำอะไรได้บ้าง”)
  const onView = (row: HistoryRow) => setSnack(`ดูรายละเอียด UID ${row.id}`);
  const onEdit = (row: HistoryRow) => setSnack(`แก้ไข UID ${row.id}`);
  const onDelete = async (row: HistoryRow) => {
    // ตัวอย่างฝั่ง client (สามารถเปลี่ยนเป็นเรียก API จริงได้)
    setItems((s) => s.filter((x) => x.id !== row.id));
    setSnack(`ลบรายการ UID ${row.id} แล้ว`);
  };

  // รีเซ็ตหน้าเมื่อ limit/q เปลี่ยน
  useEffect(() => {
    setPage(1);
  }, [q, limit]);

  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: 3 }}>
        {/* หัวเรื่อง + ค้นหา */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Typography variant="h6" fontWeight={900}>ประวัติการใช้งาน</Typography>

          <TextField
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            size="small"
            sx={{
              minWidth: { xs: 220, sm: 360 },
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
        </Stack>

        <Paper variant="outlined" sx={{ borderRadius: 3, overflow: "hidden" }}>
          {/* แถบบนของตาราง */}
          <Box sx={{ px: 2, py: 1.5, display: "flex", alignItems: "center", gap: 1 }}>
            <Typography variant="body2" sx={{ opacity: 0.75, flex: 1 }}>
              Showing data {filtered.length ? ( (page-1)*limit + 1 ) : 0} to {Math.min(page*limit, filtered.length)} of {filtered.length} entries
            </Typography>
            <Select
              size="small"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
              sx={{ minWidth: 120 }}
            >
              {[10, 20, 50, 100].map((n) => (
                <MenuItem key={n} value={n}>{n}/page</MenuItem>
              ))}
            </Select>
          </Box>

          {/* ตาราง */}
          <Box sx={{ overflowX: "auto" }}>
            <Table sx={{ minWidth: 900 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => toggleSort("id")}>
                    UID {sortKey === "id" ? (sortAsc ? "▲" : "▼") : ""}
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => toggleSort("name")}>
                    Name {sortKey === "name" ? (sortAsc ? "▲" : "▼") : ""}
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => toggleSort("address")}>
                    Address {sortKey === "address" ? (sortAsc ? "▲" : "▼") : ""}
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => toggleSort("scno")}>
                    SCNO {sortKey === "scno" ? (sortAsc ? "▲" : "▼") : ""}
                  </TableCell>
                  <TableCell sx={{ cursor: "pointer" }} onClick={() => toggleSort("amount")}>
                    Amount {sortKey === "amount" ? (sortAsc ? "▲" : "▼") : ""}
                  </TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <CircularProgress size={22} sx={{ mr: 1 }} /> กำลังโหลด…
                    </TableCell>
                  </TableRow>
                ) : paged.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">ไม่พบข้อมูล</TableCell>
                  </TableRow>
                ) : (
                  paged.map((r) => (
                    <TableRow key={r.id} hover>
                      <TableCell sx={{ fontWeight: 700 }}>{r.id}</TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography sx={{ fontWeight: 600 }}>{r.name}</Typography>
                          {r.created_at && (
                            <Chip size="small" label={new Date(r.created_at).toLocaleDateString()} />
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell>{r.address || "-"}</TableCell>
                      <TableCell>{r.scno || "-"}</TableCell>
                      <TableCell>{r.amount?.toLocaleString() || "-"}</TableCell>
                      <TableCell align="right" sx={{ whiteSpace: "nowrap" }}>
                        <Tooltip title="ลบ">
                          <IconButton size="small" color="error" onClick={() => onDelete(r)}>
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

          {/* แถบล่าง + หน้า */}
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1.5 }}>
            <Button
              size="small"
              startIcon={<MoreVertRounded />}
              sx={{ visibility: "hidden" }}
            >
              Extra
            </Button>

            <Stack direction="row" spacing={0.5} alignItems="center">
              <Button size="small" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                ก่อนหน้า
              </Button>
              <Box sx={{ px: 1.25 }}>{page}</Box>
              <Button
                size="small"
                disabled={page * limit >= filtered.length}
                onClick={() => setPage((p) => p + 1)}
              >
                ถัดไป
              </Button>
            </Stack>
          </Stack>
        </Paper>
      </Container>

      <Snackbar open={!!snack} autoHideDuration={2200} onClose={() => setSnack(null)} message={snack || ""} />
      {err && <Snackbar open autoHideDuration={3200} onClose={() => setErr(null)} message={err} />}
    </main>
  );
}
