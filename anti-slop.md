# anti-slop.md — The patterns to NEVER use

**Read this every build. These are the patterns that make UI look AI-generated.**

Each pattern below is a default that Claude (and other LLMs) gravitate toward when given a generic prompt. If you find yourself doing any of them — STOP and use the correction listed.

---

## MOBILE / VIEWPORT ANTI-PATTERNS

### ❌ `h-screen` for full-height hero sections
**Why it's slop:** Catastrophic iOS Safari bug. When the address bar collapses/expands, the layout JUMPS several hundred pixels mid-scroll. Looks broken.
**Fix:** Use `min-h-[100dvh]` (dynamic viewport height) instead. Always.

### ❌ Asymmetric layouts that don't collapse on mobile
**Why it's slop:** `md:col-span-2` patterns that stay broken at <768px. Forces horizontal scroll.
**Fix:** Every asymmetric layout MUST have explicit mobile reset to single-column (`grid-cols-1 px-4 py-8`).

### ❌ Backdrop-blur on scrolling content
See `architecture.md` § Performance for the rationale. Rule: backdrop-blur ONLY on fixed/sticky elements.

### ❌ Z-index spam (`z-50`, `z-[9999]` everywhere)
See `tokens.md` § Z-INDEX DISCIPLINE for the standard stack.

---

## COLOR ANTI-PATTERNS

### ❌ Teal `#14b8a6` as primary accent
**Why it's slop:** Default Tailwind palette + Claude's training bias = teal lands first. It immediately signals "AI made this."
**Fix:** Use one of the 4 palette presets in `tokens.md`. Warm coral, indigo-violet, amber, or burnt sienna.

### ❌ `bg-gradient-to-br from-purple-500 to-blue-500`
**Why it's slop:** The single most-recognized AI-generated gradient. Used by every cookie-cutter landing page.
**Fix:** No multi-color gradients. If you need depth, use a soft single-hue radial: `radial-gradient(ellipse at top, oklch(95% 0.05 60), transparent)`. Or skip gradient entirely — bundled backgrounds in `assets/backgrounds/` are better.

### ❌ Pure `#ffffff` background
**Why it's slop:** Pure white is harsh and budget. Premium designs use off-white.
**Fix:** `oklch(98% 0.005 90)` (warm) or `oklch(98% 0.002 250)` (cool).

### ❌ Pure `#000000` text
**Why it's slop:** Same reason — too clinical.
**Fix:** Slightly tinted: `oklch(20% 0.01 90)` for warm, `oklch(22% 0.01 250)` for cool.

### ❌ More than 3 colors total in the design
**Fix:** ONE accent + neutral text + neutral background. That's it. Photography and gradients introduce other colors *in images*, not as flat fills.

---

## TYPOGRAPHY ANTI-PATTERNS

### ❌ Inter (without Tight) as headline font
**Why it's slop:** Default Vercel template font. Used by every "next.js + tailwind" tutorial.
**Fix:** Inter Tight, Geist, or Uncut Sans for headlines. Inter (regular) is fine for body if needed.

### ❌ Space Grotesk
**Why it's slop:** Specifically called out in research as "the AI defaults here" font.
**Fix:** See above.

### ❌ Headline + subhead in same font weight
**Why it's slop:** Flat hierarchy = AI didn't think about typographic contrast.
**Fix:** Headline `font-bold` (700) or `font-extrabold` (800). Subtext `font-normal` (400). Big jump.

### ❌ ALL HEADLINES ARE ITALIC
**Why it's slop:** The italic-serif move only works if used on ONE word per headline. All-italic = decorative.
**Fix:** `<h1>Build something <em>beautiful</em>.</h1>` — only the emphasis word italic.

### ❌ Headline with icons next to it
**Why it's slop:** AI defaults to "let me add an icon to make it pop." Premium typography stands alone.
**Fix:** No icon (and definitely no emoji) in or beside H1. Save icons for nav, buttons, feature cards.

