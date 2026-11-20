# Details: the house rules

The small decisions that make a screen look designed. Where the rest of this
skill asks for judgment, this file gives answers. Follow it by default in
create and refine; depart from a rule only when the product's own brand or
system says otherwise, and say that you did.

The look these rules produce: **quiet chrome, one accent, and one place where
the richness goes.** Navigation, buttons, borders, and labels stay calm and
neutral. Colour, detail, and craft are concentrated in the one or two things
the screen is about: the main chart, the key figure, the product shown in a
hero.

The starting values come first, then the rules for using them. Where
[values.md](values.md) differs, this file wins.

## Starting values

Use these when the project has no system of its own. They are where the look
comes from; do not substitute rounder, bolder, or greyer values from habit.

### Neutral ramps

Pick one ramp by the product's world and use it for every surface. Graphite
for apps with no strong world; warm for paper, food, craft, shops, anything
human; ink for technical, night, sky, water. Cards are never pure white on a
grey page in a warm world, and never pure black anywhere.

Light:

| Role | Graphite | Warm | Ink |
|---|---|---|---|
| Page background | #fafafa | #f7f4ee | #f5f7fa |
| Card | #ffffff | #fdfbf7 | #ffffff |
| Raised: active row, input, inset tile | #f4f4f5 | #efe9df | #eceff4 |
| Primary text | #171717 | #1f1b16 | #111827 |
| Secondary text | #525252 | #5e554a | #4b5565 |
| Muted text and icons | #737373 | #7b7266 | #6b7487 |

Dark:

| Role | Graphite | Warm | Ink |
|---|---|---|---|
| Deepest surface: sidebar | #0f0f10 | #12110f | #07080d |
| Page background | #141415 | #161513 | #0b0d14 |
| Card | #19191b | #1c1a18 | #11141c |
| Raised: active row, input | #232325 | #262421 | #1a1e28 |
| Primary text | #ededed | #efe9de | #eef0f5 |
| Secondary text | #a1a1a6 | #aaa398 | #a3a9b8 |
| Muted text and icons | #85858b | #8a847a | #7a8296 |

Hairlines are the primary text colour at 8% opacity. Positive is #16a34a on
light and #4cc38a on dark; negative is #dc2626 on light and #e5484d on dark.
Status in a table is a small dot plus plain text, not a pill.

Keep the theme the screen had (dark stays dark, light stays light) unless
asked. Do not make the page follow the system theme.

### Accent

Without a real brand colour, take one from the world: amber, coral, or ember
for warm; cobalt, teal, or clear sky blue for cool; moss or sage for natural.
Not purple to blue. Text on it reaches 4.5:1.

The accent is for the primary action, the selection, and one key figure or
bar. **Repeated links and actions are not accent-coloured and not
underlined**: "Download" in every table row, "View all", row actions are
secondary text, with a small icon if it helps.

### Type

Replace Inter and the system font when they were only defaults. Choose by
character:

| Character | Interface | Partner |
|---|---|---|
| Precise, technical, calm | Geist, IBM Plex Sans | Geist Mono, IBM Plex Mono, or JetBrains Mono for figures, ids, and metadata |
| Warm, friendly, human | Instrument Sans, DM Sans, Figtree | Instrument Serif or Newsreader for the page title or hero headline |
| Editorial, crafted | Instrument Sans | Newsreader, Instrument Serif, or Fraunces for headlines |
| Playful, bold | Space Grotesk, Bricolage Grotesque | a mono for small labels |

In a warm world, set the hero headline or the page title in the serif
partner at weight 400. It is the cheapest way to give the screen a voice.

| Use | Size | Line height | Weight |
|---|---|---|---|
| Small labels, metadata, counts | 12 | 16 | 400 |
| Secondary text, captions | 13 to 14 | 20 | 400 |
| Body, nav items, table cells | 14 to 15 | 20 to 22 | 400; 500 for the selected item |
| Card and section titles | 15 to 17 | 1.3 | 500 |
| Logo wordmark | 16 to 18 | 1 | 500 to 600 |
| Hero subhead | 18 to 20 | 28 to 30 | 400, secondary colour, at most 36rem wide |
| Card figures | 28 to 32 | 1 | 500, tabular |
| Page title | 28 to 36 | 1.15 | 400 to 500 |
| Hero headline | 56 to 72, 36 to 44 on phones | 1.02 to 1.08 | 400 to 500 |

Nothing on the screen is weight 600 except the wordmark and rare emphasis.
No figure is larger than 40px outside a hero. Letter spacing is 0 under
16px; -0.02em from 40px; -0.03em from 56px.

### Layout

- Spacing scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- Sidebar 240 to 280 wide, on the deepest surface; content fluid with 24 to
  32 padding; page header 56 to 64 tall.
