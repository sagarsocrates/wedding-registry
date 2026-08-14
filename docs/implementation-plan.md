# Lightweight Wedding Gift Registry — Implementation Plan

**Status:** Phases 0–6 complete (polish + deploy docs). Optional Phase 7 later.  
**Couple:** Sagar & Krithika  
**Public URL:** `/registry`  
**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · Supabase (Postgres, Auth, Storage) · Vercel

> Agent memory: `.cursor/rules/wedding-registry.mdc` (always apply) and `.cursor/rules/admin-and-data.mdc`.

---

## Locked product decisions

1. **Quantity** — Normal gifts: exactly one reservation. Gift Cards: unlimited via `is_unlimited = true`. No quantity enums in V1.
2. **Public reserved state** — Show only “Reserved”. Never show guest names or reservation counts publicly.
3. **Images** — Required. Supabase Storage uploads (not external URLs as primary).
4. **Pages** — List/grid only. No `/gifts/[id]`. Registry at `/registry`. `/` reserved for a future landing page.
5. **Gift fields** — title, description, category, image, optional store URL, sort order, published. **No pricing of any kind.** No guest note.
6. **Cancellation** — Guests cannot cancel. Admin can.
7. **Service role** — Not used in Next.js. Admin via JWT + RLS. Guests via `reserve_gift` RPC.
8. **Admins** — Supabase Auth + `admins` allowlist (one or a few).
9. **Public URL** — `/registry`.
10. **Categories (DB-seeded)** — Kitchen, Home, Decor, Experiences, Gift Cards (last). UI also has **All**.
11. **Gift Cards** — Exactly one gift; collage image OK; guests only enter name; `is_unlimited = true`.
12. **Reservation model** — Limited: first wins. Unlimited: many private rows for admin.
13–18. **Public UX** — Premium editorial wedding lookbook (not e-commerce/SaaS). Reserve = name only. Success: “Thank you, \<name\> ❤️” / “This gift has been reserved.”
19. **Admin** — Functional but polished CRUD, image upload/preview, reservations, cancel. No price fields.
20–21. **Keep it lightweight** — No extra services, GraphQL, Redux, Docker, etc.

---

## 1. Architecture

```
Guests (no auth) ──► Next.js App Router on Vercel
Admin (email/pw) ──►        │
                            │  Server Components + Server Actions
                            │  @supabase/ssr (cookie session)
                            ▼
                     Supabase (one project)
                     • Postgres + RLS
                     • Auth (admins only; public signup disabled)
                     • Storage bucket: gift-images (public read, admin write)
```

**Principles**

- Single Next.js app; no separate backend.
- Public reads via anon key + `gifts_public` (+ RLS).
- Mutations: Server Actions → user JWT (admin) or `reserve_gift` (guests).
- **No `SUPABASE_SERVICE_ROLE_KEY` in the app.**
- Concurrency safety: `SELECT … FOR UPDATE` on the gift row inside `reserve_gift`, plus a trigger for limited gifts.

---

## 2. Database schema

### `categories`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid PK | |
| `slug` | text unique | `kitchen`, `home`, `decor`, `experiences`, `gift-cards` |
| `name` | text | Display name |
| `sort_order` | int | Gift Cards = highest (last) |

**Seed**

| sort_order | slug | name |
|------------|------|------|
| 1 | kitchen | Kitchen |
| 2 | home | Home |
| 3 | decor | Decor |
| 4 | experiences | Experiences |
| 5 | gift-cards | Gift Cards |

### `gifts`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid PK | |
| `title` | text not null | |
| `description` | text not null | |
| `category_id` | uuid → categories | |
| `image_path` | text not null | Storage path (required) |
| `store_url` | text null | Optional purchase link |
| `sort_order` | int | Default 0 |
| `is_published` | boolean | Default false |
| `is_unlimited` | boolean | Default false; Gift Cards only |
| `created_at` / `updated_at` | timestamptz | |

**No price columns.** At most one row with `is_unlimited = true` (unique partial index).

### `reservations`

| Column | Type | Notes |
|--------|------|--------|
| `id` | uuid PK | |
| `gift_id` | uuid → gifts | Cascade delete |
| `guest_name` | text | 1–80 chars; **admin-only visibility** |
| `reserved_at` | timestamptz | |

No blanket `UNIQUE(gift_id)` (would block Gift Cards). Limited uniqueness enforced in RPC + trigger.

### `admins`

| Column | Type |
|--------|------|
| `user_id` | uuid PK → `auth.users` |

### View `gifts_public`

Guest-safe projection of published gifts:

- Gift fields + category slug/name/sort
- `is_reserved` = `false` when `is_unlimited`; else whether any reservation exists
- **Never** exposes `guest_name` or counts

---

## 3. RLS model

Helper: `is_admin()` → `auth.uid() in (select user_id from admins)`.

| Table | Anon | Admin |
|-------|------|-------|
| `categories` | SELECT | ALL via `is_admin()` |
| `gifts` | SELECT if `is_published` | ALL |
| `reservations` | no direct access | SELECT + DELETE (cancel) |
| `admins` | none | SELECT own / admin check |
| Storage `gift-images` | public read | insert/update/delete |

Guest inserts go **only** through `reserve_gift` (granted to `anon`).

---

## 4. Reservation logic (`reserve_gift`)

```
reserve_gift(p_gift_id uuid, p_guest_name text)
```

1. Validate trimmed name (1–80).
2. `SELECT … FROM gifts WHERE id = p_gift_id FOR UPDATE`.
3. Reject if missing / unpublished.
4. If not unlimited and a reservation exists → error “Gift already reserved”.
5. Insert reservation row.
6. Return success.

