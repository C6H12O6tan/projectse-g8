import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function SectionHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h5" fontWeight={700}>{title}</Typography>
      {subtitle ? <Typography variant="body2" color="text.secondary">{subtitle}</Typography> : null}
    </Box>
  );
}
