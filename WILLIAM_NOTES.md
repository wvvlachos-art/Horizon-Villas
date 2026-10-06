# WILLIAM_NOTES.md — Horizon Villas website (plain English)

A plain-language companion to `CLAUDE_NOTES.md`. This is the "what and why," no code.

## What we're building
A new Horizon Villas website to replace the old templated one — built properly and custom, designed to **win direct bookings** (so you keep the commission the OTAs take). The whole idea: present Horizon as **one place** — six houses around one shared pool, run by the family — not as six separate listings.

## The look
Pulled straight from your logo: a warm **cream** background and a single **amber/orange** for titles, with a **slab-serif** heading font that echoes the wordmark. Calm, premium, and photography-led — the design stays quiet so your photos do the work. It reads premium, not flashy-luxury, which keeps the promise honest to what guests actually get (shared pool, daily cleaning, a real family on site).

## The pages (in this folder, as real web pages)
- **Landing (`index.html`)** — on a computer it tells the story first (the place, the pool, the houses, Tinos) then invites booking; on a phone it gets you to "what can I book and for how much" fast, with a "Check availability" bar always at the bottom.
- **The houses (`accommodations.html`)** — all six on one page, shown identically so they feel like one family, with a simple "couples / families" filter.
- **A house page (`house.html`)** — the template for each villa: big photo gallery, the booking bar, the facts, what's included, more photos, and a nudge to the other houses.
- Still to come: a proper **Tinos** page (linking your guest guide), an **Offers** page, and **Contact**.

## How booking works
Your existing **Lodgify** reservation engine powers it. As of 6 Oct 2026 the booking works in two ways. The main **Check availability** bars (home page top and bottom, About, Pool, Tinos) are Lodgify's own search widget in your yellow: pick dates and guests and the results open on your Lodgify booking site at **horizonvillastinos.net**, in a new tab, showing the houses free for those nights with prices. On each **house page**, the bar is ours but looks the same: press Check availability, a calendar fades in, pick your dates and you land on that house's reservation page at the dates step, with the dates filled in and the price showing, and you press Continue from there. Guests are chosen on that step (Lodgify can't take dates and a guest count together without skipping ahead to the contact form). If you'd rather not pick dates, "Continue without dates" takes you to the same page with an empty calendar. On the houses list, "Check dates" also goes straight to that house's reservation page. Lodgify keeps your Airbnb/Booking.com calendars in sync, as before. **WhatsApp** stays one tap away everywhere for quick questions, but no Check availability button opens WhatsApp any more.

One thing to know: the engine runs on Lodgify's servers (that's where the calendar, prices and card payments live), so it can't literally move to Netlify — no booking system can run on a static host. Because the main search goes through horizonvillastinos.net, that site has to stay live; we should not redirect it to the new site.



## Languages
We launch in **English + French**. **German** comes next (it covers the big German-speaking Swiss share plus Germany). Greek stays for the summer/peak crowd but isn't the off-season focus — off-season is about Western European visitors (your reliable Swiss, French and UK guests).

## What I still need from you
1. **A few real villa photos** — the hero pool shot, a house exterior, an interior, the view. They replace every "[ photo ]" placeholder and let me confirm the colours against your real light.
2. **Where the domain is registered** (so we know whether to move it to Porkbun or just point it).
3. **Your Lodgify plan** — whether it lets us brand the checkout page (`book.horizonvillastinos.com`), and a quick check that the subscription is active so payments go through.
4. **horizonvillastinos.net stays live** — it is now the booking site your guests land on, so we keep it rather than redirecting it to the new site.
5. A later **yes/no on German**, once we can see the off-season traffic.

## How we work from here
You're on the Mac when we build — **Claude Code** does the typing and puts it live on Netlify; I plan, design, and write. **These files are the exact starting point**: the build begins from them, not from scratch. Nothing's instant on a live edit (the site rebuilds in a minute or two), but small text/offer/photo changes you'll be able to do yourself through Sanity once it's set up.
