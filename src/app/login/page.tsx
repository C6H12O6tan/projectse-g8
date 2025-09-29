// src/app/login/page.tsx
export const dynamic = "force-dynamic";
export const revalidate = 0;

import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { redirect } from "next/navigation";
import { supabaseRSC } from "@/lib/supabase/rsc";
import LoginForm from "./LoginForm";
import { PSU } from "@/theme/brand";

export default async function LoginPage() {
  const sb = await supabaseRSC();
  const { data: { session } } = await sb.auth.getSession();
  if (session) redirect("/validate");

  return (
    <main>
      <Box sx={{ py: 3, display: "grid", placeItems: "center" }}>
        <Box sx={{ position: "relative", width: 360, height: 120 }}>
          <Image
            src="/logo-login.png"
            alt="PSU Folder"
            fill
            sizes="360px"
            style={{ objectFit: "contain" }}
            priority
          />
        </Box>
      </Box>

      <Container className="container" sx={{ pb: 6 }}>
        <LoginForm />
        <Typography variant="caption" sx={{ display: "block", textAlign: "center", mt: 3, color: PSU.subtext }}>
          © 2025 SE G8
        </Typography>
      </Container>
    </main>
  );
}
