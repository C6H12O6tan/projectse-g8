"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function SearchBar(){
  const router = useRouter();
  const sp = useSearchParams();
  const [q,setQ] = useState("");

  useEffect(()=>{ setQ(sp.get("q") ?? ""); }, [sp]);
  const go = () => router.push(`/external${q ? `?q=${encodeURIComponent(q)}` : ""}`);

  return (
    <div className="search-row">
      <input
        className="input"
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
        onKeyDown={e=> e.key==="Enter" && go()}
      />
      {/* เดิมเป็น alert → เปลี่ยนเป็นลิงก์ไปหน้าค้นหาขั้นสูง */}
      <Link href="/external/search" className="btn-outline">⚙️ ค้นหาขั้นสูง</Link>
    </div>
  );
}
