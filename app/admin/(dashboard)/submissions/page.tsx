import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";
import type { ContactSubmission } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Enquiries</h1>
        <div className="mt-8">
          <SupabaseNotConfigured />
        </div>
      </div>
    );
  }

  const supabase = createServiceRoleClient();
  const { data, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  const submissions = (data ?? []) as ContactSubmission[];

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">Enquiries</h1>

      {error && (
        <p className="mt-4 text-sm text-destructive">
          Failed to load submissions: {error.message}
        </p>
      )}

      {!error && submissions.length === 0 && (
        <p className="mt-6 text-sm text-muted-foreground">
          No enquiries yet.
        </p>
      )}

      <div className="mt-6 space-y-4">
        {submissions.map((s) => (
          <div key={s.id} className="rounded-lg border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">
                {s.name} · <span className="text-muted-foreground">{s.email}</span>
              </p>
              <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
                {s.enquiry_type}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {new Date(s.created_at).toLocaleString()}
              {s.organisation && ` · ${s.organisation}`}
              {s.timeline && ` · Timeline: ${s.timeline}`}
            </p>
            <p className="mt-3 whitespace-pre-wrap text-sm text-foreground/90">
              {s.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
