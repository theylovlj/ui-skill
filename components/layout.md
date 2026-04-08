# Layout Patterns

## Decision Tree

```
What type of site/app is this?
│
├── Marketing / landing page
│   → Full-bleed sections, asymmetric hero, generous whitespace
│   → No sidebar. Top nav. Sections stack vertically.
│
├── SaaS dashboard / admin
│   → Sidebar (240px) + content area
│   → Top utility bar (search, notifications, user menu)
│   → Content: card-based or table-based, 12-col grid
│
├── Editorial / blog / docs
│   → Centered column (65-80ch), wide margins
│   → No sidebar by default; optional TOC sidebar on long pages
│   → Generous leading, large type
│
├── E-commerce
│   → Product grid (3-4 col desktop, 2 col mobile, 1 col small mobile)
│   → Filter sidebar (collapsible on mobile)
│   → Cart: persistent drawer or dedicated page
│
├── Internal tool / data app
│   → Full-width, dense, no decorative whitespace
│   → Tabbed content areas, data tables as primary UI
│   → Compact spacing (spatial-design.md compact scale)
│
└── Portfolio / creative
    → No rules — break them intentionally
    → But have a reason for every choice
```

---

## Hero Patterns

The hero is where AI-generated sites are most obviously AI-generated. The defaults: centered text, purple gradient blob, floating UI mockup screenshot. Avoid all three.

### Hero by Site Type

**Marketing SaaS (dark):**
- Type-dominant: large, bold headline left-aligned
- Subheadline in a contrasting weight (thin vs bold)
- Two CTAs: primary filled + secondary ghost
- Social proof row immediately below (logo strip or stat row)
- NO: gradient blob, floating laptop mockup, animated particles

```jsx
// Marketing hero — type-dominant, left-aligned
<section className="relative overflow-hidden bg-background pt-32 pb-20">
  {/* Subtle background texture — not a blob */}
  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,oklch(35%_0.08_260/20%),transparent_70%)]" />

  <div className="relative mx-auto max-w-7xl px-6">
    <div className="max-w-3xl">
      {/* Eyebrow label */}
      <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-muted-foreground">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Now in public beta
      </div>

      <h1 className="text-5xl font-bold leading-[1.05] tracking-tight lg:text-7xl">
        The fastest way to<br />
        <span className="text-muted-foreground">ship better UI</span>
      </h1>

      <p className="mt-6 text-lg text-muted-foreground lg:text-xl">
        Stop shipping UI that looks AI-generated. One skill, every component,
        decision trees for every choice.
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button size="lg">Get started free</Button>
        <Button size="lg" variant="outline">View examples</Button>
      </div>

      {/* Social proof — immediate, below the fold line */}
      <div className="mt-16 flex items-center gap-6 text-sm text-muted-foreground">
        <span>Trusted by 2,400+ developers</span>
        <div className="flex -space-x-2">
          {avatars.map(a => <Avatar key={a.id} size="sm" user={a} />)}
        </div>
        <div className="flex items-center gap-1">
          <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-foreground">4.9</span>
        </div>
      </div>
    </div>
  </div>
</section>
```

**Fintech / Enterprise:**
- Restrained, professional
- Dark navy or near-black background
- Single accent color (not cyan + purple)
- Chart or dashboard UI shown — but real data, not a screenshot

**Creative / Agency:**
- Asymmetric layout with large negative space
- Type-driven, minimal imagery
- One statement color on white
- No stock photos

**E-commerce:**
- Product-forward: product image dominates
- Headline secondary to the product
- Price and CTA prominent
- Color from product palette

---

## Page Layout Shells

### Marketing Layout
```jsx
<div className="min-h-dvh bg-background">
  <TopNav />
  <main>
    <HeroSection />
    <FeaturesSection />
    <SocialProofSection />
    <PricingSection />
    <CTASection />
  </main>
  <Footer />
</div>
```

### Dashboard Layout
```jsx
<div className="flex h-dvh overflow-hidden bg-background">
  <Sidebar />  {/* 240px, or 60px collapsed */}
  <div className="flex flex-1 flex-col overflow-hidden">
    <TopBar />   {/* 64px: search + notifs + user menu */}
    <main className="flex-1 overflow-y-auto p-6">
      {children}
    </main>
  </div>
</div>
```

### Editorial Layout
```jsx
<div className="min-h-dvh bg-background">
  <TopNav />
  <main className="mx-auto max-w-[720px] px-6 py-16">
    {/* Article content — 65ch max-width, generous line height */}
    <article className="prose prose-lg dark:prose-invert">
      {content}
    </article>
  </main>
</div>
```

