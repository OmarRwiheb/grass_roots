# Grass Roots

Marketing/e-commerce site for Grass Roots, an Egyptian-themed retail brand. Built with Next.js (App Router) and React 19, with product/cart data backed by the Shopify Storefront API.

## Getting started

Install dependencies and copy the environment template:

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your Shopify store's Storefront API credentials, then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` | Your Shopify store domain (e.g. `your-store.myshopify.com`) |
| `SHOPIFY_STOREFRONT_PRIVATE_TOKEN` | Server-only Storefront API access token (higher rate limit) |
| `NEXT_PUBLIC_SHOPIFY_API_VERSION` | Shopify Storefront API version (e.g. `2025-01`) |

## Commands

- `npm run dev` — start the Next.js dev server
- `npm run build` — production build
- `npm run start` — serve the production build (run `build` first)
- `npm run lint` — run ESLint (`next lint`) over the project

There is no test suite configured in this project.

## Project structure

- `src/app/` — App Router routes: `/` (home), `/stores`, `/products`, `/products/[handle]`, `/collections/[handle]`, and `/api/shopify` route handlers.
- `src/components/` — feature and UI components, including the Shopify shop UI under `src/components/shop/`.
- `src/services/shopify/` — Shopify Storefront API client and data-fetching helpers (products, collections, cart).
- `src/contexts/CartContext.jsx` — client-side cart state, paired with `src/components/shop/CartDrawer.jsx`.
- `src/config/shopify.js` — Shopify client configuration.
- `src/data/` — static data (e.g. nav links).
- `public/` — static assets (product photography, store logos, hero images, hieroglyph game assets).

See `CLAUDE.md` for a more detailed architecture overview (animation stack, client/server component conventions, image patterns, etc.).

## Tech stack

- [Next.js](https://nextjs.org) 15 (App Router) + React 19
- [Tailwind CSS](https://tailwindcss.com) v4
- Shopify Storefront API for products, collections, and cart/checkout
- Animation: Lenis (smooth scroll), AOS (scroll reveal), Framer Motion (parallax), GSAP (mobile menu)
