import { Typography, Paper, Box } from "@mui/material";

export default function AdminSetting() {
  return (
    <Box>
      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        ตั้งค่า
      </Typography>
      <Paper sx={{ p: 3 }}>
        พื้นที่สำหรับตั้งค่าระบบผู้ดูแล (กำหนดสิทธิ์, ค่าทั่วไป ฯลฯ)
      </Paper>
    </Box>
  );
}
