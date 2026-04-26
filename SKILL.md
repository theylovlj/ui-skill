---
name: ui
description: Use when the user asks to build a landing page, hero section, marketing site, dashboard, mobile app screen, pricing page, or any frontend they want to feel premium and not look AI-generated. Triggers on phrases like "build me a UI", "design a landing page", "make a hero", "make this look premium", "create a dashboard", "build a marketing site", or when output needs to compete with award-winning sites (Awwwards, SiteInspire, SEESAW caliber).
---

# /ui — Premium UI Build

You are about to build production-grade UI that looks like an award-winning designer made it, not an AI. This skill enforces three rules and gives you ready-to-adapt component blocks. **You do not invent layouts from scratch — you adapt blocks from `recipes/` and apply the rules.**

---

## THE THREE RULES (non-negotiable)

These came from analyzing 58 premium designs the owner manually curated. Every premium reference follows all three. Every AI-generated landing page violates them.

### Rule 1 — RESTRAINT IS THE SIGNAL

The most consistent finding across every premium reference. AI piles on; premium designers strip away.

- **Hero copy ≤ 8 words.** Subtext explains. Hero just confirms.
- **One accent color, used sparingly.** Only on CTAs, status dots, key emphasis.
- **Backgrounds are off-white/cream, never `#ffffff`.** Use `#fafaf7`, `#f7f5f0`, or `oklch(98% 0.005 90)`.
- **50%+ whitespace is the luxury signal.** Empty space is a feature, not a gap.
- **Default components are AI tells.** No `<Loader2 />`. No "MOST POPULAR" pricing banners. No symmetric centered everything.

> **Red flag:** If you're adding more, you're going wrong direction. Discipline is what you cut.

### Rule 2 — TYPOGRAPHY IS THE DESIGN

Headlines are the primary visual element. Build the page around them, not vice versa.

- **Stack:** Bold grotesque sans (Inter Tight or Geist) + ONE italic-serif accent word per headline (Instrument Serif).
- **Headline size:** 5xl to 7xl (~60-90px). No timid 32px headlines.
- **One italic word for emphasis.** Inside the bold sans headline. Pick the word that carries meaning.
- **Two-tone trick:** Muted-gray phrase + bold-black phrase ("Ideas to Results" / "AI-Powered Marketing.").
- **No icons in headlines. No decorative flourishes.** The type does the work.

See `tokens.md` for exact font stacks, sizes, and weights.

### Rule 3 — MOTION VIA SHARED ELEMENTS

Same surface morphs between states. Never hard cuts. Never separate components mounted/unmounted.

- **Framer Motion `layout` + `layoutId` is the primary tool.** One persistent surface morphs between states.
- **Springs over easings.** Use `{ type: "spring", stiffness: 320, damping: 30 }`. Never `cubic-bezier`.
- **Sub-300ms transitions.** Snappy, not slow.
- **Wild visuals always inside a calm container.** Mesh gradient inside a white card. Halftone over a steady serif headline. Containment is what makes it feel premium.
- **Per-element stagger** via `AnimatePresence`, never bulk swap.

See `tokens.md` for spring presets.

---

## THE PROCEDURE

Follow these steps **in order**. Do not skip steps.

### Step 1 — IDENTIFY page type

Pick ONE primary type. Don't mix.

| User says... | Page type | Hero recipe |
|---|---|---|
| "landing page", "marketing site", "SaaS site" | `saas` | `recipes/hero-saas.md` |
| "agency", "studio", "portfolio" | `agency` | `recipes/hero-agency.md` |
| "fintech", "currency", "money", "wallet" | `fintech` | `recipes/hero-fintech.md` |
| "dashboard", "analytics", "admin" | `dashboard` | `recipes/dashboard-shell.md` |
| "mobile app", "iOS", "onboarding" | `mobile` | `recipes/mobile-onboarding.md` |

If unsure, **stop and ask** — picking wrong page type wastes the build.

### Step 2 — READ the recipe + tokens

```
Read recipes/{hero}.md          # hero block
Read recipes/{features}.md      # one of: features-bento, features-3step, features-tabs
Read recipes/pricing-2col.md    # if pricing needed
Read recipes/faq-pillrows.md    # if FAQ needed
Read recipes/footer-modern.md   # always
Read tokens.md                  # always — don't invent colors/fonts
Read anti-slop.md               # always — the patterns to NEVER use
```

Each recipe is a complete React component you adapt. **You don't write blocks from scratch. You adapt.**

### Step 3 — BUILD by composing recipes

```jsx
<HeroSaas {...props} />
<FeaturesBento {...props} />
<Pricing2Col {...props} />
<FaqPillRows {...props} />
<FooterModern {...props} />
```

Customizations allowed:
- Copy (headline, subtext, CTA labels) — must be ≤8 word headlines
- Accent color from tokens
- Background image from `assets/backgrounds/` (see `recipes/backgrounds-catalog.md`)

