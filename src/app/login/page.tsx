'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Box, Typography, CircularProgress, Snackbar } from '@mui/material';
import { roleHome } from '@/lib/roleHome';

type Role = 'admin'|'officer'|'teacher'|'external'|null;
type RoleResp = { user: { id: string; email: string } | null; role: Role };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState<string|null>(null);

  // ถ้าล็อกอินอยู่แล้ว → เด้งตามบทบาท (เช็คผ่าน API อย่างเดียว ไม่แตะ Supabase ระหว่าง render)
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch('/api/auth/role', { cache: 'no-store' });
        const j: RoleResp = await r.json();
        if (!cancel && j?.user) router.replace(roleHome(j.role ?? 'external'));
      } catch {}
    })();
    return () => { cancel = true; };
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
      const sb = supabaseBrowser();
      const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;

      // ดึง access_token แล้วแนบไปให้ API
      const { data: s } = await sb.auth.getSession();
      const token = s?.session?.access_token;

      const r = await fetch('/api/auth/role', {
        cache: 'no-store',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const j: RoleResp = await r.json();

      router.replace(roleHome(j.role ?? 'external'));
    } catch (err: any) {
      setSnack(err.message || 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box className="container" sx={{ py: 6, maxWidth: 520 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>เข้าสู่ระบบ</Typography>
      <Box component="form" onSubmit={onSubmit} sx={{ display: 'grid', gap: 2 }}>
        <TextField label="อีเมล" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <TextField label="รหัสผ่าน" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button type="submit" variant="contained" disabled={busy}>
            {busy ? <CircularProgress size={20} sx={{ mr: 1 }} /> : null}
            เข้าสู่ระบบ
          </Button>
          <Button type="button" onClick={() => setSnack('ลืมรหัสผ่าน: ติดต่อผู้ดูแลระบบ')}>ลืมรหัสผ่าน?</Button>
        </Box>
      </Box>
      <Snackbar open={!!snack} onClose={() => setSnack(null)} autoHideDuration={2600} message={snack || ''} />
    </Box>
  );
}
