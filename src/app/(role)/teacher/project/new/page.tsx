// src/app/(role)/teacher/project/new/page.tsx
"use client";
import { useState } from "react";
import { createProject } from "../actions";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function NewProject() {
  const [form, setForm] = useState({ title:"", type:"งานวิจัย", authors:"", year:"", abstract:"" });
  const [file, setFile] = useState<File|null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      let thumb_url: string | undefined;
      if (file) {
        const sb = supabaseBrowser();
        const path = `thumb_${Date.now()}.jpg`;
        const { error } = await sb.storage.from("thumbnails").upload(path, file, { upsert: true });
        if (error) throw error;
        const { data } = sb.storage.from("thumbnails").getPublicUrl(path);
        thumb_url = data.publicUrl;
      }
      await createProject({ ...form, thumb_url });
      router.replace("/teacher/project");
    } catch (err: any) {
      alert(err.message ?? "save failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container" style={{ padding: 24 }}>
      <h2 style={{ fontWeight: 800 }}>New my projects</h2>
      <form onSubmit={onSubmit} style={{ display:"grid", gap:12, maxWidth:720 }}>
        <input placeholder="ชื่อผลงาน" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} required />
        <textarea placeholder="บทคัดย่อ" rows={6} value={form.abstract} onChange={e=>setForm(f=>({...f, abstract:e.target.value}))} />
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <input placeholder="ชื่อผู้เขียน" value={form.authors} onChange={e=>setForm(f=>({...f, authors:e.target.value}))} />
          <input placeholder="ปีตีพิมพ์" value={form.year} onChange={e=>setForm(f=>({...f, year:e.target.value}))} />
        </div>
        <div>
          <label>อัปโหลดรูปหน้าปก: </label>
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] ?? null)} />
        </div>
        <button disabled={loading}>{loading ? "Saving..." : "บันทึก"}</button>
      </form>
    </main>
  );
}
