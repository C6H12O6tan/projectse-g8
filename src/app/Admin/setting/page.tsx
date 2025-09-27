"use client";
import React, { useState } from "react";
import TopNav from "../../components/TopNav";

export default function SettingPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    birthDate: "",
    position: "Teacher",
    department: "",
    gender: "Female",
    address: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const handleUpdate = () => {
    alert("อัปเดตข้อมูลสำเร็จ ✅\n" + JSON.stringify(formData, null, 2));
  };

  const ctrl =
    "h-11 w-full rounded-[10px] border border-[var(--line)] bg-white px-3 text-[15px] text-slate-700 outline-none disabled:bg-slate-100 disabled:text-slate-400";
  const label = "text-[13px] font-semibold text-slate-600";

  return (
    <main className="container">
      <TopNav />

      <section className="mx-auto mt-6 max-w-[1120px]">
        <div className="relative rounded-[20px] border border-[#E6E8EC] bg-white p-8 shadow-[0_10px_28px_rgba(17,24,39,.08)]">
          <h2 className="mb-6 text-[22px] font-extrabold text-slate-900">
            ข้อมูลส่วนบุคคล
          </h2>

          {/* ปุ่มแก้ไข */}
          <button
            type="button"
            onClick={() => setIsEditing((v) => !v)}
            title="แก้ไข"
            className="absolute right-6 top-6 inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
          >
            ✏️
          </button>

          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* การ์ดรูปภาพ */}
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
                    Change Profile
                  </button>
                </div>
              </div>
            </aside>

            {/* ฟอร์ม */}
            <div className="min-w-0 flex-1">
              <div className="rounded-[16px] border border-[var(--line)] bg-white p-5 shadow-sm">
                <div className="grid grid-cols-1 gap-x-5 gap-y-4 md:grid-cols-2">
                  {/* Name */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>ชื่อ-นามสกุล</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Birth Date */}
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

                  {/* Phone */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>เบอร์โทร</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Position */}
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
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Department */}
                  <div className="flex flex-col gap-1">
                    <label className={label}>สาขาวิชา/สังกัด</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>

                  {/* Gender */}
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

                  {/* Address */}
                  <div className="flex flex-col gap-1 md:col-span-2">
                    <label className={label}>ที่อยู่</label>
                    <input
                      className={ctrl}
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={!isEditing}
                    />
                  </div>
                </div>

                {/* Update button */}
                <div className="mt-7 flex justify-center">
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
      </section>
    </main>
  );
}
