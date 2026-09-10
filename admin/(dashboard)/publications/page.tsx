import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PublicationRowActions } from "@/components/admin/publication-row-actions";
import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";
import type { Publication } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminPublicationsPage() {
  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Publications</h1>
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
    .order("created_at", { ascending: false });

  const publications = (data ?? []) as Publication[];

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-2xl font-medium">Publications</h1>
        <Button asChild size="sm">
          <Link href="/admin/publications/new">
            <Plus className="size-4" />
            New publication
          </Link>
        </Button>
      </div>

      {publications.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No publications yet. Add the first one.
        </p>
      )}

      <div className="mt-6 space-y-3">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border bg-card p-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium">{pub.title}</p>
                <Badge variant={pub.published ? "default" : "secondary"}>
                  {pub.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                {pub.authors.join(", ") || "No authors listed"}
                {pub.venue ? ` · ${pub.venue}` : ""}
              </p>
            </div>
            <PublicationRowActions id={pub.id} published={pub.published} />
          </div>
        ))}
      </div>
    </div>
  );
}
