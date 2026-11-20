# Typography

Type is the interface's information architecture made visible. Decide the roles
first; choose the typeface second. Evidence tags are defined in
[core-contract.md](core-contract.md).

## Roles and scale

### A small set of text roles `[convention]`

Define roles by function (for example: display, heading, subheading, body,
secondary/caption, label, data/mono) and give each one size, weight, line
height, and colour. Use only those.

- **Why:** consistent roles let users learn what a style means; ad-hoc styles
  each cost attention and signal nothing.
- **Exceptions:** marketing and editorial pages may add one or two expressive
  display styles. Dense tools may need an extra compact role.
- **Signs:** more than about six to eight distinct font sizes in a product
  screen; sizes one pixel apart; the same role styled differently on two
  screens; inline one-off `font-size` values.
- **Fix:** list the sizes and weights in use, map each to a role, merge
  near-duplicates, express as tokens.

### Steps you can see `[convention]`

Adjacent roles should differ by enough to register. A ratio-based scale
(roughly 1.125–1.25 for dense UI, 1.25–1.5 for editorial or marketing) is a
convenient way to get there. The ratio is a tool, not a law; hand-tuned scales
are fine if the steps are distinct.

### Hierarchy with more than size `[convention]`

Weight, colour (contrast), spacing, and case all establish hierarchy. Using size
alone forces large jumps and wastes space; using everything at once is shouting.

- **Signs:** every heading bold *and* large *and* coloured; body and label text
  distinguishable only by 1px; emphasis made with colour alone.
- **Fix:** separate adjacent roles on one or two channels. De-emphasise
  secondary text with lower contrast (while still meeting contrast minimums)
  instead of shrinking it below readable size.

## Readability

### Body text size `[convention]`

About 16 CSS px is the common baseline for reading text on the web. Dense
application UI commonly runs 13–14px for data and labels. Very small text
(below about 12px) is hard for many users regardless of contrast.

- **Exceptions:** legal footnotes, chart ticks, and dense data tables, where the
  smallest practical size is the norm; still keep contrast up.
- **Signs:** long-form copy at 12–13px; important information in the smallest,
  palest style on the page.

### Line length follows the text type `[convention]`

For continuous prose in Latin scripts, roughly 45–80 characters per line is the
long-standing typographic guideline; WCAG's AAA-level criterion 1.4.8 sets 80 as
a maximum. Evidence on exact optimal length is mixed, so treat it as a range.

- **Applies:** articles, documentation, descriptions, onboarding copy.
- **Exceptions:** tables, code, dashboards, forms, navigation, captions, and
  headlines are not prose; do not constrain them to a prose measure.
- **Signs:** paragraphs spanning a full wide viewport; `max-width` missing on
  text containers; or the opposite, a narrow column forced on a data table.
- **Fix:** cap the prose container (for example `max-width: 65ch`), not the
  page.

### Line height scales inversely with size `[convention]`

Body text reads well around 1.4–1.6. Large headings need less (about 1.05–1.25)
or they fall apart; compact UI labels sit around 1.2–1.4. Longer lines need more
leading.

- **Signs:** one global `line-height` applied to both 14px body and 56px display
  text; multi-line headings with gaping lines.

### Text must survive user adjustment `[standard]`

Content must remain usable when text is resized to 200% (WCAG 1.4.4) and when
users override spacing to line height 1.5, paragraph spacing 2x, letter spacing
0.12em, and word spacing 0.16em (1.4.12).

- **Signs:** fixed-height text containers, `overflow: hidden` on text blocks,
  font sizes in viewport units only (which do not respond to zoom), text in
  images.
- **Fix:** size text in `rem`; let containers grow; for fluid type use
  `clamp()` with a `rem` component, e.g. `clamp(1.5rem, 1rem + 2vw, 2.5rem)`.

### Alignment and case `[convention]`

- Left-align running text in left-to-right languages. Centre only short
  isolated blocks (a headline, an empty state). Long centred paragraphs have a
  ragged left edge that makes each line start hard to find.
- Avoid justified text on the web unless hyphenation is well supported; it
  produces uneven word gaps.
- All-caps suits short labels and overlines, with slightly increased letter
  spacing. It is tiring for sentences.
- Large display type usually benefits from slightly tighter letter spacing;
  small text never does.

## Typeface selection

### Choose for the job, then for character `[convention]` `[judgment]`

Functional requirements first: legibility at the sizes used, the weights and
styles you need, language and glyph coverage, tabular figures if you show data,
performance and licensing. Then character: does the face's personality match
the product's?

- **Use what the project has.** An existing brand or system typeface is a
  constraint. Do not add or swap fonts in refine without being asked.
- **System font stacks are a legitimate choice** for tools and applications:
  fast, familiar, and native-feeling. They become a weakness only when the
  product needs a distinct voice and nothing else supplies it.
- **Default faces are not defects.** A widely used typeface is widely used
  because it works. The problem, when there is one, is that no typographic
  decision was made at all: one family, one or two weights, no contrast between
  roles, no relation to the product. Fix the decisions; changing the font alone
  fixes nothing.
- One family with several weights is enough for most products. Two (for example
  a display face and a text face, or a sans and a mono for data) is common. More
  needs a reason.
- Pair by contrast with a shared quality (proportion, era, x-height), not by
  near-similarity.

### Numbers and data `[convention]`

Use tabular (monospaced) figures in tables, timers, prices in columns, and
anything that updates in place (`font-variant-numeric: tabular-nums`).
Right-align numeric columns. Use a monospaced face for code, ids, and hashes.

## Responsive type `[convention]`

- Display sizes should shrink on small screens; body text should not (and may
  grow slightly). The ratio between heading and body narrows on mobile.
- Recheck line length at each breakpoint; a comfortable desktop measure can
  become 25 characters on a phone with heavy padding.
- Long words, URLs, and user content must wrap or truncate deliberately
  (`overflow-wrap: anywhere`, or truncation with the full value available).

## Quick examples

| Situation | Weak | Better |
|---|---|---|
| Settings page | Section titles 18px bold blue, field labels 16px bold, values 16px regular: three competing bold layers | Section title 16px semibold; labels 13px medium, muted; values 14px regular: one bold layer |
| Article | 14px text, full-width 140-character lines, line-height 1.2 | 17–18px, `max-width: 68ch`, line-height 1.55 |
| Metrics table | Proportional figures, left-aligned, mixed decimals | Tabular figures, right-aligned, consistent precision |
| Hero | 72px headline with line-height 1.6 wrapping to four lines | Tighter leading (about 1.1), `text-wrap: balance`, size clamped for mobile |
