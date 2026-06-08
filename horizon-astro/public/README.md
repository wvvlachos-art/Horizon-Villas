# public/ — static assets served from the site root

Drop the logo files here and they activate automatically (referenced as `/<file>`):

| File | Used for | Notes |
|------|----------|-------|
| `logo.svg` | **Nav wordmark** (every page) | The amber lockup. Reads on the cream header *and* over the hero photo, so one file covers all pages. A horizontal lockup or wordmark-only version suits the nav bar best. SVG preferred; tall PNG works. Until this exists, the nav shows the text "HORIZON / VILLAS" fallback. |
| `favicon.svg` | **Browser-tab favicon** | Just the icon mark (house + sun), roughly square. |
| `og-image.png` | **Social share preview** | 1200×630. Logo on cream, or a hero photo with the logo — what shows when the site is shared on WhatsApp / socials. |

Optional later: `favicon.ico` (legacy), `apple-touch-icon.png` (180×180), `logo-light.svg` (white variant, if we ever want the logo to invert on dark backgrounds).

No build step needed — Astro copies `public/` to the site root as-is.
