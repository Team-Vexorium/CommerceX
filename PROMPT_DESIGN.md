# PROMPT_DESIGN.md — Prompting Guide for CommerceX

Purpose: help anyone on the team get consistent, high-quality output from AI
coding agents (Claude Code, Claude in chat, Cursor, etc.) when building
CommerceX. Good prompts here save review time later.

## General Principles

1. **Point to the task ID.** Reference `TASKS.md` (e.g. "Implement T-024:
   product search") so the agent inherits the full context instead of you
   re-explaining scope every time.
2. **State the layer.** Say whether you want frontend, backend, schema, or
   all three — "just the API route" vs "full stack, UI included."
3. **Give the shape of done.** List acceptance criteria up front: what
   should work, what tests should exist, what's explicitly out of scope.
4. **One task per prompt.** Don't bundle "add wishlists and also fix the
   cart bug" — split them so diffs stay reviewable.
5. **Ask for a plan before code on anything non-trivial.** For schema
   changes, payment logic, or anything touching more than 2 files, ask the
   agent to outline its approach first, then approve before it writes code.

## Prompt Templates

### New feature (full stack)

```
Implement T-0XX: <feature name>.

Context: <1-2 sentences on why / where it fits>
Scope: frontend (apps/web) + backend (apps/api) + schema change if needed.

Acceptance criteria:
- <criterion 1>
- <criterion 2>
- Unit tests for new backend logic
- Loading and error states handled in the UI

Out of scope: <anything explicitly excluded, e.g. "no admin UI yet">

Before writing code, give me a short plan: files touched, schema changes
(if any), and any new dependencies.
```

### Bug fix

```
Bug: <describe observed behavior> when <steps to reproduce>.
Expected: <correct behavior>.

Relevant area: apps/<web|admin|api>/<path if known>
Please find the root cause first and explain it before patching. Include a
regression test that would have caught this.
```

### Schema change

```
I need to add <field/relation> to the <Model> in prisma/schema.prisma
because <reason>.

Please:
1. Propose the schema diff
2. Generate the migration
3. Flag any existing queries/services that need updates because of this
   change
Do not apply the migration until I confirm the diff looks right.
```

### Refactor / cleanup

```
Refactor <module/path> to <goal, e.g. "extract shared validation logic">.
Constraints: no behavior change, keep existing tests passing, don't touch
unrelated files. Show me a summary of what moved before finalizing.
```

### Code review / PR check

```
Review this diff against AGENTS.md conventions and TASKS.md T-0XX
acceptance criteria. Flag: missing tests, style violations, accessibility
issues, and any payment/security concerns. Don't rewrite the code, just
list findings.
```

## Domain-Specific Prompting Notes

- **Payments (Stripe):** Always specify "test mode" explicitly and ask the
  agent to reference Stripe's current API docs rather than relying on
  memory — Stripe's API evolves. Never paste live keys into a prompt.
- **Pricing/tax/discount logic:** Ask for the calculation logic to be
  written as pure, unit-testable functions separate from the request
  handler — makes edge cases (stacked discounts, rounding) much easier to
  verify.
- **Search/filtering:** Give 2-3 example queries you expect to work (e.g.
  "red shoes under $50") so the agent can validate against real cases
  instead of guessing at requirements.
- **Admin bulk actions:** Explicitly ask for confirmation dialogs and
  undo/audit logging — bulk edits/deletes are the highest-risk admin
  feature.

## Things to Avoid in Prompts

- Vague scope: "make the checkout better" → instead name the specific
  problem ("checkout fails to show shipping options for non-US addresses").
- Skipping acceptance criteria on anything involving money, inventory, or
  auth — these need explicit correctness checks, not "looks right."
- Asking for a feature and a refactor in the same prompt.
- Letting the agent choose a new library/framework silently — ask it to
  flag any new dependency before adding it.

## Review Checklist Before Merging Agent-Generated Code

- [ ] Matches `AGENTS.md` code style and structure conventions
- [ ] Tests included and passing (`pnpm test`)
- [ ] No secrets or live API keys in the diff
- [ ] Payment/auth changes reviewed by a human, not just the agent
- [ ] Mobile layout checked for any UI change
- [ ] Task status updated in `TASKS.md`
