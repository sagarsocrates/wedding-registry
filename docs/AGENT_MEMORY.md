# Agent orientation

Read these before changing product behavior or architecture:

1. [implementation-plan.md](./implementation-plan.md) — locked decisions, schema, phases
2. [phase-1-database-setup.md](./phase-1-database-setup.md) — Supabase setup
3. [deployment.md](./deployment.md) — Vercel deploy
4. `.cursor/rules/wedding-registry.mdc` — always-on project memory for Cursor agents
5. `.cursor/rules/admin-and-data.mdc` — admin/auth/data conventions

## Current priority order

1. Done through Phase 6 (polish + deployment guide)
2. Optional: full wedding landing on `/`, CAPTCHA, richer OG images (Phase 7)
3. When ready: follow [deployment.md](./deployment.md) to ship on Vercel

## Phone-first UI

Most guests view the registry on a phone. Always design that viewport first.

**Home (`/`):** Tamil Nadu and Kerala sketches with “We are getting married.” Phone: titles, sketches side by side, copy. Desktop: Tamil Nadu | copy | Kerala.

**Registry (`/registry`):** no sketches. Title + short intro, forest-green category bar, then the original gift tiles. No second “collection” heading and no blessings block (those stay on home). Phones use a 2-column gift grid; desktop uses 3 columns.
