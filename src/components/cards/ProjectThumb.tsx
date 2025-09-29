"use client";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { PSU } from "@/theme/brand";

const DEFAULT_COVER = "/pro3.jpg";
/** ถ้าต้องการให้ทุกใบใช้ภาพเดียวกัน ให้ true */
const USE_GLOBAL_COVER = true;

export default function ProjectThumb({
  href, image, title, author, tag
}: {
  href?: string;
  image?: string;
  title: string;
  author?: string;
  tag?: string;
}) {
  const [broken, setBroken] = useState(false);

  // ใช้ภาพ global ถ้าเปิด USE_GLOBAL_COVER, ถ้ารูปเสีย/ไม่มี → fallback เป็น DEFAULT_COVER
  const cover = USE_GLOBAL_COVER ? DEFAULT_COVER : (image && !broken ? image : DEFAULT_COVER);

  const Inner = (
    <Box sx={{ p: 2.2 }}>
      <Typography variant="body2" sx={{ fontWeight: 800, color: "#fff", lineHeight: 1.2 }}>
        {title}
      </Typography>
      {author && (
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,.85)" }}>
          {author}
        </Typography>
      )}

      <Box
        sx={{
          mt: 1.5,
          height: 140,
          borderRadius: 2,
          overflow: "hidden",
          bgcolor: "rgba(255,255,255,.12)",
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,.08)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          src={cover}
          onError={() => setBroken(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </Box>

      {tag && (
        <Chip
          label={tag}
          size="small"
          sx={{ mt: 1.25, bgcolor: "#E8ED9A", color: "#38405A", borderRadius: 1.5, fontWeight: 700 }}
        />
      )}
    </Box>
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: "#2B3E6E",
        boxShadow: PSU.cardShadow,
        outline: "1px solid rgba(255,255,255,.04)",
      }}
    >
      {href ? <CardActionArea href={href}>{Inner}</CardActionArea> : Inner}
    </Card>
  );
}
