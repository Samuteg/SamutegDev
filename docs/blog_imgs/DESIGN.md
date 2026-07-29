---
name: Aetherial Modern
colors:
  surface: '#131318'
  surface-dim: '#131318'
  surface-bright: '#39383e'
  surface-container-lowest: '#0e0e13'
  surface-container-low: '#1b1b20'
  surface-container: '#1f1f25'
  surface-container-high: '#2a292f'
  surface-container-highest: '#35343a'
  on-surface: '#e4e1e9'
  on-surface-variant: '#cac4d4'
  inverse-surface: '#e4e1e9'
  inverse-on-surface: '#303036'
  outline: '#948e9d'
  outline-variant: '#494552'
  surface-tint: '#cebdff'
  primary: '#cebdff'
  on-primary: '#381385'
  primary-container: '#a78bfa'
  on-primary-container: '#3c1989'
  inverse-primary: '#674bb5'
  secondary: '#bdc2ff'
  on-secondary: '#131e8c'
  secondary-container: '#2f3aa3'
  on-secondary-container: '#a8afff'
  tertiary: '#ffafd3'
  on-tertiary: '#620040'
  tertiary-container: '#f170b4'
  on-tertiary-container: '#6a0045'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e8ddff'
  primary-fixed-dim: '#cebdff'
  on-primary-fixed: '#21005e'
  on-primary-fixed-variant: '#4f319c'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bdc2ff'
  on-secondary-fixed: '#000767'
  on-secondary-fixed-variant: '#2f3aa3'
  tertiary-fixed: '#ffd8e7'
  tertiary-fixed-dim: '#ffafd3'
  on-tertiary-fixed: '#3d0026'
  on-tertiary-fixed-variant: '#85145a'
  background: '#131318'
  on-background: '#e4e1e9'
  surface-variant: '#35343a'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Manrope
    fontSize: 40px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.7'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1200px
  section-gap: 8rem
  stack-gap: 1.5rem
  gutter: 2rem
  margin-mobile: 1rem
  margin-desktop: 2.5rem
---

## Brand & Style
The brand personality is sophisticated, introspective, and tech-forward. It is designed for a personal blog that feels like a premium digital sanctuary—blending the clarity of modern SaaS interfaces with the editorial depth of a high-end publication.

The visual style is **Modern Glassmorphism**. It relies on deep obsidian surfaces, subtle transparency, and vibrant neon accents to create a sense of infinite depth. The user experience should feel immersive and "quiet," using generous whitespace and smooth transitions to guide the reader through long-form content.

## Colors
This design system utilizes a "Deep Space" palette. The primary interaction color is a luminous Violet, used sparingly to draw attention to actionable elements. 

- **Primary Canvas:** The background is near-black (#0a0a0f) to minimize eye strain and maximize the pop of the accent colors.
- **Surface Strategy:** Surfaces use a slightly lighter hex (#12121a) with varying opacities to indicate hierarchy.
- **Accents:** Use the Hero Gradient specifically for large-scale storytelling elements (e.g., hero section headers, separators). Use the Accent Subtle for background glows or hover states on larger surface areas.

## Typography
Typography is a mix of three distinct voices:
1. **Manrope (Headers):** Used for headlines to provide a modern, balanced, and geometric structure.
2. **Inter (Body):** Selected for its exceptional legibility in dark mode. The line height is intentionally loose (1.6 - 1.7) to prevent "haloing" and ensure a comfortable reading rhythm.
3. **JetBrains Mono (Metadata):** Used for dates, tags, and reading time to lean into the technical/modern aesthetic of the blog.

Always use `text-main` for headlines and `text-muted` for secondary body text or metadata.

## Layout & Spacing
The layout follows a **Fixed Grid** model for content readability. The central content column is capped at 1200px, but reading sections (blog posts) should be further constrained to 720px to maintain optimal characters-per-line.

- **Desktop:** 12-column grid with 32px gutters.
- **Mobile:** Single column with 16px horizontal margins.
- **Rhythm:** Use an 8px base unit. Section spacing should be aggressive (128px+) to allow the dark background to feel expansive and "premium."

## Elevation & Depth
Depth is achieved through **Glassmorphism** rather than traditional shadows.
- **Layer 0 (Base):** Background (#0a0a0f).
- **Layer 1 (Cards):** Surface color at 60% opacity with a 12px backdrop blur and a 1px border (`card_border`).
- **Layer 2 (Floating/Nav):** Header background at 50% opacity with a heavy 20px backdrop blur.

Do not use drop shadows. Instead, use a subtle inner glow or a white border at 10% opacity to define the edges of surfaces against the dark background.

## Shapes
The shape language is **Rounded**, conveying a sense of approachability within the dark, technical aesthetic. 
- All standard containers (cards, code blocks) use a 0.5rem radius.
- Interactive elements like buttons and tags use 1rem (rounded-lg) or full pill shapes to distinguish them from structural content.

## Components
### Buttons
- **Primary:** Violet background, white text. No border. On hover, transition to the Accent Hover color.
- **Ghost:** Transparent background, `card_border` outline. On hover, apply `accent_subtle` background.

### Cards
Cards are the primary container. They must feature:
- 60% opacity surface color.
- 12px backdrop-blur-md.
- 1px solid border (rgba(255, 255, 255, 0.1)).
- No shadow, unless it is a "glow" shadow using the primary violet at 5% opacity for hover states.

### Header
Sticky navigation with `backdrop-filter: blur(20px)`. Include a bottom border of 1px at 5% opacity to separate it from the content without breaking the flow.

### Inputs
Search and newsletter fields should be dark-themed, using the `surface` color, no fill (outline only), and the `jetbrainsMono` font for the input text.