**Public UX**

- Limited + reserved → “Reserved”
- Unlimited (Gift Cards) → always show Reserve
- Success → “Thank you, \<name\> ❤️” / “This gift has been reserved.”

**Admin cancel** → `DELETE` reservation (RLS). Limited gift becomes available again.

---

## 5. Category model

- DB-backed and seeded; not a CMS in V1.
- Tabs: **All** (UI-only) + categories by `sort_order`.
- Gift Cards always last.
- Exactly one Gift Cards gift content-wise; `is_unlimited = true`.

---

## 6. Admin authentication

1. Disable public Auth signups in Supabase Dashboard.
2. Create user(s); insert into `admins`.
3. `/admin/login` email/password.
4. Middleware/proxy refreshes session; protect `/admin/*` (except login).
5. Admin layout double-checks session + allowlist.

---

## 7. Image storage

- Bucket: `gift-images` (public read).
- Path convention: `gifts/{gift_id}/{uuid}.ext` (or uuid-first on create).
- Admin upload + preview required on create/edit.
- Store `image_path` only; render with public URL + `next/image`.

---

## 8. Public UI structure

| Route | Role |
|-------|------|
| `/` | Future wedding landing (placeholder for now) |
| `/registry` | Public registry |

**`/registry`**

Phone-first. Most guests are on a phone; layout for that screen first.

1. **Sagar & Krithika**
2. **Our Gift Registry** (title + short intro)
3. Slim green category nav: All | Kitchen | Home | Decor | Experiences | Gift Cards
4. Editorial gift grid (2 col phone / 3 col desktop)

Tamil Nadu + Kerala sketches and the blessings block live on `/` (home) only — not repeated on `/registry`.

**Gift tile:** large image, title, short description, Reserve / Reserved. No prices.

**Reserve:** minimal dialog — name only.

---

## 9. Admin UI structure

| Route | Purpose |
|-------|---------|
| `/admin/login` | Auth |
| `/admin` | Dashboard: gifts + reservations |
| `/admin/gifts/new` | Create + required image upload |
| `/admin/gifts/[id]/edit` | Edit, publish, reorder, image replace |

Capabilities: CRUD, category, store URL, publish, sort order, `is_unlimited`, view/cancel reservations. No price fields.

---

## 10. Folder / component structure

```
app/
  page.tsx                     # landing placeholder
  registry/page.tsx            # public registry
  reserve/actions.ts           # reserveGift
  admin/
    layout.tsx
    login/page.tsx
    page.tsx
    gifts/new/page.tsx
    gifts/[id]/edit/page.tsx
    actions.ts
  auth/callback/route.ts
components/
  registry/…
  admin/…
lib/
  supabase/{server,client,session}.ts
  types.ts
  validations.ts
  storage.ts
proxy.ts                           # session refresh + /admin gate (Next.js 16)
supabase/migrations/001_init.sql
docs/implementation-plan.md
```

| Concern | Implementation |
|---------|----------------|
| Registry data | Server Component |
| Category tabs | Client |
| Reserve dialog | Client + Server Action |
| Admin data | Server Component |
| Gift form / upload | Client + Server Action |
| Login | Client |

---

## 11. Visual design system (public)

**Direction:** warm editorial wedding lookbook — personal magazine, not a shop.

- Display serif for names/title; modern sans for body/UI
- Warm paper/ink palette; one muted accent, sparingly
- Large consistent-aspect imagery; generous whitespace
- 2–3 restrained motions (dialog, tab indicator, image reveal)

**Avoid:** purple SaaS gradients, generic Inter templates, e-commerce chrome, dashboards, price chips, dense catalogs.

---

## 12. Environment variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=
```

No service role key in the app.

---

## 13. Dependencies

- `next`, `react`, `react-dom`, TypeScript, Tailwind
- `@supabase/supabase-js`, `@supabase/ssr`
- `zod`

No Redux, React Query, tRPC, Prisma, UI kit required.

---

## 14. Security

- RLS on all tables; anon cannot read reservation names
- Reserve only via RPC
- Auth signups disabled; allowlist required
- Storage writes admin-only
- Zod validation on Server Actions
- No service role in Vercel env for this app

---

## 15. Implementation phases

| Phase | Scope | Status |
|-------|--------|--------|
| **0** | Next.js scaffold, env example, placeholder routes, Supabase clients | **Done** |
| **1** | SQL migration: schema, RLS, RPC, storage bucket/policies | **Done** |
| **2** | Public registry read-only (hero, tabs, grid, images) | **Done** |
| **4** | Admin auth (login, middleware, allowlist gate) | **Done** (before Phase 3 by choice) |
| **5** | Admin CRUD + image upload/preview + cancel reservation | **Done** (before Phase 3 by choice) |
| **3** | Guest reserve (dialog, action, RPC wiring) | **Done** |
| **6** | Visual polish + Vercel deploy | **Done** (deploy docs ready; push to Vercel when ready) |
| **7** | Optional: landing page, CAPTCHA, OG | Later |

---

## 16. Architecture snapshot

| Area | Choice |
|------|--------|
| Hosting | Vercel + Supabase |
| Public URL | `/registry` |
| Auth | Supabase email/password + `admins` |
| Images | Supabase Storage; required |
| Categories | DB seeded; Gift Cards last; UI “All” |
| Limited gifts | One reservation; public “Reserved” |
| Gift Cards | One gift, unlimited, always reservable |
| Pricing | None anywhere |
| Guest cancel | No |
| Service role | Not used in Next.js |
