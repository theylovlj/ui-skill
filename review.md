# review.md — Pre-Ship Checklist

**Run this in Step 4 of the procedure. Every item must pass before SHIP.**

If Playwright is available (`mcp__playwright__browser_*` tools), use them. Otherwise, manually verify by reading the code.

---

## STEP A — Take a screenshot

```
1. Start the dev server (if not already running)
2. Navigate the browser to localhost:{port}
3. Take a full-page screenshot (fullPage: true)
4. Read the screenshot
```

If you cannot reach the running site, **state this explicitly** in the final message: "I could not verify visually — code-only review."

---

## STEP B — The 39 checks

Verify one, mark, then next. **Mobile-test:** use Playwright `browser_resize` at 375px — confirm asymmetric layouts collapse to single-column.

### ✅ 1. Hero copy ≤ 8 words
Count words in `<h1>`. See `SKILL.md` Rule 1.

### ✅ 2. Hero has dual CTA pattern
Filled pill + outlined/text pill, side-by-side. Not solo, not three.

### ✅ 3. Background is NOT pure white or pure black
Body bg must be off-white (`oklch(98% ...)`) or near-black (`oklch(12% ...)`). See `tokens.md` § COLOR PALETTES.

### ✅ 4. Hero uses ONE italic-serif accent word
H1 = bold sans + ONE italic-serif word. See `SKILL.md` Rule 2.

### ✅ 5. Only ONE accent color is used
Scan rendered page. Neutral text + neutral bg + ONE accent. See `SKILL.md` Rule 1.

### ✅ 6. NO empty / sparse sections
Every section has meaningful content density. If hollow, delete it. See `anti-slop.md` § LAYOUT.

### ✅ 7. NO `<Loader2 />` or generic spinner
Verify: `grep -r "Loader2" src/` returns zero. See `anti-slop.md` § COMPONENT.

### ✅ 8. NO purple-to-blue gradient
Verify: `grep -r "from-purple.*to-blue\|from-blue.*to-purple" src/` returns zero.

### ✅ 9. NO "MOST POPULAR" pricing banner
Verify: `grep -r "MOST POPULAR\|POPULAR" src/` returns zero. See `anti-slop.md` § COMPONENT.

### ✅ 10. Section padding ≥ `py-24`
Inspect each `<section>`. `py-32`–`py-40` is the premium target. See `tokens.md` § SPACING.

### ✅ 11. NO elements overflow containers
Use Playwright `browser_resize` at 375 / 768 / 1280. No horizontal scroll, no bleeding content.

### ✅ 12. Motion uses springs, not cubic-bezier
Verify: `grep -r "cubic-bezier\|transition: all" src/` — primary motion must be Framer Motion `layout` + spring. See `tokens.md` § MOTION PRESETS.

### ✅ 13. NO `h-screen` — see `anti-slop.md` § MOBILE
Verify: `grep -r "h-screen" src/` returns zero.

### ✅ 14. NO emojis in product UI — see `anti-slop.md` § TYPOGRAPHY
Scan rendered page for any emoji in headings, buttons, labels, alt text.

### ✅ 15. CONTENT passes "Jane Doe" check — see `anti-slop.md` § CONTENT
Verify: no `John Doe`/`Sarah Chan`, no `Acme`/`Nexus`, no filler verbs (`Elevate`/`Unleash`/`Empower`), no `99.99%`/`50%` round-fakes, no `unsplash.com` URLs.

### ✅ 16. Animation uses transform + opacity only — see `anti-slop.md` § MOBILE

### ✅ 17. NO floating decoration overlaps text/numbers/CTAs (SAFE-ZONE rule)
Every `position: absolute` or `position: fixed` decorative element (sticker, note card, badge, accent shape) must NOT intersect any `<h1>`, `<h2>`, big-number stat, or CTA button bounding box. See `anti-slop.md` § COMPONENT for the full SAFE-ZONE rule.

**Playwright verification:**
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
If any overlap is flagged → re-position the decoration into the section's margin safe zone (corners or edge-hugging mid-section), never inside the focal content rectangle.
Verify: `grep -rE "animate.*top|animate.*left|animate.*width|animate.*height" src/` returns zero.

### ✅ 18. SQUINT TEST passes
Apply 5-10px blur mentally (or via DevTools `filter: blur(8px)`). Does the focal element still dominate the composition? If everything is mush, hierarchy fails. Re-check Rule 2 (typography is the design) and `visual-thinking.md` Phase 1.

### ✅ 19. GREYSCALE TEST passes
Mentally desaturate the page. Does the visual hierarchy survive on VALUE contrast alone? If color is the only thing carrying hierarchy, the design is fragile. Premium designs work in greyscale. Add value contrast (darker bg behind important sections, lighter cards on darker bg, etc).

