import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function StatCards() {
  const items = [
    { label: "ผลงานทั้งหมด", value: 128 },
    { label: "รอตรวจสอบ", value: 12 },
    { label: "อนุมัติแล้ว", value: 98 },
    { label: "ตีกลับแก้ไข", value: 18 },
  ];
  return (
    <Grid container spacing={2}>
      {items.map((it) => (
        <Grid key={it.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined" sx={{ borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6">{it.value}</Typography>
              <Typography variant="body2" color="text.secondary">{it.label}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
