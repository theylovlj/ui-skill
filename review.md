# review.md — Pre-Ship Checklist (v3.0)

**Run before SHIP. Every item must pass.**

If Playwright is available, use it. Otherwise verify by reading the code.

---

## STEP A — Screenshot

```
1. Start the dev server
2. Navigate to localhost:{port}
3. Full-page screenshot (fullPage: true)
4. Read it
```

If you can't reach the running site, state: "Could not verify visually — code-only review."

---

## STEP B — The Checklist

Mobile-test at 375px. Desktop-test at 1280 + 1920px.

### Words & content (Rule 1)

- [ ] H1 ≤ 8 words
- [ ] Subhead ≤ 20 words, ≤ 2 lines
- [ ] Section H2s ≤ 6 words
- [ ] Feature titles ≤ 4 words; bodies ≤ 18 words / 1 sentence
- [ ] Total page words 500-900 (B2B SaaS sweet spot)
- [ ] No "Empower / Unleash / Elevate / Seamless / Revolutionize"
- [ ] Real names (Maya Okafor / Ezra Singh / Lucia Marchetti — not John Doe)
- [ ] Real numbers (8,431 — not "10,000+" or "99.99%")
- [ ] No "Acme / Nexus / SmartFlow / Flowbit"

### Hero composition

- [ ] Column split is 5/12 + 7/12 (NOT 50/50)
- [ ] H1 anchored upper third (28-38% from top)
- [ ] Hero padding asymmetric (`pt-32 pb-20`, NOT `py-32`)
- [ ] H1 fits 2-3 lines max in column
- [ ] Dual CTA: filled primary + ghost/text secondary (3:1 ratio)
- [ ] No tiny mini-pill above H1 (status pill, volume tag, monospace caps eyebrow, divider lines)
- [ ] No floating chip below/beside mockup (`● root cause...`, `● synced`, etc.)
- [ ] No void below hero (drop `min-h-[100svh]` if content shorter, OR fill it, OR `justify-between`)

### Mockup

- [ ] Dashboard composited INSIDE chrome (catalog coordinates from `recipes/device-mockups-catalog.md`)
- [ ] No state-picker / Storybook controls inside hero mockup
- [ ] Hero shows POPULATED default state with realistic data
- [ ] Inside mockup: 12-13px body / 28-32px rows / 12-16px padding / 1px @ 6-10% borders / NO drop shadows / tabular-nums
- [ ] Status badges: tinted bg + text + border on same hue (NOT solid `bg-red-500 text-white`)

### Typography

- [ ] Type sizes only from 8 locked (display 96 / hero 72 / h1 48 / h2 32 / h3 24 / body-lg 20 / body 16 / caption 13). NO 18, NO 40.
- [ ] Negative tracking on display (-0.04em) and hero (-0.035em)
- [ ] Body line-height ≤ 1.6 (NOT 1.75)
- [ ] Hero ≥ 5xl (60px+)
- [ ] One italic-serif accent word in hero (NOT all-italic, NOT in body)
- [ ] No icons in headlines

### Color & background

- [ ] Off-white bg (NOT `#fff`)
- [ ] Tinted text (NOT `#000`)
- [ ] ONE accent color
- [ ] No purple-blue gradients
- [ ] No `bg-clip-text` gradient headlines
- [ ] No teal default

### Layout & spacing

- [ ] Section padding scales (hero `py-32`, default `py-24`, compact `py-12`) — NOT `py-24` everywhere
- [ ] Asymmetric padding on illustration-ending sections (`pt-24 pb-32`)
- [ ] Mobile padding ~50% of desktop
- [ ] Container scales past 1280px (`max-w-7xl 2xl:max-w-[1500px] [@media(min-width:1920px)]:max-w-[1760px]`)
- [ ] No tiny-island sections (content fills ≥75% when bg has contrast)
- [ ] Asymmetric grids collapse to 1 column on mobile
- [ ] No horizontal scroll at 375 / 768 / 1280

### Components

- [ ] No `<Loader2 />` (skeleton screens)
- [ ] No "MOST POPULAR" pricing banner
- [ ] No `rounded-md` shadcn buttons w/ chevron (use `rounded-full` pills)
- [ ] No floating decoration overlapping H1/H2/CTA (SAFE-ZONE rule)
- [ ] Marquee uses duplicate content + `translateX(-50%)` + 80px pixel mask + ≥8 items per copy
- [ ] No equal-weight 3-card feature trio (promote ONE, demote two)
- [ ] No emojis in product UI
- [ ] All 7 component states implemented (default / hover / active / focus-visible / loading / empty / error)