### ✅ 20. NO mini overhead status-pill above the H1
The `● V3.4 — PAGED ROUTING LIVE` style mini pill (small status-pill with monospace caps + colored dot) directly above the H1 is BANNED — single most-recognized AI tell of 2026. Verify: no element with monospace caps + colored dot sitting between nav and H1 in the hero. Real announcement bars at top-of-page (above nav) are FINE — only the mini-pill-above-H1 is banned. See `anti-slop.md` § THE GSTACK BLACKLIST.

### ✅ 21. NO state-picker / Storybook controls inside hero mockup
Hero mockup must show the populated DEFAULT state with realistic data (real incident IDs, services, timestamps). Verify: no row of `default | hover | focus | active | loading | empty | error` pills visible inside the screen, no `loading` skeleton state showing, no Storybook-style state-switcher UI. See `anti-slop.md` § HERO PRODUCT-RENDER LAW.

### ✅ 22. Mockup screen content composited INSIDE chrome
The dashboard inside the device must use the catalog coordinates (e.g. MacBook Pro 14 = top 5.5%, left 12%, width 76%, height 82%), with `overflow:hidden` on screen-content box and `pointer-events-none` on chrome img. Verify: no bezel showing around the dashboard, content fills screen area edge-to-edge, no clicks on the chrome image. See `recipes/device-mockups-catalog.md` and `anti-slop.md` § MOCKUP COMPOSITING LAW.

### ✅ 23. NO tiny-island sections (content-fill ≥ 75% when bg is contrasting)
For every section with a non-default background color (testimonial, CTA, stat row): measure content-width vs section-width. If section has contrasting bg AND content-fill ratio < 75% → broken. Fix: widen content (≥960px), drop the bg, or switch to a grid that fills.

