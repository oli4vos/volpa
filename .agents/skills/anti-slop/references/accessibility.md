# Accessibility

Accessibility is a precondition of the design, not a cleanup pass. Generated
front-end code should not be assumed accessible because it was asked to be.
The baseline here is WCAG 2.2 Level A and AA. Items tagged `[standard]` cite
the success criterion; everything else is supporting practice. Tags are defined
in [core-contract.md](core-contract.md).

**Limits.** From source you can find many failures; you cannot establish
conformance. Never write "WCAG compliant" or "fully accessible". Report specific
failures found and specific checks passed, and say what was not tested
(screen-reader behaviour, real focus order, rendered contrast).

## Semantic structure

- **Use native elements** `[standard]` `[convention]`: `<button>`, `<a href>`,
  `<input>`, `<select>`, `<dialog>`, `<nav>`, `<main>`, `<table>`. They carry
  role, state, focus, and keyboard behaviour for free (WCAG 1.3.1, 4.1.2). Add
  ARIA only when no native element fits; incorrect ARIA is worse than none.
- **Headings describe structure** `[standard]` `[convention]`: headings must be
  real heading elements and describe their section (1.3.1, 2.4.6). One `<h1>`
  per page and no skipped levels is strong convention, not a strict
  requirement. Choose heading level by structure and style it with CSS; never
  pick a level for its size.
- **Landmarks** `[convention]`: `<header>`, `<nav>`, `<main>`, `<footer>`; a
  skip link or equivalent to bypass repeated blocks (2.4.1 `[standard]`).
- **Lists and tables are marked up as such** `[standard]` (1.3.1).
- **Page basics** `[standard]`: `lang` attribute (3.1.1), descriptive `<title>`
  (2.4.2), viewport meta that does not disable zoom (1.4.4).
- **Reading order** `[standard]`: DOM order matches visual and logical order
  (1.3.2, 2.4.3). CSS reordering (`order`, absolute positioning) must not
  scramble it.

**Signs:** `<div onClick>`; headings made from styled `<div>`/`<p>`; `<h4>`
chosen because it is small; `role="button"` on a div without key handlers;
`user-scalable=no`.

## Names and labels

- **Every control has an accessible name** `[standard]` (4.1.2): visible label,
  or `aria-label`/`aria-labelledby` for icon-only controls.
- **Inputs have programmatic labels** `[standard]` (1.3.1, 3.3.2):
  `<label for>` or wrapping label. Placeholder is not a label.
- **Visible label is part of the accessible name** `[standard]` (2.5.3): do not
  give a "Search" button `aria-label="Submit query"`.
- **Images** `[standard]` (1.1.1): informative images have `alt` describing
  their content or function; decorative ones have `alt=""`. Icon fonts and
  inline SVGs that are decorative are `aria-hidden="true"`.
- **Links say where they go** `[standard]` (2.4.4): not bare "click here" or
  "read more" without context.

## Keyboard

- **Everything operable by keyboard** `[standard]` (2.1.1), with **no trap**
  (2.1.2) and a **logical focus order** (2.4.3).
- **No positive `tabindex`** `[convention]`: it overrides natural order and
  nearly always breaks it. Use `0` to add to the order, `-1` for programmatic
  focus.
- **Custom widgets follow expected key patterns** `[convention]` (WAI-ARIA
  Authoring Practices): arrows within tabs, menus, and radio groups; Escape
  closes overlays; Enter/Space activate.
- **Dragging has an alternative** `[standard]` (2.5.7): any drag interaction
  also works with single clicks or taps.

## Focus

- **Focus is always visible** `[standard]` (2.4.7). Never remove the outline
  without an equally visible replacement. Use `:focus-visible` to avoid showing
  rings on mouse click while keeping them for keyboard.
- **Focus indicator contrast** `[standard]` (1.4.11): at least 3:1 against
  adjacent colours. A 2px outline with offset in a contrasting colour is a
  reliable pattern; WCAG's stricter Focus Appearance criterion (2.4.13) is
  Level AAA.
