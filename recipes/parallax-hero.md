# recipes/parallax-hero.md — Layout-safe parallax hero

**The parallax recipe that does NOT leave a giant void below the section.** Default to this anytime someone wants parallax — it's the only layout-safe primitive.

The layout-collapse bug (`transform: translateY(-200px)` lifting the foreground out of layout flow → next section pushed down by 200px void) is documented in `scroll.md` § 1. This recipe avoids it by putting the parallax INSIDE a bounded `overflow:hidden` container and parallaxing only the BACKGROUND.

---

## When to use

✅ Hero section with a background image / gradient that should drift slower than scroll
✅ Section ≥ 70vh tall (anything shorter doesn't have enough scroll distance)
✅ Desktop-first builds (parallax disabled on touch — see `useScrollComponentLifecycle`)
✅ Brand wants a premium, slightly-cinematic feel

## When NOT to use

❌ Mobile-only / touch-only experiences (vestibular nausea)
❌ Sections with critical above-fold LCP (parallax delays paint)
❌ Text content (text never parallaxes — kills reading speed)
❌ Forms or interactive elements
❌ Already-using-sticky-pin sections (they fight)

---

## The recipe

```tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface Props {
  bgSrc: string;          // /hero-bg.webp
  headline: React.ReactNode;
  subhead: React.ReactNode;
  cta: React.ReactNode;
}

export function ParallaxHero({ bgSrc, headline, subhead, cta }: Props) {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,                                  // MANDATORY — element-relative
    offset: ["start start", "end start"],         // bg moves while hero is visible
  });

  // Background drifts 0% → 30% downward as user scrolls UP (slower than foreground)
  const yRaw = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const y = reducedMotion ? "0%" : yRaw;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden"  // BOUNDED — prevents void below
    >
      {/* BACKGROUND LAYER — oversized + translates */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 -top-[15%] h-[130%] w-full will-change-transform pointer-events-none hidden md:block"
        // hidden on mobile — touch parallax = nausea
      >
        <img
          src={bgSrc}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </motion.div>

      {/* MOBILE FALLBACK — static bg */}
      <div className="absolute inset-0 md:hidden pointer-events-none">
        <img src={bgSrc} alt="" className="h-full w-full object-cover" loading="eager" />
      </div>

      {/* FOREGROUND CONTENT — stays in layout flow */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 pb-20 md:pt-40 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-7">
            {headline}
            {subhead}
            {cta}
          </div>
        </div>
      </div>
    </section>
  );
}
```

---

## What makes this layout-safe

1. **`overflow: hidden` on the outer section** — the parent box never grows beyond `100svh`. The background can translate freely without pushing siblings.
2. **Background is `position: absolute` with `inset-0`** — taken out of normal layout flow entirely. Doesn't reserve any height in the document.
3. **Background is OVERSIZED** (`h-[130%]` + `-top-[15%]`) — when it translates 30% downward, the bottom is still covered. No empty edge revealed.
4. **Foreground content uses `position: relative` + `z-10`** — sits above the bg, stays in normal layout flow, contributes to section height.
5. **Mobile shows static bg** — no `motion.div` rendered on touch devices.
6. **`useReducedMotion()` zeros the translation** when user has the OS preference set.

---

## Common AI failure modes (and what they look like)

### ❌ Failure: parallaxing the FOREGROUND content
```tsx
// WRONG — content lifts out of flow, void appears below
<motion.div style={{ y: useTransform(...) }}>
  <h1>Hero text</h1>
</motion.div>
```
**Fix:** Only parallax the BACKGROUND. Foreground always stays in normal flow.

### ❌ Failure: missing `overflow: hidden` on the outer section
```tsx
// WRONG — bg can escape the section bounds
<section className="relative">
  <motion.div className="absolute" style={{ y }}>...</motion.div>
</section>
```
**Fix:** Add `overflow-hidden` (or `overflow-clip`) to the section.

### ❌ Failure: missing `target: ref` on `useScroll`
```tsx
// WRONG — animation tracks WINDOW scroll instead of element
const { scrollYProgress } = useScroll();
```
**Fix:** Always pass `target: ref` for element-bounded scroll progress.

### ❌ Failure: bg not oversized
```tsx
// WRONG — bg is 100% height, translates 30% down → empty edge revealed at bottom
<motion.div className="absolute inset-0" style={{ y: "30%" }}>
```
**Fix:** Make bg `h-[130%]` and `-top-[15%]` so it stays covered when translated.

### ❌ Failure: parallax on mobile
```tsx
// WRONG — runs on touch devices, causes nausea + perf hit
<motion.div style={{ y }} className="absolute inset-0">
```
**Fix:** `hidden md:block` on the parallax element + static fallback for mobile.

---

## Tuning

- **Translation distance:** 0% → 30% is the sweet spot. Beyond 50% = nausea. Below 15% = imperceptible.
- **Direction:** background moves DOWN as page scrolls UP (the parallax illusion). `useTransform([0, 1], ["0%", "30%"])` — positive value = moves down.
- **Ease:** wrap with `useSpring(scrollYProgress, { stiffness: 100, damping: 30 })` for buttery feel — ONLY if rest of page also uses smooth scroll. Otherwise raw value.

---

## Cross-references

- `scroll.md` § 1 — the layout-collapse bug explained
- `scroll.md` § 2 Pattern 4 — parallax background canonical pattern
- `recipes/use-scroll-component-lifecycle.md` — for marquees and continuous animations
- `anti-slop.md` § MOTION — animate transform + opacity only
