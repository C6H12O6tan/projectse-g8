
import TopNav from "../../components/TopNav";
import { publications, type Publication } from "../../lib/data";
import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default function PublicationDetail({ params }: Props) {
  const pub: Publication | undefined = publications.find(p => p.id === params.id);
  if (!pub) return notFound();

  return (
    <main className="container detail-wrap">
      {/* แถบด้านบนตามระบบเดิม */}
      <TopNav />
      <hr className="hr" />

      {/* หัวเรื่องใหญ่กลางหน้า */}
      <h1 className="detail-h1">{pub.title}</h1>

      {/* กรอบเนื้อหาหลักเหมือนภาพ */}
      <section className="paper">
        <div className="detail-grid">
          {/* คอลัมน์ซ้าย */}
          <aside>
            <div className="block-title" style={{marginBottom:12}}>รายละเอียดผลงาน</div>

            <div className="poster">
              {pub.coverUrl
                ? <img src={pub.coverUrl} alt={pub.title} />
                : <img src="/window.svg" alt="" width={96} height={96} />
              }
            </div>

            <div style={{marginTop:14}} />
            {pub.fileUrl ? (
              <a href={pub.fileUrl} download className="btn-primary" aria-label="ดาวน์โหลดเอกสารฉบับเต็ม">
                {/* ไอคอนดาวน์โหลดแบบ svg เล็ก ๆ */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <path d="M7 10l5 5 5-5"/>
                  <path d="M12 15V3"/>
                </svg>
                ดาวน์โหลดเอกสารฉบับเต็ม
              </a>
            ) : null}

            {/* เมตาข้อมูล */}
            <div className="meta">
              <div className="meta-row">
                <div className="meta-label">ผู้เขียน</div>
                <div className="meta-value">{pub.authors.join(", ") || "—"}</div>
              </div>
              <div className="meta-row">
                <div className="meta-label">ผู้เขียน(ร่วม)</div>
                <div className="meta-value">{pub.coAuthors?.length ? pub.coAuthors.join(", ") : "—"}</div>
              </div>
              <div className="meta-row">
                <div className="meta-label">ปีที่ตีพิมพ์</div>
                <div className="meta-value">{pub.year}</div>
              </div>
              <div className="meta-row">
                <div className="meta-label">สถานที่จัดเก็บ</div>
                <div className="meta-value">{pub.storage || "—"}</div>
              </div>

              {pub.fileUrl && (
                <div className="meta-row">
                  <div className="meta-label">ไฟล์ .pdf</div>
                  <div className="meta-value">
                    <a href={pub.fileUrl} className="file-link" target="_blank" rel="noopener noreferrer">
                      ดาวน์โหลดผลงานตีพิมพ์
                    </a>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* คอลัมน์ขวา */}
          <section className="block">
            <div className="block-title">ชื่อผลงาน</div>
            <div className="block-value">{pub.title}</div>

            <div className="block-title">บทคัดย่อ</div>
            <p className="abstract">{pub.abstract || "—"}</p>
          </section>
        </div>
      </section>
    </main>
  );
}
