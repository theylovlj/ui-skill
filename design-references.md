# Design Reference Patterns

## PeakBot Design Language
PeakBot is a Discord bot SaaS with a gaming/esports aesthetic. The design should feel:
- **Premium** — not cheap or template-y
- **Dark-first** — deep backgrounds, vibrant accents
- **Gaming-adjacent** — subtle glow effects, cyber/neon touches, but still professional
- **Data-rich** — dashboards, stats, leaderboards done with clarity

### PeakBot Color Palette Guidance
- Background: deep dark (not pure black) — `#0a0a0f`, `#111118`, `#16161d`
- Cards: slightly lighter with opacity — `bg-white/5`, `bg-white/[0.03]`
- Primary accent: vibrant purple/violet — `#8b5cf6`, `#7c3aed`
- Secondary accent: cyan/teal — `#06b6d4`, `#22d3ee`
- Success: green glow — `#10b981`, `#34d399`
- Warning: amber — `#f59e0b`
- Error: red — `#ef4444`
- Text primary: `#f5f5f5`
- Text secondary: `#a1a1aa`
- Text muted: `#71717a`
- Borders: `border-white/10`, `border-white/5`

### Glow & Accent Patterns
```css
/* Subtle card glow on hover */
.card-glow:hover {
  box-shadow: 0 0 20px rgba(139, 92, 246, 0.15),
              0 0 40px rgba(139, 92, 246, 0.05);
}

/* Accent gradient text */
.gradient-text {
  background: linear-gradient(135deg, #8b5cf6, #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Ambient background glow */
.ambient-glow {
  background: radial-gradient(ellipse at top, rgba(139, 92, 246, 0.15) 0%, transparent 50%);
}
```

## SaaS Dashboard Design Patterns (2026)

### Layout Patterns
1. **Sidebar + Content** — Fixed sidebar (240-280px), scrollable content area
2. **Top nav + Content** — Horizontal nav, full-width content
3. **Command palette** — Cmd+K overlay for power users (use cmdk library)

### Data Display
- **Stats cards**: Icon + value + label + trend indicator
- **Tables**: Sticky headers, hover rows, sortable columns, inline actions
- **Charts**: Minimal axes, generous padding, tooltips on hover
- **Activity feeds**: Avatar + action + timestamp, grouped by day

### Common Sections
- **Hero/Header**: Gradient background, large heading, subtitle, CTA
- **Feature grid**: 2-3 columns, icon + title + description cards
- **Pricing**: 3-tier horizontal, highlight recommended, toggle monthly/annual
- **Testimonials**: Quote + avatar + name + role, carousel or grid
- **Stats bar**: 3-4 key metrics in a row, large numbers, trend arrows
- **CTA section**: Gradient or dark background, centered text, prominent button

## Animation Patterns (Framer Motion)

### Fade In Up (Most Common)
```tsx
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }
};
```

### Staggered Children
```tsx
const container = {
  animate: { transition: { staggerChildren: 0.08 } }
};
const item = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 }
};
```

### Scale On Hover
```tsx
<motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} />
```

### Smooth Height Animation
```tsx
<motion.div layout transition={{ type: "spring", bounce: 0.2 }} />
```

### Number Counter
```tsx
<motion.span>{useMotionValue(0)}</motion.span>
// Animate from 0 to target value
```

## Tailwind Pro Patterns

### Gradient Borders
```
<div className="p-[1px] rounded-xl bg-gradient-to-r from-purple-500 to-cyan-500">
  <div className="rounded-xl bg-background p-6">Content</div>
</div>
```

### Noise/Grain Texture
```
<div className="relative">
  <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.svg')]" />
  {/* content */}
</div>
```

### Animated Gradient Background
```
<div className="bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500
  bg-[length:200%_200%] animate-gradient" />
```

### Scroll-Linked Parallax
```tsx
const { scrollYProgress } = useScroll();
const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
```

## Inspiration Sources (Search These When Stuck)
- **dribbble.com/search/discord-bot-dashboard** — Discord bot UI patterns
- **behance.net/search/projects/discord bot ui design** — Full case studies
- **saasframe.io/categories/dashboard** — Real SaaS dashboard screenshots
- **muz.li/inspiration/dark-mode** — Dark mode design gallery
- **magicui.design** — Animated component examples
- **ui.aceternity.com** — Premium animated components
- **ui.shadcn.com** — Component API reference
