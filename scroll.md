# scroll.md — The Complete Scroll, Parallax & Motion Law

**Read this every time you touch scroll-driven animation, parallax, or pinned/sticky sections.** Synthesized from measured implementations of Apple, Stripe, Linear, Aceternity UI, Magic UI + the official docs of GSAP ScrollTrigger, Motion (Framer Motion's successor), and the native CSS `scroll-timeline` / `view-timeline` spec.

This file exists because EVERY AI implementation of scroll-driven UI has the same bugs:
1. **Layout collapse** — parallax leaves a giant void below the section
2. **Pin-spacer void** — sticky/pinned section leaves empty space the size of the scroll distance
3. **Window-relative scroll** — `useScroll` without a `target` ref tracks the wrong thing
4. **Silent re-render storm** — `useMotionValueEvent` triggers React 60fps re-renders
5. **iOS Safari breakage** — `100vh` jumps; `<video>.currentTime` scrubbing fails
6. **No reduced-motion respect** — animations ignore OS accessibility setting
7. **Touch-device nausea** — parallax shipped as-is on phones causes vestibular issues

This file fixes all seven.

---

## TL;DR — The 12 Scroll Commandments

1. **Use `motion` not `framer-motion`.** Package is renamed: `import { motion, useScroll, useTransform } from "motion/react"`. Same API, smaller bundle.
2. **`useScroll` ALWAYS gets a `target` ref.** Without it, scroll is window-relative when you almost always want element-relative. Single biggest scroll bug.
3. **Use `useTransform`, NOT `useMotionValueEvent`, for derived UI.** `useMotionValueEvent` triggers React re-renders on every scroll frame (silent 60fps re-render storm). `useTransform` stays on the GPU.
4. **Pinned sections need explicit parent height:** `parent_height = pinned_height + scroll_distance`. If you pin a `100svh` section over 200vh of scroll, the parent must be `300svh`. Otherwise = void below.
5. **`overflow: hidden` on any ancestor silently kills `position: sticky`.** Use `overflow: clip` instead. (Clip prevents painting overflow but doesn't create a scroll container.)
6. **Use `100svh` for hero pins, `100dvh` for late-page panels, NEVER `100vh`.** `svh` (smallest viewport) prevents iOS Safari address-bar jitter on pinned content.
7. **Parallax = bounded `overflow: hidden` container with oversized child.** Never `transform: translateY()` outside a bounded box — it doesn't reflow, so the void appears.
8. **Max parallax translation = 50-150px.** Beyond that = nausea. Background speed multiplier = 0.3-0.5× foreground.
9. **DISABLE parallax + scroll-driven motion on touch devices** (`@media (hover: none) and (pointer: coarse)`) AND on `prefers-reduced-motion: reduce`. Both are non-negotiable.
10. **Apple uses canvas image sequences, NOT `<video>.currentTime`** for scroll-scrubbed video. iOS Safari breaks `currentTime` scrubbing on `<video>` elements.
11. **Animate ONLY `transform` and `opacity`.** Layout properties (top/left/width/height/margin/padding) trigger reflow per frame = ~5fps on mobile.
12. **Every scroll/animation-frame component uses the `useScrollComponentLifecycle` hook** (defined below) — handles IntersectionObserver pause, `visibilitychange` pause, `prefers-reduced-motion`, and resize. Aceternity UI ships ZERO of these; we ship all four by default.

---

## 1. THE LAYOUT-COLLAPSE BUG (the void below your parallax / pinned section)

### Why it happens — the math

`transform: translateY(-200px)` is a **paint-only** operation. The element's pixels move, but the container still reserves the original height. Result:

```
BEFORE TRANSFORM:                   AFTER transform: translateY(-200px):
┌─────────────────┐                 ┌─────────────────┐
│  Hero (600px)   │                 │  Hero painted   │
│                 │                 │  here (lifted   │
│                 │                 │  up 200px)      │
└─────────────────┘                 │                 │
┌─────────────────┐                 │   200px VOID    │  ← container still
│  Next section   │                 │   (still part   │     reserves 600px
│                 │                 │   of hero box)  │
└─────────────────┘                 └─────────────────┘
                                    ┌─────────────────┐
                                    │  Next section   │  ← pushed down by void
```

`position: sticky` + `transform` has the same problem if the parent isn't tall enough.

### The 3 layout-safe fixes

**Fix A — Bounded parallax (use this 90% of the time):**

```jsx
{/* The OUTER box has fixed height + overflow:hidden.
    The INNER child is OVERSIZED and translates. The outer box's
    layout flow is unaffected. NO VOID. */}
<div className="relative h-[80svh] overflow-hidden">
  <motion.img
    src="/hero-bg.webp"
    alt=""
    style={{ y }}                         {/* y from useTransform */}
    className="absolute inset-0 h-[120%] w-full object-cover"
  />
  <div className="relative">
    {/* foreground content stays in normal flow */}
  </div>
</div>
```

**Fix B — Element-bounded `useScroll`:**

```jsx
const ref = useRef(null);
const { scrollYProgress } = useScroll({
  target: ref,                            {/* MANDATORY — without this it's window-relative */}
  offset: ["start end", "end start"],     {/* element-relative bounds */}
});
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
```

**Fix C — CSS `view()` timeline (auto-bounded, no JS):**

```css
@supports (animation-timeline: view()) {
  .parallax-bg {
    animation: lift linear both;
    animation-timeline: view();
    animation-range: cover 0% cover 100%;  /* element-bounded by definition */
  }
  @keyframes lift {
    from { transform: translateY(0); }
    to   { transform: translateY(-15%); }
  }
}
```

### Pinned-section pin-spacer rule

For a section that pins (sticks in place) while content scrolls:

```
parent_container_height = pinned_section_height + scroll_distance
```

If you want a `100svh` hero to pin while the user scrolls 200vh through morphing content, the parent must be `300svh` tall. Otherwise pinning ends immediately and you get a void.

```jsx
{/* OUTER — explicit height = pinned + scroll-distance */}
<section className="relative h-[300svh]">
  {/* INNER — sticky to viewport top */}
  <div className="sticky top-0 h-[100svh] overflow-hidden">
    {/* morphing content driven by useScroll on the OUTER ref */}
  </div>
</section>
```

GSAP ScrollTrigger does this automatically with its `pin-spacer` div — it wraps the pinned element and adds `padding-bottom = end - start` to the spacer so the parent height is correct. If you're seeing the void with GSAP, the bug is your `end` value is wrong, OR you forgot `gsap.context()` cleanup in React Strict Mode (causing double pin-spacers).

---

## 2. THE 10 PATTERNS — Each With Correct Code + The AI Bug + The Fix

### Pattern 1 — Hero text fades+blurs as you scroll past it

**Correct (Motion):**
```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HeroFadeBlur() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],     // pin start, fade as it leaves
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 8]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  return (
    <section ref={ref} className="h-[100svh]">
      <motion.h1 style={{ opacity, filter }} className="t-hero">
        Catch every incident before it cascades.
      </motion.h1>
    </section>
  );
}
```

**The AI bug:** missing `target: ref` → scroll tracked window-wide → animation triggers on the wrong content. ALSO: animating `filter` directly without going through `useTransform` to a string → animation doesn't run (motion-values can't be strings). Convert numeric → string with `useTransform(value, (v) => \`blur(${v}px)\`)`.

---

### Pattern 2 — Section that pins then releases (Apple-style)

**Correct (Motion):**
```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function PinnedReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
  return (
    <section ref={ref} className="relative h-[250svh]">  {/* pinned 100svh + 150svh scroll */}
      <div className="sticky top-0 h-[100svh] overflow-clip flex items-center justify-center">
        <motion.div style={{ scale, opacity }} className="will-change-transform">
          <ProductMockup />
        </motion.div>
      </div>
    </section>
  );
}
```

**The AI bug:** outer height is `100svh` (same as inner) → no scroll distance → no pin → animation never triggers. Outer MUST be taller than inner by the desired scroll distance.

**Mobile:** consider reducing scroll distance (`h-[180svh]` not `250svh`) to avoid long boring scroll.

---

### Pattern 3 — Scroll progress bar at top of page

**Correct (Motion):**
```jsx
"use client";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();        // window-wide IS what we want here
  const scaleX = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-accent z-50"
    />
  );
}
```

**Correct (CSS-native, no JS):**
```css
@supports (animation-timeline: scroll()) {
  .progress-bar {
    transform-origin: 0%;
    animation: progress linear both;
    animation-timeline: scroll(root);
    animation-duration: 1ms;                /* Firefox needs this — silent break otherwise */
  }
  @keyframes progress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
}
```

**The AI bug:** animating `width` instead of `scaleX` → reflow per frame → 5fps on mobile. ALWAYS scaleX.

---

### Pattern 4 — Parallax background (the canonical use)

**Correct (Motion + bounded container):**
```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ParallaxHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);  // bg moves DOWN as user scrolls UP

  return (
    <section ref={ref} className="relative h-[80svh] overflow-hidden">
      <motion.div
        style={{ y }}
        className="absolute inset-0 h-[130%] -top-[15%]"  // oversized to fill gap when translated
      >
        <img src="/hero-bg.webp" alt="" className="h-full w-full object-cover" />
      </motion.div>
      <div className="relative z-10 h-full flex items-center justify-center">
        <h1 className="t-hero">Foreground stays put.</h1>
      </div>
    </section>
  );
}
```

**Disable on mobile + reduced motion:**
```jsx
import { useReducedMotion } from "motion/react";
const reducedMotion = useReducedMotion();
const isTouch = typeof window !== "undefined" && window.matchMedia("(hover: none) and (pointer: coarse)").matches;
const y = useTransform(scrollYProgress, [0, 1], (reducedMotion || isTouch) ? ["0%", "0%"] : ["0%", "30%"]);
```

**The AI bug:** `transform: translateY(-200px)` on the foreground content directly (no bounded container) → 200px void below the section. The fix: bg parallax INSIDE a fixed-height `overflow-hidden` box. Never lift content out of layout flow.

**MAX TRANSLATION:** 50-150px or 15-30% — beyond that = nausea. Background speed multiplier: 0.3-0.5× of scroll velocity.

---

### Pattern 5 — Sticky horizontal scroll (case study slides)

**Correct (Motion):**
```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function HorizontalScroll() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });
  // 4 slides → translate from 0% to -75% (showing slide 4 = the LAST slide)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

  return (
    <section ref={ref} className="relative h-[400svh]">  {/* 4× scroll distance */}
      <div className="sticky top-0 h-[100svh] overflow-hidden flex items-center">
        <motion.div style={{ x }} className="flex gap-8 will-change-transform">
          <Slide /><Slide /><Slide /><Slide />
        </motion.div>
      </div>
    </section>
  );
}
```

**The AI bug:** scroll distance not matched to slide count. 4 slides need ~3-4× viewport scroll distance. Less = jumpy, more = boring.

**Mobile:** consider switching to swipe carousel instead. Sticky horizontal on mobile = often confusing.

---

### Pattern 6 — Stack reveal (cards stack like a deck as you scroll)

**Correct:**
```jsx
const cards = [...];
return (
  <section ref={ref} className="relative" style={{ height: `${cards.length * 100}svh` }}>
    {cards.map((card, i) => {
      const start = i / cards.length;
      const end = (i + 1) / cards.length;
      const scale = useTransform(scrollYProgress, [start, end], [1, 0.85]);
      const opacity = useTransform(scrollYProgress, [start, end], [1, 0.4]);
      return (
        <div key={i} className="sticky top-0 h-[100svh] flex items-center justify-center">
          <motion.div style={{ scale, opacity }} className="origin-top">
            <Card data={card} />
          </motion.div>
        </div>
      );
    })}
  </section>
);
```

**The AI bug:** all cards in a single `<motion.div>` with computed offsets → only one card animates → others snap into wrong positions.

---

### Pattern 7 — Word-by-word fade-in tied to scroll position

**Correct:**
```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export function ScrollTextReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "start 0.25"],   // start when top of text is 85% down viewport
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className="t-h2 max-w-prose leading-snug">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span key={i} style={{ opacity }}>
            {word}{" "}
          </motion.span>
        );
      })}
    </p>
  );
}
```

**The AI bug:** using `useMotionValueEvent` to set per-word state → 60fps re-renders → page locks up. Always `useTransform`.

---

### Pattern 8 — Video scrubbing with scroll (Apple Vision Pro style)

**WRONG approach (breaks on iOS Safari):**
```jsx
// DON'T DO THIS — iOS Safari breaks <video>.currentTime scrubbing
const video = videoRef.current;
useMotionValueEvent(scrollYProgress, "change", (p) => {
  video.currentTime = p * video.duration;
});
```

**CORRECT approach (canvas image sequence):**
Pre-render the video as a sequence of WebP/JPEG frames (e.g. 60-120 frames). Load all frames into an array of `Image` objects. On scroll, draw the appropriate frame to a `<canvas>`. Apple does this for every product page.

```jsx
"use client";
import { useScroll, useMotionValueEvent } from "motion/react";
import { useRef, useEffect, useState } from "react";

const FRAME_COUNT = 60;
const frames = Array.from({ length: FRAME_COUNT }, (_, i) =>
  `/hero-frames/frame-${String(i).padStart(3, "0")}.webp`
);

export function ScrollVideo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const { scrollYProgress } = useScroll({ target: sectionRef });

  useEffect(() => {
    Promise.all(frames.map((src) => new Promise<HTMLImageElement>((res) => {
      const img = new Image();
      img.src = src;
      img.onload = () => res(img);
    }))).then(setImages);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (images.length < FRAME_COUNT) return;
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const idx = Math.min(FRAME_COUNT - 1, Math.floor(p * FRAME_COUNT));
    ctx.drawImage(images[idx], 0, 0);
  });

  return (
    <section ref={sectionRef} className="relative h-[300svh]">
      <div className="sticky top-0 h-[100svh]">
        <canvas ref={canvasRef} width={1920} height={1080} className="w-full h-full object-cover" />
      </div>
    </section>
  );
}
```

This is one of the few legitimate uses of `useMotionValueEvent` — drawing to canvas isn't a React render.

---

### Pattern 9 — Section-to-section morph (one fades out as next fades up at the same scroll point)

```jsx
const { scrollYProgress } = useScroll({ target: ref });
const sectionAOpacity = useTransform(scrollYProgress, [0.4, 0.5], [1, 0]);
const sectionBOpacity = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
```

Crossfade window of 0.1 (10% of scroll distance) feels right. Less = harsh cut, more = both visible at low opacity = mush.

---

### Pattern 10 — Sticky CTA that appears after scroll-depth threshold

```jsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";

export function StickyMobileCTA() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.95, 1], [0, 1, 1, 0]);
  const y = useTransform(opacity, [0, 1], [40, 0]);
  return (
    <motion.div
      style={{ opacity, y }}
      className="fixed bottom-4 left-4 right-4 z-40 md:hidden"
    >
      <Button className="w-full h-14">Start free trial</Button>
    </motion.div>
  );
}
```

**Conversion impact:** +10-20% on mobile per published case studies. The bottom-third is the thumb-rest green zone.

---

## 3. THE UNIVERSAL SCROLL LIFECYCLE HOOK

**Every scroll/animation-frame component in this skill MUST use this.** Aceternity UI ships ZERO of these guards in any of their scroll components. Magic UI's `scroll-based-velocity` is the only competitor that does all four — we adopt their pattern as the universal scaffold.

```tsx
// hooks/useScrollComponentLifecycle.ts
"use client";
import { useEffect, useRef, useState } from "react";

interface Options {
  /** Pause when out of viewport (default true) */
  pauseOffscreen?: boolean;
  /** Pause when tab is hidden (default true) */
  pauseHidden?: boolean;
  /** Respect prefers-reduced-motion (default true) */
  respectReducedMotion?: boolean;
}

export function useScrollComponentLifecycle(opts: Options = {}) {
  const {
    pauseOffscreen = true,
    pauseHidden = true,
    respectReducedMotion = true,
  } = opts;

  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // prefers-reduced-motion (reactive to user toggling system setting)
  useEffect(() => {
    if (!respectReducedMotion) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handle = () => setReducedMotion(mq.matches);
    handle();
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, [respectReducedMotion]);

  // IntersectionObserver — pause when offscreen
  useEffect(() => {
    if (!pauseOffscreen || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting),
      { threshold: 0.01 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [pauseOffscreen]);

  // visibilitychange — pause when tab hidden
  useEffect(() => {
    if (!pauseHidden) return;
    const handle = () => setIsActive(!document.hidden);
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, [pauseHidden]);

  return {
    ref,
    /** True only when component should animate */
    shouldAnimate: isActive && !reducedMotion,
    isActive,
    reducedMotion,
  };
}
```

**Usage in any scroll/animation component:**
```jsx
const { ref, shouldAnimate } = useScrollComponentLifecycle();
return (
  <div ref={ref}>
    {shouldAnimate ? <ParallaxBg /> : <StaticBg />}
  </div>
);
```

---

## 4. WHEN NOT TO USE PARALLAX (most of the time)

Parallax is overused. Each of these is a hard skip:

1. **Mobile / touch devices** — vestibular nausea + scroll-perf hit
2. **Sections under 70vh tall** — not enough scroll distance for the effect to register
3. **Text-heavy sections** — text should NEVER parallax (reading speed killer)
4. **Above-fold content critical to LCP** — parallax delays paint
5. **Forms** — input focus + parallax = users lose track
6. **Every section** — if more than 1-2 sections parallax, none of them stand out
7. **Flat brand imagery** — parallax needs depth cues to work
8. **Interactive elements** — no parallax on buttons, links, cards with hover
9. **`prefers-reduced-motion`** — disable, no exceptions
10. **Performance budget < Lighthouse 90** — budget for the cost
11. **Inside modals / sheets** — modal scroll context is its own world
12. **Sticky-positioned content** — sticky + parallax fight each other
13. **When you're not 100% sure your container is bounded** — default to sticky-pin instead
14. **Rotating carousels** — already moving; layered motion = chaos
15. **The fold immediately after a video hero** — too much motion stacking

**Default: don't use parallax.** Use sticky-pin crossfade instead (Apple's actual technique). Sticky-pin is layout-safe by definition.

