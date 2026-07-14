# TASKS.md — CommerceX Demo Build Plan

This is a **portfolio/demo site**, so the plan is scoped to look and feel
complete without any real backend, payments, or infrastructure. Task IDs
(`T-###`) can be referenced in commits (e.g. `Closes T-012`).

## Phase 0 — Setup

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-001 | Scaffold Vite + React + TypeScript project | | TODO |
| T-002 | Set up Tailwind + design tokens (colors, type, spacing) | Gives the demo a distinct look, not generic Bootstrap-y | TODO |
| T-003 | Set up routing (React Router) | Home, Products, Product Detail, Cart, Checkout, Orders, Admin | TODO |
| T-004 | Create mock data set | 15–30 realistic products across 3–4 categories | TODO |
| T-005 | Set up mock "API" helper functions with fake delay | `getProducts()`, `getProduct(id)`, `placeOrder()` etc. | TODO |

## Phase 1 — Storefront: Browse

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-010 | Home page (hero, featured products, categories) | This is the first impression — make it polished | TODO |
| T-011 | Product listing page | grid, pagination or infinite scroll | TODO |
| T-012 | Category filter | Client-side filter on mock data | TODO |
| T-013 | Search bar | Client-side fuzzy match on product names | TODO |
| T-014 | Sort (price, newest, popularity) | | TODO |
| T-015 | Product detail page | image gallery, variant selector (size/color), description, reviews section | TODO |
| T-016 | Loading skeletons / empty states | Shows attention to UX detail | TODO |

## Phase 2 — Cart & Fake Checkout

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-020 | Cart state (add/remove/update qty) | Zustand or Context, persisted to localStorage | TODO |
| T-021 | Cart drawer/page UI | subtotal, item count badge in navbar | TODO |
| T-022 | Checkout form | shipping address, fake payment fields, client-side validation | TODO |
| T-023 | Order confirmation screen | fake order ID, order summary | TODO |
| T-024 | Order history page | pulls from mock "past orders" tied to fake session | TODO |

## Phase 3 — Fake Auth

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-030 | Login / signup screens (UI only) | Any input "succeeds"; store fake session in localStorage | TODO |
| T-031 | Account page | shows fake profile info, editable in-session only | TODO |
| T-032 | Protect checkout/orders behind fake login (optional) | Or allow guest checkout — either is fine for a demo | TODO |

## Phase 4 — Admin Dashboard (showcase piece)

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-040 | Admin layout + nav | Separate route/section, e.g. `/admin` | TODO |
| T-041 | Product list + add/edit/delete (in-memory) | Great for showing CRUD UI skills | TODO |
| T-042 | Orders list view (mock orders) | Table with status badges | TODO |
| T-043 | Simple dashboard charts (revenue, top products) | Use mock numbers + a charting library (Recharts) | TODO |

## Phase 5 — Polish for Presentation

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-050 | Responsive pass (mobile/tablet/desktop) | This matters a lot for a portfolio demo | TODO |
| T-051 | Animations/micro-interactions | hover states, add-to-cart feedback, page transitions | TODO |
| T-052 | Empty/error states everywhere | empty cart, no search results, etc. | TODO |
| T-053 | Favicon, page titles, OG image | Small details that make it feel "real" | TODO |
| T-054 | README with screenshots + live demo link | This is what people will actually read first | TODO |
| T-055 | Deploy to Vercel/Netlify | Free tier, custom subdomain if possible | TODO |

## Optional Stretch (only if time allows)

- Dark mode toggle
- Wishlist feature
- Product quick-view modal
- Basic animations with Framer Motion
- A couple of Vitest component tests + one Playwright smoke test, to show
  testing awareness without over-investing

## How to Use This File

- Work top to bottom by phase — browsing and cart matter more to a demo
  than admin polish, so don't let Phase 4 crowd out Phase 5.
- Mark tasks `DONE` as you go and jot the deployed URL at the top once
  live — that's the actual deliverable for a portfolio piece.