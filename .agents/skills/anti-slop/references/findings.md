# Research findings digest

Individual research findings that bear on interface decisions, each with what
it measured, how far it reaches, and what to do with it. Open this when you
need to justify a choice, settle a disagreement, or check whether something
you "know" about design is actually supported.

Companion files: [striking-or-odd.md](striking-or-odd.md) covers novelty,
typicality, and fluency; [tells.md](tells.md) covers what people report about
AI-made UI. Verification status for every source is in
[`docs/research/evidence-ledger.md`](../docs/research/evidence-ledger.md).

A finding here is a reason, not a rule. Each one came from a particular
sample doing a particular task. Use it where the situation resembles the
study, and say so when you cite it.

## People do not share one taste

**Finding.** In about 2.4 million ratings of 430 websites by nearly 40,000
people, the level of colourfulness and visual complexity that people found
most appealing differed markedly by country, education, and gender. More
education went with a preference for less colourful, less complex sites;
women preferred more saturated colour than men; some countries were far more
put off by complexity than others (Reinecke & Gajos, 2014).

- **Reach:** very large sample, ratings of screenshots after brief exposure.
- **Do:** find out who the audience is before choosing how colourful and how
  dense to go. Do not present your own preference, or a design community's,
  as what "users" like. A restrained palette is a choice for an audience, not
  a universal good.

## Looks are a large part of perceived credibility

**Finding.** When 2,684 people were asked to judge the credibility of live
websites and say why, comments about the site's "design look" appeared in
46.1% of responses, more than any other category; the share was higher for
finance sites. In a companion study, health experts mentioned design far less
often than ordinary consumers did, and weighed sources and credentials
instead (Fogg et al. / Consumer WebWatch, 2002).

- **Reach:** what people *said* drove their judgment, on early-2000s sites. It
  shows design is salient to lay visitors, not how much it changes behaviour.
- **Do:** treat finish as part of trust, especially for money, health, and
  first-visit pages. For expert audiences, put evidence and provenance ahead
  of polish.

## Round reads friendlier than sharp

**Finding.** People rated objects with curved contours as more likeable than
the same kinds of object with sharp angles (Bar & Neta, 2006). The original
explanation, that sharp shapes signal threat, has been challenged by later
work; the preference itself has held up better than the reason for it.

- **Reach:** everyday objects and abstract shapes rated in a lab.
- **Do:** use rounder forms when the product should feel approachable and
  sharper ones when it should feel precise or serious. It is a lever for
  character, not a mandate to round everything.

## Dark text on light is easier to read, especially small

**Finding.** Across several experiments, people proofread and read small text
better with dark characters on a light background than the reverse, and the
advantage grew as the text got smaller; the likely mechanism is that a
brighter display narrows the pupil and sharpens focus (Piepenbrock, Buchner
and colleagues, 2013–2014). Another study found no difference in simulated
daylight but worse reading of small text in dark mode at night (Dobres et
al.).

- **Reach:** legibility tasks, not preference or comfort over long sessions.
- **Do:** for long reading and dense small text, default to a light theme, or
  enlarge and lighten text in a dark one. A dark theme is a legitimate choice
  for mood, media, and low-light use; offer both where you can, and never set
  small low-contrast text on dark.

## Some chart encodings are read more accurately than others

**Finding.** People judge quantities most accurately from position along a
common scale, then from length, then from angle and area, and least
accurately from colour saturation (Cleveland & McGill, 1984).

- **Reach:** a foundational and much-replicated ordering for *reading values
  off* a chart.
- **Do:** when the reader needs to compare values, use bars, dots, or lines on
  a shared axis. Use pies, bubbles, and colour intensity only for rough
  proportion or when precision does not matter.

## Decorated charts are remembered better

**Finding.** In a small study, charts with illustrative embellishment were
read no less accurately than plain ones and were recalled better weeks later
(Bateman et al., 2010). In a large study of several thousand visualisations,
colour and recognisable objects made visualisations more memorable, and
common chart types were less memorable than unusual ones (Borkin et al.,
2013). Critics note that being memorable is not the same as being understood.

- **Reach:** memorability, not decision quality.
- **Do:** match the chart to its job. In a dashboard people use to act, keep
  charts plain and precise. In a report, a landing page, or a story, where the
  point is for one number to stick, an illustrated or unusual chart is
  defensible. "Chart junk is always wrong" is not supported.

## Labels above fields are a sound default

**Finding.** An eye-tracking test found that people moved from a label to its
field much faster when the label sat above the field than when it sat to the
left (Penzo, 2006). The test was informal, and a later small study found
right-aligned labels as fast or faster.

- **Reach:** thin. Two small studies that partly disagree.
- **Do:** put labels above fields by default, since it also works on narrow
  screens and with long labels. Do not cite this as settled science.

## Whitespace carries meaning people have learned

**Finding.** Generous empty space in advertising is read as a signal of
prestige and confidence. Experiments tie this to its history in advertising
and show the meaning varies across cultures (Pracejus, Olsen & O'Guinn, 2006,
2013). Surveyed creative directors said they use it to direct attention and
convey prestige, and that clients often see it as wasted space.

- **Reach:** print advertising, mostly North American.
- **Do:** use space deliberately as a signal where restraint suits the brand.
  It is not automatically "premium" for every audience, and in a tool it is
  simply distance the user has to scroll.

## Good typography changes how reading feels more than how fast it goes

**Finding.** People who read well-set text reported that less time had passed
and did somewhat better on tasks sensitive to mood than people who read
poorly set text, while reading speed and comprehension barely differed
(Larson & Picard, 2006). Samples were small.

- **Reach:** suggestive.
- **Do:** argue for typographic care on the grounds of experience and
  perceived quality. Do not promise it will make people read faster.

## AI raises individual quality and lowers variety

**Finding.** Writers given AI-generated ideas produced stories that were rated
more creative and better written, with the biggest gains for less creative
writers, and the AI-assisted stories were more similar to one another than
stories written without it (Doshi & Hauser, 2024).

- **Reach:** short fiction; the pattern is the relevant part.
- **Do:** this is the mechanism behind sameness in AI-made interfaces. Each
  output can look fine while the set converges. The counter is input the
  model does not already have: this product's facts, audience, and world.

## Examples get copied

**Finding.** Designers shown an example solution before a task reproduced its
features in their own designs, including features that had been pointed out
as flaws ("design fixation"; Jansson & Smith, 1991). Later studies found the
effect varies with discipline and experience.

- **Reach:** engineering and design students and practitioners.
- **Do:** treat every example in a prompt, a brief, or this skill as something
  you will tend to copy. Take the method from an example, never its content.
  When you give a user options, make them differ in kind. (This project saw
  the effect directly: two test agents reproduced example ideas that matched
  their task. See `evals/RESULTS.md`.)

## Claims to avoid, because the support was not found

Things often said in design writing that this project either could not verify
or found to be misapplied. Do not assert them as fact.

- **A golden-ratio layout is inherently more beautiful.** Not verified; the
  research generally cited does not show a reliable preference.
- **"75% of users judge credibility by design."** A popular rewording of the
  credibility study above, which measured how often design was *mentioned*
  (46.1%), not how many people rely on it.
- **A fixed 60-30-10 colour split.** A decorating rule of thumb.
- **No more than seven menu items.** A misreading of research on short-term
  memory span.
- **A specific colour raises conversion.** Results from single A/B tests do
  not transfer between products.
- **An optimal line length as one number.** The evidence supports a range.
- **Minimal is always more usable.** First-impression studies favour low
  complexity; they say nothing about expert or long-term use.
