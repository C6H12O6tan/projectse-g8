"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import TopNav from "../../../../components/TopNav";
import { mockUsers } from "../../../../lib/data";

type FieldChange =
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const userId = Number(params.id);
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
      <main className="container">
        <TopNav />
        <div className="paper mt-4">
          <p className="text-slate-700">ไม่พบผู้ใช้งาน</p>
        </div>
      </main>
    );
  }

  const handleChange = (e: FieldChange) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleUpdate = () => {
    alert("อัปเดตข้อมูลสำเร็จ ✅\n" + JSON.stringify(formData, null, 2));
    router.push("/Admin/user");
  };

  // utilities
  const ctrl =
    "h-11 w-full rounded-[10px] border border-[var(--line)] bg-white px-3 text-[15px] text-slate-700 outline-none disabled:bg-slate-100 disabled:text-slate-400";
  const label = "text-[13px] font-semibold text-slate-600";

  return (
    <main className="container">
      <TopNav />

      {/* กรอบหลัก */}
      <section className="mx-auto mt-6 max-w-[1120px]">
        <div className="relative rounded-[20px] border border-[#E6E8EC] bg-white p-8 shadow-[0_10px_28px_rgba(17,24,39,.08)]">
          <h2 className="mb-6 text-[22px] font-extrabold text-slate-900">ข้อมูลส่วนบุคคล</h2>

          {/* ปุ่มแก้ไข ขวาบน */}
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            title="แก้ไข"
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z" stroke="#ef7c3c" fill="#ef7c3c"/>
              <path d="M20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill="#ef7c3c"/>
            </svg>
          </button>

          {/* ====== เลย์เอาต์หลัก: ใช้ FLEX แทน GRID ====== */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* ซ้าย: การ์ดโปรไฟล์ (ความกว้างคงที่) */}
            <aside className="w-full md:w-[280px]">
              <div className="rounded-[16px] border border-[var(--line)] bg-white p-5 shadow-sm">
                <div className="flex flex-col items-center">
                  <div className="mb-4 flex h-44 w-44 items-center justify-center rounded-[12px] bg-slate-200">
                    <span className="text-2xl text-slate-400">🖼</span>
                  </div>
                  <button
                    type="button"
                    disabled={!isEditing}
                    className="inline-flex items-center gap-2 rounded-[10px] border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span>🖼️</span> Change Profile
                  </button>
                </div>
              </div>
            </aside>

            {/* ขวา: ฟอร์ม (กินพื้นที่ที่เหลือทั้งหมด) */}
            <div className="min-w-0 flex-1">
              <div className="rounded-[16px] border border-[var(--line)] bg-white p-5 shadow-sm">
                {/* กริดอินพุต 3 คอลัมน์บน md+, บนมือถือ 1 คอลัมน์ */}
                <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-3">
                  {/* ชื่อ */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>ชื่อ-นามสกุล</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="name"
                      placeholder="ชื่อ - นามสกุล"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* วันเกิด */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>วันเกิด</label>
                    <input
                      className={ctrl}
                      type="date"
                      name="birthDate"
                      value={formData.birthDate}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* เบอร์โทร */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>เบอร์โทร</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="phone"
                      placeholder="(555) 123-4519"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* ตำแหน่งงาน */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>ตำแหน่งงาน</label>
                    <select
                      className={ctrl}
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option>Teacher</option>
                      <option>Student</option>
                      <option>Admin</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>Email</label>
                    <input
                      className={ctrl}
                      type="email"
                      name="email"
                      placeholder="user@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* สาขาวิชา/สังกัด */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>สาขาวิชา/สังกัด</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="department"
                      placeholder="เช่น Computer Science"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* เพศ */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>เพศ</label>
                    <select
                      className={ctrl}
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      disabled={!isEditing}
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>

                  {/* ที่อยู่ — กิน 2 คอลัมน์ให้กว้างอ่านง่าย */}
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className={label}>ที่อยู่</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="address"
                      placeholder="ที่อยู่ปัจจุบัน"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* ปุ่ม Update กึ่งกลางเต็มแถวล่าง */}
                  <div className="md:col-span-3 mt-2 flex justify-center">
                    <button
                      type="button"
                      onClick={handleUpdate}
                      disabled={!isEditing}
                      className={`h-11 w-[220px] rounded-[10px] px-6 font-semibold text-white transition ${
                        isEditing
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "cursor-not-allowed bg-slate-300"
                      }`}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ====== /เลย์เอาต์หลัก ====== */}
        </div>
      </section>
    </main>
  );
}
