"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopNav from "../../../../components/TopNav"; // ใช้ alias "@/components" สั้นกว่า
import { mockUsers } from "../../../../lib/data";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.id);

  // หา user จาก mock data
  const user = mockUsers.find((u) => u.id === userId);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    birthDate: "1912-05-12",
    position: "Teacher",
    department: "",
    gender: "Female",
    address: "ABC, adc-1250, Dhaka, Bangladesh",
  });

  if (!user) {
    return (
      <div className="p-6">
        <TopNav />
        <p>ไม่พบผู้ใช้งาน</p>
      </div>
    );
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    alert("อัปเดตข้อมูลสำเร็จ ✅\n" + JSON.stringify(formData, null, 2));
    router.push("/Admin/user");
  };

  return (
    <main className="container">
          <TopNav />
    <div className="min-h-screen ">
      
      <div className="max-w-6xl mx-auto p-6 flex gap-6">
        {/* Profile Picture */}
        <div className="w-1/4 flex flex-col items-center bg-white p-4 rounded-lg shadow">
          <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-md">
            <span className="text-gray-400">🖼</span>
          </div>
          <button className="mt-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 text-sm">
            Change Profile
          </button>
        </div>

        {/* ข้อมูลส่วนบุคคล */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">ข้อมูลส่วนบุคคล</h2>
            <button
              className="bg-black text-white p-2 rounded-md hover:bg-gray-800"
              onClick={() => setIsEditing(!isEditing)}
              title="แก้ไข"
            >
              ✏️
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="ชื่อ - นามสกุล"
              value={formData.name}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="เบอร์โทร"
              value={formData.phone}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            >
              <option>Teacher</option>
              <option>Student</option>
              <option>Admin</option>
            </select>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="text"
              name="department"
              placeholder="สาขาวิชา/สังกัด"
              value={formData.department}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            >
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
            <input
              type="text"
              name="address"
              placeholder="ที่อยู่"
              value={formData.address}
              onChange={handleChange}
              disabled={!isEditing}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleUpdate}
              disabled={!isEditing}
              className={`px-6 py-2 rounded-md text-white ${
                isEditing
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
    </main>
    
  );
}
