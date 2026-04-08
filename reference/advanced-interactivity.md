# Advanced Interactivity

Real interactive websites feel alive. This file covers the techniques that separate static-looking AI output from genuinely crafted interactive experiences.

---

## Scroll-Driven Animations

### CSS Scroll-Driven (no JS needed, modern browsers)

```css
/* Fade in as element enters viewport */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

.reveal {
  animation: fade-up linear both;
  animation-timeline: view();
  animation-range: entry 0% entry 30%;
}
```

### Framer Motion (React) — Scroll Triggers

```jsx
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

function RevealOnScroll({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

// Staggered children — each child reveals with increasing delay
function StaggeredList({ items }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref}>
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 1, 0.5, 1] }}
        >
          {item.content}
        </motion.div>
      ))}
    </div>
  );
}
```

### Scroll Progress (value mapped to any CSS property)

```jsx
import { useScroll, useTransform, motion } from 'framer-motion';

function ParallaxHero() {
  const { scrollY } = useScroll();
  // As user scrolls 0→400px, image moves up 0→120px (parallax)
  const y = useTransform(scrollY, [0, 400], [0, 120]);

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.img
        src="/hero.jpg"
        style={{ y }}
        className="absolute inset-0 h-[120%] w-full object-cover"
      />
      <div className="relative z-10 ...">
        {/* Content over image */}
      </div>
    </div>
  );
}

// Progress bar showing reading progress
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-accent origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
```

---

## Smooth Scrolling (Lenis)

Native scroll feels mechanical. Lenis adds momentum and smoothness.

```bash
npm install lenis
```

```jsx
// app/layout.tsx or _app.tsx
import Lenis from 'lenis';
import { useEffect } from 'react';

export function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);
}
```

**When to use:** Editorial sites, portfolios, marketing pages, any site where the scroll experience IS part of the design. Not for dashboards or data-heavy UIs.

---

## Page Transitions

### Next.js with Framer Motion

```jsx
// components/PageTransition.tsx
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

const variants = {
  // Option A: Fade
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
  // Option B: Slide up
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 1, 0.5, 1] } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  },
};

export function PageTransition({ children, style = 'fade' }) {
  const pathname = usePathname();
  const variant = variants[style];

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} {...variant}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

**Transition style by aesthetic:**
- Minimal: `fade` — instant and clean
- Editorial: `slideUp` — content arriving
- Maximalist: Custom clip-path wipe
- Dark Tech: `fade` with slight scale (`scale: 0.98 → 1`)

### View Transitions API (Native Browser, 2025)

**Support:** Chrome 111+, Edge 111+, Safari 18.2+, Firefox 131+ (flag). ~88% global coverage. Use feature detection.

The browser captures before/after snapshots and crossfades them on the compositor. Zero JS animation overhead.

```js
// Wrap any DOM mutation in startViewTransition()
async function navigateTo(url) {
  if (!document.startViewTransition) {
    window.location.href = url;
    return;
  }

  await document.startViewTransition(async () => {
    const response = await fetch(url);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    document.querySelector('main').replaceWith(doc.querySelector('main'));
    document.title = doc.title;
    history.pushState({}, '', url);
  }).finished;
}

