import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import { PSU } from "@/theme/brand";

export default function ProjectThumb({
  href,
  image,
  title,
  author,
  tag, // เช่น "UPDATE: 2025"
}: {
  href?: string;
  image?: string;
  title: string;
  author?: string;
  tag?: string;
}) {
  const Inner = (
    <Box sx={{ p: 2.2 }}>
      {/* หัวเรื่อง */}
      <Typography
        variant="body2"
        sx={{ fontWeight: 800, color: "white", letterSpacing: 0.2 }}
      >
        {title}
      </Typography>
      {author ? (
        <Typography variant="caption" sx={{ color: "rgba(255,255,255,.85)" }}>
          {author}
        </Typography>
      ) : null}

      {/* รูปตัวอย่างในกรอบ */}
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
        {/* ถ้ามีรูปให้แสดง ถ้าไม่มีก็ฟอลแบ็กเป็นพื้นไล่ระดับ */}
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={title}
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        ) : (
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, rgba(255,255,255,.18), rgba(255,255,255,.06))",
            }}
          />
        )}
      </Box>

      {/* ป้ายอัปเดตล่างซ้าย */}
      {tag ? (
        <Chip
          label={tag}
          size="small"
          sx={{
            mt: 1.25,
            bgcolor: "#E8ED9A",
            color: "#38405A",
            borderRadius: 1.5,
            fontWeight: 700,
          }}
        />
      ) : null}
    </Box>
  );

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 2,
        backgroundColor: "#2B3E6E", // น้ำเงิน PSU โทนการ์ด
        boxShadow: PSU.cardShadow,
        // เส้นขอบนิด ๆ ให้ดูนุ่ม
        outline: `1px solid rgba(255,255,255,.04)`,
      }}
    >
      {href ? <CardActionArea href={href}>{Inner}</CardActionArea> : Inner}
    </Card>
  );
}
