# Relatório de Melhorias — SamutegDev

> Auditoria e correção realizada em 2026-01-11. Escopo: **performance**, **segurança** e
> **design/acessibilidade**. Todas as correções foram aplicadas e validadas com
> `pnpm check` (0 erros) e `pnpm build` (26 páginas, sem inline scripts executáveis).

---

## 🔴 Crítico — Segurança

### S1. CSP quebrava o site em produção

- **Problema:** `vercel.json` e `docker/nginx.conf` definiam `script-src 'self'` sem
  hashes nem `'unsafe-inline'`, mas o HTML continha **5 scripts inline executáveis**:
  filtro de tags (`blog/index.astro`), TOC (`TableOfContents.astro`), botão copiar link
  (`ShareButtons.astro`), hidratação das ilhas React da home (`astro:load` + isla
  bootstrap, ~4,5 KB) e atribuições `set:html`. Em produção, **toc, share, filtro de
  tags, tempo de leitura e newsletter simplesmente não funcionavam**.
- **Correção aplicada:**
  - Scripts extraídos para arquivos externos: [`public/scripts/blog-filters.js`](public/scripts/blog-filters.js), [`public/scripts/toc.js`](public/scripts/toc.js), [`public/scripts/share.js`](public/scripts/share.js), [`public/scripts/newsletter.js`](public/scripts/newsletter.js)
  - Ilhas React da Home eliminadas (`Reveal`/framer-motion → CSS puro; `NewsletterSection`
    React → HTML estático + script externo). Verificado no build: **zero `<script>` inline
    executável** em todas as páginas (restantes: apenas `application/ld+json`, que não é
    afetado por `script-src`).
  - CSP endurecida e sincronizada: removidos `https://vercel.live` e
    `wss://ws-us3.pusher.com` (sobras do Vercel Live Toolbar) de `script-src`,
    `connect-src` e `frame-src` em [`vercel.json`](vercel.json) e [`docker/nginx.conf`](docker/nginx.conf).

### S2. `add_header` do nginx não herda dentro de `location`

- **Problema:** o bloco `location ~* \.(js|css|...)` de cache definia seu próprio
  `add_header`, o que **anulava todos os headers de segurança** (CSP, HSTS, XFO…) para
  todos os arquivos estáticos servidos via Docker.
