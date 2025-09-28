import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type Action = {
  title: string;
  desc?: string;
  primary: { label: string; href?: string; onClick?: () => void };
  secondary?: { label: string; href?: string; onClick?: () => void };
};

export default function TeacherQuickActions({ actions }: { actions: Action[] }) {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {actions.map((a, i) => (
        <Grid key={i} size={{ xs: 12, md: 6 }}>
          <Card variant="outlined">
            <CardContent>
              <Typography fontWeight={700}>{a.title}</Typography>
              {a.desc ? (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  {a.desc}
                </Typography>
              ) : null}
              <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
                {a.primary.href ? (
                  <Button variant="contained" href={a.primary.href}>{a.primary.label}</Button>
                ) : (
                  <Button variant="contained" onClick={a.primary.onClick}>{a.primary.label}</Button>
                )}
                {a.secondary ? (
                  a.secondary.href ? (
                    <Button variant="text" href={a.secondary.href}>{a.secondary.label}</Button>
                  ) : (
                    <Button variant="text" onClick={a.secondary.onClick}>{a.secondary.label}</Button>
                  )
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
