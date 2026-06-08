// The six houses. Single source of truth for the index preview, the
// accommodations listing (description / highlights / amenities / facts) and
// the cross-sell cards.
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
  /** Floor area, e.g. "70 m²". */
  size: string;
  /** Nightly "from" price in euros. */
  priceFrom: number;
  /** One-line summary (landing preview / cross-sell cards). */
  blurb: string;
  /** Full listing description (accommodations "Description" tab). */
  description: string;
  /** Bullet list for the "Highlights" tab. */
  highlights: string[];
  /** Bullet list for the "Amenities" tab. Defaults to {@link standardAmenities}. */
  amenities?: string[];
  /** Inline background override for the .photo placeholder, or undefined for the default. */
  photoBg?: string;
}

// Every house ships with the same base amenities, so they live in one place
// and each house can override via `amenities` if it ever diverges.
export const standardAmenities: string[] = [
  'Fast wifi',
  'Air-conditioning',
  'Full kitchen',
  'Coffee machine',
  'Smart TV',
  'Free parking',
  'Daily cleaning',
  'Fresh linens',
  'Welcome basket',
  'Hairdryer',
  'Outdoor dining table',
];

export const houses: House[] = [
  {
    slug: 'house',
    name: 'Villa Zoe',
    sleeps: 4,
    view: 'Sea view',
    size: '70 m²',
    priceFrom: 180,
    blurb: 'The brightest of the six, opening straight onto the shared pool terrace with the sea in the windows.',
    description:
      'The brightest of the six, Villa Zoe opens straight onto the shared pool terrace with the Aegean in its windows — two bedrooms, a full kitchen and a shaded table for slow dinners.',
    highlights: [
      'Steps from the shared pool',
      'Sea views from both bedrooms',
      'Full kitchen & outdoor dining',
      'Shaded private terrace',
      'Two double bedrooms',
    ],
  },
  {
    slug: 'house',
    name: 'Villa Diana',
    sleeps: 6,
    view: 'Garden view',
    size: '95 m²',
    priceFrom: 240,
    blurb: 'The largest of the collection — a separate living room and room for a whole family, steps from the pool.',
    description:
      'The largest of the collection — a separate living room and room for a whole family, a few steps through the garden to the pool.',
    highlights: [
      'Separate living room',
      'Sleeps up to six',
      'Two bathrooms',
      'Garden-facing terrace',
      'Easy, family-friendly layout',
      'Steps from the pool',
    ],
    photoBg: '#DFD0B3',
  },
  {
    slug: 'house',
    name: 'Villa Regina',
    sleeps: 4,
    view: 'Sea view',
    size: '72 m²',
    priceFrom: 190,
    blurb: 'A calm corner house with sea views and a shaded terrace for slow mornings.',
    description:
      'A calm corner house with open sea views and a shaded terrace made for slow mornings and long, late afternoons.',
    highlights: [
      'Quiet corner position',
      'Sea-view terrace',
      'Two bedrooms',
      'Morning shade, afternoon sun',
      'Close to the pool',
    ],
    photoBg: '#DACAAD',
  },
  {
    slug: 'house',
    name: 'Villa Celine',
    sleeps: 4,
    view: 'Garden view',
    size: '68 m²',
    priceFrom: 185,
    blurb: 'Tucked into the garden, quiet and green, a few steps from the water.',
    description:
      'Tucked into the garden, quiet and green, with extra privacy and just a few steps down to the water.',
    highlights: [
      'Sheltered garden setting',
      'Extra privacy',
      'Two bedrooms',
      'Shaded outdoor seating',
      'A short walk to the pool',
    ],
    photoBg: '#D5C3A2',
  },
  {
    slug: 'house',
    name: 'Villa Roxana',
    sleeps: 2,
    view: 'Sea view',
    size: '55 m²',
    priceFrom: 160,
    blurb: 'A snug one-bedroom for two, with the best of the light in the afternoon.',
    description:
      'A snug one-bedroom for two with the best of the late-afternoon light — the pick of the houses for a couple.',
    highlights: [
      'Ideal for couples',
      'Best afternoon light',
      'Open sea view',
      'One double bedroom',
      'Compact and private',
    ],
    photoBg: '#E0D0B6',
  },
  {
    slug: 'house',
    name: 'Villa Astra',
    sleeps: 6,
    view: 'Sea view',
    size: '98 m²',
    priceFrom: 250,
    blurb: 'Top of the hillside, the widest views of the lot and space for six.',
    description:
      'At the top of the hillside, Villa Astra takes in the widest views of the lot, with room for six and a generous terrace for sunset.',
    highlights: [
      'Highest position on the hill',
      'Widest sea views',
      'Sleeps up to six',
      'Two bathrooms',
      'Large sunset terrace',
      'Steps from the pool',
    ],
    photoBg: '#D2BF9F',
  },
];
