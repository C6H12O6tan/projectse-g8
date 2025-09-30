'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useRole } from '@/lib/useRole';
import { Box, CircularProgress, Typography } from '@mui/material';
import TopBarAdmin from '@/components/TopBarAdmin';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data, loading } = useRole();
  const role = data?.role ?? null;

  useEffect(() => {
    if (loading) return;
    // อนุญาตเฉพาะ admin (ถ้าจะให้ officer ใช้ด้วย เพิ่ม || role === 'officer')
    if (role !== 'admin') {
      router.replace('/login?next=' + encodeURIComponent(pathname));
    }
  }, [loading, role, router, pathname]);

  if (loading || role !== 'admin') {
    return (
      <Box className="container" sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>กำลังตรวจสอบสิทธิ์…</Typography>
      </Box>
    );
  }

  return (
    <>
      <TopBarAdmin />
      <main className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
        {children}
      </main>
    </>
  );
}
