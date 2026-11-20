# Example: audit

**Request:** "Use anti-slop to audit `evals/fixtures/mixed-dashboard.html`. It's our
CI dashboard."

**Response:**

## Anti-Slop audit: mixed-dashboard.html

**Evidence basis:** source only. I read the HTML and CSS; I did not see the page
rendered. Contrast figures are computed from the literal token values.
**Context assumed:** Ferrous CI, a pipeline dashboard for developers, used
repeatedly through the day to answer "is main broken, and what is running?"

### Summary

The page has a coherent dark, compact system that suits a developer tool, and
the running-job cards are a sound use of the pattern. Five accessibility
problems need fixing, two of them blocking for some users: run status is shown
by colour alone and muted text is below contrast minimums. The header has two
competing primary actions, and the KPI row gives the one number that matters
the same weight as trivia.

### Findings

#### 1. Run status is conveyed by colour only
- **Location:** `.dot.pass` / `.dot.fail` in `#recent-runs`
- **Category:** accessibility
- **Severity:** blocker
- **Classification:** clear defect
- **Confidence:** high
- **Principle:** Never colour alone `[standard]` (color.md; WCAG 1.4.1)
- **Explanation:** Pass and fail differ only by a green or red dot with no text,
  icon, or accessible name. Users with red–green colour deficiency and
  screen-reader users cannot tell which runs failed, which is the main question
  this list answers.
- **Suggested improvement:** Add a text label ("Passed" / "Failed"), visible or
  at least a distinct icon shape plus visually hidden text. Keep the colour as
  reinforcement.

#### 2. Muted text is below the contrast minimum
- **Location:** `--text-muted: #5a6070`, used by `.kpi .l` and `.row.head`
- **Category:** accessibility
- **Severity:** major
- **Classification:** clear defect
- **Confidence:** high
- **Principle:** Text contrast `[standard]` (color.md; WCAG 1.4.3)
- **Explanation:** `#5a6070` computes to about 2.7:1 on `--surface` and 3.0:1 on
  `--bg`; 12px text needs 4.5:1. KPI labels are what give the numbers meaning.
- **Suggested improvement:** Lighten the token until it reaches 4.5:1 on
  `--surface` (a value near `#8b93a3` does). Change the token, not call sites.

#### 3. Refresh button has no accessible name
- **Location:** `#refresh-btn`
- **Category:** accessibility
- **Severity:** major
- **Classification:** clear defect
- **Confidence:** high
- **Principle:** Every control has an accessible name `[standard]`
  (accessibility.md; WCAG 4.1.2)
- **Explanation:** The button contains only an SVG with no title or label, so it
  is announced as "button".
- **Suggested improvement:** `aria-label="Refresh"` and `aria-hidden="true"` on
  the SVG.

#### 4. Recent runs is tabular data without table semantics
- **Location:** `#recent-runs` (`.row` grid divs)
- **Category:** accessibility
- **Severity:** major
- **Classification:** clear defect
- **Confidence:** high
- **Principle:** Lists and tables are marked up as such `[standard]`
  (accessibility.md; WCAG 1.3.1)
- **Explanation:** Rows and column headers exist visually but not
  programmatically; assistive technology gets a flat run of text. The status
  column also has an empty header.
- **Suggested improvement:** Use `<table>` with `<th scope="col">` (the grid
  layout can be kept with CSS), and give the status column a header.

#### 5. Two competing primary actions in unrelated styles
- **Location:** `#run-btn`, `#deploy-btn`
- **Category:** hierarchy, consistency
- **Severity:** major
- **Classification:** likely improvement
- **Confidence:** medium
- **Principle:** A visible action hierarchy `[convention]` (components.md);
  Similarity implies sameness `[empirical]` (design-principles.md)
- **Explanation:** Both are filled, high-emphasis buttons. Deploy uses a blue
  that is not in the token set, a pill shape, and a different height, so it
  reads as belonging to another product while outranking the accent-coloured
  Run button. I cannot tell from the page which action is more common.
- **Suggested improvement:** Decide which is primary for this screen; style it
  with `--accent` and the 6px radius, and make the other a secondary (bordered)
  button of the same height.

#### 6. Positive tabindex on Run pipeline
- **Location:** `#run-btn` (`tabindex="3"`)
- **Category:** accessibility
- **Severity:** minor
- **Classification:** likely improvement
- **Confidence:** high
- **Principle:** No positive tabindex `[convention]` (accessibility.md)
- **Explanation:** It pulls this button to the front of the tab order ahead of
  everything else, so focus order no longer follows the layout.
- **Suggested improvement:** Remove the attribute.

#### 7. KPI row does not prioritise, and its sparklines carry no data
- **Location:** `#kpi-row`, `.spark`
- **Category:** hierarchy, content
- **Severity:** minor
- **Classification:** likely improvement
- **Confidence:** medium
- **Principle:** One priority order per screen `[empirical]`
  (design-principles.md); Dashboards start from the questions `[convention]`
  (components.md)
- **Explanation:** "Failing on main: 7" is the number a developer acts on, but
  it has the same size and position weight as "Total pipelines ever". No tile
  has a comparison or period beyond one label. The `.spark` element is a
  repeating CSS pattern, not a chart, yet it resembles one.
- **Suggested improvement:** Lead with failing-on-main, visually distinct;
  drop or demote the metrics no decision depends on; remove the fake
  sparklines or replace them with real trend data. Which metrics matter is a
  product call I am inferring.

#### 8. KPI row spacing ignores the spacing tokens
- **Location:** `.kpis` (`gap: 13px; padding: 17px … 22px`)
- **Category:** layout, consistency
- **Severity:** minor
- **Classification:** likely improvement
- **Confidence:** high
- **Principle:** Use a spacing scale `[convention]` (layout.md)
- **Explanation:** Every other rule uses `--s2`…`--s6`; these three values are
  one-offs, so the KPI grid's gaps differ from the job grid directly below it.
- **Suggested improvement:** `gap: var(--s4); padding: var(--s4) var(--s6)
  var(--s6)`.

### Preferences (optional, not defects)
- The 1px `--border` on cards is faint against the background by calculation
  (about 2.5:1). Cards are not controls, so this is not a contrast failure;
  a slightly lighter border might define them better. Taste.

### Could not assess
- Whether five KPI tiles and three job cards fit at narrow widths: both grids
  use fixed column counts with no breakpoint, so they likely squeeze on small
  screens. Needs a rendered check at about 320–400px.
- Actual focus-ring visibility against each surface.
- Hover and disabled states: none are declared for the buttons; whether that
  is a gap or handled elsewhere is not visible in this file.

### Working well
- Dark theme, compact 14px system type, and 36px rows fit a developer tool
  used all day. Keep them.
- The gradient is confined to the logo mark and documented as brand. Keep it.
- Job cards hold discrete objects with their own actions and log excerpts:
  a correct use of cards.
- Colour and spacing tokens are declared and mostly followed; a visible
  `:focus-visible` style exists; durations use tabular figures.

I have not changed any files. If you want these fixed, ask for a refine and say
which findings to include.
