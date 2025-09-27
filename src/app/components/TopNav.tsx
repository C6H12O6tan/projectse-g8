"use client";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="topbar">
      {/* ซ้าย: โลโก้ + ชื่อระบบ */}
      <div className="topbar-left">
        <img
          src="https://www.fis.psu.ac.th/en/wp-content/uploads/2022/09/PSU-logo-EN.png"
          alt="PSU"
          width={58}
          height={40}
          style={{ objectFit: "contain" }}
        />
        <div className="brand-title">ระบบบริหารจัดการผลงานตีพิมพ์</div>
      </div>

      {/* ขวา: เมนู + ปุ่ม Login */}
      <nav className="nav">
        <Link href="/external" className="nav-link">HOME</Link>
        <Link href="/external" className="nav-link">PROJECT</Link>
        <Link href="/login" className="btn-login">Login</Link>
      </nav>
    </div>
  );
}



 //<img src="https://www.fis.psu.ac.th/en/wp-content/uploads/2022/09/PSU-logo-EN.png"