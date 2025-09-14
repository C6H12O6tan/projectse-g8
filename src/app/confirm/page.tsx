"use client";
import React, { useState } from "react";

interface Person {
  id: number;
  name: string;
  project: string;
}

export default function ConfirmPage() {
  const [people] = useState<Person[]>([
    { id: 1, name: "Jane Cooper", project: "Project Name" },
    { id: 2, name: "Floyd Miles", project: "Project Name" },
    { id: 3, name: "Ronald Richards", project: "Project Name" },
    { id: 4, name: "Marvin McKinney", project: "Project Name" },
    { id: 5, name: "Jerome Bell", project: "Project Name" },
    { id: 6, name: "Kathryn Murphy", project: "Project Name" },
    { id: 7, name: "Jacob Jones", project: "Project Name" },
    { id: 8, name: "Kristin Watson", project: "Project Name" },
  ]);

  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [decision, setDecision] = useState<"approve" | "reject" | null>(null);

  const handleAction = (person: Person, action: "approve" | "reject") => {
    setSelectedPerson(person);
    setDecision(action);
  };

  const confirmAction = () => {
    if (selectedPerson && decision) {
      alert(
        `${selectedPerson.name} ${
          decision === "approve" ? "approved" : "rejected"
        } successfully`
      );
    }
    setSelectedPerson(null);
    setDecision(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <header className="flex justify-between items-center bg-white shadow px-8 py-4">
        <div className="flex items-center gap-4">
          <img src="/favicon.ico" alt="logo" className="h-8" />
          <span className="font-bold text-lg">
            ระบบบริหารจัดการผลงานตีพิมพ์
          </span>
        </div>
        <nav className="space-x-6 font-medium">
          <a href="#">HOME</a>
          <a href="#">PROJECT</a>
          <a href="#">PERSONNEL</a>
          <a href="#">SETTING</a>
        </nav>
        <div className="flex items-center gap-3">
          <span>🔔</span>
          <span>👤</span>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">บุคลากรสายวิชาการ</h2>

        {/* Search bar */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search"
            className="border px-3 py-2 rounded w-64"
          />
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="p-3">ชื่อ-สกุล</th>
              <th className="p-3">Project</th>
              <th className="p-3 text-center">อนุมัติ</th>
              <th className="p-3 text-center">ไม่อนุมัติ</th>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{person.name}</td>
                <td className="p-3">{person.project}</td>
                <td className="p-3 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                    onClick={() => handleAction(person, "approve")}
                  >
                    ✔
                  </button>
                </td>
                <td className="p-3 text-center">
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    onClick={() => handleAction(person, "reject")}
                  >
                    ✖
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination mock */}
        <div className="flex justify-end mt-4 space-x-2 text-sm">
          <button className="px-2 py-1 border rounded">1</button>
          <button className="px-2 py-1 border rounded">2</button>
          <button className="px-2 py-1 border rounded">3</button>
          <button className="px-2 py-1 border rounded">...</button>
          <button className="px-2 py-1 border rounded">10</button>
        </div>
      </div>

      {/* Modal */}
      {selectedPerson && decision && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center min-w-[280px]">
            <p className="mb-4">อนุมัติผลงานนี้หรือไม่?</p>
            <div className="flex justify-center space-x-6">
              <button
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                onClick={confirmAction}
              >
                ✔
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => {
                  setSelectedPerson(null);
                  setDecision(null);
                }}
              >
                ✖
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

