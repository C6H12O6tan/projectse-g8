"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Image from "next/image";
import { PSU } from "@/theme/brand";
import { usePathname, useRouter } from "next/navigation";

export default function TopBarPublic() {
  const pathname = usePathname();
  const router = useRouter();

  // โครง (public) -> URL จริงคือ "/" และ "/search"
  const value = (() => {
    if (pathname === "/") return 0;
    if (pathname.startsWith("/publications") || pathname.startsWith("/search")) return 1;
    return 0;
  })();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{ bgcolor: "#fff", color: PSU.text, borderBottom: `1px solid ${PSU.cardBorder}` }}
    >
      <div className="container">
        <Toolbar disableGutters sx={{ gap: 2.5, minHeight: 72 }}>
          <Box sx={{ position: "relative", width: 140, height: 40 }}>
            <Image src="/psubrand.png" alt="PSU" fill sizes="140px" style={{ objectFit: "contain" }} priority />
          </Box>
          <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>

          <Tabs
            value={value}
            onChange={(_, i) => {
              // HOME -> "/", PROJECT -> "/search"
              const to = i === 0 ? "/" : "/search";
              router.push(to);
            }}
            textColor="inherit"
            slotProps={{ indicator: { sx: { backgroundColor: PSU.sky, height: 3, borderRadius: 1.5 } } }}
            sx={{
              "& .MuiTab-root": { textTransform: "uppercase", fontWeight: 800, minHeight: 44, color: PSU.text },
              "& .MuiTab-root.Mui-selected": { color: PSU.navy },
            }}
          >
            <Tab label="HOME" />
            <Tab label="PROJECT" />
          </Tabs>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="outlined"
            sx={{ borderRadius: 999, height: 38, borderColor: PSU.cardBorder }}
            href="/login"
          >
            Login
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
}
