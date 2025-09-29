"use client";

import { useState } from "react";
import { fetchJSON } from "@/lib/http";
import {
  Box, Button, Paper, Stack, TextField, Typography, LinearProgress
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [year, setYear] = useState<number | "">("");
  const [uploading, setUploading] = useState(false);
  const [thumbUrl, setThumbUrl] = useState<string | null>(null);
  const [paperPath, setPaperPath] = useState<string | null>(null);

  async function onUpload(bucket: "thumbnails" | "papers", f: File) {
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("bucket", bucket);
      fd.append("file", f);
      const res = await fetch("/api/teacher/uploads", {
        method: "POST",
        body: fd,
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "upload failed");
      if (bucket === "thumbnails") setThumbUrl(data.publicUrl || null);
      else setPaperPath(data.path || null);
    } catch (e:any) {
      alert(e.message || "อัปโหลดล้มเหลว");
    } finally {
      setUploading(false);
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload: any = { title, abstract, year: year ? Number(year) : null, img: thumbUrl, paper_path: paperPath };
    const created = await fetchJSON("/api/teacher/projects", { method: "POST", json: payload });
    router.replace("/teacher/project");
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={800} mb={2}>สร้างโปรเจกต์ใหม่</Typography>
      <Paper sx={{ p: 2, maxWidth: 720 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField label="ชื่อผลงาน *" required value={title} onChange={e => setTitle(e.target.value)} />
            <TextField label="บทคัดย่อ" multiline minRows={3} value={abstract} onChange={e => setAbstract(e.target.value)} />
            <TextField label="ปีที่ตีพิมพ์" type="number" value={year} onChange={e => setYear(e.target.value as any)} />

            <Stack direction="row" gap={2} alignItems="center">
              <Button component="label" variant="outlined">
                อัปโหลดรูปปก
                <input hidden type="file" accept="image/*" onChange={e => e.target.files?.[0] && onUpload("thumbnails", e.target.files[0])}/>
              </Button>
              {thumbUrl ? <Typography variant="body2" color="success.main">อัปโหลดแล้ว</Typography> : null}
            </Stack>

            <Stack direction="row" gap={2} alignItems="center">
              <Button component="label" variant="outlined">
                อัปโหลดไฟล์งาน (PDF)
                <input hidden type="file" accept="application/pdf" onChange={e => e.target.files?.[0] && onUpload("papers", e.target.files[0])}/>
              </Button>
              {paperPath ? <Typography variant="body2" color="success.main">อัปโหลดแล้ว</Typography> : null}
            </Stack>

            {uploading && <LinearProgress />}

            <Stack direction="row" gap={1} justifyContent="flex-end">
              <Button type="submit" variant="contained" disabled={uploading}>บันทึก</Button>
            </Stack>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}
