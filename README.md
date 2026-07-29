# SamutegDev

Blog pessoal moderno construído com [Astro](https://astro.build/), focado em desenvolvimento de software, ferramentas e aprendizados do dia a dia.

## Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| **Performance** | Páginas estáticas ultra-rápidas, zero JS por padrão |
| **Design System** | Cores teal, fontes Inter + JetBrains Mono + Manrope, glassmorphism |
| **Dark/Light Mode** | Persistido no localStorage + detecção de preferência do sistema |
| **Newsletter** | Formulário AJAX com Formspree, honeypot anti-spam, feedback visual |
| **Hero Dinâmico** | Gradiente animado, estatísticas do blog, CTAs |
| **Cards Inteligentes** | Barra lateral de destaque, hover 3D, imagem zoom |
| **RSS & Sitemap** | Feed em `/rss.xml`, sitemap automático |
| **SEO** | Open Graph, Twitter Cards, canonical URLs, meta tags |
| **Acessibilidade** | ARIA labels, focus visible, semantic HTML, skip links |
| **MDX Support** | Posts com componentes interativos |
| **Keystatic CMS** | Editor headless para gerenciar posts (dev-only) |

## Design System

- **Cor de destaque**: Teal (`#0ea5a5` / `#14b8a6`)
- **Tipografia**: Inter (UI) + JetBrains Mono (código) + Manrope (display)
- **Fontes servidas localmente** via `@font-face` em `src/assets/fonts/`
- **Espaçamento**: Sistema de 4px (`--space-1` a `--space-8`)
- **Sombras**: `shadow-sm`, `shadow-md`, `shadow-glow`
- **Bordas**: `radius-sm` (6px), `radius-md` (10px), `radius-lg` (16px)
- **Transições**: `fast` (150ms), `normal` (250ms) — cubic-bezier(0,0,.2,1)

## Estrutura do Projeto

```text
├── public/                 # Arquivos estáticos (favicon, etc.)
│   └── scripts/            # JS client-side (theme, header, scroll, etc.)
├── src/
│   ├── assets/             # Imagens, fontes, placeholders
│   ├── components/         # Componentes Astro reutilizáveis
│   │   ├── BaseHead.astro  # Meta tags, SEO, CSS global
│   │   ├── Header.astro    # Glassmorphism + menu mobile
│   │   ├── Footer.astro    # Links organizados
│   │   ├── Logo.astro      # Logo minimalista
│   │   ├── ThemeToggle.astro     # Dark/Light switch
│   │   ├── NoiseBackground.astro # Textura sutil
│   │   ├── ScrollProgress.astro  # Barra de progresso
│   │   └── ...
│   ├── content/
│   │   └── blog/           # Posts em .md/.mdx
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Layout base do site
│   │   └── BlogPost.astro      # Layout de post
│   ├── pages/
│   │   ├── index.astro     # Home com hero + posts recentes
│   │   ├── about.astro     # Página sobre
│   │   ├── blog/
│   │   │   ├── index.astro # Lista completa de posts
│   │   │   └── [...slug].astro # Rota dinâmica de post
│   │   └── rss.xml.js      # Geração de feed
│   ├── styles/
│   │   └── global.css      # Design system completo
│   ├── consts.ts           # Config do site + tema
│   └── content.config.ts   # Schema de validação (Zod)
├── astro.config.mjs        # Config Astro + integrações
├── keystatic.config.ts     # CMS headless (dev-only)
├── package.json
├── tsconfig.json
└── README.md
```

## Comandos

| Comando | Ação |
|---------|------|
| `pnpm install` | Instala dependências |
| `pnpm dev` | Servidor local em `http://localhost:4321` |
| `pnpm build` | Build de produção em `./dist/` |
| `pnpm preview` | Preview do build local |
| `pnpm check` | Type-check das páginas |

## Criando Novos Posts

1. Crie um arquivo em `src/content/blog/seu-post.md` (ou `.mdx`)
2. Adicione o frontmatter:

```yaml
---
title: 'Título do Post'
description: 'Descrição curta para SEO e cards'
pubDate: 2026-01-15
heroImage: ../../assets/seu-post/hero.webp  # opcional
updatedDate: 2026-01-20  # opcional
---
```

3. Escreva o conteúdo em Markdown/MDX
4. O post aparecerá automaticamente na home (destaque + 3 recentes) e em `/blog`

Assets (imagens) ficam em `src/assets/<slug>/`. O slug é derivado do nome do arquivo.

## Personalização Rápida

| O que alterar | Onde |
|---------------|------|
| Título/Descrição/Autor | `src/consts.ts` |
| URL do site | `astro.config.mjs` → `site` |
| Cores do tema | `src/styles/global.css` → `:root` / `[data-theme="dark"]` |
| Fontes | `src/styles/global.css` → `@font-face` (locais em `src/assets/fonts/`) |
| Endpoint da newsletter | `src/pages/index.astro` → formulário com Formspree |
| Estatísticas do hero | `src/pages/index.astro` (dinâmico via `getCollection`) |
| Links sociais | `src/consts.ts` → `SOCIAL_LINKS` |

## Newsletter (Formspree)

O formulário na home usa **Formspree** com:
- **AJAX** — não recarrega a página
- **Honeypot** (`_gotcha`) — anti-bot invisível
- **Feedback visual** — toast de sucesso/erro

Para configurar:
1. Crie conta em [formspree.io](https://formspree.io)
2. Novo formulário → copie o ID (ex: `mgojzqob`)
3. Edite o `action` do formulário em `src/pages/index.astro`:
   ```astro
   <form action="https://formspree.io/f/SEU_ID_AQUI" ...>
   ```

## Dark Mode

- Detecta `prefers-color-scheme` automaticamente
- Persiste escolha no `localStorage`
- Toggle no header (ícone sol/lua)
- Transição suave entre temas

## Responsividade

- **Mobile-first** (≤ 680px): menu hamburger, cards em coluna única
- **Tablet** (681–1024px): grid 2 colunas onde aplicável
- **Desktop** (> 1024px): layout completo com sidebar

## SEO & Performance

- **Zero JS** por padrão (`astro:static`)
- **View Transitions** entre páginas
- **Imagens otimizadas** via `astro:assets` (WebP/AVIF, lazy-load)
- **Fontes servidas localmente** (sem dependência externa)
- **Security headers** definidos em `vercel.json` e `docker/nginx.conf`

## Deploy

### Vercel (recomendado)
```bash
vercel deploy
```
Configura automaticamente: build command `pnpm build`, output `dist/`.

### Docker
```bash
docker-compose up --build
```
Serve em `http://localhost:8080` via nginx.

### Static Hosting Genérico
```bash
pnpm build
# Faça upload da pasta ./dist para qualquer host estático
```

## Licença

MIT — sinta-se livre para usar, modificar e distribuir.

---

**Feito com ❤️ e Astro por [SamutegDev](https://github.com/samuteg)**
