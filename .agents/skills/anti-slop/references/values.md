# Starting values

Concrete numbers to reach for when a project has none of its own. **A project's
existing tokens always win.** Treat them as defaults to begin from, not as a look to impose;
move them to suit the direction. Each line says where the number comes from, so
you know which ones are firm.

Tags: `[standard]` WCAG 2.2 requirement · `[convention]` common across major
design systems and typographic practice · `[geometry]` follows from arithmetic
or how browsers render · `[judgment]` a reasonable default, nothing more.

## Spacing

- Scale `[convention]`: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. A 2px
  nudge inside small controls is fine.
- Within a control 4–12 · between related items 4–8 · between groups 16–24 ·
  between sections 32–64 (landing sections 80–128) `[convention]`
- The rule that matters `[empirical: proximity grouping]`: space inside a group
  is clearly smaller than space between groups, roughly half or less.
- Page padding 16 on phones, 24–32 on desktop `[convention]`

## Sizes of things

- Pointer target at least 24×24 CSS px `[standard: 2.5.8]`; 44×44 or more for
  primary touch controls `[convention: platform guidelines]`
- Rows: 32 compact, 36–40 default, 44+ touch `[convention]`
- Buttons: 32–36 in dense UI, 40–48 for primary actions `[convention]`
- Application shells fill the viewport: fixed-width navigation, fluid content
  `[convention]`. Cap the width of prose, not of the app.

## Type

- Body 16 for reading, 14–15 in app UI, 13 minimum for dense data; nothing
  meaningful under 12 `[convention]`
- A scale with visible steps, for example 12 · 14 · 16 · 20 · 24 · 32 · 48 ·
  64 `[convention]`. Six to eight sizes per product.
- Line height: 1.5–1.6 body, 1.3–1.4 UI labels, 1.05–1.2 large headings
  `[convention]`
- Prose measure 45–80 characters (`max-width: 60–70ch`) `[convention]`; does not
  apply to tables, code, or dashboards
- Letter spacing: 0 for small text; −0.01 to −0.03em only from about 40px up
  `[convention]`
- Weights: two or three per product. Hierarchy first from size and colour, then
  weight `[convention]`
- Numbers in data: `font-variant-numeric: tabular-nums`, one format per screen,
  right-aligned in columns `[convention]`
- Text must survive 200% zoom and user spacing overrides: size in `rem`, no
  fixed-height text boxes `[standard: 1.4.4, 1.4.12]`

## Colour

- Text contrast at least 4.5:1; 3:1 for large text (24px, or 18.66px bold)
  `[standard: 1.4.3]`
- Control boundaries, focus indicators, and meaningful icons at least 3:1
  `[standard: 1.4.11]`
- Never colour alone for status, errors, or links in text `[standard: 1.4.1]`
- Three text roles: primary, secondary, muted. Muted still meets 4.5:1
  `[convention]` + `[standard]`
- Neutrals tinted slightly toward the palette instead of pure grey
  `[convention]`
- One accent, used sparingly, for the primary action and the current
  selection `[convention]`
- Dividers and borders from the neutral ramp, quiet enough not to compete with
  content; control boundaries still need 3:1 `[judgment]` + `[standard]`
- Dark themes: raise surfaces by getting lighter, not by adding shadow; lower
  accent saturation; recheck every pair `[convention]`
- Build ramps in OKLCH so equal steps look equal `[empirical]`

## Shape and depth

- Radius grows with the size of the element: small on controls (about 4–8),
  larger on containers (about 8–16) `[convention]`
- Nested corners `[geometry]`: inner radius = outer radius − the padding
  between them. For example, a card with a 16px radius and 8px of padding takes inner corners of 8px. Equal radii on
  nested boxes look pinched.
- Shadows neutral and soft; a barely visible one for resting surfaces, a
  larger, more diffuse one for things that float `[judgment]`

## Icons

- One set, one size (16–20px), one stroke weight; colour of the text role
  beside it; a fixed-width icon box so labels align `[convention]`
- Icon-only buttons need an accessible name `[standard: 4.1.2]`

## Motion

- Hover and press 100–180ms; menus and popovers 150–220ms; entrances and sheets
  250–400ms `[convention]`. Under about 100ms feels instant; beyond about 1s
  needs a progress indicator `[convention with empirical roots: Miller 1968,
  Nielsen 1993]`
- One easing curve; ease out for entering, ease in for leaving `[convention]`
- Animate `transform` and `opacity`; avoid width, height, top, left, and
  margins `[geometry: these trigger layout on every frame]`
- Name the properties; no `transition: all` `[geometry: it animates properties
  you did not intend]`
- Honour `prefers-reduced-motion`; nothing flashes more than three times a
  second; anything moving over five seconds can be paused
  `[standard: 2.3.1, 2.2.2]`

## Charts

- Emphasise the series the reader should follow and mute the others
  `[convention]`
- Axis, unit, and period always shown; a value's change always says compared to
  what `[convention]`
- Line for change over time, bars for comparing categories, table when exact
  values matter `[convention]`
