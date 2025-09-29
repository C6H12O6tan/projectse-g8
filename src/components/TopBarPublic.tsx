"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";
import { PSU } from "@/theme/brand";
import { usePathname, useRouter } from "next/navigation";

const ITEMS = ["HOME", "PROJECT"] as const;

export default function TopBarPublic() {
  const pathname = usePathname();
  const router = useRouter();
  const base = "/";

  const value = (() => {
    if (pathname === base || pathname === "/public") return 0;
    if (pathname.startsWith("/publications")) return 1;
    if (pathname.startsWith("/public/search")) return 1;
    return 0;
  })();

  return (
    <AppBar position="sticky" elevation={0}
      sx={{ bgcolor: "#fff", color: PSU.text, borderBottom: `1px solid ${PSU.cardBorder}` }}>
      <div className="container">
        <Toolbar disableGutters sx={{ gap: 2.5, minHeight: 72 }}>
          <Box sx={{ position: "relative", width: 140, height: 40 }}>
            <Image src="/psubrand.png" alt="PSU" fill sizes="140px" style={{ objectFit: "contain" }} priority />
          </Box>
          <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>

          <Tabs
            value={value}
            onChange={(_, i) => {
              const to = i === 0 ? "/public" : "/publications";
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

          <Button variant="outlined" sx={{ borderRadius: 999, height: 38, borderColor: PSU.cardBorder }}
            href="/login">
            Login
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
}
