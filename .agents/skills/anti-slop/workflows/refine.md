# Workflow: refine

Make an existing interface clearly better, without breaking what works or
erasing what is theirs.

The visual method this workflow uses is a third-party work, included under
its own licence in [references/unslop/](../references/unslop/method.md).
Anti-Slop runs it and adds the checks around it.

Read [references/unslop/method.md](../references/unslop/method.md) now, and
the files it sends you to
([signs](../references/unslop/signs.md),
[tokens](../references/unslop/tokens.md), and when a pass calls for them
[visuals](../references/unslop/visuals.md),
[effects](../references/unslop/effects.md),
[refs](../references/unslop/refs.md)). Read
[references/core-contract.md](../references/core-contract.md) only if you are
unsure whether something may be changed.

## 1. Look, and check that it works

- Read the target files. Identify the product, the audience, and what this
  screen is for.
- Render it if you can, at desktop and phone width. Keep the "before".
- Anything blank, missing, overlapping, or broken is a finding. Find the
  cause in the code (a script error, a wrong selector, a bad path). Do not
  blame your tools without evidence. Fix what is small and clearly correct;
  report the rest.

## 2. Decide how far to go

| What you found | Mode | What to do |
|---|---|---|
| A narrow request ("fix the spacing in X") | **Tune** | Only what was asked, plus defects in that area, using the method's values |
| Nothing wrong, and it looks good | **No-op** | Change nothing and say so |
| A real identity (logo file, brand tokens, a palette chosen for this product) with weak spots | **Elevate** | Run the method, keeping the brand colour, typeface, and logo |
| Template defaults, or the user says it looks AI-generated or generic | **Reinvent** | Run the method in full |

A purple-to-blue gradient palette, the framework's default typeface, glows,
glass, and sparkle marks are never an identity.

## 3. Run the method

Follow method.md from its audit through its passes and its checklist, in its
order, using its tokens. Where it asks you to confirm the direction with the
user, do so unless they said to just do it or you are running unattended.

Where it relies on things you do not have:

- **No image tool:** the visual is built in HTML, CSS, and SVG. On a landing
  page that means the product itself, drawn with plausible content.
- **Its helper scripts are not included:** skip the steps that call them
  (saving a live site, rendering a story video).

## 4. What Anti-Slop adds

Hold these while you run the method. They win where it is silent.

- **Behaviour survives.** Handlers, ids, names, form contracts, routes,
  `data-*` hooks, and anything a script or test targets stay working.
- **Real things survive.** Photographs and illustrations of the actual
  product, people, or places are content. Facts, figures, names, and legal
  text keep their meaning. Claims you cannot verify are removed and listed
  for the user, never replaced with other invented claims.
- **People's words are not microcopy.** Text shown as written by someone (a
  customer message, a review, an email subject, a comment) stays exactly as
  it is, emoji and exclamation marks included. Clean the interface around it.
- **The theme stays.** A dark screen stays dark and a light one light, unless
  the user asks. A page with a bright or pastel background is light. Do not
  make dark the default, and do not make the page follow the system theme.
- **Accessibility floor.** Native elements; every control named; real labels
  on inputs; real tables for tabular data; text contrast at least 4.5:1;
  never colour alone for status; a visible `:focus-visible` style; targets at
  least 24px; `prefers-reduced-motion` honoured. Never remove ARIA, labels,
  or keyboard support as clutter. More in
  [references/accessibility.md](../references/accessibility.md).
- **Numbers agree.** A total matches what it sums; a count matches its list.
  If the source disagrees with itself, do not pick a side silently: flag it.
- **It still works at phone width.**

## 5. Finish checks

The places where runs of the method most often came out weaker. Go through
them on the rendered result before you verify.

- **Contrast.** Body text and table cells use the primary or secondary text
  role; muted is for metadata only, and even muted text is clearly readable
  (labels, axis ticks, and table metadata are the usual offenders). Every text and background pair reaches
  4.5:1, including text on a selected row, on an accent fill, and on a
  status colour. Check the pairs you actually rendered, not the tokens.
- **Switches show their state in the accent.** A toggle, checkbox, or radio
  that is on uses the accent; off is neutral. Related settings sit together
  in one section with hairline dividers, not one card each.
- **States.** Selected and active are one raised surface step with primary
  text, the same everywhere on the screen. No accent fill behind text, no
  thick coloured edge. Look at the selected row, the active nav item, hover,
  and focus in the render.
