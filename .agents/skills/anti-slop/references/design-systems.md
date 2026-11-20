# Design systems and existing conventions

Most UI work happens inside a product that already has a visual language,
documented or not. Finding and following it is usually the highest-value design
act available. Evidence tags are defined in [core-contract.md](core-contract.md).

## Find the system

Look, in roughly this order:

1. **Declared tokens and themes**: CSS custom properties (`:root`, theme
   classes), `tailwind.config.*` / `@theme`, theme objects (MUI, Chakra,
   styled-system), Sass/Less variables, design-token JSON.
2. **Component library**: a `components/ui` directory, a package such as
   shadcn/ui, Radix, MUI, Ant, Mantine, Bootstrap, or an internal library;
   Storybook stories; variant definitions (`cva`, `variants`).
3. **Usage**: what values and components the existing screens use. When
   declared tokens and usage disagree, usage shows the real system; note the
   drift.
4. **Docs**: README, CONTRIBUTING, design docs, brand guidelines, comments.
5. **Neighbours**: how the most similar existing screen solves the same
   problem. Match it.

Record, briefly: the spacing scale, type roles, colour roles, radius and shadow
values, breakpoints, the button/input/card variants available, and the icon
set.

## Follow the system

### Reuse before creating `[convention]`

Use existing components and variants. A new component is justified when no
existing one fits the need, not when an existing one is slightly different from
what you would have drawn.

- **Signs of violation:** a hand-written button beside an imported `Button`; a
  second modal implementation; raw `<input>` styling where a `TextField` exists.
- **Fix:** replace with the system component; if a variant is missing, add the
  variant to the component (if in scope) so the next use gets it too.

### Tokens, not literals `[convention]`

Reference tokens for colour, spacing, type, radius, shadow, and motion. If the
needed value is missing, use the nearest token. Add a token only for a genuinely
new role, in the token source, named by role (`--color-text-muted`), not by
value (`--gray-500-ish`).

- **Signs:** hex colours, arbitrary pixel values, and bracket utilities
  (`w-[437px]`, `text-[#333]`) in a codebase that has tokens.
- **Exceptions:** one-off layout dimensions tied to specific content; optical
  adjustments.

### Token tiers `[convention]`

Mature systems separate *primitive* tokens (the palette and scales: `blue-600`,
`space-4`) from *semantic* tokens (roles: `color-action-primary`,
`space-inline-md`), and sometimes *component* tokens. Components should consume
semantic tokens so themes and dark mode work by re-mapping roles. Do not
introduce tiers into a small project that does not need them.

### Themes inherit `[convention]`

If the project supports themes (light/dark, brands, density), anything you add
must work in all of them. A hard-coded `#fff` in a themed product is a bug.
Check new colour pairs in every theme.

### Consistency beats local optimum `[convention]`

A value that is slightly better in isolation but different from the system is
worse for the product: it adds a special case users and developers must absorb.
If the system's value is actually wrong (for example, it fails contrast), fix it
at the token, state the blast radius, and stay within scope.

## When the system is weak or inconsistent

- **Drift** (several values for the same role): in refine, converge the touched
  code on the dominant or declared value. Do not launch a codebase-wide cleanup
  unasked; report the drift.
- **No system at all**: in create, establish a minimal one (see
  [workflows/create.md](../workflows/create.md), step 5). In refine, infer the
  de facto values and consolidate within scope.
- **A system you dislike**: follow it. Preference is not grounds for change.
- **A system with real defects**: report the defect with evidence and fix at
  the source if authorised.

## Third-party libraries

- Work with the library's theming API and variants, not against it with
  overrides and `!important`.
- Library defaults are a starting point. An unthemed library used as-is is not a
  defect in an internal tool; in a product that needs its own identity, theme
  the tokens (colour, type, radius, density) instead of restyling components
  one by one.
- Keep the library's accessibility behaviour intact; do not replace its
  primitives with lookalikes.

## Platform conventions

On native or platform-specific surfaces, the platform's guidelines (Apple HIG,
Material, Fluent, GNOME HIG) are part of the system: navigation patterns,
control styles, and gestures users expect. Follow them unless the product
deliberately has its own cross-platform identity. These guidelines are
conventions with good reasons behind them, not universal law; do not apply one
platform's rules to another.

## Matching a reference design

When the user supplies a reference (screenshot, URL, mockup, "like Linear"):

1. Identify what makes the reference what it is: density, type scale and
   weights, colour roles, spacing rhythm, shape language, level of chrome.
   Describe these as decisions, not as pixels.
2. Separate **structure** to follow from **content and brand** not to copy.
   Never reproduce another company's logo, illustrations, copy, or distinctive
   trademarked look as the product's own.
3. Translate into the project's tokens and components. Where the reference
   conflicts with the existing system, ask which wins, or follow the system and
   say so.
4. If you cannot view the reference, say so and work from the user's
   description; do not claim a match you could not check.
5. Keep Anti-Slop's own floor: a reference that fails contrast or lacks focus
   states is matched in character, not in its defects.

## Extracting a design system

When asked to document or extract the system from an existing codebase:

1. Inventory actual usage: colours, font sizes/weights, spacing values, radii,
   shadows, breakpoints, and component variants, with rough frequency.
2. Cluster near-duplicates and propose the canonical value for each role,
   keeping the dominant existing value unless it has a defect.
3. Name by role. Present primitives and semantic roles separately.
4. List inconsistencies and one-offs as findings, not as silent merges.
5. Deliver in the project's own format (CSS variables, Tailwind theme, token
   JSON) or as a document, as requested. Extraction is descriptive: do not
   change call sites unless asked.
