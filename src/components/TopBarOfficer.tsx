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
import Avatar from "@mui/material/Avatar";
import SearchIcon from "@mui/icons-material/Search";
import { PSU } from "@/theme/brand";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import UserMenu from "@/components/UserMenu";   

const ITEMS = ["HOME", "PROJECT", "PERSONNEL", "SETTING"] as const;

export default function TopBarOfficer() {
  const pathname = usePathname();
  const router = useRouter();
  const base = "/officer";
  const value = (() => {
    if (pathname === base) return 0;
    const sub = pathname.replace(`${base}/`, "");
    if (sub.startsWith("project")) return 1;
    if (sub.startsWith("personnel")) return 2;
    if (sub.startsWith("setting")) return 3;
    return 0;
  })();

  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: "#fff", color: PSU.text, borderBottom: `1px solid ${PSU.cardBorder}` }}>
      <div className="container">
        <Toolbar disableGutters sx={{ gap: 2.5, minHeight: 72 }}>
          <Box sx={{ position: "relative", width: 140, height: 40 }}>
            <Image src="/psubrand.png" alt="PSU" fill sizes="140px" style={{ objectFit: "contain" }} priority />
          </Box>
          <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>

          <Tabs
            value={value}
            onChange={(_, i) => router.push(i === 0 ? base : `${base}/${ITEMS[i].toLowerCase()}`)}
            textColor="inherit"
            slotProps={{ indicator: { sx: { backgroundColor: PSU.sky, height: 3, borderRadius: 1.5 } } }}
            sx={{
              "& .MuiTab-root": { textTransform: "uppercase", fontWeight: 800, minHeight: 44, color: PSU.text },
              "& .MuiTab-root.Mui-selected": { color: PSU.navy },
            }}
          >
            <Tab label="HOME" /><Tab label="PROJECT" /><Tab label="PERSONNEL" /><Tab label="SETTING" />
          </Tabs>

          <Box sx={{ flex: 1 }} />

          <UserMenu initial="O" toProfile="/officer/setting" />
        </Toolbar>
      </div>
    </AppBar>
  );
}
