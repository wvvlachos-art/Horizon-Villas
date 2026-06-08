# Horizon Villas — Astro site

Astro + TypeScript port of the static `index.html` / `accommodations.html` /
`house.html` mockups. Static-first, Netlify-ready. See `../CLAUDE_NOTES.md` for
full product context.

## Run

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # → dist/
npm run preview    # serve the production build locally
```

> **Note (this machine):** npm hit a TLS `UNABLE_TO_VERIFY_LEAF_SIGNATURE`
> error against the registry. Prefix commands with `NODE_OPTIONS="--use-system-ca"`
> (e.g. `NODE_OPTIONS="--use-system-ca" npm install`) to trust the system CA store.

## Structure

```
src/
  layouts/Base.astro        head, fonts, global CSS, mobile CTA, reveal script
  components/
    Nav.astro               header — default + "house" (back-link) variants
    Footer.astro            footer — optional email + anchor id
    HouseCard.astro         compact card (landing preview + cross-sell)
    HouseRow.astro          accommodations listing row
    BookingBar.astro        landing search bar      ← LODGIFY MOUNT
    StickyBookingBar.astro  per-house booking bar    ← LODGIFY MOUNT
    SplitSection.astro      image + copy band (pool, Tinos)
    MobileCTA.astro         mobile sticky CTA
  data/
    houses.ts               the six houses (placeholder content)
    site.ts                 phone / email / WhatsApp / location
  pages/
    index.astro             landing
    accommodations.astro    all six houses
    house.astro             house detail template (Villa Zoe)
  styles/styles.css         global design system — copied verbatim, brand
                            tokens and structure preserved exactly
```

`styles.css` is imported once in `Base.astro` so it applies globally; the brand
tokens (`:root` CSS vars) and class structure are unchanged from the original.

## Not wired yet (deliberate mount points)

Search for these markers — all left as placeholders per the brief:

- **Lodgify** — `BookingBar.astro`, `StickyBookingBar.astro` (`LODGIFY MOUNT POINT`)
- **Sanity** — `src/data/houses.ts` is the placeholder content the CMS query replaces
- **Analytics / SEO** — `Base.astro` head (`ANALYTICS MOUNT POINT`, `SEO MOUNT POINT`)
- **Interactions** — nav drawer (`Nav.astro`), amenities "show all" + capacity
  filter (`house.astro` / `accommodations.astro`), and the `.photo` →
  `<picture>` swap (all marked with `TODO`)

## Deploy

`netlify.toml` builds with `npm run build` and publishes `dist/`. Add as a new
Netlify site and connect the Git repo for auto-deploy.
