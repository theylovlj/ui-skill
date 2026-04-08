# Color & Contrast

## Color Spaces: Use OKLCH

**Stop using HSL.** Use OKLCH (or LCH) instead. It's perceptually uniform, meaning equal steps in lightness *look* equal—unlike HSL where 50% lightness in yellow looks bright while 50% in blue looks dark.

```css
/* OKLCH: lightness (0-100%), chroma (0-0.4+), hue (0-360) */
--color-primary: oklch(60% 0.15 250);      /* Blue */
--color-primary-light: oklch(85% 0.08 250); /* Same hue, lighter */
--color-primary-dark: oklch(35% 0.12 250);  /* Same hue, darker */
```

**Key insight**: As you move toward white or black, reduce chroma (saturation). High chroma at extreme lightness looks garish. A light blue at 85% lightness needs ~0.08 chroma, not the 0.15 of your base color.

## Building Functional Palettes

### The Tinted Neutral Trap

**Pure gray is dead.** Add a subtle hint of your brand hue to all neutrals:

```css
/* Dead grays */
--gray-100: oklch(95% 0 0);     /* No personality */
--gray-900: oklch(15% 0 0);

/* Warm-tinted grays (add brand warmth) */
--gray-100: oklch(95% 0.01 60);  /* Hint of warmth */
--gray-900: oklch(15% 0.01 60);

/* Cool-tinted grays (tech, professional) */
--gray-100: oklch(95% 0.01 250); /* Hint of blue */
--gray-900: oklch(15% 0.01 250);
```

The chroma is tiny (0.01) but perceptible. It creates subconscious cohesion between your brand color and your UI.

### Palette Structure

A complete system needs:

| Role | Purpose | Example |
|------|---------|---------|
| **Primary** | Brand, CTAs, key actions | 1 color, 3-5 shades |
| **Neutral** | Text, backgrounds, borders | 9-11 shade scale |
| **Semantic** | Success, error, warning, info | 4 colors, 2-3 shades each |
| **Surface** | Cards, modals, overlays | 2-3 elevation levels |

**Skip secondary/tertiary unless you need them.** Most apps work fine with one accent color. Adding more creates decision fatigue and visual noise.

### The 60-30-10 Rule (Applied Correctly)

This rule is about **visual weight**, not pixel count:

- **60%**: Neutral backgrounds, white space, base surfaces
- **30%**: Secondary colors—text, borders, inactive states
- **10%**: Accent—CTAs, highlights, focus states

The common mistake: using the accent color everywhere because it's "the brand color." Accent colors work *because* they're rare. Overuse kills their power.

## Contrast & Accessibility

### WCAG Requirements

| Content Type | AA Minimum | AAA Target |
|--------------|------------|------------|
| Body text | 4.5:1 | 7:1 |
| Large text (18px+ or 14px bold) | 3:1 | 4.5:1 |
| UI components, icons | 3:1 | 4.5:1 |
| Non-essential decorations | None | None |

**The gotcha**: Placeholder text still needs 4.5:1. That light gray placeholder you see everywhere? Usually fails WCAG.

### Dangerous Color Combinations

These commonly fail contrast or cause readability issues:

- Light gray text on white (the #1 accessibility fail)
- **Gray text on any colored background**—gray looks washed out and dead on color. Use a darker shade of the background color, or transparency
- Red text on green background (or vice versa)—8% of men can't distinguish these
- Blue text on red background (vibrates visually)
- Yellow text on white (almost always fails)
- Thin light text on images (unpredictable contrast)

### Never Use Pure Gray or Pure Black

Pure gray (`oklch(50% 0 0)`) and pure black (`#000`) don't exist in nature—real shadows and surfaces always have a color cast. Even a chroma of 0.005-0.01 is enough to feel natural without being obviously tinted. (See tinted neutrals example above.)

### Testing

Don't trust your eyes. Use tools:

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- Browser DevTools → Rendering → Emulate vision deficiencies
- [Polypane](https://polypane.app/) for real-time testing

## Theming: Light & Dark Mode

### Dark Mode Is Not Inverted Light Mode

You can't just swap colors. Dark mode requires different design decisions:

| Light Mode | Dark Mode |
|------------|-----------|
| Shadows for depth | Lighter surfaces for depth (no shadows) |
| Dark text on light | Light text on dark (reduce font weight) |
| Vibrant accents | Desaturate accents slightly |
| White backgrounds | Never pure black—use dark gray (oklch 12-18%) |

```css
/* Dark mode depth via surface color, not shadow */
:root[data-theme="dark"] {
  --surface-1: oklch(15% 0.01 250);
  --surface-2: oklch(20% 0.01 250);  /* "Higher" = lighter */
  --surface-3: oklch(25% 0.01 250);

  /* Reduce text weight slightly */
  --body-weight: 350;  /* Instead of 400 */
}
```

### Token Hierarchy

Use two layers: primitive tokens (`--blue-500`) and semantic tokens (`--color-primary: var(--blue-500)`). For dark mode, only redefine the semantic layer—primitives stay the same.

## Alpha Is A Design Smell

Heavy use of transparency (rgba, hsla) usually means an incomplete palette. Alpha creates unpredictable contrast, performance overhead, and inconsistency. Define explicit overlay colors for each context instead. Exception: focus rings and interactive states where see-through is needed.

## What AI Gets Wrong on Color

- Purple/blue gradients on white backgrounds (the #1 AI tell in 2024-2025)
- Pure black (#000) backgrounds and pure white (#fff) — tint toward brand hue
- Gray text on colored backgrounds (always fails contrast and looks dead — use a tinted shade)
- Gradient text for emphasis (looks AI-generated, use weight or size contrast instead)
- Too many accent colors (accent works because it's rare — using 3 accents kills all of them)
- HSL instead of OKLCH (perceptually uneven — equal HSL steps don't look equal)
- Dark mode = inverted light mode colors (dark mode needs different design decisions)
- Semantic colors (success/error) used as decoration rather than meaning
- Forgetting placeholder text contrast must be 4.5:1 (most styled placeholders fail)
- Alpha transparency overused (heavy rgba usage usually means an incomplete palette)

---

## Mesh Gradients — The Premium Gradient Technique

Layered radial gradients fading to transparent. Creates organic "watercolor" blending popularized by Stripe. Looks premium because it implies depth without being heavy-handed.

```css
/* Mesh gradient — dark background version */
.mesh-hero {
  background:
    radial-gradient(ellipse at 20% 50%, oklch(0.7 0.15 280 / 0.7) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, oklch(0.75 0.18 320 / 0.6) 0%, transparent 55%),
    radial-gradient(ellipse at 60% 80%, oklch(0.65 0.12 200 / 0.5) 0%, transparent 50%),
    oklch(0.08 0.01 280);  /* Dark base behind the blobs */
}

/* Mesh gradient — light background version (Soft Gradient style) */
.mesh-light {
  background:
    radial-gradient(ellipse at 20% 30%, oklch(0.88 0.08 55 / 0.8) 0%, transparent 60%),
    radial-gradient(ellipse at 75% 70%, oklch(0.85 0.1 300 / 0.6) 0%, transparent 55%),
    oklch(0.97 0.01 80);
}
```

**Rules:** Max 3 color blobs (4+ looks chaotic). Each blob at different position (20%/80%/50%, not centered). Opacity 0.5–0.8. Always on dark base or light base — never floating without a ground.

---

## Dark SaaS Layered Depth System

The difference between premium dark sites and generic ones: premium uses a **4-layer depth system**. Generic uses a single flat color.

```css
:root {
  /* Layer 0 — page base */
  --bg-base: #0a0a0a;               /* Not pure black — gives room for deeper blacks */

  /* Layer 1 — card/surface */
  --bg-surface: #141414;

  /* Layer 2 — elevated, hover states */
  --bg-elevated: #1a1a1a;

  /* Layer 3 — borders */
  --border: rgba(255, 255, 255, 0.06);  /* Barely visible, structural only */
  --border-hover: rgba(255, 255, 255, 0.12);

  /* Text stack */
  --text-primary: #f2f2f2;           /* Off-white — not pure white */
  --text-secondary: rgba(255, 255, 255, 0.5);
  --text-tertiary: rgba(255, 255, 255, 0.35);

  /* Accent: ONE bright color */
  --accent: oklch(65% 0.2 265);     /* Electric blue/violet */
  --glow: oklch(65% 0.2 265 / 0.15); /* Accent at 15% for glows */
}

/* The glow card — the premium dark SaaS pattern */
.card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition: box-shadow 200ms ease, border-color 200ms ease;
}
.card:hover {
  border-color: var(--border-hover);
  box-shadow: 0 0 40px var(--glow);
}
```

**The Linear gradient beam (hero background accent):**
```css
/* Placed behind hero content as a radial gradient orb */
.gradient-beam {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(94, 78, 255, 0.35) 0%,
    transparent 70%
  );
  pointer-events: none;
}
```

---

## Aurora Gradient Animation

Animated multi-color gradients that shift slowly. Used by Linear, AI product pages. The technique: an oversized gradient (`400% 400%`) whose position animates.

```css
.aurora {
  background: linear-gradient(
    -45deg,
    oklch(65% 0.15 280),   /* violet */
    oklch(60% 0.18 220),   /* blue */
    oklch(70% 0.14 160),   /* teal */
    oklch(75% 0.16 300)    /* purple */
  );
  background-size: 400% 400%;
  animation: aurora 10s ease infinite;
}

@keyframes aurora {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

**Performance note:** `background-position` animation triggers Paint on some browsers. For better performance, animate `transform: translate()` on absolutely-positioned gradient divs instead — stays on the compositor thread.

**Subtle variant (behind content):** Use the aurora at `opacity: 0.3–0.5` with a dark bg beneath, not as the full background. The aurora should be felt, not seen.

---

## Hatched / Diagonal Background Patterns

SVG data URI backgrounds that add texture without images. Combine with gradient masks for a premium fade effect.

```css
/* Diagonal hatch — dark bg version */
.hatched-dark {
  background-color: #09090b;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpath d='M-1,1 l2,-2 M0,8 l8,-8 M7,9 l2,-2' stroke='%23ffffff' stroke-opacity='0.06' stroke-width='1'/%3E%3C/svg%3E");
}

/* Colored accent hatch (diagonal lines in brand color) */
.hatched-accent {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='h' patternUnits='userSpaceOnUse' width='10' height='10' patternTransform='rotate(45)'%3E%3Cline x1='0' y1='0' x2='0' y2='10' stroke='%236366f1' stroke-opacity='0.12' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23h)'/%3E%3C/svg%3E");
}

/* Premium: fade the pattern at edges with mask */
.hatched-fade {
  background-image: url("...hatch SVG...");
  mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%);
  -webkit-mask-image: radial-gradient(ellipse 80% 60% at 50% 0%, black 50%, transparent 100%);
}
```

**More patterns:** heropatterns.com for ready-made SVG patterns. Use at opacity 0.04–0.12 — structural, not decorative.

---

## Noise/Grain Texture — Adds Tactility

A subtle SVG noise layer over gradients prevents banding and adds an organic, premium feel. At 2–4% opacity it's invisible as "texture" but makes gradients look richer.

```css
/* Method 1: CSS SVG filter noise (no external asset needed) */
.noisy-surface {
  position: relative;
}

.noisy-surface::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-size: 200px 200px;
}

/* Method 2: Tailwind + inline style */
// style={{ backgroundImage: "url('/noise.png')", opacity: 0.04, mixBlendMode: 'overlay' }}
// Generate noise PNGs at: fffuel.co/nnnoise
```

**When to use:** Any gradient hero background, dark mode surfaces that feel flat, glassmorphism cards to add texture. Do NOT stack noise on noise — one layer per surface.

---

**Avoid**: Relying on color alone to convey information. Creating palettes without clear roles for each color. Using pure black (#000) for large areas. Skipping color blindness testing (8% of men affected).