---

## 5. CSS NATIVE SCROLL-TIMELINE — When To Use It

Browser support (April 2026):
- Chrome 115+ ✅
- Safari 26+ ✅ (just landed)
- Firefox: behind flag ⚠️ (use Motion fallback)

**Use native CSS when:** the animation is purely transform/opacity, no JS state, no React-driven values, you can ship the Motion fallback for Firefox.

**The two timeline functions:**

```css
/* scroll() — based on the nearest scrollable ancestor */
animation-timeline: scroll(root);    /* root = page-wide scroll */
animation-timeline: scroll();        /* nearest scroll container */

/* view() — based on element's position in the viewport */
animation-timeline: view();
animation-range: cover 0% cover 100%;  /* element-bounded */
```

**The Firefox `1ms` requirement (silent breakage if missed):**
```css
.element {
  animation: lift linear both;
  animation-timeline: view();
  animation-duration: 1ms;             /* Firefox skips animation without this */
}
```

**`animation-range` mental model:**

```
   ┌────────────────┐  ← entry 0% (element top hits viewport bottom)
   │                │
   │                │  ← cover 0% (element fully entered viewport top)
   │   ELEMENT      │
   │                │  ← cover 100% (element about to fully exit)
   │                │
   └────────────────┘  ← exit 100% (element bottom hits viewport top)
```

