// src/app/admin/users/page.tsx
// Server Component: ดึงข้อมูลจาก /api/admin/users แบบ no-store และรองรับเคสตารางว่าง
export const dynamic = "force-dynamic";

type UserRow = {
  id: string;
  fullname?: string | null;
  email: string;
  phone?: string | null;
};

async function getUsers(): Promise<UserRow[]> {
  const res = await fetch("/api/admin/users", { cache: "no-store" });
  // ถ้า API ตอบเป็น error message ให้โยนข้อความออกไปให้ UI โชว์
  if (!res.ok) {
    let msg = "";
    try {
      const j = await res.json();
      msg = j?.error || JSON.stringify(j);
    } catch {
      msg = await res.text();
    }
    throw new Error(msg || `HTTP ${res.status}`);
  }
  const data = (await res.json()) as { users?: UserRow[] };
  return data.users ?? [];
}

export default async function AdminUsersPage() {
  let users: UserRow[] = [];
  let errorMsg = "";

  try {
    users = await getUsers();
  } catch (e: any) {
    errorMsg = e?.message || "โหลดข้อมูลไม่สำเร็จ";
  }

  return (
    <div className="mx-auto max-w-5xl w-full px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">บัญชีผู้ใช้งาน</h1>

      {errorMsg ? (
        <p className="text-red-600">{errorMsg}</p>
      ) : users.length === 0 ? (
        <div className="text-gray-500">ไม่มีข้อมูลผู้ใช้งาน</div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">ชื่อ-สกุล</th>
                <th className="px-4 py-3 text-left">Phone Number</th>
                <th className="px-4 py-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  {/* ✅ ถ้าไม่มี fullname ให้ใช้ email */}
                  <td className="px-4 py-3">{u.fullname || u.email}</td>

                  {/* ✅ ถ้า phone เป็น null/ว่าง ให้แสดง '-' */}
                  <td className="px-4 py-3">{u.phone || "-"}</td>

                  <td className="px-4 py-3">{u.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
