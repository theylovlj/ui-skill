# tokens.md — Design System

**Read this every build. Never invent your own tokens.**

Three palette presets. Three font stacks. Three motion presets. That's it.

---

## COLOR PALETTES — pick ONE per build

You commit to one palette upfront. The accent color is used **only on**: primary CTAs, status dots, key-emphasis spans in headlines, focus rings. Everything else is neutral.

### Palette 1 — WARM (default for editorial / agency / wellness)

```css
--bg:             oklch(98% 0.005 90);    /* warm off-white #faf8f3 */
--bg-elevated:    oklch(100% 0 0);         /* pure white only for cards on top */
--text:           oklch(20% 0.01 90);      /* deep brown-black #1d1a14 */
--text-muted:     oklch(45% 0.01 90);      /* muted gray-brown */
--border:         oklch(90% 0.005 90);     /* subtle warm gray */
--accent:         oklch(63% 0.18 38);      /* warm coral/terracotta */
--accent-fg:      oklch(98% 0.005 90);     /* off-white text on accent */
```

Use for: Claura-style AI agencies, wellness brands, editorial sites, premium agencies.

### Palette 2 — COOL (default for SaaS / fintech / tech)

```css
--bg:             oklch(98% 0.002 250);   /* cool off-white #f7f8fa */
--bg-elevated:    oklch(100% 0 0);
--text:           oklch(22% 0.01 250);     /* deep navy-black */
--text-muted:     oklch(48% 0.015 250);    /* slate-gray */
--border:         oklch(91% 0.005 250);
--accent:         oklch(58% 0.18 260);     /* indigo / violet */
--accent-fg:      oklch(98% 0.002 250);
```

Use for: SaaS landing pages, fintech, dashboards, B2B products. (This is the Kruz/Linear vibe.)

### Palette 3 — DARK (default for premium / cinematic / EV / luxury)

```css
--bg:             oklch(12% 0.005 260);    /* near-black #0a0c12 */
--bg-elevated:    oklch(18% 0.01 260);     /* slightly lifted card */
--text:           oklch(96% 0.005 90);     /* warm off-white text */
--text-muted:     oklch(65% 0.01 90);
--border:         oklch(25% 0.01 260);
--accent:         oklch(70% 0.16 60);      /* warm amber/orange */
--accent-fg:      oklch(12% 0.005 260);    /* dark text on amber */
```

Use for: Electric.-style luxury, cinematic landing pages, premium fintech (revenue dashboards), EV brands.

**Forbidden colors** (default AI tells):
- ❌ `#0d9488` / teal-500 (default Tailwind+Claude combo)
- ❌ Linear gradients with `from-purple-500 to-blue-500` (the AI-slop gradient)
- ❌ `#ffffff` for backgrounds (always off-white)
- ❌ `#000000` for text (always slightly tinted black)

---

## FONT STACKS — pick ONE per build

Always pair a **bold grotesque sans** (body + UI + bulk of headlines) with **ONE italic-serif accent** (used for one word per headline, max).

### Stack A — INTER + INSTRUMENT (default)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet">
```

```css
--font-sans:   'Inter Tight', system-ui, sans-serif;
--font-serif:  'Instrument Serif', Georgia, serif;
```

The default. Used everywhere from Vercel to Linear-adjacent products.

### Stack B — GEIST + EDITORIAL (for tech-forward / dev tools)

```css
--font-sans:   'Geist', system-ui, sans-serif;
--font-serif:  'PP Editorial New', 'Instrument Serif', Georgia, serif;
```

Use for developer tools, AI products, technical SaaS.

### Stack C — UNCUT SANS + REPLY (for editorial / agency)

```css
--font-sans:   'Uncut Sans', 'Inter Tight', system-ui, sans-serif;
--font-serif:  'Reply', 'Instrument Serif', serif;
```

Use for agencies, portfolios, fashion-adjacent brands.

**Forbidden font choices:**
- ❌ Inter (without Tight) — overused, default Vercel template
- ❌ Roboto, Arial, Helvetica
- ❌ Space Grotesk — the AI-defaults-here tell
- ❌ Multiple serifs in one design
- ❌ All-italic headlines (italic ONE WORD only)

---

## TYPE SCALE

```css
--text-xs:    0.75rem;    /* 12px — meta labels, badges */
--text-sm:    0.875rem;   /* 14px — body small */
--text-base:  1rem;       /* 16px — body */
--text-lg:    1.125rem;   /* 18px — large body / lead */
--text-xl:    1.5rem;     /* 24px — H4 */
--text-2xl:   2rem;       /* 32px — H3 */
--text-3xl:   2.75rem;    /* 44px — H2 */
--text-4xl:   3.75rem;    /* 60px — H1 default */
--text-5xl:   5rem;       /* 80px — hero default */
--text-6xl:   6.5rem;     /* 104px — mega hero */
--text-7xl:   8rem;       /* 128px — display only */
```

**Hero headlines should use `--text-4xl` to `--text-6xl`.** Below `text-4xl` and your hero feels timid. Above `text-6xl` and it stops being readable.

**Letter spacing for huge type:**
```css
.headline { letter-spacing: -0.02em; }   /* tight, signals confidence */
.display  { letter-spacing: -0.04em; }   /* extra tight for display */
```

---

## SPACING SCALE

Use the standard Tailwind scale. Never invent gaps like `gap-[13px]`.

```
0.5 → 2px     2 → 8px      6 → 24px     16 → 64px
1   → 4px     3 → 12px     8 → 32px     20 → 80px
1.5 → 6px     4 → 16px     12 → 48px    24 → 96px
                                         32 → 128px