`animation-range: cover 0% cover 100%` = animation runs only while element is fully in view.
`animation-range: entry 0% exit 100%` = animation runs the entire time element is visible at all.

---

## 6. LENIS SMOOTH SCROLL — When To Use, How To Wire

**When to use Lenis:**
- You want premium "buttery" scroll feel (Awwwards-tier sites)
- You're using GSAP ScrollTrigger heavily

**When NOT to use Lenis:**
- Page has many `position: fixed` elements (Lenis can fight with them)
- Mobile-first: Lenis on touch is often worse than native (set `smoothTouch: false`)
- Page has `<input>`/`<textarea>` heavy UX (Lenis interferes with mobile keyboard scroll)

**Correct Lenis + GSAP integration (one RAF loop):**
```tsx
"use client";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      smoothTouch: false,                // CRITICAL — never smooth on touch
      autoRaf: false,                    // we drive RAF from GSAP ticker
    });

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return children;
}
```

If Lenis runs its own RAF AND ScrollTrigger runs its own RAF, scroll desyncs and pinned sections jitter. ONE loop only.

---

## 7. FRAMER MOTION (now `motion`) — The Critical APIs

### `useScroll` — the offset grammar

```jsx
const { scrollYProgress } = useScroll({
  target: ref,                          // MANDATORY for element-relative
  offset: ["start end", "end start"],   // [startEdge_target, startEdge_viewport]
});
```

