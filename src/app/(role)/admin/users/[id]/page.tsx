"use client";

import {
  Avatar, Box, Button, Container, Divider, Grid, IconButton, MenuItem,
  Paper, TextField, Typography
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import EditIcon from "@mui/icons-material/Edit";

// ตัวอย่างรายการตำแหน่ง/เพศ (mock)
const POSITIONS = ["Teacher", "Officer", "Admin"];
const GENDERS = ["Female", "Male", "Other"];

export default function AdminUserEditPage() {
  return (
    <>
      <main>
        <Container className="container" sx={{ py: 4 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 2,
              border: "1px solid #E7EDF3",
              boxShadow: "0 2px 8px rgba(10,37,64,.05)",
              bgcolor: "#F7FAFC"
            }}
          >
            <Typography variant="h6" fontWeight={800} sx={{ mb: 2 }}>
              ข้อมูลส่วนบุคคล
            </Typography>

            <Grid container spacing={3}>
              {/* ฝั่งซ้าย: รูปโปรไฟล์ */}
              <Grid size= {{xs: 12, md: 3}}>
                <Box sx={{ display: "grid", gap: 2 }}>
                  <Box sx={{ display: "grid", placeItems: "center" }}>
                    <Avatar sx={{ width: 180, height: 180, bgcolor: "#E0E6EF" }} />
                  </Box>
                  <Button variant="outlined" fullWidth>Change Profile</Button>
                </Box>
              </Grid>

              {/* ฝั่งขวา: ฟอร์ม */}
              <Grid size= {{xs: 12, md: 9}}>
                <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2, bgcolor: "#fff" }}>
                  <Grid container spacing={2}>
                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField fullWidth label="ชื่อ-นามสกุล" />
                    </Grid>
                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField
                        fullWidth
                        label="วันเกิด"
                        placeholder="12-05-1912"
                        InputProps={{
                          endAdornment: (
                            <IconButton edge="end" size="small">
                              <CalendarMonthIcon fontSize="small" />
                            </IconButton>
                          )
                        }}
                      />
                    </Grid>

                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField fullWidth label="เบอร์โทร" placeholder="+880 12345-6789" />
                    </Grid>
                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField select fullWidth label="ตำแหน่งงาน" defaultValue="Teacher">
                        {POSITIONS.map((p) => (
                          <MenuItem key={p} value={p}>{p}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField fullWidth label="Email" />
                    </Grid>
                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField fullWidth label="สาขาวิชา/สังกัด" />
                    </Grid>

                    <Grid size= {{xs: 12, md: 6}}>
                      <TextField select fullWidth label="เพศ" defaultValue="Female">
                        {GENDERS.map((g) => (
                          <MenuItem key={g} value={g}>{g}</MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                   
                  </Grid>

                  <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                    <Button variant="contained" sx={{ minWidth: 160, bgcolor: "#2BB673", "&:hover": { bgcolor: "#249B62" } }}>
                      Update
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </main>
    </>
  );
}
