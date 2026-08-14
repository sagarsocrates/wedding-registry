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

**Phone first screen (`/registry`)**

Same invitation as laptop, scaled to the phone: Tamil Nadu (left) | title (center) | Kerala (right), same sketch files and `object-contain` as desktop. Intro copy sits **under** the sketches on phones. Category bar follows the content (do not stretch the first screen to push it to the viewport bottom). Gifts below.

Do not use a separate stacked sketch layout on phones. Do not crop or restyle the sketches differently than laptop.

**Desktop:** Tamil Nadu | copy | Kerala, then the same category bar and a 3-column gift grid. Phones use a 2-column gift grid with smaller type and tighter cards.
