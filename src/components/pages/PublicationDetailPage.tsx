import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DownloadRounded from "@mui/icons-material/DownloadRounded";

/** ---------- fetch helpers (ใช้ร่วมทุกบทบาท) ---------- */
function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export type PublicationDetail = {
  id: string | number; title: string;
  authors?: string[] | string | null; coauthors?: string[] | string | null;
  year?: string | number | null; location?: string | null; dept?: string | null;
  abstract?: string | null; summary?: string | null;
};

function toList(v?: string[] | string | null): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : String(v).split(/[,;]\s*/).map(s => s.trim()).filter(Boolean);
}

async function fetchPublication(id: string): Promise<PublicationDetail | null> {
  const base = getBaseUrl();
  const urls = [
    `${base}/api/publications/${id}`,
    `${base}/api/publications?id=${encodeURIComponent(id)}`,
  ];
  for (const u of urls) {
    const res = await fetch(u, { cache: "no-store" });
    if (res.ok) {
      const j = await res.json();
      const d = (j?.item ?? j?.data ?? j) as any;
      return {
        id: d?.id ?? id,
        title: d?.title ?? "-",
        authors: d?.authors ?? d?.author ?? null,
        coauthors: d?.coAuthors ?? d?.coauthors ?? null,
        year: d?.year ?? d?.publishedYear ?? null,
        location: d?.location ?? null,
        dept: d?.dept ?? d?.department ?? null,
        abstract: d?.abstract ?? d?.summary ?? null,
        summary: d?.summary ?? null,
      };
    }
  }
  return null;
}

/** ---------- คอมโพเนนต์กลาง (ไม่มี TopBar) ---------- */
export async function PublicationDetailContent({ id }: { id: string }) {
  const p = await fetchPublication(id);

  if (!p) {
    return (
      <Container sx={{ py: 4 }}>
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <Typography variant="h6">ไม่พบข้อมูลผลงาน</Typography>
        </Paper>
      </Container>
    );
  }

  const authors = toList(p.authors).join(", ") || "-";
  const coauthors = toList(p.coauthors).join(", ") || "-";
  const dept = p.dept || p.location || "-";
  const abstract = p.abstract || p.summary || "-";

  return (
    <Container sx={{ py: 4 }}>
      <Typography
        variant="h4"
        fontWeight={800}
        align="center"
        sx={{ mb: 3, color: "#222", letterSpacing: 0.2 }}
      >
        {p.title}
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: { xs: 2, md: 3 },
          borderRadius: 4,
          border: "1px solid #E6EBF2",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
        }}
      >
        <Grid container spacing={3}>
          {/* ซ้าย: รายละเอียด/ปุ่ม */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="subtitle1" fontWeight={800} sx={{ mb: 1.5 }}>
              รายละเอียดผลงาน
            </Typography>

            <Box
              sx={{
                width: "100%",
                aspectRatio: "1 / 1",
                bgcolor: "#DCDDE2",
                borderRadius: 4,
                display: "grid",
                placeItems: "center",
                color: "#777",
                fontWeight: 700,
                mb: 2,
              }}
            >
              ภาพ
            </Box>

            {/* ปุ่มดาวน์โหลด เล่นได้แต่ไม่ทำ action ตามที่ตกลง */}
            <Button
              type="button"
              startIcon={<DownloadRounded />}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: "#0f2e57",
                "&:hover": { bgcolor: "#0c2546" },
                borderRadius: 999,
                py: 1.2,
                mb: 2,
              }}
            >
              ดาวน์โหลดเอกสารฉบับเต็ม
            </Button>

            <InfoRow label="ผู้เขียน" value={authors} />
            <InfoRow label="ผู้เขียน(ร่วม)" value={coauthors} />
            <InfoRow label="ปีที่ตีพิมพ์" value={String(p.year ?? "-")} />
            <InfoRow label="สถานที่จัดเก็บ" value={dept} />
            <InfoRow
              label="ไฟล์ .pdf"
              value={
                <Typography
                  component="span"
                  sx={{ textDecoration: "underline", color: "#0f2e57", cursor: "pointer" }}
                >
                  ดาวน์โหลดผลงานตีพิมพ์
                </Typography>
              }
            />
          </Grid>

          {/* ขวา: ชื่อผลงาน + บทคัดย่อ */}
          <Grid size={{ xs: 12, md: 8 }}>
            <Stack spacing={3}>
              <section>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                  ชื่อผลงาน
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                  {p.title}
                </Typography>
              </section>

              <section>
                <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>
                  บทคัดย่อ
                </Typography>
                <Typography sx={{ whiteSpace: "pre-wrap", lineHeight: 1.9 }}>
                  {abstract}
                </Typography>
              </section>
            </Stack>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

/** ---------- แถว label:value ---------- */
function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
      <Typography variant="body2" sx={{ minWidth: 110, color: "#6B7280" }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ flex: 1, color: "#111827" }}>
        {value}
      </Typography>
    </Stack>
  );
}
