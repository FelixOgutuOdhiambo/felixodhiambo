import Link from "next/link";
import { SupabaseNotConfigured } from "@/components/admin/supabase-not-configured";
import { createServiceRoleClient, isServiceRoleConfigured } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  if (!isServiceRoleConfigured()) {
    return (
      <div>
        <h1 className="font-serif text-2xl font-medium">Overview</h1>
        <div className="mt-8">
          <SupabaseNotConfigured />
        </div>
      </div>
    );
  }

  const supabase = createServiceRoleClient();

  const [{ count: submissionsCount }, { count: postsCount }, { count: publishedCount }] =
    await Promise.all([
      supabase
        .from("contact_submissions")
        .select("*", { count: "exact", head: true }),
      supabase.from("blog_posts").select("*", { count: "exact", head: true }),
      supabase
        .from("blog_posts")
        .select("*", { count: "exact", head: true })
        .eq("published", true),
    ]);

  const stats = [
    {
      label: "Contact enquiries",
      value: submissionsCount ?? 0,
      href: "/admin/submissions",
    },
    {
      label: "Blog posts (total)",
      value: postsCount ?? 0,
      href: "/admin/posts",
    },
    {
      label: "Published posts",
      value: publishedCount ?? 0,
      href: "/admin/posts",
    },
  ];

  return (
    <div>
      <h1 className="font-serif text-2xl font-medium">Overview</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/50"
          >
            <p className="font-serif text-3xl font-medium">{stat.value}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stat.label}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
