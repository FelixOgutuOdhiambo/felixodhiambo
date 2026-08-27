import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, MessageSquare, Newspaper, LogOut } from "lucide-react";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { signOut } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/submissions", label: "Enquiries", icon: MessageSquare },
  { href: "/admin/posts", label: "Posts", icon: Newspaper },
];

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isSupabaseConfigured()) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-muted/20 px-4">
        <div className="max-w-sm rounded-lg border border-border bg-card p-6 text-center">
          <p className="font-serif text-lg font-medium">Supabase not connected</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to
            .env.local to use the admin dashboard.
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: proxy.ts already redirects unauthenticated
  // requests, but a Server Component should never trust that alone.
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-svh bg-muted/20">
      <aside className="relative hidden w-56 shrink-0 border-r border-border bg-card sm:block">
        <div className="p-5">
          <p className="font-serif text-base font-medium">
            Felix Odhiambo<span className="text-primary">.</span>
          </p>
          <p className="text-xs text-muted-foreground">Admin</p>
        </div>
        <nav className="space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-5 w-56 px-3">
          <p className="truncate px-3 text-xs text-muted-foreground">
            {user.email}
          </p>
          <form action={signOut}>
            <Button
              type="submit"
              variant="ghost"
              size="sm"
              className="mt-1 w-full justify-start gap-2.5 text-muted-foreground"
            >
              <LogOut className="size-4" />
              Sign out
            </Button>
          </form>
        </div>
      </aside>

      <main className="flex-1 p-6 sm:p-10">{children}</main>
    </div>
  );
}
