import React from "react";

type Props = {
  title: string;
  authors?: string;
  pdfUrl: string;   // ลิงก์ไฟล์ผลงาน (.pdf)
  dataUrl: string;  // ลิงก์ไฟล์ข้อมูล (.zip/.csv/.xlsx ฯลฯ)
};

const PaperDetail: React.FC<Props> = ({ title, authors, pdfUrl, dataUrl }) => {
  const download = (url: string, filename: string) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // หมายเหตุ: บางโดเมนอาจไม่รองรับ download attribute
    a.rel = "noopener";
    a.target = "_blank";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <main style={{maxWidth: 720, margin: "24px auto", padding: 16, border: "1px solid #eee", borderRadius: 12}}>
      <h1 style={{margin: 0}}>{title}</h1>
      {authors && <p style={{opacity: 0.8, marginTop: 8}}>{authors}</p>}

      <div style={{display: "flex", gap: 12, marginTop: 16}}>
        <button onClick={() => download(pdfUrl, `${title}.pdf`)}>
          ดาวน์โหลดผลงาน (PDF)
        </button>
        <button onClick={() => download(dataUrl, `${title}-data`)}>ดาวน์โหลดข้อมูล</button>
      </div>

      <section style={{marginTop: 20, fontSize: 14, opacity: 0.8}}>
        <p>หมายเหตุ: ถ้าลิงก์เป็น cross-origin บางเบราว์เซอร์อาจไม่ตั้งชื่อไฟล์ตามที่กำหนดให้ได้</p>
      </section>
    </main>
  );
};

export default PaperDetail;
