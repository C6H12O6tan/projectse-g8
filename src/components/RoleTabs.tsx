"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { usePathname, useRouter } from "next/navigation";

export default function RoleTabs({
  base = "",
  tabs = ["Home","project","personnel","setting"],
}: { base?: string; tabs?: string[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const index = tabs.findIndex(t => pathname === (t==="Home" ? base : `${base}/${t}`));
  const value = index < 0 ? 0 : index;

  return (
    <Tabs value={value} onChange={(_, i) => {
      const href = i===0 ? base : `${base}/${tabs[i]}`;
      router.push(href);
    }}>
      {tabs.map((t) => <Tab key={t} label={t} />)}
    </Tabs>
  );
}
