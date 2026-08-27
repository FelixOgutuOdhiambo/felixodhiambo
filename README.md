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
- **Backend:** Supabase (Postgres, Auth, RLS)
- **Email:** Resend (contact-form notifications)
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

# Resend — transactional email for contact-form notifications
# https://resend.com/api-keys
RESEND_API_KEY=
CONTACT_NOTIFICATION_EMAIL=

# Public site URL, used for metadata and OG tags
NEXT_PUBLIC_SITE_URL=https://www.felixodhiambo.com
```

Add the same variables in Vercel's project settings for production/preview.

## Supabase setup

1. Create a Supabase project.
2. Run [`supabase/schema.sql`](./supabase/schema.sql) in the SQL editor (or
   `supabase db push` if using the CLI). This creates `projects`,
   `publications`, `blog_posts`, `testimonials`, `contact_submissions`, and
   `site_settings`, with RLS enabled on all of them.
3. Create one Supabase Auth user (email + password) for Felix — this is
   the only account that can sign in at `/admin`.

**What's actually wired to Supabase today:**

- `contact_submissions` — every enquiry from `/contact` is inserted here
  via a Server Action using the service-role key. The table has **no**
  client-facing RLS policy at all — it cannot be read or written from the
  browser under any circumstances, only from server code holding the
  service-role key.
- `blog_posts` — `/insights` reads published posts from this table
  (revalidated every 60s). `/admin/posts` manages create/edit/publish/delete.

`projects`, `publications`, and `testimonials` tables exist in the schema
so an admin can eventually own that content, but the app currently reads
projects and testimonials from reviewed, real static content in
[`lib/content/`](./lib/content) — there was nothing there yet to migrate,
and duplicating real content into an empty admin table would have been
pure overhead. Point the relevant components at Supabase once that
content needs to be editable without a deploy.

## Admin dashboard

`/admin` is gated by Supabase Auth, enforced in two places:

- `proxy.ts` (Next 16's replacement for `middleware.ts`) redirects any
  unauthenticated request to `/admin/login`.
- Every Server Action in `app/admin/actions.ts` independently re-checks
  the session before touching the database — a Server Action is a
  directly callable endpoint, so the proxy check alone isn't enough.

Sign in at `/admin/login` with the Supabase Auth user created above.

## Known placeholders

Real content only, nothing invented — but a couple of things are waiting
on assets from Felix rather than fabricated:

- **CV PDF** — `/cv`'s "Download CV" button currently points at the
  existing Google Drive link (`lib/site-config.ts` → `CV_DOWNLOAD_URL`).
  Swap it for a hosted PDF (e.g. Supabase Storage) once supplied.
- **Favicon / OG image** — generated programmatically (`app/icon.tsx`,
  `app/opengraph-image.tsx`) from the brand palette as a placeholder mark,
  not a designed logo.

## Content

Real projects, experience, education, certifications, and testimonials
live in [`lib/content/`](./lib/content), sourced from the previous site
and Felix's GitHub profile — nothing there is fabricated. Where
information wasn't available (formal publications, additional
testimonials), the corresponding section shows an honest empty/in-progress
state instead of placeholder content.
