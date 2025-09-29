// src/lib/absolute.ts
import { headers } from "next/headers";

/** คืนค่า URL สมบูรณ์แบบ async */
export async function absoluteUrl(path: string): Promise<string> {
  // ส่งกลับทันทีถ้าเป็น absolute อยู่แล้ว
  if (/^https?:\/\//i.test(path)) return path;

  const p = path.startsWith("/") ? path : `/${path}`;

  try {
    const h = await headers(); // <- ในเวอร์ชันคุณเป็น Promise
    const host =
      h.get("x-forwarded-host") ||
      h.get("host") ||
      process.env.NEXT_PUBLIC_BASE_HOST ||
      `localhost:${process.env.PORT || 3000}`;

    const proto =
      h.get("x-forwarded-proto") ||
      process.env.NEXT_PUBLIC_BASE_PROTO ||
      "http";

    return `${proto}://${host}${p}`;
  } catch {
    const base =
      process.env.NEXT_PUBLIC_BASE_URL ||
      `http://localhost:${process.env.PORT || 3000}`;
    return `${base}${p}`;
  }
}
