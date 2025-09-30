import TopBarAdmin from "@/components/TopBarAdmin";
import { PublicationDetailContent } from "@/components/pages/PublicationDetailPage";

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <main>
      <TopBarAdmin />
      {await PublicationDetailContent({ id: params.id })}
    </main>
  );
}
