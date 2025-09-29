"use client";

import { useMemo, useState } from "react";
import TopBarAdmin from "@/components/TopBarAdmin";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { PSU } from "@/theme/brand";

// ข้อมูลตัวอย่าง (จะต่อ Supabase ทีหลัง)
type Row = {
  uid: string;
  name: string;
  address: string;
  scno: string;
  amount: string | number;
};

const SAMPLE: Row[] = [
  { uid: "112", name: "Mithilesh Kumar Singh", address: "Kritipur, Kathmandu", scno: "12358G", amount: "-" },
  { uid: "113", name: "Suron Maharjan", address: "Natole, Lalitpur", scno: "86523B", amount: 113 },
  { uid: "114", name: "Sandesh Bajracharya", address: "BhinchhebahaI, Lalitpur", scno: "78365D", amount: 114 },
  { uid: "116", name: "Subin Sedhai", address: "Baneshwor, Kathmandu", scno: "86326F", amount: 116 },
  { uid: "117", name: "Wonjala Joshi", address: "Bhaisepati, Lalitpur", scno: "45987ZB", amount: 117 },
];

export default function AdminHistoryPage() {
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return SAMPLE;
    return SAMPLE.filter(
      (r) =>
        r.name.toLowerCase().includes(s) ||
        r.address.toLowerCase().includes(s) ||
        r.uid.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main>
      <TopBarAdmin />
      
      <Container className="container" sx={{ py: 4 }}>
        {/* หัวข้อ + กล่องค้นหา (ชิดขวา) */}
        <Box
          sx={{
            mb: 2.5,
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={800} sx={{ flex: 1 }}>
            ประวัติการใช้งาน
          </Typography>

          <TextField
            placeholder="ค้นหา: ชื่อผลงาน หรือ ชื่อผู้วิจัย"
            size="small"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            sx={{
              width: 360,
              "& .MuiOutlinedInput-root": { borderRadius: 99, height: 40 },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>

        {/* การ์ดตาราง */}
        <Paper
          variant="outlined"
          sx={{
            borderColor: PSU.cardBorder,
            boxShadow: PSU.cardShadow,
            borderRadius: 3,
            overflow: "hidden",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow
                  sx={{
                    "& th": {
                      bgcolor: "#F7F9FC",
                      color: PSU.text,
                      fontWeight: 700,
                      borderBottom: `1px solid ${PSU.cardBorder}`,
                    },
                  }}
                >
                  <TableCell sx={{ width: 100 }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      UID <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      Name <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      Address <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: 120 }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      SCNO <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: 120 }}>
                    <Box sx={{ display: "inline-flex", alignItems: "center", gap: 0.5 }}>
                      Amount <ArrowDropDownIcon fontSize="small" sx={{ opacity: 0.7 }} />
                    </Box>
                  </TableCell>
                  <TableCell sx={{ width: 120, textAlign: "right" }}>Action</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {rows.map((r) => (
                  <TableRow
                    key={r.uid}
                    sx={{
                      "& td": {
                        borderBottom: `1px solid ${PSU.cardBorder}`,
                      },
                    }}
                  >
                    <TableCell>{r.uid}</TableCell>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.address}</TableCell>
                    <TableCell>{r.scno}</TableCell>
                    <TableCell>{r.amount}</TableCell>
                    <TableCell align="right">
                      {/* ปุ่มลบสไตล์พิลสีแดง + ไอคอนถังขยะ */}
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteOutlineIcon />}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontWeight: 700,
                          px: 1.5,
                          "& .MuiSvgIcon-root": { fontSize: 18 },
                        }}
                        onClick={() => alert(`ลบแถว UID ${r.uid}`)}
                      >
                        ลบ
                      </Button>
                      {/* หรือใช้ไอคอนล้วน:
                      <IconButton color="error" size="small"><DeleteOutlineIcon/></IconButton>
                      */}
                    </TableCell>
                  </TableRow>
                ))}

                {rows.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 6, color: PSU.subtext }}>
                      ไม่พบข้อมูลที่ตรงคำค้นหา
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </main>
  );
}