### ❌ Emojis in product UI
**Why it's slop:** Renders inconsistently across OS. Reads as AI-generated content. Instantly unprofessional.
**Fix:** NEVER use emojis in code/markup/text/alt-text/headings/buttons/labels. Use Phosphor or Radix icons instead.

### ❌ `text-3xl` hero (or smaller)
**Why it's slop:** Timid. Premium heroes are `text-5xl` to `text-6xl`.
**Fix:** Always `text-5xl md:text-6xl` for primary hero. `text-4xl md:text-5xl` for section H2s.

---

## LAYOUT ANTI-PATTERNS

### ❌ Three-column feature grid with identical card sizes
**Why it's slop:** The single most generic SaaS landing page pattern. AI defaults here every time.
**Fix:** Bento grid (`features-bento.md`) with mixed sizes. Or a single asymmetric split (text left, illustration right).

### ❌ "Hero → Features → Pricing → CTA → Footer" in that exact order
**Why it's slop:** It's the literal Vercel Geist template structure.
**Fix:** Vary the rhythm. Some premium sites: Hero → Trust logos → Story → Demo → Pricing → FAQ → Footer. Or Hero → "How it works" → Features → Testimonials → Pricing → Footer. Mix it up.

### ❌ Centered everything (text-center on every section)
**Why it's slop:** Symmetric centering with no asymmetric tension reads as "I didn't think about composition."
**Fix:** Center the hero. After that, ALTERNATE between left-aligned and split-layout sections.

### ❌ Empty sections with only a heading and subtitle
**Why it's slop:** AI generated the structure but ran out of content. Maximum dead-space crime.
**Fix:** Every section must have meaningful content density. If you don't have content for a section, REMOVE the section. Don't ship a hollow shell.

### ❌ Footer with 5 columns of mostly-empty link lists
**Why it's slop:** Default footer with placeholder columns ("Product / Company / Resources / Legal / Social") and 1-2 real links per column.
**Fix:** Either fewer, denser columns, OR an editorial-style footer with the giant ghost wordmark + sparse, real links.

---

## COMPONENT ANTI-PATTERNS

### ❌ Faking a dashboard / app screenshot inline with divs + gradients
**Why it's slop:** The single most-cited AI tell after `<Loader2 />`. Random rectangles labeled "Sales / Revenue / Activity" with chevron arrows and gradient backgrounds. Always looks worse than the actual product would.
**Fix:** Three valid options (NEVER invent UI from scratch):
1. Use a real screenshot of the product (`<img src="/dashboard.png" />`)
2. Use a device frame + clean content primitives from `recipes/mockups.md`
3. If product has no UI yet, use a single hero photo (no fake mockup at all)

### ❌ `<Loader2 className="animate-spin" />` for every loading state
**Why it's slop:** The most-cited AI tell. Recognized instantly by any designer.
**Fix:**
- Initial page/section load → skeleton screens (gray placeholder shapes matching content layout)
- Button submit → button text fades to ellipsis "..." or progress bar inside button
- Optimistic update → show the result immediately, mark with subtle pulse if not yet confirmed
- Long process → branded progress bar with stepped milestones

### ❌ "MOST POPULAR" pricing banner across the middle card
**Why it's slop:** Used by literally every Bootstrap pricing template since 2014.
**Fix:** Subtle indicator: small pill "Currently Popular" with a green dot, OR a slightly different background tint on the recommended card.

### ❌ Feature lists with checkmark icons (`<Check />` per row)
**Why it's slop:** The default shadcn/ui pricing template look.
**Fix:** Thin horizontal divider lines between features. Or no separators, just spacing.

### ❌ Modal accordions for FAQ (`<Accordion>` from shadcn defaults)
**Why it's slop:** Boxy borders, default chevron rotation, no design opinion.
**Fix:** Thin pill rows with hover hint, expanding inline. See `recipes/faq-pillrows.md`.