**Offset edge meanings:**
- `"start end"` = element's TOP edge meets viewport's BOTTOM edge (element just entering)
- `"start start"` = element's TOP edge meets viewport's TOP edge (element just pinned)
- `"end end"` = element's BOTTOM edge meets viewport's BOTTOM edge
- `"end start"` = element's BOTTOM edge meets viewport's TOP edge (element just left)

Common patterns:
- **Element fully entering and exiting:** `["start end", "end start"]`
- **Element pinned then released:** `["start start", "end end"]`
- **Triggered when 25% into view:** `["start 0.75", "end start"]`

### `useTransform` — array vs function

```jsx
// Array form — interpolate between values
const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

// Function form — derive any value
const filter = useTransform(blur, (b) => `blur(${b}px)`);
```

### `useSpring` — when it helps, when it hurts

**HELPS:** parallax, cursor-follow, sticky elements (smooths scroll jitter)
**HURTS:** progress bars (springs lag the actual scroll position — looks broken)

```jsx
const smooth = useSpring(scrollYProgress, { stiffness: 150, damping: 25 });
```

### Common bugs

1. **Missing `target: ref`** — animation tracks window scroll instead of element. Single biggest scroll bug.
2. **`useMotionValueEvent` for derived UI** — triggers React re-renders every scroll frame. Use `useTransform` instead. Only use `useMotionValueEvent` for canvas drawing or external side-effects.
3. **Animating layout properties** — never `width`, `height`, `top`, `left`, `margin`. Always `x`, `y`, `scale`, `rotate`, `opacity`.
4. **Hardcoded pixel scroll ranges** — `useTransform(scrollY, [0, 500], [...])` breaks at different content heights. Use `scrollYProgress` (0-1) with element-bounded `target`.
5. **Snap from narrow input range** — `useTransform(p, [0.49, 0.51], [0, 100])` = snap. Use wider ranges (0.3-0.7) for smooth.

