# CLAUDE_NOTES.md — Horizon Villas website

Full technical context for Claude / Claude Code. Pair file: `WILLIAM_NOTES.md` (plain-English).
**Convention:** William writes zero code; Claude is the typist. Claude Code (on the Mac) does filesystem + deploy. Keep both notes files updated when something meaningful changes.

---

## 1. What this is
A rebuild of the Horizon Villas marketing site (`horizonvillastinos.com`), currently a generic Hotelwize template. Horizon = **six weekly-rental houses on one hillside above Agios Ioannis, Tinos**, around **one shared pool**, family-run (Dinos on-site). Names: Zoe, Diana, Regina, Celine, Roxana, Astra.

**Positioning:** premium, NOT luxury. Warm, honest, restrained. Service reality = shared pool + daily cleaning (no per-villa pools/spa/restaurant). Promise must match reality.
**Primary goal:** drive **direct bookings**.
**Model:** estate-first — the *place* is the brand, the six houses are variations within it (avoid a marketplace/listing feel).

## 2. Stack
- **Domain/DNS:** Porkbun (planned) — *CONFIRM where the domain is actually registered first; may be elsewhere/Hotelwize.*
- **Framework:** Astro (static-first). Deploy: **Netlify** (William already has an account; add as a new site). Auto-deploy from the Git repo.
- **CMS:** **Sanity** (hosted Studio, login, field-level i18n, free tier). Content edits → webhook → Netlify rebuild (~1–2 min, not instant; site is static). Scope: small updates only (offer, displayed copy/prices, reviews, seasonal posts). Structural/design changes go through Claude Code.
- **Booking:** **Lodgify** (existing account — `checkout.lodgify.com/horizonvillas`). Two embeds:
  - **Search box** widget → landing `#book` ("Plan your stay") and mobile sticky CTA. Picks dates across all six.
  - **Booking box** widget → each house detail `#book` (sticky bar).
  - Checkout is Lodgify-hosted. *TODO: confirm plan allows white-label to `book.horizonvillastinos.com`.*
  - Channel manager keeps Airbnb/Vrbo/Booking.com in sync.
- **Contact:** WhatsApp click-to-chat → `https://wa.me/306907777971` (floating/sticky + inline). Repo placeholders use this number.
- **Analytics:** Umami Cloud (primary, cookieless, no consent banner; custom events for *check-availability* + *whatsapp* clicks; country/source for the A/B audience split) · Google Search Console (SEO; verify via Porkbun DNS) · Microsoft Clarity (heatmaps). All snippet-based — no SQL/DB.

## 3. Brand (locked, from the logo)
**Logo integration:** the logo (amber line-art mark — house + sun + sea — over the slab-serif `HORIZON / VILLAS` lockup) is wired into the **nav** and the **favicon**. The asset is `public/logo.png` (Astro) / root `logo.png` (reference htmls) — a **square vertical lockup on a solid cream background** (the `HORIZON VILLAS-LOGO.png` William supplied; also still in `horizon-astro/` root, can be deleted). Because the background is cream, the logo only shows on the **cream navs** (index/accommodations/blog/article), where it blends seamlessly; the **house over-hero nav keeps the light text wordmark** (`{!isHouse}` in `Nav.astro`) since a cream box would sit over the hero photo. The text wordmark (`.brand .word/.sub`) is the permanent fallback — the `<img class="brand-logo">` is `display:none` until it actually loads (`onload`→`.loaded`, `onerror`→remove), and only then `:has(.brand-logo.loaded)` hides the text, so **no broken-image flash**. Favicon currently points at `logo.png` too.
  - **TODO (better logo fit):** ask William for a **transparent-background** version (so it can go on the dark house hero + footer) and ideally a **horizontal lockup / wordmark-only** crop (the square has heavy padding, so it reads small in the horizontal nav bar) + a tight **mark-only favicon** + a real 1200×630 **`og-image.png`** (the OG tag still points at the not-yet-added `public/og-image.png`).


Palette (CSS vars in `styles.css`):
- `--cream #F7F0E6` page base (sampled from logo bg)
- `--paper #FFFDF9` cards
- `--beige #EDE1CB` alternating bands · `--beige-deep #E4D6BD` photo placeholders
- `--amber #C8843C` titles/eyebrows/accents (sampled from logo line-art)
- `--terracotta #AE6A28` primary CTA fill (deeper, for legible cream text)
- `--brown #3A3022` dark sections/footer · `--ink #4A3F30` headings/dark text · `--text #5A4F3E` body · `--muted #8A7C66`