**Playwright verification:**
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
  if (ratio < 0.6) flag(`Tiny island in section: ${ratio.toFixed(2)} fill ratio`);
}
```

### ✅ 24. Hero column split is asymmetric (5/12 + 7/12, NOT 50/50)
Verify the hero uses `lg:col-span-5` + `lg:col-span-7` (or 7+5 / 4+8), NOT `lg:grid-cols-2` with both halves equal. See `spacing.md` § 5 HERO COMPOSITION.

### ✅ 25. Hero padding is asymmetric (`pt-32 pb-20`, NOT `py-32`)
Verify the hero section uses different top/bottom padding. `py-XX` on the hero = Bootstrapy. The default is `pt-32 pb-20` (content sits high in viewport). See `spacing.md` § 5.

### ✅ 26. Hero H1 sits in upper third (28-38% from top), NOT centered
Inspect H1 vertical position in hero. Vertically-centered H1 feels low. Anchor at upper third with `pt-32 pb-40` style asymmetric padding.

### ✅ 27. Type sizes within the 8 locked sizes
Verify: NO `text-[18px]` / `text-3.5xl` / arbitrary `text-[40px]`. Only the 8: display 96 / hero 72 / h1 48 / h2 32 / h3 24 / body-lg 20 / body 16 / caption 13. See `spacing.md` § 3.

### ✅ 28. Negative tracking on display/hero
Big type (>= 48px) needs `tracking-[-0.04em]` (display) / `tracking-[-0.035em]` (hero) / `tracking-tight` (h1). Without it, hero feels spread out and amateur. THE SINGLE BIGGEST PREMIUM-FEEL MULTIPLIER. See `spacing.md` § 3.

### ✅ 29. Body line-height ≤ 1.6
Verify: body text uses `leading-relaxed` (1.625) MAX, ideally `leading-[1.55]`. NEVER `leading-loose` (1.75) — that's prose default for markdown, not landing pages. See `spacing.md` § 3.

### ✅ 30. Dashboard mockup uses APP density (not marketing density)
Inside any hero mockup containing a dashboard:
- Body text: 12-13px (NOT 16px)
- Row height: 28-32px (NOT 56-72px)
- Card padding: 12-16px (NOT 24-32px)
- Borders: 1px at 6-10% opacity (NOT 1px solid gray-300)
- NO drop shadows on cards (use borders)
- Numeric columns: tabular-nums / monospaced
See `spacing.md` § 6 DASHBOARD DENSITY.

### ✅ 31. Status badges use tinted-bg + tinted-text on same hue
Verify: NO `bg-red-500 text-white` style solid-color status badges. Use `bg-red-950 text-red-400 border-red-900` (tinted bg + tinted text + tinted border, all same hue). 18-22px tall, 10-11px UPPERCASE, weight 600. See `spacing.md` § 6.

### ✅ 32. Container scales up past 1280px on big monitors
Verify hero/section container uses `max-w-7xl 2xl:max-w-[1500px] [@media(min-width:1920px)]:max-w-[1760px]` — without this, design floats as a tiny island on a 27" monitor. Test at 1920px + 2560px viewport. See `tokens.md` § LARGE-SCREEN SCALE-UP.

### ✅ 33. NO void-below-parallax bug
For every section using parallax / sticky / pinned scroll: verify NO empty gap between section bottom and next section top.

**Playwright void-below detector:**
```js
const sections = Array.from(document.querySelectorAll("section"));
for (const s of sections) {
  const rect = s.getBoundingClientRect();
  const next = s.nextElementSibling?.getBoundingClientRect();
  const gap = next ? next.top - rect.bottom : 0;
  if (gap > 100) flag(`Void below ${s.className.slice(0,30)}: ${gap}px`);
}
```
If void detected → either (a) wrap parallax content in `overflow:hidden` bounded container, (b) ensure pinned-section parent height = pinned + scroll-distance, or (c) switch to sticky-pin crossfade. See `scroll.md` § 1 LAYOUT-COLLAPSE BUG.

### ✅ 34. `useScroll` ALWAYS has `target: ref` (when element-relative)
Verify: every `useScroll({ ... })` call either has `target: someRef` OR is intentionally window-relative (progress bar). Without `target`, scroll tracks window when the model thinks it's element-relative. Single biggest scroll bug.

```bash
grep -rE "useScroll\(\s*\{" src/ | grep -v "target:"
# should return only intentional window-scroll uses
```

### ✅ 35. NO `useMotionValueEvent` for derived UI values
`useMotionValueEvent` triggers React re-renders every scroll frame (silent 60fps re-render storm). Use `useTransform` for derived UI. `useMotionValueEvent` is ONLY OK for canvas drawing or external side-effects.

### ✅ 36. `100svh` on hero pins (NOT `100vh`)
Verify any hero with `position: sticky` or pinned scroll uses `min-h-[100svh]` or `h-[100svh]`. `100vh` causes iOS Safari address-bar jitter on pinned content.

### ✅ 37. `prefers-reduced-motion` respected
Verify: every parallax / scroll-driven animation has either `useReducedMotion()` hook check, OR a CSS `@media (prefers-reduced-motion: reduce)` block disabling the animation. Aceternity UI ships ZERO of these — we ship them by default.

### ✅ 38. Parallax + scroll-driven motion DISABLED on touch
Verify: `(hover: none) and (pointer: coarse)` media query disables parallax/scroll-driven motion on phones. Parallax on touch = vestibular nausea + perf hit.

### ✅ 39. ONE expensive moment is named
The page has ONE detail that telegraphs "custom-built" vs "template". State which one in your final message. If you can't name one — re-read `visual-thinking.md` § THE EXPENSIVE MOMENT and add one before shipping.

---

## STEP C — Common failure modes & fixes

### Failure: "It looks fine to me"
You're missing it. Re-read `anti-slop.md` and look for the specific patterns.

### Failure: Sparse sections
Add real content (testimonials, FAQs, integrations) OR delete the section. Never ship a hollow section.

### Failure: Multiple accent colors
Pick ONE and remove others. Status colors (red/green/yellow) are semantic, not accents.

### Failure: Hero >8 words
Move detail to subtext.
Bad: `<h1>Move money internationally with low fees and great rates</h1>` (10 words)
Good: `<h1>Move money. <em>Anywhere.</em></h1>` (3 words)
Subtext: `0.5% fee. 60+ currencies. Settled in 24h.`

### Failure: Centered everything
After hero, ALTERNATE alignment. Centered only for deliberate special moments.

### Failure: Boxy accordion FAQ
Replace with `recipes/faq-pillrows.md`.

### Failure: Mobile broken at 375px
Asymmetric grids missing single-column reset. Add `grid-cols-1 md:grid-cols-2`. Verify with `browser_resize`.

### Failure: Janky scroll / mobile fps tanking
Either animating layout props (use `transform`), backdrop-blur on scroll content (move to sticky/fixed only — see `architecture.md` § Performance), or `useState` for continuous input (switch to `useMotionValue` — see `architecture.md`).

---

## STEP D — Final sign-off

In your final message, list the 20 checks and their status:

```
Review:
✅ Hero copy 5 words
✅ Dual CTA pattern (filled + outlined pill)
✅ Background: oklch(98% 0.005 90) (warm off-white)
✅ Headline: "Build something *beautiful*." (one italic word)
✅ Single accent (terracotta) on CTAs only
✅ All 5 sections have content density
✅ No <Loader2 /> usage
✅ No purple-to-blue gradients
✅ No "MOST POPULAR" banner
✅ Section padding py-32 throughout
✅ Verified at 375/768/1280 — no overflow
✅ All motion via Framer Motion spring presets
✅ min-h-[100dvh] used (no h-screen)
✅ No emojis in any rendered UI
✅ Content passes Jane Doe check
✅ All animations use transform + opacity
✅ No floating decoration overlaps focal content (SAFE-ZONE)
✅ Squint test passes — focal still dominates at 8px blur
✅ Greyscale test passes — hierarchy survives on value alone
✅ Expensive moment named: <state which one detail telegraphs custom-built>
```

If any check fails, **fix it before shipping**. Do not ship with a known violation.
