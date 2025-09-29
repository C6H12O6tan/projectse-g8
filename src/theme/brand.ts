// src/theme/brand.ts

/** โทนหลักของ PSU (ใช้กับ TopBarTeacher และองค์ประกอบขาว) */
export const PSU = {
  navy: "#2B3E6E",       // โทนน้ำเงินของการ์ด
  sky:  "#6AA7DB",       // ฟ้าโลโก้/เส้นเน้น
  onNavy: "#FFFFFF",
  text: "#111827",
  subtext: "#6B7280",
  bg: "#F6F7FA",
  cardBorder: "#E5E7EB",
  cardShadow: "0 6px 20px rgba(17,24,39,.08)",
  radius: 16
};



/** สีตามบทบาท (ใช้กับ RoleTopBar / หน้า role-group เดิม) */
export const ROLE_COLORS = {
  admin:   { primary: "#1E3A8A", accent: "#F59E0B", onPrimary: "#FFFFFF" },
  officer: { primary: "#0F766E", accent: "#059669", onPrimary: "#FFFFFF" },
  teacher: { primary: "#8B5CF6", accent: "#6366F1", onPrimary: "#FFFFFF" },
} as const;

/** ชนิดคีย์ของบทบาท เพื่อให้ import { RoleKey } ใช้ได้ */
export type RoleKey = keyof typeof ROLE_COLORS;

/** (ถ้าต้องปรับให้เป๊ะตามแบบ) เปลี่ยนค่านี้ได้เลย */
export const BRAND = {
  grayBg: PSU.bg,
  text: { main: PSU.text, sub: PSU.subtext },
};