- Nav rows 32 to 36 tall, 2 to 4 apart; group labels 24 above, 8 below.
- Card padding 20 to 24. Table rows 40 to 44.
- Stat cards: three or four in a row, one height, compact, numbers only.
- The main chart takes at least two thirds of the width, 280 to 360 tall.
- Hero: 96 to 128 from navigation to headline on desktop; hero buttons 44 to
  48 tall; nav buttons 32 to 36.

### Shape, icons, depth

- Radius: tags and small buttons 4 to 6; rows, inputs, buttons 8 to 10;
  cards 12 to 16; panels 14 to 20.
- Icons: lucide-style line icons drawn inline as SVG, 16 or 18px, stroke 1.5,
  in the muted or secondary text colour, 8 to 10px from the label.
  **Navigation items keep an icon each**: replace emoji with line icons, do
  not just delete them.
- Light depth: `0 1px 2px rgba(0,0,0,0.05)` for small things,
  `0 8px 24px rgba(0,0,0,0.06)` for a floating panel. Dark depth: surface
  steps and hairlines only.
- Primary button: on light, the primary text colour as fill with white text,
  or the accent; on dark, an off-white from the ramp with dark text.
  Secondary: the raised surface with a hairline.
- Motion: one curve, `cubic-bezier(0.22, 1, 0.36, 1)`; 120 to 180ms for
  hover and press; 300 to 500ms for one entrance.

## One drawn thing

Every screen gets one object drawn with real care, taken from the product,
and it is where the detail goes. In a hero it is the product panel. In an
app it is the thing the screen is about: the payment card on a billing page
(chip, masked number, expiry), the main chart, the open conversation. Give
it the best spacing, a soft shadow or an inset surface, and plausible
content.

- A hero product panel is compact: a title row, two or three figures on
  inset tiles, and three to five rows. It is not a full data table, it does
  not fill the column top to bottom, and the whole hero fits in the first
  screen with air around it.
- The logo keeps a small flat mark beside the wordmark: a simple shape in
  the accent or text colour that relates to the product.
- Do not strip the screen to bare text. Removing decoration is half the job;
  the drawn thing, the icons, the mark, and the type are the other half.

## Type

- Weights 400 and 500 for everything, headings included. No 600 to 900
  headings. Heavy type everywhere is the fastest way to look generated.
- Hierarchy comes from size and colour first, weight last.
- Sentence case throughout. Section labels, stat labels, nav groups, and chart
  ticks are not uppercase and not letter-spaced. `NAVIGATION` becomes
  `Navigation`; `MON` becomes `Mon`.
- No italics for emphasis. No gradient text.
- Small text is never tightened; only large display text takes negative
  tracking.
- A display serif, if used, is for the headline only, never for labels or
  buttons.
- One family for the interface, plus at most one partner: a mono for figures
  and metadata, or a display face for the headline.

## Numbers

- `tabular-nums` wherever figures line up or change.
- One format per screen. If one amount is `$48,210`, another is not
  `$124,860.40`. No leading zeros: `7`, not `07`.
- Every change states its baseline: `+12% vs last month`, `3 fewer than last
  week`. Never a bare `+12%`.
- Sample data is plausible and uneven: real-sounding names, amounts that are
  not round, dates that fall in sequence.

## Colour

- One neutral ramp for background, surfaces, borders, and text, tinted very
  slightly toward the product's world (warm for paper, craft, food; cool for
  technical, night, water). The tint is felt, not seen: a surface never reads
  as a colour.
- In apps and dashboards, surfaces stay neutral. The product's colour appears
  in the accent and the focal element, not in the backgrounds.
- Three text roles: primary, secondary, muted.
- One accent, taken from the product (its name, its domain), used on a few
  percent of the screen: the primary action, the current selection, the one
  figure or bar that matters.
- Status colours carry meaning only, and are toned down to sit with the
  palette.
- Remove: hue-to-hue gradients on surfaces, gradient text, coloured glows and
  coloured shadows, colour washes and blurred blobs behind content, bright
  coloured borders.
- A gradient is acceptable only as a slight shift within one neutral.
- Borders are hairlines from the ramp. On dark themes, depth comes from
  stepping the surface lighter, not from shadow.
- A dark primary button can be an off-white from the ramp with dark text,
  leaving the accent for something smaller. It usually looks more deliberate
  than a coloured button.

## Words in the interface

Interface microcopy is not protected content. Clean it, and list what you
changed. Facts, figures, names, legal text, and marketing claims are still
governed by the core contract.

- No exclamation marks. `+12%!!` becomes `+12% vs last month`.
- No greeting as a page title. `Welcome back, Sam! 👋` becomes the thing the
  page is about: its name, or the period it covers (`November 2026`).
- Short labels: `Search`, not `Search anything...`.
- Headings, labels, buttons, and captions end without a full stop.
- No hype words (supercharge, seamless, unlock, revolutionise, next-gen) and
  no "AI-powered" as decoration. Say what the thing does.
- Badges such as `PRO`, `New`, `Beta` are removed unless they are true and
  needed, and then they are plain small text, not pills.
