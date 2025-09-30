'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  TextField, Button, Box, Typography, CircularProgress, Snackbar,
  Container, Stack, InputAdornment, Paper
} from '@mui/material';
import PersonOutline from '@mui/icons-material/PersonOutline';
import LockOutlined from '@mui/icons-material/LockOutlined';
import { roleHome } from '@/lib/roleHome';

type Role = 'admin' | 'officer' | 'teacher' | 'external' | null;
type RoleResp = { user: { id: string; email: string } | null; role: Role };

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [snack, setSnack] = useState<string | null>(null);

  // ===== (เดิม) เช็คสถานะล็อกอินผ่าน API — ไม่แก้ =====
  useEffect(() => {
    let cancel = false;
    (async () => {
      try {
        const r = await fetch('/api/auth/role', { cache: 'no-store' });
        const j: RoleResp = await r.json();
        if (!cancel && j?.user) router.replace(roleHome(j.role ?? 'external'));
      } catch { }
    })();
    return () => { cancel = true; };
  }, [router]);

  // ===== (เดิม) submit เข้าสู่ระบบ — ไม่แก้ =====
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      const { supabaseBrowser } = await import('@/lib/supabaseBrowser');
      const sb = supabaseBrowser();
      const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
      if (error) throw error;

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
    <main>
      {/* ===== แบนเนอร์ด้านบน (วางไฟล์ที่ public/login-banner.jpg) ===== */}
      <Box
        component="img"
        src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/logo-login.png`} // ← ใช้ชื่อไฟล์ที่มีจริงใน public
        alt=""
        sx={{
          width: '100%',
          height: { xs: 220, md: 300 },
          objectFit: 'contain',
          display: 'block',            // กันช่องว่างใต้รูป
          borderBottom: '8px solid #0f2e57',
        }}
      />

      {/* ===== โซนฟอร์มพื้นกรมท่า (ไม่มีแถบขาวด้านล่างแล้ว) ===== */}
      <Box
        sx={{
          bgcolor: '#0f2e57',
          py: { xs: 8, md: 10 },
          minHeight: 'calc(100dvh - 300px)', // ให้ส่วนนี้สูงพอหลังแบนเนอร์ (แก้ค่าเท่าความสูงแบนเนอร์ md)
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

          <Typography align="center" variant="h4" fontWeight={900} sx={{ color: '#fff', mb: 3 }}>
            ระบบบริหารจัดการผลงานตีพิมพ์
          </Typography>

          {/* การ์ดฟอร์มโปร่ง */}
          <Paper elevation={0} sx={{ bgcolor: 'transparent', p: 0, mx: 'auto', width: '100%', maxWidth: 520 }}>
            <Box component="form" onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField
                  placeholder="USERNAME"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  autoComplete="username"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: '#cfe0ff' }}>
                        <PersonOutline />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 999,
                      color: '#fff',
                      bgcolor: 'transparent',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.8)' },
                      '&:hover fieldset': { borderColor: '#fff' },
                      height: 48,
                      px: 1,
                    },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.9)', letterSpacing: 0.5 },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px transparent inset',
                      WebkitTextFillColor: '#fff',
                      caretColor: '#fff',
                      transition: 'background-color 9999s ease-out 0s',
                    },
                  }}
                  required
                />

                <TextField
                  placeholder="PASSWORD"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  autoComplete="current-password"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{ color: '#cfe0ff' }}>
                        <LockOutlined />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 999,
                      color: '#fff',
                      bgcolor: 'transparent',
                      '& fieldset': { borderColor: 'rgba(255,255,255,0.8)' },
                      '&:hover fieldset': { borderColor: '#fff' },
                      height: 48,
                      px: 1,
                    },
                    '& input::placeholder': { color: 'rgba(255,255,255,0.9)', letterSpacing: 0.5 },
                    '& input:-webkit-autofill': {
                      WebkitBoxShadow: '0 0 0 1000px transparent inset',
                      WebkitTextFillColor: '#fff',
                      caretColor: '#fff',
                      transition: 'background-color 9999s ease-out 0s',
                    },
                  }}
                  required
                />

                <Button
                  type="submit"
                  variant="contained"
                  disabled={busy}
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.1,
                    borderRadius: 999,
                    bgcolor: '#ffffff',
                    color: '#0f2e57',
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    '&:hover': { bgcolor: '#f6f8ff' },
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                  }}
                >
                  {busy ? <CircularProgress size={18} sx={{ mr: 1 }} /> : null}
                  LOGIN
                </Button>

                <Button
                  type="button"
                  onClick={() => setSnack('ลืมรหัสผ่าน: ติดต่อผู้ดูแลระบบ')}
                  sx={{ color: 'rgba(255,255,255,0.9)', alignSelf: 'center' }}
                >
                  FORGOT PASSWORD?
                </Button>
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* ❌ ลบกล่องสีขาวด้านล่างออกแล้ว เพื่อให้เหมือนแบบ */}
      <Snackbar open={!!snack} onClose={() => setSnack(null)} autoHideDuration={2600} message={snack || ''} />
    </main>
  );
}
