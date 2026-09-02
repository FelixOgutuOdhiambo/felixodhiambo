# Felix Ogutu Odhiambo — Portfolio

Aviation analytics professional site for Felix Ogutu Odhiambo, rebuilt on
Next.js 16 (App Router), TypeScript, Tailwind CSS v4, shadcn/ui, and
Supabase. The previous static HTML/CSS/JS site is preserved as-is in
[`legacy-static-site/`](./legacy-static-site) for reference.

## Stack

- **Framework:** Next.js 16 (App Router, Turbopack, Server Components by default)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (CSS-first config in `app/globals.css`)
- **UI:** shadcn/ui (Radix primitives) + Lucide icons
- **Animation:** Framer Motion
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod
- **Backend:** Supabase (Postgres, Auth, RLS, Storage)
- **Contact form:** Formspree (submits client-side, no backend involved)
- **Analytics:** Vercel Analytics + Speed Insights
- **Deployment:** Vercel

## Getting started

```bash
pnpm install
pnpm dev
```

## Environment variables

The sandbox this project was built in blocks writing `.env*` files
directly, so there's no `.env.example` — create `.env.local` yourself with
the following:

```bash
# Supabase — https://app.supabase.com/project/_/settings/api
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
# Server-only. Never expose to the browser or commit a real value.
SUPABASE_SERVICE_ROLE_KEY=

# Public site URL, used for metadata and OG tags
NEXT_PUBLIC_SITE_URL=https://www.felixodhiambo.com
```

Add the same variables in Vercel's project settings for production/preview.

The Formspree endpoint (`lib/site-config.ts` → `FORMSPREE_ENDPOINT`) is
public by design and doesn't need an env var.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor (or
   `supabase db push` if using the CLI). This creates `projects`,
   `publications`, `blog_posts`, `testimonials`, and `site_settings`, with
   RLS enabled on all of them.
3. Create a public Storage bucket named `blog-images` (Storage → New
   bucket → Public). Blog cover-image uploads from `/admin/posts` go here.
4. Create one Supabase Auth user (email + password) for Felix — this is
   the only account that can sign in at `/admin`.

**What's actually wired to Supabase today:**

- `blog_posts` — `/insights` reads published posts from this table
  (revalidated every 60s). `/admin/posts` manages create/edit/publish/delete,
  including uploading cover images to the `blog-images` Storage bucket.

`projects`, `publications`, and `testimonials` tables exist in the schema
so an admin can eventually own that content, but the app currently reads
projects and testimonials from reviewed, real static content in
[`lib/content/`](./lib/content) — there was nothing there yet to migrate,
and duplicating real content into an empty admin table would have been
pure overhead. Point the relevant components at Supabase once that
content needs to be editable without a deploy.

The contact form (`/contact`) does **not** touch Supabase — it submits
directly to Formspree from the browser (`components/contact-form.tsx`).
Enquiries land in Felix's Formspree dashboard/inbox, not in this app.

## Admin dashboard

`/admin` is gated by Supabase Auth, enforced in two places:

- `proxy.ts` (Next 16's replacement for `middleware.ts`) redirects any
  unauthenticated request to `/admin/login`.
- Every Server Action in `app/admin/actions.ts` independently re-checks
  the session before touching the database — a Server Action is a
  directly callable endpoint, so the proxy check alone isn't enough.

Sign in at `/admin/login` with the Supabase Auth user created above.

## Content

Real projects, experience, education, certifications, and testimonials
live in [`lib/content/`](./lib/content), sourced from Felix's current CV
and GitHub profile — nothing there is fabricated. Where information wasn't
available (formal publications, additional testimonials), the
corresponding section shows an honest empty/in-progress state instead of
placeholder content.

The CV PDF is served directly from
[`public/documents/felix-ogutu-odhiambo-resume.pdf`](./public/documents).
