# Anti-Slop core contract

This file governs every workflow. Where another file seems to disagree, this
one wins.

## Goal

Make interfaces clearer, more usable, more accessible, better fitted to their
product, and, where the surface calls for it, memorable. Change only what you
can justify. "This page has no idea and no character, and it is a landing page"
is a justification. "I would have done it differently" is not.

## Evidence classes

Every rule in the reference library carries one of these tags. Use them to
decide how firmly to act and how to phrase a finding.

| Tag | Meaning | How to act |
|---|---|---|
| `[standard]` | Normative accessibility requirement (WCAG 2.2 A/AA unless noted) | Treat as a constraint. A violation is a defect regardless of taste. |
| `[empirical]` | Supported by peer-reviewed HCI or perception research | Strong default. Note the study's scope; do not stretch it into a universal law. |
| `[convention]` | Established practice in major design systems, platform guidelines, or typographic craft | Good default. Break it when the product has a reason and stays coherent. |
| `[judgment]` | Anti-Slop's own heuristic or an aesthetic preference | Offer as an option. Never present as a fact. Never the sole reason for an unrequested change. |
| `[reported]` | A sign that practitioners and users consistently name as reading "AI-made" (see tells.md) | Evidence that people notice it, not that it harms. Act on it when there is no sign it was chosen deliberately. |

Source prestige is not confidence. A peer-reviewed lab finding may not transfer
to this product; a design-system convention may be exactly right here. State
both the class and your confidence.

## Decision rule

Make or recommend a change only when the reason for it is clearer than the
reason to preserve what exists.

Classify every candidate issue before acting on it:

- **Clear defect**: breaks a `[standard]`, breaks function, or plainly obstructs
  the primary task (unlabelled input, unreadable contrast, no visible focus,
  primary action indistinguishable from secondary). Fix in refine; report in
  audit.
- **Likely improvement**: violates an `[empirical]` or `[convention]` rule in a
  context where the rule applies and no exception fits. Fix in refine if it is
  in scope and low-risk; report in audit.
- **Subjective preference**: a `[judgment]` call, or a different-but-valid
  alternative. Do not change in refine unless asked. In audit, list separately
  and label it as preference, or omit.
- **Insufficient evidence**: you cannot tell from what you can inspect (for
  example, rendered contrast over an image, real overflow behaviour, whether a
  token resolves to the value you assume). Say what you would need to check.
  Do not guess in either direction.

## Preservation contract

Preserve unless the user explicitly authorises changing it:

- **Functionality and business logic**: handlers, data flow, validation,
  routing, conditional rendering, state. Restyling must not alter behaviour.
- **User-visible content and meaning**: copy, labels, numbers, legal text, data.
  Real content is preserved: do not reword it unprompted, though you may flag
  it. Placeholder content is not real content (see below). Never invent
  metrics, testimonials, or features.
  **Interface microcopy is presentation, not content**: punctuation, case,
  number and date formats, greeting headlines, hype words, emoji, decorative
  badges, and label length. Clean these in refine following
  [details.md](details.md), keep the meaning, and list what you changed.
- **Information architecture**: which content and features exist, which screen
  they are on, and how navigation reaches them. This does **not** freeze a
  screen's layout. Hierarchy, composition, the order and design of sections
  within a page, and how the hero is built are presentation, and improving
  them is the job. Content that is buried, duplicated, or competing is a defect
  to fix, not structure to preserve.
- **Accessibility behaviour**: semantics, labels, ARIA relationships, focus
  order, keyboard handlers, reduced-motion handling, skip links. Never remove
  these as "clutter".
- **Meaningful brand identity**: brand colours, typefaces, logo treatment, tone,
  and deliberate visual signatures, including ones you would not have chosen.
- **Component conventions**: use the project's components, variants, and tokens.
  Do not hand-roll a duplicate of something that exists.
- **Stack and dependencies**: no new libraries, fonts, icon sets, or frameworks
  unless the user asks or the task cannot be done otherwise; if so, say so first.
- **Test hooks and contracts**: ids, names, `data-*` attributes, class names
  that tests or scripts target, public component props.
- **Working responsive behaviour**.

Also:

- No unrelated refactoring. Do not reformat, rename, or reorganise code you are
  not changing for a design reason.
- Do not introduce a new inconsistency. A locally "better" value that differs
  from the system's value used everywhere else is a regression. Either follow
  the system or change the system (with scope to do so).
- Every change needs a reason you can state in one line, tied to a principle.
  "Looks more modern" is not a reason.

## Preservation is not timidity

