import Link from "next/link";

export default function TopNav(){
  return (
    <div className="topbar">
      <div className="topbar-left">
        {/* ใส่โลโก้ PSU ที่ public/psu-logo.png */}
        <img src="https://www.fis.psu.ac.th/en/wp-content/uploads/2022/09/PSU-logo-EN.png" alt="PSU" width={58} height={40} style={{objectFit:"contain"}} />
        <div className="brand-title">ระบบบริหารจัดการผลงานตีพิมพ์</div>
      </div>
      <nav className="nav">
        <Link href="/external">HOME</Link>
        <Link href="/external">PROJECT</Link>
      </nav>
    </div>
  );
}