// Intercept same-origin links
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href]');
  if (!link) return;
  const url = new URL(link.href);
  if (url.origin !== location.origin) return;
  e.preventDefault();
  navigateTo(link.href);
});
```

```css
/* Override the default crossfade */
::view-transition-old(root) {
  animation: vt-exit 200ms cubic-bezier(0.55, 0, 1, 0.45) both;
}
::view-transition-new(root) {
  animation: vt-enter 350ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
@keyframes vt-exit  { to   { opacity: 0; transform: translateY(-16px); } }
@keyframes vt-enter { from { opacity: 0; transform: translateY(24px); } }

@media (prefers-reduced-motion: reduce) {
  ::view-transition-old(root),
  ::view-transition-new(root) { animation: none; }
}
```

**Shared element transition (card → detail):**
```css
/* Card list page: each card gets a unique name */
/* Set via JS: card.style.viewTransitionName = `card-${id}` */

/* Detail page: hero element uses the same name */
.detail-hero {
  view-transition-name: card-selected; /* set dynamically to match clicked card */
}

/* The browser morphs the card thumbnail to the detail hero automatically */
::view-transition-group(card-selected) {
  animation-duration: 500ms;
  animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
}
```

**Iris/clip-path wipe transition (Overlay technique):**
```js
async function irisNavigate(url, originX = '50%', originY = '50%') {
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed; inset: 0; z-index: 9999;
    background: #0a0a0f;
    clip-path: circle(0% at ${originX} ${originY});
    pointer-events: none;
  `;
  document.body.appendChild(overlay);

  if (!document.startViewTransition) {
    await overlay.animate([
      { clipPath: `circle(0% at ${originX} ${originY})` },
      { clipPath: `circle(150% at ${originX} ${originY})` },
    ], { duration: 350, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }).finished;
    window.location.href = url;
    return;
  }

  await document.startViewTransition(async () => {
    await overlay.animate([
      { clipPath: `circle(0% at ${originX} ${originY})` },
      { clipPath: `circle(150% at ${originX} ${originY})` },
    ], { duration: 350, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', fill: 'forwards' }).finished;

    const response = await fetch(url);
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    document.querySelector('main').replaceWith(doc.querySelector('main'));
    history.pushState({}, '', url);

    await overlay.animate([
      { clipPath: `circle(150% at ${originX} ${originY})` },
      { clipPath: `circle(0% at ${originX} ${originY})` },
    ], { duration: 350, easing: 'cubic-bezier(0.55, 0, 1, 0.45)', fill: 'forwards' }).finished;
    overlay.remove();
  }).finished;
}
```

---

## Text Animations

### Staggered Word/Character Reveal

```jsx
function AnimatedHeadline({ text }) {
  const words = text.split(' ');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <h1 ref={ref} className="flex flex-wrap gap-x-3">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: '100%' }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.06,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="overflow-hidden"
          style={{ display: 'inline-block' }}
        >
          {word}
        </motion.span>
      ))}
    </h1>
  );
}
```

### Number Counter (for stat cards)

```jsx
import { useMotionValue, useSpring, useInView, useEffect } from 'framer-motion';

function AnimatedNumber({ value, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { stiffness: 100, damping: 30 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value]);

  useEffect(() => spring.on('change', v => setDisplay(Math.round(v))), [spring]);

  return (
    <span ref={ref} className="tabular-nums">
      {display.toLocaleString()}{suffix}
    </span>
  );
}

// Usage
<AnimatedNumber value={48295} suffix="" /> // counts up to 48,295
```

### Text Scramble Effect (retro/tech)

```jsx
function ScrambleText({ text, trigger }) {
  const [display, setDisplay] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  useEffect(() => {
    if (!trigger) return;
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text.split('').map((char, i) =>
          i < iteration ? char :
          chars[Math.floor(Math.random() * chars.length)]
        ).join('')
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 0.5;
    }, 30);
    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span className="font-mono">{display}</span>;
}
```

---

## Hover Interactions

### Magnetic Button Effect

```jsx
function MagneticButton({ children, strength = 40 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / strength * 10);
    y.set((e.clientY - centerY) / strength * 10);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.button>
  );
}
```

**When to use:** On a single primary CTA (hero button). Not on every button — destroys the effect.

### Card Tilt on Hover (3D)

```jsx
function TiltCard({ children }) {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-y * 12);  // max 12deg tilt
    rotateY.set(x * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}
```

**When to use:** Portfolio work showcases, product feature cards (one per section max). Overused = AI tell.

---

## Cursor Effects

### Custom Cursor

```jsx
function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 500, damping: 40 });
  const springY = useSpring(cursorY, { stiffness: 500, damping: 40 });

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX - 8);
      cursorY.set(e.clientY - 8);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-[9999] h-4 w-4 rounded-full bg-accent mix-blend-difference"
      style={{ left: springX, top: springY }}
    />
  );
}
```

**When to use:** Portfolios, creative agencies, maximalist sites. Not for dashboards, e-commerce, or functional apps.

**Always:** Keep `pointer-events: none` — cursor must never block clicks.

---

## Infinite Marquee / Ticker

```jsx
function Marquee({ children, speed = 30 }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex gap-8"
        animate={{ x: '-50%' }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
      >
        {/* Duplicate content for seamless loop */}
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Usage: logo strips, testimonials, feature lists
<Marquee>
  {logos.map(logo => <img key={logo.id} src={logo.src} className="h-8 opacity-60" />)}
</Marquee>
```

---

## Spring Physics (when to use)

Spring physics (bouncy, overshoot) is appropriate ONLY for:
- **Playful / Friendly** style sites
- **Maximalist** with intentional excess
- Drawer/sheet open animations (slight spring feels natural)
- Toggle switches

Spring physics is WRONG for:
- Minimal, Luxury, Editorial, Dark Tech, Corporate
- Page transitions
- Utility interactions (save, delete, form submit)

```jsx
// Correct spring use — drawer opening
const springConfig = { type: 'spring', stiffness: 300, damping: 30 };

// Correct ease-out use — everything else
const easeOut = { duration: 0.4, ease: [0.25, 1, 0.5, 1] };
```

---

## Entrance Animation Orchestration

Never animate every element independently. Orchestrate them as a system.

```jsx
// The hero sequence: logo → headline → subtext → CTA → social proof
// Each waits for the previous to complete (or nearly)

const heroVariants = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } }
  }
};

<motion.div variants={heroVariants.container} initial="hidden" animate="show">
  <motion.p variants={heroVariants.item} className="eyebrow">...</motion.p>
  <motion.h1 variants={heroVariants.item}>...</motion.h1>
  <motion.p variants={heroVariants.item}>...</motion.p>
  <motion.div variants={heroVariants.item} className="cta-group">...</motion.div>
</motion.div>
```

**Rule:** Stagger delay between siblings: 80-120ms. Total entrance sequence: under 1 second.

---

## Two-Tone / Mixed-Weight Headlines

The single most effective typographic technique to make headlines feel crafted rather than generated. Some words are full-white/black, others are muted — creating internal rhythm without relying on color.

```jsx
// Two-tone color approach (muted words drop to ~30-40% visual weight)
<h1 className="text-6xl font-bold leading-tight">
  Build products{" "}
  <span className="text-zinc-500">your users</span>
  {" "}will love
</h1>

// Mixed-weight approach (light weight + muted color for supporting words)
<h2 className="font-display text-5xl leading-[1.1]">
  <span className="font-light text-zinc-500">The future of</span>
  <strong className="block font-black text-zinc-50">developer tools</strong>
  <span className="font-light text-zinc-500">is here</span>
</h2>
```

```css
/* The muted words should be exactly 30-40% visual weight vs the emphasized words.
   Contrast ratio between muted and full: ~2:1 — noticeable but not jarring */

/* Dark mode */
.headline-full { color: oklch(96% 0.005 270); }
.headline-muted { color: oklch(48% 0.01 270); }

/* Light mode */
.headline-full { color: oklch(12% 0.01 270); }
.headline-muted { color: oklch(55% 0.01 270); }
```

**Fonts that handle this best:** Satoshi, Mona Sans, Cabinet Grotesk, Inter — all have excellent weight differentiation at large sizes.

**What makes it NOT look AI-generated:** The muted words aren't random — they're always the function words or context-setters. The power words are full-white. This is a copy AND design decision made together.

---

## Spline 3D Integration

Spline lets you embed interactive 3D scenes with zero Three.js setup. Best for: hero backgrounds, product showcases, abstract tech metaphors.

```bash
npm install @splinetool/react-spline
```

```jsx
import Spline from '@splinetool/react-spline';

// Basic embed
function SplineHero() {
  return (
    <div className="relative h-screen w-full">
      <Spline
        scene="https://prod.spline.design/[YOUR_SCENE_ID]/scene.splinecode"
        className="absolute inset-0"
      />
      {/* Text sits above */}
      <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-16">
        <h1>Your headline</h1>
      </div>
    </div>
  );
}

// With gradient vignette to blend scene into dark background
function SplineWithVignette() {
  return (
    <div className="relative h-screen bg-[#09090b] overflow-hidden">
      <Spline scene="..." className="absolute inset-0" />
      {/* Vignette — blends 3D into bg seamlessly */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, #09090b 80%)'
        }}
      />
      <div className="relative z-10 ...">
        {/* content */}
      </div>
    </div>
  );
}
```

**Performance:** Spline scenes are 500KB–5MB. Always:
1. Add `loading="lazy"` on non-hero scenes
2. Show a static image fallback while the scene loads
3. Disable on mobile if performance is poor (`useMediaQuery('(pointer: fine)')`)

**The grayscale 3D technique:** Desaturate your Spline object to 0 (grayscale). Set Ambient Light to 15% (prevents pure-black shadows). The background color or gradient then becomes the "color" of the scene — the 3D reads as depth while the overall palette stays controlled.

---

## Easing Vocabulary — The Professional Standard

This is the single biggest differentiator between premium and cheap motion. Cheap sites use the same curve for every animation. Professional sites have an easing vocabulary — 2-3 curves used consistently across the whole site.

### The Three Curves You Need

```css
/* 1. ENTRY — Expo out. Fast start, extremely soft landing. Used by Apple, Linear, Vercel. */
--ease-out: cubic-bezier(0.22, 1, 0.36, 1);

/* 2. EXIT — Ease in. Gentle start, accelerates away. */
--ease-in: cubic-bezier(0.55, 0, 1, 0.45);

/* 3. INTERACTIVE — Spring physics in code, or this for CSS. */
/* Use Motion/GSAP spring for interactive elements, not CSS */
```

**The rule:** Entering elements use ease-out. Exiting elements use ease-in. Interactive/gesture elements use spring physics. Never use `ease-in-out` for anything — it's symmetric, which means the animation lies (it says "I'm slowing down as I enter" which is wrong).

### Duration Guidelines (Nielsen Norman Group)
- **100–300ms:** UI state changes (hover, focus, toggle) — feels instant
- **300–500ms:** Content reveals, entrance animations — feels intentional
- **Over 500ms:** Only for theatrical, full-screen moments — never for UI
- **Never over 800ms** on any UI element — users find it annoying

### Duration by animation type:
```
hover state:        150ms ease-out
focus ring:         100ms ease-out
button active:      80ms ease-out
modal open:         300ms ease-out
modal close:        200ms ease-in  (exits faster than entries)
page transition:    400ms ease-out (max — 500ms crosses into slow)
scroll reveal:      500–600ms ease-out (scroll = theatrical)
```

---

## GSAP — For Complex, Professional Animation

**When to use GSAP instead of Motion:**
- Vanilla JS / non-React projects
- Complex timelines with precise orchestration
- SVG animation (morphing, drawing)
- Integration with Three.js / WebGL
- Scroll-driven sequences that involve many elements
- When you need ScrollTrigger (pinned sections, scrubbed animations)

**When to use Motion (Framer Motion):**
- React projects with simple-to-moderate animation
- Layout animations (Motion's layout engine is best-in-class)
- Gesture-driven interactions
- AnimatePresence mount/unmount

```bash
npm install gsap
```

### GSAP ScrollTrigger — Pinned Horizontal Scroll

The most-used Awwwards technique: content scrolls horizontally while the user scrolls vertically.

```js
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const panels = gsap.utils.toArray('.panel');

gsap.to(panels, {
  xPercent: -100 * (panels.length - 1),
  ease: 'none',
  scrollTrigger: {
    trigger: '.container',
    pin: true,
    scrub: 1,        // 1 = animation lags 1 second behind scroll (adds weight/inertia)
    end: () => '+=' + document.querySelector('.container').offsetWidth,
  }
});
```

### GSAP SplitText Line Reveal — The Awwwards Standard

The single most-used text animation on award-winning sites. Lines slide up from behind a masked boundary. Feels editorial, never AI-generated.

```js
import { SplitText } from 'gsap/SplitText';
gsap.registerPlugin(SplitText, ScrollTrigger);

function revealHeadline(el) {
  const split = new SplitText(el, { type: 'lines' });

  // Wrap each line in overflow:hidden to create the mask
  split.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.style.overflow = 'hidden';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
  });

  gsap.from(split.lines, {
    y: '110%',
    duration: 0.9,
    stagger: 0.08,
    ease: 'power4.out',   // power4.out ≈ cubic-bezier(0.22,1,0.36,1)
    scrollTrigger: {
      trigger: el,
      start: 'top 80%',
    }
  });
}
```

### ScrollTrigger.batch() — Efficient Stagger (not one trigger per element)

DO NOT create a new `ScrollTrigger` per element — that's 100 scroll listeners. `batch()` is one listener for all of them, groups elements entering the viewport simultaneously, and staggers them as a unit.

```js
// Set initial hidden state
gsap.set('.reveal-item', { opacity: 0, y: 48 });

ScrollTrigger.batch('.reveal-item', {
  start: 'top 88%',
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.08,       // 80ms between each item in the batch
      ease: 'power3.out',
      overwrite: true,
    });
  },
  onLeaveBack: (elements) => {
    gsap.to(elements, {
      opacity: 0,
      y: 48,
      duration: 0.3,
      stagger: 0.04,
      ease: 'power2.in',
      overwrite: true,
    });
  },
});
```

### GSAP + Lenis Sync (canonical pattern)

```js
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.08,          // 0.07–0.10 = premium "heavy" feel
  smoothWheel: true,
  anchors: true,
});

// Sync Lenis to GSAP's ticker — critical for ScrollTrigger accuracy
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Also update ScrollTrigger on Lenis scroll
lenis.on('scroll', ScrollTrigger.update);
```

---

## Clip-Path Animations

Hardware-accelerated, resolution-independent, and creates reveals that feel physical rather than digital.

### Wipe Reveal (curtain)
```css
/* Left to right — like a curtain lifting */
@keyframes wipe-in {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}

.reveal {
  animation: wipe-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
}
```

### Circular Expand (from click point)
```jsx
function CircleReveal({ x, y, active }) {
  return (
    <motion.div
      initial={{ clipPath: `circle(0% at ${x}px ${y}px)` }}
      animate={active
        ? { clipPath: `circle(150% at ${x}px ${y}px)` }
        : { clipPath: `circle(0% at ${x}px ${y}px)` }
      }
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 bg-accent"
    />
  );
}
```

### Overlay Page Transition (clip-path wipe)
```jsx
// An overlay slides in → covers screen → new page appears → overlay exits
const overlayVariants = {
  enter: {
    clipPath: ['inset(0 100% 0 0)', 'inset(0 0% 0 0)', 'inset(0 0 0 100%)'],
    transition: { duration: 0.7, times: [0, 0.45, 1], ease: [0.22, 1, 0.36, 1] }
  }
};
```

**Rule:** Clip-path transitions feel physical. Use them for page transitions, image reveals, and content section reveals. They always look more crafted than a simple fade.

---

## Variable Font Animation

Variable fonts allow smooth animation between font weights, widths, and custom axes. Use sparingly — on hero display text only.

```css
/* Hover weight shift — dramatic typographic effect */
.headline {
  font-family: 'Bricolage Grotesque', sans-serif;
  font-variation-settings: 'wght' 300;
  transition: font-variation-settings 400ms cubic-bezier(0.22, 1, 0.36, 1);
}
.headline:hover {
  font-variation-settings: 'wght' 800;
}

/* Breathing loop — use VERY sparingly, only for brand moments */
@keyframes font-breathe {
  0%, 100% { font-variation-settings: 'wght' 200; }
  50%       { font-variation-settings: 'wght' 800; }
}
```

**When NOT to use:** On body copy, on lists, on anything the user reads — the animation distracts from comprehension. Hero headlines only.

---

## Motion Hierarchy — What to Animate

Most amateur sites animate everything. Premium sites animate 15–25% of visible elements. The hierarchy:

1. **Functional (required):** State changes, feedback, error/success. These communicate information. Always include.
2. **Orienting (earned):** Page transitions, entrance sequences. Help the user understand spatial relationships. Include when they serve navigation.
3. **Expressive (rare):** Brand moments, delight, hero sequences. Include only after 1 and 2 are perfect.

**The Awwwards rule:** If you removed all the animation and the page still made sense and was usable — that animation was expressive. If removing it would confuse the user — it was functional or orienting. You need both categories. Most sites overinvest in expressive and underinvest in functional.

---

## Premium vs. Cheap Motion — The Reference Table

| Premium | Cheap |
|---|---|
| Custom cubic-bezier per animation type | Default `ease-in-out` everywhere |
| Asymmetric easing (ease-out to enter, ease-in to exit) | Same curve for enter and exit |
| Duration 150–400ms for UI, 500ms max for reveals | Everything 600ms+ |
| Motion on 15–25% of elements | Every element animated |
| Stagger 50–120ms (implies group membership) | Stagger so large elements feel unrelated |
| Spring physics for gesture/interactive only | Spring/bounce on everything |
| Entering: fast start, soft land. Exiting: gentle start, fast away | No directional logic |
| Animations triggered by user action | Autoplay loops forever |
| Respects `prefers-reduced-motion` | Accessibility ignored |
| 3D when the concept demands it | Three.js as decoration |
| Clip-path or morphing transitions | Generic opacity crossfades |
| Text: masked line reveal | Text: typewriter effect |

---

## What AI Gets Wrong on Interactivity

- **Every element has an entrance animation** — staggered fade-in on every card, every section, every paragraph. When everything animates, nothing is special.
- **Wrong easing** — `ease: "easeInOut"` for everything, or no easing specified. Real motion uses `ease-out` (starts fast, slows to rest) for almost everything.
- **Spring physics everywhere** — bouncy nav items, bouncy modals, bouncy buttons. Spring is for the Playful style only.
- **Animations that block interaction** — user can't click a button because it's still animating in.
- **Missing `will-change` optimization** — animating layout properties (`width`, `height`, `top`, `left`) causes jank. Animate `transform` and `opacity` only.
- **No `prefers-reduced-motion` respect** — some users get sick from animations.
- **Scroll animations on mobile** — scroll-trigger animations often break on mobile. Test them.
- **Custom cursor on mobile** — cursor effects only work on desktop. Must be hidden on touch devices.

```css
/* Always wrap motion in this */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

```jsx
// In React: respect the preference
import { useReducedMotion } from 'framer-motion';

function AnimatedComponent() {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    />
  );
}

---

## Premium Card Techniques

### Gradient Border Card (::before technique)
The definitive Linear/Vercel card. A `::before` pseudo-element carries the gradient; the card's own background uses `background-clip: padding-box` so the two don't interfere. Result: a border that looks lit from the top-left — glass catching light.

```css
.gradient-border-card {
  background: rgba(255, 255, 255, 0.04);
  background-clip: padding-box;           /* prevents bg bleeding under border */
  border: 1px solid transparent;         /* transparent — gradient fills it */
  border-radius: 12px;
  padding: 24px;
  position: relative;
}

.gradient-border-card::before {
  content: '';
  position: absolute;
  inset: -1px;                            /* extends 1px past the card edge */
  border-radius: inherit;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,        /* top-left: bright */
    rgba(255, 255, 255, 0.04) 40%,
    transparent 100%                      /* bottom-right: fades out */
  );
  z-index: -1;                            /* sits behind the card */
}
```

### Shimmer Border Animation
A rotating conic-gradient that travels around the card border. Used by Vercel on CTA buttons, Linear on featured cards.

```css
@property --angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}

@keyframes border-spin {
  to { --angle: 360deg; }
}

.shimmer-card {
  border: 1px solid transparent;
  border-radius: 12px;
  background:
    linear-gradient(#0a0a0a, #0a0a0a) padding-box,
    conic-gradient(from var(--angle), transparent 75%, rgba(255,255,255,0.5) 90%, transparent 100%) border-box;
  animation: border-spin 4s linear infinite;
}

/* Shimmer text (button CTA) */
@keyframes shimmer-text {
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
}
.shimmer-cta {
  background: linear-gradient(90deg, #888 0%, #fff 40%, #888 60%, #fff 80%, #888 100%);
  background-size: 200%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer-text 3s linear infinite;
}
```

### Cursor Spotlight on Card
A `radial-gradient` at cursor coordinates creates a subtle glow that follows the mouse over a card. Pioneered by Linear and Vercel.

```js
// Vanilla JS — attaches to all .spotlight-card elements
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.removeProperty('--x');
    card.style.removeProperty('--y');
  });
});
```

```css
.spotlight-card {
  position: relative;
  overflow: hidden;
}
.spotlight-card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  background: radial-gradient(
    400px circle at var(--x, 50%) var(--y, 50%),
    rgba(255, 255, 255, 0.06) 0%,
    transparent 70%
  );
  transition: opacity 300ms ease;
}
.spotlight-card:hover::after {
  opacity: 1;
}
```

```jsx
// React version using useRef
import { useRef } from 'react';

function SpotlightCard({ children }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        cardRef.current.style.removeProperty('--x');
        cardRef.current.style.removeProperty('--y');
      }}
      className="spotlight-card"
    >
      {children}
    </div>
  );
}
```

---

## Glassmorphism 2.0 — The Complete Spec

Generic glassmorphism (semi-transparent card on gradient) looks like 2021. Premium glass requires all 4 properties AND the critical inner-shadow detail.

**Required formula:**
```css
.glass-card {
  /* 1. Semi-transparent surface */
  background: rgba(255, 255, 255, 0.06);

  /* 2. Blur + saturation boost (the saturation is almost always missing) */
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);

  /* 3. Thin bright border (simulates light refraction at glass edge) */
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;

  /* 4. THE CRITICAL DETAIL: inner shadow on top edge */
  /* This single line separates amateur from professional glassmorphism */
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.15),  /* top inner edge highlight */
    0 8px 32px rgba(0, 0, 0, 0.2);             /* outer depth */
}

/* REQUIRED: glass needs a colorful/interesting background to work.
   Glass on a solid gray background is invisible and pointless. */
```

**3D tilt on hover (Raycast/Aceternity style):**
```js
function addTiltEffect(el) {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;  // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    el.style.transform = [
      `perspective(1000px)`,
      `rotateY(${x * 12}deg)`,
      `rotateX(${-y * 12}deg)`,
      `translateZ(8px)`
    ].join(' ');
  });

  el.addEventListener('mouseleave', () => {
    el.style.transform = '';
    el.style.transition = 'transform 400ms cubic-bezier(0.25, 1, 0.5, 1)';
    setTimeout(() => { el.style.transition = ''; }, 400);
  });
}
```

**Performance rules:**
- `backdrop-filter` is GPU-expensive. Keep blur ≤ 16px.
- Use on at most 3–4 elements simultaneously.
- `will-change: transform` on animated glass cards.
- Test on integrated graphics — the budget device test is a 2019 MacBook Air.

---

## Hero Image — Bottom Fade

Product screenshots shown "floating" at the bottom of the hero, fading out at the bottom edge. Standard on Vercel, Resend, Linear. Creates depth without a literal background.

```css
.hero-screenshot {
  width: 100%;
  max-width: 900px;
  border-radius: 12px 12px 0 0;
  border: 1px solid rgba(255, 255, 255, 0.08);

  /* The fade — image fades out at bottom */
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 60%, transparent 100%);

  /* Optional: slight perspective tilt */
  transform: perspective(2000px) rotateX(6deg);
  transform-origin: top center;
}

/* Container to clip the overflow */
.hero-screenshot-wrap {
  overflow: hidden;
  margin-top: 48px;
}
```

```jsx
// React version
<div className="relative mt-12 overflow-hidden">
  <img
    src="/product-screenshot.png"
    alt="Product"
    className="w-full rounded-t-xl border border-white/[0.08]"
    style={{
      maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
    }}
  />
</div>
```
```


---

## Three.js / R3F for Marketing Sites

`npm install three` or `npm install @react-three/fiber @react-three/drei`

**Key rules:** Always cap pixel ratio at 2. Always provide a static fallback. Always pause with IntersectionObserver when off-screen.

### Particle Background (Vanilla Three.js)

```js
function initParticles(container) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.z = 3;

  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // ALWAYS cap at 2
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const COUNT = 5000;
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT * 3; i++) positions[i] = (Math.random() - 0.5) * 8;
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.02,
    color: 0xffffff,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending, // particles glow where they overlap — the premium look
    depthWrite: false,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  const mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
  });

  let rafId;
  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = Date.now() * 0.0001;
    particles.rotation.y = t * 0.05 + mouse.x * 0.3;
    particles.rotation.x = t * 0.02 + mouse.y * 0.2;
    renderer.render(scene, camera);
  }

  // CRITICAL: pause when off-screen — without this, GPU runs at full cost always
  const io = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) animate();
    else cancelAnimationFrame(rafId);
  }, { threshold: 0.1 });
  io.observe(container);

  new ResizeObserver(() => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }).observe(container);

  return () => { cancelAnimationFrame(rafId); io.disconnect(); renderer.dispose(); };
}
```

### Chrome/Metallic 3D Text (R3F)

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D, Center, Environment } from '@react-three/drei';
import { useRef } from 'react';

function ChromeText({ text }) {
  const ref = useRef();
  useFrame((state) => {
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.08;
  });
  return (
    <Center>
      <Text3D ref={ref}
        font="/fonts/cabinet-grotesk-bold.typeface.json"
        size={1.2} height={0.18} curveSegments={12}
        bevelEnabled bevelThickness={0.02} bevelSize={0.01} bevelSegments={4}
      >
        {text}
        <meshStandardMaterial metalness={1} roughness={0.05} envMapIntensity={2} color="#ffffff" />
      </Text3D>
    </Center>
  );
}

export function Hero3D() {
  return (
    <div style={{ width: '100%', height: '50vh' }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
        <Environment preset="city" background={false} />
        <ambientLight intensity={0.1} />
        <ChromeText text="YOUR BRAND" />
      </Canvas>
    </div>
  );
}
```

