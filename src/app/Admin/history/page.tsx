"use client";
import React, { useState } from "react";
import TopNav from "../../components/TopNav";

type History = {
  uid: number;
  name: string;
  address: string;
  scno: string;
  amount: string;
};

const mockHistory: History[] = [
  { uid: 112, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "12358G", amount: "987569326" },
  { uid: 113, name: "Suron Maharjan", address: "Natole, Lalitpur", scno: "86523B", amount: "987569326" },
  { uid: 114, name: "Sandesh Bajracharya", address: "Bhichhebahal, Lalitpur", scno: "78365D", amount: "987569326" },
  { uid: 115, name: "Subin Sedhai", address: "Baneshwor, Kathmandu", scno: "863265F", amount: "987569326" },
  { uid: 116, name: "Wonjala Joshi", address: "Bhaisepati, Lalitpur", scno: "459872B", amount: "987569326" },
  { uid: 117, name: "Numa Limbu", address: "Sampang Chowk,Dharan", scno: "742552A", amount: "987569326" },
  { uid: 118, name: "Nimesh Sthapit", address: "Newroad, Pokhara", scno: "74123B", amount: "987569326" },
  { uid: 119, name: "Samikshya Basnet", address: "Nakhipot, Lalitpur", scno: "741369P", amount: "987569326" },
  { uid: 120, name: "Sushant Kushwar", address: "Sinamangal, Kathmandu", scno: "75962K", amount: "987569326" },
  { uid: 120, name: "Hrishav Gajurel", address: "Khumaltar, Lalitpur", scno: "4596321A", amount: "987569326" },
  { uid: 121, name: "Tisha Joshi", address: "Ason, Kathmandu", scno: "752265E", amount: "987569326" },
  { uid: 122, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "85269S", amount: "987569326" },
  { uid: 123, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "85264D", amount: "987569326" },
  { uid: 124, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "65235H", amount: "987569326" },
  { uid: 125, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "566359B", amount: "987569326" },
  { uid: 126, name: "Mithlesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "72639L", amount: "987569326" },
];

export default function HistoryPage() {
  const [history, setHistory] = useState<History[]>(mockHistory);
  const [search, setSearch] = useState("");

  const filtered = history.filter(
    (h) =>
      h.name.toLowerCase().includes(search.toLowerCase()) ||
      h.address.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (uid: number) => {
    if (confirm(`คุณต้องการลบประวัติ UID: ${uid} ใช่หรือไม่?`)) {
      setHistory(history.filter((h) => h.uid !== uid));
    }
  };

  return (
    <main className="container">
        <TopNav />
    <div className="min-h-screen bg-white ">
     
      <div className="max-w-7xl mx-auto p-6">
        {/* Title + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <h1 className="text-xl font-semibold">ประวัติการใช้งาน</h1>
          <input
            type="text"
            placeholder="ค้นหา: ชื่อผลงาน หรือ สั่งคิวรี้"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-80 mt-2 md:mt-0"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white ">
          <table className="w-full text-sm">
            <thead className=" text-gray-400 text-left">
              <tr>
                <th className="p-3">UID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">SCNO</th>
                <th className="p-3">Amount</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr
                  key={row.uid + row.scno}
                  className="border-t hover:bg-gray-50 border-b border-gray-200 shadow-sm"
                >
                  <td className="p-3">{row.uid}</td>
                  <td className="p-3">{row.name}</td>
                  <td className="p-3">{row.address}</td>
                  <td className="p-3">{row.scno}</td>
                  <td className="p-3">{row.amount}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(row.uid)}
                      className="text-red-500 hover:text-red-700 text-lg border-l p-2 border-black "
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-400">
                    ไม่พบข้อมูล
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </main>
  );
}
