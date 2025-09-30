// src/components/UserMenu.tsx
"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import ManageAccounts from "@mui/icons-material/ManageAccounts";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";          // ✅ เพิ่ม
import { useRouter } from "next/navigation";
import { PSU } from "@/theme/brand";

export default function UserMenu({
  initial = "U",
  onLogout,
  toProfile = "#",
}: {
  initial?: string;
  onLogout?: () => Promise<void> | void;
  toProfile?: string | false;
}) {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const open = Boolean(anchor);
  const router = useRouter();

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchor(e.currentTarget);
  const handleClose = () => setAnchor(null);

  const logout = async () => {
    try {
      if (onLogout) await onLogout();
      localStorage.removeItem("auth");
      sessionStorage.clear();
    } finally {
      handleClose();
      router.replace("/login");
    }
  };

  const gotoProfile = () => {
    handleClose();
    if (toProfile && typeof toProfile === "string") router.push(toProfile);
  };

  return (
    <Box component="span">{/* ✅ แทนที่จะใช้ <> … </> */}
      <IconButton onClick={handleOpen} size="small" sx={{ ml: 2 }}>
        <Avatar sx={{ width: 36, height: 36, bgcolor: PSU.navy }}>
          {initial?.slice(0, 1).toUpperCase() || "U"}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchor}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {toProfile !== false && (
          <MenuItem onClick={gotoProfile}>
            <ListItemIcon><ManageAccounts fontSize="small" /></ListItemIcon>
            โปรไฟล์ของฉัน
          </MenuItem>
        )}
        {toProfile !== false && <Divider />}
        <MenuItem onClick={logout}>
          <ListItemIcon><Logout fontSize="small" /></ListItemIcon>
          ออกจากระบบ
        </MenuItem>
      </Menu>
    </Box>
  );
}
