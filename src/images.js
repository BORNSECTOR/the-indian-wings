/* ============================================================
   The Indian Wings — curated image catalog
   Sources: Unsplash (royalty-free) + Wikimedia Commons (CC)
   ============================================================ */

/** Wikimedia Commons file → sized thumbnail (via Special:FilePath redirect) */
export const wm = (file, width = 1000) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;

/** Unsplash photo id → sized, optimized crop */
export const unsplash = (id, width = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${width}`;

/* ---------------- Hero slideshow ---------------- */
export const HERO_SLIDES = [
  {
    src: unsplash('photo-1597074866923-dc0589150e65', 1920),
    title: 'Dal Lake, Srinagar',
    sub: "The jewel in Kashmir's crown",
  },
  {
    src: unsplash('photo-1506905925346-21bda4d32df4', 1920),
    title: 'The Pir Panjal Range',
    sub: 'Snow-capped peaks that touch the sky',
  },
  {
    src: unsplash('photo-1596422846543-75c6fc197f07', 1920),
    title: 'Gulmarg Meadows',
    sub: 'The meadow of flowers, 2,650 m high',
  },
  {
    src: unsplash('photo-1605649487212-4d4ce3e015ac', 1920),
    title: 'Sonmarg Valley',
    sub: 'The meadow of gold on the Sindh river',
  },
];

/* ---------------- Destinations ---------------- */
export const DESTINATIONS = [
  { name: 'Srinagar', desc: 'Heart of Kashmir', tag: 'Lakes & Houseboats', img: unsplash('photo-1564329494258-3f72215ba175', 900) },
  { name: 'Gulmarg', desc: 'Meadow of Flowers', tag: 'Gondola & Skiing', img: wm('Gulmarg kashmir valley.jpg', 900) },
  { name: 'Pahalgam', desc: 'Valley of Shepherds', tag: 'Rivers & Pine Forests', img: wm('Pahalgam Valley.jpg', 900) },
  { name: 'Sonmarg', desc: 'Meadow of Gold', tag: 'Glaciers & Passes', img: wm('Sonmarg - Paradise.jpg', 900) },
  { name: 'Doodhpathri', desc: 'Valley of Milk', tag: 'Hidden Meadows', img: wm('Doude pather waters.jpg', 900) },
  { name: 'Aru Valley', desc: 'Alpine Wonderland', tag: 'Offbeat & Serene', img: wm('Aru Valley Kashmir in Autumn.jpg', 900) },
];

/* ---------------- Photo marquee strip ---------------- */
export const MARQUEE_IMAGES = [
  { img: wm('A line of Shikara at Dal Lake.jpg', 600), label: 'Dal Lake' },
  { img: unsplash('photo-1566837945700-30057527ade0', 600), label: 'Tulip Garden' },
  { img: wm('Lidder at Pahalgam.jpg', 600), label: 'Lidder River' },
  { img: wm('Snow capped Sonmarg.jpg', 600), label: 'Sonmarg' },
  { img: wm('Houseboats at Dal Lake.jpg', 600), label: 'Houseboats' },
  { img: wm('Chinar, Kashmir.jpg', 600), label: 'Chinar' },
  { img: wm('Gulmarg kashmir valley.jpg', 600), label: 'Gulmarg' },
  { img: wm('Aru Valley Kashmir in Autumn.jpg', 600), label: 'Aru Valley' },
  { img: wm('Tulip Garden, Srinagar, J&K.jpg', 600), label: 'Srinagar' },
  { img: wm('Krishansar Lake, Sonmarg, Kashmir valley, India 01.jpg', 600), label: 'Krishansar' },
];

/* ---------------- Seasons of Kashmir ---------------- */
export const SEASONS = [
  { name: 'Spring', months: 'March – May', desc: 'Asia\'s largest tulip garden bursts into colour across Srinagar.', emoji: '🌸', img: wm('Tulip Garden, Srinagar, J&K.jpg', 900) },
  { name: 'Summer', months: 'June – August', desc: 'Lush green meadows, gushing rivers and perfect trekking weather.', emoji: '🌿', img: wm('Doodhpathri pastures Jammu Kasmir India May 2014.jpg', 900) },
  { name: 'Autumn', months: 'Sept – November', desc: 'Chinar leaves turn the valley into a golden, fiery painting.', emoji: '🍂', img: wm('Aru Valley Kashmir in Autumn.jpg', 900) },
  { name: 'Winter', months: 'December – February', desc: 'Snow blankets Gulmarg — the time for skiing and gondola rides.', emoji: '❄️', img: wm('Snow Clad Hut in Gulmarg, Jammu & Kashmir.jpg', 900) },
];

/* ---------------- Special experiences ---------------- */
export const EXPERIENCES = [
  {
    title: 'Honeymoon Special',
    tag: '🌸 Spring Romance Edition',
    img: wm('Houseboats at Dal Lake.jpg', 1000),
    desc: 'Begin your journey of love amidst beautiful valleys, serene lakes, and cozy wooden cottages.',
    features: ['Private Shikara Ride', 'Candlelight Dinner', 'Couple Spa Session', 'Premium Houseboat', 'Photography Session', 'Flower Decorated Room'],
    cta: 'Plan Your Honeymoon',
  },
  {
    title: 'Ladies Special Festival',
    tag: '🌸 Women-Only Adventure',
    img: wm('Cherry blossoms in Doodhpathri southwest Jammu Kashmir India.jpg', 1000),
    desc: "An exclusive Kashmir experience designed for women. Explore Kashmir's beauty in a safe and empowering environment.",
    features: ['Women-only Group', 'Female Tour Guides', 'Safe Accommodations', 'Flexible Itineraries', 'Wellness Activities', 'Group Bonding'],
    cta: 'Join the Festival',
  },
];

/* ---------------- Gallery (filterable) ---------------- */
export const GALLERY_IMAGES = [
  { src: unsplash('photo-1564329494258-3f72215ba175', 1200), title: 'Shikara at Sunset', category: 'srinagar' },
  { src: wm('A line of Shikara at Dal Lake.jpg', 1200), title: 'A Line of Shikaras', category: 'srinagar' },
  { src: wm("Dal Lake's sunset tour on a shikara - Srinagar (9967002244).jpg", 1200), title: 'Sunset Shikara Tour', category: 'srinagar' },
  { src: wm('Houseboat at Dal Lake, Srinagar.jpg', 1200), title: 'Houseboat Stay', category: 'srinagar' },
  { src: wm('Houseboats at Dal Lake.jpg', 1200), title: 'Houseboat Row', category: 'srinagar' },
  { src: wm('Char Chinar at Dal Lake, Kashmir.JPG', 1200), title: 'Char Chinar Island', category: 'srinagar' },
  { src: wm('A view of Shalimar Bagh in Srinagar.jpg', 1200), title: 'Shalimar Bagh', category: 'srinagar' },
  { src: wm('Tulip Garden, Srinagar, J&K.jpg', 1200), title: 'Tulip Garden', category: 'srinagar' },
  { src: unsplash('photo-1618083707368-b382cdcb82c2', 1200), title: 'Morning on Dal Lake', category: 'srinagar' },
  { src: wm('Gondola or Cable car at Gulmarg, Kashmir, India.jpg', 1200), title: 'Gulmarg Gondola', category: 'gulmarg' },
  { src: wm('Gulmarg kashmir valley.jpg', 1200), title: 'Gulmarg Valley', category: 'gulmarg' },
  { src: wm('Snow Clad Hut in Gulmarg, Jammu & Kashmir.jpg', 1200), title: 'Snow-Clad Hut', category: 'gulmarg' },
  { src: wm('Sunset at Gulmarg December 2020 by Mutahir Showkat.jpg', 1200), title: 'Gulmarg Sunset', category: 'gulmarg' },
  { src: unsplash('photo-1621232082074-1a7750ecc557', 1200), title: 'Alpine Slopes', category: 'gulmarg' },
  { src: wm('Lidder at Pahalgam.jpg', 1200), title: 'Lidder River', category: 'pahalgam' },
  { src: wm('Pahalgam Valley.jpg', 1200), title: 'Pahalgam Valley', category: 'pahalgam' },
  { src: wm('Betaab Valley, Pehalgam, Kashmir.jpg', 1200), title: 'Betaab Valley', category: 'pahalgam' },
  { src: wm('Landscape Panorama of Betaab Valley, Anantnag, Jammu and Kashmir, India.jpg', 1200), title: 'Betaab Panorama', category: 'pahalgam' },
  { src: wm('Trek through Kashmir Valley, Pahalgam.jpg', 1200), title: 'Meadow Trek', category: 'pahalgam' },
  { src: wm('Snow capped Sonmarg.jpg', 1200), title: 'Sonmarg Snowcaps', category: 'sonmarg' },
  { src: wm('Sonmarg - Paradise.jpg', 1200), title: 'Sonmarg Paradise', category: 'sonmarg' },
  { src: wm('Krishansar Lake, Sonmarg, Kashmir valley, India 01.jpg', 1200), title: 'Krishansar Lake', category: 'sonmarg' },
  { src: wm('Aru Valley Kashmir in Autumn.jpg', 1200), title: 'Aru Valley Autumn', category: 'nature' },
  { src: wm('Chinar, Kashmir.jpg', 1200), title: 'The Chinar Tree', category: 'nature' },
  { src: wm('A view of fallen chinar leaves (Kashmir).jpg', 1200), title: 'Fallen Chinar Leaves', category: 'nature' },
  { src: wm('Himalayas Kashmir Valley.jpg', 1200), title: 'Himalayan Valley', category: 'nature' },
  { src: wm('Doodhpathri pastures Jammu Kasmir India May 2014.jpg', 1200), title: 'Doodhpathri Pastures', category: 'nature' },
  { src: unsplash('photo-1707381076957-ec19b90e9cbe', 1200), title: 'Boats of the Valley', category: 'nature' },
];

export const GALLERY_CATEGORIES = ['all', 'srinagar', 'gulmarg', 'pahalgam', 'sonmarg', 'nature'];

/* ---------------- Tour packages ---------------- */
export const PACKAGES = [
  { id: 1, title: 'Kashmir Tour', duration: '3 Nights & 4 Days', price: '₹ 8,800', tag: null, image: wm('Houseboat at Dal Lake, Srinagar.jpg', 900), desc: 'A perfect short getaway to experience the magic of Kashmir — from Dal Lake to Mughal Gardens.' },
  { id: 2, title: 'Family Kashmir Package', duration: '4 Nights & 5 Days', price: '₹ 10,300', tag: null, image: wm('Tulip Garden, Srinagar, J&K.jpg', 900), desc: 'A family-friendly itinerary with kid-safe activities, scenic drives, and comfortable stays.' },
  { id: 3, title: 'Kashmir Trip', duration: '5 Nights & 6 Days', price: '₹ 12,800', tag: null, image: wm('Gulmarg kashmir valley.jpg', 900), desc: 'Explore Srinagar, Gulmarg, Pahalgam and Sonmarg in one well-paced journey.' },
  { id: 4, title: 'Summer Kashmir Package', duration: '6 Nights & 7 Days', price: '₹ 14,200', tag: 'Peak Season Special', image: wm('Indira Gandhi Memorial Tulip Garden, Srinagar.jpg', 900), desc: 'The best of Kashmir in summer — lush meadows, blooming tulips, and cool mountain air.' },
  { id: 5, title: 'Kashmir Holiday Package', duration: '6 Nights & 7 Days', price: '₹ 14,200', tag: null, image: wm('Pahalgam Valley.jpg', 900), desc: 'A relaxed holiday with ample time at each destination — no rushing, just enjoying.' },
  { id: 6, title: 'Trip to Kashmir', duration: '7 Nights & 8 Days', price: '₹ 16,200', tag: null, image: wm('Landscape Panorama of Betaab Valley, Anantnag, Jammu and Kashmir, India.jpg', 900), desc: 'An in-depth Kashmir experience covering all major highlights plus offbeat gems.' },
  { id: 7, title: 'Vaishno Devi Package', duration: '4 Nights & 5 Days', price: '₹ 11,500', tag: 'Divine Pilgrimage', image: wm('Vaishno Devi Shrine.jpg', 900), desc: 'A spiritual journey to Vaishno Devi with comfortable accommodation and guided trek.' },
  { id: 8, title: 'Kashmir Grand Tour', duration: '8 Nights & 9 Days', price: '₹ 18,500', tag: 'Premium Experience', image: wm('Sonmarg - Paradise.jpg', 900), desc: 'The ultimate Kashmir experience — luxury stays, private transfers, and exclusive access.' },
];

/* ---------------- Page heroes ---------------- */
export const PAGE_HEROES = {
  packages: unsplash('photo-1596422846543-75c6fc197f07', 1920),
  gallery: wm("Dal Lake's sunset tour on a shikara - Srinagar (9967002244).jpg", 1920),
  about: wm('Himalayas Kashmir Valley.jpg', 1920),
  contact: wm('Houseboats at Dal Lake.jpg', 1920),
};

/* ---------------- About page collage ---------------- */
export const ABOUT_COLLAGE = [
  { img: unsplash('photo-1506905925346-21bda4d32df4', 900), alt: 'Kashmir Mountains' },
  { img: wm('Pahalgam Valley.jpg', 900), alt: 'Pahalgam Valley' },
  { img: wm('Char Chinar at Dal Lake, Kashmir.JPG', 900), alt: 'Char Chinar on Dal Lake' },
];

/* ---------------- CTA background ---------------- */
export const CTA_BACKGROUND = unsplash('photo-1605649487212-4d4ce3e015ac', 1920);
