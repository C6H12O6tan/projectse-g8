// src/app/external/page.tsx
//import TopNav from "../components/TopNav";
//import SearchBar from "../components/SearchBar";
//import ExternalCard from "../components/ExternalCard";

//import  { publications, type Publication } from "../lib/data";

import TopNav from "../components/TopNav";
import SearchBar from "../components/SearchBar";
import ExternalCard from "../components/ExternalCard";
import { publications, type Publication } from "../lib/data";

type Props = { searchParams?: { q?: string } };

export default function Home({ searchParams }: Props) {
  const q = (searchParams?.q ?? "").toLowerCase().trim();

  const items: Publication[] = q
    ? publications.filter((p: Publication) =>
        p.title.toLowerCase().includes(q) ||
        p.authors.join(" ").toLowerCase().includes(q) ||
        p.keywords.join(" ").toLowerCase().includes(q)
      )
    : publications;

  return (
    <main className="container">
      <TopNav />
      <hr className="hr" />

      <h2 className="section-title">Projects &amp; Work</h2>
      <SearchBar />

      <div className="grid">
        {items.map((p) => <ExternalCard key={p.id} pub={p} />)}
      </div>
    </main>
  );
}
