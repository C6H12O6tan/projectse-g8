export type AppRole = "admin" | "officer" | "teacher";
export function roleToPath(role?: string) {
  switch ((role || "").toLowerCase()) {
    case "admin": return "/(role)/admin";
    case "officer": return "/(role)/officer";
    case "teacher": return "/(role)/teacher";
    default: return "/";
  }
}
