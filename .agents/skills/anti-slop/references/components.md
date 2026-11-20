# Components

Pick the component from the shape of the content and the task, then apply the
project's own version of it. Evidence tags are defined in
[core-contract.md](core-contract.md). State coverage for all components is in
[interaction.md](interaction.md).

## Buttons and actions

### A visible action hierarchy `[convention]`

One primary action per view or region, styled most prominently; secondary
actions quieter (outline, tonal, or text); destructive actions distinct and
never the visual default.

- **Exceptions:** toolbars and editors expose many equal-weight actions;
  marketing pages may repeat the same primary action down the page.
- **Signs:** two or more filled accent buttons side by side; "Cancel" as
  prominent as "Save"; "Delete" styled as primary; a row of five identical
  buttons.
- **Fix:** decide the one action most users take and demote the rest.

### Buttons do, links go `[convention]` `[standard]`

Use `<button>` for actions and `<a href>` for navigation; this gives correct
keyboard behaviour and announces the right role (WCAG 4.1.2). A `<div
onClick>` is neither.

### Labels say what happens `[convention]`

Verb plus object ("Create invoice", "Send reset link"), not "Submit", "OK", or
"Click here". Icon-only buttons are fine for universally known actions (close,
search, more) and always need an accessible name; otherwise show the label.

## Forms

- **Every input has a visible, programmatically associated label**
  `[standard]` (WCAG 1.3.1, 3.3.2, 4.1.2). Placeholders are hints, not labels:
  they vanish on input and usually fail contrast.
- **One column by default** `[convention]`: single-column forms have a clear
  path. Put fields side by side only when they are one logical unit (city /
  postcode, first / last name where culturally apt).
- **Group and order by meaning** `[convention]`: related fields together, with
  section headings (`<fieldset>`/`<legend>` for radio and checkbox groups).
- **Size fields to their content** `[convention]`: a postcode field should not
  be as wide as an address field; width is a hint about expected input.
- **Right control for the choice** `[convention]`: 2–5 mutually exclusive
  options visible as radios or a segmented control; many options in a select or
  combobox; on/off with immediate effect as a switch; on/off submitted with a
  form as a checkbox.
- **Mark the exception** `[convention]`: if most fields are required, mark the
  optional ones (or vice versa), in text, not colour alone.
- **Use input semantics** `[standard]` `[convention]`: correct `type`,
  `autocomplete` (WCAG 1.3.5), `inputmode`. Do not block paste; do not ask for
  the same information twice in a flow (3.3.7).
- **Errors**: see [interaction.md](interaction.md#errors).
- **Signs:** placeholder-only fields; a two-column grid of unrelated inputs;
  all fields the same width; a wall of fields with no grouping; the submit
  button far from the last field or duplicated.

## Navigation

- **Show where the user is** `[convention]`: mark the current location with more
  than colour (`aria-current`, weight, indicator).
- **Match pattern to structure** `[convention]`: a few top-level destinations
  suit a top bar or bottom tabs; many or nested sections suit a sidebar;
  parallel views of one object suit tabs. Do not use tabs for sequential steps
  or a sidebar for three links.
- **Labels over cleverness** `[convention]`: plain nouns users would use.
  Icon-only navigation needs labels or tooltips and accessible names.
- **Consistency across screens** `[standard]`: navigation and help that repeat
  should appear in the same relative order (WCAG 3.2.3, 3.2.6).
- **Signs:** no current-page indication; hamburger menu on desktop hiding five
  links; nav items that are sometimes links and sometimes actions.

## Cards

A card is a container for one discrete object or one self-contained unit.

- **Use when** `[convention]`: items are heterogeneous or media-rich, each is a
  unit of action or navigation, they are browsed more than compared, or they
  rearrange responsively.
- **Avoid when:** the content is one continuous flow (use sections and
  spacing); items are compared attribute by attribute (use a table); the "card"
  holds a single number or sentence that needs no boundary; the card is inside
  another card.
- **If the whole card is clickable**, make that a single link or button with a
  clear name, and avoid nesting other interactive controls ambiguously.
- **Signs of overuse:** see
  [slop-patterns.md](slop-patterns.md#card-overuse).

## Tables and data

- **Use a table for comparable records** `[convention]`: rows of the same kind
  with shared attributes. Use real table markup (`<table>`, `<th scope>`,
  caption or labelled region) so structure is exposed (WCAG 1.3.1).
- **Alignment** `[convention]`: text left, numbers right with tabular figures
  and consistent precision, headers aligned with their column.
- **Row separation**: light dividers or zebra striping or spacing; rarely all
  three. Dense rows need a clear hover/selection state.
- **Keep context**: sticky header for long tables, the identifying column first
  (and frozen if scrolling horizontally).
- **Prioritise columns**: show what users compare; move rare detail to a row
  expansion or detail view.
- **Narrow screens**: allow horizontal scroll inside a labelled, focusable
  region, or transform to stacked key–value rows; do not shrink text to
  unreadable sizes.
- **Signs:** div grids imitating tables; centred numbers; every cell bordered
  and every row striped; actions repeated as full buttons on each row drowning
  the data.

## Dashboards

A dashboard answers a small set of recurring questions at a glance.

- **Start from the questions** `[convention]`: what does this user check, and
  what would make them act? Order and size by that priority. The most important
  number or state is the largest and first.
- **Every element earns its place**: a chart must show a comparison or trend
  the user needs; a KPI needs context to mean anything (change, target,
  period). A number without a comparison is trivia.
- **Chart to the data** `[empirical]` `[convention]`: people read values most
  accurately from position on a shared axis, then length, then angle and area,
  and least from colour intensity. So: line for change over time, bar or dot
  for comparing categories, table when exact values matter. Avoid charts whose
  encoding is harder to read than the numbers (pie with many slices, 3D,
  dual axes without need).
- **Density is expected**; see [layout.md](layout.md#density).
- **Signs:** a row of four equal KPI cards chosen to fill a grid; sparklines
  with no axis, scale, or meaning; charts of placeholder data with no stated
  question; identical emphasis on critical and trivial metrics.

## Dialogs and overlays

- **Interrupt only when necessary** `[convention]`: modal dialogs suit
  decisions that block progress and short focused tasks. Long forms and
  browsable content belong on a page or in a side panel; confirmations of
  success belong in a non-blocking message.
- **Behaviour** `[standard]` `[convention]`: focus moves into the dialog, stays
  within it, Escape closes it, and focus returns to the trigger; the rest of the
  page is inert; the dialog has an accessible name. Native `<dialog>` with
  `showModal()` or the project's dialog component provides this; hand-rolled
  overlays usually do not.
- **Destructive confirmation**: name the object and the consequence; label the
  button with the action ("Delete project"), not "OK"; prefer undo when the
  action is reversible.
- **Signs:** dialogs stacked on dialogs; a modal for a one-line notice; no
  visible close control; background still scrollable and focusable.

## Empty, loading, and error states

Covered in [interaction.md](interaction.md). The component is not finished
until these exist.

## Icons and imagery

- **Icons support labels; they rarely replace them** `[convention]`. Few icons
  are universally understood. One icon family, one stroke weight, sizes from a
  small set.
- **Decorative versus meaningful** `[standard]`: decorative images and icons are
  hidden from assistive technology (`alt=""`, `aria-hidden`); meaningful ones
  have text alternatives (WCAG 1.1.1).
- **Signs:** a generic icon above every feature heading adding no information;
  emoji as primary iconography in a product that is not playful; mixed icon
  styles.
