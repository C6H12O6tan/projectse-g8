"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import {
  AppBar, Toolbar, Box, Typography, Tabs, Tab,
  Avatar, Menu, MenuItem, Divider
} from "@mui/material";
import Link from "next/link";
import { useRole } from "@/lib/useRole";

export default function TopBarOfficer() {
  const pathname = usePathname();
  const router = useRouter();

  // ใช้เส้นทางของ "เจ้าหน้าที่" ในการคำนวณแท็บที่แอคทีฟ
  const base = "/officer";
  const current = useMemo(() => {
    if (pathname === base) return 0;
    const sub = pathname.replace(`${base}/`, "");
    if (sub.startsWith("project")) return 1;
    if (sub.startsWith("personnel")) return 2;
    if (sub.startsWith("setting")) return 3;
    return 0;
  }, [pathname]);

  // ดึง user ปัจจุบันเพื่อแสดงอีเมล/อักษรย่อ
  const { data: roleData } = useRole();
  const [initial, setInitial] = useState<string>("O");
  const email = roleData?.user?.email || "officer@example.com";

  useEffect(() => {
    const ini = (email?.trim()?.charAt(0)?.toUpperCase() || "O");
    setInitial(ini);
  }, [email]);

  // avatar menu
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "#fff", color: "#0A2540", borderBottom: "1px solid #E7EDF3" }}
    >
      <div className="container">
        <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mr: 2 }}>
            <Box sx={{ position: "relative", width: 110, height: 34 }}>
              <Image
                src="/psubrand.png"
                alt="PSU"
                fill
                sizes="110px"
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
            <Typography sx={{ fontWeight: 700 }}>
              ระบบบริหารจัดการผลงานตีพิมพ์
            </Typography>
          </Box>

          {/* ชื่อแท็บปรับให้เป็นของเจ้าหน้าที่ แต่ "ลิงก์" ตามคำขอ—ไม่แก้ (ยังชี้ไป /admin/*) */}
          <Tabs
            value={current}
            textColor="inherit"
            sx={{
              "& .MuiTab-root": { textTransform: "uppercase", fontWeight: 800, minHeight: 44, color: "#0A2540" },
              "& .MuiTab-root.Mui-selected": { color: "#1B3A6F" },
              "& .MuiTabs-indicator": { height: 3, borderRadius: 6, bgcolor: "#5BA7E6" }
            }}
          >
            <Tab label="HOME" component={Link} href="/officer" />
            <Tab label="PROJECT" component={Link} href="/officer/project" />
            <Tab label="PERSONNEL" component={Link} href="/officer/personnel" />
            <Tab label="HISTORY" component={Link} href="/officer/history" />
            <Tab label="SETTING" component={Link} href="/officer/setting" />
          </Tabs>

          <Box sx={{ flex: 1 }} />

          <Avatar
            sx={{ ml: 2, width: 36, height: 36, bgcolor: "#1B3A6F", cursor: "pointer" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            {initial}
          </Avatar>
          <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
            <MenuItem disabled>{email}</MenuItem>
            <Divider />
            <MenuItem onClick={() => router.push("/officer")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </div>
    </AppBar>
  );
}
