// src/app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";
import { PSU } from "@/theme/brand";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 350));
    const u = username.trim().toLowerCase();
    if (u.startsWith("admin")) router.replace("/admin");
    else if (u.startsWith("officer")) router.replace("/officer");
    else router.replace("/teacher");
    setSubmitting(false);
  }

  return (
    <main>
      {/* แบนเนอร์ใหญ่ด้านบน (รูปแฟ้ม) */}
      <Box
        sx={{
          height: { xs: 180, sm: 220, md: 260 },
          backgroundImage: "url('/logo-login.png')", // ใส่รูปแฟ้มที่ public/logo-login.png
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "contain",
        }}
      />

      {/* แผงสีกรมท่าเต็มความกว้าง + ฟอร์มตรงกลาง */}
      <Box sx={{ bgcolor: PSU.navy, color: "#fff", py: { xs: 6, md: 8 } }}>
        <Container className="container">
          <Typography
            align="center"
            sx={{ fontWeight: 800, fontSize: { xs: 26, md: 36 }, mb: 4 }}
          >
            ระบบบริหารจัดการผลงานตีพิมพ์
          </Typography>

          <Box
            component="form"
            onSubmit={onSubmit}
            sx={{ mx: "auto", maxWidth: 600 }}
          >
            <Stack spacing={2.5}>
              {/* USERNAME */}
              <TextField
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                label="USERNAME"
                size="medium"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon sx={{ color: "#fff" }} fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: {
                      height: 56,
                      color: "#fff",
                      bgcolor: "transparent",
                      borderRadius: 1.5,
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#fff", opacity: 0.9 },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffffcc",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffff",
                    borderWidth: "2px",
                  },
                }}
                required
              />

              {/* PASSWORD */}
              <TextField
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="PASSWORD"
                type="password"
                size="medium"
                variant="outlined"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: "#fff" }} fontSize="small" />
                      </InputAdornment>
                    ),
                    sx: {
                      height: 56,
                      color: "#fff",
                      bgcolor: "transparent",
                      borderRadius: 1.5,
                    },
                  },
                }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#fff", opacity: 0.9 },
                  "& .MuiOutlinedInput-notchedOutline": { borderColor: "#fff" },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffffcc",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ffffff",
                    borderWidth: "2px",
                  },
                }}
                required
              />

              {/* ปุ่ม LOGIN สีขาว ตัวอักษรกรมท่า */}
              <Button
                type="submit"
                variant="contained"
                disabled={submitting}
                sx={{
                  height: 52,
                  fontWeight: 800,
                  borderRadius: 1.5,
                  bgcolor: "#fff",
                  color: PSU.navy,
                  boxShadow: "0 3px 0 rgba(0,0,0,.15)",
                  "&:hover": { bgcolor: "#F2F4F7" },
                }}
                fullWidth
              >
                {submitting ? "กำลังเข้าสู่ระบบ..." : "LOGIN"}
              </Button>

              <Typography align="center">
                <Link
                  href="#"
                  underline="hover"
                  sx={{ color: "#CFE0F6", fontWeight: 600 }}
                >
                  Forgot password?
                </Link>
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* ลิขสิทธิ์ด้านล่าง */}
      <Container className="container">
        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "center", my: 3, color: PSU.subtext }}
        >
          © 2025 SE G8
        </Typography>
      </Container>
    </main>
  );
}
