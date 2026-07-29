# SamutegDev — Agent Guide

Personal blog built with Astro 7 (SSG), content in **Portuguese (Brazilian)**.

## Commands

| Command | What it does |
|---------|-------------|
| `pnpm dev` | Dev server at `localhost:4321` |
| `pnpm build` | Production build → `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm check` | Type-check via `astro check` |

No lint, format, or test scripts exist. There is no test framework configured.

## Requirements

- Node >=22.12.0
- pnpm (uses corepack for Docker builds)

## Architecture

- **Astro 7 SSG** — static output, zero JS by default
- **React 19** — used sparingly for interactive islands (ThemeToggle)
- **MDX** — blog posts support inline components
- **Keystatic CMS** — headless editor, **dev-only** (disabled in production builds)
- **Zod** schema validation for blog frontmatter in `src/content.config.ts`

## Key Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Integrations: react, mdx, sitemap, keystatic (dev only) |
| `src/consts.ts` | Site title, description, author, social links |
| `src/content.config.ts` | Blog collection schema (Zod) |
| `src/styles/global.css` | Full design system, CSS variables, local fonts |
| `keystatic.config.ts` | CMS collection definitions |
| `TODO.md` | Performance audit with tracked fixes |

## Adding Blog Posts

Create `src/content/blog/<slug>.mdx` (or `.md`):

```yaml
---
title: 'Post title'
description: 'Short description'
pubDate: 2026-01-15
heroImage: ../../assets/<slug>/heroImage.webp  # optional
---
```

Assets go in `src/assets/<slug>/`. The slug is derived from the filename.

## Design System

Fonts are served locally from `src/assets/fonts/` (Inter, JetBrains Mono, Manrope) — do not re-add Google Fonts imports. Color theme uses teal/violet accents with glassmorphism. All tokens are CSS variables in `global.css`.

## Deploy

- **Vercel** (primary): auto-detected from `vercel.json`, builds with `pnpm build`, serves `dist/`
- **Docker/nginx**: `docker-compose up --build` → serves on port 8080

## Gotchas

- Keystatic integration only loads in dev (`NODE_ENV !== "production"`). Do not reference keystatic imports in production code paths.
- No `.github/` workflows exist — no CI/CD configured.
- `pnpm-workspace.yaml` has `allowBuilds` disabling esbuild and sharp native builds.
- Security headers (CSP, HSTS, X-Frame-Options) are defined in both `vercel.json` and `docker/nginx.conf` — keep them in sync.
- Performance work is tracked in `TODO.md` with checkboxes; check before starting optimization tasks.