- **Focus is not hidden** `[standard]` (2.4.11): sticky headers, footers, and
  cookie banners must not entirely cover the focused element
  (`scroll-padding` helps).
- **Manage focus on change** `[convention]`: into a dialog on open and back to
  the trigger on close; to new content after route changes or after an inline
  action removes the focused element.

**Signs:** `outline: none` / `outline: 0` / `focus:outline-none` with no
`focus-visible` style; focus ring the same colour as the background; clipped by
`overflow: hidden`.

## Colour and contrast

Thresholds and guidance are in [color.md](color.md#contrast-and-non-colour-cues):
4.5:1 text, 3:1 large text (1.4.3); 3:1 for component boundaries, states, and
meaningful graphics (1.4.11); never colour alone (1.4.1).

## Target size

- **Minimum** `[standard]` (2.5.8, AA): pointer targets are at least **24×24
  CSS px**, or have enough spacing that a 24px circle centred on each does not
  overlap another target. Exceptions include links inline in text, controls
  whose size is set by the browser, and cases where a specific presentation is
  essential or an equivalent larger control exists.
- **Comfortable** `[convention]`: platform guidelines recommend larger targets
  for touch (Apple 44×44 pt; Material 48×48 dp), and WCAG's AAA criterion
  (2.5.5) is 44×44 CSS px. Prefer these for primary touch controls. Dense
  desktop tools may legitimately sit near the 24px floor.
- **Fix without changing the look:** enlarge the hit area with padding or a
  pseudo-element; keep the glyph size.

**Signs:** 16px icon buttons with no padding; adjacent text links as the only
way to act on rows in a touch UI; tiny close "×".

## Forms and errors

Covered in [components.md](components.md#forms) and
[interaction.md](interaction.md#errors). Key criteria: labels/instructions
(3.3.2), error identification (3.3.1) and suggestion (3.3.3), input purpose via
`autocomplete` (1.3.5), no redundant entry (3.3.7), authentication without a
cognitive test and without blocking paste or password managers (3.3.8).

## Responsive and adaptable

- Reflow at 320 CSS px (1.4.10); text resizable to 200% (1.4.4); tolerant of
  user text spacing (1.4.12). See [typography.md](typography.md) and
  [layout.md](layout.md).
- Do not lock orientation (1.3.4).
- Content shown on hover or focus must be dismissible, hoverable, and
  persistent (1.4.13); do not put essential content there.

## Motion and timing

See [interaction.md](interaction.md#motion): pause/stop/hide (2.2.2), flash
limit (2.3.1), `prefers-reduced-motion`. Status messages are announced without
moving focus (4.1.3).

## What refine must never do

- Remove or weaken focus styles, labels, alt text, landmarks, skip links,
  ARIA relationships, or reduced-motion rules for visual tidiness.
- Lower a contrast pair that currently passes to below threshold.
- Replace a native control with a custom one without full keyboard and name
  support.
- Shrink targets below the minimum, or move actions into hover-only UI.

## Source-level checklist

Useful when auditing code. Each item is a lead to confirm, not a verdict.

- [ ] Clickable non-interactive elements (`div`/`span` with click handlers)
- [ ] Inputs without associated labels; placeholder-only fields
- [ ] Icon-only controls without accessible names
- [ ] Images without `alt`; decorative images with verbose `alt`
- [ ] `outline: none` without a replacement focus style
- [ ] Positive `tabindex`
- [ ] Heading elements missing, or chosen for size
- [ ] Literal colour pairs below 4.5:1 (text) or 3:1 (large text, UI)
- [ ] Status or validation conveyed by colour only
- [ ] Targets under 24×24 CSS px without spacing
- [ ] Fixed widths/heights that prevent reflow or text growth
- [ ] Animations without a reduced-motion alternative
- [ ] Custom dialogs without focus management
- [ ] Missing `lang`, `<title>`, or zoom-disabling viewport
