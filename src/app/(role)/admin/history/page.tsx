import { absoluteUrl } from "@/lib/absolute";
import { serverAuthHeaders } from "@/lib/auth/headers";
import AdminHistoryClient from "./AdminHistoryClient";

export default async function AdminHistoryPage() {
  const url = await absoluteUrl("/api/admin/history");

  const res = await fetch(url, {
    headers: await serverAuthHeaders(),
    cache: "no-store",
  });

  if (!res.ok) {
    const msg = await res.text();
    return <p style={{ color: "crimson" }}>{msg || res.statusText}</p>;
  }

  const data = await res.json();
  const rows = Array.isArray(data?.rows) ? data.rows : Array.isArray(data) ? data : [];
  return <AdminHistoryClient rows={rows} />;
}
