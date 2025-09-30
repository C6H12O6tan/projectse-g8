'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useRole } from '@/lib/useRole';
import { Box, CircularProgress, Typography } from '@mui/material';
// สมมุติว่าคุณมี TopBarTeacher อยู่แล้ว
import TopBarTeacher from '@/components/TopBarTeacher'; // แก้ path ให้ตรงโปรเจกต์

export default function TeacherHome() {
  const router = useRouter();
  const pathname = usePathname();
  const { data, loading } = useRole();
  const role = data?.role ?? null;

  // guard ฝั่ง client: อนุญาต teacher และ admin (ถ้าต้องการ)
  useEffect(() => {
    if (loading) return;
    if (role !== 'teacher' && role !== 'admin') {
      router.replace('/login?next=' + encodeURIComponent(pathname));
    }
  }, [loading, role, router, pathname]);

  if (loading || (role !== 'teacher' && role !== 'admin')) {
    return (
      <Box className="container" sx={{ py: 4, display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
        <Typography variant="body2" sx={{ mt: 2 }}>กำลังตรวจสอบสิทธิ์…</Typography>
      </Box>
    );
  }

  return (
    <main>
      <TopBarTeacher />
      {/* เนื้อหาโฮมของอาจารย์ */}
      <Box className="container" sx={{ py: 3 }}>
        <Typography variant="h5" fontWeight={700}>หน้าหลักอาจารย์</Typography>
        {/* …ใส่คอนเทนต์ของคุณต่อได้เลย… */}
      </Box>
    </main>
  );
}
