# AGENTS.md — CommerceX

This file gives AI coding agents (Claude Code, Cursor, Copilot Workspace, etc.)
the context they need to work productively in this repository. Keep it close
to the repo root and update it whenever conventions change.

## Project Overview

**CommerceX** is a full-stack e-commerce web application. Customers browse a
product catalog, manage a cart, check out with saved or new payment methods,
and track orders. Admins manage products, inventory, orders, and customers
through a separate dashboard.

## Tech Stack (adjust to what you actually pick)

| Layer      | Choice (default assumption)          |
|------------|---------------------------------------|
| Frontend   | React + TypeScript + Vite             |
| Styling    | Tailwind CSS                          |
| State      | React Query + Zustand                 |
| Backend    | Node.js + Express (or NestJS)         |
| Database   | PostgreSQL + Prisma ORM               |
| Auth       | JWT + refresh tokens (or Auth0/Clerk)  |
| Payments   | Stripe                                |
| Search     | Postgres full-text (or Meilisearch)   |
| Storage    | S3-compatible bucket for product media|
| Deployment | Docker + CI/CD (GitHub Actions)       |

> If the actual stack differs, update this table first — agents read it
> before writing code.

## Repository Structure

```
/apps
  /web           # customer-facing storefront
  /admin         # admin dashboard
  /api           # backend service(s)
/packages
  /ui            # shared component library
  /config        # shared eslint/tsconfig/tailwind config
  /types         # shared TypeScript types (DTOs, entities)
/prisma          # schema.prisma, migrations, seed scripts
/docs            # this file, TASKS.md, PROMPT_DESIGN.md, ADRs
```

## Setup Commands

```bash
# install
pnpm install

# environment
cp .env.example .env        # fill in DB, Stripe, S3 keys

# database
pnpm prisma migrate dev
pnpm prisma db seed

# run everything
pnpm dev                    # turborepo: web + admin + api concurrently

# run one app
pnpm --filter web dev
pnpm --filter api dev
```

## Code Style

- TypeScript everywhere; `strict: true`. No `any` without a `// TODO` and a
  linked issue.
- Functional React components + hooks only. No class components.
- Prefer composition over inheritance in backend services.
- Naming: `camelCase` for variables/functions, `PascalCase` for
  components/types, `kebab-case` for file names except React components
  (`ProductCard.tsx`).
- Run `pnpm lint` and `pnpm format` before committing. Both are enforced in
  CI and via a pre-commit hook (husky + lint-staged).
- No commented-out code in commits. Delete it; git history keeps it.

## Testing Instructions

- Unit tests: Vitest, colocated as `*.test.ts(x)` next to the file.
- Integration tests (API): Vitest + Supertest against a test database
  (`pnpm test:api`).
- E2E: Playwright, in `/e2e`, run against a seeded local stack
  (`pnpm test:e2e`).
- **Every PR touching business logic must include or update tests.**
  Agents should run `pnpm test` locally before proposing a PR and fix any
  failures caused by their change — do not silence or skip failing tests.
- Minimum coverage gate: 80% lines on `/apps/api/src` and `/packages`.

## Agent Workflow Expectations

1. **Read before writing.** Check `/docs/TASKS.md` for the current task
   scope and `/prisma/schema.prisma` for the current data model before
   generating code — don't assume a schema.
2. **Small, reviewable diffs.** Prefer one feature/fix per PR. Avoid
   drive-by refactors unless the task explicitly asks for cleanup.
3. **Match existing patterns.** Look at a neighboring module (e.g. an
   existing `products` API route) before inventing a new pattern for
   `reviews` or `wishlists`.
4. **Never commit secrets.** `.env`, API keys, and Stripe secrets are
   gitignored — do not print or embed them in code, tests, or docs.
5. **Payments are sensitive.** Any change touching `/apps/api/src/payments`
   or Stripe webhooks needs an explicit note in the PR description
   explaining the change and how it was tested (use Stripe test mode /
   CLI, never live keys).
6. **Accessibility matters.** Storefront components must be keyboard
   navigable and pass `axe` checks in CI (`pnpm test:a11y`).
7. **Mobile-first.** Design and test at 375px width before desktop.

## Pull Request Instructions

- Title format: `[area] short description` — e.g. `[cart] fix quantity
  stepper rounding bug`.
- Description must include: what changed, why, how it was tested, and any
  follow-up work deferred.
- Link the relevant task ID from `TASKS.md` (e.g. `Closes T-014`).
- CI must be green (lint, typecheck, unit, integration) before merge.

## What Agents Should NOT Do

- Do not modify `/prisma/schema.prisma` and apply a migration without
  calling it out explicitly — schema changes affect every app.
- Do not add new dependencies without checking if an existing one in
  `package.json` already solves the problem.
- Do not hardcode currency, tax, or shipping logic inline — route it
  through `/packages/config` or the relevant service so it stays
  configurable per region.
- Do not disable TypeScript or ESLint rules inline to make code compile;
  fix the underlying issue or raise it in the PR description.

## Reference Docs

- `/docs/TASKS.md` — phased task breakdown and current backlog
- `/docs/PROMPT_DESIGN.md` — how to prompt agents effectively for this repo
- `/docs/adr/` — architecture decision records (add one for any non-trivial
  technical choice)
