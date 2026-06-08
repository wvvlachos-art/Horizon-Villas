// Journal (blog) content — editorial stories, Belmond-inspired, adapted to the
// Horizon identity. Index + article pages are driven entirely off this array.
//
// ===== SANITY MOUNT POINT (CLAUDE_NOTES §2) =====
// This placeholder array is the contract for the future Sanity-backed journal.
// Later: replace `articles` with a Sanity query (e.g. a `post` document type),
// and map Sanity Portable Text blocks → the `Block` union below in a small
// serializer (the article template already renders these block types). The
// page components should not need to change — only the data source.

/** A single block of article body content (mirrors a Portable-Text-style model). */
export type Block =
  | { type: 'standfirst'; text: string } // lead/intro paragraph (larger serif)
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string; cite?: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; label: string; bg?: string; caption?: string };

export interface Article {
  slug: string;
  title: string;
  /** Topic, also drives the index filter (e.g. "Island life"). */
  category: string;
  /** One-line summary (card + meta). */
  excerpt: string;
  author: string;
  /** Display date, e.g. "April 2026". Convert to a real date field in Sanity. */
  date: string;
  readMinutes: number;
  /** Inline background tint for the placeholder .photo (until real imagery). */
  photoBg?: string;
  body: Block[];
}

/** Topic filters shown on the index (the first, "All", clears the filter). */
export const categories = ['Island life', 'Food & drink', 'Things to do', 'Seasons'];

