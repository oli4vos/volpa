# UI slop patterns

A catalog of ways generated interfaces go generic. Use it as a list of places
to look, never as a list of things to remove.

**For audit and refine diagnosis only. Do not read this while creating.** Every
pattern here is fine when chosen for a reason and executed well; agents that
read this list before designing avoid the patterns wholesale and produce stark,
odd results, which is a worse failure than the one the list describes.

## How to use this catalog

**Status of this catalog.** There is no established scientific taxonomy of
"AI UI slop". The entries below are engineering hypotheses `[judgment]`,
assembled from recurring behaviour of generated interfaces and from the
principles in the other references. Benchmarks show that models have real
weaknesses in layout and visual fidelity; they do not show that any particular
style is inherently bad. Where an entry involves a `[standard]` failure, it says
so.

**The common cause** is underspecified intent: with no product-specific reason
to choose otherwise, the most frequent pattern appears. The cure is therefore
almost never "remove the pattern"; it is "make the decision the pattern
skipped".

**Before recording any entry as a finding, all three must hold:**

1. The symptoms are present, *and*
2. No legitimate use listed for the entry applies (brand, domain, deliberate and
   consistent system choice), *and*
3. You can name the harm in this context.

Use hedged language for these entries ("possible card overuse: ..."). One
pattern alone is rarely a problem; several together, with no product-specific
decision anywhere, is the signal.

**Do not overcorrect.** Replacing every gradient with flat grey, every card with
a hairline, and every sans with a serif produces a different template, not a
design.

---

## Structure

### Template convergence

- **Description:** the page follows a stock sequence regardless of product:
  centred hero with headline, subhead, and two buttons; a three- or four-up
  feature grid; logos; testimonials; pricing; call-to-action band.
- **Symptoms:** section order identical to countless landing pages; headline
  that could front any product; feature count matching the grid, not the
  product; the swap test fails (relabel it and nobody notices).
- **Harm:** nothing communicates what is specific about the product; the user
  cannot tell it from competitors; content is bent to fit the template.
- **Legitimate uses:** the conventional landing structure exists because it
  works for scanning. A quick MVP, or a product whose audience expects the
  convention, can use it. The problem is content-free execution, not the
  skeleton.
- **Corrections:** derive sections from what a visitor needs to decide: what it
  is, for whom, proof it works, what it costs, how to start. Show the actual
  product or its real output early. Let the number of items come from the
  content.
- **Before → after:** "Supercharge your workflow" + three icon cards (Fast /
  Secure / Scalable) → "Invoices that chase themselves" + a real invoice with
  its reminder schedule visible, then the two facts freelancers ask first
  (fees, payout time).

### Card overuse

- **Description:** every cluster of content is wrapped in a bordered, rounded,
  shadowed container.
- **Symptoms:** most of the page inside same-styled panels; cards within cards;
  a card around a single number or sentence; page sections that are just lists
  of cards.
- **Harm:** borders and shadows are visual elements competing with content;
  uniform boxes flatten hierarchy; comparison across cards is harder than
  across table rows; density drops.
- **Legitimate uses:** collections of discrete, heterogeneous, or actionable
  objects (products, projects, media, kanban items); dashboards whose widgets
  are independently configurable; content on a different elevation.
- **Corrections:** remove the container where proximity and alignment already
  group (see "weakest sufficient cue" in
  [design-principles.md](design-principles.md)); use a table for comparable
  records; keep cards for true objects and make one level of nesting the
  maximum.
- **Before → after:** settings page with five cards each holding two fields →
  one column with section headings and spacing; billing history as cards →
  a table.

### Arbitrary density

- **Description:** spacing reflects a stereotype instead of the task: vast
  padding because "premium", or cramming because "dashboard".
- **Symptoms:** very large section padding around little content; a data table
  showing five rows per screen; or, conversely, a first-time consumer flow
  packed like a spreadsheet.
- **Harm:** experts scroll and page to do routine work; novices are overwhelmed;
  related items drift apart.
- **Legitimate uses:** generous space for reading, luxury or editorial
  positioning, and focused single-task flows; high density for expert tools.
  Both are correct in their place.
