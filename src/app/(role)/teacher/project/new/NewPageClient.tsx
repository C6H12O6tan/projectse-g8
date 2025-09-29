"use client";
import ProjectForm, { ProjectPayload } from "@/components/teacher/ProjectForm";

export default function NewPageClient() {
  const onSubmit = (data: ProjectPayload) => {
    console.log("NEW submit", data); // ภายหลังเชื่อม Supabase ตรงนี้
    alert("บันทึกแบบร่าง (จำลอง)");
  };

  return <ProjectForm mode="new" onSubmit={onSubmit} />;
}
