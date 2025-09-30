"use client";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import { useState } from "react";

const ALL = ["ทั้งหมด", "รออนุมัติ", "ต้องแก้ไข", "เผยแพร่แล้ว"] as const;
export type TeacherFilter = typeof ALL[number];

export default function TeacherStatusChips({
  onChange
}: { onChange?: (value: TeacherFilter) => void }) {
  const [active, setActive] = useState<TeacherFilter>("ทั้งหมด");
  const click = (v: TeacherFilter) => {
    setActive(v);
    onChange?.(v);
  };

  return (
    <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
      {ALL.map((v) => (
        <Chip
          key={v}
          label={v}
          variant={active === v ? "filled" : "outlined"}
          color={active === v ? "primary" : undefined}
          onClick={() => click(v)}
        />
      ))}
    </Stack>
  );
}
