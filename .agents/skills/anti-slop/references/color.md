# Color

Colour in an interface is a signalling system first and decoration second.
Evidence tags are defined in [core-contract.md](core-contract.md).

## Roles

### Assign colour by role `[convention]`

Name colours by what they do, not what they are: surface (and raised surface),
text (primary, secondary, disabled), border, accent/brand, interactive, and
status (success, warning, danger, info). Components reference roles; roles
reference palette values.

- **Why:** roles make meaning consistent, make theming and dark mode possible,
  and stop one-off hex values multiplying.
- **Signs:** raw hex or palette classes (`#6366f1`, `text-gray-400`) scattered
  through components; the same grey spelled five ways; status colours reused as
  decoration.
- **Fix:** route through the project's token mechanism. In refine, map literals
  to the nearest existing token before inventing one.

### Accent means something `[convention]`

Reserve the most saturated colour for the thing it should signal: usually
primary actions and current selection. If the accent is also on headings,
icons, borders, and backgrounds, it no longer signals anything
(see emphasis budget in [design-principles.md](design-principles.md)).

- **Exceptions:** brand-led marketing pages and expressive products can use
  brand colour broadly as identity. Then pick a different, reliable signal for
  "primary action" (shape, weight, a contrasting colour).
- **Signs:** more than one saturated hue competing in a view without distinct
  meanings; the primary button the same colour as decorative elements.

### Status colours are reserved `[convention]`

Red/danger, amber/warning, green/success, and blue/info carry learned meaning in
many contexts. Do not use a status hue decoratively where it could be misread,
and do not rely on the hue alone (see below). These meanings are cultural, not
universal: in several East Asian markets red marks rising prices. Follow the
product's domain.

## Contrast and non-colour cues

### Text contrast `[standard]`

WCAG 2.2 AA (1.4.3): text needs a contrast ratio of at least **4.5:1** against
its background; **3:1** for large text (at least 18pt, about 24 CSS px, or 14pt
bold, about 18.66px). Exempt: disabled controls, pure decoration, logos.

- **Signs:** light grey body text on white (`#9ca3af` on `#fff` is about 2.5:1);
  placeholder text used as the only label; white text on a light or mid-tone
  accent; text over images or gradients with no scrim.
- **Fix:** darken the text or change the background. For text over imagery, add
  a solid or gradient scrim and check the worst-case region.
- **From source:** compute the ratio when both colours are literal or resolvable
  tokens. If the pair depends on cascade, opacity, or an image, record it as
  insufficient evidence instead of guessing.

### Non-text contrast `[standard]`

WCAG 1.4.11 (AA): the visual information needed to identify user interface
components and their states, and meaningful graphics, needs at least **3:1**
against adjacent colours. This covers input borders (when the border is what
identifies the field), focus indicators, checkbox and toggle states, icons that
carry meaning, and chart elements.

- **Signs:** inputs defined only by a `#e5e7eb` border on white; a toggle whose
  on and off states differ by a faint tint; pale icon-only buttons.

### Never colour alone `[standard]`

WCAG 1.4.1 (A): colour must not be the only visual means of conveying
information, indicating an action, or distinguishing an element. Roughly 8% of
men and 0.5% of women of Northern European descent have a colour vision
deficiency, mostly red–green.

- **Signs:** status dots with no label; error fields marked only by a red
  border; links in body text distinguished only by hue; chart series
  distinguished only by colour; required fields marked only in red.
- **Fix:** add a second cue: text, icon, shape, underline, pattern, position.

### Contrast ratios are a floor, not a quality measure `[judgment]`

The WCAG formula is a luminance ratio and does not track perceived contrast
perfectly, especially for dark themes and thin text. Meeting 4.5:1 does not
guarantee comfortable reading; treat it as the minimum and prefer more for body
text. Other contrast models exist (for example APCA) but are not normative;
do not cite them as requirements.

## Building palettes

### Work in a perceptual space `[empirical]` `[convention]`

HSL lightness is not perceptual lightness: yellow and blue at the same HSL `L`
differ greatly in apparent brightness, so HSL-generated ramps are uneven.
OKLCH/OKLab (CSS Color 4) are designed to be closer to perceptually uniform, so
equal lightness steps look more equal and hues can change while lightness holds.

- **Applies:** generating tint/shade ramps, matching the weight of different
  status hues, deriving hover and pressed states.
- **Exceptions:** do not convert an existing palette's notation in refine. Use
  what the project uses; check browser support requirements.

### Neutrals do most of the work `[convention]`

Most of an interface is neutral surface and text. A small neutral ramp (often
tinted slightly toward the brand hue for cohesion), one accent with a few
shades, and the status set is sufficient for most products.

- **Signs of an incoherent palette:** many unrelated hues at similar saturation;
  greys from different families (blue-grey beside warm grey); tints that are not
  from any ramp.
- **Not a rule:** a specific ratio of dominant to accent colour (such as
  "60-30-10") is a folk heuristic `[judgment]`, occasionally useful, never a
  finding.

### Colour is relative `[empirical]`

The same colour appears different depending on what surrounds it (simultaneous
contrast; Albers). A grey looks warmer beside blue; an accent tuned on white
shifts on a dark surface. Evaluate colours in their context, and when you cannot
see the result, be modest about colour-harmony claims.

### Brand colour is a constraint `[convention]`

Preserve brand colours. If a brand colour fails contrast as text or on a button,
do not replace the brand; change how it is used (as a background with dark text,
a darker shade from the same hue for text, or as a non-text accent).

## Dark mode

### A dark theme is a re-mapping, not an inversion `[convention]`

- Elevation reverses: higher surfaces get *lighter*, since shadows barely show
  on dark backgrounds.
- Reduce saturation and lightness of accents tuned for light backgrounds; fully
  saturated colours on dark surfaces vibrate and often fail contrast as text.
- Many systems avoid pure black backgrounds with pure white text for long
  reading, using a very dark grey and off-white. Pure black is fine by choice
  (OLED, high-contrast styles).
- Recheck every contrast pair; passing in light mode says nothing about dark.
- Reading small text is measurably easier dark-on-light than light-on-dark,
  and the gap grows as text shrinks `[empirical]` (see
  [findings.md](findings.md)). In a dark theme, make body text larger and
  brighter than you would in light, and prefer a light theme for long reading.
- Shadows, borders, and images need their own treatment.

- **Signs:** dark mode produced by `filter: invert()` or by swapping only
  background and text; hard-coded colours that ignore the theme; borders that
  vanish; coloured text that passed on white now failing.
- **Fix:** define every colour role per theme; reference roles, never literals.
- **Scope:** do not add a dark mode nobody asked for. Do not break one that
  exists.

## Gradients, tints, and transparency

Legitimate uses: brand identity, depth or lighting cues, data encoding
(heatmaps), image scrims, drawing the eye to one focal area. They become a
problem when applied by default with no role, when text sits on them without
checked contrast, or when they compete with content. See
[slop-patterns.md](slop-patterns.md#unmotivated-gradients).

## Quick examples

| Situation | Weak | Better |
|---|---|---|
| Build status list | Green/red dots only | Icon + "Passed"/"Failed" text, colour as reinforcement |
| Muted helper text | `#b0b0b0` on white (about 2.2:1) | A grey that reaches 4.5:1, with hierarchy from size/position |
| Brand yellow button | White label on `#facc15` (about 1.5:1) | Near-black label on the same yellow |
| Dashboard | Six chart colours also used for buttons and badges | Chart palette separate from UI roles; accent only for actions |