### ❌ Buttons with `rounded-md` and a chevron `<ArrowRight />`
**Why it's slop:** The most basic shadcn button pattern.
**Fix:** `rounded-full` pill buttons. Arrow optional, but if used, it should be a small circle-arrow that animates on hover (translates a few px right).

---

## MOTION ANTI-PATTERNS

### ❌ Animating `top`, `left`, `width`, `height` (Hardware-acceleration rule)
**Why it's slop:** Triggers layout reflow on every frame. ~5fps on mobile.
**Fix:** Animate ONLY `transform` and `opacity`. Use `transform: translate()` instead of `top:`, `transform: scale()` instead of `width:`. The compositor handles transform/opacity on the GPU; layout properties force the main thread to recalculate every frame.

### ❌ `transition: all 0.3s ease`
**Why it's slop:** Vague generic CSS transition fights with Framer Motion and produces janky results.
**Fix:** Use Framer Motion `layout` + spring preset. Or specify explicit properties: `transition-colors duration-200`.

### ❌ Hover: `hover:scale-105` with no easing
**Why it's slop:** Snaps instantly, feels cheap. Default Tailwind hover.
**Fix:** Wrap in `<motion.div whileHover={{ scale: 1.02 }} transition={SPRING_SNAPPY}>` — softer, springy.

### ❌ `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (back-out / overshoot)
**Why it's slop:** The "bouncy" easing that designers laughed at in 2017.
**Fix:** Springs (stiffness 200-400, damping 20-30) or `ease-out-quint` `[0.16, 1, 0.3, 1]`.

### ❌ `animate-bounce` or `animate-pulse` for important UI
**Why it's slop:** Tailwind defaults, both look cheap. Pulse for skeletons is OK; pulse for "look at this!" is not.
**Fix:** Use entrance animations (fade + 12px slide-up via stagger). Use shared-element morph for state changes.

### ❌ Mounting/unmounting cards with `{condition && <Card />}`
**Why it's slop:** Hard cuts feel broken. Premium = morph one container.
**Fix:** Wrap in `<AnimatePresence mode="popLayout">` and use `motion.div` with `layout`. Same surface, different content.

### ❌ `useState` for cursor-tracking, magnetic, parallax, continuous-input animations
See `architecture.md` § Continuous-input animations. Rule: use `useMotionValue` + `useTransform`, never `useState`.

---

## CONTENT ANTI-PATTERNS

### ❌ "Empower your team to..."  /  "Unlock the power of..."  /  "Revolutionize..."
**Why it's slop:** ChatGPT marketing voice. Every AI-generated landing page.
**Fix:** Use the actual product's verb. "Move money across borders." "Ship code faster." "Plan your week." Direct, specific, declarative.

### ❌ AI marketing filler words
Banned phrases: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Game-changer", "Delve", "Tapestry", "In the world of...", "Empower your team", "Unlock the power of".
**Fix:** Use the actual product's verb. "Move money." "Ship code faster." "Plan your week."

### ❌ Hero subtext that explains the headline
**Why it's slop:** "Move money. (Subtext: We help you move money internationally with low fees and great rates.)" Redundant.
**Fix:** Subtext adds NEW info — quantification, audience, distinction. "Move money. (Subtext: 0.5% fee, 60+ currencies, settled in 24h.)"

### ❌ Feature card titles like "Powerful Features", "Built for Speed", "Designed for You"
**Why it's slop:** Empty marketing words.
**Fix:** Concrete promises. "Live exchange rates", "Scheduled transfers", "Bank-level security" — or specific to the product.

### ❌ Pricing tiers named "Basic / Pro / Enterprise"
**Why it's slop:** Default. Lazy.
**Fix:** Name tiers based on the product or audience. "Solo / Team / Studio" for design tools. "Starter / Growth / Scale" for SaaS.

### ❌ Generic placeholder names ("John Doe", "Sarah Chan", "Jack Su")
**Why it's slop:** Reads as a Lorem-Ipsum dump. Instantly screams template.
**Fix:** Use creative, realistic, diverse names. "Maya Okafor", "Ezra Singh", "Lucia Marchetti", "Tomas Brandt".