- **Correção aplicada:** headers de segurança repetidos dentro do bloco de cache em
  [`docker/nginx.conf:27-34`](docker/nginx.conf#L27-L34), com comentário explicando o
  comportamento de herança do nginx.

### S3. JSON-LD sem escape de `</script>`

- **Problema:** `set:html` com `JSON.stringify` (BaseHead + BlogPost) não escapava `<` —
  um título de post contendo `</script>` quebraria o documento HTML.
- **Correção aplicada:** `.replace(/</g, "\\u003c")` nos três blocos JSON-LD
  ([`BaseHead.astro`](src/components/BaseHead.astro), [`BlogPost.astro:56`](src/layouts/BlogPost.astro#L56)).

### S4. `theme.js` quebrava em modo privado

- **Problema:** `localStorage.getItem/setItem` sem `try/catch` lança `SecurityError`
  quando o armazenamento está bloqueado — como o script roda no `<head>` antes do paint,
  derrubava todo o carregamento de tema. Além disso gravava no storage **a cada visita**.
- **Correção aplicada:** [`public/scripts/theme.js`](public/scripts/theme.js) e
  [`theme-toggle.js`](public/scripts/theme-toggle.js) agora toleram storage bloqueado e só
  gravam quando o usuário troca de tema.

### ✅ Segurança — verificado OK (sem ação)

- `pnpm audit --audit-level=high`: **nenhuma vulnerabilidade**
- Honeypot `_gotcha` no formulário de contato e na newsletter; todo feedback via
  `textContent` (zero `innerHTML`)
- Todos os `target="_blank"` com `rel="noopener noreferrer"`
- Keystatic restrito a dev (não existe `dist/keystatic`); `.gitignore` cobre `.env*` e
  `**/.obsidian/`
- Páginas 404 e obrigado marcadas com `noindex,nofollow` ([`BaseHead.astro`](src/components/BaseHead.astro), novo prop `index`)

### ⚠️ Pendente (documentado, exige decisão)

- **Docker serve apenas HTTP na porta 80** — HSTS fica inerte sem TLS em frente. Em
  produção Docker, colocar atrás de um proxy TLS (Caddy/Traefik/nginx) ou adicionar
  `listen 443 ssl` com certificados. A imagem `nginx:stable-alpine` também roda como root —
  considere `nginxinc/nginx-unprivileged` se o host exigir.

---

## 🟡 Performance

### P1. Imagens LCP com `loading="lazy"` (regressão do redesign)

- **Problema:** as três imagens acima da dobra carregavam tardiamente: destaque da home
  ([`index.astro`](src/pages/index.astro)), hero do sobre ([`about.astro:41`](src/pages/about.astro#L41))
  e hero dos posts ([`BlogPost.astro:96`](src/layouts/BlogPost.astro#L96)).
- **Correção aplicada:** `loading="eager"` + `fetchpriority="high"` nas três; cards
  continuam `lazy`. Dimensões corrigidas para 16:9 real (`800×450`, `600×338`) evitando
  pixels descartados no recorte `aspect-video`.

### P2. Home hidratava React + framer-motion (~45 KB gzip) para um fade-in

- **Correção aplicada:** seção de destaque agora usa animação CSS `@keyframes`
  ([`index.astro`](src/pages/index.astro)) com `prefers-reduced-motion`; newsletter virou
  formulário estático. **A home deixou de enviar React para o cliente.** Deps removidas:
  `motion`, `lucide-react`, `@radix-ui/*`, `class-variance-authority`, `clsx`,
  `tailwind-merge`, `tw-animate-css` (biblioteca inteira importada e não usada), além dos
  arquivos mortos `Reveal.tsx`, `NewsletterSection.tsx`, `components/ui/*`, `lib/utils.ts`.

### P3. Fontes: só peso 400 ⇒ faux bold em todos os títulos

- **Correção aplicada:** pesos reais 600/700/800 de Inter e Manrope baixados
  (latin woff2, ~14–25 KB cada); `Space Grotesk` (4 `@font-face` jamais usados) removida.
  Fontes movidas para `public/fonts/` (URLs estáveis) e preload das críticas no
  [`BaseHead.astro`](src/components/BaseHead.astro): Inter 400 + Manrope 700/800 com `font-display: swap`.

### P4. Scripts bloqueando o parser + listeners mortos

- **Correção aplicada:** `defer` em `header.js`, `theme-toggle.js`, `reading-time.js`,
  `contact.js`, `toc.js`, `share.js`, `blog-filters.js`, `newsletter.js`
  (`theme.js` permanece síncrono, intencionalmente). Removidos os listeners
  `astro:after-swap` — o site não usa `ClientRouter`, era código morto.

### P5. Header `backdrop-blur-xl` sem fallback (regressão)

- **Correção aplicada:** fundo sólido por padrão, blur apenas quando suportado via
  `supports-[backdrop-filter:blur(1px)]` em [`Header.astro:8`](src/components/Header.astro#L8).

### P6. `transition-all` reintroduzido

- **Correção aplicada:** substituído por `transition-colors` (pills de tag) e
  `transition-[filter]` (imagem do sobre) — o navegador deixa de rastrear todas as
  propriedades animáveis.

### P7. CSS morto

- **Correção aplicada:** ~15 blocos de comentário vazios removidos de
  [`global.css`](src/styles/global.css); import de `tw-animate-css` eliminado (nenhuma
  classe usada no código).

---

## 🟢 Design & Acessibilidade

| # | Item | Correção aplicada |
|---|------|-------------------|
| D1 | Sem skip link | Adicionado "Pular para o conteúdo" em [`BaseLayout.astro`](src/layouts/BaseLayout.astro) (`<main id="conteudo">`) |
| D2 | Nav sem estado ativo semântico | `aria-current="page"` em [`HeaderLink.astro:12`](src/components/HeaderLink.astro#L12) |
| D3 | ThemeToggle removia o foco visível | `outline-none` substituído por `focus-visible:ring-2 focus-visible:ring-ring` em [`ThemeToggle.astro:1`](src/components/ThemeToggle.astro#L1) |
| D4 | Hambúrguer já correto | `aria-expanded` + `aria-label` dinâmico + Esc fecha — mantido e simplificado em [`public/scripts/header.js`](public/scripts/header.js) |
| D5 | Contraste | Tema escuro: `--muted-foreground #cac4d4` sobre `#0a0a0f` ≈ 12:1 ✅. Tema claro: `#78716c` sobre `#faf9f6` ≈ 4.7:1 (passa AA) ✅. Sem alteração necessária |
| D6 | Movimento | `scroll-behavior: smooth` global já protegido por `prefers-reduced-motion: reduce`; nova animação `.reveal` também respeita ✅ |
| D7 | Copy do share | Feedback "Copiado!" do botão permanecia para sempre — agora some após 2 s ([`public/scripts/share.js`](public/scripts/share.js)) |

---

## Validação

```text
pnpm check  → 0 errors, 0 warnings (33 arquivos)
pnpm build  → 26 páginas, completo
pnpm audit --audit-level=high → No known vulnerabilities found
dist/*.html → zero <script> inline executável (CSP 'self' efetiva)
```

## Arquivos novos

- `public/scripts/blog-filters.js`, `public/scripts/toc.js`, `public/scripts/share.js`, `public/scripts/newsletter.js`
- `public/fonts/inter-latin-{600,700,800}.woff2`, `public/fonts/manrope-latin-{600,700,800}.woff2`

## Arquivos removidos

- `src/components/Reveal.tsx`, `src/components/NewsletterSection.tsx`, `src/components/ui/*`, `src/lib/`
- `src/assets/fonts/` (movido para `public/fonts/`; Space Grotesk e Atkinson mortos eliminados)

## Próximos passos sugeridos (não bloqueantes)

1. **Docker + TLS**: documentar/adicionar proxy TLS para o deploy self-hosted.
2. **Purga de deps React**: se o Keystatic sair de cena, `@astrojs/react`/`react` também
   podem ser removidos — hoje nenhuma ilha React é enviada ao cliente.
3. **OG images dinâmicas**: hoje o fallback é uma imagem estática; `satori`/`@vercel/og`
   gerariam cards por post.
4. **CI de performance**: Lighthouse CI no workflow para evitar novas regressões de LCP.
