import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import TopBarPublic from "@/components/TopBarPublic";
import { PSU } from "@/theme/brand";

export default function PublicationDetail({ params }: { params: { id: string } }) {
  const data = {
    title: "Digital Learning in Higher Education",
    author: "Jane Cooper",
    coauthors: "",
    year: 2558,
    dept: "คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์",
    file: "paper.pdf",
    abstract:
      "งานวิจัยนี้มีวัตถุประสงค์เพื่อศึกษาบทบาทและผลกระทบของการเรียนรู้ดิจิทัล ... (ตัวอย่างข้อความ)",
  };

  return (
    <main>
      <TopBarPublic />
      <Container className="container" sx={{ py: 3 }}>
        <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
          รายละเอียดผลงาน
        </Typography>

        <Paper elevation={0}
          sx={{ p: 2, border: `1px solid ${PSU.cardBorder}`, borderRadius: 2, boxShadow: PSU.cardShadow }}>
          <Stack spacing={1.2} sx={{ mb: 2 }}>
            <Row label="ชื่อผลงาน" value={data.title} />
            <Row label="ผู้เขียน" value={data.author} />
            <Row label="ผู้เขียน(ร่วม)" value={data.coauthors || "-"} />
            <Row label="ปีที่ตีพิมพ์" value={String(data.year)} />
            <Row label="สถานที่จัดเก็บ" value={data.dept} />
            <Row label="ไฟล์ .pdf" value={
              <Button size="small" variant="outlined">ดาวน์โหลดผลงานตีพิมพ์</Button>
            } />
          </Stack>

          <Typography variant="subtitle2" fontWeight={800} sx={{ mb: .5 }}>บทคัดย่อ</Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {data.abstract}
          </Typography>
        </Paper>
      </Container>
    </main>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" spacing={2}>
      <Typography variant="body2" sx={{ minWidth: 140 }}>{label}</Typography>
      <Typography variant="body2" sx={{ flex: 1 }}>{value}</Typography>
    </Stack>
  );
}
