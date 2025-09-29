// src/lib/auth/headers.ts
import { cookies } from "next/headers";

/** สร้าง HeadersInit สำหรับ fetch ฝั่ง server (ดึง cookie ของผู้ใช้) */
export async function serverAuthHeaders(): Promise<HeadersInit> {
  try {
    const ck = await cookies(); // <- ในเวอร์ชันคุณเป็น Promise
    const list = ck.getAll().map((c: { name: string; value: string }) => `${c.name}=${c.value}`);
    const cookie = list.join("; ");
    return cookie ? { cookie } : {};
  } catch {
    return {};
  }
}
