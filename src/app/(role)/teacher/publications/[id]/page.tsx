import TopBarTeacher from "@/components/TopBarTeacher";
import { PublicationDetailContent } from "@/components/pages/PublicationDetailPage";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <TopBarTeacher />
      {await PublicationDetailContent({ id: params.id })}
    </main>
  );
}
