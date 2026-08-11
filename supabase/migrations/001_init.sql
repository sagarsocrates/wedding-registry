-- Wedding gift registry — initial schema, RLS, RPC, storage
-- Phase 1 migration

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helpers (no table dependencies)
-- ---------------------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

-- is_admin() depends on public.admins — create only after the table exists
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order integer not null,
  constraint categories_sort_order_unique unique (sort_order)
);

create table public.gifts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null,
  category_id uuid not null references public.categories (id),
  image_path text not null,
  store_url text,
  sort_order integer not null default 0,
  is_published boolean not null default false,
  is_unlimited boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint gifts_title_not_blank check (char_length(trim(title)) > 0),
  constraint gifts_description_not_blank check (char_length(trim(description)) > 0),
  constraint gifts_image_path_not_blank check (char_length(trim(image_path)) > 0)
);

-- Exactly one unlimited gift (Gift Cards) in V1
create unique index gifts_one_unlimited_idx
  on public.gifts (is_unlimited)
  where is_unlimited = true;

create index gifts_category_id_idx on public.gifts (category_id);
create index gifts_published_sort_idx
  on public.gifts (is_published, sort_order, created_at);

create trigger gifts_set_updated_at
  before update on public.gifts
  for each row
  execute function public.set_updated_at();

create table public.reservations (
  id uuid primary key default gen_random_uuid(),
  gift_id uuid not null references public.gifts (id) on delete cascade,
  guest_name text not null,
  reserved_at timestamptz not null default now(),
  constraint reservations_guest_name_length check (
    char_length(trim(guest_name)) between 1 and 80
  )
);

create index reservations_gift_id_idx on public.reservations (gift_id);
create index reservations_reserved_at_idx on public.reservations (reserved_at desc);

-- ---------------------------------------------------------------------------
-- Seed categories (Gift Cards last)
-- ---------------------------------------------------------------------------

insert into public.categories (slug, name, sort_order) values
  ('kitchen', 'Kitchen', 1),
  ('home', 'Home', 2),
  ('decor', 'Decor', 3),
  ('experiences', 'Experiences', 4),
  ('gift-cards', 'Gift Cards', 5);

-- ---------------------------------------------------------------------------
-- Unlimited gifts must live in Gift Cards category
-- ---------------------------------------------------------------------------

create or replace function public.enforce_unlimited_gift_cards_category()
returns trigger
language plpgsql
as $$
declare
  v_slug text;
begin
  if new.is_unlimited then
    select c.slug into v_slug
    from public.categories c
    where c.id = new.category_id;

    if v_slug is distinct from 'gift-cards' then
      raise exception 'Unlimited gifts must use the Gift Cards category';
    end if;
  end if;

  return new;
end;
$$;

create trigger gifts_enforce_unlimited_category
  before insert or update on public.gifts
  for each row
  execute function public.enforce_unlimited_gift_cards_category();

-- ---------------------------------------------------------------------------
-- Belt-and-suspenders: block second reservation on limited gifts
-- (RPC also locks the gift row; this catches non-RPC inserts)
-- ---------------------------------------------------------------------------

create or replace function public.enforce_limited_gift_single_reservation()
returns trigger
language plpgsql
as $$
declare
  v_unlimited boolean;
begin
  select g.is_unlimited into v_unlimited
  from public.gifts g
  where g.id = new.gift_id;

  if v_unlimited is null then
    raise exception 'Gift not found';
  end if;

  if not v_unlimited and exists (
    select 1 from public.reservations r where r.gift_id = new.gift_id
  ) then
    raise exception 'Gift already reserved'
      using errcode = 'unique_violation';
  end if;

  return new;
end;
$$;

create trigger reservations_enforce_limited_single
  before insert on public.reservations
  for each row
  execute function public.enforce_limited_gift_single_reservation();

-- ---------------------------------------------------------------------------
-- Public view (no guest names, no counts)
-- ---------------------------------------------------------------------------

create or replace view public.gifts_public
with (security_invoker = false)
as
select
  g.id,
  g.title,
  g.description,
  g.category_id,
  c.slug as category_slug,
  c.name as category_name,
  c.sort_order as category_sort_order,
  g.image_path,
  g.store_url,
  g.sort_order,
  g.is_unlimited,
  case
    when g.is_unlimited then false
    else exists (
      select 1 from public.reservations r where r.gift_id = g.id
    )
  end as is_reserved
from public.gifts g
join public.categories c on c.id = g.category_id
where g.is_published = true;

grant select on public.gifts_public to anon, authenticated;

-- ---------------------------------------------------------------------------
-- reserve_gift RPC
-- ---------------------------------------------------------------------------

create or replace function public.reserve_gift(
  p_gift_id uuid,
  p_guest_name text
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_gift public.gifts%rowtype;
  v_name text;
  v_reservation_id uuid;
begin
  v_name := trim(p_guest_name);

  if v_name is null or char_length(v_name) < 1 or char_length(v_name) > 80 then
    raise exception 'Name is required (1–80 characters)';
  end if;

  select * into v_gift
  from public.gifts
  where id = p_gift_id
  for update;

  if not found then
    raise exception 'Gift not available';
  end if;

  if not v_gift.is_published then
    raise exception 'Gift not available';
  end if;

  if not v_gift.is_unlimited and exists (
    select 1 from public.reservations r where r.gift_id = p_gift_id
  ) then
    raise exception 'Gift already reserved'
      using errcode = 'unique_violation';
  end if;

  insert into public.reservations (gift_id, guest_name)
  values (p_gift_id, v_name)
  returning id into v_reservation_id;

  return v_reservation_id;
end;
$$;

revoke all on function public.reserve_gift(uuid, text) from public;
grant execute on function public.reserve_gift(uuid, text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- RLS (depends on public.is_admin())
-- ---------------------------------------------------------------------------

alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.gifts enable row level security;
alter table public.reservations enable row level security;

-- admins
create policy "Admins can read allowlist"
  on public.admins
  for select
  to authenticated
  using (user_id = auth.uid() or public.is_admin());

-- categories
create policy "Anyone can read categories"
  on public.categories
  for select
  to anon, authenticated
  using (true);

create policy "Admins manage categories"
  on public.categories
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

-- gifts
create policy "Anyone can read published gifts"
  on public.gifts
  for select
  to anon, authenticated
  using (is_published = true or public.is_admin());

create policy "Admins insert gifts"
  on public.gifts
  for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins update gifts"
  on public.gifts
  for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins delete gifts"
  on public.gifts
  for delete
  to authenticated
  using (public.is_admin());

-- reservations: no anon policies (RPC is security definer)
create policy "Admins read reservations"
  on public.reservations
  for select
  to authenticated
  using (public.is_admin());

create policy "Admins delete reservations"
  on public.reservations
  for delete
  to authenticated
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage: gift-images bucket (admin policies depend on public.is_admin())
-- ---------------------------------------------------------------------------

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gift-images',
  'gift-images',
  true,
  5242880, -- 5 MB
  array['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "Public read gift images"
  on storage.objects
  for select
  to anon, authenticated
  using (bucket_id = 'gift-images');

create policy "Admins upload gift images"
  on storage.objects
  for insert
  to authenticated
  with check (bucket_id = 'gift-images' and public.is_admin());

create policy "Admins update gift images"
  on storage.objects
  for update
  to authenticated
  using (bucket_id = 'gift-images' and public.is_admin())
  with check (bucket_id = 'gift-images' and public.is_admin());

create policy "Admins delete gift images"
  on storage.objects
  for delete
  to authenticated
  using (bucket_id = 'gift-images' and public.is_admin());
