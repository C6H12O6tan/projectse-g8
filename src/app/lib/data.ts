// จำลองให้มันดูสวยๆ
export type Publication = {
  id: string;
  title: string;
  authors: string[];
  coAuthors?: string[];  // ผู้เขียนร่วม
  abstract: string;
  keywords: string[];
  year: number;
  storage?: string;      // สถานที่จัดเก็บ
  coverUrl?: string;
  department?: string;   // สาขาวิชา/สังกัด
  category?: string;     // ประเภท (เช่น Journal, Conference, Project, Creative)
  fileUrl?: string;      // << ลิงก์ไฟล์ PDF สำหรับดาวน์โหลด
};

export const publications: Publication[] = [
  {
    id: "p-001",
    title: "PHENOROBOT หุ่นยนต์ตรวจวัดฟีโนไทป์พืชเพื่อการวิจัยและ........",
    authors: ["ดร.ธีระ ภัทราพรนนัท์"],
    abstract: "",
    keywords: ["robot", "phenotyping"],
    year: 2025,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-002",
    title: "ACADEMIC WORKS & ACHIEVEMENTS",
    authors: ["ดร.สมชาย อินทร์ทอง"],
    abstract: "",
    keywords: ["academic"],
    year: 2024,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-003",
    title: "PUBLICATIONS AND RESEARCH CONTRIBUTIONS",
    authors: [""],
    abstract: "",
    keywords: ["publication"],
    year: 2025,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-004",
    title: "INNOVATIVE RESEARCH & PUBLISHED PAPERS",
    authors: [""],
    abstract: "",
    keywords: ["innovation"],
    year: 2025,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-005",
    title: "ACADEMIC PROJECTS AND JOURNALS",
    authors: [""],
    abstract: "",
    keywords: ["journals"],
    year: 2025,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-006",
    title: "ACADEMIC RESEARCH & CREATIVE WORKS",
    authors: [""],
    abstract: "",
    keywords: ["creative"],
    year: 2025,
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
  },
  {
    id: "p-007",
    title: "Digital Learning in Higher Education",
    authors: ["Jane Cooper"],
    coAuthors: ["—"], // หรือใส่รายชื่อจริง
    abstract: "งานวิจัยนี้ศึกษาบทบาทและผลกระทบของการเรียนรู้ดิจิทัลต่อการจัดการเรียนการสอนในระดับอุดมศึกษา................................",
    keywords: ["digital learning", "higher education"],
    year: 2558,
    storage: "คณะวิทยาศาสตร์ มหาวิทยาลัยสงขลานครินทร์",
    coverUrl: "https://img.freepik.com/premium-vector/add-image-icon_194117-687.jpg",
    fileUrl: "/files/Monkeykissyou.pdf"  // วางไฟล์ตามพาธนี้ใน public/
  },
];
