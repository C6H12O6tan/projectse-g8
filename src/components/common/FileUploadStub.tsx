"use client";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRef, useState } from "react";

export default function FileUploadStub({
  label = "เลือกไฟล์",
  hint = "เดโม่ฝั่งหน้าบ้าน: ยังไม่อัปโหลดจริง",
}: { label?: string; hint?: string }) {
  const ref = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string>("");

  return (
    <Stack spacing={1}>
      <Stack direction="row" spacing={1}>
        <Button
          variant="outlined"
          onClick={() => ref.current?.click()}
        >
          {label}
        </Button>
        <input
          type="file"
          ref={ref}
          hidden
          onChange={(e) => setFileName(e.target.files?.[0]?.name || "")}
        />
        {fileName ? <Typography variant="body2">{fileName}</Typography> : null}
      </Stack>
      <Typography variant="caption" color="text.secondary">{hint}</Typography>
    </Stack>
  );
}
