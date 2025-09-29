// src/lib/absfetch.ts
import { headers } from "next/headers";

/** สร้าง absolute URL จาก path โดยดู proto/host จาก request */
export async function abs(path = "/") {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host =
    h.get("x-forwarded-host") ??
    h.get("host") ??
    process.env.NEXT_PUBLIC_SITE_HOST ??
    "localhost:3000";
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${proto}://${host}${p}`;
}

/** fetch ที่รับ path แบบ relative ได้ทุกสภาพแวดล้อม */
export async function absFetch(path: string, init?: RequestInit) {
  const url = await abs(path);
  return fetch(url, init);
}
