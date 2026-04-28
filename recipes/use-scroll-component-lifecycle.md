# recipes/use-scroll-component-lifecycle.md — Universal scroll/RAF lifecycle hook

**Every scroll-driven, parallax, animation-frame, or marquee component in this codebase MUST use this hook.** It's the 4-guard scaffold that Aceternity UI ships ZERO of (their components are hostile by default) — we ship them all.

The 4 guards:
1. **`prefers-reduced-motion`** — reactive to user toggling system setting
2. **IntersectionObserver** — pause animation when scrolled offscreen (battery + perf)
3. **`visibilitychange`** — pause animation when tab is hidden
4. **No animation if `shouldAnimate === false`** — ship a static fallback

---

## The hook

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
  /** IntersectionObserver threshold (default 0.01) */
  threshold?: number;
}

export function useScrollComponentLifecycle(opts: Options = {}) {
  const {
    pauseOffscreen = true,
    pauseHidden = true,
    respectReducedMotion = true,
    threshold = 0.01,
  } = opts;

  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isTabActive, setIsTabActive] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  // prefers-reduced-motion (reactive)
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
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [pauseOffscreen, threshold]);

  // visibilitychange — pause when tab hidden
  useEffect(() => {
    if (!pauseHidden) return;
    const handle = () => setIsTabActive(!document.hidden);
    document.addEventListener("visibilitychange", handle);
    return () => document.removeEventListener("visibilitychange", handle);
  }, [pauseHidden]);

  return {
    ref,
    /** True only when the component should be animating */
    shouldAnimate: isVisible && isTabActive && !reducedMotion,
    isVisible,
    isTabActive,
    reducedMotion,
  };
}
```

---

## Usage

### Wrapping a parallax component
```tsx
const { ref, shouldAnimate } = useScrollComponentLifecycle();
return (
  <div ref={ref}>
    {shouldAnimate ? <ParallaxBackground /> : <StaticBackground />}
  </div>
);
```

### Wrapping a marquee
```tsx
const { ref, shouldAnimate } = useScrollComponentLifecycle();
return (
  <div ref={ref} className={shouldAnimate ? "animate-marquee" : ""}>
    {/* logos */}
  </div>
);
```

### Wrapping a `requestAnimationFrame` loop
```tsx
const { ref, shouldAnimate } = useScrollComponentLifecycle();
useEffect(() => {
  if (!shouldAnimate) return;
  let frame: number;
  const tick = () => {
    // do animation work
    frame = requestAnimationFrame(tick);
  };
  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}, [shouldAnimate]);
return <div ref={ref}>{/* ... */}</div>;
```

---

## Why each guard matters

- **Without `prefers-reduced-motion`** → fails WCAG 2.3.3 + accessibility lawsuits + nausea for vestibular-sensitive users
- **Without `IntersectionObserver` pause** → battery drain + needless GPU work on offscreen elements
- **Without `visibilitychange` pause** → animation runs in background tabs (Chrome may throttle, Firefox may not)
- **Without ALL FOUR** → "moves smoothly when visible, kills the laptop battery when not"

---

## Anti-patterns this prevents

- ❌ Animation runs during page-load before user has scrolled to the section
- ❌ Marquee runs at 100% CPU when tab is hidden in another window
- ❌ Parallax ignores user's OS-level reduced-motion preference
- ❌ Animation continues on a section that's been scrolled past

---

## Cross-references

- `scroll.md` § 3 — the canonical version of this hook
- `recipes/parallax-hero.md` — uses this hook
- `recipes/scroll-text-reveal.md` — uses this hook
- `recipes/animations.md` § Marquee — uses this hook
