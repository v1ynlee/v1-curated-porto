# v1-curated-porto

Personal portfolio and curated reading list — a showcase of favorite manhwa, manga, and manhua titles with character highlights, genre maps, and an ambient music player.

[![Next.js](https://img.shields.io/badge/Next.js-16.2.7-black?style=flat-square&logo=nextdotjs)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000?style=flat-square&logo=vercel)](https://curated-comics.cyou)
[![CDN](https://img.shields.io/badge/CDN-Cloudflare_R2-F38020?style=flat-square&logo=cloudflare&logoColor=white)](https://developers.cloudflare.com/r2)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)

---

## Features

- **Favorites** — randomized rotating card grid with cross-fade cover transitions
- **Characters** — infinite Embla carousel with per-card image rotation
- **Vibes** — genre map with flickering grid background
- **Music Player** — floating ambient player with playlist, volume persistence, and loop
- **Themes** — 6 color themes × light/dark mode, toggled with a live view-transition
- **Scroll Progress** — Magic UI scroll indicator synced to the active theme
- **Custom 404** — animated meteor + dot-grid not-found page
- **CDN-aware assets** — local dev reads from `/public`, production routes to Cloudflare R2

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (see Environment below)
cp .env.example .env.local

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment

| Variable | Development | Production |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | `https://curated-comics.cyou` |
| `NEXT_PUBLIC_CDN_URL` | *(empty — uses local `/public`)* | `https://cdn.curated-comics.cyou` |

Copy `.env.example` to `.env.local` for local development.  
Set the production values in the **Vercel dashboard → Settings → Environment Variables**.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Turbopack dev server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

---

## Deployment

This project is deployed on **Vercel**. Any push to `main` triggers an automatic deployment.

Media assets (`/covers`, `/characters`, `/music/audio`, `/music/covers`) are **not committed** to the repository — upload them directly to your Cloudflare R2 bucket (`curated-comics`) and set `NEXT_PUBLIC_CDN_URL` in Vercel.

---

## Content

All content is data-driven via JSON files in `public/data/`:

| File | Description |
|---|---|
| `favorites.json` | Comic titles, cover templates, status, tags, URLs |
| `characters.json` | Character entries with cover templates and metadata |
| `about.json` | Bio, badges, hobby tags, avatar config |
| `stats.json` | Reading statistics displayed in the About section |
| `music/playlist.json` | Music playlist with audio and cover paths |

To add or update content, edit the relevant JSON file — no component changes required.

---

## Tech Stack

| Library | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org/docs) | 16.2.7 | App framework (App Router, Turbopack) |
| [React](https://react.dev) | 19 | UI runtime |
| [TypeScript](https://www.typescriptlang.org/docs) | 5 | Type safety |
| [Tailwind CSS](https://tailwindcss.com/docs) | 4 | Utility-first styling |
| [Magic UI](https://magicui.design/docs) | shadcn registry | Animated UI components |
| [Framer Motion](https://www.framer.com/motion) | 12 | Page and element animations |
| [Embla Carousel](https://www.embla-carousel.com) | 8 | Touch/wheel carousel |
| [Lenis](https://lenis.darkroom.engineering) | 1 | Smooth scroll |
| [Lucide React](https://lucide.dev) | latest | Icon library |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.4 | Dark/light mode |
| [Cloudflare R2](https://developers.cloudflare.com/r2) | — | Media CDN |

---

## License

[MIT](LICENSE)
