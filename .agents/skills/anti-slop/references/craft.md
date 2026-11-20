# Craft: making it look good

How to produce an interface people find attractive and well made. Everything
here is craft knowledge and judgment, not research, and it never overrides
function, accessibility, or clarity.

Two ways to fail:

- **Generic:** a template nobody chose, bland or flashy.
- **Odd:** so busy avoiding the usual that the result is stark, awkward, or
  strange. Different is not the goal. Good is.

## Appeal comes first

Picture the person this is for and ask what *they* would find attractive.
Teenagers, accountants, and architects like different things. Most people like
interfaces that feel friendly, clear, and finished.

**Familiar patterns are welcome.** Cards, soft corners, shadows, gradients,
colourful accents, emoji and illustrations, progress rings, bottom tab bars,
stat tiles: people recognise and like these. Use whichever suit the product.
What makes them good or bad is execution and fit:

- Good: chosen for a reason, consistent, well spaced, with real content.
- Bad: sprayed everywhere by default, inconsistent, fighting each other.

Never drop a pattern just because it is common. If a row of stat tiles is the
clearest way to show four numbers, build great stat tiles.

## How bold to be

| Surface | Boldness |
|---|---|
| Landing pages, launches, portfolios, campaigns | High. The page is the pitch; give it a point of view and something memorable. |
| Consumer apps, onboarding, games, kids', lifestyle | High to medium. Personality is part of the product: colour, shape, warmth, delight. |
| Editorial and content | Medium. Expression through typography and imagery; quiet chrome. |
| Everyday product UI and dashboards | Medium to low. Polished and pleasant; a couple of signature details; clarity first. |
| Dense expert tools, admin, internal consoles | Low. Precision and speed. Do not decorate. |

An existing brand or design system sets the direction: express within it. The
user's words override this table.

## Your first idea is everyone's first idea

A model's first answer to a design request is the most common answer to it.
That is how sameness happens: every individual result looks fine, and they all
look alike (research on this is in [findings.md](findings.md)). So treat the
first palette, typeface, and layout that occur to you as the default to move
away from, not the starting point to polish. Name it, then choose something
from this product's world instead. Moving off the default applies to the look
and the focal element; the page's structure and controls stay conventional
(see "Bold without odd" below).

## A direction and one special thing

Before styling, settle the **feel** in two or three words drawn from the
product and audience ("warm, playful, encouraging"; "sharp, fast, technical").
Let every choice serve that feel.

Then choose **one thing to make special** and give it most of your care: the
hero, the main number, the primary card, the chart, the product itself shown
large. One excellent focal element lifts a whole page. It can be a familiar
element done unusually well; it does not have to be a novel concept.

Where the surface is bold, it helps to have an idea drawn from something true
about the product, for example:

- A tide-times app for sea swimmers: one curve across the full width with
  today's high and low set on it in large numerals.
- A seed-swap marketplace: each listing as a printed seed packet.
- A language tutor: the learner's own sentence with corrections in the margin.

These illustrate the method; never reuse them. And do not force a concept:
a clear, handsome, conventional design beats a clever one that reads as weird.

## Bold without odd

Research on aesthetics points to one rule above the others: **spend novelty
where people look, not where they act.** Keep the skeleton of the page, the
navigation, and the controls conventional, so the page is recognisable at a
glance and usable without thought. Put the invention into the focal element,
the imagery, the type, and the colour. Then:

- one standout per view, with everything else quiet to pay for it;
- the unusual thing must be the *easiest* thing to read, not the hardest;
- it should make sense within a couple of seconds, and the sense should relate
  to the product.

The evidence, the full set of rules, and a table for diagnosing a design that
feels off are in [striking-or-odd.md](striking-or-odd.md). Read it for any
surface in the top two rows of the table above.

## Levers

**Show the product.** On marketing and onboarding surfaces, the real thing
(the screen, document, chart, or object the product makes), built in
HTML/CSS/SVG with realistic content, is stronger than abstract decoration.

**Type.** Most of a design's personality.
- Clear contrast between heading and body; display text can be several times
  body size on bold surfaces.
- Pick a face that suits the feel. Without web fonts, system stacks still give
  range: serif (`"Iowan Old Style", Palatino, Georgia, serif`), rounded
  (`ui-rounded, "SF Pro Rounded", system-ui`), geometric (`"Avenir Next",
  Futura, "Century Gothic", sans-serif`), humanist (`Optima, Candara, "Gill
  Sans", sans-serif`), mono (`ui-monospace, "SF Mono", Menlo, monospace`).
  Always end with sound fallbacks.
- Tight leading on large headings, comfortable leading on body.

**Colour.** Pick a palette with a mood, not just grey plus one button colour.
- Take the palette from the product: what its name suggests, the materials and
  places of its domain, the things it handles. That is nearly always a better
  source than a colour you like.
- A tinted or coloured background, a rich dark theme, or a two- or three-colour
  scheme can all work. So can a tasteful gradient.
- Give colours jobs (background, surface, text, accent, status) and keep
  accents meaningful.
- Harmonise: related hues, consistent saturation, neutrals tinted toward the
  palette. Check text contrast.
- Watch for your own habit. Cream paper, a serif headline, and a sage or
  terracotta accent is a lovely palette and is fast becoming the next
  recognisable default. Use it when the product's world calls for it, not
  because it is safe.

**Depth and shape.** Soft shadows, layered surfaces, and rounded corners make
interfaces feel tangible and friendly. Use one consistent radius scale and one
shadow scale; sharper and flatter for technical products, softer and rounder
for friendly ones.

**Layout.** Clear structure with a strong focal point. Generous but purposeful
spacing. Variety in rhythm: not every section the same size and shape.
Asymmetry and oversized elements are options on bold surfaces.

**Imagery and icons.** One consistent icon set, or emoji where the tone is
playful. Illustrations, avatars, and thumbnails add warmth; draw simple ones in
SVG or CSS when no assets exist.

**Motion.** Small, quick transitions on hover and state change make things feel
alive; one delightful moment (a check that pops, a number that counts up) is
plenty. Respect `prefers-reduced-motion`.

**Voice.** Specific, human microcopy. Do not invent facts, prices, customers,
or numbers.

## Finish checklist

Polish is most of the difference between good and mediocre. Before stopping:

- Spacing comes from one scale; equal things have equal gaps; nothing touches
  an edge or crowds a neighbour.
- Everything lines up: shared left edges, baselines, consistent card heights
  in a row.
- Type sizes and weights come from a small set and the hierarchy is obvious.
- Colours come from the palette; no stray greys; text is comfortably readable.
- Radii and shadows are consistent across components.
- Interactive things have hover, focus, and pressed states.
- Content is realistic and fits its containers: no awkward wrapping, orphaned
  words in headings, clipped text, or empty-looking areas.
- It holds together at phone width and on a wide screen.
- Nothing looks accidental: stray lines, misaligned icons, elements floating
  with no relationship to anything.
- No box is taller or wider than what it holds needs. A card with one number
  in it and a field of empty space below reads as unfinished.
- Every change figure says what it is compared with.

## Checks

- **Appeal:** would the intended user call this good looking?
- **Odd check:** would an ordinary person find anything strange, harsh, bare,
  or confusing? If yes, find which row of the table in
  [striking-or-odd.md](striking-or-odd.md) it fails, and fix that.
- **Generic check:** is there at least one thing here that was clearly made for
  this product?
- **Focal check:** is the special element still special?
- **Floor:** contrast, focus, labels, and the main action's clarity all hold.

## When to hold back

- An existing system or brand: work inside it.
- A work tool: quiet craft.
- A small request: do the small thing well.