---

## Section Patterns

### Feature Section (anti-slop)
The default AI pattern: 3 cards in a row, each with an icon, heading, and identical body text. Avoid.

**Better alternatives:**

**Two-column alternating (image/content swap):**
```jsx
{features.map((feature, i) => (
  <div key={feature.id} className={cn(
    "grid gap-12 py-20 md:grid-cols-2 md:items-center",
    i % 2 !== 0 && "md:[&>*:first-child]:order-last"  // alternate
  )}>
    <div>
      <h2 className="text-3xl font-bold">{feature.title}</h2>
      <p className="mt-4 text-lg text-muted-foreground">{feature.description}</p>
    </div>
    <div className="rounded-xl border border-white/10 overflow-hidden">
      {feature.visual}
    </div>
  </div>
))}
```

**Asymmetric feature grid (varied weights):**
```jsx
{/* Lead feature full-width, then 2-col below */}
<div className="space-y-4">
  <FeatureCard featured size="lg" {...features[0]} />
  <div className="grid gap-4 md:grid-cols-2">
    <FeatureCard {...features[1]} />
    <FeatureCard {...features[2]} />
  </div>
</div>
```

**Tabbed feature showcase:**
```jsx
{/* Tabs on left/top, content on right — no cards, no grid */}
<div className="grid md:grid-cols-[240px_1fr] gap-8">
  <div className="space-y-1">
    {features.map(f => (
      <button key={f.id}
        onClick={() => setActive(f.id)}
        className={cn(
          "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
          active === f.id ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"
        )}>
        {f.title}
      </button>
    ))}
  </div>
  <div className="rounded-xl border border-white/10 p-6 min-h-[300px]">
    <AnimatePresence mode="wait">
      {features.find(f => f.id === active)?.content}
    </AnimatePresence>
  </div>
</div>
```

---

## Grid Systems

### 12-Column Grid (standard)
Use for content-heavy pages where precise column alignment matters.
```css
.grid-12 {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--spacing-6);
}
/* Typical spans: sidebar=3, content=9 | half=6 | third=4 | quarter=3 */
```

### Auto-Fit (responsive without breakpoints)
Use for card grids where the number of columns should adapt to available space.
```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-4);
}
```

### Asymmetric Grid (non-AI-looking)
Break the uniform grid to create visual interest.
```jsx
{/* 7-col content, 5-col sidebar — not equal halves */}
<div className="grid grid-cols-12 gap-8">
  <div className="col-span-7">{mainContent}</div>
  <div className="col-span-5">{sidebar}</div>
</div>
```

### Masonry (vertical alignment broken)
Use for image galleries, card collections where heights vary intentionally.
```css
.masonry {
  columns: 3;
  column-gap: var(--spacing-4);
}
.masonry > * {
  break-inside: avoid;
  margin-bottom: var(--spacing-4);
}
```

---

## Spacing Rhythm

AI UIs apply spacing uniformly — every section has `py-20`, every card has `p-6`. Real design varies spacing to create rhythm and hierarchy.

### The Rhythm Principle
- **Tight sections** (utility, detail): `py-8` — compact, functional
- **Standard sections** (features, content): `py-16 md:py-24` — breathing room
- **Hero / CTA sections**: `py-24 md:py-32` — generous, statement-making
- **Between sections, use different values** — alternating tight/loose is visual music

### What Creates Breathing Room
```
Not: padding: 80px everywhere
Yes: Intentional variation
  - Hero: 128px top padding (statement)
  - Features: 80px (generous)
  - Testimonials: 64px (tighter, adjacent to logo strip)
  - CTA: 96px (prominent)
  - Footer: 48px (functional)
```

### Negative Space as Design Element
- White space is not wasted space. It creates focus.
- If you're cramming content in, cut content — don't tighten spacing.
- Large headings need large space before them — the bigger the type, the more room it needs to breathe.

---

## Sticky Elements

```jsx
// Sticky nav — subtle border appears on scroll
<nav className={cn(
  "sticky top-0 z-20 transition-all duration-200",
  scrolled
    ? "border-b border-white/10 bg-background/90 backdrop-blur-sm shadow-sm"
    : "bg-transparent"
)}>
```

**Rules for sticky elements:**
- Always has a z-index from the established scale
- Background blur (`backdrop-blur-sm`) prevents content showing through
- Slight border on scroll gives anchoring without being heavy
- Sticky headers in tables: `position: sticky; top: [nav-height]` — account for nav

---

