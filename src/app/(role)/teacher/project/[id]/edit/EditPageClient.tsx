"use client";
import ProjectForm, { ProjectPayload } from "@/components/teacher/ProjectForm";

export default function EditPageClient({
  id,
  initial,
}: {
  id: string;
  initial: Partial<ProjectPayload>;
}) {
  const onSubmit = (data: ProjectPayload) => {
    console.log("EDIT submit", { id, ...data });
    alert("บันทึกการแก้ไข (จำลอง)");
  };

  return <ProjectForm mode="edit" initial={initial} onSubmit={onSubmit} />;
}