```

**Section vertical padding:** `py-24` mobile, `py-32` or `py-40` desktop. Premium = breathing room.

**Container max widths:**
- `max-w-3xl` (768px) — hero copy, body sections
- `max-w-5xl` (1024px) — feature grids
- `max-w-7xl` (1280px) — dashboards, full-width content

---

## MOTION PRESETS

Always import from this set. Never write `cubic-bezier()` manually for primary motion.

### Spring presets (Framer Motion)

```ts
// Snappy — for buttons, hover, small UI
export const SPRING_SNAPPY = { type: "spring", stiffness: 400, damping: 28, mass: 0.8 };

// Smooth — for layout morphs, sheet open/close
export const SPRING_SMOOTH = { type: "spring", stiffness: 320, damping: 30, mass: 1 };

// Bouncy — for success states, playful interactions only
export const SPRING_BOUNCY = { type: "spring", stiffness: 220, damping: 14, mass: 1 };

// Page entrance — for hero / on-mount stagger
export const ENTRANCE = { duration: 0.6, ease: [0.16, 1, 0.3, 1] }; // ease-out-quint
```

### Stagger pattern

```tsx
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const child = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: ENTRANCE },
};

<motion.div variants={container} initial="hidden" animate="visible">
  <motion.h1 variants={child}>...</motion.h1>
  <motion.p variants={child}>...</motion.p>
  <motion.div variants={child}>...</motion.div>
</motion.div>
```

### Layout / shared element

For ANY UI that morphs between states (button → input, card → expanded card, tab → tab):

```tsx
import { motion, AnimatePresence } from "framer-motion";

<motion.div layout transition={SPRING_SMOOTH}>
  <AnimatePresence mode="popLayout">
    {/* swap content via key, never mount/unmount sibling components */}
  </AnimatePresence>
</motion.div>
```

For tabs / segmented controls with sliding indicator:

```tsx
<motion.div layoutId="active-tab-pill" />  // single instance, tweens between segments
```

### Forbidden motion

- ❌ `transition: all 200ms ease-in-out` — generic, fights with Framer Motion
- ❌ `cubic-bezier(0.68, -0.55, 0.265, 1.55)` — bouncy ease (cheap)
- ❌ `animate-pulse` for loading states (use skeleton instead)
- ❌ `transform: scale(1.05)` on hover with no spring — janky
- ❌ Animations longer than 500ms for micro-interactions

---

## BORDER RADIUS

```css
--radius-sm:  0.375rem;   /* 6px — input fields, small chips */
--radius-md:  0.75rem;    /* 12px — cards default */
--radius-lg:  1rem;       /* 16px — large cards */
--radius-xl:  1.5rem;     /* 24px — hero cards, page frames */
--radius-2xl: 2rem;       /* 32px — outer page-frame container */
--radius-full: 9999px;    /* pills — nav, CTAs, badges */
```

**Pill-everything default for nav/CTAs/badges.** When in doubt, `rounded-full`.

---

## SHADOWS

```css
--shadow-sm:   0 1px 2px 0 rgb(0 0 0 / 0.04);
--shadow-md:   0 4px 16px -4px rgb(0 0 0 / 0.08);
--shadow-lg:   0 24px 48px -12px rgb(0 0 0 / 0.12);
--shadow-xl:   0 40px 80px -20px rgb(0 0 0 / 0.15);
--shadow-glow: 0 0 80px -20px var(--accent);  /* color-matched glow under product mockups */
```

Color-matched shadows beat neutral gray. Under product mockups, use `--shadow-glow` not `--shadow-xl`.

---

## QUICK SUMMARY

| Decision | Default |
|---|---|
| Background | Off-white (Palette 1, 2) or near-black (3) — NEVER `#fff` |
| Text | Slightly tinted black, never `#000` |
| Accent | ONE color, used only on CTAs / status / emphasis |
| Sans font | Inter Tight (or Geist for tech-forward) |
| Serif font | Instrument Serif (one italic word per headline) |
| Hero size | `text-5xl md:text-6xl` |
| Letter spacing | `tracking-tight` for headlines |
| Section padding | `py-32 md:py-40` |
| Card radius | `rounded-2xl` (cards) / `rounded-full` (pills) |
| Motion | Spring presets, `layout`/`layoutId`, never cubic-bezier |
| Stagger | 80ms between children, 100ms entrance delay |
