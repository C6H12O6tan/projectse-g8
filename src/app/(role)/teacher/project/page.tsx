import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleTabs from "@/components/RoleTabs";
import ExternalGrid from "@/components/ExternalGrid";

export default function TeacherProject() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/teacher" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="โครงการ/ผลงานของฉัน" subtitle="แก้ไข/ติดตามรายการผลงานของอาจารย์" />
        <ExternalGrid />
        <Footer />
      </Container>
    </main>
  );
}
