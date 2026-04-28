# recipes/scroll-text-reveal.md — Word-by-word fade-in tied to scroll position

**The "manifesto paragraph that lights up word-by-word as you scroll past it" pattern.** OpenAI, Linear, Vercel use this for product philosophy moments. Different from `IntersectionObserver` one-shot reveals — this is continuous and reversible.

---

## When to use

✅ One signature paragraph per page (manifesto / value-prop / philosophy moment)
✅ Section big enough to give the reveal scroll distance (≥ 70vh tall)
✅ Text is ≤ 50 words (more = boring, eye reads ahead anyway)
✅ Desktop-first build (mobile gets static fallback — eye scans phone faster than scroll-reveal can paint)

## When NOT to use

❌ Headlines (use static + load animation instead)
❌ Body paragraphs in feature sections (too many = exhausting)
❌ Pricing / FAQ / CTA copy (people skim, don't scroll-read)
❌ Mobile primary content (touch users skim faster than scroll-reveal renders)

---

## The recipe

```tsx
"use client";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

interface Props {
  text: string;                    // "We believe every incident starts with a flutter — three signals nudging across thresholds."
  className?: string;
}

export function ScrollTextReveal({ text, className = "" }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    // Start when top of paragraph is 75% down viewport, end when it's 25% down
    offset: ["start 0.85", "start 0.25"],
  });

  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className={`t-h2 max-w-3xl leading-snug ${className}`}
      // Static fallback for reduced motion
      style={reducedMotion ? { opacity: 1 } : undefined}
    >
      {words.map((word, i) => {
        if (reducedMotion) {
          return <span key={i}>{word}{" "}</span>;
        }
        const start = i / words.length;
        const end = start + (1 / words.length) * 1.2;     // 20% overlap with next word
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return (
          <motion.span key={i} style={{ opacity }} className="inline">
            {word}{" "}
          </motion.span>
        );
      })}
    </p>
  );
}
```

---

## What makes this work

1. **`useTransform` per word**, NOT `useMotionValueEvent`. `useMotionValueEvent` would trigger React re-renders 60 times per scroll frame for each word — page locks up. `useTransform` stays on the GPU.
2. **`offset: ["start 0.85", "start 0.25"]`** — animation starts when paragraph top is 85% down viewport (just entering bottom of view), ends when it's 25% down (well into reading position). Tunable.
3. **`opacity: 0.15` floor** (not 0). Words at lowest opacity are still ghosted-in, so eye can scan ahead and the layout is pre-rendered. 0 → 1 makes the page feel jumpy.
4. **20% overlap** between consecutive word ranges (`(1 / words.length) * 1.2`). Without overlap, words snap-flicker on. With it, the reveal is liquid.
5. **Reduced-motion fallback** — static `opacity: 1` text. No re-render, no scroll dependency, accessible.

---

## Common AI failure modes

### ❌ Failure: `useMotionValueEvent` instead of `useTransform`
```tsx
// WRONG — 60fps re-renders, page locks up on long paragraphs
const [activeWord, setActiveWord] = useState(0);
useMotionValueEvent(scrollYProgress, "change", (p) => {
  setActiveWord(Math.floor(p * words.length));
});
```
**Fix:** `useTransform` per word. No state, no re-render.

### ❌ Failure: `opacity: 0` floor
```tsx
// WRONG — words pop in, layout jumps, accessibility nightmare
const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
```
**Fix:** Use `0.15` floor — words are pre-rendered ghosted-in.

### ❌ Failure: animating a per-word `transform` on top of opacity
```tsx
// WRONG — each word translates AND fades = motion overload + perf hit
const y = useTransform(scrollYProgress, [start, end], [20, 0]);
const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);
return <motion.span style={{ y, opacity }}>...</motion.span>;
```
**Fix:** Opacity-only. The reveal is the EFFECT — adding translation distracts.

### ❌ Failure: missing `offset` parameter
```tsx
// WRONG — uses default offset, animation runs at wrong time
const { scrollYProgress } = useScroll({ target: ref });
```
**Fix:** Specify `offset: ["start 0.85", "start 0.25"]` so reveal happens during reading position.

### ❌ Failure: word spacing collapses
```tsx
// WRONG — joined together
{words.map(word => <motion.span>{word}</motion.span>)}
```
**Fix:** Add `{" "}` after each word, or use `whitespace-pre-wrap` on parent.

---

## Tuning

- **Reveal range tightness:** `offset: ["start 0.9", "start 0.4"]` for slower/more deliberate; `["start 0.7", "start 0.3"]` for snappier.
- **Floor opacity:** 0.1 = barely visible (premium feel), 0.2 = clearly readable, 0.3 = barely a reveal at all.
- **Word range overlap:** `1.0` = no overlap (snappy), `1.5` = heavy overlap (liquid), `1.2` = balanced.
- **For a multi-line H1:** use this for ONE word per line maximum, not whole headline. Headlines should land instantly.

---

## Cross-references

- `scroll.md` § 2 Pattern 7 — canonical scroll text reveal
- `scroll.md` § 3 — `useScrollComponentLifecycle` for marquees / RAF
- `recipes/animations.md` § 2 — for one-shot fade-up entrances (`IntersectionObserver` style)
