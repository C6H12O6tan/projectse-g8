export type Work = {
  id: string;
  title: string;
  author: string;
  year: number;
  featured?: boolean;
};

export const WORKS: Work[] = [
  { id: "w01", title: "ระบบช่วยตัดสินใจสำหรับเกษตรกรใต้", author: "อาจารย์ ก", year: 2023, featured: true },
  { id: "w02", title: "Digital Literacy ในมหาวิทยาลัยภาคใต้", author: "ดร. ข", year: 2024, featured: true },
  { id: "w03", title: "IoT เพื่อสุขภาพชุมชน", author: "คุณ ค", year: 2022, featured: false },
];
