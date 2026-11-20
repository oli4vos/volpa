# Design review rubric

A structured way to look, not a scoring system. It produces classified
observations with reasons. It does not produce a number, and you should not
invent one.

## How to use it

1. State the context: product, audience, primary task, and the visual character
   the product intends (from brand, existing screens, or the user).
2. State the evidence basis: rendered or source only.
3. Walk the dimensions below in order. For each, answer the questions with
   evidence from the code or the rendered view.
4. Classify each observation using the core contract: **clear defect**,
   **likely improvement**, **subjective preference**, or **insufficient
   evidence**.
5. Judge against the product's intent, not your own taste. The reference point
   is "the best version of what this is trying to be".

Dimensions are ordered roughly by how much they matter and how objectively they
can be judged. Problems in the early ones outweigh problems in the later ones.

## Dimensions

### 1. Accessibility

- Do controls have names, inputs have labels, images have alternatives?
- Is everything keyboard-operable with visible focus?
- Do declared colour pairs meet contrast minimums? Is anything conveyed by
  colour alone?
- Are targets large enough? Does layout reflow and text scale?

*Mostly `[standard]`; many failures are detectable in source. Failures here are
clear defects.* → [accessibility.md](accessibility.md)

### 2. Information clarity

- Can you say what this screen is for and what the user should do first?
- Is the content real and specific? Are labels and actions unambiguous?
- Is anything present that serves no user need? Is anything needed missing?

→ [design-principles.md](design-principles.md), [slop-patterns.md](slop-patterns.md#content)

### 3. Visual hierarchy

- Does visual emphasis match task priority? Is there exactly one primary action
  per region?
- How many elements claim top emphasis? How many levels are there, and are they
  distinct?
- Do grouping cues match actual relationships?

*Judged from source, this is an inference from declared sizes, weights, and
colours: medium confidence at most.* → [design-principles.md](design-principles.md)

### 4. Interaction quality

- Do interactive elements have hover, focus, active, and disabled states?
- Are loading, empty, and error states handled? Are errors specific and
  associated with their fields?
- Does motion communicate something? Is reduced motion respected?

→ [interaction.md](interaction.md)

### 5. Component consistency

- Are system components and tokens used? Are there duplicates or near-duplicates?
- Do things with the same function look the same, and different functions look
  different?
- Is the component type right for the content's shape?

→ [components.md](components.md), [design-systems.md](design-systems.md)

### 6. Layout

- Does spacing form a consistent scale and show grouping (within < between)?
- Are edges aligned? Is the density right for this task and user?
- Does structure come from the content, or was content fitted to a template?

→ [layout.md](layout.md)

### 7. Typography

- Is there a small set of distinct text roles? Is body text a readable size,
  with sensible line length and line height for its kind?
- Is hierarchy carried by type, or propped up by boxes and colour?

→ [typography.md](typography.md)

### 8. Colour coherence

- Are colours used by role? Does the accent signal one thing?
- Does the palette hold together (related neutrals, limited hues)?
- Do themes, if any, all work?

→ [color.md](color.md)

### 9. Responsive design

- Is the primary task intact and prioritised at narrow widths?
- Is anything hidden without alternative? Any fixed dimensions that will break?

*Hard to confirm from source; say so.* → [layout.md](layout.md#responsive-composition)

### 10. Contextual appropriateness

- Does the visual character fit the product, audience, and domain? Would the
  intended user find it credible and comfortable?
- Does it respect platform and domain conventions?
- Is it consistent with the rest of the product?

*Largely `[convention]` and `[judgment]`: argue from the product, and hold the
conclusion loosely.*

### 11. Distinctiveness

- Does it pass the swap test: is anything about the structure or style specific
  to this product?
- Is there at least one deliberate decision that expresses the product's
  character?

- Is there a focal element that got real care, and does the page pass the
  appeal, odd, and generic checks in [craft.md](craft.md)?

*This is `[judgment]`, and its weight depends on the surface. On bold
surfaces (landing, marketing, consumer, anything the user called generic) a
characterless result is a real shortfall: classify it as a likely improvement
with major severity, and in create or refine, fix it. On work tools, plain,
consistent, and clear is enough. Never trade a higher dimension for this one.*
→ [craft.md](craft.md)

## Classification guide

| Observation | Classification |
|---|---|
| Input with no label; text at 2.6:1; `outline: none` with no replacement; div as button without keyboard support | Clear defect |
| Two filled primary buttons side by side; status by colour only | Clear defect (the second is `[standard]`) |
| Heading equidistant between sections; 14 distinct spacing values; table rendered as cards for comparable records | Likely improvement |
| Dashboard KPI row with no comparison or period | Likely improvement, if you can argue the user need |
| "I would use a serif here"; "the blue could be warmer"; "8px radius would be nicer than 6px" | Subjective preference |
| A deliberate, consistent brand choice you find unfashionable | Not a finding |
| "The hero probably feels unbalanced" from source only | Insufficient evidence |
| Contrast of text over a background image | Insufficient evidence until viewed |

## Calibrating confidence

- **High:** verifiable from source without interpretation (missing attribute,
  computed ratio from literal colours, duplicate component, positive tabindex).
- **Medium:** inference from declared styles about a visual effect (hierarchy,
  grouping, density) where the code is unambiguous.
- **Low:** depends on rendering, cascade, theming, content you cannot see, or a
  contestable reading of the product's intent.

State uncertainty plainly. "Probably", "from source it appears that the code
specifies", and "I could not verify" are part of a good review.

## Explaining decisions

For important decisions (in create and refine), give the reason in terms of the
user and task, and name the principle: "Demoted Export to a text button so that
Save is the only filled action (one primary per region)." Skip explanation for
routine choices. Do not justify by trend ("modern", "clean", "sleek").

## A passing review

If the walk finds no clear defects and no likely improvements worth their risk,
the result is: no changes recommended. Say what was checked, what is working and
why, and what could not be assessed. That is a complete review.
