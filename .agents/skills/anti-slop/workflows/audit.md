# Workflow: audit

Evaluate an interface and report. **Do not create, edit, move, or delete any
project file in this mode**, including "trivial" fixes, formatting, or a report
file the user did not ask for. The report goes in your reply. If the user wants
fixes afterwards, that is a separate refine request.

The risks in this mode are false positives (flagging a common pattern as a
problem) and false certainty (describing visuals you have not seen).

## 1. Establish context and evidence

- Product, audience, primary task of each screen in scope.
- The project's existing system
  ([references/design-systems.md](../references/design-systems.md)), so that
  you judge the interface against its own intent.
- Evidence basis: **rendered** (you viewed screenshots or a live preview) or
  **source only**. State it at the top of the report. If source only, do not
  write "looks", "appears", or "feels" about visual results; write what the code
  specifies.

## 2. Inspect

Read [references/rubric.md](../references/rubric.md),
[references/accessibility.md](../references/accessibility.md),
[references/tells.md](../references/tells.md), and
[references/design-principles.md](../references/design-principles.md). A tell
from tells.md is a finding only when the core contract's test holds: no
evidence of intent, and a harm you can name. Load
other references only for the areas you find questions in.

Go through the rubric dimensions in order. For each candidate issue, apply the
core contract's classification. Before recording a finding, test it:

- Can I name the harm in this context, to this user, for this task?
- Does a documented exception apply (brand, domain, density need, platform)?
- Is this the project's deliberate, consistent choice?
- Could I be wrong about what renders?

If the harm cannot be named, drop it. If it hinges on something you cannot see,
record it as insufficient evidence.

## 3. Report

Use this structure.

```markdown
## Anti-Slop audit: <scope>

**Evidence basis:** source only | rendered (<how>)
**Context assumed:** <product, audience, primary task; one or two lines>

### Summary
<Two to four sentences: overall state, the most important problems, and what is
working and should be kept.>

### Findings

#### 1. <Problem stated in one line>
- **Location:** <file:line, component, or selector>
- **Category:** hierarchy | typography | layout | color | components |
  interaction | accessibility | consistency | content | context-fit
- **Severity:** blocker | major | minor
- **Classification:** clear defect | likely improvement
- **Confidence:** high | medium | low
- **Principle:** <rule name> `[standard|empirical|convention|judgment]`
  (<reference file>; WCAG criterion if applicable)
- **Explanation:** <why this is a problem here, for this user and task>
- **Suggested improvement:** <concrete and scoped; not "improve hierarchy">

### Preferences (optional, not defects)
- <Alternative worth considering, labelled as taste.>

### Could not assess
- <What, and what evidence would settle it.>

### Working well
- <Things to preserve, so a later refine does not undo them.>
```

Rules for the report:

- Order findings by severity, then confidence.
- **Severity**: *blocker* prevents task completion or excludes users (unlabelled
  required field, keyboard trap, unreadable text). *Major* significantly slows
  or misleads (no clear primary action, status by colour alone). *Minor* is
  friction or inconsistency with limited impact.
- **Confidence** reflects evidence, not conviction. A computed contrast ratio
  from two literal colours is high. A hierarchy judgment from source is medium
  at best. Anything depending on cascade, theming, or images is low until seen.
- Only `[standard]`-backed findings may be stated as violations, and name the
  criterion. Everything else is phrased conditionally.
- Copy the evidence tag from the rule as written in the reference. Do not
  upgrade a `[convention]` to `[empirical]` or a best practice to `[standard]`.
- One finding per problem. If the same problem recurs, report it once with all
  locations.
- No scores, grades, or percentages. No padding: three real findings are a
  better audit than twelve weak ones.
- An audit of a good interface says so. Zero findings is a legitimate report;
  still fill in "Working well" and "Could not assess".

See [examples/audit-report.md](../examples/audit-report.md) for a worked report.

## 4. Stop

Do not start fixing. Offer refine as a next step if findings exist.
