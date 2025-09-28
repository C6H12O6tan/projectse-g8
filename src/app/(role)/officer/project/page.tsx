import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import RoleHeader from "@/components/RoleHeader";
import RoleTabs from "@/components/RoleTabs";
import ExternalGrid from "@/components/ExternalGrid";

export default function OfficerProject() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ py: 4 }}>
        <RoleTabs base="/officer" tabs={["Home","project","personnel","setting"]} />
        <RoleHeader title="โครงการ/ผลงานของฉัน" subtitle="แก้ไข/ติดตามรายการผลงาน" />
        <ExternalGrid />
        <Footer />
      </Container>
    </main>
  );
}
