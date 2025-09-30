'use client';

import { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TopBarOfficer from '@/components/TopBarOfficer';
import {
  Box, Button, Chip, Container, Grid, Paper, Stack, Typography,
  Snackbar, Dialog, DialogTitle, DialogContent, DialogActions
} from '@mui/material';
import DownloadRounded from '@mui/icons-material/DownloadRounded';

const MOCK = {
  id: '1',
  title: 'Digital Learning in Higher Education',
  abstract: `งานวิจัยนี้มีวัตถุประสงค์เพื่อศึกษากระบวน... (ย่อหน้าแนวยาวจำลอง)\n\nสรุปวิธีการและผลการศึกษา...`,
  authors: 'Jane Cooper',
  coauthors: 'Royal Edwards',
  year: 2568,
  dept: 'คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์',
  pdfUrl: '#',
};

export default function OfficerReviewDetail() {
  const params = useParams<{ id: string }>();
  const r = useRouter();
  const data = useMemo(() => MOCK, [params?.id]); // mock เดิม

  const [snack, setSnack] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<null | 'approve' | 'reject'>(null);

  const onApprove = () => setConfirm('approve');
  const onReject = () => setConfirm('reject');

  const doConfirm = () => {
    if (confirm === 'approve') setSnack('ยืนยันความถูกต้องแล้ว');
    if (confirm === 'reject') setSnack('ปฏิเสธสำเร็จ – ส่งกลับผู้ส่งแล้ว');
    setConfirm(null);
    // กลับสู่หน้ารายการ (สมมติ)
    r.replace('/officer/review');
  };

  return (
    <main>
      <TopBarOfficer />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" fontWeight={900} sx={{ mb: 2 }}>
          {data.title}
        </Typography>

        <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, borderRadius: 4, border: '1px solid #E6EBF2' }}>
          <Grid container spacing={3}>
            {/* ซ้าย: กล่องภาพ + รายการข้อมูล */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
                รายละเอียดผลงาน
              </Typography>

              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '1/1',
                  bgcolor: '#DCDDE2',
                  borderRadius: 4,
                  display: 'grid',
                  placeItems: 'center',
                  color: '#666',
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                IMAGE
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<DownloadRounded />}
                sx={{ borderRadius: 999, bgcolor: '#0f2e57', '&:hover': { bgcolor: '#0c2446' }, mb: 2 }}
              >
                ดาวน์โหลดเอกสารฉบับเต็ม
              </Button>

              <InfoRow label="ผู้เขียน" value={data.authors} />
              <InfoRow label="ผู้เขียน(ร่วม)" value={data.coauthors} />
              <InfoRow label="ปีที่ตีพิมพ์" value={String(data.year)} />
              <InfoRow label="สถานที่จัดเก็บ" value={data.dept} />
              <InfoRow
                label="ไฟล์ .pdf"
                value={
                  <Typography component="a" href={data.pdfUrl} sx={{ textDecoration: 'underline', color: '#0f2e57' }}>
                    ดาวน์โหลดผลงานตีพิมพ์
                  </Typography>
                }
              />
            </Grid>

            {/* ขวา: ชื่อ + บทคัดย่อ + ปุ่มอนุมัติ */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={3}>
                <section>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                    ชื่อผลงาน
                  </Typography>
                  <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
                    {data.title}
                  </Typography>
                </section>

                <section>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                    บทคัดย่อ
                  </Typography>
                  <Typography sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.9 }}>
                    {data.abstract}
                  </Typography>
                </section>

                <Stack direction="row" justifyContent="flex-end" spacing={1} sx={{ pt: 1 }}>
                  <Button variant="outlined" color="error" onClick={onReject} sx={{ borderRadius: 999, px: 3 }}>
                    ปฏิเสธ
                  </Button>
                  <Button variant="contained" onClick={onApprove} sx={{ borderRadius: 999, px: 3 }}>
                    ยืนยันความถูกต้อง
                  </Button>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Paper>
      </Container>

      {/* Confirm Dialog */}
      <Dialog open={!!confirm} onClose={() => setConfirm(null)}>
        <DialogTitle>
          {confirm === 'approve' ? 'ยืนยันความถูกต้อง' : 'ปฏิเสธผลงานนี้'}
        </DialogTitle>
        <DialogContent>
          {confirm === 'approve'
            ? 'ยืนยันว่าข้อมูล/ไฟล์ถูกต้องและจะอนุมัติรายการนี้ใช่ไหม?'
            : 'ต้องการปฏิเสธรายการนี้และส่งกลับให้ผู้ส่งแก้ไขหรือไม่?'}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirm(null)}>ยกเลิก</Button>
          <Button variant="contained" onClick={doConfirm}>
            ยืนยัน
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={!!snack} onClose={() => setSnack(null)} autoHideDuration={2500} message={snack || ''} />
    </main>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ minWidth: 120, color: '#6B7280' }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ flex: 1, color: '#111827' }}>
        {value}
      </Typography>
    </Stack>
  );
}
