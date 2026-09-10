import { notFound } from "next/navigation";
import { PublicationForm } from "@/components/admin/publication-form";
import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";
import type { Publication } from "@/lib/supabase/types";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Edit publication</h1>
        <div className="mt-8">
          <SupabaseNotConfigured />
        </div>
      </div>
    );
  }

  const supabase = createServiceRoleClient();
  const { data } = await supabase
    .from("publications")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  const publication = data as Publication | null;
  if (!publication) notFound();

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">Edit publication</h1>
      <div className="mt-8">
        <PublicationForm publication={publication} />
      </div>
    </div>
  );
}
