"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { PSU } from "@/theme/brand";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const ITEMS = ["HOME", "PROJECT", "STATUS", "SETTING"] as const;

export default function TopBarTeacher() {
  const pathname = usePathname();    // /teacher, /teacher/project, /teacher/status, /teacher/setting
  const router = useRouter();
  const base = "/teacher";

  const value = (() => {
    if (pathname === base) return 0;
    const sub = pathname.replace(`${base}/`, "");
    if (sub.startsWith("project")) return 1;
    if (sub.startsWith("status")) return 2;
    if (sub.startsWith("setting") || sub.startsWith("personnel")) return 3;
    return 0;
  })();

  return (
    <AppBar position="sticky" elevation={1} sx={{ bgcolor: "#fff", color: PSU.text }}>
      <div className="container">
        <Toolbar disableGutters sx={{ gap: 2, minHeight: 64 }}>
          {/* โลโก้ซ้าย (ใช้ /public/psubrand.png ถ้ามี) */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mr: 1 }}>
            <Box sx={{ position: "relative", width: 100, height: 35 }}>
              <Image src="/psubrand.png" alt="PSU" fill sizes="92px" style={{ objectFit: "contain" }} />
            </Box>
            <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>
          </Box>

          {/* เมนูตัวใหญ่ตามแบบ */}
          <Tabs
            value={value}
            onChange={(_, i) => router.push(i===0 ? base : `${base}/${ITEMS[i].toLowerCase()}`)}
            textColor="inherit"
            TabIndicatorProps={{ style: { background: PSU.sky, height: 3, borderRadius: 6 } }}
            sx={{
              "& .MuiTab-root": {
                textTransform: "uppercase",
                fontWeight: 700,
                minHeight: 42,
                color: PSU.text,
              },
              "& .MuiTab-root.Mui-selected": { color: PSU.navy }
            }}
          >
            <Tab label="HOME" />
            <Tab label="PROJECT" />
            <Tab label="STATUS" />
            <Tab label="SETTING" />
          </Tabs>

          <Box sx={{ flex: 1 }} />

          {/* ช่องค้นหา + ปุ่ม Advance */}
          <TextField
            size="small"
            placeholder="ค้นหา…"
            sx={{
              mr: 1,
              "& .MuiOutlinedInput-root": { borderRadius: 999 }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
          <Button size="small" variant="outlined" sx={{ borderRadius: 999, mr: 2 }}>
            Advance
          </Button>

          {/* Avatar ผู้ใช้ */}
          <IconButton>
            <Avatar sx={{ width: 32, height: 32, bgcolor: PSU.navy }}>T</Avatar>
          </IconButton>
        </Toolbar>
      </div>
    </AppBar>
  );
}
