# Workflow: create

Build a new interface that people will want to use and look at. Read
[references/details.md](../references/details.md) and
[references/craft.md](../references/craft.md) alongside this file. That is all
the reading this workflow needs; open another reference only for a specific
question.

## 1. Know the product

From the request and the project: what it is, who uses it and how often, the
one to three things this screen is for, and what real content looks like
(realistic names, numbers, lengths, volumes). If real content is missing, write
believable domain-specific stand-ins and say they are placeholders. Do not
invent customer logos, testimonials, or performance claims.

If the project already has UI, it has a design system, written or not: follow
it ([references/design-systems.md](../references/design-systems.md)), and make
the new screen belong.

## 2. Name the default, then choose a direction

**First, write down the default.** In one line each, describe the version of
this screen that any model would produce for this request: its palette, its
typeface, its layout, and its focal element. (For a recipe site, say, that
might be: a cream background, a serif headline, a green accent, and a grid of
equal photo cards.) That is what the
user gets without you, and it is your own first idea too: the first thing that
comes to mind is the most common answer, by construction.

Then go down the list. A familiar layout is usually right, so keep it when it
fits. What must not stay default is the **identity** and the **focal
element**: take the tint, the accent, the typeface, and the main element from
this product's world, and hold everything else to the quiet standard in
details.md. Different is not the goal; specific and well finished is.

**When the brief dictates the sections,** as detailed briefs do, the structure
is not yours to change, and the difference has to come from what the brief left
open:

- the identity: the colour world, the typefaces, the shape language;
- the hierarchy among the required pieces: which one is largest and first, and
  which are quiet;
- how the main element is drawn: the chart, the hero figure, the key card;
- the content: realistic, specific data and words that fit this product;
- the finish.

A required list of sections is a list of contents, not a layout. "Four KPI
cards" does not mean four identical boxes in a row.

Then, using craft.md, decide in a few lines before writing code:

- **How bold** this surface should be.
- **The feel**: two or three words that come from the product and audience.
- **The look that delivers it**: type, colour, shape, density, and which
  familiar patterns you will use.
- **One thing to make special**: the element that will get the most care.

Aim for what a person in the target audience would find attractive, not for
what is most unusual. If an obvious, well-loved layout fits the job, use it and
make it excellent.

## 3. Structure

Rank the content: what matters most gets the most size, weight, and the best
position. Pick components from the content's shape: comparable records in a
table, a collection of objects in cards or a list, a sequence in steps, one
decision in a focused form. Let the amount of content decide the number of
items, not the grid.

## 4. Build it properly

- Follow details.md for every small decision: weights, case, numbers, colour
  roles, wording, icons, shape, data, motion.
- A small consistent system: a handful of type sizes, a spacing scale, a colour
  set with roles, one radius and shadow vocabulary. Put them in variables.
- Use the project's stack. Add no dependencies without saying so.
- Every state the user can reach: hover, focus, pressed, disabled, loading,
  empty, error, long text.
- Works at phone width and on a wide screen.

## 5. Accessibility floor

Build these in from the first line:

- Native elements: `<button>` for actions, `<a href>` for navigation, real
  `<label>`s on inputs, real `<table>` for tabular data, headings in order.
- Every control has a name; images have `alt`; icon-only buttons have a label.
- Text contrast at least 4.5:1 (3:1 for large text and for control boundaries
  and meaningful icons).
- Never colour alone for status or errors: add text or an icon.
- A visible `:focus-visible` style; nothing that traps or hides focus.
- Targets at least 24×24 px, larger for touch.
- `lang`, a real `<title>`, a viewport that allows zoom.
- Honour `prefers-reduced-motion`.

For anything beyond this, see
[references/accessibility.md](../references/accessibility.md).

## 6. Look, then polish

If you can see the page rendered, look at it now at desktop and phone width.
Whether or not you can, go through the final pass in details.md and the
finish checklist in craft.md. Then ask:

- Is the identity this product's own (tint, accent, typeface, focal element),
  or the default you wrote down in step 2?
- Would the intended user find this good looking?
- Is the most important thing the most prominent thing?
- Do the numbers agree with each other (a total and the figures it sums, a
  headline figure and its chart)?
- Does anything spill out of its container, overlap, or get cut off? Check the
  edges of every card in the screenshot.
- Does anything look odd, harsh, cramped, empty, or unfinished? Fix it.
- Is the special element actually special, or did it get watered down?

## 7. Report

A few lines: the direction and why, assumptions and placeholders, and what you
could not check.
