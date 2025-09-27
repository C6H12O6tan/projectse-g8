"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import { publishedWorks } from "../../data/mockData";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword") || "";

  const [query, setQuery] = useState(keyword);
  const [results, setResults] = useState(publishedWorks);

  useEffect(() => {
    if (keyword) {
      const filtered = publishedWorks.filter((w) =>
        w.title.includes(keyword)
      );
      setResults(filtered);
    } else {
      setResults(publishedWorks);
    }
  }, [keyword]);

  const handleSearch = () => {
    const filtered = publishedWorks.filter((w) =>
      w.title.includes(query)
    );
    setResults(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />

      <section className="max-w-6xl mx-auto p-6">
        <h1 className="text-xl text-black font-bold mb-4">สืบค้นผลงานตีพิมพ์</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          <input
            type="text"
            placeholder="ชื่อผลงาน, ผู้วิจัย..."
            className="border-2 border-gray-500 text-black focus:border-blue-600 px-4 py-2 rounded placeholder-gray-500 outline-none w-60"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <select className="border-2 border-gray-500 text-black focus:border-blue-600 px-4 py-2 rounded placeholder-gray-500 outline-none">
            <option>สาขา/สังกัด</option>
          </select>
          <select className="border-2 border-gray-500 text-black focus:border-blue-600 px-4 py-2 rounded placeholder-gray-500 outline-none">
            <option>ประเภท</option>
          </select>
          <select className="border-2 border-gray-500 text-black focus:border-blue-600 px-4 py-2 rounded placeholder-gray-500 outline-none">
            <option>ปีตีพิมพ์</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-6 py-2 rounded font-medium hover:bg-blue-700"
          >
            ค้นหา
          </button>
          <button
            onClick={() => {
              setQuery("");
              setResults(publishedWorks);
            }}
            className="bg-gray-500 text-white px-6 py-2 rounded font-medium hover:bg-gray-600"
          >
            รีเซ็ต
          </button>
        </div>

        {/* Results */}
        <div className="space-y-4">
          {results.length > 0 ? (
            results.map((item, idx) => (
              <div
                key={idx}
                className="bg-white text-black  rounded p-4 shadow-lg"
              >
                <h2 className="font-semibold">{item.title}</h2>
                <p className="text-sm text-gray-600">{item.author}</p>
                <p className="text-sm text-gray-500">{item.location}</p>
                <p className="text-sm text-gray-500">ปี {item.year}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">ไม่พบผลงานที่ค้นหา</p>
          )}
        </div>
      </section>
    </main>
  );
}
