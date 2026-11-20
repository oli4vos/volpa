# Interaction: states, feedback, loading, errors, motion

An interface is a sequence of states, and the static default view is only one
of them. Evidence tags are defined in [core-contract.md](core-contract.md).

## States

### Every interactive element has all its states `[convention]` `[standard]`

Default, hover, focus-visible, active/pressed, disabled, and, where relevant,
selected, loading, and error. Focus visibility is a requirement (WCAG 2.4.7);
state changes that convey information need 3:1 contrast (1.4.11) and must not
rely on colour alone (1.4.1).

- **Signs:** only `:hover` defined; `outline: none` with no replacement;
  selected state differing from default by a faint tint; disabled controls
  indistinguishable from enabled, or enabled ones that look disabled.
- **Fix:** add the missing states using the project's existing state styles.

### Every view has all its states `[convention]`

Empty (first use, no results, cleared), loading, partial, error, and the ideal
state; plus extremes of content: very long names, missing optional data, zero,
huge numbers, many items.

- **Signs:** a list component with no empty branch; layout that only works with
  the sample data's string lengths; `undefined` or blank regions when a field
  is missing.

### Empty states orient `[convention]`

Say what belongs here, why it is empty, and what to do next, with the action.
Distinguish "nothing yet" from "no results for this filter" from "failed to
load". An illustration is optional; the explanation and action are not.

### Affordance `[convention]`

Interactive things look interactive and non-interactive things do not (see
Norman in [design-principles.md](design-principles.md)). Use the pointer cursor
and hover feedback for clickable non-native elements; do not style static
badges like buttons.

### Disabled controls `[convention]`

A disabled control gives no explanation and is often skipped by keyboard and
screen-reader users. Prefer keeping the action enabled and explaining what is
missing on activation, or state the reason next to the disabled control. Use
disabled for options that are genuinely unavailable in the current context.

## Feedback

### Acknowledge every action `[convention]`

Response-time guidance long used in HCI (Miller 1968; Card et al. 1991;
Nielsen 1993): about **0.1 s** feels instantaneous; about **1 s** keeps the
user's flow of thought, though the delay is noticed; beyond about **10 s**
attention drifts and users need progress information and a way to do something
else. These are rules of thumb, not precise thresholds.

- **Fix:** immediate pressed/pending state on the control; an indicator for
  waits over about a second; determinate progress or a time estimate for long
  operations; a clear completion message.

### Feedback near the cause, proportional to the event `[convention]`

Inline results beside the control for local actions; a transient,
non-blocking message for background success; a persistent inline message or
dialog only for things that need a decision. Messages that matter must be
announced to assistive technology (`role="status"`/`aria-live`; WCAG 4.1.3)
and must not disappear before they can be read.

- **Signs:** success shown only by a colour change; a toast as the only record
  of an error; a modal to say "Saved".

### Reversibility `[convention]`

Prefer undo to confirmation for reversible actions; confirmation dialogs become
reflexive. Reserve confirmation for destructive, irreversible, or costly
actions, and make the consequence explicit. For legal and financial
submissions, let users review and correct (WCAG 3.3.4).

## Loading

- **Show structure early** `[convention]`: render the layout and fill it in.
  Skeletons suit content whose shape is known; a spinner suits short,
  shapeless waits; neither suits a 100 ms flicker (delay the indicator
  briefly).
- **Keep what is already there**: refresh in place instead of blanking the view;
  avoid layout shift when content arrives (reserve space).
- **Disable or debounce duplicate submission**, and show which control is
  working.
- **Optimistic updates** suit actions that almost always succeed and are easy
  to roll back; they need a visible failure path.
- **Signs:** full-page spinner for a partial update; content jumping as images
  load; a button that can be clicked five times; skeletons that do not match
  the final layout.

## Errors

- **Identify the error in text and say how to fix it** `[standard]` (WCAG
  3.3.1, 3.3.3): which field, what is wrong, what is expected. Not just a red
  border; not "Invalid input".
- **Associate it** `[standard]`: connect the message to the field
  (`aria-describedby`, `aria-invalid`) and place it adjacent.
- **Validate at the right time** `[convention]`: after the user leaves a field
  or on submit, not on the first keystroke; clear the error as soon as it is
  fixed. On submit failure, move focus to the first error or a summary.
- **Preserve input** `[convention]`: never clear a form because one field
  failed.
- **Tone**: plain, specific, blameless. Say what happened and what to do.
- **System errors**: explain what failed, whether data is safe, and offer retry.
  Do not show raw exception text to end users (developer tools are an
  exception).

## Motion

### Motion explains, or it is noise `[convention]`

Good reasons to animate: showing where something came from or went (continuity),
confirming an action (feedback), directing attention to a change, expressing
brand character in moderation. "It feels more polished" is not on the list.

- **Durations** `[convention]`: most interface transitions sit around 100–300
  ms; larger or more distant movements a little longer. Ease out for things
  entering, ease in for things leaving. Frequent actions should be fastest;
  nothing should make the user wait.
- **Exceptions:** playful, expressive, and narrative products use more motion
  as part of their identity. It should still be consistent and skippable.
- **Signs:** hover lift or scale on every card and button; scroll-triggered
  fade-ins on all sections; long entrance animations delaying content; several
  things moving at once; infinite decorative animation.
- **Fix:** keep motion that communicates state or continuity; remove the rest
  or reduce it to a quick colour/opacity change.

### Respect motion preferences `[standard]` `[convention]`

Honour `prefers-reduced-motion` by removing or replacing non-essential movement
(parallax, large translations, zooms). Anything that moves, blinks, or scrolls
automatically for more than five seconds alongside other content needs a way to
pause, stop, or hide it (WCAG 2.2.2). Nothing may flash more than three times
per second (2.3.1). Animate `transform` and `opacity` in preference to layout
properties.

## Progressive disclosure

### Show what is needed now; make the rest easy to find `[convention]`

Reduce initial complexity by deferring advanced or rare options behind a clear
control (an "Advanced" section, a detail panel, a second step).

- **Applies:** settings with many rarely used options; long forms with
  conditional parts; detail that only some users need.
- **Exceptions:** do not hide what users need to compare or use frequently;
  experts pay for every extra click. Do not hide information needed to make
  the current decision (price, consequences).
- **Signs of under-disclosure:** 40 fields on one screen with equal weight.
  **Signs of over-disclosure:** core actions buried in a "more" menu; essential
  content in hover-only tooltips (which also fails touch and keyboard users;
  WCAG 1.4.13 governs hover/focus content).
- **Fix:** split by frequency of use; label the disclosure by what it contains.
