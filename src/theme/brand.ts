// src/theme/brand.ts

/** โทนหลักของ PSU (ใช้กับ TopBarTeacher และองค์ประกอบขาว) */
export const PSU = {
  navy:   "#1F3A8A",   // สีหลัก (ปุ่ม/หัวข้อ)
  sky:    "#3B82F6",   // เส้นเน้น/ปุ่มรอง
  onNavy: "#FFFFFF",
  text:   "#111827",
  subtext:"#6B7280",
  bg:     "#F7F8FA",
  cardBorder: "#E5E7EB",
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
