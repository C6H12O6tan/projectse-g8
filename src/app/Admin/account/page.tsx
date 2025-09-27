"use client";
import TopNav from "../../components/TopNav";
import Link from "next/link";

export default function AccountPage() {
  // ปรับสไตล์ช่อง/เลเบลให้เข้ากับทั้งโปรเจกต์
  const ctrl =
    "h-11 w-full rounded-[10px] border border-[var(--line)] bg-white px-3 text-[15px] text-slate-800 outline-none";
  const label = "text-[13px] font-semibold text-slate-600";

  return (
    <main className="container">
      <TopNav />

      {/* กรอบกระดาษ (paper) กลางหน้า */}
      <section className="mx-auto mt-6 max-w-[920px]">
        <div className="paper">
          {/* หัวเรื่อง */}
          <h1 className="detail-h1 !text-[28px] !mb-8">บัญชีผู้ใช้งาน</h1>

          {/* แถวสรุปผู้ใช้ */}
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-slate-200 border border-slate-300" />
              <div>
                <div className="text-xl font-extrabold text-slate-900">
                  นางสาว วนัสนันท์ หวังหมัด <span className="text-slate-500 text-sm">(อันนา)</span>
                </div>
                <div className="text-sm text-slate-600 flex gap-6">
                  <span><span className="font-semibold">ID</span> 0000001</span>
                </div>
              </div>
            </div>

            {/* เส้นคั่นอ่อน */}
            <div className="h-px w-full bg-[var(--line)] my-4" />
          </div>

          {/* ฟอร์มข้อมูลบัญชี */}
          <div className="mx-auto w-full max-w-[640px]">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className={label}>ชื่อ</label>
                <input className={ctrl} defaultValue="วนัสนันท์" />
              </div>
              <div>
                <label className={label}>นามสกุล</label>
                <input className={ctrl} defaultValue="หวังหมัด" />
              </div>
            </div>

            <div className="mt-4">
              <label className={label}>E-mail</label>
              <input className={ctrl} defaultValue="floyd@yahoo.com" />
            </div>

            <div className="mt-4">
              <label className={label}>Password</label>
              <input className={ctrl} type="password" defaultValue="*************" />
            </div>

            {/* ปุ่มไปหน้า Setting */}
            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/Admin/setting"
                className="inline-flex items-center justify-center rounded-[10px] border border-[#0A4AA8] bg-[#0A4AA8] px-6 h-11 font-semibold text-white hover:brightness-95"
              >
                แก้ไขข้อมูลบัญชี
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
