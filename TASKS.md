# TASKS.md — CommerceX Build Plan

Task IDs (`T-###`) are referenced in commit messages and PRs
(e.g. `Closes T-014`). Status: `TODO / IN PROGRESS / BLOCKED / DONE`.

## Phase 0 — Foundations

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-001 | Initialize monorepo (turborepo/pnpm workspaces) | apps/web, apps/admin, apps/api | TODO |
| T-002 | Set up shared config packages (eslint, tsconfig, tailwind) | | TODO |
| T-003 | Set up Postgres + Prisma, base schema | User, Product, Order | TODO |
| T-004 | CI pipeline: lint, typecheck, unit tests | GitHub Actions | TODO |
| T-005 | Environment config + secrets management | `.env.example`, docs | TODO |
| T-006 | Design system tokens (colors, type scale, spacing) | Feed into Tailwind config | TODO |

## Phase 1 — Auth & Users

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-010 | User model + registration/login (email+password) | Hash with argon2/bcrypt | TODO |
| T-011 | JWT access + refresh token flow | HttpOnly cookie for refresh | TODO |
| T-012 | Social login (Google) | Optional, can defer | TODO |
| T-013 | Password reset flow | Email via transactional provider | TODO |
| T-014 | Account profile page (addresses, saved payment methods) | | TODO |
| T-015 | Role-based access control (customer / admin) | Middleware guard | TODO |

## Phase 2 — Product Catalog

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-020 | Product & Category models | variants (size/color), SKUs | TODO |
| T-021 | Product listing page with pagination/sort | | TODO |
| T-022 | Product detail page | gallery, variant selector, stock status | TODO |
| T-023 | Category / collection pages | | TODO |
| T-024 | Search (full-text or Meilisearch) | typo-tolerant, filters | TODO |
| T-025 | Filtering (price, category, attributes) | Faceted filters UI | TODO |
| T-026 | Product image upload + CDN storage | S3 + signed URLs | TODO |
| T-027 | Reviews & ratings | Moderation flag for admin | TODO |

## Phase 3 — Cart & Checkout

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-030 | Cart model (guest + logged-in, persisted) | Merge guest cart on login | TODO |
| T-031 | Cart UI (drawer/page), quantity updates | Optimistic updates | TODO |
| T-032 | Shipping address form + validation | | TODO |
| T-033 | Shipping rate calculation | Flat rate v1, carrier API later | TODO |
| T-034 | Tax calculation | Region-based, pluggable provider | TODO |
| T-035 | Promo codes / discounts | Percentage, fixed, min-spend rules | TODO |
| T-036 | Stripe payment integration (checkout + webhooks) | Test mode first | TODO |
| T-037 | Order confirmation + email receipt | | TODO |
| T-038 | Order model + order history page | | TODO |

## Phase 4 — Admin Dashboard

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-040 | Admin auth + role gating | Reuse T-015 | TODO |
| T-041 | Product CRUD UI | Bulk edit, CSV import optional | TODO |
| T-042 | Inventory management | Low-stock alerts | TODO |
| T-043 | Order management (view, update status, refund) | Refund via Stripe API | TODO |
| T-044 | Customer management | View orders, support notes | TODO |
| T-045 | Basic analytics dashboard | Revenue, top products, conversion | TODO |
| T-046 | Discount/coupon management UI | | TODO |

## Phase 5 — Polish & Launch Readiness

| ID | Task | Notes | Status |
|----|------|-------|--------|
| T-050 | Responsive/mobile QA pass | 375px, 768px, 1280px breakpoints | TODO |
| T-051 | Accessibility audit (axe + manual) | Keyboard nav, contrast, ARIA | TODO |
| T-052 | Performance pass (Lighthouse) | Image optimization, lazy loading | TODO |
| T-053 | SEO basics | Meta tags, sitemap, structured data (Product schema) | TODO |
| T-054 | Error monitoring + logging | Sentry or similar | TODO |
| T-055 | Load testing on checkout path | k6 or similar | TODO |
| T-056 | Legal pages | Terms, privacy, returns policy | TODO |
| T-057 | Staging → production deployment pipeline | Blue/green or rolling | TODO |

## Backlog / Later

- Wishlists
- Product recommendations ("customers also bought")
- Multi-currency / i18n
- Subscription or recurring orders
- Abandoned cart email flow
- Loyalty/rewards program

## How to Use This File

- Pick the next `TODO` task in the earliest incomplete phase unless a
  dependency blocks it.
- When starting a task, change status to `IN PROGRESS` and note the branch
  name next to it.
- When a PR merges, mark `DONE` and link the PR number.
- If a task turns out to be bigger than expected, split it into `T-0XXa`,
  `T-0XXb` rather than letting one PR balloon.
