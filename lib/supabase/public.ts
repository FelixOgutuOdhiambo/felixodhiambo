import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous, cookie-free Supabase client for public content reads
 * (published blog posts, etc). Deliberately does not touch `cookies()` —
 * that would force every page and `generateStaticParams` call using it
 * into fully dynamic rendering, and public content doesn't depend on the
 * visitor's session anyway. RLS still restricts this to published rows.
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
