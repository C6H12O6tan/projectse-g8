"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Card from "../components/Card";
import { projects } from "../data/mockData";
import { FiSearch } from "react-icons/fi";

export default function HomePage() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim() !== "") {
      router.push(`/search?keyword=${encodeURIComponent(query)}`);
    } else {
      router.push("/search");
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-6xl mx-auto p-6">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-xl font-bold text-gray-900">Projects & Work</h1>
    
    {/* Search bar */}
    <div className="flex items-center">
      <div className="relative">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch />
          </span>
          <input
            type="text"
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-500 text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      <button
        onClick={() => router.push(`/Admin/search?keyword=${query}`)}
        className="bg-blue-500 text-white px-10 py-2 rounded-lg ml-1 hover:bg-blue-600"
      >
        ค้นหาขั้นสูง
      </button>
    </div>
  </div>

  {/* Card grid */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {projects.map((p, index) => (
      <Card key={index} title={p.title} image={p.image} year={p.year} />
    ))}
  </div>
</section>
    </main>
  );
}
