// src/app/login/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import InputAdornment from "@mui/material/InputAdornment";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import { PSU } from "@/theme/brand";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const sb = supabaseBrowser();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await sb.auth.signInWithPassword({
        email: username.trim(),
        password,
      });
      if (error) throw error;

      // อ่าน role จาก profiles
      const { data: profile, error: pErr } = await sb
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();
      if (pErr) throw pErr;

      const role = (profile?.role ?? "teacher").toLowerCase();
      if (role === "admin") router.replace("/admin");
      else if (role === "officer") router.replace("/officer");
      else router.replace("/teacher");
    } catch (err: any) {
      alert(err.message ?? "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      {/* แบนเนอร์ตามแบบ */}
      <Box sx={{ py: { xs: 3, md: 6 }, display: "grid", placeItems: "center" }}>
        <Box sx={{ position: "relative", width: { xs: 680, md: 820 }, height: { xs: 200, md: 240 }, maxWidth: "90vw" }}>
          <Image
            src={"/logo-login.png"}
            alt="PSU Folder"
            fill
            sizes="820px"
            style={{ objectFit: "contain" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/psubrand.png"; }}
            priority
          />
        </Box>
      </Box>

      <Container className="container" sx={{ pb: 6 }}>
        <Paper
          elevation={0}
          sx={{
            mx: "auto",
            maxWidth: 600,
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: PSU.cardShadow,
            border: `1px solid ${PSU.cardBorder}`,
            bgcolor: PSU.navy,
          }}
        >
          <Box sx={{ px: { xs: 4, md: 5 }, py: { xs: 3.5, md: 4 } }}>
            <Typography variant="h6" align="center" sx={{ color: "#fff", fontWeight: 800, mb: 2.5 }}>
              ลงชื่อเข้าใช้
            </Typography>

            <form onSubmit={onSubmit}>
              <Stack spacing={2}>
                <TextField
                  label="Username *"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.10)",
                        color: "#fff",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,.85)" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.25)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.4)" },
                  }}
                />

                <TextField
                  label="Password *"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  fullWidth
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start">
                          <LockIcon fontSize="small" />
                        </InputAdornment>
                      ),
                      sx: {
                        height: 48,
                        borderRadius: 2,
                        bgcolor: "rgba(255,255,255,0.10)",
                        color: "#fff",
                      },
                    },
                  }}
                  sx={{
                    "& .MuiInputLabel-root": { color: "rgba(255,255,255,.85)" },
                    "& .MuiOutlinedInput-notchedOutline": { borderColor: "transparent" },
                    "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.25)" },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,.4)" },
                  }}
                />

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  sx={{
                    mt: 0.5,
                    height: 44,
                    fontWeight: 800,
                    borderRadius: 2,
                    bgcolor: PSU.sky,
                    color: PSU.navy,
                    "&:hover": { bgcolor: "#78B7E5" },
                  }}
                >
                  {loading ? "กำลังเข้าสู่ระบบ..." : "LOGIN"}
                </Button>

                <Box sx={{ textAlign: "center", mt: 0.5 }}>
                  <Link href="#" underline="hover" sx={{ color: "#A9CDEF", fontWeight: 600 }}>
                    Forgot password?
                  </Link>
                </Box>
              </Stack>
            </form>
          </Box>
        </Paper>

        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 3, color: PSU.subtext }}>
          © 2025 SE G8
        </Typography>
      </Container>
    </main>
  );
}