### ❌ Generic avatars (SVG-egg, Lucide user icon, gradient initials)
**Why it's slop:** "JD" in a colored circle is the laziest possible avatar.
**Fix:** Use believable photo placeholders via `https://picsum.photos/seed/{unique-id}/100/100` or styled SVG portraits. NEVER initials.

### ❌ Fake suspiciously-round numbers (99.99%, 50%, 1234567)
**Why it's slop:** Round numbers = invented. Real data has texture.
**Fix:** Use organic data: `47.2%`, `+1 (312) 847-1928`, `$3,481`, `1,247 active users`.

### ❌ Startup slop names ("Acme", "Nexus", "SmartFlow", "Flowbit", "NovaCore")
**Why it's slop:** Pattern-matched template fillers.
**Fix:** Invent contextual brand names that sound real. Two-syllable favored. Avoid `-ly`, `-fy`, `-hub` suffixes.

### ❌ Unsplash placeholder URLs
**Why it's slop:** Often broken (slug changes, rate limits, 404s in a week).
**Fix:** Use `https://picsum.photos/seed/{unique-string}/{width}/{height}` (deterministic per-seed, reliable).

---

## DECORATION ANTI-PATTERNS

### ❌ Plain glassmorphism (`backdrop-filter: blur()` semi-transparent panels)
**Why it's slop:** Peak 2021 AI aesthetic. Reads as "trying too hard" without refinement.
**Fix:** If you need glass, use **Liquid Glass** = backdrop-blur + 1px inner border + inner shadow. See `tokens.md` Liquid Glass spec. Use ONLY for sticky nav and floating overlays — never for cards/sections.

### ❌ Random `<div>` blobs in pastel gradients as background "decoration"
**Why it's slop:** The "Apple keynote rip-off" gradient blob. Used by every fintech bootstrap site.
**Fix:** Use bundled WebP backgrounds in `assets/backgrounds/` (see `recipes/backgrounds-catalog.md`). Or one single contained accent — like a small gradient under a product mockup, not floating in negative space.

### ❌ Custom cursor (giant circle that scales on hover)
**Why it's slop:** Awwwards-2020 trend that aged poorly. Hurts accessibility.
**Fix:** Default cursor. If you must, do a subtle 4px dot follower with `mix-blend-mode: difference`.

### ❌ Page-load entrance with EVERY element fading in
**Why it's slop:** "I learned Framer Motion yesterday." Fatiguing.
**Fix:** Stagger only the hero (3-5 elements: pill, headline, subtext, CTA, mockup). Below the fold, use scroll-triggered subtle reveals — and sparingly.

---

## RED FLAGS — STOP IF YOU CATCH YOURSELF

```
"Let me just add a quick gradient..."           → STOP. No new gradients.
"I'll center this for balance..."               → STOP. Vary alignment.
"Loader2 is fine for now..."                    → STOP. Skeleton instead.
"This looks empty, let me add..."               → STOP. Empty is the design.
"text-3xl seems readable..."                    → STOP. Bigger.
"I'll just write a hero from scratch..."        → STOP. Open hero recipe.
"hover:scale-110 will feel snappy..."           → STOP. Spring + 1.02.
"The user said make it pop, so neon..."         → STOP. Pop = restraint + one accent.
"Three columns of features should work..."      → STOP. Bento or split.
"h-screen for the hero..."                      → STOP. min-h-[100dvh].
"Just a small emoji in the heading..."          → STOP. No emojis ever.
"useState for the parallax..."                  → STOP. useMotionValue.
"John Doe is fine for the testimonial..."       → STOP. Real names.
```

**All of these mean: re-read the rule, open the recipe, follow the discipline.**

---

## THE TEST

After building, ask: "If I showed this side-by-side with an Awwwards-tier site, would the difference be obvious?"

If yes → restart with the recipes.
If no → you've shipped premium.
