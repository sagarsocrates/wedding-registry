# Wedding Gift Registry

Lightweight gift registry for **Sagar & Krithika**.

- Public registry: `/registry`
- Admin: `/admin` (Supabase Auth + allowlist)
- Stack: Next.js · TypeScript · Tailwind · Supabase · Vercel

## Docs

- [Implementation plan](docs/implementation-plan.md) — locked architecture & decisions
- [Phase 1 database setup](docs/phase-1-database-setup.md) — apply SQL migration
- [Deployment](docs/deployment.md) — Vercel env vars + smoke checklist
- [Agent memory](docs/AGENT_MEMORY.md) — orientation for future agents
- Cursor rules: `.cursor/rules/wedding-registry.mdc`, `.cursor/rules/admin-and-data.mdc`

## Local setup

```bash
cp .env.local.example .env.local
# fill NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY

npm install
npm run dev
```

- Public registry: http://localhost:3000/registry
- Admin: http://localhost:3000/admin/login

Apply `supabase/migrations/001_init.sql` in the Supabase SQL Editor before using the app. Ensure the `gift-images` storage bucket exists.

## Phases

| Phase | Status |
|-------|--------|
| 0 Scaffold | Done |
| 1 Database + RLS + Storage | Done |
| 2 Public registry UI | Done |
| 4 Admin auth | Done |
| 5 Admin gift CRUD + images | Done |
| 3 Guest reservations | Done |
| 6 Polish + deploy docs | Done |
| 7 Optional extras | Later |
