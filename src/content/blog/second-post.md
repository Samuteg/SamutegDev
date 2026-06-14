---
title: 'Organizando projetos com pnpm workspaces'
description: 'Como gerenciar múltiplos pacotes em um monorepo com pnpm e manter dependências sob controle.'
pubDate: 'Mar 05 2026'
heroImage: '../../assets/blog-placeholder-4.jpg'
---

Monorepos são uma forma prática de manter bibliotecas, apps e ferramentas relacionadas no mesmo repositório. Com o **pnpm**, a configuração fica enxuta e eficiente.

## O arquivo pnpm-workspace.yaml

A configuração central fica em `pnpm-workspace.yaml`. Nele você declara quais pastas fazem parte do workspace:

```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

Qualquer pasta que corresponda a esses padrões passa a ser um pacote do monorepo, com dependências compartilhadas e links internos automáticos.

## Vantagens na prática

- **Instalação única**: um `pnpm install` na raiz resolve tudo
- **Links locais**: pacotes internos se referenciam sem publicar no npm
- **Deduplicação**: o pnpm economiza disco com links simbólicos no store global
- **Scripts centralizados**: dá para orquestrar builds e testes a partir da raiz

## Quando faz sentido

Monorepos brilham quando você tem código compartilhado entre projetos — tipos TypeScript, utilitários, componentes de UI ou configs de lint. Se você mantém apenas um app isolado, um repositório simples pode ser suficiente.

## Dica

Comece pequeno: extraia para um pacote interno apenas o que já está sendo duplicado. A estrutura pode crescer organicamente conforme a necessidade, sem over-engineering desde o início.
