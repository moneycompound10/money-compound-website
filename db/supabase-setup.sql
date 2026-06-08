-- ============================================================
-- Money Compound — Admin panel database setup (v2, storage-safe)
-- Run in: Supabase Dashboard → SQL Editor → New query → paste → Run
-- (The image bucket is created separately via script, so no storage
--  policies here — this avoids the "must be owner of table objects" error.)
-- ============================================================

-- 1) BLOGS TABLE -------------------------------------------------
create table if not exists public.blogs (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  cover_image  text,
  content      text,
  author       text,
  tags         text[] default '{}',
  read_time    text,
  published    boolean not null default true,
  published_at timestamptz default now()
);

-- 2) YOUTUBE VIDEOS TABLE ---------------------------------------
create table if not exists public.youtube_videos (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  title       text not null,
  meta        text,
  youtube_id  text not null,
  sort_order  int not null default 0
);

-- 3) ROW LEVEL SECURITY -----------------------------------------
alter table public.blogs enable row level security;
alter table public.youtube_videos enable row level security;

-- Public can READ published blogs
drop policy if exists "public read published blogs" on public.blogs;
create policy "public read published blogs"
  on public.blogs for select using (published = true);

-- Public can READ all videos
drop policy if exists "public read videos" on public.youtube_videos;
create policy "public read videos"
  on public.youtube_videos for select using (true);

-- Logged-in admins can do EVERYTHING on blogs
drop policy if exists "admins manage blogs" on public.blogs;
create policy "admins manage blogs"
  on public.blogs for all to authenticated using (true) with check (true);

-- Logged-in admins can do EVERYTHING on videos
drop policy if exists "admins manage videos" on public.youtube_videos;
create policy "admins manage videos"
  on public.youtube_videos for all to authenticated using (true) with check (true);
