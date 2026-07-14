# PROMPT_DESIGN.md — Prompting Guide for CommerceX (Demo Build)

Purpose: get consistent, polished output from AI coding agents while
building CommerceX as a **showcase/portfolio project** — no real backend,
payments, or infrastructure involved. Prompts should optimize for visual
polish, realistic UX, and clean, readable code, since that's what people
will actually judge.

## General Principles

1. **Always remind the agent this is a demo.** If you don't say so, agents
   may default to suggesting real databases, real payment integrations, or
   auth providers. Explicitly say "mock data only, no real backend."
2. **Reference the task ID.** Point at `TASKS.md` (e.g. "Build T-015:
   product detail page") so scope is inherited rather than re-explained.
3. **Ask for realistic mock data.** Vague placeholder content ("Product A",
   "Lorem ipsum") makes a demo look unfinished — ask for real-sounding
   names, prices, and descriptions.
4. **Prioritize visual polish in prompts.** Since there's no backend
   complexity to manage, spend your prompting budget on layout, spacing,
   micro-interactions, and responsive behavior — that's what will actually
   impress viewers.
5. **One screen/feature per prompt.** Easier to review, easier to iterate
   on the visual design if something doesn't land right.

## Prompt Templates

### Build a page/feature

```
Build T-0XX: <page/feature name>.

This is a portfolio demo — no real backend or payment processor. Use mock
data from /src/data and the fake API helpers in /src/lib.

Design direction: <e.g. "clean, modern, similar to a premium fashion
brand" or "playful, bold colors, similar to a streetwear brand">

Must include:
- <specific UI elements>
- Loading state (using the artificial delay in the mock API)
- Empty state (e.g. no search results)
- Responsive layout (mobile, tablet, desktop)

Out of scope: any real API integration.
```

### Generate mock data

```
Generate realistic mock data for <products/orders/reviews/users> —
<quantity> entries. Make names, prices, and descriptions sound like a real
<category, e.g. "home goods" or "sneaker"> brand, not generic placeholders.
Output as a TypeScript file matching the existing type in
/src/data/types.ts.
```

### Polish / visual pass

```
Do a visual polish pass on <page/component>. Improve spacing, typography
hierarchy, hover/focus states, and responsive breakpoints. Don't change
functionality — this is purely a visual refinement pass. Show me a
before/after summary of what changed.
```

### Fake checkout / order flow

```
Build the checkout flow (T-022/T-023): shipping form + fake payment form
+ confirmation screen. Validate inputs like a real checkout would (card
number format, expiry, required fields) but do NOT integrate any real
payment processor — on submit, simulate a short delay then show a success
screen with a generated fake order ID.
```

### Admin CRUD screen

```
Build the admin product management screen (T-041): list, add, edit,
delete products. Changes only need to persist for the current session
(in-memory state or localStorage) — no real database. Focus on making the
table/form UX feel like a real admin tool (sorting, confirmation on
delete, inline validation).
```

## Things to Avoid in Prompts

- Don't say just "build the checkout" without noting it's fake — the
  agent may otherwise try to wire up Stripe or ask for API keys.
- Don't accept generic Tailwind-default styling as "done" — always ask
  for a specific design direction so the demo doesn't look templated.
- Don't ask for a real auth/database setup "just to be safe" — it adds
  cost and complexity with zero benefit for a demo.
- Don't skip the responsive-design ask — a demo that only looks good on
  desktop undercuts the whole showcase.

## Review Checklist Before Calling a Screen "Done"

- [ ] Looks polished at mobile, tablet, and desktop widths
- [ ] Uses realistic mock data, not placeholder text/images
- [ ] Has loading and empty states
- [ ] No real API keys, payment processors, or backend calls anywhere
- [ ] Matches the design direction agreed on (colors, type, spacing)
- [ ] Interactions (hover, click, add-to-cart, etc.) feel responsive and
      give feedback (toast, animation, state change)