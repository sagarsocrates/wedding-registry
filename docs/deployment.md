# Deploy to Vercel

## Prerequisites

1. Supabase project configured (migration applied, `gift-images` bucket, admin user in `public.admins`).
2. GitHub (or GitLab/Bitbucket) repo for this project — recommended for continuous deploys.
3. A [Vercel](https://vercel.com) account.

## Environment variables

Set these in the Vercel project → **Settings → Environment Variables** (Production + Preview):

| Name | Example |
|------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon/public key |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` (or custom domain) |

Do **not** add `SUPABASE_SERVICE_ROLE_KEY`.

## Deploy via Vercel Dashboard

1. Push this repo to GitHub.
2. [vercel.com/new](https://vercel.com/new) → Import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add the env vars above.
5. Deploy.
6. After the first deploy, set `NEXT_PUBLIC_SITE_URL` to the production URL (or custom domain) and redeploy if needed.

## Deploy via CLI

```bash
npm i -g vercel
vercel login
vercel link
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add NEXT_PUBLIC_SITE_URL
vercel --prod
```

## Supabase Auth redirect URLs

In Supabase → **Authentication → URL configuration**, add:

- Site URL: your production URL
- Redirect URLs: `https://YOUR_DOMAIN/auth/callback`, `http://localhost:3000/auth/callback`

## Smoke test checklist

- [ ] `/` loads with couple names and link to registry
- [ ] `/registry` shows categories and published gifts
- [ ] Reserve flow shows thank-you message, then Reserved for limited gifts
- [ ] Gift Cards remains reservable after a reservation
- [ ] `/admin/login` works; non-admin users are rejected
- [ ] Admin can create a gift with image upload
- [ ] Images load from Supabase Storage on the public grid

## Custom domain (optional)

Vercel → Project → Settings → Domains → add `registry.yourdomain.com` (or similar), then update `NEXT_PUBLIC_SITE_URL` and Supabase redirect URLs.
