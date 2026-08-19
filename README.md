# The Indian Wings — Kashmir Tourism ✈️

A polished single-page-application website for **The Indian Wings**, a Srinagar-based Kashmir travel company. Built with **React 19 + Vite 8 + Tailwind CSS v4**.

## ✨ Highlights

- **Cinematic hero** — full-screen Ken Burns slideshow with crossfade, falling sparkles, drifting orbs, film grain, slide captions and controls
- **Image-rich** — 28+ curated Kashmir photos (Unsplash + Wikimedia Commons) across a destinations grid, an infinite photo marquee, a four-seasons section, tour packages, gallery with lightbox, and parallax CTA bands
- **Animations everywhere** — scroll-reveal (IntersectionObserver), 3D tilt cards, animated counters, shine-sweep buttons, gradient text, image zoom/lift hovers, staggered entrances, marquee ticker
- **Pages** — Home, Packages, Gallery (filterable + lightbox w/ keyboard nav), About, Contact (form + FAQ accordion)
- **Shared component library** (`src/shared.jsx`) and a central image catalog (`src/images.js`)
- Accessibility & perf touches: lazy-loaded images with blur-fade, `prefers-reduced-motion` support, focus rings, scroll-to-top

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build
npm run lint      # oxlint
```

## Structure

```
src/
  App.jsx        Home page sections
  Packages.jsx   Tour packages
  Gallery.jsx    Filterable gallery + lightbox
  About.jsx      Story, stats, values
  Contact.jsx    Form, contact info, FAQs
  shared.jsx     Header, Footer, Reveal, FadeImg, counters…
  images.js      Curated image catalog (Unsplash / Wikimedia Commons)
  index.css      Design system: keyframes, glass, grain, marquee…
```

Photos courtesy of [Unsplash](https://unsplash.com) and [Wikimedia Commons](https://commons.wikimedia.org) (CC licensed).
