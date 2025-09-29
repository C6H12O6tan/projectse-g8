// src/lib/absolute.ts
import { headers } from "next/headers";

/** คืน absolute URL ตาม host/proto จริงของ request ปัจจุบัน */
export async function absoluteUrl(path = "/") {
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
