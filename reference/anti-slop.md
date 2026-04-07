# Anti-AI-Slop Rules & Design Direction

## The Fingerprints of AI-Generated UI — NEVER Do These

### Typography
- NEVER use Inter, Roboto, Arial, Open Sans, Lato, Montserrat, or system defaults
- NEVER use Space Grotesk — it's the new AI font (2024-2025)
- NEVER use monospace as shorthand for "technical"
- NEVER put large rounded-corner icons above every heading
- NEVER use a second font when one family in multiple weights creates cleaner hierarchy
- Instead: Instrument Sans, Plus Jakarta Sans, Outfit, Figtree, Urbanist, Fraunces, Bricolage Grotesque. Extreme weight contrast (200 vs 800). Size jumps of 3x+.

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
- Instead: Varied spacing for rhythm. 4pt base. Break the grid intentionally. Container queries.

### Effects
- NEVER glassmorphism everywhere (acceptable: one intentional instance per design)
- NEVER bounce/elastic easing — dated and tacky, real objects don't bounce when they stop
- NEVER dark mode + glowing accents as a substitute for design thinking
- NEVER generic rounded rectangles with drop shadows on everything
- NEVER sparklines as decoration — they're data, not ornament
- NEVER the ambient purple blob gradient background
- Instead: ease-out-quart `cubic-bezier(0.25,1,0.5,1)`. Only animate transform + opacity. One orchestrated entrance > scattered micro-interactions.

### Content
- NEVER repeat information or restate headings in body text
- NEVER make every button primary — use hierarchy (one primary CTA per section max)
- NEVER modals unless truly no alternative
- NEVER generic empty states ("No items found")
- NEVER "Something went wrong" as an error message
- Instead: Progressive disclosure. Empty states that teach. All 8 interactive states. Specific error messages.

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
