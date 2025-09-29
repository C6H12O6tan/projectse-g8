"use client";

import { useMemo, useState } from "react";
import TopBarAdmin from "@/components/TopBarAdmin";
import {
  Box, Container, Typography, Paper, TextField, InputAdornment,
  Button, IconButton, Chip, Table, TableHead, TableRow, TableCell,
  TableBody
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useRouter } from "next/navigation";

// mock data (ยังไม่ผูกหลังบ้าน)
const MOCK = [
  { id: "1", name: "Jane Cooper", phone: "(225) 555-0118", email: "jane@microsoft.com" },
  { id: "2", name: "Floyd Miles", phone: "(205) 555-0100", email: "floyd@yahoo.com" },
  { id: "3", name: "Ronald Richards", phone: "(302) 555-0107", email: "ronald@adobe.com" },
  { id: "4", name: "Marvin McKinney", phone: "(252) 555-0126", email: "marvin@tesla.com" }
];

export default function AdminUsersPage() {
  const router = useRouter();
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return MOCK;
    return MOCK.filter(
      (r) =>
        r.name.toLowerCase().includes(t) ||
        r.email.toLowerCase().includes(t) ||
        r.phone.toLowerCase().includes(t)
    );
  }, [q]);

  return (
    <>
      <TopBarAdmin />
      <main>
        <Container className="container" sx={{ py: 4 }}>
          <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
            บัญชีผู้ใช้งาน
          </Typography>

          <Paper
            elevation={0}
            sx={{
              px: 2, py: 2, borderRadius: 2,
              border: "1px solid #E7EDF3", boxShadow: "0 2px 8px rgba(10,37,64,.05)"
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
              <TextField
                placeholder="Search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                size="small"
                sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: 999 } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                variant="contained"
                sx={{ borderRadius: 999, bgcolor: "#2D6CDF" }}
                onClick={() => router.push("/admin/users/new")}
              >
                เพิ่มบุคลากร +
              </Button>
            </Box>

            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>ชื่อ-สกุล</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Phone Number</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 700 }}>การจัดการ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id} hover>
                    <TableCell>{r.name}</TableCell>
                    <TableCell>{r.phone}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell align="right">
                      <Chip
                        label="ลบ"
                        color="error"
                        variant="outlined"
                        size="small"
                        icon={<DeleteOutlineIcon />}
                        sx={{ mr: 1 }}
                      />
                      <Chip
                        label="แก้ไข"
                        color="primary"
                        variant="outlined"
                        size="small"
                        icon={<EditOutlinedIcon />}
                        onClick={() => router.push(`/admin/users/${r.id}`)}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Container>
      </main>
    </>
  );
}
