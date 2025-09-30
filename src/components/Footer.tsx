import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box sx={{ mt: 6, py: 3, textAlign: "center", color: "text.secondary" }}>
      <Typography variant="caption">© {new Date().getFullYear()} SE G8</Typography>
    </Box>
  );
}
