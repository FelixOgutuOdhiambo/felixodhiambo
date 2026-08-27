-- Felix Odhiambo portfolio — Supabase schema
-- Run in the Supabase SQL editor, or via `supabase db push`.
--
-- Design notes:
--   * Projects, testimonials, and experience currently ship as reviewed,
--     real static content in lib/content/*.ts. The `projects` and
--     `testimonials` tables below exist so an admin dashboard can take
--     over that content later — the app does not read from them yet.
--   * `blog_posts` and `contact_submissions` are live from day one: the
--     insights section starts empty, and the contact form has to land
--     somewhere real.
--   * Admin writes go through Server Actions using the service-role key
--     (server-only, never shipped to the browser). Public reads use the
--     anon key and are restricted by RLS to published rows only.
--   * contact_submissions has NO anon/authenticated policy at all — the
--     table is unreadable and unwritable from the client. Inserts happen
--     exclusively via a Server Action using the service-role client.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------
-- projects
-- ---------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null,
  summary text not null,
  problem text not null,
  context text not null,
  data_description text not null,
  methodology text[] not null default '{}',
  pipeline text[],
  results text[] not null default '{}',
  impact text not null,
  limitations text not null,
  technologies text[] not null default '{}',
  github_url text,
  live_url text,
  featured boolean not null default false,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Public can read published projects"
  on public.projects for select
  to anon, authenticated
  using (published = true);

-- ---------------------------------------------------------------------
-- publications
-- ---------------------------------------------------------------------
create table if not exists public.publications (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  authors text[] not null default '{}',
  abstract text,
  published_date date,
  venue text,
  doi text,
  external_url text,
  pdf_url text,
  code_url text,
  dataset_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.publications enable row level security;

create policy "Public can read published publications"
  on public.publications for select
  to anon, authenticated
  using (published = true);

-- ---------------------------------------------------------------------
-- blog_posts
-- ---------------------------------------------------------------------
create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text not null,
  category text,
  tags text[] not null default '{}',
  reading_time_minutes integer,
  cover_image_url text,
  content text not null,
  author text not null default 'Felix Ogutu Odhiambo',
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Public can read published posts"
  on public.blog_posts for select
  to anon, authenticated
  using (published = true);

create index if not exists blog_posts_published_at_idx
  on public.blog_posts (published_at desc)
  where published = true;

-- ---------------------------------------------------------------------
-- testimonials
-- ---------------------------------------------------------------------
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  title text not null,
  company text not null,
  company_url text,
  avatar_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.testimonials enable row level security;

create policy "Public can read published testimonials"
  on public.testimonials for select
  to anon, authenticated
  using (published = true);

-- ---------------------------------------------------------------------
-- contact_submissions — no client-facing policy at all.
-- Inserts happen only via a Server Action using the service-role key.
-- ---------------------------------------------------------------------
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  organisation text,
  enquiry_type text not null,
  timeline text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
-- Intentionally no policies: default-deny for anon and authenticated.
-- Only the service-role key (used server-side) can read or write this table.

-- ---------------------------------------------------------------------
-- site_settings — small key/value store for lightweight global toggles.
-- ---------------------------------------------------------------------
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Public can read site settings"
  on public.site_settings for select
  to anon, authenticated
  using (true);

-- ---------------------------------------------------------------------
-- updated_at triggers
-- ---------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute function public.set_updated_at();

create trigger set_blog_posts_updated_at
  before update on public.blog_posts
  for each row execute function public.set_updated_at();
