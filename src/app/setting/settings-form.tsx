"use client";

import {
  Box,
  Paper,
  Stack,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Chip,
  InputAdornment,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export type Profile = {
  id: string;
  email: string | null;
  display_name: string | null;
  phone: string | null;
  role: "admin" | "officer" | "teacher";
};

export default function SettingsForm({ profile }: { profile: Profile }) {
  const [displayName, setDisplayName] = useState(profile.display_name ?? "");
  const [phone, setPhone] = useState(profile.phone ?? "");
  const [password, setPassword] = useState("");

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    msg: string;
    sev: "success" | "error";
  }>({ open: false, msg: "", sev: "success" });

  async function saveProfile() {
    setSaving(true);
    try {
      const res = await fetch("/api/self/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ display_name: displayName, phone }),
      });
      if (!res.ok) throw new Error(await res.text());
      setToast({ open: true, msg: "บันทึกข้อมูลแล้ว", sev: "success" });
    } catch (e: any) {
      setToast({
        open: true,
        msg: e?.message ?? "บันทึกไม่สำเร็จ",
        sev: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  async function changePassword() {
    if (!password) {
      setToast({ open: true, msg: "กรอกรหัสผ่านใหม่ก่อน", sev: "error" });
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/self/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) throw new Error(await res.text());
      setPassword("");
      setToast({ open: true, msg: "เปลี่ยนรหัสผ่านสำเร็จ", sev: "success" });
    } catch (e: any) {
      setToast({
        open: true,
        msg: e?.message ?? "เปลี่ยนรหัสผ่านไม่สำเร็จ",
        sev: "error",
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <Box sx={{ maxWidth: 980, mx: "auto", px: 2, py: 4 }}>
      <Typography variant="h4" fontWeight={800} align="center" gutterBottom>
        บัญชีผู้ใช้งาน
      </Typography>

      <Paper elevation={0} sx={{ p: 4, mt: 2 }}>
        {/* ส่วนหัวโปรไฟล์ */}
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="center"
          mb={3}
        >
          <Box
            sx={{
              width: 72,
              height: 72,
              bgcolor: "#eee",
              borderRadius: "50%",
            }}
          />
          <Box textAlign="left">
            <Typography fontWeight={800}>
              {displayName || "-"}
              <Typography
                component="span"
                color="text.secondary"
                fontWeight={400}
                ml={1}
              >
                ({profile.role})
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ID {profile.id?.slice(0, 6) ?? ""}…
            </Typography>
          </Box>
        </Stack>

        {/* ฟอร์ม */}
        <Grid container spacing={2} sx={{ maxWidth: 560, mx: "auto" }}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="ชื่อที่แสดง"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField fullWidth label="E-mail" value={profile.email ?? "-"} disabled />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="เบอร์โทรศัพท์"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              fullWidth
              label="ตำแหน่ง/บทบาท"
              value={profile.role}
              disabled
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Chip size="small" color="success" label={profile.role} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>

        <Stack direction="row" justifyContent="center" mt={4}>
          <Button
            variant="contained"
            onClick={saveProfile}
            disabled={saving}
            sx={{ minWidth: 180 }}
          >
            Update
          </Button>
        </Stack>

        {/* เปลี่ยนรหัสผ่าน */}
        <Box mt={6} sx={{ maxWidth: 560, mx: "auto" }}>
          <Typography fontWeight={800} mb={1}>
            เปลี่ยนรหัสผ่าน
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              type="password"
              label="รหัสผ่านใหม่ (อย่างน้อย 6 ตัว)"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="outlined" onClick={changePassword} disabled={saving}>
              ยืนยันเปลี่ยน
            </Button>
          </Stack>
        </Box>
      </Paper>

      <Snackbar
        open={toast.open}
        autoHideDuration={2500}
        onClose={() => setToast((s) => ({ ...s, open: false }))}
      >
        <Alert severity={toast.sev} variant="filled">
          {toast.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