- Claims that cannot be checked (`Loved by 10,000+ teams`, `10x faster`, star
  rows) are removed and listed for the user to confirm.

## Icons

- No emoji in the interface: not in navigation, labels, badges, buttons, or
  stats.
- One line-icon set, one size, one stroke weight, coloured like the text
  beside it. If the project has a set, use it.
- Every icon sits in a box of the same width, so labels start on one line.
- Icons that only decorate a heading or card title are removed. A category
  that needs marking gets a small dot.

## Spacing and alignment

- Every value on the 4px scale. One-off values (`13px`, `31px`) are replaced.
- Identical things are identical: every row in a list has one height and one
  gap; every card in a row has one padding.
- Space inside a group is clearly smaller than space between groups.
- Icons in one column, labels on one line, numbers right-aligned in one
  column.
- Navigation is the densest part of an app: compact rows, small gaps, group
  labels closer to their own items than to the group above.
- No box is larger than its content needs.

## Shape

- Not everything is a pill. Radius grows with the element; nested corners
  follow inner = outer − padding.
- Buttons, inputs, and rows share one control radius; cards share another.
- Counts and metadata are quiet text, often mono and muted, not glowing chips.
- The selected state is a small surface step, not a gradient or a glow.

## Data

- A stat card is a label, a figure, and a change with its baseline. No
  sparkline, mini-bar, or icon added to fill it.
- One chart is clearly the main one. Other data nearby takes a different,
  smaller form: a ranked list with thin bars, a short table.
- One accent per chart, on the thing that matters (the current period, the
  series being tracked). Everything else in neutral steps. Several hues only
  when series must be told apart, and then one leads.
- Muted grid, muted axis labels, sentence-case ticks. No rainbow bars, glowing
  bars, or pill-shaped bars.
- Vary the widths. Equal cards side by side with the same kind of content read
  as a template: three or four compact figures above one wide chart, or a wide
  chart beside a narrow list.
- An app fills the viewport like an app: sidebar and fluid content, as long as
  its content. Never a narrow centred column, and never a mock window floating
  on a backdrop unless the original was one.

## Landing page hero

- An asymmetric split: text on one side, the product on the other with at
  least half the width. Or text above a large product view. Everything stacked
  and centred is the template; keep it only for a short hero with no visual.
- The visual is the product: a view, document, or result the page says it
  produces, built in code with plausible content. Decorative filler (blobs,
  orbs, glows, abstract 3D) is removed, not framed.
- The headline says what the product does, in words that would not fit
  another product, using facts already on the page.
- One primary action and at most one secondary. Nothing stacked beneath them.
- Navigation is quiet: logo, links, one button. "Log in" is a text link.
- No badge pill above the headline. If the news in it is real, it becomes a
  small text link.
- The logo is the product name in the interface typeface, with a simple flat
  mark if any. No gradient wordmark, sparkle, or glowing tile.
- The first screen is composed as a whole, with no dead empty band.

## Motion

- Remove anything that loops without a reason: pulses, pings, shimmer,
  floating, parallax.
- Remove `transition: all`, bouncy easing, and scale-on-hover for cards.
- Hover is a quick colour or surface change. Press is a slight scale down.
  Menus fade and rise a few pixels.
- One easing curve, a few durations. At most one short entrance on load.

## Do not

- Replace removed decoration with new decoration, or one trend with another.
- Rename the product, or change what it is or what the screen contains.
- Invent features, claims, or data beyond clearly sample content.
- Give every product the same palette and typeface. The neutral discipline is
  constant; the tint, the accent, the typeface, and the focal element come
  from the product each time.

## Final pass

- [ ] Ramp, accent, and typeface chosen from the starting values, not left
      as Inter on white-and-grey
- [ ] Weights 400 and 500; sentence case; no uppercase tracked labels
- [ ] One number format; tabular figures; every change has a baseline
- [ ] One neutral ramp, three text roles, one accent used sparingly
- [ ] No hue gradients, gradient text, glows, coloured shadows, or blobs
- [ ] No emoji; line icons on every nav item; a flat logo mark
- [ ] Repeated links are plain secondary text, not accent, not underlined
- [ ] One drawn thing, compact and careful; nothing stripped to bare text
- [ ] No exclamation marks, greeting titles, hype words, or decorative badges
- [ ] All spacing on the scale; identical things identical; columns aligned
- [ ] Radii consistent and nested; nothing is a pill by default
- [ ] One main chart or focal element; stat cards are plain figures
- [ ] A hero shows the product; one primary action; quiet navigation
- [ ] No looping or bouncy motion
- [ ] Swap the product's name for another's: if the screen still fits, push
      the accent, the typeface, the focal element, and the words further
      toward this product

---

Many of the rules in this file are adapted from *unslop* by Damir Sokolovsky
([@heydamir](https://x.com/heydamir)),
https://github.com/heydamir/unslop, licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). They have been
rewritten, reorganised, and combined with this project's own rules. This file
is therefore offered under CC BY 4.0; keep this credit in copies and
adaptations.
