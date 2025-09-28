import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

type KPI = { label: string; value: number | string; hint?: string };

export default function TeacherKPI({ items }: { items: KPI[] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {items.map((k) => (
        <Grid key={k.label} size={{ xs: 12, sm: 6, md: 3 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">{k.value}</Typography>
              <Typography variant="body2" color="text.secondary">{k.label}</Typography>
              {k.hint ? (
                <Typography variant="caption" color="text.secondary">{k.hint}</Typography>
              ) : null}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
