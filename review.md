# review.md — Pre-Ship Checklist

**Run this in Step 4 of the procedure. Every item must pass before SHIP.**

If Playwright is available (`mcp__playwright__browser_*` tools), use them. Otherwise, manually verify by reading the code and reasoning about the rendered output.

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

## STEP B — The 12 checks

Go through each. Do NOT batch — verify one, mark, then next.

### ✅ 1. Hero copy is ≤ 8 words
Count words in `<h1>`. If more than 8, rewrite it. Subtext can carry detail.

### ✅ 2. Hero has dual CTA pattern
Filled pill + outlined/text pill. Side-by-side. NOT a single solo CTA. NOT three buttons.

### ✅ 3. Background is NOT pure white or pure black
Check the body background CSS. Must be off-white (`oklch(98% ...)` family) or near-black (`oklch(12% ...)`).

### ✅ 4. Typography uses ONE italic-serif accent word in hero
Inspect the H1. Must be: bold sans for the bulk + ONE italic-serif word for emphasis. Not all italic. Not zero italic.

### ✅ 5. Only ONE accent color is used
Scan the rendered page for color: should see neutral text + neutral background + ONE accent (on CTAs, focus rings, status dots). If a second accent color appears, fix it.

### ✅ 6. NO empty / sparse sections
Every section must have meaningful content density. If you see a heading with nothing below it, or a wide white gap with one isolated element, the section is dead.

**How to verify with Playwright:**
```js
// pseudocode — measure section heights and child count
const sections = await page.$$('section');
for (const s of sections) {
  const height = await s.boundingBox().then(b => b.height);
  const children = await s.$$eval('*', els => els.length);
  if (height > 200 && children < 10) flag('sparse section');
}
```

### ✅ 7. NO `<Loader2 />` or generic spinner
Search the codebase: `grep -r "Loader2" src/`. Must be zero matches. Replace with skeleton or progress per `anti-slop.md`.

### ✅ 8. NO purple-to-blue gradient
Search the codebase: `grep -r "from-purple.*to-blue\|from-blue.*to-purple" src/`. Must be zero. Use bundled backgrounds or single-hue radial.

### ✅ 9. NO "MOST POPULAR" pricing banner
Search: `grep -r "MOST POPULAR\|POPULAR" src/`. Must be zero. Use subtle "Currently Popular" + dot.

### ✅ 10. Section padding is ≥ `py-24`
Inspect each `<section>`. Vertical padding must be at least `py-24` (96px). `py-32` to `py-40` is the premium target.

### ✅ 11. NO elements overflow their containers
Check at three viewport widths (375px mobile, 768px tablet, 1280px desktop). Use Playwright `browser_resize`. Look for horizontal scrollbars or text/elements bleeding past the visible area. Common culprits: dashboard previews wider than container, currency selectors floating outside cards.

### ✅ 12. Motion uses springs, not cubic-bezier
Search: `grep -r "cubic-bezier\|transition: all" src/`. For primary motion (button morphs, page transitions, layout changes), must be Framer Motion `layout` + spring. CSS transitions OK only for `transition-colors duration-200` style hover-color changes.

---

## STEP C — Common failure modes & fixes

### Failure: "It looks fine to me"
You're missing it. Premium UI fails the eye test in seconds. Either there's an obvious problem or the page is generic in ways you've trained yourself to ignore. Re-read `anti-slop.md` and look for the specific patterns.

### Failure: Sparse sections
You added structural placeholders without real content. Either:
1. Add real content (testimonials, FAQs, integrations) — but only what genuinely belongs
2. Delete the section entirely
NEVER ship a hollow section.

### Failure: Multiple accent colors
You added a second accent because "it adds variety." Variety comes from photography, not flat color. Pick ONE and remove all others. Status colors (red/green/yellow for errors/success/warnings) don't count as accents — they're semantic.

### Failure: Hero >8 words
Move detail to subtext. Hero confirms. Subtext explains.

Bad: `<h1>Move money internationally with low fees and great rates</h1>` (10 words)
Good: `<h1>Move money. <em>Anywhere.</em></h1>` (3 words)
Subtext: `0.5% fee. 60+ currencies. Settled in 24h.`

### Failure: Centered everything
After hero, ALTERNATE alignment. Some sections left-aligned with split layout, some right-aligned, only deliberately centered for special moments (testimonials, CTA banners).

### Failure: Boxy accordion FAQ
Replace with `recipes/faq-pillrows.md` pattern.

---

## STEP D — Final sign-off

In your final message to the user, list the 12 checks and their status:

```
Review:
✅ Hero copy 5 words
✅ Dual CTA pattern (filled + outlined pill)
✅ Background: oklch(98% 0.005 90) (warm off-white)
✅ Headline: "Build something *beautiful*." (one italic word)
✅ Single accent (terracotta) on CTAs only
✅ All 5 sections have content density (testimonials 3 cards, FAQ 6 items, etc.)
✅ No <Loader2 /> usage (skeleton in features section instead)
✅ No purple-to-blue gradients
✅ No "MOST POPULAR" banner — used "Currently popular" pill with green dot
✅ Section padding py-32 throughout
✅ Verified at 375/768/1280 — no overflow
✅ All motion via Framer Motion spring presets
```

If any check fails, **fix it before shipping**. Do not ship with a known violation and "we can fix it later" — that's how AI-generated output ships.