Customizations forbidden:
- Inventing new fonts (use stack from tokens)
- Adding more colors (one accent only)
- Removing whitespace
- Breaking recipe structure to "improve" it — recipes are battle-tested

### Step 4 — REVIEW with checklist

Run through `review.md` BEFORE shipping. If Playwright/browser available: take a screenshot, then verify against checklist. If anything fails — fix it, don't ship.

### Step 5 — SHIP

Only after Step 4 passes every item. State which checklist items passed in your final message.

---

## QUICK REFERENCE — what the recipes contain

| Recipe | When to use | Key technique |
|---|---|---|
| `hero-saas.md` | B2B SaaS landing | Universal hero skeleton: pill+headline+subtitle+dual-CTA+bleeding mockup |
| `hero-agency.md` | Agency / studio | Centered editorial serif, asymmetric scattered decoration |
| `hero-fintech.md` | Fintech / money apps | Split layout, dashboard mockup with glow underneath |
| `features-bento.md` | Modern grid features | Mixed-size bento, rounded-3xl cards, color-matched shadows |
| `features-3step.md` | "How it works" sections | 3 cards with sticky scroll-synced bracket tracker |
| `features-tabs.md` | Product feature tour | Persistent stage tab system (image stays mounted, content swaps) |
| `pricing-2col.md` | SaaS pricing | Basic vs Pro with "Currently Popular" pill + dot, gradient CTA |
| `faq-pillrows.md` | FAQ section | Thin pill rows, never boxy accordions |
| `footer-modern.md` | Site footer | Multi-column with giant ghost wordmark fade at bottom |
| `dashboard-shell.md` | Admin dashboard | Page header + sidebar + content area, single-accent UI |
| `mobile-onboarding.md` | Mobile flows | Single task per screen, vast whitespace, pill CTAs, cross-fade transitions |
| `morphing-button.md` | Newsletter / signup CTA | Click-to-expand pill (200px → 420px) via Framer Motion `layout` |
| `text-roll.md` | Brand-swap headline word | Vertical word-roll inside an inline pill that resizes per brand |
| `backgrounds-catalog.md` | Hero backgrounds | 26 bundled WebP backgrounds with text-overlay strategy per category |

---

## RED FLAGS — STOP and start over

If you find yourself doing any of these, STOP. You are slipping into AI-generated defaults.

- ❌ Picking a teal or purple accent color (default AI choice)
- ❌ Writing a hero headline >8 words
- ❌ Using `<Loader2 />` as a loading state
- ❌ Setting background to pure `#ffffff`
- ❌ Using "MOST POPULAR" banner on pricing
- ❌ Putting checkmark icons next to feature list items
- ❌ Using `cubic-bezier` for primary motion (must be spring)
- ❌ Building a hero from scratch instead of adapting `recipes/hero-*.md`
- ❌ Adding more sections instead of perfecting fewer
- ❌ Centering EVERYTHING (premium has asymmetric tension)
- ❌ Creating empty/sparse sections "for spacing"
- ❌ Mounting/unmounting components instead of morphing one (no `layoutId`)
- ❌ Skipping `review.md` because "it looks fine"

**All of these mean: STOP. Re-read the relevant rule. Adapt the right recipe.**

---

## COMMON MISTAKES

### "I'll just build the hero from scratch, the recipes are too restrictive."

You will produce AI-generated output. The recipes are the discipline that prevents that. **Adapt them. Don't replace them.**

### "The user wants more than 8 words in the headline."

Push back. Suggest moving extra context to subtext. If they insist, log a comment in the code: `// HERO COPY EXCEEDS RULE 1 — explicit user request`. Then comply.

### "I need three accent colors for this brand."

You don't. Pick one. The other "colors" come from photography, gradients, and the off-white background — not flat color fills.

### "I need to add a section to fill space."

Empty space is the design. Don't fill it. If the page legitimately needs more content, add a *real* section (testimonials, integrations, FAQ) — not a decorative one.

### "Animation feels janky."

You used `cubic-bezier` or you're swapping components instead of morphing. Switch to spring + `layoutId`. See `recipes/morphing-button.md`.

---

## WHY THIS WORKS

The patterns in these recipes were extracted from analyzing 58 premium designs the owner curated personally — every Awwwards-tier site, every viral X design tweet, every fintech that doesn't look like a template. Every one followed the three rules. Every AI-generated landing page violates them.

You do not have a creative choice here. You execute the discipline. The discipline is what looks expensive.

---

## REFERENCE FILES

- `tokens.md` — colors, fonts, spacing, motion presets (read every build)
- `anti-slop.md` — the AI-tell patterns to avoid in detail (read every build)
- `review.md` — pre-ship checklist (read in Step 4)
- `recipes/` — 14 ready-to-adapt component blocks
- `assets/backgrounds/` — 26 bundled WebP background images
