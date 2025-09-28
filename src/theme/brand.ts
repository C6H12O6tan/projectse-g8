// TODO: แทนค่าสีตัวอย่างด้านล่างด้วยค่าสี "ตามแบบจริง" ให้เป๊ะ
export const BRAND = {
  // สีพื้นฐานระบบ (ใช้หน้า Public / พื้นหลัง)
  grayBg: "#F7F8FA",
  text: { main: "#111827", sub: "#6B7280" },
};

export const ROLE_COLORS = {
  admin:   { primary: "#1E3A8A", accent: "#F59E0B", onPrimary: "#FFFFFF" }, // ตัวอย่าง: น้ำเงินกรม-ทอง
  officer: { primary: "#0F766E", accent: "#059669", onPrimary: "#FFFFFF" }, // ตัวอย่าง: เขียว teal
  teacher: { primary: "#8B5CF6", accent: "#6366F1", onPrimary: "#FFFFFF" }, // ตัวอย่าง: ม่วง
} as const;

export type RoleKey = keyof typeof ROLE_COLORS;
