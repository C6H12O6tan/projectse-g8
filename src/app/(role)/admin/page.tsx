import Container from "@mui/material/Container";
import TopBar from "@/components/TopBar";
import Footer from "@/components/Footer";
import Typography from "@mui/material/Typography";

export default function AdminHome() {
  return (
    <main>
      <TopBar />
      <Container className="container" sx={{ pt: 2 }}>
        <Typography variant="h5">แดชบอร์ดแอดมิน</Typography>
        <Footer />
      </Container>
    </main>
  );
}
