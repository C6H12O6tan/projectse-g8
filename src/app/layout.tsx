import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบบริหารจัดการผลงานตีพิมพ์",
  description: "หน้ารวมผลงานตีพิมพ์ (Publications)",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body className="min-h-screen bg-gradient-to-b from-white to-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