---

## 8. PRE-SHIP SCROLL CHECKLIST (12 items)

Run this on every page with scroll-driven motion:

```
□ Every useScroll has a target ref (no window-relative unless explicitly intended)
□ Derived UI uses useTransform, NOT useMotionValueEvent
□ Pinned section parent height = pinned + scroll-distance
□ overflow:clip (NOT hidden) on all ancestors of sticky elements
□ 100svh on hero pins (NOT 100vh) — iOS Safari fix
□ Parallax INSIDE bounded overflow:hidden container — no void below
□ Parallax disabled on touch devices + reduced-motion
□ Animations only on transform + opacity (no width/height/top/left)
□ useScrollComponentLifecycle used on every scroll/RAF component
□ Tested at 1920×1080 + 375×812 — no layout collapse at either
□ Lighthouse mobile performance score ≥ 85 with motion enabled
□ prefers-reduced-motion: reduce → all parallax/scroll-driven motion disabled
```

If any fail, it ships broken.

---

## 9. PLAYWRIGHT TEST FOR THE VOID-BELOW BUG

Ship this in `review.md` as the canonical scroll-collapse detector:

```ts
// playwright test
import { test, expect } from "@playwright/test";

test("no void-below-pinned-section bug", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  const measurements = await page.evaluate(() => {
    const sections = Array.from(document.querySelectorAll("section"));
    return sections.map((s) => {
      const rect = s.getBoundingClientRect();
      const next = s.nextElementSibling?.getBoundingClientRect();
      return {
        id: s.id || s.className.slice(0, 30),
        height: rect.height,
        gapToNext: next ? next.top - rect.bottom : 0,
      };
    });
  });

  for (const m of measurements) {
    // No section should have a gap > 100px to its next sibling
    expect(m.gapToNext, `Void below ${m.id}`).toBeLessThan(100);
  }
});
```

---

## CROSS-REFERENCES

- `tokens.md` — palette, fonts, motion presets (springs, durations)
- `spacing.md` — section padding, container width, hero composition
- `anti-slop.md` — patterns that scream "AI-generated"
- `architecture.md` — RSC client/server boundaries, useMotionValue rationale
- `recipes/animations.md` — 41 CSS animation patterns
