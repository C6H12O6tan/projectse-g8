import { absoluteUrl } from "@/lib/absolute";
import { serverAuthHeaders } from "@/lib/auth/headers";
import AdminUsersClient from "./AdminUsersClient";

export default async function AdminUsersPage() {
  const url = await absoluteUrl("/api/admin/users");

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
  return <AdminUsersClient rows={rows} />;
}
