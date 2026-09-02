export function SupabaseNotConfigured() {
  return (
    <div className="rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground">
      Supabase isn&apos;t connected yet. Add{" "}
      <code className="rounded bg-muted px-1.5 py-0.5">
        NEXT_PUBLIC_SUPABASE_URL
      </code>
      ,{" "}
      <code className="rounded bg-muted px-1.5 py-0.5">
        NEXT_PUBLIC_SUPABASE_ANON_KEY
      </code>
      , and{" "}
      <code className="rounded bg-muted px-1.5 py-0.5">
        SUPABASE_SERVICE_ROLE_KEY
      </code>{" "}
      to .env.local to use this page.
    </div>
  );
}
