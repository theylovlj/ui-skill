# anti-slop.md — Patterns to NEVER use (v3.0)

**Read every build.** Each pattern is an AI default. Don't ship with any of these.

---

## THE BLACKLIST (top tells)

- ❌ **Purple/violet/indigo gradient backgrounds.** Fix: ONE accent from `tokens.md` palettes.
- ❌ **Blue→purple gradients.** Fix: solid color. No multi-color gradients.
- ❌ **Gradient-text headlines (`bg-clip-text text-transparent`).** Universal v0/Lovable tell. Fix: solid color H1, italic-serif on ONE word.
- ❌ **3-column feature grid w/ icon-circle + bold title + 2-line desc.** The cardinal sin. Fix: bento with mixed sizes, or asymmetric split.
- ❌ **Equal-weight 3-card feature trio.** Fix: promote ONE, demote two.
- ❌ **Cookie-cutter rhythm (hero→3-features→testimonials→pricing→CTA).** Fix: vary the order.
- ❌ **Glassmorphism + neon glow + blurred orbs combo.** Fix: Liquid Glass spec only, sticky nav use only.
- ❌ **Generic SaaS card grid as first impression.** Fix: hero is ONE focal moment.
- ❌ **Tone-of-nothing brief ("modern, clean, minimal").** Fix: pick ONE named tone (editorial / brutalist / luxury / retro-futuristic / organic / playful / industrial / technical / monochrome-print).
- ❌ **Default Tailwind palette unmodified (`indigo-500`, `slate-50`).** Fix: define brand tokens in `tailwind.config`.
- ❌ **Default font stacks (Inter, Roboto, Arial, system).** Fix: see `tokens.md` § FONT STACKS.

---

## THE MINI-OVERHEAD-PILL FAMILY (worst AI tell)

**Ban: ANY small caps text element between nav and H1.** Whole family banned, all costumes:

- ❌ Status pill: `● V3.4 — PAGED ROUTING LIVE`, `● NEW — AGENT MODE`, `● LIVE`
- ❌ Editorial volume tag: `VOL. 04 — FIELD NOTES ──── OBSERVABILITY`, `ISSUE 12 / WINTER 2026`
- ❌ Category eyebrow w/ divider: `OBSERVABILITY ─── PRODUCT`
- ❌ Magazine masthead: `THE QUARTERLY — VOL. 03`
- ❌ Section index: `01 / DESIGN — 02 / MOTION`
- ❌ Plain monospace caps tag: `OBSERVABILITY` directly above H1
- ❌ Anything with horizontal divider lines (────) flanking caps text
- ❌ Any small monospace UPPERCASE caps tracking-wide thing between nav and H1

**Rule:** delete it. Keep subhead, dual CTA, and everything else. The H1 is the first thing on the page. Period.

**Real announcement bars at the top of the page (above nav) with actual news are FINE.** Only the mini-pill-above-H1 is banned.

---

## THE FLOATING-CHIP FAMILY (delete every chip outside the mockup)

**Ban: ANY pill/chip/badge floating outside the mockup chrome.** All variants banned:

- ❌ Stat chip: `P99 LATENCY · LIVE / 42ms ▼ 8.2%`
- ❌ Editorial chip: `● root cause inferred — payments-redis pool`
- ❌ Status flag below mockup: `● auto-scaling enabled`, `● synced — 3 services`
- ❌ Floating verification badge: `✓ deployed`, `✓ caught`
- ❌ "live" / "real-time" / "synced" indicators outside dashboard chrome
- ❌ Any 2-3 chip stack around the mockup at varying corners

**Rule:** if the info matters, render it INSIDE the mockup as part of the dashboard. Outside the mockup = decoration = delete.

**Allowed exception:** ONE chip MAX, only if it surfaces a unique product truth the user CAN'T see otherwise. If you can't explain in 1 sentence what unique truth it reveals → delete it.

---

## HERO ANTI-PATTERNS

- ❌ **Hero centered everything** (text-center stacks). Fix: 5/7 or 7/5 split, H1 anchored upper third.
- ❌ **50/50 column split** with both halves centered. Fix: asymmetric 5/7 or 7/5.
- ❌ **`py-24` on hero** (symmetric). Fix: `pt-32 pb-20` or `pt-40 pb-24`.
- ❌ **H1 vertically centered.** Fix: anchor at upper third (28-38% from top).
- ❌ **H1 wraps 4+ lines.** Fix: cut words, widen column, OR drop size — in that priority.
- ❌ **Two equal-weight CTAs side by side.** Fix: filled + ghost, ratio ≈ 3:1.
- ❌ **Hero copy > 8 words.** Fix: cut.
- ❌ **`text-3xl` hero or smaller.** Fix: 5xl-7xl.
- ❌ **Hero with icons next to H1.** Fix: type stands alone.
- ❌ **All-italic headline.** Fix: italic-serif on ONE word per headline only.
- ❌ **Headline + subhead in same font weight.** Fix: 700/600 + 400.
- ❌ **`min-h-[100svh]` with not enough content** = giant void below hero. Fix: drop the min-h, OR fill it, OR use `flex flex-col justify-between`.

