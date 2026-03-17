

## Plan: Fix Instagram handle, font weight, and button design

### Changes

**1. Fix Instagram — `src/components/ContactSection.tsx`**
- Change `@elevare` to `@elevareconceito`
- Update the Instagram link from `https://instagram.com/elevare` to `https://instagram.com/elevareconceito`

**2. Fix font weight throughout the site**

The project only loads `Barlow-Regular.ttf` (weight 400). Any use of `font-semibold` (600) or `font-bold` (700) causes the browser to synthesize a fake bold, resulting in thick, ugly text.

Remove all `font-bold` and `font-semibold` from the following components, replacing with `font-medium` or `font-normal` as appropriate:

- **`HeroSection.tsx`**: The CTA buttons use `font-bold` — change to `font-medium`
- **`CatalogSection.tsx`**: Section heading uses `font-semibold` — change to `font-normal` or `font-medium`
- **`PortfolioSection.tsx`**: Section heading uses `font-semibold` — same fix
- **`ContactSection.tsx`**: Section heading uses `font-semibold` — same fix
- **`GalleryTab.tsx`**: Product name labels use `font-semibold` — change to `font-medium`
- Any other components using `font-semibold` or `font-bold` with Barlow

**3. Fix filter button design**

The filter buttons in Portfolio and Catalog sections use `border-2` for the active state, making them look thick and heavy. Changes:

- **`PortfolioSection.tsx`** and **`CatalogSection.tsx`**: Change active state from `border-2 border-gold` to `border border-gold` (single pixel border) for a more refined look
- Keep the `rounded-full` pill shape but ensure consistent, thin borders

### Summary of files to edit
- `src/components/ContactSection.tsx` — Instagram handle + font weight
- `src/components/HeroSection.tsx` — button font weight
- `src/components/CatalogSection.tsx` — heading + button border
- `src/components/PortfolioSection.tsx` — heading + button border
- `src/components/GalleryTab.tsx` — label font weight

