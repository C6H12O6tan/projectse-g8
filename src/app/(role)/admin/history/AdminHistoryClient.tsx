'use client';

import * as React from 'react';
import { Stack, Paper, Typography, Box } from '@mui/material';

type HistoryRow = {
  id?: number | string;
  name?: string | null;
  uid?: string | null;
  address?: string | null;
  amount?: number | string | null;
  created_at?: string | null;
};

export default function AdminHistoryClient({
  rows = [],
}: {
  rows?: HistoryRow[];
}) {
  const list = Array.isArray(rows) ? rows : [];

  return (
    <Stack spacing={1.5}>
      {list.map((r, idx) => (
        <Paper
          key={String(r.id ?? idx)}
          sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }}
        >
          <Box>
            <Typography fontWeight={700}>{r.name ?? '-'}</Typography>
            <Typography variant="body2" color="text.secondary">
              UID: {r.uid ?? '-'} — {r.address ?? '-'}
            </Typography>
          </Box>
          <Box>
            <Typography align="right">{r.amount ?? '-'}</Typography>
            <Typography variant="caption" color="text.secondary">
              {r.created_at ? new Date(r.created_at).toLocaleString() : ''}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
}
