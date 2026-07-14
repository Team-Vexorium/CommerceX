# TASKS.md — CommerceX Demo Build Plan

This is a **portfolio/demo site**, so the plan is scoped to look and feel
complete without any real backend, payments, or infrastructure. Task IDs
(`T-###`) can be referenced in commits (e.g. `Closes T-012`).

## Phase 0 — Setup

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-001 | Scaffold Vite + React + TypeScript project | | DONE |
| T-002 | Set up Tailwind + design tokens (colors, type, spacing) | Modern Artisanal — warm neutrals, terracotta accent | DONE |
| T-003 | Set up routing (React Router) | Home, Products, Product Detail, Cart, Checkout, Orders, Admin | DONE |
| T-004 | Create mock data set | 21 products across 4 categories (Home Goods, Apparel, Accessories, Stationery) | DONE |
| T-005 | Set up mock "API" helper functions with fake delay | `getProducts()`, `getProduct()`, `getCategories()`, `placeOrder()`, `getOrders()` | DONE |

## Phase 1 — Storefront: Browse

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-010 | Home page (hero, featured products, categories) | Full hero, category cards with images, featured products grid, philosophy section, newsletter | DONE |
| T-011 | Product listing page | Responsive grid, 12 per page pagination | DONE |
| T-012 | Category filter | Client-side pills: All, Home Goods, Apparel, Accessories, Stationery | DONE |
| T-013 | Search bar | Client-side search on name, description, tags | DONE |
| T-014 | Sort (price, newest, popularity) | Dropdown select in filter bar | DONE |
| T-015 | Product detail page | Image gallery, variant selector (size/color), description, reviews section, trust signals | DONE |
| T-016 | Loading skeletons / empty states | Skeletons for product grid, detail, cart; empty states with actions | DONE |

## Phase 2 — Cart & Fake Checkout

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-020 | Cart state (add/remove/update qty) | Zustand store, persisted to localStorage | DONE |
| T-021 | Cart page UI | Full page with item list, quantity controls, order summary, free shipping message | DONE |
| T-022 | Checkout form | Shipping address + fake payment fields, client-side validation, card formatting | DONE |
| T-023 | Order confirmation screen | Fake order ID, order summary, status badge | DONE |
| T-024 | Order history page | Lists past orders from localStorage with status badges | DONE |

## Phase 3 — Fake Auth

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-030 | Login / signup screens (UI only) | Any input "works"; store fake session in localStorage via Zustand persist | DONE |
| T-031 | Account page | Shows fake profile info, editable in-session only | DONE |
| T-032 | Protect checkout/orders behind fake login | Guest checkout allowed; login shown in navbar | DONE |

## Phase 4 — Admin Dashboard (showcase piece)

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-040 | Admin layout + nav | Sidebar with Dashboard/Products/Orders tabs, mobile bottom nav | DONE |
| T-041 | Product list + add/edit/delete (in-memory) | Table with inline edit, add form, delete confirmation | DONE |
| T-042 | Orders list view (mock orders) | Table with status badges, mock historical orders | DONE |
| T-043 | Simple dashboard charts (revenue, top products) | Recharts bar + line charts, stat cards, top products table | DONE |

## Phase 5 — Polish for Presentation

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-050 | Responsive pass (mobile/tablet/desktop) | All pages responsive, admin has mobile bottom nav | DONE |
| T-051 | Animations/micro-interactions | Fade-in, slide-up, hover states, toast notifications | DONE |
| T-052 | Empty/error states everywhere | Empty cart, no search results, no orders, product not found | DONE |
| T-053 | Favicon, page titles, OG image | SVG favicon with brand mark, Inter font loaded, page title set | DONE |
| T-054 | README with screenshots + demo link | Full README with features, tech stack, getting started | DONE |
| T-055 | Deploy to Vercel/Netlify | Ready for deployment — static build in `dist/` | PENDING |

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
