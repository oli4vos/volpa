# Example: refine, tune mode

**Request:** "Use anti-slop to fix the hierarchy and spacing in
`evals/fixtures/plain-form.html`. Keep the look as it is."

The request is narrow and says to keep the look, so this is **tune** mode:
smallest justified edits. (Asked only to "refine" this page because it "looks
thrown together", the skill would instead reinvent the visual layer around an
idea, keeping the same behaviour and content; see `workflows/refine.md`.)

The form is already accessible: labelled inputs, a fieldset with legend,
associated error and hint text, autocomplete, a visible focus style. What it
lacks is structure. So this pass adds structure and touches nothing else.

## What must not change (noted before editing)

Form `action`, `method`, `onsubmit`; every `id`, `name`, `for`,
`aria-describedby`, `aria-invalid`, `role="alert"`, `autocomplete`,
`data-testid`; all copy, options, and prices; the focus style; no new
dependencies or fonts.

## Changes (CSS only, plus one wrapper element)

**1. Headings had no hierarchy.** `h1` and `h2` were both 24px.

```css
/* before */ h1 { font-size: 24px; }  h2 { font-size: 24px; }
/* after  */ h1 { font-size: 1.75rem; line-height: 1.2; margin: 0 0 .5rem; }
             h2 { font-size: 1.125rem; margin: 2.5rem 0 1rem; }
```
*Reason: distinct text roles (typography.md).*

**2. Spacing did not show what belongs together.** Every element had the same
20px bottom margin, so a label was as close to the previous field as to its own.

```css
/* before */ input, select, textarea { margin-bottom: 20px; }
/* after  */ label, legend { display: block; margin-bottom: .375rem; }
             input, select, textarea { margin-bottom: 1.25rem; }
             .hint, .error { margin: -.875rem 0 1.25rem; }
```
*Reason: proximity is the first grouping tool; within-group gap smaller than
between-group gap (design-principles.md). Section gaps come from the `h2`
margin above.*

**3. The form ran the full width of the viewport.**

```css
/* after */ main { max-width: 34rem; }
            #phone, #bike-type { max-width: 16rem; }
```
*Reason: field width hints at expected input; a single readable column
(components.md, forms).*

**4. Three identical buttons, with "Clear form" beside "Request booking".**

```css
/* after */ button[type="submit"] { background: #0b57d0; border-color: #0b57d0; color: #fff; font-weight: bold; }
            button[type="button"], button[type="reset"] { background: #fff; }
            button[type="reset"] { border-color: transparent; text-decoration: underline; margin-left: 1.5rem; }
```
*Reason: one primary action per region; a destructive action should not look
like the default (components.md). `#0b57d0` is the colour the page already uses
for focus; white on it is about 6.4:1.*

**5. Controls were cramped.** `padding: 4px` → `padding: .5rem .625rem`, and
radio rows get `.375rem` vertical spacing. *Reason: comfortable targets
(accessibility.md, target size).*

## Deliberately left alone

- **Arial, black on white.** Plain is a valid look for a bike shop's booking
  form and no brand guidance was given. Changing the typeface would be my
  preference, not a fix.
- **All copy and prices**, including "Clear form". I would question whether a
  reset button is needed at all; that is a product decision, so it is flagged
  here and not removed.
- **The error message** shown under Email. It is static in this file
  (`aria-invalid="true"` is hard-coded); I assume real validation toggles it and
  did not touch the markup.
- **1px black input borders.** High contrast and consistent.

## Options (taste, not applied)

- A brand accent colour in place of the blue, if the shop has one.

## Not verified

Source only: I did not view the result rendered, so wrapping at narrow widths
and the overall balance are unchecked. No tests exist for this file.
