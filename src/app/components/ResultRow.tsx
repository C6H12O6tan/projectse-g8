import Link from "next/link";
import type { Publication } from "@/app/lib/data";

export default function ResultRow({ pub }: { pub: Publication }) {
  // ใช้ department หรือ storage เป็น “สังกัด/หน่วยงาน”
  const org  = pub.department ?? pub.storage ?? "—";
  const year = pub.year ?? ("—" as any);
  // ยังไม่มีจำนวนดาวน์โหลดใน type – ใส่ 0 ไปก่อน
  const count = 0;

  return (
    <article className="result-row">
      {/* ซ้าย: รูป */}
      <div className="col-thumb">
        {pub.coverUrl ? (
          <img src={pub.coverUrl} alt={pub.title} />
        ) : (
          <img src="/window.svg" alt="" width={72} height={72} />
        )}
      </div>

      {/* กลาง: ชื่อ / คำโปรย / ผู้วิจัย */}
      <div className="col-main">
        <Link href={`/external/${pub.id}`} className="row-title">
          {pub.title}
        </Link>
        {pub.abstract && <p className="row-abs">{pub.abstract}</p>}
        <div className="row-author">{pub.authors?.join(", ")}</div>
      </div>

      {/* ขวา: เมทาดาตา */}
      <ul className="col-meta">
        <li className="meta">
          <span className="ico">{/* อาคาร */}</span>
          <span>{org}</span>
        </li>
        <li className="meta">
          <span className="ico">{/* นาฬิกา */}</span>
          <span>{year}</span>
        </li>
        <li className="meta">
          <span className="ico">{/* ดาวน์โหลด */}</span>
          <span>{count}</span>
        </li>
      </ul>
    </article>
  );
}
