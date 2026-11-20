# Striking or odd: where the line is

What research on aesthetics and creativity says about why some unusual designs
stop people in a good way and others just look wrong, turned into rules you can
apply. Read this when a surface calls for boldness (see the table in
[craft.md](craft.md)) or when a design you made feels off and you cannot say
why.

Tags follow [core-contract.md](core-contract.md). Most findings here come from
psychology and product-design research, not from studies of shipped software,
and several are debated. Each section says how far it reaches.

## The findings

### Creative means new *and* fitting `[empirical: definitional consensus]`

The standard definition of creativity in the research literature has two
parts: originality and effectiveness (also phrased as novelty and
appropriateness). Something original that does not fit its purpose is not
called creative; it is called odd (Runco & Jaeger, 2012, tracing the
definition to Stein, 1953).

- **So:** novelty is half of the job. The other half is fit: the unusual choice
  has to serve this product and this user.
- **Reach:** a definition, widely used, not a measurement.

### Easy to process feels good `[empirical]`

People like what they can take in easily. Aesthetic pleasure tracks processing
fluency: clear figure against ground, symmetry, repetition, order, and
familiarity all make a thing easier to perceive, and easier is experienced as
more pleasant (Reber, Schwarz & Winkielman, 2004). Repeated exposure alone
raises liking (Zajonc, 1968).

- **So:** whatever you do that is new, make it effortless to read. High
  contrast, clear shapes, alignment, repetition.
- **Reach:** strong and broad, but it does not explain why challenging art can
  be rewarding; the authors say so. Fluency is a floor for interfaces, not the
  whole of beauty.

### A little surprise beats none, and beats a lot `[empirical, debated]`

Three lines of work point the same way:

