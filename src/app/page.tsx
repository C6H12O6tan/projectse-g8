/*"use client";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Container, TextField, Typography } from "@mui/material";
import WorkCard from "@/components/WorkCard";
import { WORKS } from "@/lib/data";

export default function Home() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const featured = useMemo(() => WORKS.filter(w => w.featured), []);

  const goSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const p = new URLSearchParams();
      if (q.trim()) p.set("title", q.trim());
      router.push(`/search?${p.toString()}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Typography variant="h4" fontWeight={800} textAlign="center">Projects & Work</Typography>

        <div className="mt-8 flex justify-center">
          <div className="w-full md:w-2/3">
            <TextField
              fullWidth label="ค้นหาผลงานตีพิมพ์ (พิมพ์ชื่อแล้วกด Enter)"
              value={q} onChange={(e)=>setQ(e.target.value)} onKeyDown={goSearch}
            />
            <div className="text-sm opacity-70 mt-2">
              หรือไปที่หน้า <a className="underline" href="/search">ค้นหาขั้นสูง</a>
            </div>
          </div>
        </div>

        <section className="mt-10">
          <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>ผลงานแนะนำ</Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(w => <WorkCard key={w.id} w={w} />)}
          </div>
        </section>
      </Container>
    </div>
  );
}*/
