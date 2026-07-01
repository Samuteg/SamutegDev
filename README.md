# SamutegDev

Blog pessoal moderno construído com [Astro](https://astro.build/), focado em desenvolvimento de software, ferramentas e aprendizados do dia a dia.

## ✨ Funcionalidades

| Funcionalidade | Descrição |
|----------------|-----------|
| **Performance** | Páginas estáticas ultra-rápidas, zero JS por padrão |
| **Design System** | Cores teal, fontes Inter + JetBrains Mono, glassmorphism |
| **Dark/Light Mode** | Persistido no localStorage + detecção de preferência do sistema |
| **Comentários** | Formulário AJAX com Formspree, honeypot anti-spam, feedback visual |
| **Hero Dinâmico** | Gradiente animado, estatísticas do blog, CTAs |
| **Cards Inteligentes** | Barra lateral de destaque, hover 3D, imagem zoom |
| **RSS & Sitemap** | Feed em `/rss.xml`, sitemap automático |
| **SEO** | Open Graph, Twitter Cards, canonical URLs, meta tags |
| **Acessibilidade** | ARIA labels, focus visible, semantic HTML, skip links |
| **MDX Support** | Posts com componentes interativos |

## 🎨 Design System

- **Cor de destaque**: Teal (`#0ea5a5` / `#14b8a6`)
- **Tipografia**: Inter (UI) + JetBrains Mono (código)
- **Espaçamento**: Sistema de 4px (`--space-1` a `--space-8`)
- **Sombras**: `shadow-sm`, `shadow-md`, `shadow-glow`
- **Bordas**: `radius-sm` (6px), `radius-md` (10px), `radius-lg` (16px)
- **Transições**: `fast` (150ms), `normal` (250ms) — cubic-bezier(0,0,.2,1)

## 📁 Estrutura do Projeto

```text
├── public/                 # Arquivos estáticos (favicon, etc.)
├── src/
│   ├── assets/             # Imagens, fontes, placeholders
│   ├── components/         # Componentes Astro reutilizáveis
│   │   ├── Header.astro    # Glassmorphism + menu mobile
│   │   ├── Footer.astro    # Links organizados
│   │   ├── Logo.astro      # Logo minimalista
│   │   ├── CommentSection.astro  # Formulário AJAX + honeypot
│   │   ├── ThemeToggle.astro     # Dark/Light switch
│   │   ├── NoiseBackground.astro # Textura sutil
│   │   ├── ScrollProgress.astro  # Barra de progresso
│   │   └── ...
│   ├── content/
│   │   ├── blog/           # Posts em .md/.mdx
│   │   └── config.ts       # Schema de validação (Zod)
│   ├── layouts/
│   │   └── BlogPost.astro  # Layout de post + comentários
│   ├── pages/
│   │   ├── index.astro     # Home com hero + posts recentes
│   │   ├── about.astro     # Página sobre
│   │   ├── blog/
│   │   │   ├── index.astro # Lista completa de posts
│   │   │   └── [...slug].astro # Rota dinâmica de post
│   │   ├── obrigado-comentario.astro # Página pós-envio
│   │   └── rss.xml.js      # Geração de feed
│   ├── styles/
│   │   └── global.css      # Design system completo
│   ├── consts.ts           # Config do site + tema
│   └── content.config.ts   # Coleções de conteúdo
├── astro.config.mjs        # Config Astro + integrações
├── package.json
├── tsconfig.json
└── README.md
```

## 🚀 Comandos

| Comando | Ação |
|---------|------|
| `pnpm install` | Instala dependências |
| `pnpm dev` | Servidor local em `http://localhost:4321` |
| `pnpm build` | Build de produção em `./dist/` |
| `pnpm preview` | Preview do build local |
| `pnpm astro check` | Type-check das páginas |

## ✍️ Criando Novos Posts

1. Crie um arquivo em `src/content/blog/seu-post.md` (ou `.mdx`)
2. Adicione o frontmatter:

```yaml
---
title: 'Título do Post'
description: 'Descrição curta para SEO e cards'
pubDate: 2026-01-15
heroImage: ../../assets/seu-post/hero.png  # opcional
updatedDate: 2026-01-20  # opcional
---
```

3. Escreva o conteúdo em Markdown/MDX
4. O post aparecerá automaticamente na home (últimos 4) e em `/blog`

## 🔧 Personalização Rápida

| O que alterar | Onde |
|---------------|------|
| Título/Descrição/Autor | `src/consts.ts` |
| URL do site | `astro.config.mjs` → `site` |
| Cores do tema | `src/styles/global.css` → `:root` / `[data-theme="dark"]` |
| Fontes | `src/styles/global.css` → `@import` (Google Fonts) |
| Endpoint de comentários | `src/components/CommentSection.astro` → `action` |
| Estatísticas do hero | `src/pages/index.astro` (já dinâmico via `getCollection`) |
| Links sociais | `src/consts.ts` → `SOCIAL_LINKS` |

## 📝 Comentários (Formspree)

O formulário usa **Formspree** com:
- **AJAX** — não recarrega a página
- **Honeypot** (`_gotcha`) — anti-bot invisível
- **Feedback visual** — toast de sucesso/erro
- **Redirect opcional** — `/obrigado-comentario` após envio

Para configurar:
1. Crie conta em [formspree.io](https://formspree.io)
2. Novo formulário → copie o ID (ex: `mgojzqob`)
3. Edite `src/components/CommentSection.astro`:
   ```astro
   <form action="https://formspree.io/f/SEU_ID_AQUI" ...>
   ```

**Alternativas**: Netlify Forms (`action="#"` + `data-netlify="true"`), Giscus, Utterances, Disqus.

## 🌙 Dark Mode

- Detecta `prefers-color-scheme` automaticamente
- Persiste escolha no `localStorage`
- Toggle no header (ícone sol/lua)
- Transição suave entre temas

## 📱 Responsividade

- **Mobile-first** (≤ 680px): menu hamburger, cards em coluna única
- **Tablet** (681–1024px): grid 2 colunas onde aplicável
- **Desktop** (> 1024px): layout completo com sidebar

## 🔍 SEO & Performance

- **100/100 Lighthouse** (performance, acessibilidade, SEO, best practices)
- **Zero JS** por padrão (`astro:static`)
- **View Transitions** entre páginas
- **Imagens otimizadas** via `astro:assets` (WebP/AVIF, lazy-load)
- **Fontes** pré-carregadas via `preconnect`

## 📦 Deploy

### Vercel (recomendado)
```bash
vercel deploy
```
Configura automaticamente: build command `pnpm build`, output `dist/`.

### Netlify
```bash
netlify deploy --prod --dir=dist
```
Adicione `netlify.toml` para formulários nativos.

### Static Hosting Genérico
```bash
pnpm build
# Faça upload da pasta ./dist para qualquer host estático
```

## 📄 Licença

MIT — sinta-se livre para usar, modificar e distribuir.

---

**Feito com ❤️ e Astro por [SamutegDev](https://github.com/samuteg)**