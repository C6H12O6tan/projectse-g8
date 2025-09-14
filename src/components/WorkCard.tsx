"use client";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

export type Work = { id: string; title: string; author: string; year: number; featured?: boolean };

export default function WorkCard({ w }: { w: Work }) {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 1 }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="subtitle1" fontWeight={700} gutterBottom>
            {w.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {w.author} • {w.year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
