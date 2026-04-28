# spacing.md — Sizing, Spacing & Composition Law (v3.0)

Synthesized from measured Stripe / Linear / Vercel / Apple + Refactoring UI / Geist / Radix / Tufte / NN-eye-tracking.

---

## THE 14 COMMANDMENTS

1. **Container max 1200-1440px desktop.** `max-w-7xl` (1280px) default. Past 1280px, scale up: `max-w-7xl 2xl:max-w-[1500px] [@media(min-width:1920px)]:max-w-[1760px]` (no tiny island on 27").
2. **Section padding 3-tier:** hero `py-32`, default `py-24`, compact `py-12`. NEVER `py-24` on every section.
3. **Asymmetric padding when section ends in mockup/CTA:** `pt-24 pb-32` (Linear's default). Symmetric on every section = no rhythm.
4. **Mobile padding ~50% of desktop:** `py-14 md:py-24 lg:py-32`.
5. **Content fills ≥75% of container width** when section has contrasting bg. Otherwise = tiny island = AI tell.
6. **Hero column split: 5/12 text · 7/12 mockup** (golden ratio). NEVER 50/50.
7. **H1 at 28-38% from top** (upper third). NEVER vertically centered.
8. **8 locked type sizes:** display 96 / hero 72 / h1 48 / h2 32 / h3 24 / body-lg 20 / body 16 / caption 13. **NO 18, NO 40.**
9. **Big type = tight tracking.** display `-0.04em`, hero `-0.035em`, h1 `-0.03em`. Single biggest premium-feel multiplier.
10. **Body line-height 1.55, NOT 1.75.** Prose default is for markdown.
11. **8px vertical rhythm.** Acceptable: 0, 4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128.
12. **Inside dashboards: APP density, not marketing.** 12-13px body / 28-32px row / 12-16px card padding / 1px @ 6-10% borders / NO drop shadows / tabular-nums.
13. **Status badges: tinted bg + text + border on same hue.** `bg-red-950 text-red-400 border-red-900`. NEVER `bg-red-500 text-white`.
14. **Primary CTA 48-60px tall, contrast ≥ 4.5:1, repeat every 1.5 viewports** on long pages. Sticky bottom-CTA mobile = +10-20%.

---

## SECTION PADDING

| Section | Mobile | Tablet | Desktop | Wide |
|---|---|---|---|---|
| Hero | `py-20` | `py-28` | `py-32` | `py-40` |
| Default feature | `py-14` | `py-20` | `py-24` | `py-24` |
| Asymmetric (ends in mockup) | `pt-14 pb-20` | `pt-20 pb-28` | `pt-24 pb-32` | `pt-24 pb-32` |
| Logo cloud | `py-10` | `py-12` | `py-16` | `py-16` |
| Stats row | `py-12` | `py-16` | `py-20` | `py-20` |
| Single quote (no bg) | `py-20` | `py-28` | `py-32` | `py-32` |
| Final CTA | `py-20` | `py-28` | `py-32` | `py-32` |
| Footer | `pt-16 pb-8` | `pt-20 pb-10` | `pt-24 pb-12` | `pt-24 pb-12` |

**Defaults:**
- Default section: `py-14 md:py-20 lg:py-24`
- Hero/CTA: `py-20 md:py-28 lg:py-32`
- Asymmetric: `pt-14 pb-20 md:pt-20 md:pb-28 lg:pt-24 lg:pb-32`
- Compact: `py-10 md:py-14 lg:py-16`

---

## CONTAINER WIDTH (decision tree)

| Section type | Container | Padding |
|---|---|---|
| Hero w/ full-bleed media | `max-w-none` | `py-32 lg:py-48` |
| Hero centered headline | `max-w-5xl` | `pt-32 pb-40` |
| Feature (image+text) | `max-w-7xl` | `py-24 lg:py-32` |
| 3-column feature grid | `max-w-7xl` | `py-24`, `gap-8` |
| Single quote — bg color | `max-w-4xl` MIN | `py-24` |
| Single quote — no bg | `max-w-2xl` ok | `py-32` |
| Quote grid | `max-w-7xl` | `py-24`, `gap-6` |
| Logo cloud | `max-w-7xl` | `py-12 lg:py-16` |
| Pricing | `max-w-6xl` | `py-24 lg:py-32` |
| Long-form / blog | `max-w-prose` | `py-16` |
| Final CTA | `max-w-4xl` | `py-24 lg:py-32` |

**Defaults:**
- Standard: `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`
- Wide marketing: `mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-12`
- Prose: `mx-auto max-w-prose px-4`
- Centered hero text: `mx-auto max-w-4xl px-4 sm:px-6`

Horizontal gutter: 16px mobile / 24-46px desktop.

---

## TINY-ISLAND FAILURE (the testimonial-floating-in-empty-section bug)

**Section has contrasting bg + content fills < 60% of width = broken.**

Fix — pick ONE:
1. Widen content to ≥960px (add 2nd column: avatar + role + logo, then quote)
2. Drop the bg entirely (testimonial merges with page)
3. Switch to grid of 3 quotes that fills container

---

## TYPE SCALE — 8 Locked Sizes

| Token | Use | px | clamp() | line-height | letter-spacing | weight |
|---|---|---|---|---|---|---|
| `display` | Hero ONLY | 96 | `clamp(3.5rem, 1rem + 7vw, 6rem)` | 1.0 | -0.04em | 600 |
| `hero` | Section opener | 72 | `clamp(2.75rem, 1rem + 5vw, 4.5rem)` | 1.05 | -0.035em | 600 |
| `h1` | Page H1 | 48 | `clamp(2rem, 1rem + 3vw, 3rem)` | 1.1 | -0.03em | 600 |
| `h2` | Section header | 32 | `clamp(1.625rem, 1rem + 1.5vw, 2rem)` | 1.15 | -0.02em | 600 |
| `h3` | Card title | 24 | `clamp(1.25rem, 1rem + 0.5vw, 1.5rem)` | 1.25 | -0.015em | 600 |
| `body-lg` | Hero subhead | 20 | `1.25rem` | 1.5 | -0.01em | 400 |
| `body` | Default | 16 | `1rem` | 1.55 | -0.011em | 400 |
| `caption` | Eyebrow / meta | 13 | `0.8125rem` | 1.4 | 0 | 500 |

**No 18px, no 40px** — those are indecisive middles.

**Mobile crush** (use clamp(), don't shrink in steps):

| Token | Desktop | Mobile (375px) |
|---|---|---|
| display | 96 | 56 |
| hero | 72 | 44 |
| h1 | 48 | 32 |
| h2 | 32 | 26 |
| body | **16** | **16** (NEVER below — iOS auto-zoom + accessibility fail) |

**Implementation (paste into `globals.css`):**

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
.t-display { font-size: var(--text-display); line-height: 1.0;  letter-spacing: -0.04em;  font-weight: 600; }
.t-hero    { font-size: var(--text-hero);    line-height: 1.05; letter-spacing: -0.035em; font-weight: 600; }
.t-h1      { font-size: var(--text-h1);      line-height: 1.1;  letter-spacing: -0.03em;  font-weight: 600; }
.t-h2      { font-size: var(--text-h2);      line-height: 1.15; letter-spacing: -0.02em;  font-weight: 600; }
.t-h3      { font-size: var(--text-h3);      line-height: 1.25; letter-spacing: -0.015em; font-weight: 600; }
.t-body-lg { font-size: var(--text-body-lg); line-height: 1.5;  letter-spacing: -0.01em;  font-weight: 400; }
.t-body    { font-size: var(--text-body);    line-height: 1.55; letter-spacing: -0.011em; font-weight: 400; }
.t-caption { font-size: var(--text-caption); line-height: 1.4;  letter-spacing: 0;        font-weight: 500; }
```

**Italic-serif accent — slop unless ALL of these:**
1. Display or hero size only
2. Max 2 words
3. Carries semantic weight (the verb / differentiator)
4. Serif contrasts the sans (Geist + Instrument Serif, Inter + PP Editorial)
5. ONE occurrence per page

**Weight pairings:** 600+400 (SaaS), 700+400 (consumer), 800+400 (high-energy). NEVER 300. Max 3 weights.

---

## VERTICAL RHYTHM (8px grid)

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

**Space groups, not items.** H1+subhead+CTA = a unit (small gaps inside). Then BIG gap (96px) before next unit.

---

## HERO COMPOSITION

### The default — "Editorial Left" (Stripe / Linear / Vercel / Mercury)

5/12 text · 7/12 mockup. Mockup bleeds right. H1 at upper third. Z-pattern flow.

```jsx
<section className="pt-32 pb-20 md:pt-40 md:pb-24">
  <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
      <div className="lg:col-span-5">{/* eyebrow → H1 → subhead → dual CTA */}</div>
      <div className="lg:col-span-7">{/* mockup, bleeds right */}</div>
    </div>
  </div>
</section>
```

### The 5 templates

| # | Name | When | Examples |
|---|---|---|---|
| 1 | **Editorial Left** | Dashboard, dev tools, B2B SaaS | Stripe, Linear, Vercel |
| 2 | **Centered Editorial** | Brand statement, manifesto, launch | Vercel relaunches, OpenAI |
| 3 | **Asymmetric Diagonal** | Editorial / agency / creative tools | Awwwards SOTD, Frame.io |
| 4 | **Type-Only Massive** | Manifesto / philosophy / agency | Apple launches |
| 5 | **Image Left + Text Right** | Fashion / hospitality / DTC | Apple product hero |

**Pick:** is the proof visual or message? Visual → 1, 3, 5. Message → 2, 4. Default = 1.

### Asymmetric padding rule (NEVER `py-24` on hero)

```
RECOMMENDED:
  pt-32 pb-20    (DEFAULT — content sits HIGH)
  pt-40 pb-24    (extra-tall hero)
  pt-24 pb-32    (rare — Template 5 only)

NEVER:
  py-24 / py-32 / py-20    (symmetric — Bootstrapy)
```

### Optical center

50% feels low. Anchor at upper third (28-38% from top) via `pt-32 pb-40` style asymmetric padding.

### 1+1≠2 rule (one focal point)

- ONE heavy H1 → subhead is 0.4-0.5× weight
- ONE primary CTA (filled, brand color) → secondary GHOST. Ratio 3:1.
- ONE product visual → no carousels, no stacked mockups
- ONE eyebrow tag → no two badges side-by-side

### Negative space is a SHAPE

- Template 1: top-right + bottom-left form an L
- Template 3: corners create the diagonal axis

If you can't draw the negative-space shape, composition is wrong.

### Break the grid — exactly ONE thing per hero

1. Bleed mockup off right edge (SAFEST WIN)
2. Bleed type off left edge
3. Full-bleed bg under type
4. Diagonal mockup tilt 4-8°
5. Type overlapping mockup top edge

### Hero H1 line-count

H1 fits 2-3 lines max. If wraps 4+ lines:
1. Cut H1 word count first (best — copy improves)
2. Widen H1 column second (col-span-5 → col-span-6)
3. Drop H1 size third (last resort)

Width math: col-span-5 @ 1280px ≈ 520px → fits 5-6 words/line at 72px.

### Post-hero gap (the void problem)

If `min-h-[100svh]` on hero + content shorter = giant void. Pick ONE:
1. Drop `min-h-[100svh]` (let content set height)
2. Fill the hero (stat row, social proof, feature highlights)
3. Use `flex flex-col justify-between` so bottom content sticks down

Logo strip immediately after hero hugs close (`py-10 md:py-14`), NOT `py-24`.

---

## DASHBOARD DENSITY (the marketing-vs-app split)

**Vercel marketing uses 96-128px padding. Vercel app uses 12-16px.** Single biggest AI mistake = importing marketing into the app shell.

### 5 visual cues for REAL vs AI-FAKE

1. Body data **12-13px**, not 16px
2. List rows **28-36px**, not 56-72px
3. Card padding **12-16px**, not 24-32px
4. Borders **1px @ 6-10% opacity**, not 1px @ 20%
5. Realistic data — `api-gateway-prod-7f8`, not `Item 1`

### Sidebar

- Width: **240px** (collapsed 48-56px)
- Bg: 1-3% off main bg (DIMMER than canvas — Linear's choice)
- Group label: 11px UPPERCASE, 0.04em tracking, 60% opacity
- Row height: **28px** compact / 32px default
- Row font: 13-14px, weight 450-500
- Icon: 14×14 or 16×16, 1.5-2px stroke
- Icon-to-label gap: 8px
- Active: 4-8% bg overlay (NOT 3px left bar — that's 2018 Bootstrap)

### Top bar

- Height: **44-48px** workspace / 56px max / 64px marketing only
- Border-bottom: 1px @ 6-10%
- Search: 28-32px tall, 13px text, `⌘K` hint inline

### Panel / card

- Bg: same as canvas OR +2% lift
- Border: **1px @ 6-10% opacity** dark; `gray-200` light
- Radius: **6-10px** (NEVER 16-24px)
- Shadow: NONE (or hairline `0 1px 0 rgba(0,0,0,0.04)`)
- Padding: **12px** compact / 16px default / 20-24px comfortable
- Inter-card gap: **12-16px**

### Data rows

| Density | Row | Font | Use |
|---|---|---|---|
| Ultra-dense | 24-28px | 12px | Logs, traces |
| Dense | **28-32px** | 12-13px | Issue/incident lists |
| Default | 32-40px | 13-14px | Resources, deployments |
| Comfortable | 44-52px | 14px | Customer/payment tables |

- Header: 28-32px, 11-12px UPPERCASE @ 50-60%, weight 500, tracking 0.02-0.04em
- Cell padding: 8-12px dense / 12-16px default
- Numeric: right-aligned, **tabular-nums / monospaced** (biggest "real product" tell after small type)
- Hover: 3-5% bg overlay
- Truncate w/ ellipsis. NEVER wrap.

### Charts

- Wide line/area: **3:1 to 4:1** aspect
- Sparkline (KPI): 8:1 to 12:1
- Axis labels: 10-11px @ 50-60%
- Gridlines: 1px @ 4-6%, solid
- Stroke: 1.5-2px, single color, NO gradients
- Area fill: 8-15% of stroke color

### Status badges

```
FIRING / SEV1     bg-red-950    text-red-400    border-red-900
ACK / SEV2        bg-amber-950  text-amber-400  border-amber-900
MITIGATING        bg-yellow-950 text-yellow-400 border-yellow-900
RESOLVED          bg-green-950  text-green-400  border-green-900
SEV3 / INFO       bg-blue-950   text-blue-400   border-blue-900
```

- Height: **18-22px** (NEVER row-height)
- Padding: 4px / 8px
- Radius: 4px OR 9999px (pick ONE for the product)
- Font: **10-11px UPPERCASE, weight 600, tracking 0.04em**
- NEVER solid `bg-red-500 text-white`

### KPI tile

| Element | Spec |
|---|---|
| Label | 11-12px UPPERCASE muted |
| Primary value | **24-32px** semi-bold tabular |
| Delta | 12-13px colored (`↑ 12.4% vs 24h`) |
| Sparkline | 24-32px tall, full width |
| Footer | 11px muted timestamp |

Tile dimensions: ~200-280px × ~110-140px. Strip of 4 across 1280px.

If tile > 140px tall without sparkline = empty. Add chart, sub-metric, or shrink.

### "Feels populated" minimums

- Sidebar: 3 groups × 4 items
- Issue list: **8+ rows**, at least one truncating
- KPI strip: 4 tiles each w/ sparkline
- Timeseries: 60+ data points, 2-4 series
- Logs: 15+ lines

If panel < half this → fill or remove.

### Realistic data

- Services: `api-gateway`, `auth-service`, `checkout-prod-7f8`, `redis-cluster-eu-west-1`
- Names: Maya Chen, Devon Park, Ana Ruiz, Yuki Tanaka, Arjun Patel, Lin Wei, Sam Cohen
- Numbers: `1,847ms`, `0.043%`, `99.97%`, `$4,128.50`
- Time: `2m ago`, `14:32:08 UTC`, `Apr 28, 14:32`
- Incidents: `Elevated 5xx on /v1/checkout (eu-west-1)`
- Hashes: `7f8c4e2`, `a91b3d0` (7 chars, mono)

### Dashboard typography

| Role | Size | Weight | Color |
|---|---|---|---|
| Page H1 | 20-24px | 600 | 95% fg |
| Section H2 | 14-16px | 600 | 90% fg |
| Panel title | 13-14px | 500-600 | 85% fg |
| Body / cell | 13px | 450 | 80% fg |
| Cell secondary | 12px | 400 | 55% fg |
| Sidebar group label | 11px UPPERCASE | 600 | 50% fg |
| Status badge | 10-11px UPPERCASE | 600 | full |
| KPI primary | 24-32px tabular | 500-600 | 95% fg |
| Footer / meta | 11px | 400 | 45% fg |

---

## CONVERSION-TESTED SIZING

### CTAs

- Primary: **48-60px tall** (mobile) / 52-64px (desktop). Min 44px (WCAG).
- Padding: 24-32px horizontal
- Font: 16-18px semibold/bold
- First-person verb tests higher ("Start my trial" > "Get started" — GoodUI #59)
- Contrast ≥ 4.5:1 (single biggest preventable conversion leak)
- Secondary: GHOST/outline only. Same height. Gap 12-16px desktop / 8-12px mobile.

**Repeat primary every ~1.5 viewports** on long pages.

### Touch targets

- 8px gap min between targets (16px mobile)
- Extend invisible click area beyond visible button (cuts mistaps 89%)
- Form fields ≥ 48px tall, 16px+ font (iOS auto-zoom)

### Hero

- Height **85-95dvh** (NOT `100vh`)
- H1 ≤ 8 words ("five-second test")
- Subhead ≤ 20 words
- Primary CTA in top 70% of viewport
- End w/ sliver of next section peeking

### Sticky bottom CTA on mobile = +10-20% conversion

### Hick's Law

- Nav items ≤ 5 (or remove nav — up to +100%)
- Pricing tiers ≤ 3
- Form fields ≤ 5
- Bullets ≤ 4
- Colors ≤ 3 (1 brand + 1 CTA + 1 neutral)

### Dead zones (never put primary CTA here)

- Top-right corner
- Right sidebar
- Banner-shaped or carousel-rotating regions
- Bottom-right of fold
- Center of long body paragraphs

### B2B SaaS page-length

- Simple (free trial): 1-2 viewports, 250-400 words
- Mid ($30-200/mo): 4-6 viewports, **500-900 words = sweet spot**
- Enterprise ($1k+/mo): 6-10 viewports, address objections

---

## PRE-SHIP TEST (12 questions)

For every section:
1. Content-to-section width ratio? <60% + contrasting bg = tiny island
2. `padding-top === padding-bottom`? On every section = no rhythm
3. Mobile padding === desktop padding? = wasted real estate
4. Hero column 50/50? = flat
5. H1 vertically centered? = feels low
6. Two equal-weight CTAs? = eye doesn't know which
7. All sections `py-24`? = no rhythm
8. Type sizes outside the 8 locked? = system collapses
9. Negative tracking on display? Missing = amateur
10. Body line-height ≥ 1.7? = too loose for landing
11. Dashboard mockup w/ 16px body, 56px rows, 24px padding? = marketing imported
12. Status badges solid color fills? = slop

3+ fails → regenerate.

---

## CROSS-REFERENCES

- `tokens.md` — palette, fonts, motion presets
- `scroll.md` — parallax, sticky, pinned (the layout-collapse fix)
- `anti-slop.md` — patterns to NEVER use
- `recipes/device-mockups-catalog.md` — bundled photoreal mockups + screen-area coordinates
- `review.md` — pre-ship Playwright checklist
