// The six houses. Single source of truth for the index preview, the
// accommodations listing and the cross-sell cards.
//
// NOTE: this is hard-coded placeholder content ported from the static HTML.
// When Sanity is wired in (CLAUDE_NOTES §2) this array gets replaced by a
// content-collection / CMS query — the component props below are the contract.

export interface House {
  /** URL slug. All houses currently point at the single /house template. */
  slug: string;
  name: string;
  sleeps: number;
  view: 'Sea view' | 'Garden view';
  /** Floor area, e.g. "70m²". */
  size: string;
  /** Nightly "from" price in euros. */
  priceFrom: number;
  /** One-line listing description. */
  blurb: string;
  /** Inline background override for the .photo placeholder, or undefined for the default beige. */
  photoBg?: string;
}

export const houses: House[] = [
  {
    slug: 'house',
    name: 'Villa Zoe',
    sleeps: 4,
    view: 'Sea view',
    size: '70m²',
    priceFrom: 180,
    blurb: 'The brightest of the six, opening straight onto the shared pool terrace with the sea in the windows.',
  },
  {
    slug: 'house',
    name: 'Villa Diana',
    sleeps: 6,
    view: 'Garden view',
    size: '95m²',
    priceFrom: 240,
    blurb: 'The largest of the collection — a separate living room and room for a whole family, steps from the pool.',
    photoBg: '#DFD0B3',
  },
  {
    slug: 'house',
    name: 'Villa Regina',
    sleeps: 4,
    view: 'Sea view',
    size: '72m²',
    priceFrom: 190,
    blurb: 'A calm corner house with sea views and a shaded terrace for slow mornings.',
    photoBg: '#DACAAD',
  },
  {
    slug: 'house',
    name: 'Villa Celine',
    sleeps: 4,
    view: 'Garden view',
    size: '68m²',
    priceFrom: 185,
    blurb: 'Tucked into the garden, quiet and green, a few steps from the water.',
    photoBg: '#D5C3A2',
  },
  {
    slug: 'house',
    name: 'Villa Roxana',
    sleeps: 2,
    view: 'Sea view',
    size: '55m²',
    priceFrom: 160,
    blurb: 'A snug one-bedroom for two, with the best of the light in the afternoon.',
    photoBg: '#E0D0B6',
  },
  {
    slug: 'house',
    name: 'Villa Astra',
    sleeps: 6,
    view: 'Sea view',
    size: '98m²',
    priceFrom: 250,
    blurb: 'Top of the hillside, the widest views of the lot and space for six.',
    photoBg: '#D2BF9F',
  },
];
