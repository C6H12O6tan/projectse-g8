// src/lib/auth/headers.ts
import { cookies } from "next/headers";

/** สร้าง header Cookie สำหรับ server fetch (ต้องใช้ใน Server Component/Route เท่านั้น) */
export async function serverAuthHeaders(): Promise<HeadersInit> {
  const jar = await cookies();
  const cookie = jar.getAll().map(({ name, value }) => `${name}=${value}`).join("; ");
  return cookie ? { cookie } : {};
}
