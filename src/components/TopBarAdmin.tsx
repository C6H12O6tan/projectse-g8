"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  AppBar, Toolbar, Box, Typography, Tabs, Tab,
  TextField, InputAdornment, Button, Avatar, Menu, MenuItem, Divider
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Link from "next/link";

const NAV = ["HOME", "USER", "HISTORY", "SETTING"] as const;

export default function TopBarAdmin() {
  const pathname = usePathname();
  const router = useRouter();

  const base = "/admin";
  const current = useMemo(() => {
    if (pathname === base) return 0;
    const sub = pathname.replace(`${base}/`, "");
    if (sub.startsWith("users")) return 1;
    if (sub.startsWith("history")) return 2;
    if (sub.startsWith("setting")) return 3;
    return 0;
  }, [pathname]);

  // avatar menu
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#fff", color: "#0A2540", borderBottom: "1px solid #E7EDF3" }}>
      <div className="container">
        <Toolbar disableGutters sx={{ minHeight: 72, gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mr: 2 }}>
            <Box sx={{ position: "relative", width: 110, height: 34 }}>
              <Image src="/psubrand.png" alt="PSU" fill sizes="110px" style={{ objectFit: "contain" }} priority />
            </Box>
            <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>
          </Box>

          <Tabs
            value={current}
            textColor="inherit"
            sx={{
              "& .MuiTab-root": { textTransform: "uppercase", fontWeight: 800, minHeight: 44, color: "#0A2540" },
              "& .MuiTab-root.Mui-selected": { color: "#1B3A6F" },
              "& .MuiTabs-indicator": { height: 3, borderRadius: 6, bgcolor: "#5BA7E6" }
            }}
          >
            <Tab label="HOME" component={Link} href="/admin" />
            <Tab label="USER" component={Link} href="/admin/users" />
            <Tab label="HISTORY" component={Link} href="/admin/history" />
            <Tab label="SETTING" component={Link} href="/admin/setting" />
          </Tabs>

          <Box sx={{ flex: 1 }} />

          <Avatar
            sx={{ ml: 2, width: 36, height: 36, bgcolor: "#1B3A6F", cursor: "pointer" }}
            onClick={(e) => setAnchor(e.currentTarget)}
          >
            A
          </Avatar>
          <Menu anchorEl={anchor} open={open} onClose={() => setAnchor(null)}>
            <MenuItem disabled>admin@example.com</MenuItem>
            <Divider />
            <MenuItem onClick={() => router.push("/login")}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </div>
    </AppBar>
  );
}
