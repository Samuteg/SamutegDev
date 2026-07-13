# TODO — Performance do SamutegDev

> Auditoria feita em 2026-07-13. Cada item inclui o problema, a solução e o arquivo afetado.

---

## 🔴 Fase 1 — Crítico (impacto direto no LCP / render)

### 1.1 Fontes Google via `@import` são render-blocking

- **Problema:** `global.css` usa `@import url("https://fonts.googleapis.com/...")` — bloqueia o paint até a resposta do servidor externo.
- **Arquivos:** `src/styles/global.css:6`
- **Solução:** Usar as fontes **locais** que já existem em `src/assets/fonts/` (Atkinson) com `@font-face` + `font-display: swap`. Se preferir manter Inter/JetBrains, baixar localmente e servir via `@font-face`.
- **Ação:**
  - [x] Criar blocos `@font-face` em `global.css` para cada variante (regular, medium, semibold, bold, mono)
  - [x] Remover o `@import url(...)` do Google Fonts
  - [x] Garantir `font-display: swap` em todos os `@font-face`

### 1.2 Animação `fade-in-up` usada mas **nunca definida**

- **Problema:** A classe `fade-in-up` é aplicada em 12+ elementos (index, about, blog, BlogPost) mas o CSS termina na linha 320 com apenas um comentário vazio. As animações simplesmente não existem.
- **Arquivo:** `src/styles/global.css:320`
- **Solução:** Implementar `@keyframes fade-in-up` e as classes `.fade-in-up`, `.delay-1` a `.delay-5`.
- **Ação:**
  - [x] Adicionar `@keyframes fadeInUp` no `global.css`
  - [x] Adicionar classes `.fade-in-up` e `.delay-N`
  - [x] Usar `will-change: opacity, transform` para otimizar composição

### 1.3 Imagens sem `loading="lazy"` below-the-fold

- **Problema:** Todas as imagens dos posts, about e hero são carregadas imediatamente (eager), mesmo quando estão fora do viewport.
- **Arquivos:** `src/pages/index.astro`, `src/pages/blog/index.astro`, `src/pages/about.astro`, `src/layouts/BlogPost.astro`
- **Solução:** Adicionar `loading="lazy"` e `decoding="async"` em imagens below-the-fold. A primeira imagem (above-the-fold) fica `loading="eager"`.
- **Ação:**
  - [x] `<Image loading="lazy" decoding="async" ...>` nos cards de posts (index + blog)
  - [x] `<Image loading="lazy" decoding="async" ...>` na imagem do about
  - [x] Hero image do blog post: manter `eager` (above-the-fold)

---

## 🟡 Fase 2 — Importante (impacto no CLS / TBT / mobile)

### 2.1 `NoiseBackground` com `z-index: 9999` + `mix-blend-mode`

- **Problema:** `position: fixed` + `z-index: 9999` + `mix-blend-mode: overlay/soft-light` força uma compositing layer permanente, causando repaint caro em cada frame de scroll.
- **Arquivo:** `src/components/NoiseBackground.astro:11-21`
- **Solução:** Usar `will-change: transform` para promover a layer corretamente, ou melhor: aplicar o noise via CSS no `body`/`html` em vez de um div separado com z-index altíssimo.
- **Ação:**
  - [x] Remover `z-index: 9999` — reduzido para `z-index: 1`
  - [x] Adicionar `will-change: opacity`
  - [x] Remover div wrapper desnecessário

### 2.2 `backdrop-filter: blur(8px)` no Header

- **Problema:** `backdrop-filter` é extremamente custoso em mobile — força repaint a cada pixel de scroll. Safari e Chrome tratam de forma diferente.
- **Arquivo:** `src/components/Header.astro:59`
- **Solução:** Usar `background` sólido com transparência em vez de blur, ou usar `@supports` para aplicar blur apenas em desktop.
- **Ação:**
  - [x] Envolver em `@supports (backdrop-filter: blur(1px))` e fornecer fallback sólido

### 2.3 `transition: all` em 11+ seletores

- **Problema:** `transition: all` faz o browser rastrear TODAS as propriedades CSS para potencial transição, aumentando custo de composição.
- **Arquivos afetados:**
  - `src/styles/global.css` (`.btn`, `.card`)
  - `src/components/Header.astro` (`.github-link`, `.hamburger span`)
  - `src/components/HeaderLink.astro` (`a`)
  - `src/components/ThemeToggle.astro` (`.theme-toggle`)
  - `src/pages/about.astro` (`.social-links a`)
  - `src/pages/index.astro` (`.stat-item`, `.post-item`)
  - `src/pages/blog/index.astro` (`.post-item`)
- **Solução:** Substituir `transition: all` por apenas as propriedades que realmente mudam.
- **Ação:**
  - [x] Listar propriedades animadas de cada seletor e substituir `all`
  - [x] Exemplo: `.card { transition: border-color var(--transition-fast), background-color var(--transition-fast); }`