- **Corrections:** set density from frequency and kind of use; see
  [layout.md](layout.md#density).

### Responsive cargo cult

- **Description:** responsive utilities applied by habit, without deciding what
  the content needs at each size.
- **Symptoms:** everything simply stacked; content hidden on mobile with no
  alternative; duplicated mobile and desktop markup; breakpoints that do not
  correspond to where the layout actually breaks.
- **Harm:** primary task pushed off-screen on small devices; hidden content
  becomes unavailable; duplicated markup drifts and confuses assistive
  technology. Can breach reflow requirements `[standard]`.
- **Legitimate uses:** hiding purely decorative elements on small screens;
  separate components where interaction genuinely differs (hover menu versus
  drawer).
- **Corrections:** see [layout.md](layout.md#responsive-composition).

---

## Surface

### Unmotivated gradients

- **Description:** gradient backgrounds, buttons, or text applied as a default
  signal of polish, frequently purple-to-blue or similar.
- **Symptoms:** gradient text on headings; gradient hero background; gradient
  buttons and borders; several different gradients on a page; no gradient in
  the brand or tokens to explain them.
- **Harm:** high-salience decoration competes with content; text contrast over
  a gradient varies and often fails at one end `[standard]`; the look is
  strongly associated with unconsidered templates.
- **Legitimate uses:** brand identity that includes a gradient; subtle
  lighting/depth on surfaces; data encoding; image scrims; a single focal
  moment.
- **Corrections:** ask what it communicates. If nothing, use a solid role
  colour. If it is identity, define it once as a token, use it sparingly, and
  check contrast at the worst point.
- **Before → after:** gradient headline, gradient button, gradient card
  borders → solid heading in the text colour; one solid accent for the primary
  button; no border decoration.

### Uniform heavy rounding

- **Description:** one large radius on everything.
- **Symptoms:** `rounded-2xl`/`rounded-3xl`/pill radius applied alike to
  buttons, inputs, cards, tables, images, and modals; nested rounded
  containers whose inner and outer radii clash.
- **Harm:** shape stops distinguishing component types; large radii waste space
  in dense UI and clip content; nested equal radii look misfitted.
- **Legitimate uses:** soft, friendly, playful, or touch-first brands; pill
  shapes for tags and toggles; platform conventions.
- **Corrections:** define a small radius scale by component role (for example
  small for inputs and controls, medium for containers, full for pills), in
  keeping with the brand's character. Inner radius = outer radius minus
  padding for nested shapes.

### Decorative depth

- **Description:** blur, translucency, glow, and large shadows used where no
  layering exists.
- **Symptoms:** `backdrop-filter` on in-flow panels; glassmorphic cards over a
  decorative background; heavy shadows on elements that are not raised;
  coloured glows.
- **Harm:** implies layers that are not there; text over translucent surfaces
  has unpredictable contrast `[standard]`; costs rendering performance; adds
  complexity.
- **Legitimate uses:** real overlays (sticky headers over scrolling content,
  popovers, sheets, dialogs) where translucency or shadow conveys "above";
  platform styles that use material effects; a deliberate aesthetic applied
  consistently with contrast verified.
- **Corrections:** reserve elevation for things that actually overlay or lift;
  use one consistent shadow scale; separate in-flow regions with spacing,
  borders, or surface tint.

### Accent saturation

- **Description:** the brand or accent colour is everywhere, or several bright
  accents compete.
- **Symptoms:** accent on headings, icons, borders, backgrounds, badges, and
  buttons together; multiple saturated hues with no assigned meanings.
- **Harm:** the primary action no longer stands out; status colours lose
  meaning; raises perceived visual complexity.
- **Legitimate uses:** bold, colour-led brands; data visualisation; playful
  products. These still need a reliable signal for "primary action".
- **Corrections:** see "Accent means something" in [color.md](color.md).

### Over-animation

- **Description:** motion added as a polish signal.
- **Symptoms:** hover lift/scale on every card and button; scroll-triggered
  fades on every section; long staggered entrances; perpetual background
  animation; no reduced-motion handling.
- **Harm:** delays content; distracts from the task; triggers discomfort for
  motion-sensitive users (can breach `[standard]` criteria on moving content).
- **Legitimate uses:** state continuity, feedback, orientation, and brand
  expression in products where delight is part of the value.
- **Corrections:** see [interaction.md](interaction.md#motion).

---

## Hierarchy and system

### Weak hierarchy

- **Description:** elements compete at similar visual strength; no clear first
  read.
- **Symptoms:** multiple primary-styled buttons; every heading bold and large;
  metrics, labels, and body at near-equal size and contrast; uniform cards for
  unequal content.
- **Harm:** users must read everything to find anything; the primary task is
  not evident. This is the most consequential pattern in the catalog and the
  one most often worth fixing.
- **Legitimate uses:** egalitarian collections (the hierarchy is then between
  collection and chrome).
- **Corrections:** see [design-principles.md](design-principles.md#visual-hierarchy).

### Spacing entropy

- **Description:** many unrelated spacing values; equivalent things spaced
  differently.
- **Symptoms:** numerous one-off margins and paddings; arbitrary-value
  utilities; sibling sections with different gaps for no reason.
- **Harm:** grouping becomes unreadable; the layout feels unsettled even when
  users cannot say why; maintenance cost.
- **Legitimate uses:** optical adjustments; content-specific one-offs.
- **Corrections:** see [layout.md](layout.md#spacing).

### Undecided typography

- **Description:** no typographic decisions were made: one family at one or two
  weights, sizes picked ad hoc, no roles.
- **Symptoms:** everything in the framework's default face with default sizes;
  headings differ from body only by `font-bold`; many near-identical sizes; no
  relation between type and product character.
- **Harm:** hierarchy rests on boxes and colour instead of text; the product
  has no voice.
- **Legitimate uses:** default and system typefaces are fine (often ideal) for
  tools. This entry is about missing roles and hierarchy, not about which font.
- **Corrections:** define roles and scale first
  ([typography.md](typography.md)); change typeface only in create, or in
  refine when asked.

### Component inconsistency

- **Description:** each component generated in isolation.
- **Symptoms:** several button styles for the same level of action; inputs with
  different heights, borders, or label positions; mixed icon sets; similar
  cards with different padding and radius; unrelated actions that look the
  same.
- **Harm:** breaks the similarity principle: users cannot learn what a style
  means; the product feels assembled from parts.
- **Legitimate uses:** intentional variants with distinct meanings.
- **Corrections:** see [design-systems.md](design-systems.md).

---

## Content

### Placeholder semantics

- **Description:** copy and data that could describe anything.
- **Symptoms:** "Supercharge", "seamless", "next-generation", "all-in-one",
  "unlock the power of"; invented metrics ("10k+ users", "99.9%"); fake
  testimonials and logos; lorem ipsum; feature names like "Fast / Secure /
  Scalable".
- **Harm:** the layout is shaped around text that says nothing, so real content
  will not fit it; invented claims are a trust and legal risk.
- **Legitimate uses:** clearly marked placeholders in a prototype or template.
- **Corrections:** in create, write realistic domain-specific content and mark
  what is placeholder; never present invented proof as real. In refine, follow
  the placeholder-content rule in [core-contract.md](core-contract.md): replace
  it only from facts the user gave, as a draft; otherwise flag and ask.

### Meaningless iconography

- **Description:** icons added to fill space or decorate headings.
- **Symptoms:** a generic icon (sparkle, rocket, lightning, shield) above every
  feature; icons that do not help identify their item; emoji as iconography in
  a serious product; inconsistent icon styles.
- **Harm:** adds elements without information; trains users to ignore icons,
  including the meaningful ones.
- **Legitimate uses:** icons that speed recognition of repeated items
  (navigation, file types, statuses, actions) or that are widely understood.
- **Corrections:** remove icons that do not aid recognition; keep one family;
  label what remains.

### Decorative data

- **Description:** charts, sparklines, and stat tiles that exist to look like a
  dashboard.
- **Symptoms:** charts with no axis, unit, or period; sparklines of arbitrary
  data; a KPI row whose metrics no user decision depends on; numbers without
  comparison.
- **Harm:** occupies the most valuable space with nothing actionable; erodes
  trust in the real data.
- **Legitimate uses:** illustrative mock data in a clearly labelled prototype;
  compact sparklines beside real values where the trend matters.
- **Corrections:** see [components.md](components.md#dashboards).

---

## Calibration

### Over-designed

- **Description:** more visual treatment than the content needs.
- **Symptoms:** several of the surface patterns at once; decorative elements
  outnumbering content; custom controls replacing native ones; a simple
  internal tool dressed as a marketing site.
- **Harm:** complexity without communication; slower, heavier, harder to
  maintain; often less accessible.
- **Corrections:** remove treatment until something is lost, then stop.

### Under-designed

- **Description:** structure and care are missing. The opposite failure, and
  just as real: do not let anti-decoration zeal produce it.
- **Symptoms:** unstyled or barely styled defaults with no hierarchy; no
  grouping; missing states (empty, loading, error, focus); primary and
  secondary actions identical; no consideration of narrow screens.
- **Harm:** the user does the organising work the design should have done.
- **Legitimate uses:** plain is a valid aesthetic when hierarchy, grouping, and
  states are sound. Plain is not the same as under-designed.
- **Corrections:** add structure (hierarchy, grouping, states), not decoration.

### The timid default

- **Description:** the over-corrected page. Every risky choice was avoided and
  no choice was made in its place.
- **Symptoms:** centred headline, grey subhead, one accent button, two or
  three text blurbs; white or near-black ground with a single accent used only
  on buttons; a type scale that never gets large; nothing that shows the
  product; describable only as "clean".
- **Harm:** as interchangeable as the gradient template it replaced; gives a
  visitor nothing to remember and the product no voice. On a landing or
  consumer surface this fails the page's purpose.
- **Legitimate uses:** work tools and utility pages, where quiet is the goal.
- **Corrections:** give the page a feel, a focal element, and finish:
  [craft.md](craft.md).

### Accessibility as afterthought

- **Description:** the visual result was produced first and accessibility
  never arrived. Not a matter of taste: these are `[standard]` failures.
- **Symptoms and corrections:** see the source-level checklist in
  [accessibility.md](accessibility.md).
