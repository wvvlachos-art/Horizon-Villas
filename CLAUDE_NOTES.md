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
Palette (CSS vars in `styles.css`):
- `--cream #F7F0E6` page base (sampled from logo bg)
- `--paper #FFFDF9` cards
- `--beige #EDE1CB` alternating bands · `--beige-deep #E4D6BD` photo placeholders
- `--amber #C8843C` titles/eyebrows/accents (sampled from logo line-art)
- `--terracotta #AE6A28` primary CTA fill (deeper, for legible cream text)
- `--brown #3A3022` dark sections/footer · `--ink #4A3F30` headings/dark text · `--text #5A4F3E` body · `--muted #8A7C66`

Type: **Display = Zilla Slab** (stand-in echoing the slab-serif wordmark — *TODO: identify/match the logo's exact font*). **Body = Mulish.** Loaded via Google Fonts.
Register: restrained, photography-led (chrome near-invisible, photos carry colour), elegant; letter-spaced uppercase only on eyebrows/nav/buttons; sentence-case slab headings. CTAs confident, never aggressive (no countdowns/scarcity/pop-ups).

## 4. Pages (this repo = the exact starting point)
- `styles.css` — shared design system (tokens + components). Port tokens → Astro/global CSS; components → Astro components.
- `index.html` — **Landing.** Desktop = **narrative-first** (establish then convert): hero → the place → the pool (split) → houses preview (→ index) → Tinos (split) → included → book direct → reviews → plan your stay (booking) → footer. Mobile = **conversion-first**: surface dates/houses/prices fast; the `.mobile-cta` sticky bar handles this for now. *TODO: implement the genuinely different mobile section ORDER (not just reflow) in Astro — keep core content in both for mobile-first indexing.*
- `accommodations.html` — **All-houses index.** Canaves listing pattern: uniform rows (photo-left), name, Description/Highlights/Amenities tabs label, one-line desc, facts (Sleeps/View/Size/From), View house + Check dates. Capacity filter (All/Couples/Families) is an adaptation of Canaves's tier-tabs — optional.
- `house.html` — **House detail template** (Villa Zoe). Canaves suite pattern + William's Nautica subpage conventions: gallery hero + name, sticky per-house booking bar, description, facts strip, highlights, amenities (icons + "show all" dropdown — wire up the toggle), gallery, cross-sell of other houses, close.
- **Still to design/build:** Tinos/Location page (links to guest guide `horizonvillasguide.netlify.app`), Offers page (e.g. the Fall pre-planned 30% Oct 1–20, as an indexable offer page), Contact.

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
