import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function RoleHeader({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" fontWeight={700}>{title}</Typography>
        {subtitle ? (
          <Typography variant="body2" color="text.secondary">{subtitle}</Typography>
        ) : null}
      </Box>
      {right}
    </Box>
  );
}
