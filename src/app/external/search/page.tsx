"use client";
import { useMemo, useState } from "react";
import TopNav from "../../components/TopNav";
import ExternalCard from "../../components/ExternalCard";
import { publications, type Publication } from "../../lib/data";

type Option = { label: string; value: string };

export default function AdvancedSearch() {
  // ---- options ----
  const departments: Option[] = useMemo(() => {
    const s = new Set<string>();
    publications.forEach(p => p.department && s.add(p.department));
    return Array.from(s).sort().map(v => ({ label: v, value: v }));
  }, []);
  const categories: Option[] = useMemo(() => {
    const s = new Set<string>();
    publications.forEach(p => p.category && s.add(p.category));
    return Array.from(s).sort().map(v => ({ label: v, value: v }));
  }, []);
  const years: Option[] = useMemo(() => {
    const s = new Set<number>();
    publications.forEach(p => p.year && s.add(p.year));
    return Array.from(s).sort((a,b)=>b-a).map(v => ({ label: String(v), value: String(v) }));
  }, []);

  // ---- states ----
  const [q, setQ]     = useState("");
  const [dept, setD]  = useState("");
  const [cat, setC]   = useState("");
  const [year, setY]  = useState("");

  const results: Publication[] = useMemo(() => {
    const norm = (s: string) => s.toLowerCase();
    return publications.filter(p => {
      const textHit = q
        ? [p.title, p.authors.join(" "), p.keywords.join(" ")].some(x => norm(x).includes(norm(q)))
        : true;
      const deptHit = dept ? p.department === dept : true;
      const catHit  = cat  ? p.category   === cat  : true;
      const yearHit = year ? String(p.year) === year : true;
      return textHit && deptHit && catHit && yearHit;
    });
  }, [q, dept, cat, year]);

  const reset = () => { setQ(""); setD(""); setC(""); setY(""); };

  return (
    <main className="container">
      <TopNav />
      <hr className="hr" />
      <h2 className="section-title">สืบค้นผลงานตีพิมพ์</h2>

      {/* ======= ฟอร์มค้นหาขั้นสูง ======= */}
      <div className="advbox">
        {/* 1) คีย์เวิร์ด */}
        <input
          className="ctrl input-with-icon"
          placeholder="ชื่อผลงาน, ชื่อผู้วิจัย…"
          value={q}
          onChange={e=>setQ(e.target.value)}
        />

        {/* 2) สาขาวิชา/สังกัด */}
        <Select className="ctrl" value={dept} onChange={setD} placeholder="สาขาวิชา/สังกัด" options={departments} />

        {/* 3) ประเภท */}
        <Select className="ctrl" value={cat} onChange={setC} placeholder="ประเภท" options={categories} />

        {/* 4) ปีที่ตีพิมพ์ */}
        <Select className="ctrl" value={year} onChange={setY} placeholder="ปีที่ตีพิมพ์" options={years} />

        {/* 5) ปุ่ม 'ค้นหา' (ให้อยู่ก่อน) */}
        <button className="btn btn-primary">ค้นหา</button>

        {/* 6) ปุ่ม 'ล้างค่า' (ตามหลัง และข้อความยาวได้ ไม่ดัน layout เพราะเราฟิกซ์ความกว้างคอลัมน์ไว้แล้ว) */}
        <button className="btn" onClick={reset}>ล้างค่า</button>
      </div>

      {/* ผลลัพธ์ */}
      <div className="grid" style={{ marginTop: 18 }}>
        {results.map(p => <ExternalCard key={p.id} pub={p} />)}
      </div>
      {results.length === 0 && <p style={{marginTop:12, color:"var(--muted)"}}>ไม่พบผลลัพธ์ที่ตรงกับเงื่อนไข</p>}
    </main>
  );
}

/* --- Select component --- */
function Select({
  value, onChange, placeholder, options, className=""
}:{
  value: string; onChange:(v:string)=>void; placeholder: string; options: Option[]; className?: string;
}){
  return (
    <select
      value={value}
      onChange={e=>onChange(e.target.value)}
      className={className}
    >
      <option value="">{placeholder} </option>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}
