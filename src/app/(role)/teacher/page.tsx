"use client";
import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleStatRow from "@/components/RoleStatRow";
import RoleQuickActions from "@/components/RoleQuickActions";
import RoleTaskTable from "@/components/RoleTaskTable";
import RoleTabs from "@/components/RoleTabs";

export default function TeacherHome() {
  const stats = [
    { label: "ผลงานของฉัน", value: 18 },
    { label: "รออนุมัติ", value: 2 },
    { label: "ต้องแก้ไข", value: 1 },
    { label: "เผยแพร่แล้ว", value: 15 },
  ];
  const actions = [
    { title: "อัปโหลดผลงาน", desc: "เพิ่มผลงาน/หลักฐานแนบ",
      primary: { label: "เพิ่มผลงาน", href: "/teacher/project/new" },
      secondary: { label: "ตัวอย่างที่ดี", href: "/publications" } },
    { title: "จัดการข้อมูลส่วนตัว", desc: "ปรับปรุงโปรไฟล์/ลิงก์ ORCID/GS",
      primary: { label: "แก้ไขโปรไฟล์", href: "/teacher/personnel" },
      secondary: { label: "คำแนะนำ", href: "/search" } },
  ];
  const rows = [
    { id: "1", title: "AI-driven Advising", owner: "อ. นีม", status: "เผยแพร่แล้ว", updated: "1 ชม.ที่แล้ว" },
    { id: "2", title: "AR for Classroom", owner: "อ. นีม", status: "รออนุมัติ", updated: "2 วันก่อน" },
    { id: "3", title: "Learning Analytics", owner: "อ. นีม", status: "ต้องแก้ไข", updated: "สัปดาห์ก่อน" },
  ];

  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/teacher" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="หน้าอาจารย์" subtitle="จัดการผลงานของฉันและข้อมูลส่วนตัว" />
        <RoleStatRow items={stats} />
        <RoleQuickActions actions={actions} />
        <RoleTaskTable rows={rows} title="ผลงานล่าสุดของฉัน" />
        <Footer />
      </Container>
    </main>
  );
}
