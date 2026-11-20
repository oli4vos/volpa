# Layout: spacing, alignment, density, responsive structure

Layout states relationships: what belongs together, what comes first, what can
be compared. Evidence tags are defined in [core-contract.md](core-contract.md).

## Spacing

### Spacing encodes relationships `[empirical]`

Proximity is the primary grouping cue (see
[design-principles.md](design-principles.md#grouping-gestalt)). The size of a
gap says how related two things are.

- **Signs:** identical gaps inside and between groups; a heading floating midway
  between sections; form labels nearer the wrong field.
- **Fix:** build a clear ladder: tight within a component, medium between
  related components, large between sections. Each rung visibly larger than the
  last.

### Use a spacing scale `[convention]`

Draw spacing values from a small fixed set (many systems use multiples of 4 or
8px; the project's own scale takes precedence). The base number is a
convention; the benefit is consistency and fewer decisions.

- **Signs:** many near-identical one-off values (13px, 15px, 17px, 22px);
  arbitrary-value utilities (`mt-[17px]`); equivalent components with different
  padding.
- **Exceptions:** optical corrections are legitimate: icon alignment, text
  baseline nudges, compensating for a glyph's built-in space. Leave them, and
  ideally comment them.
- **Fix:** snap to the nearest scale step, keeping the relationships intact. In
  refine, follow the scale the project already uses.

### Whitespace is active, not empty `[convention]`

Whitespace separates, groups, and gives the eye a place to rest. It is also
finite: space spent on padding is space not spent on content.

- **Too little:** elements touch or crowd; no visible grouping; text hits
  container edges.
- **Too much:** related items drift apart and stop reading as a group; a small
  amount of content is spread across a tall page; the user scrolls past padding
  to do routine work.
- **Fix:** tie the amount to density needs (below) and to grouping, not to a
  notion that more space equals more premium.

## Alignment and grids

### Fewer edges `[convention]`

Align elements to a small number of shared vertical and horizontal lines. A
column grid (12-column is common on the web; any consistent structure works)
is a means to that end.

- **Signs:** content blocks with slightly different left offsets; containers of
  different max-widths stacked on one page; icons and text baselines misaligned
  in rows.
- **Exceptions:** deliberate grid-breaking for emphasis or expression, done
  once or twice, clearly on purpose.
- **Fix:** pick the page's main edges and snap to them.

### Structure follows content `[judgment]` `[convention]`

Choose the arrangement from the content's shape: a sequence is a vertical flow;
a comparison is a table or aligned columns; a master–detail relationship is a
split view; one decision is a single focused column. A symmetric three-column
grid suits three parallel things and nothing else.

- **Signs:** content padded or trimmed to fit a grid (a fourth feature invented
  to fill a row, or six items forced into "three highlights"); unequal things
  in equal boxes.

### Balance is not symmetry `[judgment]`

Centred, symmetric layouts are stable and formal; asymmetric layouts create
direction and emphasis. Neither is a default. Centring everything on a page
removes the strong left edge that aids scanning of longer content.

## Density

### Set density from the task `[convention]`

| Context | Usually wants | Why |
|---|---|---|
| Expert, frequent, comparative work (admin tables, trading, IDEs, ops consoles) | High density | Users scan and compare many items; scrolling and paging cost more than tight spacing |
| Occasional, guided, or high-stakes single tasks (checkout, onboarding, consent) | Low density | One decision at a time; errors are costly |
| Long-form reading | Generous line spacing and margins, narrow measure | Sustained reading comfort |
| Marketing and first-impression pages | Moderate, with strong focal points | Persuasion and orientation |
| Touch-first mobile | Looser targets, less per screen | Finger size and reach |

- **Signs of mismatch:** a data table with 64px rows showing six records per
  screen; a signup form crammed into a dense grid; a dashboard where each number
  sits alone in a large padded card; a reading page set at 13px edge to edge.
- **Fix:** adjust row height, padding, and type size to the task. Dense does
  not mean cramped: keep alignment, grouping, and readable type, and remove
  padding and chrome before removing information. Where users differ, a density
  setting is a legitimate feature.
- **Refine caution:** never "air out" a dense expert tool, or compress a calm
  consumer flow, because your default differs.

## Responsive composition

### Reflow, don't just shrink `[standard]`

WCAG 1.4.10 (AA): content must be usable at a width of 320 CSS px without
two-dimensional scrolling, except content that needs it (data tables, maps,
diagrams, toolbars).

- **Signs:** fixed pixel widths on containers; horizontal scroll on the page
  body; text clipped at narrow widths.

### Adapt by content priority `[convention]`

At each width, ask what the content needs, and preserve task order.

- **Signs:** everything stacked in source order so the primary action lands far
  below secondary content; important content hidden on mobile (`hidden
  md:block`) with no alternative; duplicated mobile and desktop markup drifting
  apart; breakpoints chosen by device names instead of where the layout breaks.
- **Fix:** reorder or restructure so the primary task stays first; change the
  component, not just its width (a table becomes a list of key–value rows, a
  sidebar becomes a drawer, a tab row becomes a select). Prefer intrinsic
  techniques (`flex-wrap`, `grid` with `auto-fit`/`minmax`, `clamp()`,
  container queries where supported) over many breakpoints.

### Wide screens need limits too `[convention]`

Cap prose width; give wide data layouts more columns or a secondary panel
instead of stretching rows; avoid a narrow column stranded in empty space
unless the content is a single focused task.

### Touch and pointer `[standard]` `[convention]`

Minimum target size is covered in
[accessibility.md](accessibility.md#target-size). Do not rely on hover for
essential information or actions; touch devices have none.

## Quick examples

| Situation | Weak | Better |
|---|---|---|
| Form | 24px between every label, input, and next field alike | 6px label→input, 20px between fields, 40px between sections |
| Admin list | Each record a padded card, four visible | Table with 36–40px rows, sticky header, 15+ visible |
| Section stack | `py-32` on every section of a five-line page | Spacing proportional to content; sections grouped by topic |
| Mobile | Desktop sidebar stacked above content, pushing the task off-screen | Navigation collapsed; task first |