### Motion

- [ ] `import from "motion/react"` (NOT framer-motion)
- [ ] Springs over cubic-bezier
- [ ] Animate ONLY transform + opacity
- [ ] `min-h-[100dvh]` (NOT `h-screen`, NOT `100vh`)
- [ ] `min-h-[100svh]` on hero pins (iOS Safari)
- [ ] `prefers-reduced-motion` respected
- [ ] No `animate-bounce` / `animate-pulse` for important UI

### Scroll & parallax

- [ ] Every `useScroll` has `target: ref` (unless intentionally window-relative)
- [ ] `useTransform` NOT `useMotionValueEvent` for derived UI
- [ ] No void below parallax/pinned section (Playwright detector below)
- [ ] Pinned section parent_height = pinned_height + scroll_distance
- [ ] `overflow: clip` (NOT `hidden`) on sticky ancestors
- [ ] Parallax disabled on touch (`@media (hover: none) and (pointer: coarse)`)
- [ ] Max parallax translation 50-150px / 15-30%

### Tests (visual sanity)

- [ ] **Squint test:** at 8px blur, focal element still dominates
- [ ] **Greyscale test:** hierarchy survives without color
- [ ] **5-second test:** can a stranger evaluate the product in 5 seconds?

### Final

- [ ] ONE expensive moment named (state which one detail telegraphs custom-built)

---

## PLAYWRIGHT VERIFICATIONS

### Floating decoration overlap (SAFE-ZONE)
```js
const decorations = await page.$$('[data-decoration], section [class*="absolute"]');
const focal = await page.$$('h1, h2, button, [data-stat]');
for (const d of decorations) {
  const dBox = await d.boundingBox();
  if (!dBox) continue;
  for (const f of focal) {
    const fBox = await f.boundingBox();
    if (!fBox) continue;
    const overlap = !(dBox.x + dBox.width < fBox.x ||
                     fBox.x + fBox.width < dBox.x ||
                     dBox.y + dBox.height < fBox.y ||
                     fBox.y + fBox.height < dBox.y);
    if (overlap) flag(`Decoration overlaps focal element`);
  }
}
```

### Tiny-island detector
```js
const sections = await page.$$('section');
for (const s of sections) {
  const sBox = await s.boundingBox();
  const bg = await s.evaluate(el => getComputedStyle(el).backgroundColor);
  if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;
  const inner = await s.$('[class*="max-w"]');
  const iBox = inner ? await inner.boundingBox() : null;
  if (!iBox) continue;
  const ratio = iBox.width / sBox.width;
  if (ratio < 0.6) flag(`Tiny island: ${ratio.toFixed(2)} fill ratio`);
}
```

### Void-below-pinned-section detector
```js
const sections = Array.from(document.querySelectorAll("section"));
for (const s of sections) {
  const rect = s.getBoundingClientRect();
  const next = s.nextElementSibling?.getBoundingClientRect();
  const gap = next ? next.top - rect.bottom : 0;
  if (gap > 100) flag(`Void below ${s.className.slice(0,30)}: ${gap}px`);
}
```

### Missing useScroll target ref
```bash
grep -rE "useScroll\(\s*\{" src/ | grep -v "target:"
# returns only intentional window-scroll uses
```

---

## STEP C — Common Failures

| Failure | Fix |
|---|---|
| Hero >8 words | Move detail to subtext |
| Multiple accents | Pick one |
| Sparse sections | Add real content OR delete section |
| Centered everything | Alternate left / split / centered |
| Boxy `<Accordion>` FAQ | `recipes/faq-pillrows.md` |
| Mobile broken at 375 | Add `grid-cols-1 md:grid-cols-2` |
| Janky scroll / mobile fps | Animate transform/opacity only |
| H1 wraps 4 lines | Cut words → widen column → drop size |
| Void below hero | Drop `min-h-[100svh]` OR fill OR `justify-between` |
| Tiny island | Widen content OR drop bg OR switch to grid |

---

## STEP D — Final Sign-Off

In your final message, confirm key checks:
- Hero: words / split / padding / no mini-pill / no floating chip
- Mockup: composited / populated / app density / tinted badges
- Type: 8 sizes / negative tracking / line-height
- Color: off-white / one accent / no AI gradients
- Layout: scaled container / asymmetric padding / no tiny island
- Motion: spring + transform/opacity / reduced-motion respected
- Scroll: target ref / no void / 100svh on pins
- ONE expensive moment named

If anything fails — **fix before shipping**. Do not ship with known violations.