---

## LAYOUT ANTI-PATTERNS

- ❌ **Tiny island sections** — content < 60% of section width when bg has contrast. Fix: widen content ≥75%, drop the bg, OR switch to multi-col grid that fills.
- ❌ **`py-24` on every section.** Fix: 3-tier rhythm — hero `py-32`, features `py-24`, transitions `py-12`.
- ❌ **Symmetric padding everywhere.** Fix: asymmetric on illustration-ending sections (`pt-24 pb-32`).
- ❌ **Mobile padding === desktop padding.** Fix: `py-14 md:py-20 lg:py-24` style triple.
- ❌ **`max-w-4xl` containers without reason.** Fix: `max-w-7xl` default; narrow to `max-w-prose` only for actual prose.
- ❌ **`max-w-7xl` capped on big monitors** = tiny island on 27". Fix: `max-w-7xl 2xl:max-w-[1500px] [@media(min-width:1920px)]:max-w-[1760px]`.
- ❌ **Linear spacing (4/8/12/16 equal steps).** Fix: 4/8/12/16/24/32/48/64/96/128 (non-linear).
- ❌ **Empty section w/ only heading.** Fix: real content, OR delete the section.
- ❌ **Footer w/ 5 columns of mostly-empty links.** Fix: fewer denser columns, OR editorial ghost-wordmark.
- ❌ **Asymmetric grids that don't collapse on mobile.** Fix: `grid-cols-1 md:grid-cols-2`.

---

## TYPOGRAPHY ANTI-PATTERNS

- ❌ **Inter (without Tight)** as headline. Fix: Inter Tight / Geist / Uncut Sans.
- ❌ **Space Grotesk.** Specifically called out as the "AI defaults here" font.
- ❌ **Headline + subhead same weight.** Fix: 700/600 + 400.
- ❌ **Type sizes outside the 8 locked.** No 18px, no 40px. Use display/hero/h1/h2/h3/body-lg/body/caption only.
- ❌ **No negative tracking on display/hero.** Fix: `-0.04em` / `-0.035em`. Single biggest premium-feel multiplier.
- ❌ **Body line-height 1.75** (Tailwind prose default). That's for markdown. Fix: 1.55-1.6.
- ❌ **Font weight 300.** Fix: 400 minimum (use color/size to de-emphasize, never light weights).
- ❌ **800 + 300 weight pair.** Looks like 2014 WordPress. Fix: 700/600 + 400.
- ❌ **More than 3 weights per page.** Pick 3, max.

---

## COLOR ANTI-PATTERNS

- ❌ **Teal `#14b8a6`** as primary accent. Fix: warm coral / indigo-violet / amber / burnt sienna from `tokens.md`.
- ❌ **`bg-gradient-to-br from-purple-500 to-blue-500`.** The single most-recognized AI tell.
- ❌ **Pure `#fff` background.** Fix: off-white.
- ❌ **Pure `#000` text.** Fix: tinted (`oklch(20% 0.01 90)` warm or `oklch(22% 0.01 250)` cool).
- ❌ **>3 colors total.** Fix: 1 accent + neutral text + neutral bg.
- ❌ **Pure neutral gray** (`gray-500`/`slate-500`). Fix: tint toward brand hue at chroma 0.005-0.015.
- ❌ **80%+ saturation accents.** Fix: dial to 50-65% chroma.

---

## COMPONENT ANTI-PATTERNS

