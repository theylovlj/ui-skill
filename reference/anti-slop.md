# Anti-AI-Slop Rules & Design Direction

## The Fingerprints of AI-Generated UI — NEVER Do These

### Typography
- NEVER use Inter, Roboto, Arial, Open Sans, Lato, Montserrat, or system defaults
- NEVER use Space Grotesk — it's the new AI font
- NEVER use monospace as shorthand for "technical"
- NEVER put large rounded-corner icons above every heading
- Instead: Instrument Sans, Plus Jakarta Sans, Outfit, Figtree, Urbanist, Fraunces, Bricolage Grotesque. Extreme weight contrast (200 vs 800). Size jumps of 3x+.

### Color
- NEVER purple gradients on white — the #1 AI tell
- NEVER the "AI dark mode" palette: cyan-on-dark, purple-to-blue, neon accents
- NEVER pure black (#000) or pure white (#fff) — always tint toward brand hue
- NEVER gray text on colored backgrounds — use a shade of the bg color
- NEVER gradient text for "impact"
- NEVER default to gradients anywhere — most gradients scream AI. Only use them when the specific design context calls for it (e.g. a creative/marketing site that already uses them). When in doubt, use solid colors.
- Instead: OKLCH color. Tint neutrals. 60% neutral / 30% secondary / 10% accent. Dark mode = oklch(12-18%).

### Layout
- NEVER identical card grids (same icon + heading + text repeated)
- NEVER nest cards inside cards
- NEVER the hero metric template (big number + small label + gradient)
- NEVER center everything — asymmetry feels designed
- NEVER wrap everything in cards — spacing creates grouping
- Instead: Varied spacing for rhythm. 4pt base. Break the grid intentionally. Container queries.

### Effects
- NEVER glassmorphism everywhere
- NEVER bounce/elastic easing — dated and tacky
- NEVER dark mode + glowing accents as a substitute for design
- NEVER generic rounded rectangles with drop shadows
- NEVER sparklines as decoration
- Instead: Ease-out-quart `cubic-bezier(0.25,1,0.5,1)`. Only animate transform + opacity. One orchestrated entrance > scattered micro-interactions.

### Content
- NEVER repeat information or restate headings in body text
- NEVER make every button primary — use hierarchy
- NEVER modals unless truly no alternative
- Instead: Progressive disclosure. Empty states that teach. All interactive states (hover, focus, active, disabled, loading).

## Design Direction Framework

Before building, commit to a tone. Pick one and execute with precision:

Brutally minimal · Maximalist chaos · Retro-futuristic · Organic/natural · Luxury/refined · Playful/toy-like · Editorial/magazine · Brutalist/raw · Art deco/geometric · Soft/pastel · Industrial/utilitarian

The key is intentionality, not intensity. Bold maximalism and refined minimalism both work.

## PeakBot DNA (when in a PeakBot project)

- Backgrounds: `#0a0a0f`, `#111118`, `#16161d`
- Cards: `bg-white/5`, `bg-white/[0.03]`
- Primary: violet `#8b5cf6` · Secondary: cyan `#06b6d4`
- Text: `#f5f5f5` / `#a1a1aa` / `#71717a`
- Borders: `border-white/10`
- Vibe: premium gaming, subtle glows, professional — not generic SaaS