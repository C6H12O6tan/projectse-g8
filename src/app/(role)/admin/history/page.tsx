'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRole } from '@/lib/useRole';
import {
  Box, Button, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, IconButton, Snackbar, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip, Typography, Paper
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import SearchIcon from '@mui/icons-material/Search';

type AuditLog = {
  id: string;
  action?: string | null;
  table_name?: string | null;
  record_id?: string | null;
  actor_id?: string | null;
  meta?: any;
  created_at?: string | null;
};

export default function AdminHistoryPage() {
  // ✅ ใช้ hook กลาง ตรวจสิทธิ์พร้อมแนบโทเคนตอนเรียก API role
  const { data: roleData, loading: loadingRole } = useRole();
  const role = roleData?.role ?? null;

  // data
  const [items, setItems] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // ui
  const [q, setQ] = useState('');
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [snack, setSnack] = useState<string | null>(null);

  // โหลดข้อมูล (แนบ Bearer ถ้ามี)
  const load = async () => {
    setLoading(true);
    setErr(null);
    try {
      let headers: Record<string, string> = {};
      try {
        const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
        const sb = supabaseBrowser();
        const { data: s } = await sb.auth.getSession();
        const token = s?.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch { /* no-op */ }

      const r = await fetch('/api/admin/history', { cache: 'no-store', headers });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || `HTTP ${r.status}`);
      }
      const j = await r.json();
      setItems(j.items || []);
    } catch (e: any) {
      setErr(e.message || 'Load error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (role === 'admin') load();
  }, [role]);

  const filtered = useMemo(() => {
    if (!q.trim()) return items;
    const s = q.toLowerCase();
    return items.filter(it =>
      (it.id || '').toLowerCase().includes(s) ||
      (it.table_name || '').toLowerCase().includes(s) ||
      (it.action || '').toLowerCase().includes(s) ||
      (it.record_id || '').toLowerCase().includes(s) ||
      (it.actor_id || '').toLowerCase().includes(s) ||
      JSON.stringify(it.meta || {}).toLowerCase().includes(s)
    );
  }, [items, q]);

  const onDelete = async (id: string) => {
    try {
      let headers: Record<string, string> = {};
      try {
        const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
        const sb = supabaseBrowser();
        const { data: s } = await sb.auth.getSession();
        const token = s?.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch { /* no-op */ }

      const r = await fetch(`/api/admin/history?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers,
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || `HTTP ${r.status}`);
      }
      setItems(prev => prev.filter(x => x.id !== id));
      setSnack('ลบรายการแล้ว');
    } catch (e: any) {
      setSnack(`ลบไม่สำเร็จ: ${e.message || 'error'}`);
    } finally {
      setConfirmId(null);
    }
  };

  // role screens
  if (loadingRole) {
    return (
      <Box className="container" sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>กำลังตรวจสอบสิทธิ์…</Typography>
      </Box>
    );
  }
  if (role !== 'admin') {
    return (
      <Box className="container" sx={{ py: 6, textAlign: 'center' }}>
        <Typography variant="h5" fontWeight={700}>เฉพาะผู้ดูแลระบบเท่านั้น</Typography>
        <Typography variant="body2" sx={{ mt: 1, opacity: 0.8 }}>
          กรุณาเข้าสู่ระบบด้วยบัญชีแอดมิน หรือขอสิทธิ์จากผู้ดูแลระบบ
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="container" sx={{ py: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Typography variant="h5" fontWeight={700}>ประวัติระบบ (Audit Logs)</Typography>
        <Tooltip title="รีเฟรช">
          <span>
            <IconButton onClick={load} disabled={loading}>
              <RefreshIcon />
            </IconButton>
          </span>
        </Tooltip>
        <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
          <TextField
            size="small"
            placeholder="ค้นหา (action, table, id, meta)"
            value={q}
            onChange={e => setQ(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon style={{ marginRight: 8 }} /> as any }}
          />
        </Box>
      </Box>

      <Paper elevation={0} sx={{ overflow: 'hidden', borderRadius: 2 }}>
        {err ? (
          <Box sx={{ p: 3, color: 'error.main' }}>
            <Typography variant="body2">โหลดข้อมูลไม่สำเร็จ: {err}</Typography>
          </Box>
        ) : loading ? (
          <Box sx={{ p: 3, display: 'grid', placeItems: 'center' }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell width={220}>เวลา</TableCell>
                  <TableCell>ตาราง</TableCell>
                  <TableCell>การกระทำ</TableCell>
                  <TableCell>บันทึก ID</TableCell>
                  <TableCell>ผู้กระทำ</TableCell>
                  <TableCell>รายละเอียด</TableCell>
                  <TableCell align="right" width={72}>ลบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={{ py: 6, opacity: 0.7 }}>
                      ไม่มีข้อมูล
                    </TableCell>
                  </TableRow>
                ) : filtered.map(row => (
                  <TableRow key={row.id} hover>
                    <TableCell>
                      {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{row.table_name || '-'}</TableCell>
                    <TableCell>{row.action || '-'}</TableCell>
                    <TableCell>{row.record_id || '-'}</TableCell>
                    <TableCell>{row.actor_id || '-'}</TableCell>
                    <TableCell sx={{ maxWidth: 360 }}>
                      <code style={{ fontSize: 12 }}>
                        {row.meta ? JSON.stringify(row.meta) : '-'}
                      </code>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="ลบ">
                        <span>
                          <IconButton color="error" onClick={() => setConfirmId(row.id)}>
                            <DeleteIcon />
                          </IconButton>
                        </span>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>

      {/* Confirm Dialog */}
      <Dialog open={!!confirmId} onClose={() => setConfirmId(null)}>
        <DialogTitle>ยืนยันการลบ</DialogTitle>
        <DialogContent>
          <DialogContentText>ต้องการลบประวัติรายการนี้หรือไม่?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmId(null)}>ยกเลิก</Button>
          <Button color="error" onClick={() => confirmId && onDelete(confirmId)}>ลบ</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={!!snack}
        onClose={() => setSnack(null)}
        autoHideDuration={2500}
        message={snack || ''}
      />
    </Box>
  );
}
