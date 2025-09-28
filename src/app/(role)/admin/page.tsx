"use client";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { ROLE_COLORS } from "@/theme/brand";
import RoleTopBar from "@/components/RoleTopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleStatRow from "@/components/RoleStatRow";
import RoleQuickActions from "@/components/RoleQuickActions";
import RoleTaskTable from "@/components/RoleTaskTable";

export default function AdminHome() {
  const C = ROLE_COLORS.admin;
  const stats = [
    { label: "ผู้ใช้ทั้งหมด", value: 128 },
    { label: "รอตรวจ/อนุมัติ", value: 19 },
    { label: "ผลงานเดือนนี้", value: 42 },
    { label: "ข้อผิดพลาด", value: 3 },
  ];
  const actions = [
    { title: "จัดการผู้ใช้", desc: "เพิ่ม/ปิดใช้งาน/รีเซ็ต",
      primary: { label: "เปิดหน้าจัดการ", href: "/admin/personnel" } },
    { title: "ตรวจสอบความถูกต้อง", desc: "รายการที่รอการตรวจสอบ",
      primary: { label: "ไปที่รายการ", href: "/admin/project" } },
  ];
  const rows = [
    { id: "1", title: "Smart Campus IoT", owner: "เจ้าหน้าที่ A", status: "รอตรวจ", updated: "วันนี้" },
    { id: "2", title: "Green Computing", owner: "เจ้าหน้าที่ B", status: "รอตรวจ", updated: "เมื่อวาน" },
    { id: "3", title: "AR for Classroom", owner: "เจ้าหน้าที่ C", status: "อนุมัติแล้ว", updated: "3 วันก่อน" },
  ];

  return (
    <main>
      <RoleTopBar role="admin" />
      <div style={{ background: C.primary, color: C.onPrimary, borderBottom: `3px solid ${C.accent}` }}>
        <Container className="container" style={{ paddingTop: 16, paddingBottom: 16 }}>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>แดชบอร์ดแอดมิน</Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>ภาพรวมระบบและเมนูหลักของผู้ดูแล</Typography>
        </Container>
      </div>

      <Container className="container" sx={{ py: 3 }}>
        <RoleHeader title="ภาพรวม" />
        <RoleStatRow items={stats} />
        <RoleQuickActions actions={actions} />
        <RoleTaskTable rows={rows} title="งานล่าสุดในระบบ" />
        <Footer />
      </Container>
    </main>
  );
}