- **Status colours stay small.** A dot plus a word. Never blocks, bars, or
  fills in several status hues side by side: a timeline or schedule strip
  uses neutral blocks, with the accent on the one that is current.
- **The accent is small and soft.** It goes on the primary button and on the
  one thing that needs attention (the low-stock bar, the overdue item, the
  current period, a held slot). Add up everything drawn in it: one button
  and a few small marks, never a row of large filled tiles or an
  accent-coloured chart as well. On dark themes use a muted, lighter tone of
  the accent (soft mint, sand, pale amber) with dark text, not a saturated
  one. An off-white button is the fallback when the accent would be loud.
- **The accent fits the world.** Cool products (developer tools, monitoring,
  infrastructure) take a cool or quiet accent; warm products take a warm one.
  Amber on a cold ink page reads as a warning, not a brand.
- **Meters are thin.** Progress bars, segment strips, and usage meters are 4
  to 8px tall. A progress summary is one compact line (label, strip, figures),
  not a card with a huge percentage.
- **The ramp matches the product.** Work tools with no warm world (boards,
  trackers, admin) use the graphite ramp: neutral greys, no blue or lavender
  cast. Warm products use the warm ramp, technical ones the ink ramp, in dark
  themes too. Take the hex values from tokens.md rather than mixing your own.
- **Small tags are outlined.** A label on a card or row is a small chip with
  a hairline border and normal text, not loose mono text and not a coloured
  pill.
- **Type is chosen, with a partner.** Pick the family from the character
  table in tokens.md. Products about people (meetings, teams, bookings,
  food, health, learning) get the warm ramp and a serif headline or page
  title; do not default them to cool grey and a plain sans. Keep a small
  flat logo mark beside the wordmark.
- **Mono is for codes.** Ids, keys, SKUs, room numbers, terminal text. Dates,
  money, counts, and names stay in the interface face with tabular figures.
  A table set mostly in mono reads as a log, not a product. Table text is 14
  to 15px in the primary colour.
- **The drawn thing is the product's own act.** Show the thing only this
  product does: a worked equation for maths tutoring, a route on a map for
  hiking, a pay run for payroll, a 90-day uptime strip for monitoring. A
  generic line chart is right only when the product is about the chart.
- **A hero fits the first screen, and fills it.** The product panel is
  compact (a header, one or two figures, one small visual, three or four
  rows) and ends above the fold at 1280×900. The hero starts 96 to 128px
  under the navigation, not vertically centred with empty bands above and
  below. Keep the page's supporting row (its three features or facts) under
  the hero, each as a short title with one plain sentence, so the first
  screen is composed top to bottom.
- **The drawn thing never displaces real content.** If adding it pushes the
  page's own lists or tables down or off the screen, make it smaller. On an
  app screen the best version is usually one thin line built from numbers
  already on the page: a stacked status bar across the summary, a strip
  showing quiet hours, a row of thin budget bars. Do not skip it; keep it
  to one line.
- **One panel in a hero.** One product view showing one complete example
  (the bill, who shares it, what each owes, the action). Not two floating
  cards.
- **The page uses its height.** Sections are spaced evenly down the screen.
  Do not pack everything into the top and leave the lower half empty, and do
  not stretch one card to fill it.
- **Nothing is cut off.** Scroll the render to the bottom. No row clipped
  mid-line, no panel covering another, no fixed-height container hiding
  content. Dates carry the right weekday for their year.
- **The headline has a point.** It says what changes for the user ("Know
  your API is down before your users do"), using facts on the page. For
  consumer products, name the annoyance it removes ("Split bills with your
  flatmates, without the chasing") rather than listing what it does. A
  category label ("Uptime monitoring for developers") is a subtitle, not a
  headline.
- **Soft, not stripped.** Keep one short entrance and quick hover and press
  feedback with the method's curve and durations. Removing loops and bounce
  does not mean removing all motion.

## 6. Verify

- Everything in step 4 still true?
- Render again and compare with the "before". Fix anything clipped,
  overlapping, cramped, or empty.
- Run cheap checks the project has (tests, type checker, linter).

## 7. Report

- The mode and the direction.
- Defects found in step 1: fixed, and not fixed.
- What changed, biggest first; microcopy and claims you changed or removed.
- Anything that needs the user's decision, and what you could not verify.
