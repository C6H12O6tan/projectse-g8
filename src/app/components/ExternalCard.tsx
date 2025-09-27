import Link from "next/link";
//import type { Publication } from "../lib/data";
import type { Publication } from "../lib/data";

export default function ExternalCard({ pub }: { pub: Publication }){
  return (
    <Link href={`/external/${pub.id}`} className="card">
      <h3>{pub.title.toUpperCase()}</h3>
      <div className="author">{pub.authors[0] ?? ""}</div>
      <div className="thumb">
        {pub.coverUrl ? <img src={pub.coverUrl} alt="" /> : <img src="/window.svg" alt="" width={72} height={72}/>}
      </div>
      <span className="badge">UPDATE: {pub.year}</span>
    </Link>
  );
}
