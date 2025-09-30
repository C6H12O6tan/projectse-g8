'use client';

import { useEffect, useState } from 'react';
import {
  Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, Snackbar,
  TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useRole } from '@/lib/useRole';
import TopBarOfficer from '@/components/TopBarOfficer';

type Role = 'admin' | 'officer' | 'teacher' | 'external';
type RoleResp = { user: { id: string; email: string } | null; role: Role | null };

type Profile = {
  id?: string;
  email?: string | null;
  display_name?: string | null;
  fullname?: string | null;
  phone?: string | null;
  role?: Role | null;
};

export default function OfficerSettingsPage() {
  const router = useRouter();
  const search = useSearchParams();

  // ✅ ใช้ hook กลาง
  const { data: roleData, loading: loadingRole } = useRole();
  const role = roleData?.role ?? null;
  const roleResp: RoleResp = { user: roleData?.user ?? null, role };

  // profile state
  const [profile, setProfile] = useState<Profile | null>(null);
  const [form, setForm] = useState<Profile>({});
  const [savingProfile, setSavingProfile] = useState(false);

  // password state
  const [pw, setPw] = useState({ current: '', next: '', confirm: '' });
  const [savingPw, setSavingPw] = useState(false);

  // ui misc
  const [snack, setSnack] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // confirm gates
  const [editing, setEditing] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(true);

  // ⬇️ ให้เฉพาะ officer เข้า
  const canAccess = (r: Role | null) => r === 'officer';

  // ถ้ามี query ?edit=1 ให้ข้ามการยืนยัน
  useEffect(() => {
    const q = search.get('edit');
    if (q === '1') {
      setConfirmOpen(false);
      setEditing(true);
    }
  }, [search]);

  // --- fetch own profile (แนบ Bearer)
  const loadProfile = async () => {
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

      const r = await fetch('/api/self/profile', { cache: 'no-store', headers });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || `HTTP ${r.status}`);
      }
      const j: Profile = await r.json();
      setProfile(j);
      setForm({
        display_name: j?.display_name ?? '',
        fullname: j?.fullname ?? '',
        phone: j?.phone ?? '',
      });
    } catch (e: any) {
      setErr(e.message || 'โหลดข้อมูลไม่สำเร็จ');
    }
  };

  useEffect(() => {
    if (canAccess(role)) loadProfile();
  }, [role]);

  // --- save profile (แนบ Bearer)
  const onSaveProfile = async () => {
    setSavingProfile(true);
    setErr(null);
    try {
      let headers: Record<string, string> = { 'Content-Type': 'application/json' };
      try {
        const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
        const sb = supabaseBrowser();
        const { data: s } = await sb.auth.getSession();
        const token = s?.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch { /* no-op */ }

      const payload: any = {
        display_name: form.display_name?.trim() || undefined,
        fullname: form.fullname?.trim() || undefined,
        phone: form.phone?.trim() || undefined,
      };
      const r = await fetch('/api/self/profile', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || 'บันทึกไม่สำเร็จ');
      }
      const j = await r.json();
      setProfile(j);
      setSnack('บันทึกโปรไฟล์สำเร็จ');
      setEditing(false);
    } catch (e: any) {
      setErr(e.message || 'บันทึกไม่สำเร็จ');
    } finally {
      setSavingProfile(false);
    }
  };

  // --- change password (แนบ Bearer)
  const onChangePassword = async () => {
    if (!pw.next || pw.next.length < 8) {
      setSnack('รหัสผ่านใหม่อย่างน้อย 8 ตัวอักษร');
      return;
    }
    if (pw.next !== pw.confirm) {
      setSnack('รหัสผ่านใหม่และยืนยันไม่ตรงกัน');
      return;
    }
    setSavingPw(true);
    setErr(null);
    try {
      let headers: Record<string, string> = { 'Content-Type': 'application/json' };
      try {
        const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
        const sb = supabaseBrowser();
        const { data: s } = await sb.auth.getSession();
        const token = s?.session?.access_token;
        if (token) headers.Authorization = `Bearer ${token}`;
      } catch { /* no-op */ }

      const r = await fetch('/api/self/password', {
        method: 'POST',
        headers,
        body: JSON.stringify({ current: pw.current, next: pw.next }),
      });
      if (!r.ok) {
        const j = await r.json().catch(() => ({}));
        throw new Error(j?.error || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
      }
      setSnack('เปลี่ยนรหัสผ่านสำเร็จ');
      setPw({ current: '', next: '', confirm: '' });
    } catch (e: any) {
      setErr(e.message || 'เปลี่ยนรหัสผ่านไม่สำเร็จ');
    } finally {
      setSavingPw(false);
    }
  };

  // --- screens
  if (loadingRole) {
    return (
      <>
        <TopBarOfficer />
        <Box className="container" sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
          <CircularProgress />
          <Typography variant="body2" sx={{ mt: 2 }}>กำลังตรวจสอบสิทธิ์…</Typography>
        </Box>
      </>
    );
  }

  if (!canAccess(role)) {
    return (
      <>
        <TopBarOfficer />
        <Box className="container" sx={{ py: 6, textAlign: 'center' }}>
          <Typography variant="h5" fontWeight={700}>สิทธิ์ไม่เพียงพอ</Typography>
          <Typography variant="body2" sx={{ mt: 1, opacity: .8 }}>
            เฉพาะผู้ใช้ที่เข้าสู่ระบบ (Officer) เท่านั้น
          </Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <TopBarOfficer />
      <Box className="container" sx={{ py: 3, display: 'grid', gap: 2 }}>
        <Typography variant="h5" fontWeight={700}>ตั้งค่า (Settings)</Typography>

        {err && <Typography variant="body2" color="error" sx={{ mt: 1 }}>{err}</Typography>}

        <Grid container spacing={2}>
          {/* Profile Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
              <CardHeader title="ข้อมูลโปรไฟล์" />
              <CardContent>
                {!editing ? (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <TextField label="อีเมล" value={roleResp.user?.email || profile?.email || ''} InputProps={{ readOnly: true }} fullWidth />
                    <TextField label="ชื่อที่แสดง" value={profile?.display_name ?? ''} InputProps={{ readOnly: true }} fullWidth />
                    <TextField label="ชื่อ-นามสกุล" value={profile?.fullname ?? ''} InputProps={{ readOnly: true }} fullWidth />
                    <TextField label="เบอร์โทรศัพท์" value={profile?.phone ?? ''} InputProps={{ readOnly: true }} fullWidth />
                    <TextField label="บทบาท" value={roleResp.role || profile?.role || 'external'} InputProps={{ readOnly: true }} fullWidth />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button variant="contained" onClick={() => setConfirmOpen(true)}>เริ่มแก้ไข</Button>
                    </Box>
                  </Box>
                ) : (
                  <Box sx={{ display: 'grid', gap: 2 }}>
                    <TextField label="อีเมล (อ่านอย่างเดียว)" value={roleResp.user?.email || profile?.email || ''} InputProps={{ readOnly: true }} fullWidth />
                    <TextField label="ชื่อที่แสดง (Display name)" value={form.display_name ?? ''} onChange={e => setForm(s => ({ ...s, display_name: e.target.value }))} fullWidth />
                    <TextField label="ชื่อ-นามสกุล (Fullname)" value={form.fullname ?? ''} onChange={e => setForm(s => ({ ...s, fullname: e.target.value }))} fullWidth />
                    <TextField label="เบอร์โทรศัพท์" value={form.phone ?? ''} onChange={e => setForm(s => ({ ...s, phone: e.target.value }))} fullWidth />
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <Button onClick={() => setEditing(false)}>ยกเลิก</Button>
                      <Button variant="contained" onClick={onSaveProfile} disabled={savingProfile}>
                        {savingProfile ? 'กำลังบันทึก…' : 'บันทึก'}
                      </Button>
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Password Card */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Card elevation={0} sx={{ borderRadius: 2 }}>
              <CardHeader title="เปลี่ยนรหัสผ่าน" />
              <CardContent>
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <TextField type="password" label="รหัสผ่านปัจจุบัน" value={pw.current} onChange={e => setPw(s => ({ ...s, current: e.target.value }))} fullWidth />
                  <TextField type="password" label="รหัสผ่านใหม่ (อย่างน้อย 8 ตัวอักษร)" value={pw.next} onChange={e => setPw(s => ({ ...s, next: e.target.value }))} fullWidth />
                  <TextField type="password" label="ยืนยันรหัสผ่านใหม่" value={pw.confirm} onChange={e => setPw(s => ({ ...s, confirm: e.target.value }))} fullWidth />
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Button variant="contained" onClick={onChangePassword} disabled={savingPw}>
                      {savingPw ? 'กำลังเปลี่ยน…' : 'เปลี่ยนรหัสผ่าน'}
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Confirm before editing */}
        <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
          <DialogTitle>ยืนยันการแก้ไขโปรไฟล์</DialogTitle>
          <DialogContent>
            คุณต้องการแก้ไขโปรไฟล์ของบัญชี <b>{roleResp.user?.email || profile?.email || '-'}</b> ใช่ไหม?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setConfirmOpen(false);
                setEditing(false);
                router.push('/officer'); // ⬅️ กลับโหมดเจ้าหน้าที่
              }}
            >
              ยกเลิก
            </Button>
            <Button variant="contained" onClick={() => { setConfirmOpen(false); setEditing(true); }}>
              ยืนยัน
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar open={!!snack} onClose={() => setSnack(null)} autoHideDuration={2600} message={snack || ''} />
      </Box>
    </>
  );
}
