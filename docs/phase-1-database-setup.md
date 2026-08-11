# Phase 1 — Apply database migration

## Prerequisites

1. Create a free [Supabase](https://supabase.com) project.
2. In **Authentication → Providers**, keep Email enabled.
3. In **Authentication → Settings**, disable **Allow new users to sign up** (invite/create admins only).

## Apply SQL

1. Open **SQL Editor** in the Supabase dashboard.
2. Paste and run [`001_init.sql`](../supabase/migrations/001_init.sql).
3. Confirm:
   - Tables: `admins`, `categories`, `gifts`, `reservations`
   - View: `gifts_public`
   - Function: `reserve_gift`
   - Storage bucket: `gift-images` (public)

## Create an admin

1. **Authentication → Users → Add user** (email + password).
2. Copy the user’s UUID.
3. Run:

```sql
insert into public.admins (user_id)
values ('YOUR-USER-UUID-HERE');
```

## App env

Copy `.env.local.example` → `.env.local` and fill:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SITE_URL` (e.g. `http://localhost:3000`)

Do **not** add the service role key to the Next.js app.
