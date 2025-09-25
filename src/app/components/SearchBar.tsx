"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar(){
  const router = useRouter();
  const sp = useSearchParams();
  const [q,setQ] = useState("");

  useEffect(()=>{ setQ(sp.get("q") ?? ""); }, [sp]);

  const go = () => {
    router.push(`/external${q ? `?q=${encodeURIComponent(q)}` : ""}`);
  };

  return (
    <div className="search-row">
      <input
        className="input"
        value={q}
        onChange={e=>setQ(e.target.value)}
        placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
        onKeyDown={e=> e.key==="Enter" && go()}
      />
      <button className="btn-outline" onClick={()=>alert("ค้นหาขั้นสูง (demo)")}>⚙️ ค้นหาขั้นสูง</button>
    </div>
  );
}