The contract above lists what must survive a change. It is not a reason to
make small changes. A page with its own typefaces and palette has an identity
to keep; it does not follow that its layout, hierarchy, or finish are good. If
you notice a real problem and then decline to fix it because fixing it would
"change the structure", you have misread this contract. Keep the identity, the
content, and the behaviour. Improve everything else as far as the request
asks.

## Preservation protects intent, not accidents

Preservation exists to protect decisions someone made. It is not a reason to
leave a defect in place, and it does not turn every existing pixel into brand.

**Evidence that a choice is deliberate:** it is declared (tokens, theme, brand
or design docs, a comment), it is used consistently across the product, it
fits the product's audience and domain, or the user says so. With any of
these, protect it even if you dislike it.

**Without such evidence**, a style that matches an entry in
[slop-patterns.md](slop-patterns.md) and has a harm you can name is a finding
like any other, and in refine you fix it. A purple gradient that appears in one
file, with no token, no brand note, and no relation to the product, is not
"the brand". If you are unsure whether something is brand, keep the identifying
element (the hue, the logo, the typeface) and fix the way it is used.

**Placeholder content** is copy that says nothing specific about the product
("Supercharge your workflow", "Fast / Secure / Scalable"), lorem ipsum, and
unsupported statistics or testimonials. It was not written by someone who knew
the product, so there is no meaning to preserve:

- If the user has told you what the product does, replace placeholder copy
  using **only the facts they gave**. Keep it plain. Say in your report that the
  new copy is a draft for them to approve, and list what you replaced.
- If you have no product facts, leave the copy, flag it, and ask.
- Unsupported statistics and testimonials: remove them, or replace them with a
  clearly labelled placeholder, and say so. Never substitute different invented
  numbers.
- When in doubt about whether copy is real, treat it as real.

**Depth follows the damage.** The amount you change should be proportional to
how much is wrong. A sound interface with two defects gets two fixes. A page
whose structure, copy, and styling are all template defaults needs all three
addressed, and fixing only its accessibility while leaving the rest is an
incomplete refine, not a careful one.

**Subtraction is half the job.** After removing what was wrong from a
bold surface (see craft.md), the page must still have something right: an idea, a
focal element, a voice, visual appeal. If stripping the slop leaves a bare,
centred, inoffensive page, you have swapped one template for another. Rebuild
the visual layer with intent (see [craft.md](craft.md)); familiar patterns done
well are welcome in it. What stays fixed while you do:
behaviour, routes, form contracts, real content, real brand, accessibility,
and the facts you are allowed to state.

## No-op

If the interface is coherent, accessible as far as you can tell, and fits its
context, change nothing and say so. Report what you checked and why it passes.
An agent that always finds something to change is not exercising judgment.

Being invoked is not evidence that something is wrong.

No-op is for interfaces that are already good at what they are for. It is not a
refuge from making design decisions. An agent that never dares is as useless as
one that always meddles.

## Common patterns are not defects

Never flag or remove a pattern because it is popular, because it is associated
with AI-generated UI, or because it appears in the slop catalog. A finding needs
a contextual harm: it competes with the primary task, misrepresents the product,
duplicates meaning, contradicts the brand, or hurts accessibility. If you cannot
name the harm, there is no finding.

Equally, do not replace one default with another. Swapping a purple gradient for
a beige serif layout by reflex is the same failure in different clothes, and so
is swapping it for a blank white page with one accent button.

## Honesty about evidence

- State once, early, whether you inspected rendered output or source only.
- From source alone you can assess: structure and semantics, token and value
  consistency, declared colours and many contrast pairs, declared sizes and
  spacing, state coverage, copy, and component reuse.
- From source alone you cannot reliably assess: actual visual balance, text
  wrapping and overflow, contrast over images or gradients, computed styles
  after cascade and theming, real focus visibility, animation feel, or how the
  page reads at a glance. Mark such points as insufficient evidence, or as
  hypotheses with stated confidence.
- If the host gives you a way to view the rendered UI, use it for anything
  visual before asserting. Anti-Slop does not require it and does not provide it.
- Never claim WCAG conformance. You can report specific failures and specific
  checks that passed; conformance requires full testing including assistive
  technology.
- No invented measurements, no aesthetic scores out of ten, no "users will"
  claims without a source.

## A visible failure is a finding

If something renders blank, broken, or missing, treat it as a defect in the
page until you have evidence otherwise, and look for the cause in the code. Do
not attribute it to your tools, the network, or timing without checking. Never
polish around something that does not work without saying so.

## Scope

Work on what was asked. If you notice a serious problem outside scope (a
`[standard]` failure, a broken flow), mention it; do not fix it silently. Do not
expand a spacing fix into a redesign.
