# Reported tells of AI-made UI

A concrete checklist of the signs people report when they say an interface
"looks AI-generated", each with what to look for in code and what to do about
it. Use it to **audit an existing screen** (refine step 3, audit). Do not read
it before designing something new: it lists defaults to notice, not rules for
what to build.

## What the evidence is, and is not

- **`[reported]`** means practitioners and users consistently name this sign in
  published write-ups and tool catalogs (sources in
  [`docs/research/evidence-ledger.md`](../docs/research/evidence-ledger.md)).
  It is evidence that people *notice* the sign and read it as unconsidered. It
  is not a measurement of harm.
- **Measured prevalence.** One analysis ran deterministic CSS and DOM checks
  over 1,590 recent "Show HN" landing pages: 22% showed four or more of sixteen
  such patterns, 32% two or three, 46% none or one (Krebs, 2026; the author
  estimates 5–10% false positives and notes one pattern alone proves nothing).
- **Measured perception.** In a study with 92 participants rating AI-generated
  and human-made interface prototypes without knowing which was which,
  AI-generated ones scored well on pragmatic quality (usable, efficient) and
  neutral to negative on hedonic quality, including originality (Romero et al.,
  2026, preprint, UEQ-S). The reported problem is sameness, not unusability.
- **The wider pattern.** In an experiment on writing, AI assistance raised the
  rated quality of individual pieces while making the pieces more alike (Doshi
  & Hauser, 2024). Each AI-made screen can look fine while the set converges.
- **Why it happens.** The signs are the most common defaults in public
  front-end code (framework starter palettes, popular component kits, tutorial
  layouts), so an under-specified request returns them. The well-known example
  is the indigo-to-purple palette that began as a UI kit's default button
  colour.

**Three cautions.**

1. A tell is a *default nobody chose*, not proof of anything. A product whose
   brand really is violet is not slop. Check for intent first (core contract).
2. Tells drift. Once a look becomes known as "the AI look", the next default
   takes its place. The second group below is already common.
3. Removing tells does not make a design good. A screen with none of these can
   still be bland. Fixing them is step one of refine, not the whole job.

Each line: the sign → how to spot it in code → what to do. Tags after the sign
give the basis; `[standard]` marks ones that are also accessibility failures.

## Colour and surface

- Gradients running between purple, indigo, blue, or pink on heroes, buttons, and cards `[reported]` → `linear-gradient`/`from-*`/`to-*` with indigo, violet, purple, fuchsia; the framework's default indigo as accent → one accent chosen for the product, on a solid surface
- Gradient text on headings or numbers `[reported]` `[standard: contrast unverifiable]` → `background-clip: text`, `text-transparent` → solid text colour
- Coloured glows and coloured shadows `[reported]` → `box-shadow` with a saturated colour and large blur, `drop-shadow` on icons → neutral, small shadows or a surface step
- Blurred colour blobs or radial washes behind content `[reported]` → absolutely positioned blurred circles, `radial-gradient` backgrounds → remove, or one considered background
- Glass cards everywhere `[reported]` → `backdrop-filter: blur` on in-flow panels → solid surfaces; keep translucency for real overlays
- Dark theme with neon accents as the unconsidered "cool" default `[reported]` → near-black page, saturated accent glows, no light theme reasoned about → a palette chosen for the product, either theme
- Many near-identical tints for text `[reported]` → a handful of greys a step apart, none with a role → a few named text roles
- Accent on everything `[reported]` → accent colour on headings, icons, borders, badges, and buttons at once → accent reserved for action or selection

## Type

- One default family, untouched `[reported]` → the framework's default sans with default sizes, nothing chosen → a deliberate family and scale; a default face is fine when it was chosen
- Heavy weight on every heading `[reported]` → the boldest weights used throughout → hierarchy from size and colour first, weight used sparingly
- Uppercase, wide-tracked micro-labels on everything `[reported]` → `uppercase` + `tracking-wide(r)` on section labels, stat labels, nav groups → sentence case; uppercase for the occasional short overline
- Many sizes one step apart `[reported]` → 8+ font sizes on a screen → a small scale ([values.md](values.md))
- Inconsistent number formatting in data `[reported]` → `1,204` beside `1.2k`, differing decimal places, no `tabular-nums` → one format, tabular figures

