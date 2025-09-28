"use client";
import { useMemo, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ROLE_COLORS } from "@/theme/brand";

import RoleTopBar from "@/components/RoleTopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";

import TeacherKPI from "@/components/teacher/TeacherKPI";
import TeacherQuickActions from "@/components/teacher/TeacherQuickActions";
import TeacherStatusChips, { TeacherFilter } from "@/components/teacher/TeacherStatusChips";
import TeacherTable, { Row } from "@/components/teacher/TeacherTable";
import TeacherAnnouncements from "@/components/teacher/TeacherAnnouncements";

export default function TeacherHome() {
  // สีสำหรับ teacher
  const C = ROLE_COLORS.teacher;

  // KPI ตามแบบ
  const kpis = [
    { label: "ผลงานของฉัน", value: 18 },
    { label: "รออนุมัติ", value: 2 },
    { label: "ต้องแก้ไข", value: 1 },
    { label: "เผยแพร่แล้ว", value: 15 },
  ];

  // ปุ่มลัดงานหลัก
  const actions = [
    {
      title: "อัปโหลดผลงาน",
      desc: "เพิ่มผลงาน/หลักฐานแนบ ส่งตรวจสอบและติดตามสถานะ",
      primary: { label: "เพิ่มผลงาน", href: "/teacher/project/new" },
      secondary: { label: "ตัวอย่างที่ดี", href: "/publications" },
    },
    {
      title: "จัดการข้อมูลส่วนตัว",
      desc: "อัปเดตโปรไฟล์ ลิงก์ ORCID / Google Scholar",
      primary: { label: "แก้ไขโปรไฟล์", href: "/teacher/personnel" },
      secondary: { label: "คำแนะนำ", href: "/search" },
    },
  ];

  // ตาราง + ตัวกรอง
  const allRows: Row[] = [
    { id: "1", title: "AI-driven Advising", status: "เผยแพร่แล้ว", updated: "1 ชม.ที่แล้ว" },
    { id: "2", title: "AR for Classroom", status: "รออนุมัติ", updated: "2 วันก่อน" },
    { id: "3", title: "Learning Analytics", status: "ต้องแก้ไข", updated: "สัปดาห์ก่อน" },
  ];
  const [activeFilter, setActiveFilter] = useState<TeacherFilter>("ทั้งหมด");
  const filteredRows = useMemo(
    () => (activeFilter === "ทั้งหมด" ? allRows : allRows.filter(r => r.status === activeFilter)),
    [activeFilter]
  );

  const announcements = [
    { title: "อัปเดตแบบฟอร์มปีการศึกษาใหม่", desc: "ใช้ฟอร์มเวอร์ชัน 2025 ตั้งแต่เดือนหน้า", date: "ประกาศ 25/09" },
    { title: "ปรับเกณฑ์การอนุมัติ", desc: "แนบไฟล์ต้นฉบับและ DOI (ถ้ามี)", date: "มีผลทันที" },
  ];

  return (
    <main>
      {/* NAVBAR เฉพาะบทบาท (Teacher) */}
      <RoleTopBar role="teacher" />

      {/* HERO/HEADER แถบสี (ให้เหมือนแบบ) */}
      <div style={{ background: C.primary, color: C.onPrimary, borderBottom: `3px solid ${C.accent}` }}>
        <Container className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>หน้าอาจารย์</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            จัดการผลงานของฉันและข้อมูลส่วนตัว
          </Typography>
        </Container>
      </div>

      {/* เนื้อหา */}
      <Container className="container" sx={{ py: 3 }}>
        {/* KPI */}
        <TeacherKPI items={kpis} />

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 8 }}>
            {/* การ์ดปุ่มลัด */}
            <TeacherQuickActions actions={actions} />

            {/* ฟิลเตอร์สถานะ */}
            <TeacherStatusChips onChange={setActiveFilter} />

            {/* ตาราง */}
            <TeacherTable rows={filteredRows} title="ผลงานล่าสุดของฉัน" />
          </Grid>

          {/* แถบขวา: ประกาศ */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Paper elevation={0} sx={{ p: 0, border: "1px solid #eee", borderRadius: 2, overflow: "hidden" }}>
              <div style={{ background: C.accent, color: C.onPrimary, padding: 12 }}>
                <Typography variant="subtitle2" fontWeight={800}>ประกาศสำคัญ</Typography>
              </div>
              <div style={{ padding: 12 }}>
                <TeacherAnnouncements items={announcements} />
              </div>
            </Paper>
          </Grid>
        </Grid>

        <Footer />
      </Container>
    </main>
  );
}
