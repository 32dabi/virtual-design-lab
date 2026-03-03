

# Fix: Blank/White Screen on Refresh/Reload

## Diagnosis

The white screen flash occurs because the page's dark background (`hsl(30 40% 5%)`) is applied via Tailwind CSS, which loads asynchronously. During refresh or HMR (chat-triggered rebuilds), there's a brief moment where CSS hasn't loaded yet and the browser shows the default white background.

## Solution

Add an inline `style` attribute to the `<body>` and `<html>` tags in `index.html` with the dark background color. This ensures the dark background is applied immediately, even before CSS/JS loads, eliminating the white flash.

### Changes

**`index.html`** — Add inline dark background styles:
- `<html>` tag: add `style="background-color: #110e09;"` (the equivalent of `hsl(30 40% 5%)`)
- `<body>` tag: add `style="background-color: #110e09; color: #e0d8c8;"` (background + foreground)

This is a single-file, 2-line change that prevents the flash without affecting any other behavior.

