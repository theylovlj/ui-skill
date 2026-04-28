# recipes/sticky-nav.md — Sticky shrinking nav (the morphing header)

**The cool morphing header that shrinks/sinks into the bg as you scroll.** Floats above the page initially, then morphs to a denser pill-style bar after scroll threshold. Used by Linear, Vercel, Stripe, Frame.io.

---

## When to use

✅ Long-form landing pages
✅ B2B SaaS marketing sites
✅ Editorial / agency portfolios
✅ Anything where nav needs to ALWAYS be reachable

## When NOT to use

❌ Single-viewport pages (no scroll = no morph point)
❌ Inside dashboards / app shells (use a static top bar there)

---

## The recipe

```tsx
"use client";
import { motion, useScroll, useTransform } from "motion/react";

export function StickyNav() {
  const { scrollY } = useScroll();

  // Morph between 0px scroll and 80px scroll
  const padding = useTransform(scrollY, [0, 80], ["1rem", "0.5rem"]);
  const maxWidth = useTransform(scrollY, [0, 80], ["100%", "min(56rem, 92%)"]);
  const top = useTransform(scrollY, [0, 80], ["0rem", "0.75rem"]);
  const radius = useTransform(scrollY, [0, 80], ["0rem", "9999px"]);
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 0.85]);
  const blur = useTransform(scrollY, [0, 80], [0, 16]);
  const shadowOpacity = useTransform(scrollY, [0, 80], [0, 0.08]);

  return (
    <motion.div
      style={{
        top,
        maxWidth,
        padding,
        borderRadius: radius,
      }}
      className="sticky z-50 mx-auto left-0 right-0 will-change-transform"
    >
      <motion.div
        style={{
          backgroundColor: useTransform(bgOpacity, (o) => `rgba(255, 255, 255, ${o})`),
          backdropFilter: useTransform(blur, (b) => `blur(${b}px)`),
          boxShadow: useTransform(shadowOpacity, (o) => `0 1px 0 rgba(0,0,0,${o * 0.3}), 0 8px 32px rgba(0,0,0,${o})`),
          borderRadius: radius,
        }}
        className="flex items-center justify-between px-5 h-12 border border-transparent"
      >
        <a href="/" className="flex items-center gap-2">
          <div className="size-6 rounded bg-stone-900" />
          <span className="font-semibold text-[15px]">Brand</span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-[14px]">
          <a href="#" className="hover:text-stone-900">Product</a>
          <a href="#" className="hover:text-stone-900">How it works</a>
          <a href="#" className="hover:text-stone-900">Pricing</a>
          <a href="#" className="hover:text-stone-900">Customers</a>
          <a href="#" className="hover:text-stone-900">Docs</a>
        </nav>

        <div className="flex items-center gap-2">
          <a href="#" className="text-[14px] hidden sm:inline-block">Log in</a>
          <a href="#" className="px-4 h-9 rounded-full bg-stone-900 text-white text-[13px] font-medium inline-flex items-center gap-1.5">
            Start free <span className="text-[10px]">→</span>
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}
```

---

## What's morphing

| At scroll = 0 | At scroll = 80px+ |
|---|---|
| Full-width (100%) | Capped to 56rem / ~896px |
| Square corners (`0rem`) | Pill (`9999px`) |
| Flush top (`0rem`) | Floats with 12px top gap |
| Transparent bg | 85% white + 16px backdrop-blur |
| No shadow | Soft drop shadow |
| 16px padding | 8px padding (denser) |

---

## What makes it work

1. **`useScroll` is window-relative** — that's correct here (no `target` ref needed). We're tracking total page scroll.
2. **`useTransform` for every property** — single render, GPU-accelerated. NOT `useState` + scroll listener.
3. **`will-change-transform`** on the outer wrapper — promotes to its own compositor layer.
4. **`backdrop-filter: blur(...)`** — the glassmorphism effect. Works on Safari + Chromium.
5. **The border morph** — invisible at scroll 0 (`border-transparent`), then becomes visible via the box-shadow as bg opacity fades in. Avoids layout shift.
6. **80px threshold** — most premium sites use 60-100px. <50px feels jumpy, >120px feels late.

---

## Variant — Liquid Glass (heavier blur, light bg)

Drop in as the inner motion.div:

```tsx
style={{
  backgroundColor: useTransform(bgOpacity, (o) => `rgba(255, 255, 255, ${o * 0.7})`),
  backdropFilter: useTransform(blur, (b) => `blur(${b * 1.5}px) saturate(180%)`),
  border: useTransform(bgOpacity, (o) => `1px solid rgba(255,255,255,${o * 0.4})`),
  boxShadow: useTransform(shadowOpacity, (o) => `inset 0 1px 0 rgba(255,255,255,${o * 0.6}), 0 8px 32px rgba(0,0,0,${o})`),
}}
```

That's the "Liquid Glass" spec — 1px inner highlight + heavier saturate. Use for premium / editorial brands.

---

## Variant — Dark site (inverted)

```tsx
backgroundColor: `rgba(15, 15, 15, ${bgOpacity})`,    // Near-black w/ alpha
border: `1px solid rgba(255,255,255,${bgOpacity * 0.06})`,
```

---

## Common AI failure modes

### ❌ Animating with `useState` + scroll listener
```tsx
// WRONG — re-renders entire component on every scroll tick
const [scrolled, setScrolled] = useState(false);
useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 80);
  window.addEventListener("scroll", onScroll);
  return () => window.removeEventListener("scroll", onScroll);
}, []);
```
**Fix:** `useScroll` + `useTransform`. Zero re-renders.

### ❌ Animating `padding` with `transition: all`
```tsx
// WRONG — fighting Framer Motion + missing easing curve
<div className={scrolled ? "p-2" : "p-4"} style={{ transition: "all 0.3s ease" }}>
```
**Fix:** Use Motion's `useTransform` returning rem values directly.

### ❌ Hard threshold cut (no smooth morph)
```tsx
// WRONG — jumps at 80px instead of smoothly morphing
const padding = scrollY > 80 ? "0.5rem" : "1rem";
```
**Fix:** `useTransform(scrollY, [0, 80], ["1rem", "0.5rem"])` — smooth interp.

### ❌ Forgetting `will-change`
**Fix:** `will-change: transform` on the morphing element OR `transform: translateZ(0)` to promote layer.

### ❌ Mobile not handled
**Fix:** Hide nav links on mobile (`hidden md:flex`), keep brand + CTA + hamburger always.

---

## Mobile addition

```tsx
{/* Mobile hamburger */}
<button className="md:hidden flex flex-col gap-1 p-2">
  <span className="block w-5 h-0.5 bg-stone-900" />
  <span className="block w-5 h-0.5 bg-stone-900" />
</button>
```

Pair with a slide-down mobile menu using `<AnimatePresence>` + `motion.div` from height 0 → auto.

---

## Cross-references

- `scroll.md` § Pattern 3 — scroll progress bar (often pairs with this nav)
- `tokens.md` § Liquid Glass — for the glassy variant
- `anti-slop.md` § COMPONENT — `useState` for continuous-input is banned
