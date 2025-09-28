"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Box from "@mui/material/Box";
import Image from "next/image";

export default function TopBar() {
  const pathname = usePathname();
  const tab = (href: string, label: string) => (
    <Link href={href} style={{ textDecoration: "none" }}>
      <Button variant={pathname === href ? "contained" : "text"}>{label}</Button>
    </Link>
  );

  return (
    <div className="topnav">
      <div className="container">
        <AppBar color="inherit" elevation={0} position="static">
          <Toolbar disableGutters sx={{ py: 1 }}>
            {/* โลโก้/ชื่อระบบ */}
            <Box sx={{ display:'flex', alignItems:'center', gap:1, mr: 2 }}>
              <Image src="/psubrand.png" alt="" width={100} height={35}/>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>
            </Box>

            {/* กลาง: เมนูหลัก */}
            <Stack direction="row" spacing={1} sx={{ flex: 1 }} justifyContent="center">
              {tab("/", "หน้าแรก")}
              {tab("/publications", "ผลงาน")}
              {tab("/search", "ค้นหา")}
            </Stack>

            {/* ขวา: ปุ่มสำคัญ */}
            <Stack direction="row" spacing={1}>
              {tab("/login", "เข้าสู่ระบบ")}
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
}
