// src/components/RoleTabs.tsx
"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePathname, useRouter } from "next/navigation";

export default function RoleTabs({
  base,
  tabs = ["Home","project","personnel","setting"],
}: { base: string; tabs?: string[] }) {
  const pathname = usePathname();
  const router = useRouter();

  // match: /admin  => Home, /admin/project => project ฯลฯ
  const current = pathname === base ? "Home" : pathname.replace(`${base}/`, "");
  const idx = Math.max(0, tabs.findIndex(t => t === current));

  return (
    <Tabs value={idx} onChange={(_, i) => router.push(i === 0 ? base : `${base}/${tabs[i]}`)}>
      {tabs.map((t) => <Tab key={t} label={t} />)}
    </Tabs>
  );
}
