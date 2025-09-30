"use client";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  placeholder?: string;
  rightLabel: string;
  onRightClick?: () => void;
  rightHref?: string;           // ถ้ามี จะเป็นลิงก์
  rightVariant?: "outlined" | "contained";
};

export default function SearchBarRow({
  placeholder = "ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย",
  rightLabel,
  onRightClick,
  rightHref,
  rightVariant = "outlined",
}: Props) {
  return (
    <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
      <TextField
        fullWidth
        size="small"
        placeholder={placeholder}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          },
        }}
      />
      <Button
        variant={rightVariant}
        onClick={onRightClick}
        href={rightHref}
        sx={{ whiteSpace: "nowrap", borderRadius: 2 }}
      >
        {rightLabel}
      </Button>
    </Stack>
  );
}
