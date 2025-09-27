"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import TopNav from "../../../components/TopNav";

export default function AddUserPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    position: "Teacher",
    department: "",
    gender: "Male",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = () => {
    // ตรวจสอบว่ามีช่องว่างหรือไม่
    const missingFields: string[] = [];
    if (!formData.name) missingFields.push("ชื่อ - นามสกุล");
    if (!formData.birthDate) missingFields.push("วันเกิด");
    if (!formData.phone) missingFields.push("เบอร์โทร");
    if (!formData.email) missingFields.push("Email");
    if (!formData.department) missingFields.push("สาขาวิชา/สังกัด");
    if (!formData.address) missingFields.push("ที่อยู่");

    if (missingFields.length > 0) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน:\n- " + missingFields.join("\n- "));
      return;
    }

    // ในอนาคตสามารถส่ง API ไปบันทึกได้
    alert("เพิ่มผู้ใช้สำเร็จ ✅\n" + JSON.stringify(formData, null, 2));
    router.push("/Admin/user"); // กลับไปหน้ารายการ user
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
            Upload Profile
          </button>
        </div>

        {/* ข้อมูลส่วนบุคคล */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow relative">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">เพิ่มข้อมูลผู้ใช้ใหม่</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="ชื่อ - นามสกุล"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="text"
              name="phone"
              placeholder="เบอร์โทร"
              value={formData.phone}
              onChange={handleChange}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <select
              name="position"
              value={formData.position}
              onChange={handleChange}
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
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <input
              type="text"
              name="department"
              placeholder="สาขาวิชา/สังกัด"
              value={formData.department}
              onChange={handleChange}
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
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
              className="border border-gray-300 text-gray-700 rounded-md p-2"
            />
          </div>

          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAdd}
              className="px-6 py-2 rounded-md text-white bg-green-500 hover:bg-green-600"
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
    </main>
  );
}