## Layout

- Centred hero: badge pill, headline, subhead, two buttons, screenshot below `[reported]` → everything `text-center` in one stacked column → a layout that gives the product real room: copy beside it, or copy above a wide view of it
- Three (or four) equal cards: icon, bold title, one vague line `[reported]` → `grid-cols-3` of identical cards → fewer, concrete points; vary size by importance; or a different structure
- A row of equal stat tiles, then equal chart cards `[reported]` → cards of one width repeating one content type → one main thing, smaller supporting things
- Everything in a card; cards in cards `[reported]` → repeated `rounded-* border shadow` wrappers → spacing and alignment for grouping; cards for real objects
- Uniform spacing everywhere, or arbitrary one-offs `[reported]` → the same gap inside and between groups; `mt-[17px]`-style values → a scale, tighter within groups than between
- Section after section at the same width, padding, and alignment `[reported]` → identical `py-*` and container on every section → rhythm that follows content

## Components

- Emoji as icons or label decoration `[reported]` → emoji in nav items, card titles, badges, stats → one icon set, or none
- Sparkle icon or "✨" for anything AI `[reported]` → remove, or an icon that explains something
- Pill badges everywhere ("New", "Pro", "Beta") `[reported]` → rounded-full chips on titles, nav, cards → remove unless real; then quiet text
- Everything fully rounded `[reported]` → `rounded-full`/large radius on buttons, inputs, cards alike → radius by element size; nested radii that add up
- Charts as decoration `[reported]` → rainbow bars, glowing bars, sparklines on every tile, no axis or unit → one accent per chart, a real axis, a chart only where a question needs it
- Unstyled component-kit defaults throughout `[reported]` → a popular kit's stock tokens with nothing themed → theme the tokens for the product

## Copy and data

- Headline that fits any product `[reported]` → "Supercharge", "seamless", "unlock", "all-in-one", "next-generation", "AI-powered" → what it does, for whom, in the product's own nouns
- A chatty greeting as the page title `[reported]` → a salutation with an emoji where the title should be → a title that says where the user is
- Exclamation marks on labels, buttons, and headings `[reported]` → plain statements
- Unsupported proof `[reported]` → user counts, uptime figures, star ratings, logo and avatar rows with no source → confirm with the user; remove or make specific
- Obviously fake data `[reported]` → round or sequential numbers, "John Doe", lorem ipsum, the same value repeated → plausible, varied sample data
- A change with nothing to compare against `[reported]` → a bare percentage → say what period or target it is measured against

## Imagery

- Abstract filler `[reported]` → blobs, orbs, glowing grids, 3D shapes, robots and brains for "AI" → show the product or something true about it
- Images that do not match their caption `[reported]` → stock photo URLs unrelated to the subject → keep the image, fix the alt text, flag for replacement (do not swap in your own drawing)
- An illustration or image attached to each section `[reported]` → keep the one that carries meaning

## Motion

- Hover lift or scale on every card and button `[reported]` → `hover:scale-*`, `hover:-translate-y-*` → a colour or surface change; motion kept for changes the user needs to follow
- `transition: all` `[reported]` → named properties; `transform` and `opacity` for movement
- Looping pulse, ping, shimmer, or float on elements with no live state behind them `[reported]` → remove
- Everything animating in on scroll `[reported]` → at most one short entrance
- No `prefers-reduced-motion` handling `[standard]` → add it

## The second generation: the "tasteful default"

Reported as the newer tell, and what a screen tends to fall back to after the
first-generation signs are stripped. Agents using design guidance, including
this skill, produce it readily, so check your own output for it.

- Cream or off-white "paper" background, a serif display face, one muted earthy accent (sage, moss, terracotta, rust) `[reported]` → the same warm-editorial look on unrelated products → take the palette and type from this product's world, not from the safe option
- Mono uppercase micro-labels and "01 / 02 / 03" numerals as stand-in sophistication `[reported]` → use only where the content is actually sequential or technical
- Bento grids of mismatched tiles as the new default layout `[reported]` → structure from content

**The test that outlasts every list:** swap the product's name for another
product's. If the screen still fits, a default made it, whichever default it
was.
