

# Typography Overhaul: Match ELEVARE Logo Font Style

## Logo Analysis

The ELEVARE logo uses a **thin/light-weight serif font** with very wide letter-spacing --- elegant, refined, and architectural in character. This is consistent with luxury branding fonts like **Cormorant Garamond**, **Playfair Display**, or **Cinzel**. The style is: light weight, generous tracking, uppercase, classic serif with high contrast strokes.

## Typography Strategy

Rather than using one font everywhere, the plan uses a **dual-font system** that complements the logo's elegance:

| Role | Font | Why |
|------|------|-----|
| **Headings / Brand** | **Cormorant Garamond** (light/semibold) | Closest match to the logo's thin elegant serif. Free on Google Fonts. |
| **Body / UI** | **Inter** (current, keep) | Clean sans-serif for readability. Contrasts beautifully with the serif headings. |

## Changes

### 1. `index.html` -- Add Google Font import
Add `<link>` for Cormorant Garamond (weights 300, 400, 600) from Google Fonts.

### 2. `src/index.css` -- Define font variables
- Add `font-family: 'Cormorant Garamond', serif` as a CSS variable or utility class `.font-heading`
- Keep `Inter` as body font
- Add utility `.font-heading` for the serif font

### 3. Components -- Apply heading font
All section headings and brand text switch to the serif font:

- **Navbar**: "ELEVARE" text -- `font-heading font-light tracking-[0.3em]`
- **HeroSection**: h1 "ELEVARE" -- `font-heading font-light`, subtitle "Cores e Formas" -- `font-heading font-normal tracking-[0.2em]`
- **CatalogSection**: h2 "Catálogo" -- `font-heading font-semibold`
- **SimulatorSection**: h2 "Simulador de Ambientes" -- `font-heading font-semibold`
- **AboutSection**: h2 "Por que ELEVARE?" -- `font-heading font-semibold`
- **ContactSection**: h2 "Contato" -- `font-heading font-semibold`
- **Footer**: "ELEVARE" text -- `font-heading`

Body text, buttons, labels, and UI elements remain in **Inter** for legibility.

### Files Modified (8)
1. `index.html` -- Google Fonts link
2. `src/index.css` -- font-heading utility
3. `src/components/Navbar.tsx` -- heading font on brand
4. `src/components/HeroSection.tsx` -- heading font on h1 + subtitle
5. `src/components/CatalogSection.tsx` -- heading font on h2
6. `src/components/SimulatorSection.tsx` -- heading font on h2
7. `src/components/AboutSection.tsx` -- heading font on h2
8. `src/components/ContactSection.tsx` -- heading font on h2 + footer

