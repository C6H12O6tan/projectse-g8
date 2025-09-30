"use client";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { PSU } from "@/theme/brand";

export type ProjectPayload = {
  title: string;
  abstract?: string;
  authors?: string;       // ผู้เขียนหลัก
  coauthors?: string;     // ผู้เขียนร่วม
  year?: string;
  department?: string;    // สถานที่จัดเก็บ
  file?: File | null;
};

export default function ProjectForm({
  mode,
  initial,
  onSubmit,
}: {
  mode: "new" | "edit";
  initial?: Partial<ProjectPayload>;
  onSubmit: (data: ProjectPayload) => void;
}) {
  const [form, setForm] = useState<ProjectPayload>({
    title: initial?.title || "",
    abstract: initial?.abstract || "",
    authors: initial?.authors || "",
    coauthors: initial?.coauthors || "",
    year: initial?.year || "",
    department: initial?.department || "",
    file: null,
  });

  const update = (k: keyof ProjectPayload) => (e: any) =>
    setForm((s) => ({ ...s, [k]: e?.target?.value ?? e }));

  const chooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setForm((s) => ({ ...s, file: f }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <Paper
      component="form"
      onSubmit={submit}
      elevation={0}
      sx={{
        p: 3,
        border: `1px solid ${PSU.cardBorder}`,
        borderRadius: 2,
        boxShadow: PSU.cardShadow,
        maxWidth: 960,
        mx: "auto",
      }}
    >
      <Grid container spacing={2}>
        {/* ชื่อผลงาน */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            required
            label="ชื่อผลงาน :"
            value={form.title}
            onChange={update("title")}
          />
        </Grid>

        {/* บทคัดย่อ */}
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            multiline
            minRows={5}
            label="บทคัดย่อ :"
            value={form.abstract}
            onChange={update("abstract")}
          />
        </Grid>

        {/* แถวคู่: ผู้เขียนหลัก / ผู้เขียนร่วม */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="ชื่อผู้เขียน :"
            value={form.authors}
            onChange={update("authors")}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="ชื่อผู้เขียน (ร่วม) :"
            value={form.coauthors}
            onChange={update("coauthors")}
          />
        </Grid>

        {/* แถวคู่: ปีที่ตีพิมพ์ / สถานที่จัดเก็บ */}
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="ปีที่ตีพิมพ์ :"
            value={form.year}
            onChange={update("year")}
            slotProps={{ input: { inputMode: "numeric" } }}
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <TextField
            fullWidth
            label="สถานที่จัดเก็บ :"
            value={form.department}
            onChange={update("department")}
          />
        </Grid>

        {/* อัปโหลดไฟล์ */}
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <span style={{ minWidth: 140 }}>อัปโหลดไฟล์ผลงาน :</span>
            <Button component="label" variant="outlined" sx={{ borderRadius: 2 }}>
              เลือกไฟล์ผลงาน
              <input type="file" hidden onChange={chooseFile} />
            </Button>
            <span style={{ color: PSU.subtext }}>
              {form.file ? form.file.name : ""}
            </span>
          </Stack>
        </Grid>

        {/* ปุ่มขวาล่าง */}
        <Grid size={{ xs: 12 }}>
          <Stack direction="row" justifyContent="end" sx={{ mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ bgcolor: PSU.navy, "&:hover": { bgcolor: "#23345a" }, px: 4, borderRadius: 2 }}
            >
              บันทึก
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}