- Preference tends to peak at moderate novelty and complexity, and falls off
  at both extremes (Berlyne's inverted U). Later work finds the shape is not
  universal and varies between people.
- Things that are *moderately* different from what people expect in a category
  are rated higher than things that match it exactly or break it completely.
  The explanation: a moderate mismatch can be worked out, and working it out
  is satisfying; an extreme one cannot, and is frustrating (Meyers-Levy &
  Tybout, 1989).
- In product design, typicality and novelty *both* predict liking, and they
  pull against each other. People prefer designs that are as novel as possible
  while still recognisable as the thing they are: "most advanced, yet
  acceptable" (Hekkert, Snelders & van Wieringen, 2003). The balance differed
  by product type, and later studies replicate it only partly; unity within
  variety has shown the more robust effect (Hekkert, 2014, and follow-ups).

- **So:** aim for a surprise the viewer can resolve in a second or two, on
  something they still recognise instantly.
- **Reach:** consumer products and images rated in studies. The direction is
  consistent; the exact balance point is not fixed.

### On the web, first impressions favour simple and typical `[empirical]`

Shown website screenshots for as little as 17 to 50 milliseconds, people rate
pages with low visual complexity and high prototypicality (looking like a
typical site of its kind) as most appealing; the two effects are already
present at 17ms, and typicality matters more the longer people look (Tuch et
al., 2012). An eye-tracking study found more typical layouts were judged more
competent (Miniukovich, Figl & Ernst, 2024, small sample). Moving navigation
to a non-standard place can be adapted to, but gaze patterns do not fully
normalise (Owens et al., 2014).

And the other side: AI-generated prototypes, which are highly conventional,
scored well on usability and poorly on originality (Romero et al., 2026,
preprint). Convention alone makes an interface forgettable.

- **So:** the *skeleton* of a page should be typical for its kind. The
  distinctiveness has to live somewhere other than the skeleton.
- **Reach:** screenshots and prototypes judged briefly; not long-term use.

### One different thing is remembered; many are not `[empirical]`

An item that differs from its neighbours is recalled better than the rest (the
isolation or von Restorff effect, 1933). The effect depends on the neighbours
being alike.

- **So:** one standout per view. A second one halves the first.

### Useful and delightful are separate things `[empirical]`

People judge interfaces on two largely independent dimensions: pragmatic
quality (does it help me get this done) and hedonic quality (is it stimulating,
does it say something about me). A product can be high on one and low on the
other (Hassenzahl, 2003 and later). Norman describes three levels of response:
visceral (immediate look and feel), behavioural (use), and reflective (what it
means to own and show).

- **So:** making something more usable will not make it more exciting, and the
  reverse. A bold surface has to be designed for both, on purpose.

## The rules

These follow from the findings above. The first is the one that matters most.

1. **Spend novelty where people look, not where they act.**

   | Keep conventional | Free to be new |
   |---|---|
   | Where navigation sits and what it is called | The idea and composition of the hero or main focal area |
   | How buttons, links, and form controls look and behave | Imagery, illustration, and how the product is shown |
   | Reading layout: left-aligned text, sensible measure | The character and scale of the type |
   | What icons mean; where search, cart, account live | The colour world |
   | Scrolling, back, and other browser behaviour | One composition move: asymmetry, overlap, scale, an edge bleed |
   | The overall skeleton of the page type | One moment of motion; the voice of the copy |

2. **Recognisable at a glance.** Within a second a visitor should know what
   kind of page this is and what to do first. A pricing page still reads as a
   pricing page; a dashboard as a dashboard. Be typical in structure, then
   distinctive in what fills it.

3. **One surprise, and it resolves.** The unusual element should make sense
   within a couple of seconds without a caption. If you need to explain it, it
   is past the line.

4. **Make the new thing the easiest thing to read.** The bolder the element,
   the more it needs clear figure and ground, strong contrast, clean edges, and
   order around it. Novel and fluent reads as striking. Novel and effortful
   reads as odd.

5. **Unity holds the variety.** The unusual element uses the same palette,
   type, grid, and shape language as everything else. An element from a
   different system looks pasted on.

6. **It has to fit.** Say in one sentence why this choice belongs to this
   product and no other. If the sentence is "it looks cool", it is decoration,
   and decoration that draws this much attention is odd.

7. **One standout per view.** Quiet everything else to pay for it. When you add
   a bold element, lower complexity elsewhere; bold does not mean busy.

8. **Calibrate to the audience and how often they return.** Tools used daily
   lean hard toward the typical: familiarity is efficiency, and liking grows
   with exposure. Pages seen once, and audiences who look at a lot of design,
   reward more novelty. When unsure, be bolder in the look and more
   conventional in the behaviour.

## Telling them apart

| Striking | Odd |
|---|---|
| You know what the page is before you notice what is unusual | You notice the unusual thing and then hunt for what the page is |
| The surprise makes sense, and the sense relates to the product | The surprise needs explaining, or could sit on any product |
| One thing is loud; the rest is calm and ordered | Several things compete; nothing is calm |
| Controls are where you expect, looking like controls | You have to discover how to use it |
| Text is effortless to read | Text is hard to read for effect (low contrast, tilted, tiny, overlapping) |
| It still works if you remove the flourish | Removing the flourish reveals nothing underneath |
| Unusual in one or two dimensions | Unusual in every dimension at once |

If a design feels off, find which row it fails and fix that row. The usual
causes are: novelty spent on something people need to operate, more than one
standout, or a bold element that is hard to read.

## Schools of thought, as lenses

Design philosophies are positions, not findings. Each is a consistent way of
resolving the tension above. Borrow one when it suits the product; none is
correct in general. `[judgment]`

- **Functionalist ("less, but better"; form follows function).** Remove until
  only what serves use remains. Suits tools, utilities, anything used daily.
  Risk: cold or interchangeable when the product needs a voice.
- **International / Swiss style.** Grid, objective typography, asymmetric
  balance. Suits information-heavy and institutional work. Risk: the neutral
  default everyone reaches for.
- **Data-ink minimalism (Tufte).** Every mark carries data. Suits charts,
  tables, dashboards. Risk: austere where a little warmth would help reading.
- **Emotional design (Norman).** Design for the visceral, behavioural, and
  reflective levels together. Suits consumer products. Risk: charm that gets
  in the way of the task.
- **Expressive and maximal (postmodern, Memphis, editorial).** Personality,
  colour, play, rule-breaking as the point. Suits brands, culture, youth,
  campaigns. Risk: this is where "odd" lives; rules 1 to 7 are the guard rail.
- **Brutalist and raw.** Exposed structure, default elements used on purpose.
  Suits portfolios, culture, statements. Risk: reads as unfinished unless the
  intent is unmistakable.
- **Emptiness and restraint (ma; Kenya Hara).** Space as the active element.
  Suits luxury, contemplative, single-purpose pages. Risk: empty without the
  one thing the emptiness is for.

Pick the lens from the product's world and audience, say which you picked, and
stay inside it. Mixing lenses within one screen is a common source of odd.

## What this does not establish

- Nearly all of this evidence comes from ratings of images, objects, and
  screenshots, often after very short exposure. None of it measures conversion,
  retention, or long-term satisfaction with a product.
- The inverted-U and "most advanced, yet acceptable" results are directionally
  consistent and individually contested; treat them as a compass, not a
  formula.
- Tastes differ between people, cultures, and decades. These rules reduce the
  chance of "odd"; they do not guarantee "stunning". That still takes an idea.