- ❌ **Faking dashboards inline w/ divs+gradients.** Fix: real screenshot, device frame + content primitives, OR single hero photo.
- ❌ **State-picker / Storybook controls inside hero mockup.** Hero shows POPULATED default state with realistic data. NEVER `default | hover | focus | active | loading | empty | error` row inside the screen.
- ❌ **Dashboard mockup using marketing density** (16px body, 56px rows, 24px padding). Fix: app density — 12-13px body, 28-32px rows, 12-16px padding, 1px @ 6-10% borders, NO drop shadows, tabular-nums.
- ❌ **Status badges as solid fills** (`bg-red-500 text-white`). Fix: tinted bg + tinted text + tinted border on same hue: `bg-red-950 text-red-400 border-red-900`. 18-22px tall, 10-11px UPPERCASE, weight 600.
- ❌ **Floating decoration overlapping H1/H2/CTA.** SAFE-ZONE rule: decorations live ONLY in margin safe zone (corners, edges), never inside focal content rectangle. Bounding-box check: zero intersection with `<h1>`, `<h2>`, `[data-stat]`, `button`. Max 4 decorations per section. Always rotate `±6deg` to `±15deg`.
- ❌ **Marquee with visible loop seam (N-shape).** Fix: duplicate content INSIDE track, animate `translateX(-50%)` (NOT -100%), pixel mask 80px, ≥8 items per copy.
- ❌ **`<Loader2 />` for every loading state.** Fix: skeleton screens / button ellipsis / optimistic update / branded progress bar.
- ❌ **"MOST POPULAR" pricing banner.** Fix: subtle pill "Currently Popular" + green dot, OR slight bg tint.
- ❌ **Feature lists w/ checkmark per row.** Fix: thin horizontal dividers, OR no separators.
- ❌ **shadcn `<Accordion>` defaults for FAQ.** Fix: thin pill rows w/ hover hint (`recipes/faq-pillrows.md`).
- ❌ **Borders as primary divider.** Fix: shadows (`tokens.md` § ATMOSPHERE), space, OR bg contrast. Borders only for inputs / active tabs / table row dividers.
- ❌ **`rounded-md` shadcn buttons w/ chevron.** Fix: `rounded-full` pill buttons.
- ❌ **Shared-shadow disease (`shadow-lg` on every elevated thing).** Fix: 5-step elevation ladder. Cards `shadow-sm`, popovers `shadow-xl`, modals `shadow-2xl`. Scale w/ z-depth.
- ❌ **Radius monoculture (`rounded-2xl` everywhere).** Fix: chips `rounded-full`, buttons `rounded-full`/`lg`, inputs `rounded-md`, cards `rounded-2xl`, modals `rounded-3xl`. Scale w/ size.
- ❌ **Default-state-only ship (no empty/loading/error states).** Block delivery without all 7: default / hover / active / focus-visible / loading / empty / error.

### Mockup compositing (chrome + screen content)

The dashboard MUST sit INSIDE the mockup chrome, not float beside it. 2-layer wrapper, screen content uses catalog coordinates:

```jsx
<div className="relative inline-block w-full max-w-2xl">
  <div className="absolute overflow-hidden rounded-md"
       style={{ top: "5.5%", left: "12%", width: "76%", height: "82%" }}>
    <YourDashboardScreenshot />
  </div>
  <img src="/mockups/macbook-pro-14.webp" alt="" aria-hidden
       className="relative block w-full h-auto pointer-events-none select-none" />
</div>
```

- Use coordinates from `recipes/device-mockups-catalog.md`
- `overflow:hidden` on screen-content box
- `pointer-events-none` on chrome
- Phone screens: add `borderRadius: "8%"` for screen curvature
- NO state-picker debug row in the screen
- Hero shows POPULATED default state with realistic data

---

## MOTION ANTI-PATTERNS

- ❌ **Animating `top`/`left`/`width`/`height`.** Layout reflow per frame = 5fps mobile. Fix: `transform` + `opacity` only.
- ❌ **`transition: all 0.3s ease`.** Fix: Framer Motion `layout` + spring, OR explicit (`transition-colors duration-200`).
- ❌ **`hover:scale-105` w/ no easing.** Fix: `<motion.div whileHover={{ scale: 1.02 }} transition={SPRING_SNAPPY}>`.
- ❌ **`cubic-bezier(0.68, -0.55, 0.265, 1.55)` (back-out / overshoot).** 2017 bouncy. Fix: spring (200-400 stiffness, 20-30 damping) OR `ease-out-quint` `[0.16, 1, 0.3, 1]`.
- ❌ **`animate-bounce` / `animate-pulse` for important UI.** Fix: entrance fade-up via stagger.
- ❌ **Mounting/unmounting w/ `{condition && <Card />}`.** Fix: `<AnimatePresence mode="popLayout">` + `motion.div` + `layout`.
- ❌ **`useState` for parallax/cursor/continuous-input.** Fix: `useMotionValue` + `useTransform`.
- ❌ **Linear easing + single global duration.** Fix: scale duration w/ element size (chip 120ms / button 200ms / panel 300ms / page 400-500ms ceiling). Exits 20% faster than entrances.
- ❌ **Missing `prefers-reduced-motion` handling.** Fix: `useReducedMotion()` hook OR `@media (prefers-reduced-motion: reduce)` block.
- ❌ **Page-load entrance with EVERY element fading.** Fix: stagger only the hero (3-5 elements). Below fold, scroll-triggered subtle reveals only.
- ❌ **`useScroll` without `target: ref`.** Single biggest scroll bug. Fix: always pass target unless intentionally window-relative.
- ❌ **`useMotionValueEvent` for derived UI values.** 60fps re-render storm. Fix: `useTransform`. `useMotionValueEvent` only for canvas/external side-effects.

