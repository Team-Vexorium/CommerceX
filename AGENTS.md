# AGENTS.md — CommerceX (Demo/Showcase Build)

This file gives AI coding agents (Claude Code, Cursor, Copilot, etc.) the
context they need to work in this repo. **CommerceX is a portfolio/demo
project** — it exists to showcase frontend and product-thinking skills, not
to process real orders or money. Keep that in mind: favor polish, realistic
UX, and clean code over production-grade infrastructure.

## Project Overview

CommerceX is a mock e-commerce storefront + admin dashboard. It looks and
behaves like a real shopping site (browse products, add to cart, "checkout,"
view an admin panel) but everything runs on **fake/mock data** — no real
payments, no real user accounts persisted to a live database, no real
emails sent.

Goal: something impressive to put in a portfolio / demo to clients or
recruiters, deployable as a static or lightly-hosted site with zero ongoing
cost or risk.

## Tech Stack (kept intentionally light)

| Layer      | Choice                                             |
|------------|-----------------------------------------------------|
| Frontend   | React + TypeScript + Vite                           |
| Styling    | Tailwind CSS                                        |
| State      | React state / Context / Zustand (no backend needed) |
| "Backend"  | None required — mock data in JSON/TS files, or a mock API layer (json-server / MSW) if you want realistic loading states |
| Data       | Static JSON files (`/src/data/products.json`, etc.) |
| Auth       | Fake login (any email/password "works", stored in localStorage for the session) |
| Payments   | Fake checkout flow — collects form input, validates it, shows a success screen. **No Stripe, no real payment processor.** |
| Images     | Free stock/placeholder images (Unsplash, placeholder.com) or generated art |
| Deployment | Static hosting (Vercel/Netlify/GitHub Pages) |

> If you later want to turn this into a real product, that's a separate,
> much bigger effort — this file assumes we are NOT doing that.

## Repository Structure

```
/src
  /components      # shared UI (ProductCard, Navbar, CartDrawer, etc.)
  /pages           # storefront pages (Home, Product, Cart, Checkout, Orders)
  /admin           # admin dashboard pages (mocked data management)
  /data            # mock products, categories, users, orders (JSON/TS)
  /store           # client-side state (cart, fake auth session)
  /lib             # helpers, formatters, fake API functions
/public            # static assets
/docs              # this file, TASKS.md, PROMPT_DESIGN.md
```

## Setup Commands

```bash
pnpm install
pnpm dev          # runs the Vite dev server, everything is client-side
pnpm build        # produces a static build for deployment
pnpm preview       # preview the production build locally
```

No `.env` secrets, no database setup, no API keys needed for the core demo.

## Code Style

- TypeScript, functional React components + hooks.
- Tailwind for styling; keep a small shared design-token setup (colors,
  spacing, type scale) so the UI feels cohesive rather than default-Tailwind.
- Naming: `camelCase` variables/functions, `PascalCase` components/types,
  `kebab-case` non-component filenames.
- Keep mock data realistic — real-looking product names, prices, and
  descriptions read much better in a demo than "Product 1", "Product 2".

## "Fake Backend" Approach

Since there's no real server, simulate real-world behavior so the demo
feels authentic:

- Wrap data access in small functions (e.g. `getProducts()`,
  `placeOrder()`) that return Promises with a short artificial delay
  (`setTimeout`) — this makes loading states/spinners visible and
  realistic, and means swapping in a real API later is a one-file change.
- Persist cart and fake-auth session to `localStorage` so a page refresh
  doesn't lose state.
- Checkout should validate inputs (card number format, required fields)
  like a real form, then just show an order confirmation screen with a
  fake order ID — no charge actually happens anywhere.
- Admin dashboard edits (add/edit/delete product) can update in-memory or
  localStorage state for the session; no need to persist permanently.

## Testing Expectations (lightweight)

- A few component tests (Vitest + React Testing Library) on key
  interactive pieces (cart logic, checkout form validation) are enough to
  demonstrate good practice — this doesn't need full test coverage.
- No integration/E2E test suite required, though a couple of Playwright
  smoke tests ("can browse to a product and add to cart") are a nice
  portfolio touch if time allows.

## What Agents Should NOT Do

- Do not wire up a real payment processor (Stripe, PayPal, etc.) or ask
  for real API keys — this is explicitly out of scope.
- Do not set up a real database or backend server unless later asked —
  keep everything client-side/mock.
- Do not add real email sending, SMS, or third-party services that cost
  money or need credentials.
- Do not use real people's names/photos/reviews — keep all sample content
  clearly fictional (e.g. "Aria Textiles" not a real brand).

## Reference Docs

- `/docs/TASKS.md` — task breakdown for the demo build
- `/docs/PROMPT_DESIGN.md` — how to prompt agents effectively for this repo