## Feature Section Alternatives to the 3-Column Card Grid

The 3-column identical card grid is the #1 AI tell in feature sections. Any of these alternatives reads as custom, considered design.

### A: Alternating Left-Right (Zigzag)

```jsx
{features.map((feature, i) => (
  <div
    key={feature.id}
    className={cn(
      "grid grid-cols-2 gap-20 items-center py-24",
      i % 2 === 1 && "[direction:rtl]"
    )}
  >
    <div className="[direction:ltr] space-y-4">
      <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, '0')}</span>
      <h3 className="text-3xl font-semibold">{feature.title}</h3>
      <p className="text-muted leading-relaxed">{feature.desc}</p>
    </div>
    <div className="[direction:ltr] aspect-video rounded-xl overflow-hidden bg-surface">
      {feature.visual}
    </div>
  </div>
))}
```

### B: Tab/Switcher with Screenshot Preview

Used by Linear, Stripe, Loom. Shows many features in a compact space.

```jsx
function FeatureTabs({ features }) {
  const [active, setActive] = useState(0);
  return (
    <div className="grid grid-cols-[280px_1fr] gap-8 items-start">
      <div className="space-y-1">
        {features.map((f, i) => (
          <button
            key={f.id}
            onClick={() => setActive(i)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg transition-colors text-sm",
              active === i ? "bg-accent/10 text-accent font-medium" : "text-muted hover:text-fg"
            )}
          >
            {f.title}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-xl overflow-hidden border border-border aspect-video"
        >
          <img src={features[active].screenshot} className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

### C: Numbered Feature List (Editorial)

```jsx
{features.map((f, i) => (
  <div key={f.id} className="grid grid-cols-[80px_1fr] gap-8 py-8 border-t border-border">
    <span className="font-mono text-sm text-muted pt-1">{String(i + 1).padStart(2, '0')}</span>
    <div>
      <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
      <p className="text-muted leading-relaxed">{f.desc}</p>
    </div>
  </div>
))}
```

### D: Cinematic Full-Viewport Blocks

Each feature takes 100vh. The product image fills 60% of the screen. Works when each feature has a strong visual.

```jsx
{features.map(f => (
  <section key={f.id} className="min-h-screen grid grid-cols-[40%_60%] items-center">
    <div className="px-16 py-24 space-y-6">
      <h2 className="text-5xl font-bold leading-tight">{f.title}</h2>
      <p className="text-muted text-lg leading-relaxed">{f.desc}</p>
    </div>
    <div className="h-screen overflow-hidden">
      <img src={f.image} className="w-full h-full object-cover" />
    </div>
  </section>
))}
```

---

## What AI Gets Wrong

- **Center-everything layout** — headings centered, subtext centered, buttons centered. Centered layouts feel like slides, not apps or sites. Use left-alignment for most content; center sparingly (hero CTAs, testimonials).
- **Hero with big rounded gradient blob** — the purple or indigo radial gradient blob behind the hero is the single most recognizable AI tell. Replace with: subtle texture, geometric shapes, photography, or just the background color with good type.
- **Three identical feature cards in a grid** — same icon, same font size, same weight, same padding, same border radius. This is AI slop. Vary the emphasis.
- **No whitespace intentionality** — every section has the same padding. Rhythm requires variation.
- **Same spacing everywhere** — `gap-4` throughout. Spatial hierarchy requires that some things are closer together than others.
- **Full-bleed sections with no visual break** — 8 sections, all the same background color, stacked. Alternate between light/dark or use edge-to-edge color blocks to separate them.
- **Dashboard layout that is just a list of cards** — a real dashboard has hierarchy: KPI row at top, primary chart second, secondary data below. Not a grid of equal-weight cards.
- **No consideration for content width on editorial** — body text at 1200px wide. Humans can't read that. Cap content at 65-80ch.

---

## Accessibility Requirements

- **Skip link**: First focusable element — `<a href="#main" className="sr-only focus:not-sr-only">Skip to main content</a>`
- **Main landmark**: Wrap main content in `<main id="main">`
- **Landmark regions**: `<nav>`, `<main>`, `<aside>`, `<footer>` — use semantic HTML
- **Heading hierarchy**: One `<h1>` per page, logical h2→h3→h4 cascade (no skipping levels)
- **No layout tables**: Never use `<table>` for layout — CSS grid/flex only
- **Zoom to 200%**: Layout must not break or require horizontal scroll at 200% zoom
- **Reflow at 320px**: Content must be readable at 320px viewport without horizontal scroll (WCAG 1.4.10)
