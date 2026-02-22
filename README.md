# Cylvor IT

Portfolio website built with Next.js App Router, TypeScript, GSAP, and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Required Site/SEO Files

This project includes the key files needed for production hosting and indexing:

- `src/app/robots.ts` → generates `/robots.txt`
- `src/app/sitemap.ts` → generates `/sitemap.xml`
- `src/app/manifest.ts` → generates `/manifest.webmanifest`
- `src/app/layout.tsx` metadata → canonical, Open Graph, Twitter, robots, and icons

## Environment Variables

Set this in Vercel (Project Settings → Environment Variables):

- `NEXT_PUBLIC_SITE_URL=https://your-domain.com`

If this variable is not set, `robots.ts` and `sitemap.ts` fall back to Vercel URL or `https://cylvorit.com`.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: `Next.js` (auto-detected).
4. Build command: `npm run build`.
5. Output directory: leave empty (default for Next.js).
6. Add env var `NEXT_PUBLIC_SITE_URL`.
7. Deploy.

After deploy, verify:

- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`

## Production Build

```bash
npm run build
npm run start
```





Vercel Deploy (Step-by-Step)

Push your project to GitHub (or GitLab/Bitbucket).
Go to https://vercel.com, sign in, click Add New → Project.
Import your repository and select this project.
Vercel will auto-detect Next.js; keep defaults: Build Command npm run build, Output Directory empty.
In Environment Variables, add NEXT_PUBLIC_SITE_URL = https://your-domain.com (or your Vercel URL first).
Click Deploy and wait for build to finish.
Open the deployed URL and verify pages load.
Check SEO routes: /robots.txt, /sitemap.xml, /manifest.webmanifest.
Add custom domain in Project Settings → Domains, then update DNS as Vercel shows.
After DNS is active, update NEXT_PUBLIC_SITE_URL to the final domain and redeploy.