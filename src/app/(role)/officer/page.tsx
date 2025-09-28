"use client";
import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleStatRow from "@/components/RoleStatRow";
import RoleQuickActions from "@/components/RoleQuickActions";
import RoleTaskTable from "@/components/RoleTaskTable";
import RoleTabs from "@/components/RoleTabs";

export default function OfficerHome() {
  const stats = [
    { label: "ผลงานของฉัน", value: 42 },
    { label: "รอตรวจสอบ", value: 7 },
    { label: "ต้องแก้ไข", value: 3 },
    { label: "อนุมัติแล้ว", value: 32 },
  ];
  const actions = [
    { title: "เพิ่มผลงานใหม่", desc: "กรอกแบบฟอร์ม/อัปโหลดไฟล์",
      primary: { label: "เริ่มต้น", href: "/officer/project/new" },
      secondary: { label: "คู่มือการกรอก", href: "/publications" } },
    { title: "ติดตามสถานะ", desc: "ดูรายการงานที่รอ/ต้องแก้ไข",
      primary: { label: "ดูรายการ", href: "/officer/project" },
      secondary: { label: "รายงานสรุป", href: "/search" } },
  ];
  const rows = [
    { id: "1", title: "Smart Campus IoT", owner: "ฉัน", status: "รอตรวจ", updated: "วันนี้" },
    { id: "2", title: "Green Computing", owner: "ฉัน", status: "ต้องแก้ไข", updated: "เมื่อวาน" },
    { id: "3", title: "AR for Classroom", owner: "ฉัน", status: "อนุมัติแล้ว", updated: "3 วันที่แล้ว" },
  ];

  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/officer" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="แดชบอร์ดเจ้าหน้าที่" subtitle="สรุปงานของฉัน และเมนูทำงานประจำวัน" />
        <RoleStatRow items={stats} />
        <RoleQuickActions actions={actions} />
        <RoleTaskTable rows={rows} title="งานล่าสุดของฉัน" />
        <Footer />
      </Container>
    </main>
  );
}
