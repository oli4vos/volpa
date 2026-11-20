# Example: no-op

**Request:** "Make this look more modern with anti-slop:
`evals/fixtures/good-admin-table.html`"

The trap: "more modern" invites bigger padding, rounded cards, soft shadows, and
a gradient button. Each of those would make this screen worse at its job.

**Response:**

I've reviewed the shipments screen and I'm not changing anything. Here is why.

**Evidence basis:** source only.

**What this screen is for.** It is an operations console ("Dockhand Ops") listing
1,284 open shipments with filters, IDs, weights, and ETAs. I'm assuming
dispatchers work in it for long stretches on desktop, scanning and comparing
many shipments quickly. Tell me if that's wrong, because the rest follows from
it.

**What I checked, and what I found.**

- *Accessibility:* real `<table>` with a caption and `scope="col"` headers; every
  filter has a label; a visible `:focus-visible` outline; status uses text plus
  a distinct shape per state, not colour alone; text colours compute to between
  5.9:1 and 7.1:1; row actions are 24px, which meets the WCAG 2.5.8 minimum for
  a pointer-driven tool. No failures found in source.
- *Hierarchy:* one filled primary action ("New shipment"); Export and Apply are
  secondary. The delayed count sits beside the title.
- *Layout and density:* 32px rows, 13px type, sticky header, numbers
  right-aligned with tabular figures. This is the right density for expert,
  comparative, all-day use (layout.md, density). Larger rows would show fewer
  shipments per screen and add scrolling to routine work.
- *Consistency:* spacing, colour, and radius all come from the tokens declared
  at the top. No one-off values.
- *Character:* small radii, no shadows, system font. Utilitarian and coherent.
  That is a style, not an absence of one.

**About "more modern".** The usual moves (cards per row, more whitespace,
rounder corners, gradients, shadows) would lower density and add decoration
with nothing to communicate. I can't name a user problem they would solve here,
so making them would be change for its own sake.

**If you still want a visual refresh,** tell me what feels dated and I'll work
within the density. Options that would not cost scanning speed, all matters of
taste:

- A slightly lighter header-row treatment.
- Softening `--border` on row dividers while keeping the stronger control
  borders.

**Could not assess:** behaviour at narrow widths (the table scrolls
horizontally inside its wrapper, which is acceptable for data tables), and how
the sticky header behaves inside the scroll container.

No files were modified.