Type: **Display = Zilla Slab** (stand-in echoing the slab-serif wordmark — *TODO: identify/match the logo's exact font*). **Body = Mulish.** Loaded via Google Fonts.
Register: restrained, photography-led (chrome near-invisible, photos carry colour), elegant; letter-spaced uppercase only on eyebrows/nav/buttons; sentence-case slab headings. CTAs confident, never aggressive (no countdowns/scarcity/pop-ups).

**v2 proportional pass (current `styles.css`):** systemic recalibration of the whole design system to Canaves-grade, image-led scale — the v1 build was under-scaled and floated text in empty columns. Imagery is dominant everywhere: immersive hero (`min-height:88vh`) and house-hero (`70vh`), image-dominant splits (`1.3:1`) with controlled `min-height` so copy never floats (copy capped to a tidy ~480px block), full 3:2 photos on preview/cross-sell cards, larger 4:3 gallery tiles, clustered (not sprawled) detail facts strip. Larger fluid type scale (`clamp()` throughout), `--maxw` 1180→1280.

**Listing rows (`.house-row`) — Canaves 3-column, interactive:** matched to the Canaves Oia accommodations listing — a CSS grid of `image (~40%, 3:2) · body · right-hand facts column`, collapsing to one column under 900px. The body holds title → `.r-tabs` (Description / Highlights / Amenities buttons) → three `.r-panel`s (only `.active` shown) → `.r-cta` (View house / Check dates). A small per-row script toggles the active tab + panel within that row (ported to an `is:inline` script on `accommodations.astro`). Facts live in the right `.r-facts` column as stacked label/`<b>`value pairs (price stays amber). Each row is **data-driven** from `src/data/houses.ts` (`description`, `highlights[]`, shared `standardAmenities`, facts) via `HouseRow.astro`. Note: the v2 `styles.css` reference carried the new listing *markup* (`accommodations.html`) but not the matching `.r-*` CSS — those rules were authored to fit the markup + Canaves pattern. Astro `src/styles/styles.css` is kept byte-for-byte in sync with the root `styles.css`.

Refined against the live Canaves accommodations index (canaves.com/.../accommodations/): that page has **no hero** — a minimal header, then a centred eyebrow/heading/intro + filter tabs, then the rows — so our page keeps the centred `.section tight` header (no hero added). Each `.house-row .photo` carries a Canaves-style **carousel affordance** (chevron `.arrow`s revealed on hover + a `.count` "1 / 5" badge — placeholder, no slider wired yet). To read less "centred" on wide screens the rows use a wider `.container.listing` (max-width 1400 vs the 1280 page header), the photo column is enlarged (grid `1.9fr 1.2fr 0.5fr` → photo ~53%, nudged left by the wider container) with a wider middle column for longer text lines, and the right-rail facts (`.r-facts`) sit **label + value on one line** (`justify-content: space-between`) rather than value-under-label.

## 4. Pages (this repo = the exact starting point)
- `styles.css` — shared design system (tokens + components). Port tokens → Astro/global CSS; components → Astro components.
- `index.html` — **Landing.** Desktop = **narrative-first** (establish then convert): hero → the place → the pool (split) → houses preview (→ index) → Tinos (split) → included → book direct → reviews → plan your stay (booking) → footer. Mobile = **conversion-first**: surface dates/houses/prices fast; the `.mobile-cta` sticky bar handles this for now. *TODO: implement the genuinely different mobile section ORDER (not just reflow) in Astro — keep core content in both for mobile-first indexing.*
- `accommodations.html` — **All-houses index.** Canaves listing pattern: uniform rows (photo-left), name, Description/Highlights/Amenities tabs label, one-line desc, facts (Sleeps/View/Size/From), View house + Check dates. Capacity filter (All/Couples/Families) is an adaptation of Canaves's tier-tabs — optional.
- `house.html` — **House detail template** (Villa Zoe), reworked to the Canaves *suite-detail* design language (ref: canaves.com junior-suite). Flow: **full-screen hero gallery** with the nav transparent over it and solidifying on scroll (`.site-header.over-hero` → `.solid`, toggled by an inline scroll script) → **floating booking card** (`.book-float`, overlaps the hero bottom; Lodgify booking-box mount) → **description + facts row** (`.detail-intro`) → **"What's included"** as grouped, labelled bullet lists beside an interior photo (`.detail-amen` / `.grp` / `.grp-title`, Canaves's BED & BATH / SERVICES & AMENITIES pattern) → **a note** (`.note-block`, the "each house is a little different — message us" disclaimer) → cross-sell → close. The old single icon-grid amenities + standalone gallery were dropped. As with the v2 listing, the reworked `house.html` reference carried the new *markup* but **not** the matching `.over-hero`/`.book-float`/`.detail-intro`/`.detail-amen`/`.grp`/`.note-block` CSS — those rules were authored to fit the markup + Canaves pattern within the brand tokens, then synced to `house.astro` (Nav `variant="house"` now renders the over-hero header + navlinks).
- **Landing tweaks:** the nav/"toolbar" was enlarged (bigger wordmark, links, padding) globally; a **"The local area"** section (`.local` guide grid — beach / eat & shop / Tinos Town & port / villages & trails) was added right after the Tinos "The island" split.
- **Landing — houses carousel, trust badges, bigger booking:** the 3-card houses preview was replaced by a **swappable carousel** (`.house-carousel` / `.hc-slide` — large 3:2 photo + name + facts + description + price + View house, arrows + dots, vanilla JS; data-driven from all six houses in Astro). Hero gained a left-rail of **trust badges** (`.hero-trust` / `.trust-badge` — Booking.com / Airbnb / Google scores, placeholder values, hidden on mobile; wire to live ratings later). The bottom "Plan your stay" booking block was enlarged (`.bookbar` wider + raised + bigger fields/CTA) and given a subtitle so it no longer reads as smaller than the sections above.
- **Landing proportional rebalance (vs Canaves homepage):** the page felt under-scaled — a big hero over small headings/floating text. Fixes: centred section headings bumped to `clamp(28px,3vw,40px)` and split headings to `clamp(30px,3.2vw,44px)` for a more confident hierarchy; `.lead` enlarged (`clamp(21px,2.2vw,27px)`, max-width 660); the "The place" intro got a real heading ("The quiet side of the Cyclades") so its paragraph no longer floats alone in a tall section; the sparse "Book direct" band set to `.tight`. Whitespace/section padding (`clamp(64–108px)`) kept — the issue was content scale, not spacing.
- `blog.html` / `article.html` — **Blog**, editorial, Belmond-inspired (belmond.com/stories) adapted to the brand. Index = centred header → topic filter (All / Island life / Food & drink / Things to do / Seasons, JS show-hide by `data-category`) → photography-led `.journal-grid` of `.acard`s (portrait image → category eyebrow → title → read time). Article = centred `.article-head` (eyebrow/title/byline-date-readtime) → 16:9 hero → narrow `.article-body` reading measure (standfirst, `h2`, `blockquote` pull-quotes, inline `figure`s, lists) → "You might also enjoy" related grid. In Astro it is **data-driven & Sanity-ready**: `src/data/articles.ts` (the `Article` + `Block` union is the CMS contract — `SANITY MOUNT POINT` marked), rendered by `pages/blog/index.astro` + `pages/blog/[slug].astro` (`getStaticPaths`, route `/blog`) + `components/ArticleCard.astro`; the `Block` renderer maps 1:1 to what a Sanity Portable-Text serializer will target. (CSS class names stay `.journal-*` internally — only the user-facing name/route is "Blog".) Linked from the nav as a **deliberately low-key `.nav-aux`** link on the right (next to EN·FR), *not* in the centred navlinks — kept understated while the blog is sparse for the first few months.
- **Still to design/build:** standalone Tinos/Location page (links to guest guide `horizonvillasguide.netlify.app`; the landing only teases it), Offers page (e.g. the Fall pre-planned 30% Oct 1–20, as an indexable offer page), Contact.

Inspiration reference: **Canaves Oia Suites** (canaves.com) — take the restraint, serif, structured facts, accommodations/suite patterns; LEAVE the luxury voice/amenities.

## 5. i18n
Launch **EN + FR**; **DE** is phase 2 (German-speaking Swiss are the largest reliable Swiss segment, + Germany). **EL** parked for peak/brand only. Use hreflang. Reliable off-season markets: **Swiss, French, UK**, plus a long tail.

## 6. SEO (shoulder season is the focus: Apr–early Jun, mid-Sep–Oct)
Off-season target is **international / Western European**, NOT Greek (Greek is weak off-season). Two jobs:
- **A — broad/inspiration ("scrollers"):** "quiet Greek islands / Cyclades without crowds / anti-Mykonos" + Pinterest/Instagram + press roundups.
- **B — W. European drill-down:** seasonal pages ("Tinos in spring/autumn", weather, ferries, what's open), activity content (hiking/food/couples/families-off-peak), UK half-term windows align with the target dates. FAQ + `VacationRental`/`LodgingBusiness` schema. Publish ahead of the booking window.

## 7. Build notes / TODO
- Port these files to Astro (layout + components + content collections; Sanity for editable bits).
- Wire Lodgify embeds at the `#book` mounts; wire amenities "show all" toggle; nav menu drawer.
- Swap every `.photo` placeholder for `<picture>` with art-directed crops (portrait mobile hero).
- Add Umami/Clarity snippets in the base layout; GSC DNS verify.
- **Open decisions:** domain registrar; Lodgify white-label/plan; German go/no-go (after Umami shows off-season traffic); logo font identification; real villa photography (still needed to grade placeholders).
- Build happens on the Mac (Claude Code 2.1). Accounts can be created from any machine.
