import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TopBarTeacher from "@/components/TopBarTeacher";
import Footer from "@/components/Footer";
import NewPageClient from "./NewPageClient";

export default function TeacherProjectNew() {
  return (
    <main>
      <TopBarTeacher />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" align="center" fontWeight={800} sx={{ mb: 2 }}>
          New my projects
        </Typography>

        <NewPageClient />
        <Footer />
      </Container>
    </main>
  );
}
