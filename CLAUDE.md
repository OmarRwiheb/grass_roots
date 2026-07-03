# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Grass Roots is a marketing/landing site (Egyptian-themed retail brand) built with Next.js (App Router) and React 19, deployed to Vercel/a Node host.

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build (run `build` first)
- `npm run lint` — run ESLint (`next lint`) over the project

There is no test suite configured in this project.

## Architecture

- **Routing**: App Router under `src/app/`. `src/app/layout.jsx` is the root layout — it renders `SmoothScroll` (Lenis init), `Header`, `{children}`, and `Footer` around every route, and sets metadata (title/favicons) via the Metadata API. Routes: `src/app/page.jsx` (`/`) and `src/app/stores/page.jsx` (`/stores`). Nav links are driven by `src/data/Nav.js` and rendered with `next/link`.
- **Page composition**: Pages are thin — they just stack components in order (e.g. `app/page.jsx` renders `Hero`, `AboutSection`, `Stores`, `ImagesSection`, `Game`). When adding a new page section, build it as a component in `src/components/` and add it to the relevant page.
- **Client/server boundary**: Most feature components are Client Components (`"use client"`) because they use hooks or browser-only libraries — `Header` (GSAP mobile menu), `Hero` (Framer Motion parallax), `Stores`/`VideoModal`/`Game` (state), `ImagesSection` (Swiper), `SmoothScroll` (Lenis), and both page files (they call `AOS.init()` in a `useEffect`, matching the original per-page AOS setup). Purely presentational components stay Server Components: `Footer`, `AboutSection`, `Section`, `StoreUnit`, `UI/H2`, `UI/H3`, `MobMenue`, `data/Nav.js`. When adding a new component, only add `"use client"` if it actually needs hooks/state/refs/browser APIs — don't add it by default.
- **Layout primitive**: `src/components/Section.jsx` is the standard wrapper used by nearly every page section (centers content, applies consistent container/gap styling). `src/UI/H2.jsx` / `H3.jsx` are shared heading components with built-in AOS scroll-reveal attributes.
- **Reused feature components**: `Stores.jsx` (grid of `StoreUnit.jsx` cards) is rendered on both `/` and `/stores` — it's the canonical way multiple pages share content rather than duplicating markup.
- **Animation stack** — four different libraries are in play, each for a different purpose:
  - `@studio-freight/lenis` — smooth scrolling. `src/components/SmoothScroll.jsx` renders nothing; it just runs the Lenis `requestAnimationFrame` loop once from the root layout, so a single instance survives client-side navigation between routes.
  - `aos` (Animate On Scroll) — scroll-reveal effects on section/heading elements (`data-aos="fade-up"` etc.). Each page (`app/page.jsx`, `app/stores/page.jsx`) calls `AOS.init()` itself in a `useEffect` — if you add a new page that needs AOS, it needs its own init the same way.
  - `framer-motion` — scroll-linked parallax in `Hero.jsx` via `useScroll`/`useTransform`. The parallax layers are `next/image` wrapped with `motion.create(Image)` (aliased as `MotionImage`) so the `style={{ y }}` scroll transform still applies to an optimized image.
  - `gsap` + `@gsap/react` (`useGSAP`) — timeline-driven mobile menu open/close animation in `Header.jsx`/`MobMenue.jsx` (clip-path reveal + staggered link entrance).
- **Modal pattern**: `VideoModal.jsx` lazy-loads its `<video>` source only while open (`shouldLoadVideo` state) and locks body scroll via `document.body.style.overflow`. Follow this pattern for any other modal/overlay content to avoid pre-loading heavy media.
- **Images**: All images use `next/image`, imported from `public/` with a root-relative `src` (e.g. `/images_section/1.webp`). Two patterns cover essentially everything in this codebase:
  - Decorative/cover backgrounds and store-card photos use `fill` + `object-cover` inside a `relative`-positioned (or otherwise already-positioned) parent — see the watermark backgrounds in `Hero`/`AboutSection`/`ImagesSection`/`app/stores/page.jsx` and the cover photo in `StoreUnit`.
  - Intrinsically-sized images (logos, icons, parallax layers, carousel photos, hieroglyph letters) pass the real numeric `width`/`height` of the source file plus a Tailwind sizing class + `h-auto` so CSS still controls the rendered size responsively. Get a new asset's intrinsic size with `sips -g pixelWidth -g pixelHeight <file>` (macOS) before wiring it up.
- **Static assets**: Everything lives in `public/` — store/product photography in `public/images_section/`, store logos in `public/logos/`, hero parallax layers in `public/hero_images/`, and the hieroglyph game's letter images in `public/heiroglyphics/`.
- **Styling**: Tailwind CSS v4 via the `@tailwindcss/postcss` PostCSS plugin (see `postcss.config.mjs`) — no separate `tailwind.config.js`. Utility classes are used directly in JSX; global custom CSS (font-face, swiper overrides, mobile menu clip-path animation classes) lives in `src/app/globals.css`. The brand accent color `#ffc000` is used ad hoc throughout rather than as a Tailwind theme token.
