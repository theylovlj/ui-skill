---
name: ui
description: Use when the user asks to build a landing page, hero, marketing site, dashboard, mobile app screen, pricing page, or any frontend they want premium and not AI-generated. Triggers on "build me a UI", "design a landing page", "make a hero", "make this look premium", "create a dashboard", "build a marketing site", or when output needs to compete with Awwwards-tier sites.
---

# /ui — Premium UI Build (v3.0)

Build production-grade UI that looks like an award-winning designer made it. Adapt blocks from `recipes/`. Apply the rules. Don't invent layouts.

---

## DIALS (override per request)

- **RESTRAINT** 1-10 (default 8). 1 = packed, 10 = art gallery.
- **MOTION** 1-10 (default 7). 1 = static, 10 = scroll-cinematic. **MOTION ≥ 5 means motion is mandatory, not optional.**

---

## THE 4 RULES (non-negotiable)

### Rule 1 — LESS WORDS = MORE PREMIUM

**The most important rule. Every word is a tax on attention.**

| Element | Max words |
|---|---|
| Hero H1 | **8** (5 ideal) |
| Hero subhead | 20, ≤2 lines |
| Section H2 | 6 |
| Feature title | 4 |
| Feature body | 18, 1 sentence |
| Bullet item | 5 |
| Testimonial | 25 |
| CTA button | 3 |
| Eyebrow | 4 (or skip) |

**Total page: 500-900 words** (B2B SaaS conversion sweet spot).

**The cut test:** if deleting a sentence still lets the visitor evaluate the product → delete it. Most sentences fail.

> "Get rid of half the words on each page, then half of what's left." — Krug

### Rule 2 — RESTRAINT IS THE SIGNAL

- **One accent color.** Only on CTAs, status dots, key emphasis.
- **Off-white bg, never `#fff`.** `oklch(98% 0.005 90)` warm or `oklch(98% 0.002 250)` cool.
- **50%+ whitespace = luxury signal.** Empty space is a feature.
- **No AI defaults.** No `<Loader2 />`. No "MOST POPULAR". No `bg-clip-text` gradient headlines. No symmetric centered everything.

### Rule 3 — TYPOGRAPHY IS THE DESIGN

- **Stack:** bold grotesque sans (Inter Tight / Geist) + ONE italic-serif accent word (Instrument Serif).
- **Hero size:** 5xl-7xl (60-90px). NEVER timid 32px.
- **Negative tracking on big type.** Display `-0.04em`, hero `-0.035em`. Single biggest premium-feel multiplier.
- **No icons in headlines.** Type does the work.

See `tokens.md` for fonts. See `spacing.md` § 3 for the 8 locked sizes.

### Rule 4 — MOTION VIA SHARED ELEMENTS

- **Framer Motion `layout` + `layoutId`** is primary. One persistent surface morphs.
- **Springs over easings.** Sub-300ms. See `tokens.md` § MOTION.
- **Animate ONLY transform + opacity.** Never width/height/top/left.
- **`import from "motion/react"`** (renamed from framer-motion).

---

## THE PROCEDURE

### Step 1 — IDENTIFY page type

| User says | Page type | Hero recipe |
|---|---|---|
| "landing", "marketing site", "SaaS" | `saas` | `recipes/hero-saas.md` |
| "agency", "studio", "portfolio" | `agency` | `recipes/hero-agency.md` |
| "fintech", "wallet", "money" | `fintech` | `recipes/hero-fintech.md` |
| "dashboard", "analytics", "admin" | `dashboard` | `recipes/dashboard-shell.md` |
| "mobile app", "iOS", "onboarding" | `mobile` | `recipes/mobile-onboarding.md` |

If unsure, ask. Wrong page type wastes the build.

### Step 2 — ROLL THE DICE (anti-repetition)

Pick ONE from each:

- **Vibe:** Editorial Luxury / Soft Structuralism / Ethereal Glass
- **Hero alignment:** Centered (Editorial only) / Left text + right asset / 5/7 split
- **Decoration:** None / Single hero glow / Bundled WebP bg

### Step 3 — READ the rule files

```
Read tokens.md         # palette, fonts, motion presets
Read spacing.md        # the complete sizing/spacing/composition law
Read scroll.md         # if any scroll/parallax/sticky motion
Read anti-slop.md      # patterns to NEVER use
Read recipes/{hero}.md
Read recipes/{features}.md
Read recipes/{pricing|faq|footer}.md as needed
```

### Step 4 — BUILD

Adapt recipes. Don't invent. Customize:
- Copy (within Rule 1 word limits)
- Palette (from `tokens.md`)
- ONE expensive moment (name it)

### Step 5 — REVIEW

Run `review.md` (39 checks). Block ship if ANY fail.

### Step 6 — NO LAZY OUTPUT

Every recipe used. Every rule applied. Name the expensive moment in your final message.

---

## RED FLAGS (stop if you catch yourself)

| Thought | Reality |
|---|---|
| "Let me add a quick gradient..." | No new gradients. |
| "I'll center this for balance..." | Vary alignment. |
| "Loader2 is fine for now..." | Skeleton instead. |
| "This looks empty, add a chip..." | Empty IS the design. |
| "text-3xl seems readable..." | Bigger. |
| "hover:scale-110 will feel snappy..." | Spring + 1.02. |
| "VOL. 04 — FIELD NOTES eyebrow..." | Mini-pill ban. Delete. |
| "Tiny pill above H1..." | Worst AI tell. Delete. |
| "Floating chip near mockup..." | Decoration. Delete. |
| "Three equal feature cards..." | Promote one, demote two. |
| "h-screen for the hero..." | min-h-[100svh]. |
| "useState for parallax..." | useMotionValue. |
| "John Doe testimonial..." | Real names. |
| "py-24 on every section..." | Asymmetric (pt-32 pb-20). |
| "50/50 hero split..." | 5/7 or 7/5. |
| "3 sentences explaining a feature..." | Cut to 1. |
| "useScroll without target ref..." | Always pass target. |

---

## QUICK REFERENCE

- **Container:** `max-w-7xl 2xl:max-w-[1500px] [@media(min-width:1920px)]:max-w-[1760px]`
- **Hero padding:** `pt-32 pb-20 md:pt-40 md:pb-24` (asymmetric)
- **Section padding:** `py-14 md:py-20 lg:py-24` default; `py-10 md:py-14 lg:py-16` compact
- **Hero columns:** `lg:col-span-5` text + `lg:col-span-7` mockup (NOT 50/50)
- **Hero height:** `min-h-[100svh]` (NOT `100vh` — iOS Safari)
- **Type scale:** display 96 / hero 72 / h1 48 / h2 32 / h3 24 / body-lg 20 / body 16 / caption 13. NO 18, NO 40.
- **Body line-height:** 1.55 (NOT 1.75 — that's prose)
- **Status badge:** `bg-{hue}-950 text-{hue}-400 border-{hue}-900` (NEVER solid fills)
- **Dashboard density:** 12-13px body / 28-32px row / 12-16px card padding / 1px @ 6-10% borders / NO drop shadows / tabular-nums

---

## CROSS-REFERENCES

- `tokens.md` — palette, fonts, motion, atmosphere
- `spacing.md` — sizing, composition, dashboard density
- `scroll.md` — parallax, sticky, pinned, scroll-driven
- `anti-slop.md` — patterns to NEVER use
- `review.md` — 39-check pre-ship list
- `recipes/` — copy-paste blocks
