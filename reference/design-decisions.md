# Design Decisions by Site Type

## How to Use This File

1. Identify your site/app type from the sections below
2. Use the decision tree to lock in your style defaults before writing any code
3. These are defaults — override intentionally, never accidentally

---

## Site Type Detection

Ask these questions about the codebase you're working in:

- Is the primary goal to **acquire users**? → Marketing site
- Is the primary goal to **show data and controls**? → SaaS Dashboard
- Is the primary goal to **sell products**? → E-commerce
- Is the primary goal to **present content/articles**? → Editorial
- Is it **internal-facing**, used by employees? → Internal Tool
- Is it **showcasing work**? → Portfolio
- Is the **primary device mobile**? → Mobile-first App

---

## Marketing Site

**Personality:** Expressive, high-energy, persuasive. This is where bolder choices pay off.

| Decision | Default | Notes |
|----------|---------|-------|
| **Primary button** | Filled, solid color (no gradient unless brand uses it) | One per section, high contrast |
| **Secondary button** | Ghost or outlined | Never same weight as primary |
| **Font display** | High weight contrast (800 headline / 400 body) | Fluid type for headings (`clamp`) |
| **Font choice** | Distinctive sans or serif — NOT Inter | Fraunces, Bricolage Grotesque, Plus Jakarta Sans |
| **Color approach** | Brand color as primary, tinted neutrals | 60/30/10 rule |
| **Dark/light** | Usually light, dark sections for contrast | Never pure black/white |
| **Layout** | Asymmetric, broken grid intentional | Not every section center-aligned |
| **Card usage** | Minimal — use spacing and type for grouping | Cards for pricing, testimonials only |
| **Border radius** | Matches brand personality — 4-8px professional, 12-16px friendly | Consistent system-wide |
| **Animation** | Entrance animations welcome — 300-500ms, scroll-triggered | Never on every element |
| **Hero pattern** | Type-dominant or asymmetric — NOT big gradient blob | See components/layout.md |

---

## SaaS Dashboard

**Personality:** Clear, dense, efficient. Every pixel earns its place.

| Decision | Default | Notes |
|----------|---------|-------|
| **Primary button** | Filled, solid — no gradient | One primary action per section |
| **Secondary button** | Outlined or ghost | Never pill-shaped in dashboards |
| **Font display** | Fixed scale, no fluid type | Tabular nums for ALL data |
| **Font choice** | Readable sans with clear weights | Outfit, Figtree, Plus Jakarta Sans |
| **Color approach** | Single accent, semantic colors for status | Don't use accent for decoration |
| **Dark/light** | User preference — design both | Dark: oklch(12-18%) bg |
| **Layout** | Sidebar (240-280px) + scrollable content | Named grid areas |
| **Card usage** | Yes — for grouping data units | Borderless preferred, depth via bg |
| **Border radius** | 6-8px — professional | Not pill, not sharp |
| **Animation** | Functional only — 100-200ms | No entrance animations on data |
| **Data display** | Skeleton screens > spinners | Sticky table headers |

---

## E-commerce

**Personality:** Trust-building, product-first, frictionless.

| Decision | Default | Notes |
|----------|---------|-------|
| **Primary button** | "Add to cart" / "Buy now" — high contrast filled | Always visible, never hidden |
| **Secondary button** | Ghost for secondary actions (save, share) | |
| **Font choice** | Clean, readable — NOT decorative | Body 16px minimum |
| **Color approach** | Brand color for CTAs, neutral everything else | Trust = restraint |
| **Layout** | Product grid (auto-fit, minmax 260px) | Filter sidebar on desktop |
| **Card usage** | Product cards — image-first | No icon+title+text cards |
| **Animation** | Cart feedback (add animation), hover on product images | Not excessive |
| **Images** | Responsive srcset always | Skeleton while loading |
| **Mobile** | Bottom sticky CTA on product pages | Touch targets 48px+ |

---

## Editorial / Blog

**Personality:** Content-first, readable, authoritative.

| Decision | Default | Notes |
|----------|---------|-------|
| **Font** | Serif for body (Lora, Newsreader, Fraunces) | Sans for UI chrome |
| **Measure** | `max-width: 65ch` for body text | Non-negotiable |
| **Line height** | 1.6-1.75 body | More for dark bg |
| **Color approach** | Near-monochrome — typography IS the design | Single accent for links |
| **Layout** | Single column content, wide for images | Not centered hero |
| **Cards** | Article cards — title + excerpt + meta | Image optional |
| **Animation** | Minimal — content loads fast, no entrance anim | |
| **Dark mode** | Sepia-tinted dark if at all | Not cyan-on-dark |

---

## Internal Tool

**Personality:** Ruthlessly functional. No ornament.

| Decision | Default | Notes |
|----------|---------|-------|
| **Font** | System font stack (fastest, most legible) | `-apple-system, system-ui` |
| **Color** | Semantic only (success/error/warning/info) | No decorative color |
| **Layout** | Dense — max information density | Compact padding |
| **Cards** | Tables > cards for data | |
| **Animation** | None or near-none | Distraction is a cost |
| **Dark mode** | Usually light for long sessions | |
| **Buttons** | Clear hierarchy, labeled (not icon-only) | |

---

## Portfolio

**Personality:** Distinctive, memorable, personal. This is where you break rules intentionally.

| Decision | Default | Notes |
|----------|---------|-------|
| **Font** | Highly distinctive — this is your brand | Can use display fonts |
| **Layout** | Unexpected — editorial, grid-breaking, scroll-driven | |
| **Color** | Personal palette, not generic | |
| **Animation** | Can be expressive — this showcases skill | Don't overdo |
| **Cards** | Project cards should feel unique, not templated | |
| **Mobile** | Still must work — just be creative | |

---

## Mobile-First App

**Personality:** Touch-native, thumb-friendly, fast.

| Decision | Default | Notes |
|----------|---------|-------|
| **Touch targets** | 48px minimum | Generous |
| **Navigation** | Bottom tabs (≤5 items) or hamburger+drawer | Not top nav |
| **Typography** | 16px body minimum (prevents zoom on iOS) | |
| **Buttons** | Full-width primary at bottom of screen | |
| **Gestures** | Swipe patterns with visible affordance | Always provide fallback |
| **Loading** | Skeleton screens | Fast perceived load |
| **Inputs** | Correct input type (tel, email, number) | Triggers right keyboard |
| **Scroll** | `-webkit-overflow-scrolling: touch` | Momentum scroll |
