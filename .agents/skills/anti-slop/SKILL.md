---
name: anti-slop
description: Research-backed UI/UX design judgment for creating, refining, and auditing user interfaces. Use when building new UI (pages, screens, components, dashboards, landing pages), improving or polishing an existing interface, or reviewing a design for hierarchy, typography, color, spacing, layout, components, interaction, or accessibility problems. Also use when the user says a UI "looks generic", "looks AI-generated", "looks like every other SaaS site", "needs polish", or asks for a "design review" or "UI audit". Sub-commands - create, refine, audit.
license: MIT
metadata:
  author: RealMrHex
  version: "0.14.0"
---

# Anti-Slop

Design judgment for interfaces. The goal is work people want to look at and
find easy to use: attractive, polished, and specific to its product.

Slop is the absence of a decision: a template applied because nothing else was
chosen. The cure is to make decisions and execute them well. It is **not** to
avoid popular patterns. Cards, rounded corners, shadows, colour, and motion
are tools; used with intent and finished properly they are often exactly
right. A strange result is not a better result.

Anti-Slop has a house standard for small details
([references/details.md](references/details.md)): quiet chrome, one accent,
and one place where the richness goes. The identity (tint, accent, typeface,
focal element, words) comes from the product each time. It adds no tooling;
you work with the tools you have.

## Routing

Pick one workflow. Read only the files listed for it.

| Intent | Workflow | Read first |
|---|---|---|
| `/anti-slop create`, "build", "design a new …" | Create | [workflows/create.md](workflows/create.md), [references/details.md](references/details.md), and [references/craft.md](references/craft.md). Nothing else up front. |
| `/anti-slop refine`, "improve", "polish", "make this look better" | Refine | [workflows/refine.md](workflows/refine.md) and [references/unslop/method.md](references/unslop/method.md), then the files they point to |
| `/anti-slop audit`, "review", "critique", "what's wrong with", "don't change anything" | Audit (no edits) | [references/core-contract.md](references/core-contract.md), [workflows/audit.md](workflows/audit.md), and [references/tells.md](references/tells.md) |

- Bare `/anti-slop` on existing UI defaults to **audit**; offer refine after.
- Any phrase that forbids changes routes to **audit**, even if "fix" appears.
- Adding a screen to an existing product is **create**, bound by the existing
  system: also read [references/core-contract.md](references/core-contract.md)
  and [references/design-systems.md](references/design-systems.md).
- Restyling a whole product is **refine** with widened scope; confirm the scope.
- Matching a reference design or extracting a design system: see
  [references/design-systems.md](references/design-systems.md).

## What matters, in order

1. It works: function, content, and logic are intact.
2. Everyone can use it: accessibility basics hold.
3. The main task and the most important information are obvious.
4. It is consistent with itself and with the project's existing system.
5. It looks good and fits this product: appealing, polished, with character.

Never trade a higher item for a lower one. Equally, do not stop at 4. A page
that works and has no appeal is unfinished, and so is one that is "distinctive"
but looks odd, harsh, or unfinished to an ordinary person.

## Principles

- **Appeal and polish count.** Aim for something a person would call good
  looking, not merely correct or different. Finish quality (spacing, alignment,
  states, real content) is most of what separates good from mediocre.
- **Decide, then commit.** One clear idea carried through beats a pile of safe
  defaults and beats a pile of quirks.
- **Familiar is fine.** Conventions exist because they work and people like
  them. Use them freely; make them yours through content, type, colour, and
  detail. Do not avoid a pattern because it is common.
- **Fit the product.** A trading terminal, a kids' app, and a magazine should
  not converge. How bold to be depends on the surface (see craft.md).
- **Respect what exists, then improve it.** In an existing product, keep the
  identity (typefaces, palette, tone), the content, and the behaviour. Layout,
  hierarchy, and finish are open to improvement. Template defaults are not
  decisions and get no protection.
- **Working comes before pretty.** If something on the page is broken, find
  out why and fix or report it before polishing.
- **Leave good work alone.** When an interface already does its job well and
  looks good, the right change is none. This is rarer than it feels: do not
  use it to avoid work the user asked for.

## Look at it

If the host gives you any way to see the rendered result (a browser or preview
tool, a screenshot command), use it before you finish, and fix what looks wrong.
Designing without looking is the main cause of odd results. If you cannot look,
say so, and keep layout mechanics simple enough to trust.

## Other references

Open one only when you have a specific question it answers. Do not read them
by default, and never read the whole set.

| File | For |
|---|---|
| [references/unslop/method.md](references/unslop/method.md) | **Refine, always.** The visual method, a third-party work included under its own licence (see that folder). With it: [signs](references/unslop/signs.md), [tokens](references/unslop/tokens.md), [visuals](references/unslop/visuals.md), [effects](references/unslop/effects.md), [refs](references/unslop/refs.md) |
| [references/details.md](references/details.md) | **Create, always.** The house rules for small details: type weights and case, number formats, colour discipline, interface wording, icons, spacing, shape, data, heroes, motion, and a final pass |
| [references/striking-or-odd.md](references/striking-or-odd.md) | Bold surfaces, or a design that feels off. What research says about why some unusual designs land and others look wrong, as eight rules and a diagnostic table |
| [references/findings.md](references/findings.md) | Individual research findings (audience differences, credibility, shape, light vs dark, charts, forms, whitespace, typography, AI sameness, example copying) with reach and what to do; plus common claims that lack support |
| [references/tells.md](references/tells.md) | **Refine and audit.** Evidence-tagged checklist of the signs people report in AI-made UI, each with how to spot it and what to do. Not for reading before you design something new. |
| [references/values.md](references/values.md) | Concrete starting numbers (spacing, sizes, type, contrast, radius, motion) when the project has none, each tagged with where it comes from |
| [references/typography.md](references/typography.md) | Type scale, readability, font choice |
| [references/color.md](references/color.md) | Palettes, contrast, dark mode |
| [references/layout.md](references/layout.md) | Spacing, density, responsive structure |
| [references/components.md](references/components.md) | Forms, tables, navigation, dashboards, dialogs |
| [references/interaction.md](references/interaction.md) | States, loading, errors, motion |
| [references/accessibility.md](references/accessibility.md) | WCAG requirements and a source checklist |
| [references/design-principles.md](references/design-principles.md) | Hierarchy, grouping, attention |
| [references/design-systems.md](references/design-systems.md) | Working inside an existing system |
| [references/rubric.md](references/rubric.md) | Structured review (audit; self-review in refine) |
| [references/slop-patterns.md](references/slop-patterns.md) | **Audit and refine diagnosis only.** A catalog of generic patterns and when they do harm. Do not consult it while creating: it is a list of things to check for, not things to avoid, and reading it before designing makes agents over-correct. |

Worked examples: [examples/](examples/README.md), only if the output shape is
unclear.

## Output

- **Create:** the interface, a few lines on the direction and why, and what you
  could not verify.
- **Refine:** the changes with one-line reasons, what you left alone, and what
  you could not verify. If nothing needed changing, say so and change nothing.
- **Audit:** findings in the schema in [workflows/audit.md](workflows/audit.md).
  No file edits.

Always say whether you saw the result rendered or worked from source only. No
numeric aesthetic scores.
