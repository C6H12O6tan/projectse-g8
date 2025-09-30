import TopBarOfficer from "@/components/TopBarOfficer";
import { PublicationDetailContent } from "@/components/pages/PublicationDetailPage";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <TopBarOfficer />
      {await PublicationDetailContent({ id: params.id })}
    </main>
  );
}
