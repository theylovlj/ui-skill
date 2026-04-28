# spacing.md — The Complete Spacing, Sizing & Composition Law

**This is the canonical reference for every spacing, sizing, and composition decision.** Synthesized from measured computed-styles of Stripe, Linear, Vercel, Apple, Datadog + research from Refactoring UI, Geist, Radix, Material 3, NN/g eye-tracking, Baymard, Tufte, Stephen Few, Müller-Brockmann.

**Read this every build before touching layout.** If you're making a sizing or spacing decision and it isn't in here, you're guessing.

---

## TL;DR — The 14 Commandments

1. **Container max-width 1200-1440px desktop.** Never exceed for content. Stripe 1266 / Linear 1344 / Vercel 1200-1400. Tailwind: `max-w-7xl` (1280px) is the workhorse default.
2. **Section padding scales:** hero `py-32`, default `py-24`, compact `py-16`, transition `py-12`. NEVER `py-24` on every section — that's no rhythm.
3. **Asymmetric padding** when a section ends in an illustration/mockup: `pt-24 pb-32` (Linear's default — bottom heavier). NEVER symmetric on every section.
4. **Mobile padding ~50% of desktop:** `py-14 md:py-24 lg:py-32`. Stripe drops 96 → 56px on mobile.
5. **Content must fill ≥75% of container width** when the section has a contrasting bg. Otherwise = tiny island = AI tell.
6. **Hero column split: 5/12 text · 7/12 mockup** (golden ratio). NEVER 50/50.
7. **H1 sits at 28-38% from top** (upper third / rule-of-thirds line). NEVER vertically centered.
8. **8 locked type sizes:** display 96 / hero 72 / h1 48 / h2 32 / h3 24 / body-lg 20 / body 16 / caption 13. **NO 18px, NO 40px** — those are indecisive middles.
9. **Big type = tight tracking.** display `-0.04em`, hero `-0.035em`, h1 `-0.03em`, body `-0.011em`. The single biggest premium-feel multiplier.
10. **Body line-height 1.55, NOT 1.75.** Tailwind prose default (1.75) is for markdown, not landing pages.
11. **8px vertical rhythm — no exceptions.** Acceptable values: 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.
12. **Inside dashboards (NOT marketing):** 12-13px body, 28-32px row height, 12-16px card padding, 1px borders at 6-10% opacity, NO drop shadows. The single biggest AI mistake is importing marketing padding (96-128px) into the app shell.
13. **Status badges: tinted bg + tinted text on same hue.** `bg-red-950 text-red-400 border-red-900`. NEVER solid color fills (`bg-red-500 text-white`).
14. **Primary CTA ≥ 48-60px tall, contrast ≥ 4.5:1, repeat every 1.5 viewports** on long pages. Sticky bottom-CTA on mobile = +10-20% conversion.

---

## 1. SECTION PADDING — The Rhythm System

### The values (measured from Stripe, Linear, Vercel, Apple)

| Section type | Mobile | Tablet | Desktop | Wide |
|---|---|---|---|---|
| **Hero** | `py-20` (80) | `py-28` (112) | `py-32` (128) | `py-40` (160) |
| **Default feature** | `py-14` (56) | `py-20` (80) | `py-24` (96) | `py-24` (96) |
| **Asymmetric feature** (ends in mockup) | `pt-14 pb-20` | `pt-20 pb-28` | `pt-24 pb-32` | `pt-24 pb-32` |
| **Logo cloud / social proof** | `py-10` (40) | `py-12` (48) | `py-16` (64) | `py-16` (64) |
| **Stats row** | `py-12` (48) | `py-16` (64) | `py-20` (80) | `py-20` (80) |
| **Testimonial grid** | `py-16` | `py-20` | `py-24` | `py-24` |
| **Single quote (no bg)** | `py-20` | `py-28` | `py-32` | `py-32` |
| **Final CTA** | `py-20` | `py-28` | `py-32` | `py-32` |
| **Footer** | `pt-16 pb-8` | `pt-20 pb-10` | `pt-24 pb-12` | `pt-24 pb-12` |

### Copy-paste responsive defaults

```jsx
// Default section
className="py-14 md:py-20 lg:py-24"

// Hero / final CTA
className="py-20 md:py-28 lg:py-32"

// Asymmetric feature (illustration at bottom)
className="pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32"

// Compact (logos, stats, transitions)
className="py-10 md:py-14 lg:py-16"
```

### The asymmetric padding law

**STOP using `py-24`.** Linear's homepage uses `padding-top: 96px; padding-bottom: 128px` on every feature section — asymmetric is their DEFAULT, not exception.

**When to make padding asymmetric:**
- Section ends in an illustration/screenshot → 33% MORE bottom (`pt-24 pb-32`)
- Section ends in a CTA button → MORE bottom (give the button air)
- Hero (top of page) → MORE bottom (`pt-24 pb-40` — content sits high)
- Footer-adjacent → LESS bottom (`pt-24 pb-12`)

The 3-tier rhythm: hero `py-32`/`py-40` → features `py-24` → transitions/logos `py-12`. The CONTRAST between tiers IS the rhythm. Same padding everywhere = no rhythm.

---

## 2. CONTAINER WIDTH — The 75% Fill Law

### The decision tree

```
SECTION TYPE → CONTAINER → VERTICAL PADDING

Hero (above fold)
  ├─ Full-bleed media bg → max-w-none, py-32 lg:py-48
  └─ Centered headline   → max-w-5xl, pt-32 pb-40

Feature (image + text side-by-side)
  └─ max-w-7xl (1280px), py-24 lg:py-32

Three-column feature grid
  └─ max-w-7xl, py-24, gap-8

Single quote / testimonial (one quote)
  ├─ Section has bg color → max-w-4xl MIN, py-24
  └─ Section is bg-white  → max-w-2xl ok, py-32

Quote grid (3-6 testimonials)
  └─ max-w-7xl, py-24, gap-6

Logo cloud / social proof
  └─ max-w-7xl, py-12 lg:py-16 (DELIBERATELY tight — it's a transition)

Pricing
  └─ max-w-6xl, py-24 lg:py-32, gap-6

Long-form content / blog
  └─ max-w-prose (624px / 65ch), py-16

Final CTA
  └─ max-w-4xl, py-24 lg:py-32

Stats row
  └─ max-w-7xl, py-16 lg:py-20

Footer
  └─ max-w-7xl, pt-16 pb-8
```

### THE TINY-ISLAND FAILURE — read this twice

**If a section has a contrasting background color** (dark on light, tinted card section, gradient), **content MUST fill ≥75% of the container width**. Otherwise it's the tiny-island AI tell.

**Failure example (the canonical AI mistake):** 600px testimonial card centered inside a 1440px section with `bg-stone-50`. Content is 42% of section width. Massive empty bg on each side. Looks broken.

**Fix — pick ONE:**
1. **Widen the content** to ≥960px. Add a 2nd column (avatar + role + company logo, then the quote).
2. **Drop the background** entirely so the testimonial merges with the page.
3. **Switch to a grid** of 3 quotes that fill the container.

**Self-check:** measure content width vs section width. If `<60%` AND there's a contrasting bg, it's broken.

### Container max-widths (measured from real sites)

- Stripe: `max-width: 1266px` (88.8% of 1440px viewport)
- Linear: `max-width: 1344px` (94.3% of 1440px viewport)
- Vercel: `max-width: 1200-1400px` (83-97%)

**Default container:** `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8` (1280px).
**Wide marketing:** `mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12`.
**Prose / single quote:** `mx-auto max-w-prose px-4` (624px = 65ch).
**Centered hero text:** `mx-auto max-w-4xl px-4 sm:px-6` (896px).

Horizontal gutter: 16px mobile, 24-46px desktop.

---

## 3. TYPE SCALE — The 8 Locked Sizes

### The scale (use ONLY these — adding any custom size collapses the system)

| Token | Use | px | rem | clamp() (fluid) |
|---|---|---|---|---|
| `display` | Hero ONLY | 96 | 6 | `clamp(3.5rem, 1rem + 7vw, 6rem)` |
| `hero` | Section opener / category H1 | 72 | 4.5 | `clamp(2.75rem, 1rem + 5vw, 4.5rem)` |
| `h1` | Page H1, second-section title | 48 | 3 | `clamp(2rem, 1rem + 3vw, 3rem)` |
| `h2` | Section header | 32 | 2 | `clamp(1.625rem, 1rem + 1.5vw, 2rem)` |
| `h3` | Card title, sub-section | 24 | 1.5 | `clamp(1.25rem, 1rem + 0.5vw, 1.5rem)` |
| `body-lg` | Hero subhead, lede | 20 | 1.25 | `1.25rem` (fixed) |
| `body` | All paragraphs, default | 16 | 1 | `1rem` (fixed) |
| `caption` | Eyebrows, meta, badges | 13 | 0.8125 | `0.8125rem` (fixed) |

**Why no 18px:** 16 → 20 is enough contrast. 18 is a "safe middle" that always feels indecisive.
**Why no 40px:** 32 → 48 is the cleanest jump on the page. 40 is a compromise.
**Why 13 not 14 for caption:** 14 reads as "small body." 13 reads as "ui chrome" — what you actually want.

### Line-height + letter-spacing (always paired with the size)

The bigger the type, the TIGHTER the leading and the more NEGATIVE the tracking. Universal premium rule.

| Token | line-height | letter-spacing | font-weight |
|---|---|---|---|
| `display` | 1.0 | -0.04em | 600 |
| `hero` | 1.05 | -0.035em | 600 |
| `h1` | 1.1 | -0.03em | 600 |
| `h2` | 1.15 | -0.02em | 600 |
| `h3` | 1.25 | -0.015em | 600 |
| `body-lg` | 1.5 | -0.01em | 400 |
| `body` | 1.55 | -0.011em | 400 |
| `caption` | 1.4 | 0 | 500 |

**Body line-height = 1.55, NOT 1.75.** Tailwind's `prose` default (1.75) is for markdown / docs you don't control. Landing-page body is 1.5-1.6.

**Negative tracking on display/hero is the single biggest premium-feel multiplier in the entire skill.** If you do nothing else, do this.

### Implementation — paste into `globals.css`

```css
:root {
  --text-display: clamp(3.5rem, 1rem + 7vw, 6rem);
  --text-hero:    clamp(2.75rem, 1rem + 5vw, 4.5rem);
  --text-h1:      clamp(2rem, 1rem + 3vw, 3rem);
  --text-h2:      clamp(1.625rem, 1rem + 1.5vw, 2rem);
  --text-h3:      clamp(1.25rem, 1rem + 0.5vw, 1.5rem);
  --text-body-lg: 1.25rem;
  --text-body:    1rem;
  --text-caption: 0.8125rem;
}

.t-display  { font-size: var(--text-display);  line-height: 1.0;  letter-spacing: -0.04em;  font-weight: 600; }
.t-hero     { font-size: var(--text-hero);     line-height: 1.05; letter-spacing: -0.035em; font-weight: 600; }
.t-h1       { font-size: var(--text-h1);       line-height: 1.1;  letter-spacing: -0.03em;  font-weight: 600; }
.t-h2       { font-size: var(--text-h2);       line-height: 1.15; letter-spacing: -0.02em;  font-weight: 600; }
.t-h3       { font-size: var(--text-h3);       line-height: 1.25; letter-spacing: -0.015em; font-weight: 600; }
.t-body-lg  { font-size: var(--text-body-lg);  line-height: 1.5;  letter-spacing: -0.01em;  font-weight: 400; }
.t-body     { font-size: var(--text-body);     line-height: 1.55; letter-spacing: -0.011em; font-weight: 400; }
.t-caption  { font-size: var(--text-caption);  line-height: 1.4;  letter-spacing: 0;        font-weight: 500; }
```

### Mobile crush ratios (use clamp(), don't shrink in steps)

| Token | Desktop | Mobile (375px) | Ratio |
|---|---|---|---|
| display | 96px | 56px | 0.58 |
| hero | 72px | 44px | 0.61 |
| h1 | 48px | 32px | 0.67 |
| h2 | 32px | 26px | 0.81 |
| h3 | 24px | 20px | 0.83 |
| body-lg | 20px | 18px | 0.90 |
| body | **16px** | **16px** | 1.00 (NEVER shrink body below 16px — accessibility failure + iOS auto-zoom) |
| caption | 13px | 13px | 1.00 |

### Font weights

- **600 + 400** (semibold + regular) → SaaS / B2B / dashboards (Geist, Linear, Vercel)
- **700 + 400** → consumer / e-commerce / creator (Stripe, Notion, Framer)
- **800 + 400** → high-energy / Gen-Z (Spotify, Liquid Death)
- **500 + 400** → editorial / longform (NYT, The Verge)

**Never use 300 weight.** Refactoring UI: "Stay away from font weights under 400. Use lighter color or smaller font size to de-emphasize."
**Maximum 3 weights per landing page.**

### Italic-serif accent — when it works

The "sans-serif primary + italic-serif accent on one word in the hero" pattern. **Slop unless you follow ALL of these:**
1. Display or hero size only. Never on H2 or below.
2. Maximum 2 words.
3. The italic carries semantic weight (the verb, the differentiator).
4. The serif contrasts the sans (geometric sans + high-contrast serif: Geist + Instrument Serif, Inter + PP Editorial).
5. **One occurrence per page.** Two = decoration = slop.

---

## 4. VERTICAL RHYTHM — The 8px Grid

### The acceptable scale

`0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128, 160, 192, 256`.

**Every margin is a multiple of 8.** Half-step (4px) only for inline icon/text alignment. Never 6, 10, 14, 18, 22, 35.

### Concrete margin rules (memorize)

| Relationship | Gap | Tailwind |
|---|---|---|
| Paragraph → next paragraph | 16px | `mb-4` |
| Body → next body block | 24px | `mb-6` |
| H3 → its body | 8-12px | `mb-2` / `mb-3` |
| Body → next H3 | 40px | `mt-10` |
| H2 → its subhead/body | 16px | `mb-4` |
| Body → next H2 | 64px | `mt-16` |
| H1 → subhead | 24px | `mb-6` |
| Subhead → CTA | 40px | `mb-10` |
| CTA → trust strip / next section | 80px | `mb-20` |
| Display → subhead | 32px | `mb-8` |
| Hero → next section (section padding) | 96-128px desktop / 64px mobile | `py-24 md:py-32` |

### The "space groups, not items" rule

H1+subhead+CTA = a unit (small gaps inside: 24px, 40px). Then BIG gap (96px) before the next unit. The page should breathe in groups, not have `mb-4` between every element.

---

## 5. HERO COMPOSITION — The 5/7 Split + Asymmetric Anchor

### HERO H1 LINE-COUNT LAW (the "wraps to 4 lines" fix)

**The recurring failure:** col-span-5 is too narrow at 1280px viewport for a 7-word H1 at 72px → text wraps to 4 lines, hero column becomes a tall narrow column, dead space accumulates around it. THIS IS A SIZING BUG, not a content bug.

**The rule:** the H1 must fit in **2-3 lines max** in the hero column at desktop (1280px+). If it wraps to 4+ lines, ONE of these is wrong:
- The H1 column is too narrow (widen to col-span-6, or use 6/6 split with mockup bleeding right)
- The H1 size is too large for the column width (drop one tier, e.g. hero 72 → h1 48)
- The H1 has too many words (cut to ≤7 words)
- The italic-serif accent word is too long and forcing a line break (pick a shorter word)

**Hard rule:** if H1 wraps 4+ lines on desktop, the hero is broken. Re-balance immediately. The fix in priority order:
1. Cut H1 word count first (best — copy improves)
2. Widen the H1 column second (col-span-5 → col-span-6, mockup bleeds)
3. Drop H1 size third (last resort — premium feel weakens)

**Width math:**
- col-span-5 at 1280px = ~520px column width → H1 at 72px fits ~5-6 words per line
- col-span-6 at 1280px = ~624px → fits ~6-7 words per line
- col-span-7 at 1280px = ~728px → fits ~7-9 words per line

If your H1 is "Catch every incident before it cascades" (6 words), col-span-5 is too narrow. Use col-span-6 or shorten to "Catch every cascade" (3 words) and widen the subhead.

### POST-HERO SPACING LAW (the void between hero and next section)

**The recurring failure:** the hero ends, then there's 200-400px of empty page before the next section (logo strip / stats / etc). Looks like a layout bug.

**Why it happens:** hero uses `pt-32 pb-20`, next section uses `py-16` — but the hero column is much TALLER than its content because the H1 wrapped to 4 lines, pushing the section to extend down. The mockup column ends at 600px from top, the H1 column at 700px from top (because it has CTAs + stat row below), but the section is `min-h-[100svh]` = 832px on a 1080p screen — leaving 130px of empty hero section before the logo strip starts.

**The fix — pick ONE:**
1. **Drop `min-h-[100svh]` from the hero.** Let the hero be its content's natural height. If natural height is 700px, the hero is 700px. NO forced viewport-filling.
2. **OR fill the hero with content.** Add a stat row, social proof line, or feature highlights inside the hero so it actually fills 100svh.
3. **OR if you keep `min-h-[100svh]`, use `flex flex-col justify-between`** so the bottom-of-hero content (CTAs, social proof) sticks to the bottom, removing the dead space.

**The post-hero gap rule:**
- Bottom of hero CONTENT to top of next section CONTENT = `pb-20 + py-16` to `pb-32 + py-24` MAX (= 144-224px total).
- If actual gap > 250px when measured in browser → bug.
- Logo strip / social proof immediately after hero should hug close (`py-10 md:py-14`), NOT `py-24`.

**Playwright self-check:**
```js
const hero = await page.$('section:first-of-type');
const heroBox = await hero.boundingBox();
const heroContent = await hero.$('h1');
const contentBox = await heroContent.boundingBox();
const heroBottomPadding = heroBox.height - (contentBox.y + contentBox.height + 200); // 200px for CTAs+stats
if (heroBottomPadding > 200) flag(`Hero has ${heroBottomPadding}px of dead space at bottom — drop min-h-[100svh] or fill it`);
```

### The default template (use unless you have a reason not to)

**Editorial Left** — the Stripe / Linear / Vercel / Mercury workhorse:
- Text dominates left ~5/12 of a 12-col grid
- Mockup occupies right ~7/12, often bleeding past the right edge
- Ratio ≈ golden (38.2 / 61.8)
- H1 baseline at ~38% from top of hero (upper third / rule-of-thirds line)
- Z-pattern reading flow

```jsx
<section className="pt-32 pb-20 md:pt-40 md:pb-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-5">
        {/* eyebrow → H1 → subhead → dual CTA */}
      </div>
      <div className="lg:col-span-7">
        {/* mockup — bleeds right */}
      </div>
    </div>
  </div>
</section>
```

### The other 4 templates

2. **Centered Editorial** (Vercel relaunches, Figma Config, OpenAI launches) — type-led, narrow centered stack at upper third with full-bleed visual below. Use when the *idea* is the product, not the screenshot.
3. **Asymmetric Diagonal** (Frame.io, Awwwards SOTD) — text top-left, mockup bottom-right, deep negative space in opposite corners. Use for editorial / agency / creative tools.
4. **Type-Only Massive** (Apple launches, Off-White) — H1 IS the visual at 12vw+. Subhead and CTA tucked corner. Use for manifestos / philosophy / agencies.
5. **Image Left / Text Right** — inverts Template 1. Photographic visual on left, text right. Use for fashion / hospitality / DTC.

### Pick the template (one question)

> *Is the proof the visual, or is the proof the message?*
>
> - Visual proof → Template 1, 3, or 5
> - Message proof → Template 2 or 4

Default: **Template 1**.

### The asymmetric padding rule (never `py-24` on the hero)

```
RECOMMENDED hero padding:
  pt-32 pb-20    (more top — content sits HIGH in viewport — DEFAULT)
  pt-40 pb-24    (extra-tall hero with more breathing room)
  pt-24 pb-32    (rare — only when content needs to "lift" toward bottom — Template 5)

NEVER on the hero:
  py-24 / py-32 / py-20    (symmetric — feels Bootstrapy)
```

### Optical center vs geometric center

Geometric center = 50% / 50%. Optical center = ~46-47% from top (3-5% above geometric). The eye perceives this as "centered."

For `min-height: 100dvh` heroes:
- WRONG: `items-center` → text at 50% → feels low
- RIGHT: `pt-32 pb-40` → more bottom padding → content sits visually HIGH

### The 1+1≠2 rule (one focal point)

If everything is emphasized, nothing is. A premium hero has exactly **one dominant element** + everything else quieter:
- One heavy H1 → subhead is 0.4-0.5× the visual weight (lighter color, smaller, looser)
- One primary CTA (filled, brand color) → secondary is GHOST (text-only or subtle outline). Visual weight ratio ≈ 3:1.
- One product visual → no carousel, no multiple stacked mockups
- One eyebrow tag (small) → no two badges side by side

### Negative space is a SHAPE

Don't think "leftover empty area." Think "the empty area is a shape I'm composing with."
- Template 1: top-right + bottom-left form an L
- Template 3: bottom-left + top-right corners create the diagonal axis
- Apple: negative space occupies 60-70% of composition

If you can't draw the negative-space shape and like it, the composition is wrong.

### Break the grid — exactly ONE thing per hero

The grid is for rhythm. Breaking it is for memorability. Pick ONE:
1. Bleed the mockup off the right edge (Template 1 — Stripe, Linear) — SAFEST WIN
2. Bleed type off the left edge (Awwwards style)
3. Full-bleed video/image background under the type
4. Diagonal mockup tilt (4-8°)
5. Type that overlaps the mockup top edge

**Break exactly ONE.** Three = chaos = early-2010s parallax disaster.

### Hero composition checklist (8/11 = ship-ready)

```
□ Column split is asymmetric (5/7 or 7/5, NOT 50/50)
□ H1 sits in the upper third (28-38% from hero top)
□ Exactly ONE focal point (one dominant visual, others quiet)
□ Two CTAs are visually unequal (filled + ghost, ratio ≈ 3:1)
□ Top padding ≠ bottom padding (pt-32 pb-20 default)
□ At least ONE element bleeds past the container
□ Negative space is a shape you can describe (L, diagonal, triangle)
□ Eye traces a Z (sparse) or F (dense) — pick one, commit
□ Content vertically anchored at OPTICAL center (~46%), not geometric (50%)
□ Subhead width capped < H1 width (max-w-prose / max-w-2xl)
□ Secondary text is demonstrably lighter than primary (not all neutral-700)
```

---

## 6. DASHBOARD DENSITY — The Marketing-vs-App Split

### THE RULE THAT FIXES EVERY FAKE-LOOKING DASHBOARD

**Vercel's marketing site uses 96-128px section padding. Vercel's actual app uses 12-16px inner padding.** They are TWO DIFFERENT DESIGN LANGUAGES.

The single biggest AI mistake: importing marketing-page padding (96-128px, 16px body, 56px row height) into the dashboard inside a hero MacBook mockup. Result = sparse half-empty wireframe.

**Inside a dashboard mockup:** apply the values below, NOT the marketing values from Section 1.

### The 5 visual cues that separate REAL from AI-FAKE

1. **Type is small** — body data is **12-13px**, not 16px
2. **Rows are short** — list rows are **28-36px** tall, not 56-72px
3. **Padding inside cards is small** — **12px or 16px**, not 24-32px
4. **Borders are nearly invisible** — **1px at 6-10% opacity**, not 1px at 20%
5. **Data is realistic and overflowing** — `api-gateway-prod-7f8` not `Item 1`. At least one panel should clip.

### Sidebar (left nav)

| Token | Value |
|---|---|
| Width (expanded) | **240px** (Linear ~224, Vercel/shadcn ~256) |
| Width (collapsed) | 48-56px |
| Background | 1-3% off main bg (DIMMER than canvas, not brighter — Linear's explicit choice) |
| Outer padding | 8px top, 8px sides |
| Group label | 11px UPPERCASE, 0.04em tracking, 60% opacity |
| Nav row height | **28px** (compact / Linear) / 32px (default) / 36px (comfortable) |
| Nav row font | 13-14px, weight 450-500 |
| Icon | 14×14 or 16×16, 1.5-2px stroke |
| Icon-to-label gap | 8px |
| Active state | 4-8% bg overlay + slight font-weight bump (NOT a 3px left bar — that's 2018 Bootstrap) |
| Group spacing | 12-16px between groups |

### Top bar

- Height: **44-48px** (workspace) / 56px max / 64px (marketing only — never in a dashboard)
- Horizontal padding: 12-16px
- Border-bottom: 1px at 6-10% opacity
- Search field: 28-32px tall, 13px text, with `⌘K` hint inline

### Panel / card

| Token | Value |
|---|---|
| Background | Same as canvas OR +2% lift |
| Border | **1px, opacity 0.06-0.10** on dark; `gray-200` on light |
| Border radius | **6-10px** (NEVER 16-24px — that's a marketing card) |
| Shadow | **None** (or single hairline `0 1px 0 rgba(0,0,0,0.04)`). Premium dashboards use BORDERS, not shadows. |
| Padding (compact) | 12px |
| Padding (default) | 16px |
| Padding (comfortable) | 20-24px |
| Header row inside | 32-36px tall, title 13-14px medium |
| Inter-card gap | **12-16px** (NOT 24-32px) |

### Data rows / tables

| Density | Row height | Font size | Use |
|---|---|---|---|
| Ultra-dense | 24-28px | 12px | Logs, traces, alert history |
| Dense | **28-32px** | 12-13px | Issue list, incident list, ticket queue |
| Default | 32-40px | 13-14px | Resource lists, deployments |
| Comfortable | 44-52px | 14px | Customer/payment tables |

- Header row: 28-32px, font 11-12px UPPERCASE at 50-60% opacity, weight 500, tracking 0.02-0.04em
- Cell horizontal padding: 8-12px (dense), 12-16px (default)
- Numeric columns: right-aligned, **tabular-nums / monospaced** — single biggest "real product" tell after small type
- Hover: row bg lifts to 3-5% overlay. No border change, no shadow.
- Truncation: `text-overflow: ellipsis`. NEVER wrap (breaks row rhythm).

### Charts

- Wide line/area: **3:1 to 4:1** aspect ratio (e.g. 600×180)
- Sparkline (KPI): **8:1 to 12:1** (e.g. 240×24)
- Axis labels: 10-11px, 50-60% opacity
- Axis tick density: 4-6 X ticks, 3-5 Y ticks (more = chartjunk)
- Gridlines: solid 1px at 4-6% opacity (Tremor moved from dotted to solid in 2024)
- Line stroke: **1.5-2px**, single color per series, NO gradients (gradients = AI tell)
- Area fill: **8-15% opacity** of stroke color
- Empty state: render axes anyway, "No data" centered at 12px muted

### Status badges (the slop differentiator)

**This is where AI dashboards fail hardest.** PagerDuty's color contract:

| State | Pattern | Use |
|---|---|---|
| FIRING / SEV1 | `bg-red-950 text-red-400 border-red-900` | Active page-worthy |
| ACK / INVESTIGATING | `bg-amber-950 text-amber-400 border-amber-900` | Someone's on it |
| MITIGATING / DEGRADED | `bg-yellow-950 text-yellow-400 border-yellow-900` | Partial |
| RESOLVED / HEALTHY | `bg-green-950 text-green-400 border-green-900` | Done |
| SEV2 / WARN | `bg-orange-950 text-orange-400` | Below page threshold |
| SEV3 / INFO | `bg-blue-950 text-blue-400 border-blue-900` | FYI |

**Badge dimensions:**
- Height: **18-22px** (NEVER row-height)
- Padding: 4px / 8px
- Border radius: 4px (rectangular pill) OR 9999px (full pill) — pick ONE for the whole product
- Font: **10-11px UPPERCASE, weight 600, tracking 0.04em**
- Optional 6×6 dot prefix
- **Tinted bg + tinted text on same hue.** NEVER solid `bg-red-500 text-white`.

### KPI tile (metric card)

**Anatomy (16px padding):**
1. Label — 11-12px UPPERCASE muted ("p99 LATENCY")
2. Primary value — **24-32px** semi-bold tabular-nums ("1,847ms"). NOT 48-64px (that's marketing).
3. Delta — 12-13px colored (`↑ 12.4% vs 24h`)
4. Sparkline — **24-32px tall**, full tile width, 1.5px stroke, no axes
5. Optional footer — 11px muted timestamp ("updated 12s ago")

**Tile dimensions:** ~200-280px wide × ~110-140px tall. Strip of 4 across 1280px = perfect.

**Density rule:** if tile is taller than 140px without a sparkline, it's empty. Either add the chart, add a sub-metric, or shrink.

### "Feels populated" minimums

| Panel type | Minimum visible content |
|---|---|
| Sidebar | 3 groups × 4 items each = 12 rows |
| Issue / incident list | **8+ rows**, with at least one truncating |
| KPI strip | 4 tiles, each with label + value + delta + sparkline |
| Timeseries chart | 60+ data points, 2-4 series |
| Logs / events stream | 15+ lines, monospaced, with timestamps |
| Status grid (services) | 12+ services, status dots, name truncated |

If any panel has fewer than HALF this, fill it or remove it. Half-empty = wireframe.

### Realistic data — never `Item 1`

- **Service names:** `api-gateway`, `auth-service`, `checkout-prod-7f8`, `redis-cluster-eu-west-1`, `worker.payments.k8s`
- **Environments:** `prod`, `staging`, `eu-west-1`, `us-east-2`, `canary`
- **Engineer names (varied, short):** Maya Chen, Devon Park, Ana Ruiz, Yuki Tanaka, Arjun Patel, Lin Wei, Sam Cohen
- **Numeric tails:** `1,847ms`, `0.043%`, `99.97%`, `$4,128.50`, `2.4 GB/s`, `47/min`
- **Timestamps:** `2m ago`, `14:32:08 UTC`, `Apr 28, 14:32` — mix relative and absolute
- **Incident titles:** `Elevated 5xx on /v1/checkout (eu-west-1)`, `Redis primary failover — payments cluster`
- **Commit hashes:** `7f8c4e2`, `a91b3d0` — 7 chars, monospaced

### Dashboard typography hierarchy

| Role | Size | Weight | Color | Where |
|---|---|---|---|---|
| Page H1 | 20-24px | 600 | 95% fg | "Incidents" |
| Section H2 | 14-16px | 600 | 90% fg | Group labels |
| Panel title | 13-14px | 500-600 | 85% fg | Card header |
| Body / cell | 13px | 450 | 80% fg | Default |
| Cell secondary | 12px | 400 | 55% fg | Timestamps, sub-text |
| Sidebar group label | 11px UPPERCASE | 600 | 50% fg | tracking 0.04em |
| Status badge | 10-11px UPPERCASE | 600 | full | tracking 0.04em |
| KPI primary | 24-32px | 500-600 tabular | 95% fg | Tile main |
| Footer / meta | 11px | 400 | 45% fg | Updated timestamps |

---

## 7. CONVERSION-TESTED SIZING

### CTAs

**Primary CTA:**
- Height: **48-60px** (mobile), **52-64px** (desktop). Min 44px (WCAG).
- Horizontal padding: 24-32px
- Font: 16-18px, semibold or bold
- First-person verb ("Start my trial") tests higher than third-person ("Get started") — GoodUI #59
- Color: HIGHEST contrast in your palette, used **only for primary CTAs** to preserve meaning
- Contrast ratio ≥ 4.5:1 against background. Below this and the button visually disappears — **single biggest preventable conversion leak**.

**Secondary CTA:**
- Style: GHOST / outline / text-link only. NEVER solid in brand color.
- Same height as primary (so they align) but visually quieter
- Gap from primary: **12-16px desktop, 8-12px mobile**

**Repeat primary CTA every ~1.5 viewport heights** on long pages. Visitors decide in chunks; don't make them scroll back.

### Touch targets (mobile)

- **8px min inactive space between any two tap targets** (16px on mobile). WCAG 2.5.5 + A/B data: proper spacing reduces accidental clicks by 73%.
- **Extend invisible click area beyond visible button** (use padding or `::before` overlay). Cuts mistaps by up to 89%.
- **Form field height ≥ 48px** with 16px label spacing
- **Body text ≥ 16px** on inputs (iOS auto-zooms inputs <16px, breaking layout)

### Hero

- Height: **85-95dvh** (NOT 100vh — 100vh hides content behind iOS Safari URL bar)
- Headline ≤ 8 words ("five-second test")
- Sub-headline ≤ 20 words
- Primary CTA visible without scrolling, in TOP 70% of viewport
- One trust signal visible (logo bar / count / rating)
- End with sliver of next section peeking — cues the scroll

### Sticky bottom CTA on mobile

= +10-20% conversion. Bottom-third = thumb-rest green zone.

### Cognitive load (Hick's Law)

- Nav items ≤ 5 (or remove nav entirely on landing pages — up to +100% conversion per WordStream)
- Pricing tiers ≤ 3
- Form fields ≤ 5 (top of funnel)
- Bullets per feature block ≤ 4
- Colors ≤ 3 (1 brand, 1 CTA, 1 neutral)

### Dead zones — never put primary CTA here

- Top-right corner (historic ad zone)
- Right sidebar / right rail (right-rail blindness, <1% fixation)
- Anything banner-shaped or carousel-rotating
- Bottom-right of fold (cold spot)
- Center of long body paragraphs (F-pattern middle)

### Whitespace = perceived premium (B2B SaaS only)

CXL / HubSpot teardowns: cramped pages convert LOWER for B2B. Generous section padding (96-160px) signals confidence. **Exception: e-commerce product grids benefit from TIGHTER spacing.** Don't apply SaaS rules to commerce.

### B2B SaaS page-length tiers

- **Simple (free trial, newsletter):** 1-2 viewports, 1 CTA, 250-400 words
- **Mid ($30-200/mo SaaS):** 4-6 viewports, 3 CTA placements, **500-900 words = the SaaS sweet spot for 4.2%+ conversion**
- **Enterprise ($1k+/mo, demo):** 6-10 viewports, address objections systematically. Longer pages outperform short ones for complex offers.

---

## 8. THE PRE-SHIP SPACING & SIZING TEST

For every section on the page, ask:

1. **Content-to-section width ratio?** If <60% AND section has a contrasting background → tiny island failure. Widen content, drop the bg, or switch to a grid.
2. **Is `padding-top === padding-bottom`?** If yes on every section → no rhythm. At least one section (illustration-ending or CTA-ending) should be asymmetric.
3. **Mobile padding === desktop padding?** If the padding string lacks `md:` or `lg:` → wasted real estate on mobile. Default to ~50% of desktop.
4. **Hero column split = 50/50?** → flat. Switch to 5/7 or 7/5.
5. **H1 vertically centered?** → feels low. Anchor at upper third (28-38% from top).
6. **Two CTAs equal weight?** → eye doesn't know which to click. Make ratio ≈ 3:1.
7. **All sections `py-24`?** → no rhythm. Use 3-tier system.
8. **Type sizes outside the 8 locked sizes?** → system collapses. Use ONLY display/hero/h1/h2/h3/body-lg/body/caption.
9. **Negative tracking on display?** → if missing, hero feels spread out and amateur. Add `-0.04em`.
10. **Body line-height ≥ 1.7?** → too loose for a landing page. Drop to 1.55.
11. **Dashboard mockup has 16px body, 56px rows, 24px padding?** → marketing values imported. Switch to 13px / 28-32px / 12-16px.
12. **Status badges have solid color fills (`bg-red-500 text-white`)?** → slop. Switch to tinted-bg + tinted-text on same hue.

If a section fails 3+, regenerate that section.

---

## CROSS-REFERENCES

- `tokens.md` — palette, fonts, atmosphere, motion presets
- `anti-slop.md` — patterns that scream "AI-generated"
- `recipes/animations.md` — 41 CSS animation patterns
- `recipes/device-mockups-catalog.md` — bundled photoreal mockups + screen-area coordinates
- `review.md` — pre-ship Playwright checklist
