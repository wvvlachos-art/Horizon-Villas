// Offers content — seasonal rates & direct-booking deals.
//
// ===== SANITY MOUNT POINT (CLAUDE_NOTES §2) =====
// Offers are exactly the kind of small, frequently-edited content Sanity owns.
// Later: replace `offers` with a Sanity query (an `offer` document type). The
// offers page maps over this array — only the data source needs to change.

export interface Offer {
  /** Anchor id (e.g. /offers#autumn). */
  id: string;
  /** Short label, e.g. "Seasonal" / "Long stays". */
  tag: string;
  title: string;
  /** Display window, e.g. "1–20 October 2026". */
  dates: string;
  description: string;
  /** Inline background tint for the placeholder .photo (until real imagery). */
  photoBg?: string;
}

export const offers: Offer[] = [
  {
    id: 'autumn',
    tag: 'Seasonal',
    title: 'Autumn on Tinos',
    dates: '1–20 October 2026',
    description:
      "Thirty per cent off our standard rates for the island's quietest, warmest weeks — soft light, empty beaches and the sea at its best.",
  },
  {
    id: 'long-week',
    tag: 'Long stays',
    title: 'Stay seven, pay six',
    dates: 'Any week, year-round',
    description:
      'Settle in. Book seven nights in any house and the seventh is on us — the island rewards the unhurried.',
    photoBg: '#DFD0B3',
  },
  {
    id: 'spring',
    tag: 'Seasonal',
    title: 'Early spring rates',
    dates: 'April – May 2026',
    description:
      'Wildflowers, footpaths and long lunches before the season turns — reduced rates across all six houses.',
    photoBg: '#DACAAD',
  },
];
