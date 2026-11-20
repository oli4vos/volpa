# Design principles: hierarchy, grouping, attention, load

The perceptual and cognitive ground rules. Everything in the other references is
an application of these.

**Rule format used across the library.** Each rule has an evidence tag (defined
in [core-contract.md](core-contract.md)) and, where they matter, these parts:
the principle and why it holds, **Applies** (when to use it), **Exceptions**
(when not to), **Signs** (how a violation shows up in code or on screen), and
**Fix**.

## Visual hierarchy

### One priority order per screen `[empirical]`

People do not read interfaces; they scan for what stands out, guided by a small
set of visual features processed before conscious attention: size, colour and
luminance contrast, weight, position, isolation, and motion (Treisman; Ware).
If the designer does not set the order, an accidental one emerges.

- **Applies:** every screen with more than one thing on it.
- **Exceptions:** browsing surfaces of genuinely equal items (a photo grid, a
  list of search results) should be even *among the items*; the hierarchy is
  then between the items and the controls around them.
- **Signs:** several elements share the largest size, heaviest weight, or accent
  colour; more than one filled primary button in a view; every heading bold and
  every card identical regardless of importance; you cannot say what the user
  should see first.
- **Fix:** rank content as primary, secondary, tertiary *before styling*. Give
  the primary element a clear lead on one or two channels (not all of them).
  Then de-emphasise: most weak hierarchies are fixed by quieting secondary
  elements, not by enlarging the primary one.

### Emphasis is a budget `[empirical]`

A feature only pops out when few things have it. Each additional bold label,
accent-coloured element, or badge lowers the salience of all the others.

- **Applies:** accent colour, bold weight, large size, icons, badges, borders,
  shadows, animation.
- **Exceptions:** expressive or editorial work may be loud on purpose; it still
  needs one thing louder than the rest.
- **Signs:** accent colour on headings, links, icons, borders, and buttons at
  once; "important" styling on more than roughly a tenth of a view.
- **Fix:** decide what the accent *means* (action, selection, status) and remove
  it everywhere else.

### Use few levels, clearly separated `[convention]`

Three or four levels of text and surface emphasis cover most screens. Adjacent
levels should differ enough to be read as different at a glance; many
near-identical levels (14px vs 15px, grey-500 vs grey-600) read as noise.

- **Signs:** many font sizes or greys one step apart; levels distinguished only
  by a 1px or 50-weight difference.
- **Fix:** collapse to a small role set and widen the steps between roles.

### Squint test `[judgment]`

Imagine (or view) the screen blurred. What survives should be the primary
content and action, in order. From source alone, approximate it: list elements
by declared size, weight, and contrast, and compare that order to the task
priority.

## Grouping (Gestalt)

### Proximity is the first grouping tool `[empirical]`

Elements closer to each other than to their neighbours are perceived as a group.
Spacing therefore carries meaning: it states what belongs with what.

- **Applies:** labels and their fields, headings and their sections, list items,
  button groups, any related cluster.
- **Signs:** a heading equidistant from the section above and the section it
  introduces; a label nearer the previous field than its own; uniform gaps
  everywhere so that structure is invisible.
- **Fix:** space within a group < space between groups, by a clear margin
  (commonly a factor of two or more). A heading sits closer to what it heads.

### Prefer the weakest sufficient grouping cue `[empirical]` `[convention]`

Grouping cues, roughly from lightest to heaviest: proximity, alignment,
similarity (shared style), a divider, a background tint, a bordered or shadowed
container (common region). Each heavier cue adds visual elements that compete
for attention.

- **Applies:** any time you reach for a box.
- **Exceptions:** containers earn their place when items are discrete objects
  that are compared, moved, selected, or acted on as units, or when a region
  sits on a different layer (dialogs, popovers).
- **Signs:** containers nested in containers; a border around content that
  whitespace already separates; every section of a page in its own card.
- **Fix:** remove the heaviest cue and see whether grouping survives on
  proximity and alignment. Add back only what is needed.

### Similarity implies sameness `[empirical]`

Things that look alike are assumed to behave alike. Things that look different
are assumed to differ.

- **Signs:** two styles for the same kind of action; links and plain text styled
  identically; static labels that look like buttons; interactive and
  non-interactive cards indistinguishable.
- **Fix:** one appearance per function. Differences in appearance should map to
  differences in meaning or behaviour.

### Alignment creates order `[convention]`

Shared edges form implied lines that organise a layout without adding ink. Each
extra alignment axis adds perceived complexity.

- **Signs:** left edges that differ by a few pixels between sections; mixed
  centred and left-aligned blocks in one column; numbers in a column not aligned
  for comparison.
- **Fix:** reduce the number of distinct vertical edges; align numeric data
  right (or on the decimal) with tabular figures; centre only short, isolated
  blocks.

## Attention and scanning

### Complexity and colourfulness shape first impressions `[empirical]`

Aesthetic impressions form within a fraction of a second, and perceived visual
complexity and colourfulness account for a large part of them (Lindgaard et al.
2006; Reinecke et al. 2013). Perceived aesthetics in turn influence perceived
usability (Tractinsky et al. 2000). Preferences vary by audience and culture,
and typically peak at moderate complexity, not minimal.

- **Scope limit:** these are findings about first impressions and perceptions.
  They do not show that simpler is always better, that polish causes usability,
  or what a daily expert user needs.
- **Fix when complexity is undirected:** remove elements that communicate
  nothing (see emphasis budget). Do not strip elements that carry information.

### Scanning follows structure, not a fixed letter shape `[empirical]`

The "F-pattern" from eye-tracking describes how people skim undifferentiated
text: it is a symptom of weak structure, not a layout to design towards.
Readers of left-to-right languages do tend to start top-left and weight the
first words of lines and headings.

- **Fix:** front-load headings and labels with the distinguishing words; break
  walls of text with meaningful headings; put the primary action where the
  reading path ends, not where a template puts it.

## Cognitive load

### Recognition over recall; convention over novelty `[convention]`

Showing options costs less than making people remember them, and people bring
expectations from every other product they use (Nielsen's heuristics; "Jakob's
law"). Standard placements and controls are free usability.

- **Exceptions:** novelty is appropriate where expression is the point
  (portfolios, campaigns, games) and the cost of confusion is low.
- **Signs:** icon-only controls with no labels for non-universal actions;
  custom widgets replacing native ones without gain; navigation in an unusual
  place for no reason.
- **Fix:** label it, or use the standard control.

### Choice time grows with choices `[empirical]`

Decision time rises with the number of comparable options (Hick–Hyman), and
pointing time rises with distance and falls with target size (Fitts).

- **Scope limit:** Hick–Hyman concerns simple choices among equally likely
  options. It does not justify hiding functionality that experts need visible,
  and "seven plus or minus two" (Miller) is about short-term memory span, not a
  limit on menu items or nav links.
- **Fix:** order and group options meaningfully, make the common choice
  prominent and the default sensible, keep frequent targets large and near.

### Density follows the task `[convention]`

See [layout.md](layout.md#density). Neither whitespace nor density is a virtue
on its own.

## Affordance and conceptual clarity (Norman)

### Controls must signal that they are controls `[convention]`

A signifier tells the user what can be acted on and how; feedback tells them
what happened; mapping makes the relation between control and effect obvious.

- **Signs:** clickable elements with no visual or cursor signal; a flat design
  where buttons, tags, and labels look the same; no state change after action.
- **Fix:** see [interaction.md](interaction.md).

Aesthetic refinement must never remove a signifier. If making something
"cleaner" makes it less obvious what is clickable, it got worse.
