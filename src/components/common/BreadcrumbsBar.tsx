import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export default function BreadcrumbsBar({
  items,
}: { items: { label: string; href?: string }[] }) {
  return (
    <Box sx={{ my: 1 }}>
      <MuiBreadcrumbs>
        {items.map((it, i) =>
          it.href ? (
            <Link key={i} href={it.href} style={{ textDecoration: "none" }}>
              {it.label}
            </Link>
          ) : (
            <Typography key={i} color="text.secondary">{it.label}</Typography>
          )
        )}
      </MuiBreadcrumbs>
    </Box>
  );
}