export const articles: Article[] = [
  {
    slug: 'tinos-in-spring',
    title: 'Tinos in spring, before the season turns',
    category: 'Seasons',
    excerpt: 'Wildflowers on the terraces, empty beaches and long lunches — the case for coming early.',
    author: 'The Horizon family',
    date: 'April 2026',
    readMinutes: 5,
    body: [
      { type: 'standfirst', text: 'There is a stretch of weeks — roughly mid-April to early June — when Tinos is at its most generous and least crowded. The hills are still green, the sea is warm enough by late May, and the tavernas are open but unhurried.' },
      { type: 'p', text: 'Spring is the island showing off quietly. The terraced fields above Agios Ioannis fill with wildflowers, the footpaths are soft underfoot, and the light has that clean, washed quality you only get before the heat settles in.' },
      { type: 'p', text: 'From the pool you can watch the weather move across the water for hours. Mornings are for coffee and a book; afternoons for the beach five minutes below; evenings for a slow dinner on the terrace as the hills go gold.' },
      { type: 'h2', text: 'What to do with a slow week' },
      { type: 'p', text: 'You do not need a plan. But if you want one: walk a different village each morning, swim in the afternoon, and let dinner take as long as it takes. The island rewards the unhurried.' },
      { type: 'list', items: ['Walk the marble villages of the interior', 'Swim at a different cove each day', 'Find the bakery in Pyrgos', 'Watch the sunset from the top of the hillside'] },
      { type: 'image', label: '[ wildflowers on the terraces ]', bg: '#D8C9AC', caption: 'The terraces above Agios Ioannis in late April.' },
      { type: 'quote', text: 'Come in spring once and you will stop thinking of August as the season.', cite: 'Dinos, on-site' },
      { type: 'p', text: 'If you are weighing dates, this is our honest recommendation: the shoulder weeks give you the best of the island and the best of the houses, without the crowds or the heat. Book direct and we will help you plan the rest.' },
    ],
  },
  {
    slug: 'a-day-at-agios-ioannis',
    title: 'A day at Agios Ioannis',
    category: 'Island life',
    excerpt: 'Morning swims, a long lunch, and the five-minute walk that makes the village ours.',
    author: 'The Horizon family',
    date: 'May 2026',
    readMinutes: 4,
    photoBg: '#DFD0B3',
    body: [
      { type: 'standfirst', text: 'Agios Ioannis is small on purpose. A cove, a handful of tavernas, a bakery, and the hillside of houses above it — close enough to walk everywhere, quiet enough to hear the sea.' },
      { type: 'p', text: 'The day usually starts at the pool, with coffee and not much else. By late morning the beach is the obvious move: it is a five-minute walk down, and rarely busy outside high summer.' },
      { type: 'h2', text: 'Lunch, and the rest of the afternoon' },
      { type: 'p', text: 'Lunch is long. There is no reason to rush it, and the tavernas would not let you anyway. The afternoon takes care of itself — a swim, a nap, the pool again as the light softens.' },
      { type: 'p', text: 'It is not a place that asks much of you. That is rather the point.' },
    ],
  },
  {
    slug: 'where-we-eat-on-tinos',
    title: 'Where we eat on Tinos',
    category: 'Food & drink',
    excerpt: 'The island has quietly become one of the best places to eat in the Cyclades. Here is where we go.',
    author: 'The Horizon family',
    date: 'June 2026',
    readMinutes: 6,
    photoBg: '#DACAAD',
    body: [
      { type: 'standfirst', text: 'Tinos takes its food seriously — small producers, proper cheese, and tavernas that have been getting it right for decades. You will eat very well here.' },
      { type: 'p', text: 'Close to home there are a few family tavernas we send everyone to, plus a bakery worth the short drive. Further afield, the villages each have their own thing.' },
      { type: 'h2', text: 'Worth the drive' },
      { type: 'p', text: 'Some of the best meals are in the interior villages, in places with no sign and four tables. Ask us — we keep a list, and we will point you to whoever is cooking well that week.' },
      { type: 'quote', text: 'On Tinos the food is local because there is no other kind.' },
      { type: 'p', text: 'We will leave a few favourites in the welcome basket and the rest is yours to discover.' },
    ],
  },
  {
    slug: 'walking-the-marble-villages',
    title: 'Walking the marble villages',
    category: 'Things to do',
    excerpt: 'Footpaths, dovecotes and Pyrgos — a half-day on foot through the island that carved itself.',
    author: 'The Horizon family',
    date: 'May 2026',
    readMinutes: 5,
    photoBg: '#D5C3A2',
    body: [
      { type: 'standfirst', text: 'Tinos is an island of marble and walkers. Old footpaths still link the villages, and a morning on them is the best way to understand the place.' },
      { type: 'p', text: 'Start early, before the heat. The trails are well worn and mostly shaded in parts, winding past dovecotes and through villages built entirely of pale stone.' },
      { type: 'h2', text: 'Pyrgos, the marble village' },
      { type: 'p', text: 'Pyrgos is the one not to miss — a village of sculptors, with marble everywhere from the bus stop to the cemetery. There is a good bakery and a square made for a long coffee.' },
      { type: 'p', text: 'Bring water and decent shoes. We can mark up a map for you before you set out.' },
    ],
  },
  {
    slug: 'the-pool-from-morning-to-night',
    title: 'The pool, from morning to night',
    category: 'Island life',
    excerpt: 'The one thing all six houses share, and how a day arranges itself around it.',
    author: 'The Horizon family',
    date: 'June 2026',
    readMinutes: 3,
    photoBg: '#E0D0B6',
    body: [
      { type: 'standfirst', text: 'Every house at Horizon opens onto the same pool. It is the heart of the place, and the day tends to organise itself around it.' },
      { type: 'p', text: 'Mornings are quiet — coffee, the paper, an early swim. The middle of the day belongs to the children. By evening it is the adults again, with a drink, as the sun drops behind the hills.' },
      { type: 'p', text: 'Six houses, one pool. It sounds simple because it is.' },
    ],
  },
  {
    slug: 'why-autumn-might-be-best',
    title: 'Why autumn might be the best time of all',
    category: 'Seasons',
    excerpt: 'Warm sea, soft light and the island to yourself — the case for September and October.',
    author: 'The Horizon family',
    date: 'September 2026',
    readMinutes: 4,
    photoBg: '#D2BF9F',
    body: [
      { type: 'standfirst', text: 'If spring is the island waking up, autumn is the island at its most relaxed. The sea is at its warmest, the crowds have gone, and the light turns long and gold.' },
      { type: 'p', text: 'Mid-September to late October is, for our money, the finest window of the year. The houses are calm, the tavernas are still open, and the swimming is better than in spring.' },
      { type: 'h2', text: 'Good to know' },
      { type: 'p', text: 'Days are warm, evenings are cooler — bring a light layer for the terrace. Ferries run less often than in peak season, so plan the journey with us and we will sort the details.' },
      { type: 'p', text: 'Come in October once and you may never go back to August.' },
    ],
  },
];
