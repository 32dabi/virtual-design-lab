

# Plan: Complete Catalog & Gallery Overhaul

This is a massive undertaking involving 3 major areas: replacing all product data, generating ~38 product images + ~56 gallery images, and updating all dependent components. Due to the scale, I'll break it into phases.

---

## Phase 1: Replace Product Data (`src/data/products.ts`)

Delete all existing products. Rewrite with 8 categories and 38 items total:

| Category | Key | Label | Items |
|---|---|---|---|
| `wpc-fluted` | WPC Fluted Wall Panel | Ripados WPC | 6 colors (160x2800x24mm) |
| `pvc-corner` | PVC Corner | Cantoneiras PVC | 6 colors matching WPC (2800x25x25mm) |
| `bamboo-carbon` | Bamboo Carbon | Bamboo Carbon | 4 colors (1220x2800x8mm) |
| `pvc-ceiling` | PVC Ceiling / Forro | Forro PVC | 1 color - Nogueira (300x2800x8mm) |
| `fluted-panel` | Fluted Wall Panel | Fluted Premium | 6 items, 3 sub-types (150x15mm, 130x8mm, 150x15mm) |
| `mental-line` | Mental Line | Perfis Mental Line | 6 items: 2 mold sizes x 3 colors (3000x8mm) |
| `wpc-outdoor` | WPC Outdoors | WPC Externo | 4 items: 2 panels + 2 corner trims |
| `clips` | Clips | Clips de Fixação | 2 items |

Update `categoryLabels`, `ProductCategory` type, and filter array in `CatalogSection.tsx`.

## Phase 2: Generate Product Images (~38 images)

Use AI image generation (Nano banana / gemini-2.5-flash-image) to create professional catalog photos for each product following the spec:
- White background, piece tilted 15-20°, 3/4 perspective showing front + thickness
- Soft shadow, studio lighting
- Different textures per type (fluted grooves, smooth bamboo, PVC slats, metal profiles, L-shape corners)

Save to `public/images/produtos/[CODE].jpg` using sanitized product codes.

**This will require ~38 individual AI image generation calls** via an edge function, which is not feasible in a single pass. Instead, I'll generate images in batches, prioritizing the most visible categories first.

## Phase 3: Update Piece Calculator (`src/lib/pieceCalculator.ts`)

Update `PIECE_AREAS` map with new product codes:
- Add PVC Corner entries (not area-based but linear)
- Add Mental Line entries (linear, not area)  
- Add WPC Outdoor corner trims (51x2900mm)
- Update Forro PVC code from `LTM88676-forro` to `LTM 88676` (same product, different code format)
- Add clips (no area calculation needed)

Update profile suggestion logic to reference new Mental Line codes (small/large variants).

## Phase 4: Replace Gallery Data (`src/data/rooms.ts`)

Delete all existing room scenes. Create ~56 new entries matching the spec:
- 29 residential scenes (Sala, Quarto, Jantar, Cozinha, Banheiro, TV, Varanda, Gourmet)
- 27 commercial scenes (Escritório, Recepção, Clínica, Reuniões, Copa, Lounge, Loja, Restaurante, Hotel, Barbearia, Fachada, Academia)

Update `roomTypes` to include all 19 room types specified.

Add `roomCategory` field (already exists in the interface) for residencial/comercial filtering.

Generate ~56 room scene images via AI image generation, stored in `public/images/`.

## Phase 5: Update Catalog Section (`src/components/CatalogSection.tsx`)

- Update filter buttons to match 8 new categories
- Keep existing card layout but adjust image height to 250px as specified
- Ensure product code sanitization works for new codes

## Phase 6: Update Gallery Tab (`src/components/GalleryTab.tsx`)

- Keep parallax hover effect
- Keep badge with product name + room name
- Update room type filters to show all 19 types
- Keep residencial/comercial top-level filter

## Phase 7: Update Product Modal (`src/components/ProductModal.tsx`)

- Show matching gallery scene if available (ambiente renderizado)
- Keep WhatsApp button
- Add finish type ("Ripado", "Liso", "Texturizado") to modal info

## Phase 8: Keep Untouched

- AI Simulator tab (Simule Seu Ambiente) - only update product references
- Calculadora de peças - only update piece area data
- Watermark system
- All UI components, animations, parallax effects

---

## Technical Notes

- **Image generation constraint**: ~94 images total (38 products + 56 scenes). Each requires an AI call. This will be done in batches across multiple implementation steps.
- **Product codes with spaces**: Need consistent sanitization for file paths (e.g., `LTM 88696` → `LTM88696.jpg`)
- **The `PortfolioSection` component** exists but is not used in `Index.tsx` - the gallery lives inside `SimulatorSection > GalleryTab`. No changes needed to PortfolioSection unless it's used elsewhere.
- **Edge function for image gen**: Will use the existing Lovable AI gateway with `google/gemini-2.5-flash-image` model.

---

## Execution Order

1. Rewrite `src/data/products.ts` with all 38 products
2. Update `src/components/CatalogSection.tsx` filters
3. Update `src/lib/pieceCalculator.ts` with new codes
4. Generate product images (batches of ~10)
5. Rewrite `src/data/rooms.ts` with 56 scenes
6. Generate gallery images (batches of ~10)
7. Update `GalleryTab.tsx` filters
8. Update `ProductModal.tsx` to show scene if available