---

## SCROLL / PARALLAX ANTI-PATTERNS

- ❌ **`transform: translateY()` on foreground content** = void below the section. Fix: only parallax BACKGROUNDS inside bounded `overflow:hidden` containers.
- ❌ **Pinned section parent === pinned section height** = no scroll distance, void below. Fix: parent_height = pinned_height + scroll_distance.
- ❌ **`overflow: hidden` on sticky ancestor** = sticky silently dies. Fix: `overflow: clip`.
- ❌ **`100vh` on hero pins** (iOS Safari address-bar jitter). Fix: `100svh`.
- ❌ **Parallax shipped on touch devices** (vestibular nausea). Fix: `(hover: none) and (pointer: coarse)` disables parallax.
- ❌ **`<video>.currentTime` scrubbing for hero** (breaks on iOS Safari). Fix: canvas image sequence (Apple's actual technique).
- ❌ **Parallax translation > 150px or > 30%** (nausea). Fix: 50-150px / 15-30% max, bg speed 0.3-0.5× foreground.
- ❌ **Animating `width` for scroll progress bar.** Reflow per frame. Fix: `scaleX` + `transform-origin: 0%`.
- ❌ **Parallax on text content.** Reading speed killer. Fix: only on backgrounds.

See `scroll.md` for the canonical scroll/pinned/parallax law.

---

## CONTENT ANTI-PATTERNS

- ❌ **AI marketing voice:** "Empower", "Unlock", "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize", "Game-changer", "Delve", "Tapestry", "In the world of...". Fix: actual product verb. "Move money." "Ship code faster." "Plan your week."
- ❌ **Subtext that explains the headline.** Fix: subtext adds NEW info — quantification, audience, distinction.
- ❌ **Feature titles:** "Powerful Features", "Built for Speed", "Designed for You". Fix: concrete promises ("Live exchange rates", "Bank-level security").
- ❌ **Pricing tiers "Basic / Pro / Enterprise".** Fix: name from product/audience. "Solo / Team / Studio."
- ❌ **Generic placeholder names** ("John Doe", "Sarah Chan"). Fix: realistic diverse names. "Maya Okafor", "Ezra Singh", "Lucia Marchetti".
- ❌ **Generic avatars** (SVG-egg, Lucide user, gradient initials). Fix: `picsum.photos/seed/{id}/100/100` OR styled SVG portraits.
- ❌ **Round numbers** (99.99%, 50%, 1234567, 10x faster). Fix: organic data — `47.2%`, `+1 (312) 847-1928`, `$3,481`, `8,431 active users` (NOT "10,000+").
- ❌ **Startup slop names** ("Acme", "Nexus", "SmartFlow", "Flowbit"). Fix: invent contextual names. Two-syllable favored. No `-ly`, `-fy`, `-hub`.
- ❌ **Trust-signal bundle:** unsourced 99.9% / 50K+ / 10x stat trio + grayscale-40 logo bar + avatar pile. Fix: real specific numbers, source the claim, real photos with permission.
- ❌ **Unsplash placeholder URLs.** Often broken. Fix: `picsum.photos/seed/{id}/{w}/{h}` (deterministic).
- ❌ **Headline cadence templates:** "Ship faster. Build better. Scale smarter." / "The all-in-one platform for X" / "Built for modern teams" / "Powered by AI". Fix: single declarative sentence about what the product DOES for one specific person.
- ❌ **Emojis in product UI.** Renders inconsistently. Fix: Phosphor / Radix icons.

---

## MOBILE / VIEWPORT ANTI-PATTERNS

- ❌ **`h-screen`** for full-height hero. Fix: `min-h-[100dvh]`.
- ❌ **Backdrop-blur on scrolling content.** Fix: only on fixed/sticky.
- ❌ **Z-index spam (`z-50`, `z-[9999]`).** Fix: `tokens.md` § Z-INDEX standard stack.
- ❌ **Body text < 16px.** iOS auto-zooms inputs. Fix: 16px minimum.
- ❌ **Tap targets < 44×44px** OR < 8px gap (16px on mobile). Fix: WCAG 2.5.5.

---

## TEST

After building: "Side-by-side with an Awwwards-tier site, would the difference be obvious?"

Yes → restart with the recipes. No → shipped premium.
