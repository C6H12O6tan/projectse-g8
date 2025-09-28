"use client";
import { useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

export type ProjectPayload = {
  title: string;
  type: "วิจัย" | "วิชาการ" | "นวัตกรรม" | "";
  authors: string;
  year: string;
  department: string;
  abstract: string;
};

export default function ProjectForm({
  initial, mode = "new", onSubmit
}: {
  initial?: Partial<ProjectPayload>;
  mode?: "new" | "edit";
  onSubmit?: (data: ProjectPayload) => void;
}) {
  const [data, setData] = useState<ProjectPayload>({
    title: "", type: "", authors: "", year: "", department: "", abstract: "",
    ...initial,
  });
  const [error, setError] = useState<string | null>(null);

  const handle = (k: keyof ProjectPayload) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData(d => ({ ...d, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    // validate ง่ายๆ
    if (!data.title || !data.type || !data.year) {
      setError("กรอก ‘ชื่อผลงาน’, ‘ประเภท’, ‘ปีที่ตีพิมพ์’ ให้ครบ");
      return;
    }
    setError(null);
    onSubmit?.(data);
  };

  return (
    <Paper elevation={0} sx={{ p: 2, border: "1px solid #eee", borderRadius: 2 }}>
      <form onSubmit={submit}>
        <Grid container spacing={2}>
          <Grid size={{ xs:12, md:8 }}>
            <TextField fullWidth label="ชื่อผลงาน *" value={data.title} onChange={handle("title")} />
          </Grid>
          <Grid size={{ xs:12, md:4 }}>
            <TextField select fullWidth label="ประเภท *" value={data.type} onChange={handle("type")}>
              <MenuItem value="วิจัย">วิจัย</MenuItem>
              <MenuItem value="วิชาการ">วิชาการ</MenuItem>
              <MenuItem value="นวัตกรรม">นวัตกรรม</MenuItem>
            </TextField>
          </Grid>
          <Grid size={{ xs:12, md:6 }}>
            <TextField fullWidth label="ผู้จัดทำ (คั่นด้วย ,)" value={data.authors} onChange={handle("authors")} />
          </Grid>
          <Grid size={{ xs:12, md:3 }}>
            <TextField fullWidth type="number" label="ปีที่ตีพิมพ์ *" value={data.year} onChange={handle("year")} />
          </Grid>
          <Grid size={{ xs:12, md:3 }}>
            <TextField fullWidth label="หน่วยงาน/ภาควิชา" value={data.department} onChange={handle("department")} />
          </Grid>
          <Grid size={{ xs:12 }}>
            <TextField fullWidth multiline minRows={4} label="บทคัดย่อ" value={data.abstract} onChange={handle("abstract")} />
          </Grid>
          <Grid size={{ xs:12 }}>
            <Typography variant="body2" color="text.secondary">แนบไฟล์ (จำลอง – ยังไม่เชื่อมหลังบ้าน)</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Button variant="outlined">เลือกไฟล์</Button>
              <Button variant="text">ล้างไฟล์</Button>
            </Stack>
          </Grid>
        </Grid>

        {error ? <Alert severity="warning" sx={{ mt: 2 }}>{error}</Alert> : null}

        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
          {mode === "new" ? (
            <>
              <Button type="submit" variant="contained">บันทึกแบบร่าง</Button>
              <Button variant="outlined">ส่งตรวจสอบ</Button>
            </>
          ) : (
            <>
              <Button type="submit" variant="contained">บันทึกการแก้ไข</Button>
              <Button variant="outlined">กลับ</Button>
            </>
          )}
        </Stack>
      </form>
    </Paper>
  );
}
