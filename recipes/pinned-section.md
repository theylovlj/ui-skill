# recipes/pinned-section.md — Apple-style pinned scroll-driven section

**The "section that pins in place while content morphs as you scroll past it" pattern.** Apple's product pages live on this. Layout-safe by construction — the pin-spacer math is baked in.

The void-below-pinned-section bug is the classic AI failure: the pinned inner is `100svh`, the parent is also `100svh`, so there's no scroll distance to pin OVER → pinning ends immediately → giant empty space below. This recipe enforces `parent_height = pinned_height + scroll_distance`.

---

## When to use

✅ Hero with morphing content (text fades + scales, dashboard reveals, video plays)
✅ Apple-style "as you scroll, watch this transform" moments
✅ Step-by-step product story (3-5 frames revealed as user scrolls)
✅ Stack reveal (cards stack like a deck)

## When NOT to use

❌ Long-form content pages (gets in the way)
❌ Mobile-only (consider swipe carousel instead)
❌ Sections that need to be linked-to with `#anchor` (pinning + anchor = weird)
❌ Inside another sticky / pinned context

---

## The recipe

```tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface Frame {
  title: string;
  content: React.ReactNode;
}

interface Props {
  frames: Frame[];           // 3-5 frames typically
}

export function PinnedSection({ frames }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],   // start when section top hits viewport top, end when section bottom hits viewport bottom
  });

  // Outer height = pinned 100svh + scroll-distance per frame
  // 4 frames × ~80svh per frame = total 420svh outer
  const outerHeight = `${100 + frames.length * 80}svh`;

  return (
    <section
      ref={ref}
      className="relative"
      style={{ height: reducedMotion ? "auto" : outerHeight }}
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center justify-center">
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {frames.map((frame, i) => {
            const start = i / frames.length;
            const end = (i + 1) / frames.length;
            const fadeIn = (i + 0.1) / frames.length;
            const fadeOut = (i + 0.9) / frames.length;

            const opacity = useTransform(
              scrollYProgress,
              [start, fadeIn, fadeOut, end],
              [0, 1, 1, 0]
            );
            const scale = useTransform(
              scrollYProgress,
              [start, fadeIn, fadeOut, end],
              [0.95, 1, 1, 0.95]
            );

            return (
              <motion.div
                key={i}
                style={{ opacity, scale }}
                className="absolute inset-0 flex items-center justify-center will-change-transform"
              >
                <Frame title={frame.title}>{frame.content}</Frame>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Frame({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="text-center max-w-4xl">
      <h2 className="t-h2 mb-6">{title}</h2>
      <div>{children}</div>
    </div>
  );
}
```

---

## What makes this layout-safe

**The mantra:** `parent_height = pinned_height + scroll_distance`.

In this recipe:
- Inner pinned content = `100svh`
- We add `frames.length × 80svh` of scroll distance
- Total outer height = `(100 + frames.length × 80)svh`

For 4 frames: outer = 420svh. The user scrolls 320svh worth, during which the inner is pinned at the viewport top morphing through frames. When they reach 320svh, the parent section ends, the sticky releases, and the next section flows naturally.

If outer were just `100svh`, there'd be no scroll distance → no pin → frames flash and disappear instantly.

If outer were `2000svh`, there'd be way too much scroll → user gets bored.

---

## Common AI failure modes

### ❌ Failure: parent height same as pinned height
```tsx
// WRONG — no scroll distance, pin never engages
<section className="h-[100svh]">
  <div className="sticky top-0 h-[100svh]">...</div>
</section>
```
**Fix:** parent `h-[300svh]` for 200svh of scroll distance.

### ❌ Failure: `overflow: hidden` on an ancestor
```tsx
// WRONG — sticky silently doesn't engage
<main className="overflow-hidden">
  <section className="h-[300svh]">
    <div className="sticky top-0">...</div>
  </section>
</main>
```
**Fix:** Use `overflow: clip` instead of `overflow: hidden` if you need overflow control on parents.

### ❌ Failure: missing `target: ref` on `useScroll`
```tsx
// WRONG — animation tracks WINDOW scroll, not section scroll
const { scrollYProgress } = useScroll();
```
**Fix:** Always `target: ref`.

### ❌ Failure: `100vh` on pinned content (iOS Safari jitter)
```tsx
// WRONG — address-bar collapse causes jumps mid-pin
<div className="sticky top-0 h-[100vh]">
```
**Fix:** Use `h-[100svh]` (smallest viewport height) on hero pins.

### ❌ Failure: animating layout properties
```tsx
// WRONG — kills 60fps on mobile (reflow per frame)
const top = useTransform(scrollYProgress, [0, 1], [0, 200]);
return <motion.div style={{ top }}>...</motion.div>;
```
**Fix:** Animate `y` (transform), `scale`, `opacity` — never `top`/`left`/`width`/`height`.

---

## Tuning

- **Scroll distance per frame:** 60-100svh per frame is comfortable. Less = rushed, more = boring.
- **Crossfade overlap:** 10-20% of each frame's window (the `fadeIn`/`fadeOut` calc). Less = harsh cut, more = both visible at low opacity.
- **Reduced-motion:** wrap outer height in `reducedMotion ? "auto" : outerHeight` so screen readers and motion-averse users get a stacked static fallback.

---

## Cross-references

- `scroll.md` § 1 — pin-spacer math explained
- `scroll.md` § 2 Pattern 2 — pinned reveal canonical pattern
- `scroll.md` § 6 — Lenis + GSAP integration if you want buttery scroll
- `recipes/parallax-hero.md` — for backgrounds that move with scroll (different pattern)
