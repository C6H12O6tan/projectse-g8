'use client';

import { Stack, Paper, Box, Typography } from '@mui/material';

type UserRow = {
  id: string;
  fullname?: string | null;
  email: string;
  phone?: string | null;
};

export default function AdminUsersClient({
  rows,
  error,
}: {
  rows?: unknown;
  error?: string;
}) {
  // ✅ รองรับทั้งรูปแบบ [] และ { users: [] } และ null/undefined
  const list: UserRow[] = Array.isArray(rows)
    ? (rows as UserRow[])
    : rows && typeof rows === 'object' && Array.isArray((rows as any).users)
    ? ((rows as any).users as UserRow[])
    : [];

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!list.length) {
    return <Typography color="text.secondary">ไม่มีข้อมูลผู้ใช้งาน</Typography>;
  }

  return (
    <Stack spacing={1.5}>
      {list.map((u) => (
        <Paper
          key={u.id}
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography fontWeight={700}>{u.fullname || u.email}</Typography>
            <Typography variant="body2" color="text.secondary">
              {u.email}
            </Typography>
          </Box>
          <Typography>{u.phone || '-'}</Typography>
        </Paper>
      ))}
    </Stack>
  );
}
