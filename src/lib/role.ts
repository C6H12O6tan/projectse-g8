export type AppRole = "admin" | "officer" | "teacher";

/** แปลง role → path ที่ถูกต้อง (ห้ามมี /(role) ใน URL จริง) */
export function roleToPath(role?: string) {
  switch ((role || "").toLowerCase()) {
    case "admin":
      return "/admin";
    case "officer":
      return "/officer";
    case "teacher":
      return "/teacher";
    default:
      return "/";
  }
}

/** ช่วยตรวจสอบ/แปลง role จาก user หรือ metadata ต่าง ๆ ถ้ามีใช้ในอนาคต */
export function normalizeRole(role?: string | null): AppRole | undefined {
  const r = String(role || "").toLowerCase();
  return r === "admin" || r === "officer" || r === "teacher" ? (r as AppRole) : undefined;
}
