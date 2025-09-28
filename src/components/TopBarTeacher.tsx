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

const ITEMS = ["HOME", "PROJECT", "STATUS", "SETTING"] as const;

export default function TopBarTeacher() {
    const pathname = usePathname();
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
        <AppBar
            position="sticky"
            elevation={0}
            sx={{
                bgcolor: "#fff",
                color: PSU.text,
                borderBottom: `1px solid ${PSU.cardBorder}`
            }}
        >
            <div className="container">
                <Toolbar disableGutters sx={{ gap: 2, minHeight: 68 }}>
                    {/* โลโก้ + ชื่อระบบ */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mr: 1.5 }}>
                        <Box sx={{ position: "relative", width: 132, height: 38 }}>
                            {/* ใช้ไฟล์ที่วางใน public/ */}
                            <Image
                                src="/psubrand.png"
                                alt="Prince of Songkla University"
                                fill
                                sizes="132px"
                                style={{ objectFit: "contain" }}
                                priority
                            />
                        </Box>
                        <Typography sx={{ fontWeight: 700 }}>ระบบบริหารจัดการผลงานตีพิมพ์</Typography>
                    </Box>


                    {/* เมนูใหญ่ (uppercase) + เส้น indicator ฟ้า */}
                    <Tabs
                        value={value}
                        onChange={(_, i) => router.push(i === 0 ? base : `${base}/${ITEMS[i].toLowerCase()}`)}
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

                    {/* ค้นหา + ปุ่ม Advance (pill) + Avatar */}
                    <TextField
                        size="small"
                        placeholder="ค้นหา…"
                        sx={{
                            mr: 1,
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 999,
                                height: 36
                            }
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button
                        size="small"
                        variant="outlined"
                        sx={{
                            height: 36,
                            borderRadius: 999,
                            borderColor: PSU.cardBorder,
                            color: PSU.text,
                            "&:hover": { borderColor: PSU.sky, bgcolor: "rgba(59,130,246,.08)" }
                        }}
                    >
                        Advance
                    </Button>

                    <Avatar sx={{ width: 34, height: 34, ml: 2, bgcolor: PSU.navy }}>T</Avatar>
                </Toolbar>
            </div>
        </AppBar>
    );
}
