// src/app/page.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [data] = useState([
    {
      title: "Digital Learning in Higher Education",
      name: "Jane Cooper",
      email: "jane@microsoft.com",
      status: "succeed",
    },
    {
      title: "AI in Classroom Settings",
      name: "Floyd Miles",
      email: "floyd@yahoo.com",
      status: "succeed",
    },
    {
      title: "Leadership in University Reform",
      name: "Ronald Richards",
      email: "ronald@adobe.com",
      status: "succeed",
    },
    {
      title: "Online vs. Offline Learning",
      name: "Marvin McKinney",
      email: "marvin@tesla.com",
      status: "succeed",
    },
    {
      title: "Green University Initiatives",
      name: "Jerome Bell",
      email: "jerome@google.com",
      status: "succeed",
    },
    {
      title: "STEM Education Trends",
      name: "Kathryn Murphy",
      email: "kathryn@microsoft.com",
      status: "in progress",
    },
    {
      title: "Cybersecurity in Academia",
      name: "(208) 555-0112",
      email: "jacob@yahoo.com",
      status: "in progress",
    },
    {
      title: "Student Engagement Tactics",
      name: "(704) 555-0127",
      email: "kristin@facebook.com",
      status: "Not approved",
    },
  ]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <header className="w-full flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="PSU Logo" width={80} height={40} />
          <h1 className="text-lg font-semibold">
            ระบบบริหารจัดการผลงานตีพิมพ์
          </h1>
        </div>
        <nav className="flex gap-8 font-medium text-lg">
          <a href="#">HOME</a>
          <a href="#">PROJECT</a>
          <a href="#">STATUS</a>
          <a href="#">SETTING</a>
        </nav>
        <div className="flex items-center gap-4">
          <span className="text-2xl">🔔</span>
          <span className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">
            👤
          </span>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 px-10 py-8">
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">สถานะผลงานตีพิมพ์</h2>

          {/* Search */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Search"
              className="border rounded-full px-4 py-2 text-sm w-64"
            />
          </div>

          {/* Table */}
          <table className="w-full border-collapse text-left">
            <thead className="border-b">
              <tr>
                <th className="py-2">ชื่อผลงาน</th>
                <th className="py-2">ชื่อ-นามสกุล</th>
                <th className="py-2">Email</th>
                <th className="py-2">สถานะ</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr key={i} className="border-b">
                  <td className="py-2">{row.title}</td>
                  <td className="py-2">{row.name}</td>
                  <td className="py-2 text-blue-600">{row.email}</td>
                  <td
                    className={`py-2 font-medium ${
                      row.status === "succeed"
                        ? "text-green-500"
                        : row.status === "in progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Footer */}
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <span>Showing data 1 to 8 of 256K entries</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 border rounded">{"<"}</button>
              <button className="px-3 py-1 bg-purple-600 text-white rounded">
                1
              </button>
              <button className="px-3 py-1 border rounded">2</button>
              <button className="px-3 py-1 border rounded">3</button>
              <span>...</span>
              <button className="px-3 py-1 border rounded">10</button>
              <button className="px-3 py-1 border rounded">{">"}</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
