import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type Stat = { label: string; value: number | string };

export default function RoleStatRow({ items }: { items: Stat[] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {items.map((it) => (
        <Grid key={it.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
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
