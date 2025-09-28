"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROLE_COLORS, RoleKey } from "@/theme/brand";
import Box from "@mui/material/Box";

type Item = { href: string; label: string };

function menuFor(role: RoleKey): Item[] {
  const base = `/${role}`;
  return [
    { href: base, label: "Home" },
    { href: `${base}/project`, label: "project" },
    { href: `${base}/personnel`, label: "personnel" },
    { href: `${base}/setting`, label: "setting" },
  ];
}

export default function RoleTopBar({ role }: { role: RoleKey }) {
  const pathname = usePathname();
  const c = ROLE_COLORS[role];
  const items = menuFor(role);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: c.primary, color: c.onPrimary, borderBottom: `3px solid ${c.accent}` }}
      >
        <div className="container">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mr: 2 }}>SE G8 • {role.toUpperCase()}</Typography>
            <Stack direction="row" spacing={1}>
              {items.map((it) => {
                const active = pathname === it.href;
                return (
                  <Link key={it.href} href={it.href} style={{ textDecoration: "none" }}>
                    <Button
                      variant={active ? "contained" : "text"}
                      sx={{
                        color: c.onPrimary,
                        bgcolor: active ? c.accent : "transparent",
                        "&:hover": { bgcolor: active ? c.accent : "rgba(255,255,255,.15)" },
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      {it.label}
                    </Button>
                  </Link>
                );
              })}
            </Stack>

            {/* ช่องว่างดันปุ่มไปขวา ถ้าอยากมีปุ่ม profile / logout ใส่ตรงนี้ */}
            <Box sx={{ flex: 1 }} />
          </Toolbar>
        </div>
      </AppBar>
    </div>
  );
}
