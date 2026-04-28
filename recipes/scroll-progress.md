# recipes/scroll-progress.md — Top-of-page scroll progress bar

**The thin colored line at the top of the page that fills as you scroll.** Used by Linear, Stripe docs, Vercel docs, every long-form article. Subtle, signals "you're making progress," costs almost nothing.

Two implementations: native CSS (preferred — zero JS, just works) and Motion (fallback for Firefox). Use both with `@supports` for the best of both.

---

## When to use

✅ Long-form pages (docs, blog posts, multi-section landings)
✅ Pricing pages with comparison tables
✅ Any page where users care about "how much more is there"

## When NOT to use

✅ Always fine to include — it's a no-cost premium signal.

## When to skip

❌ Single-viewport pages (no progress to show)
❌ Pages with their own internal scroll containers (use scrollable-container variant)

---

## Recipe — CSS native (preferred)

```css
/* In globals.css */

.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--accent);
  transform-origin: 0%;
  transform: scaleX(0);
  z-index: 50;
  pointer-events: none;
}

@supports (animation-timeline: scroll()) {
  .scroll-progress {
    animation: scroll-progress linear both;
    animation-timeline: scroll(root);
    animation-duration: 1ms;     /* Firefox needs this — silent break otherwise */
  }
}

@keyframes scroll-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-progress { display: none; }
}
```

```jsx
{/* In layout.tsx or page.tsx — just an empty div */}
<div className="scroll-progress" />
```

---

## Recipe — Motion fallback (Firefox + older browsers)

```tsx
"use client";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgressMotion() {
  const { scrollYProgress } = useScroll();
  // Spring-wrap for buttery feel — small stiffness/damping = smooth catch-up
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 25, mass: 0.1 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-50 pointer-events-none origin-left"
      aria-hidden
    />
  );
}
```

---

## Combined (best of both)

```tsx
{/* layout.tsx */}
import { ScrollProgressMotion } from "./scroll-progress";

export default function Layout({ children }) {
  return (
    <html>
      <body>
        {/* CSS native version — wins on supporting browsers */}
        <div className="scroll-progress" />

        {/* Motion fallback — only renders if CSS native is unsupported */}
        <noscript>{/* nothing */}</noscript>
        <ScrollProgressMotion />

        {children}
      </body>
    </html>
  );
}
```

For belt-and-suspenders: feature-detect on the client and conditionally render only one. In practice both can run simultaneously without visual conflict (scaleX 0 baseline is invisible).

---

## What makes this work

1. **`scaleX` not `width`.** Animating `width` reflows the layout every frame = ~5fps on mobile. `scaleX` is GPU-only.
2. **`transform-origin: 0%`** (or `origin-left` in Tailwind). Without it, the bar grows from the center.
3. **`useSpring(scrollYProgress)`** with low stiffness/damping smooths the scroll position into a buttery follow. Don't omit — raw `scrollYProgress` looks digital.
4. **`pointer-events: none`** so the bar never blocks clicks below it.
5. **CSS `animation-duration: 1ms`** is the Firefox-specific incantation that opts the keyframe into scroll-timeline mode. Without it, Firefox runs the animation as a normal time-based animation in 1ms = invisible.

---

## Common AI failure modes

### ❌ Failure: animating `width` instead of `scaleX`
```tsx
// WRONG — reflow per frame, kills mobile fps
<motion.div style={{ width: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }} />
```
**Fix:** `scaleX` only.

### ❌ Failure: missing `transform-origin: 0%`
```tsx
// WRONG — bar grows from center, looks broken
<motion.div style={{ scaleX }} />
```
**Fix:** Add `origin-left` (Tailwind) or `transformOrigin: "0%"` (inline).

### ❌ Failure: raw `scrollYProgress` without spring
```tsx
// WRONG — bar stutters with each scroll tick
<motion.div style={{ scaleX: scrollYProgress }} />
```
**Fix:** Wrap with `useSpring`.

### ❌ Failure: thick bar (`h-2`+)
**Fix:** Use `h-0.5` or `h-1` max. Above 4px the bar dominates the page.

---

## Tuning

- **Color:** `bg-accent` for brand-color bar, OR `bg-foreground/30` for muted neutral. Brand wins for marketing pages, muted wins for docs.
- **Height:** 2px premium target. 1px is invisible on hi-DPI. 4px+ looks like a 2014 progress bar.
- **Spring tightness:** `stiffness: 150, damping: 25, mass: 0.1` is the buttery default. Lower stiffness (80) = laggy follow. Higher stiffness (300) = digital.

---

## Cross-references

- `scroll.md` § 2 Pattern 3 — canonical scroll progress bar
- `tokens.md` § Z-INDEX DISCIPLINE — `z-50` is reserved for floating overlays/nav
- `recipes/use-scroll-component-lifecycle.md` — for animation components that need lifecycle guards
