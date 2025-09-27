"use client";
import React, { useState } from "react";
import TopNav from "../../components/TopNav";

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
};

// mock ข้อมูล 20 record (เรียงจากใหม่ -> เก่า)
const mockUsers: User[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `User ${20 - i}`, // แสดง User 20,19,...1
  phone: `(555) 123-45${i.toString().padStart(2, "0")}`,
  email: `user${20 - i}@example.com`,
}));

export default function UserPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [search, setSearch] = useState("");
  const [deleteUser, setDeleteUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 8;

  // filter ค้นหา
  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  // pagination slice
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
    setDeleteUser(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <div className="max-w-6xl mx-auto p-6">
        {/* Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <h1 className="text-xl font-semibold">บัญชีผู้ใช้งาน</h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้ใช้..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // reset page เมื่อค้นหา
              }}
              className="border border-gray-300 rounded-md p-2"
            />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
              + เพิ่มบัญชี
            </button>
          </div>
        </div>

        {/* ตารางผู้ใช้ */}
        <table className="w-full overflow-hidden">
          <thead className="text-sm text-gray-400">
            <tr>
              <th className="p-3 text-left">ชื่อ - สกุล</th>
              <th className="p-3 text-left">Phone Number</th>
              <th className="p-3 text-left">Email</th>
            
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr key={user.id} className="border-t border-b border-gray-200 shadow-sm ">
                <td className="p-5 pr-20">{user.name}</td>
                <td className="p-3">{user.phone}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 text-center space-x-2">
                  <button className="mr-5 bg-green-300 text-white border border-green-500 px-5 py-1 rounded-md hover:bg-green-600">
                    แก้ไข
                  </button>
                  <button
                    className="bg-red-300 border border-red-500 text-white px-5 py-1 rounded-md hover:bg-red-600"
                    onClick={() => setDeleteUser(user)}
                  >
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-end mt-4 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 border rounded-md ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Modal ลบ */}
      {deleteUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">ยืนยันการลบ</h2>
            <p className="mb-6">
              คุณต้องการลบบัญชี <span className="font-bold">{deleteUser.name}</span> ใช่หรือไม่?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteUser(null)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                ยกเลิก
              </button>
              <button
                onClick={() => handleDelete(deleteUser.id)}
                className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
