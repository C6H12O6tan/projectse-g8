"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import { PSU } from "@/theme/brand";
import TopBarOfficer from "@/components/TopBarOfficer";
import ProjectThumb from "@/components/cards/ProjectThumb";
import SearchBarRow from "@/components/teacher/SearchBarRow";
import ChecklistRounded from "@mui/icons-material/ChecklistRounded";

const REVIEW_BASE = "/officer/review";

const MY = [
  { id: "p1", title: "PhenoRobot", img: "/mock/1.jpg", tag: "UPDATE: 2025", author: "ดร.ธีระ ภัทรพงษ์นันท์" },
  { id: "p2", title: "AR for Classroom", img: "/mock/2.jpg", tag: "UPDATE: 2024", author: "ดร.สมชาย อินทร์ทอง" },
  { id: "p3", title: "Learning Analytics", img: "/mock/3.jpg", tag: "UPDATE: 2023", author: "ดร.ปริณา ตั้งมั่น" },
  { id: "p4", title: "Digital Learning in HE", img: "/mock/4.jpg", tag: "UPDATE: 2025", author: "ดร.บุศบุศ กภักดีผล" },
];

// ช่วยแม็พชื่อโปรเจ็กต์ที่เกี่ยวกับ MOOC ให้ไป path /officer/review/mooc
function getReviewPathIfMOOC(title: string): string | null {
  const t = title.toLowerCase();
  if (t.includes("mooc") || t.includes("digital learning")) {
    return `${REVIEW_BASE}/mooc`;
  }
  return null;
}

export default function OfficerProjectList() {
  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: { xs: 2.5, md: 3 } }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1, mb: 1.25 }}>
          <Box>
            <Typography variant="h6" fontWeight={900} sx={{ lineHeight: 1, mb: 0.5 }}>
              Projects
            </Typography>
            <Typography variant="body2" sx={{ color: PSU.subtext }}>
              รายการโปรเจคในระบบ และลิงก์ไปหน้า “ตรวจสอบทั้งหมด”
            </Typography>
          </Box>

          {/* ทำให้คอมแพคขึ้น */}
          <Box sx={{ minWidth: { xs: "100%", sm: 420 }, maxWidth: 520 }}>
            <SearchBarRow
              rightLabel="ตรวจสอบทั้งหมด"
              rightVariant="contained"
              rightHref={REVIEW_BASE}
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* การ์ดไปหน้าตรวจสอบทั้งหมด */}
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                height: 212,
                borderRadius: 2,
                border: `1px dashed ${PSU.cardBorder}`,
                bgcolor: "#fafcff",
                transition: "border-color .2s, transform .12s",
                "&:hover": { borderColor: PSU.sky, transform: "translateY(-1px)" },
              }}
            >
              <CardActionArea
                component="a"
                href={REVIEW_BASE} // ✅ คลิกแล้วไปหน้าตรวจสอบทั้งหมด
                sx={{ height: "100%", display: "grid", placeItems: "center", p: 1.5 }}
              >
                <CardContent sx={{ textAlign: "center" }}>
                  <ChecklistRounded sx={{ fontSize: 44, color: PSU.navy, mb: 1 }} />
                  <Typography fontWeight={800} sx={{ color: PSU.navy, mb: 0.25 }}>
                    ไปหน้าตรวจสอบผลงานทั้งหมด
                  </Typography>
                  <Typography variant="body2" sx={{ color: PSU.subtext }}>
                    ตรวจ/ยืนยันความถูกต้อง จัดการสถานะ อนุมัติหรือส่งกลับ
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>

          {/* รายการโปรเจ็กต์ */}
          {MY.map((it) => {
            // ถ้าเป็นโปรเจ็กต์สาย MOOC ให้เด้งไปหน้ายืนยันเฉพาะตัว
            const moocReview = getReviewPathIfMOOC(it.title);
            const href = moocReview ?? `/officer/project/${it.id}`;
            return (
              <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <ProjectThumb
                  href={href}
                  image={it.img}
                  title={it.title}
                  author={it.author}
                  tag={it.tag}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ height: 10 }} />
      </Container>
    </main>
  );
}