### Scroll-Driven 3D Model Rotation (R3F)

```jsx
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, ScrollControls, useScroll, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

function RotatingModel({ url }) {
  const { scene } = useGLTF(url);
  const ref = useRef();
  const scroll = useScroll(); // 0 at top, 1 at bottom

  useFrame(() => {
    const target = scroll.offset * Math.PI * 2; // full rotation over scroll range
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, target, 0.05);
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
}

export function ProductShowcase() {
  return (
    <div style={{ height: '400vh' }}>
      <Canvas style={{ position: 'sticky', top: 0, height: '100vh' }} dpr={[1, 2]}>
        <ScrollControls pages={4} damping={0.1}>
          <RotatingModel url="/models/product.glb" />
        </ScrollControls>
        <Environment preset="studio" />
        <ContactShadows position={[0, -1.8, 0]} scale={5} blur={2} opacity={0.4} />
      </Canvas>
    </div>
  );
}

useGLTF.preload('/models/product.glb');
```

---

## Performance Reference Table

| Technique | Thread | Layout cost | Notes |
|---|---|---|---|
| CSS `scroll()` / `view()` timeline | Compositor | None | Fastest possible — zero JS |
| GSAP ScrollTrigger (transform/opacity) | Compositor | None | Fast |
| GSAP ScrollTrigger (other properties) | Main | High | Avoid — causes layout recalc |
| View Transitions API | Compositor | Snapshot cost | One-time per transition |
| Lenis smooth scroll | Main | None | Lerp calc only, no layout |
| Three.js particles (transform) | GPU | Compositor | Cap dpr at 2, pause off-screen |
| clip-path animation | Compositor | Paint only | No layout recalc |
| Magnetic button (transform) | Compositor | None | Fast |
| Custom cursor (transform via style.left/top) | Main | Layout per frame | **Use transform: translate() instead** |
| Custom cursor (transform: translate) | Compositor | None | Always use this, not left/top |
| `backdrop-filter: blur()` | GPU | Paint | Max 3–4 simultaneous elements |
| `font-variation-settings` animation | Main | Layout | Only at display sizes (64px+), never body |

**The one rule that covers 80% of performance issues:** If you animate anything other than `transform` or `opacity`, you're causing layout recalculation on every frame. Stop.

---

## Animation Anti-Patterns

1. **Every section has an entrance animation** — effect stops being special after the 3rd reveal. Maximum: hero + 2 key sections.
2. **Horizontal scroll on mobile** — `ScrollTrigger.matchMedia` to kill it. Unusable on touch.
3. **Custom cursor on mobile** — listeners still fire on touch; gate with `@media (hover: hover)` and `window.matchMedia('(hover: none)').matches`.
4. **Lenis on dashboards** — breaks table keyboard scrolling, custom scrollable panels, focus management.
5. **`scrub` without `will-change`** — add `will-change: transform` to scrubbed elements.
6. **Counter animations without `tabular-nums`** — digits change width, causing layout shift every frame.
7. **View Transitions without feature detection** — `if (!document.startViewTransition)` must always come first.
8. **Three.js canvas without IntersectionObserver pause** — GPU runs at full cost even when scrolled past.
9. **Magnetic buttons everywhere** — one primary CTA max per page. On every button = usability failure.
10. **`bounce` / `elastic` easing** — real objects don't bounce when they stop. Always `ease-out` for enters, `ease-in` for exits.
