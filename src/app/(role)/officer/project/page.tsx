"use client";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ChecklistRounded from "@mui/icons-material/ChecklistRounded";

import TopBarOfficer from "@/components/TopBarOfficer";
import ProjectThumb from "@/components/cards/ProjectThumb";
import SearchBarRow from "@/components/teacher/SearchBarRow";
import { PSU } from "@/theme/brand";

/** ——— MOCK DATA ——— */
const MY = [
  { id: "p4", title: "Digital Learning in HE (MOOC)", img: "/mock/4.jpg", tag: "UPDATE: 2025", author: "ดร.บุศบุศ กภักดีผล" },
];

/** ลิงก์ไปหน้าตรวจสอบ/ยืนยัน
 *  - ถ้าชื่อมีคำว่า MOOC (หรือ Digital Learning) จะพาไปรีวิวหน้า MOOC โดยเฉพาะ
 *  - อย่างอื่นแนบ ?project=<id> ไปหน้ารีวิวรวม
 */
function getReviewHref(title: string, id: string) {
  const t = title.toLowerCase();
  if (t.includes("mooc") || t.includes("digital learning")) return `/officer/review/mooc`;
  return `/officer/review?project=${encodeURIComponent(id)}`;
}

export default function OfficerProjectList() {
  return (
    <main>
      <TopBarOfficer />
      <Container className="container" sx={{ py: { xs: 2.5, md: 3 } }}>
        {/* หัวข้อ + แถบค้นหา/ปุ่มไปรีวิวรวม */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            mb: 1.25,
          }}
        >
          <Box>
            <Typography variant="h6" fontWeight={900} sx={{ lineHeight: 1, mb: 0.5 }}>
              Projects
            </Typography>
            <Typography variant="body2" sx={{ color: PSU.subtext }}>
              รายการโปรเจคในระบบ และลิงก์ไปหน้า “ตรวจสอบทั้งหมด”
            </Typography>
          </Box>

          <Box sx={{ minWidth: { xs: "100%", sm: 420 }, maxWidth: 520 }}>
            <SearchBarRow
              rightLabel="ตรวจสอบทั้งหมด"
              rightVariant="contained"
              rightHref="/officer/review"
            />
          </Box>
        </Box>

        <Grid container spacing={2}>
          {/* การ์ดไปหน้าตรวจสอบรวม */}
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
                href="/officer/review"
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

          {/* การ์ดโปรเจค + ปุ่ม “ยืนยัน” มุมขวาล่าง */}
          {MY.map((it) => {
            const reviewHref = getReviewHref(it.title, it.id);
            // ถ้าอยากให้ “MOOC” คลิกทั้งการ์ดไปยืนยันทันที ให้ใช้ reviewHref แทน detailHref ได้
            const detailHref = `/officer/review/${it.id}`;

            return (
              <Grid key={it.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Box sx={{ position: "relative" }}>
                  <ProjectThumb
                    href={detailHref}
                    image={it.img}
                    title={it.title}
                    author={it.author}
                    tag={it.tag}
                  />

              
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ height: 10 }} />
      </Container>
    </main>
  );
}
