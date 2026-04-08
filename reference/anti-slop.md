# Anti-AI-Slop Rules & Design Direction

## The Fingerprints of AI-Generated UI — NEVER Do These

### Typography
- NEVER use Inter, Roboto, Arial, Open Sans, Lato, Montserrat, or system defaults
- NEVER use Space Grotesk — it's the new AI font (2024-2025)
- NEVER use monospace as shorthand for "technical"
- NEVER put large rounded-corner icons above every heading
- NEVER use a second font when one family in multiple weights creates cleaner hierarchy
- Instead: **Body:** Satoshi, Geist Sans, DM Sans, Plus Jakarta Sans, General Sans, Switzer, Figtree. **Display:** Clash Display, Syne, Cabinet Grotesk, Bricolage Grotesque, Fraunces. **Variable:** Mona Sans (GitHub). Extreme weight contrast (200 vs 800). Size jumps of 3x+.
- **Space Grotesk exception:** Only acceptable for Neubrutalist heading layers and developer tool UIs. Still banned everywhere else.

### Color
- NEVER purple gradients on white — the #1 AI tell in 2024-2025
- NEVER the "AI dark mode" palette: cyan-on-dark, purple-to-blue, neon accents
- NEVER pure black (#000) or pure white (#fff) — always tint toward brand hue
- NEVER gray text on colored backgrounds — use a shade of the bg color instead
- NEVER gradient text for "impact" — gradient text is almost always AI slop
- NEVER default to gradients anywhere — solid colors look more intentional. Only use gradients when the design system explicitly calls for them
- Instead: OKLCH color. Tinted neutrals. 60% neutral / 30% secondary / 10% accent. Dark mode = oklch(12-18%).

### Layout
- NEVER identical card grids (same icon + heading + text × 3 — "AI card syndrome")
- NEVER nest cards inside cards
- NEVER the hero metric template (big number + small label + gradient bg)
- NEVER center everything — asymmetry feels designed
- NEVER wrap everything in cards — spacing creates grouping without borders
- NEVER the 3-column feature grid where every card is identical weight
- NEVER `min-h-screen` or `min-h-dvh` hero sections with sparse content — a hero with one headline and a button does NOT need a full viewport of height. Only use full-height heroes when the content fills the space (large visuals, split layouts, dense content). If the hero is just text + CTA, use natural height with generous but proportional padding (`pt-32 pb-20` or similar), NOT `min-h-screen`.
- Instead: Varied spacing for rhythm. 4pt base. Break the grid intentionally. Container queries.

### Effects
- NEVER glassmorphism everywhere (acceptable: one intentional instance per design)
- NEVER bounce/elastic easing — dated and tacky, real objects don't bounce when they stop
- NEVER dark mode + glowing accents as a substitute for design thinking
- NEVER generic rounded rectangles with drop shadows on everything
- NEVER sparklines as decoration — they're data, not ornament
- NEVER the ambient purple blob gradient background
- Instead: ease-out-quart `cubic-bezier(0.25,1,0.5,1)`. Only animate transform + opacity. One orchestrated entrance > scattered micro-interactions.

### Badges & Labels
- NEVER the "green dot + label in a rounded pill" badge — the single most overused AI marketing pattern (2024-2025). Seen on every AI product hero section. Instantly signals AI-generated.
- NEVER use a pulsing/animated green dot to signal "live" or "active" as a decoration — it's meaningful on status indicators (a user is online), not on static marketing copy
- Instead — four eyebrow alternatives in order of editorial quality:

```css
/* Type 2: Plain text eyebrow (most editorial, 2024 forward) */
.eyebrow-plain {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--accent);
}

/* Type 3: Left-rule (premium editorial feel) */
.eyebrow-ruled {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
}
.eyebrow-ruled::before {
  content: '';
  width: 24px;
  height: 1px;
  background: currentColor;
  flex-shrink: 0;
}

/* Type 4: Number label (feature sections, not hero) */
.eyebrow-number {
  font-family: monospace;
  font-size: 11px;
  color: var(--muted);
}
```

### Content
- NEVER repeat information or restate headings in body text
- NEVER make every button primary — use hierarchy (one primary CTA per section max)
- NEVER modals unless truly no alternative
- NEVER generic empty states ("No items found")
- NEVER "Something went wrong" as an error message
- NEVER "AI-powered" as the headline — sell the specific outcome, not the infrastructure
- NEVER stock photography for hero sections — use real product screenshots, 3D, or data visualization
- Instead: Progressive disclosure. Empty states that teach. All 8 interactive states. Specific error messages.

### The Generic Site Tells (the specific patterns that scream AI-generated)
These are the most recognizable template signals in 2025. Each one is common enough to immediately mark a site as AI-generated or template-based:

- **The "Claude Landing Page"** — warm cream background, serif italic accent word, centered layout, "Design Studio — Brooklyn, NY" energy. This is the #1 default AI landing page in 2025. If your output looks like a minimalist design agency site with a cream/warm palette, you failed. Pick a DIFFERENT aesthetic.
- **The empty hero** — `min-h-screen` with one headline centered in a sea of whitespace. Content should fill its space. If the hero has 3 elements, it needs 3-elements worth of height, not a full viewport.
- **The flat SaaS page** — white or light background with NO visual texture, no background image, no gradients, no grain, no depth. Just text floating on a blank canvas. Real SaaS landing pages ALWAYS have visual depth in the hero: gradient meshes, abstract background images, subtle patterns, or atmospheric photography. The skill bundles 26 premium backgrounds in `assets/backgrounds/` — USE THEM. Copy the WebP file into the project's public folder and set it as the hero background. There is ZERO excuse for a flat, textureless landing page.
- **The incomplete page** — sections that have a heading ("Built for speed. Priced for scale.") with NO content below them. Just a headline floating in white space. If a section exists, it MUST have full content: cards, stats, images, testimonials, comparisons, or other real UI. If you can't fill it, DELETE THE SECTION. An empty section is worse than no section.
- **The teal/cyan default** — teal (#0d9488), cyan (#06b6d4), or any oklch hue 170-200 as the primary accent color. This is what Claude picks EVERY TIME when building SaaS. It's instantly recognizable as AI-generated. Pick literally any other color.

- `box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1)` — Tailwind's default shadow, seen on every shadcn template
- 6-column feature grid where each cell has an emoji or generic icon above heading above text
- Hero background: purple or indigo `radial-gradient` blob at `50% 50%` with `rgba(99,102,241,0.2)`
- "Powered by AI", "AI-driven", "Next-gen" in the headline
- `border-radius: 24px` on cards + `border-radius: 4px` on inputs — inconsistent radius within the same page
- Glassmorphism over a solid gray background (requires interesting content behind glass to work)
- Poppins or Nunito at `font-weight: 600` — the default friendly-SaaS AI font stack
- 3 plans at `$9 / $29 / $99` with a `Most Popular` badge on the middle — unresearched default pricing UI
- Every heading bold, every subheading `text-muted`, every section with the same `py-24` padding

- **Cards that change size based on content** — Cards in a row should NEVER change height based on how much text is inside them. Use `items-stretch` on the grid, `flex flex-col` on each card, and `mt-auto` on the bottom element (button, attribution). This is the #1 layout bug in AI-generated sites. If one card has 2 lines and another has 5 lines, the buttons must still align.
- **Featured element with dead space beside it** — A "featured" testimonial or card that only spans 60-70% of the row, leaving a dead void next to it. Either make it full-width or add a supporting element (rating, stat, graphic) to fill the space. NEVER leave empty space beside a focal element.
- **Dropdowns that clip inside their parent** — Dropdowns and select menus MUST be allowed to overflow their parent container (they need to be visible!). Use `overflow-visible` on the card/parent, NOT `overflow-hidden`. The dropdown itself should use `position: absolute` + `z-50` to float above other content. This is the ONE exception to the "no overflow" rule — dropdowns are supposed to break out of their container.

---

## More AI Tells (from 2024-2025 research)

### Animation
- Same `fade-in-up` on every single element — real sites vary animation direction and timing
- Bouncy/elastic easing everywhere — real objects don't bounce when they stop
- Every element has the same entrance delay — real sites stagger intentionally with varied delays
- Animations that play on every scroll, not just first view — use `once: true`

### Shadows & Depth
- Tailwind's default `shadow-lg` on everything — real sites use varied shadow depths
- Pure black shadows (`rgba(0,0,0,0.1)`) — real shadows are tinted toward the background hue
- Same shadow on every card — featured cards should have deeper shadows than secondary ones

### Border Radius
- Same `rounded-2xl` on every element — mix radiuses intentionally (buttons: full, cards: 2xl, inputs: lg)
- Over-rounding small elements — a 32px button with 24px radius looks like a pill; use proportional radius

### Responsive
- Desktop looks great, mobile is broken — always test at 375px width
- Content overflows horizontally on mobile — add `overflow-x-hidden` on body or main
- Grid doesn't collapse — every `lg:grid-cols-3` needs a `grid-cols-1` default

### States
- No hover state on interactive elements — every button/link/card needs a visible hover change
- No focus-visible ring for keyboard users — add `focus-visible:ring-2 focus-visible:ring-offset-2`
- No loading state — buttons should show a spinner or "..." when actions are pending
- No empty state — "No items" should teach the user what to do, not just be blank

---

## Per-Component AI Tells

### Buttons
- Every button is the same size and weight (no hierarchy)
- Primary buttons have gradient fills when they don't need them
- Pill-shaped buttons everywhere (only appropriate for pill-shaped design systems)
- No loading state — action just... happens
- Icon + text with wrong spacing (too tight or too loose)
- Destructive actions not visually differentiated

### Forms
- Placeholder text used as a label (disappears on type)
- Validation fires on every keystroke (should fire on blur)
- Generic error: "Invalid input" instead of "Email must include @"
- No success state after valid input
- Missing helper text for non-obvious fields
- Required/optional inconsistently marked or not marked at all

### Cards
- Icon (usually a rounded square with a gradient) above heading above body text, repeated 3x in a grid
- All cards identical — same dimensions, same weight, same padding
- Cards inside cards
- Everything wrapped in a card when spacing would group it better
- Drop shadow on every card (shadows should be used sparingly)

### Navigation
- Active state barely visible or identical to hover
- No mobile navigation at all
- Nested nav more than 2 levels deep
- Missing keyboard navigation (arrow keys, Home/End for menus)
- No skip link for keyboard users

### Data Display
- Stat cards all identical: icon + big number + label × 4
- Sparklines used as decoration, not data
- Pie charts for data that should be a bar chart
- Tables with no empty state, no loading skeleton, no inline actions
- All numbers same font-variant (should use tabular-nums for data)

### Modals
- Modal for things that should be inline (forms, confirmations that could be undo)
- No focus trap — keyboard users can tab outside
- No scroll lock on body
- Backdrop click doesn't close
- No Escape key support

### Loading States
- Generic spinner for everything (skeleton screens feel faster for content)
- No loading state at all — content just appears
- "Loading..." text with no specificity
- Full page spinner when only part of the page is loading

---

## Design Direction Framework

Before building, commit to a tone. Pick one and execute with precision:

| Direction | Signals | Avoid |
|-----------|---------|-------|
| **Brutally minimal** | Single accent, massive whitespace, type-driven | Any decoration |
| **Maximalist chaos** | Dense, layered, expressive, rule-breaking | Blandness |
| **Retro-futuristic** | Scan lines, terminals, CRT glow, pixelated elements | Rounded everything |
| **Organic/natural** | Warm neutrals, hand-drawn touches, imperfect geometry | Cold tech palette |
| **Luxury/refined** | Restrained color, serif typography, generous spacing | Bright accents |
| **Playful/toy-like** | Bold primaries, rounded shapes, bouncy (sparingly) | Corporate sterility |
| **Editorial/magazine** | Asymmetric layouts, large type, image-driven | Uniform grids |
| **Brutalist/raw** | Exposed structure, stark contrast, intentional ugliness | Prettiness |
| **Art deco/geometric** | Symmetry, gold/black, ornamental geometry | Organic shapes |
| **Soft/pastel** | Muted tints, gentle shadows, approachable | High contrast |
| **Industrial/utilitarian** | Function-first, monochrome, no ornament | Decoration |

The key is intentionality, not intensity. Bold maximalism and refined minimalism both work. Muddled middle ground does not.

---

## PeakBot DNA (when in a PeakBot project)

- Backgrounds: `#0a0a0f`, `#111118`, `#16161d`
- Cards: `bg-white/5`, `bg-white/[0.03]`
- Primary: violet `#8b5cf6` · Secondary: cyan `#06b6d4`
- Text: `#f5f5f5` / `#a1a1aa` / `#71717a`
- Borders: `border-white/10`
- Vibe: premium gaming, subtle glows, professional — not generic SaaS