### 2.4 Hero image `task-nest` é PNG de 621KB

- **Problema:** A imagem hero do post TaskNest é um PNG pesado. Astro converte via `sharp`, mas o source já é grande.
- **Arquivo:** `src/assets/task-nest-a-jornada-de-construir-um-full-stack-real/heroImage.png`
- **Solução:** Converter para WebP/JPG antes de build (reduz ~70%). Astro já gera variantes otimizadas, mas o source grande aumenta tempo de build.
- **Ação:**
  - [x] Converter `heroImage.png` para `.webp` (621KB → 38KB, -94%)
  - [x] Atualizar a referência no frontmatter do MDX

---

## 🟢 Fase 3 — Melhorias (qualidade + manutenção)

### 3.1 CSS duplicado entre páginas

- **Problema:** Os estilos `.post-item`, `.image-wrapper`, `.date`, `.item-content`, `.post-item-link` estão duplicados em `src/pages/index.astro` e `src/pages/blog/index.astro`.
- **Solução:** Extrair para um CSS parcial (`src/styles/posts.css`) ou componente Astro com `<style>`.
- **Ação:**
  - [x] Criar `src/styles/posts.css` com os estilos compartilhados
  - [x] Importar em ambas as páginas
  - [x] Manter apenas os estilos específicos de cada página inline

### 3.2 `CommentSection` JS carregado em todo blog post

- **Problema:** ~150 linhas de JS (validação, AJAX, honeypote) carregam em todos os posts, mesmo sem interação do usuário.
- **Solução:** Lazy-load o script quando o formulário estiver no viewport, ou extrair para um `<script type="module">` separado.
- **Ação:**
  - [x] Mover o `<script>` do CommentSection para `<script type="module" src="/scripts/comments.js">` com `async`

### 3.3 Sem `preconnect` para domínios externos

- **Problema:** Não há `<link rel="preconnect">` — se mantiver Google Fonts ou usar Formspree, o browser resolve DNS + TLS sob demanda.
- **Arquivo:** `src/components/BaseHead.astro`
- **Solução:** Adicionar `<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>` (se aplicável) e para Formspree.
- **Ação:**
  - [x] Fontes trocadas para locais — preconnect para Google removido
  - [x] Adicionar `<link rel="preconnect" href="https://formspree.io">` no BaseHead

### 3.4 `scroll-behavior: smooth` global

- **Problema:** Aplicado no `html` — pode conflitar com scroll handling JS e causar comportamento inesperado em navigate-back.
- **Arquivo:** `src/styles/global.css:98`
- **Solução:** Aplicar `scroll-behavior: smooth` apenas em links âncora específicos, não globalmente.
- **Ação:**
  - [x] Remover `scroll-behavior: smooth` do `html`
  - [x] Adicionar `scroll-behavior: smooth` apenas em `a[href^="#"]`

### 3.5 `overflow-x: hidden` no `body`

- **Problema:** Cria um novo stacking context no body, pode causar problemas com `position: fixed` filhos e `z-index`.
- **Arquivo:** `src/styles/global.css:111`
- **Solução:** Remover e tratar overflow nos containers específicos.
- **Ação:**
  - [x] Remover `overflow-x: hidden` do `body`
  - [x] Adicionar `overflow-x: hidden` no `main`

### 3.6 Favicon duplicado

- **Problema:** Dois links de favicon no BaseHead — um SVG e um ICO. O ICO é redundante em browsers modernos.
- **Arquivo:** `src/components/BaseHead.astro:23-24`
- **Solução:** Manter apenas o SVG com fallback via `<link rel="icon" href="/favicon.svg" type="image/svg+xml">`.
- **Ação:**
  - [x] Manter SVG como favicon principal
  - [x] Remover `<link rel="icon" href="/favicon.ico" />`

---

## 📋 Resumo de prioridade

| Fase | Itens | Impacto estimado |
|------|-------|-----------------|
| 🔴 Fase 1 | 3 itens | LCP -30~50%, elimina flash de fonte, corrige animações quebradas |
| 🟡 Fase 2 | 4 itens | CLS e TBT menores, melhor mobile perf |
| 🟢 Fase 3 | 6 itens | Manutenção, bundle menor, melhor UX |

---

## 🎯 Ordem de execução sugerida

1. `1.1` — Fontes locais (maior impacto isolado)
2. `1.2` — Definir fade-in-up (bug: animações não existem)
3. `1.3` — Lazy loading nas imagens
4. `2.1` — NoiseBackground otimizado
5. `2.2` — Header backdrop-filter
6. `2.3` — transition: all → específicas
7. `2.4` — Converter PNG hero image
8. `3.1` — Extrair CSS compartilhado
9. `3.2` — Lazy-load CommentSection JS
10. `3.3` — Preconnect hints
11. `3.4` — scroll-behavior: smooth
12. `3.5` — overflow-x: hidden
13. `3.6` — Favicon cleanup
