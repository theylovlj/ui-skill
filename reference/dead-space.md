# Dead Space in Web Design — Complete Reference

> **Purpose**: This file is read by the AI before building any page. It defines what dead space is, where it appears, how to fix it, and how to prevent it. The user HATES dead space. Every pixel must earn its place.

---

## 1. WHAT IS DEAD SPACE (vs Intentional Whitespace)

### The Core Distinction

**Intentional whitespace** is a design tool. It creates breathing room, establishes hierarchy, groups related elements, and signals luxury or clarity. Apple, Stripe, and Linear use whitespace as an active design element — it guides the eye and makes content feel important.

**Dead space** is accidental emptiness. It is space that exists because nobody thought about it, because a template was used without enough content, or because padding was applied uniformly without considering what the section actually needs. Dead space makes a page feel unfinished, amateur, or broken.

### How to Tell the Difference

| Intentional Whitespace | Dead Space |
|---|---|
| Has a purpose: separating groups, creating focus, aiding readability | Has no purpose: it is just... there |
| Feels balanced — the empty area relates to nearby content | Feels lopsided — one area is sparse while others are dense |
| Consistent with a spacing system (8px grid, etc.) | Inconsistent — arbitrary padding values, no rhythm |
| The viewer's eye flows naturally through the space | The viewer's eye falls into a void and gets lost |
| Removing it would hurt the design | Removing it would improve the design |
| You can articulate WHY the space exists | You cannot explain why the space exists |

### The "Could I Put Something Here?" Test

Look at any empty area and ask: "If I put useful content here, would the page get better?" If YES, it is dead space. If NO (because the emptiness is actively helping readability or focus), it is intentional whitespace.

### Common Causes of Dead Space

**In AI-Generated Sites:**
- Uniform padding on every section (e.g., `py-24` on everything regardless of content density)
- Using `min-h-screen` on sections with only a heading and one paragraph
- Generating a "sections" template without enough content to fill each section
- Defaulting to centered narrow text columns on wide layouts without any supporting elements
- Creating card grids with placeholder counts that do not fill the last row
- Applying identical border-radius, padding, and spacing to all components ("AI slop")

**In Template-Based Sites:**
- Sections that exist in the template but have no real content for this project
- Stock photo placeholders never replaced with real imagery
- Footer with 4-column grid but only 2 columns of actual links
- Hero section designed for a tagline + subtitle + CTA + image, but only tagline was provided

**In Hand-Built Sites:**
- Developer used a CSS framework's default spacing without adjusting to content
- Sections were planned in a wireframe but content was never written
- Responsive breakpoints cause layout to collapse, creating voids
- Images are smaller than their containers

---

## 2. WHERE DEAD SPACE HAPPENS (Detection Patterns)

### Pattern 1: Between Hero and First Content Section
**What it looks like**: A massive gap after the hero, before any real content starts. Often 100-200px of nothing.
**Why it happens**: Hero has `margin-bottom` or `padding-bottom`, and the next section has `padding-top`. They stack.
**Severity**: HIGH — this is the first thing users see after the hero.

### Pattern 2: Hero Section Using `min-h-screen` With Sparse Content
**What it looks like**: A full-viewport hero with just a heading and a button, leaving 40-60% of the viewport as empty background.
**Why it happens**: AI defaults to `min-h-screen` or `h-screen` for heroes. Works great with rich content (heading + subtitle + CTA + image + trust badges). Looks barren with just a heading.
**Severity**: CRITICAL — the most common dead space pattern in AI-generated sites.

### Pattern 3: Sections With Headings But Insufficient Content
**What it looks like**: A section title like "Our Services" followed by a single short paragraph or 2 cards in a grid meant for 4.
**Why it happens**: The section was planned but content was not created, or the AI generated a section structure without enough substance.
**Severity**: HIGH — makes the site feel like a work-in-progress.

### Pattern 4: Below the Last Content Section Before the Footer
**What it looks like**: A large void between the last meaningful section and the footer. Sometimes 150px+ of background color with nothing in it.
**Why it happens**: Last section has `padding-bottom` or `margin-bottom`, footer has `padding-top`, and there is no CTA or visual element bridging the gap.
**Severity**: MEDIUM — users may not scroll here, but it looks unfinished.

### Pattern 5: Card Grids Where Cards Don't Fill the Last Row
**What it looks like**: A 3-column grid with 4 or 5 cards — the last row has 1 or 2 cards with empty space next to them.
**Why it happens**: Fixed column count with a non-divisible number of items. CSS Grid with `auto-fill` preserves empty columns.
**Severity**: MEDIUM — visually unbalanced.

### Pattern 6: Centered Text With Too-Narrow `max-width` on Wide Screens
**What it looks like**: A thin column of text (max-width: 600px) centered on a 2560px monitor, with massive empty gutters on both sides. The text itself is fine for readability, but the section around it feels barren.
**Why it happens**: Designer set a readable text width but did not add any supporting visual elements (background patterns, side illustrations, decorative elements) to fill the peripheral space.
**Severity**: MEDIUM on standard monitors, HIGH on ultrawide displays.

### Pattern 7: Between Navigation and Hero Content
**What it looks like**: A gap between the bottom of the nav bar and the top of the hero content.
**Why it happens**: Default margins on `h1` or `p` elements inside the hero, margin collapsing, or explicit `padding-top` on the hero section.
**Severity**: LOW-MEDIUM — subtle but makes the page feel disconnected.

### Pattern 8: Footer With Too Much Vertical Padding
**What it looks like**: A footer that takes up 300-400px of vertical space but contains only a few links and a copyright line.
**Why it happens**: AI applies the same generous padding to the footer as to content sections. Or a multi-column footer layout is used when there is not enough content for it.
**Severity**: MEDIUM — wastes space at the end of the page.

### Pattern 9: Empty Columns in Grids at Certain Viewport Sizes
**What it looks like**: On tablet widths, a 3-column desktop grid becomes 2 columns, leaving one item alone on its row. On mobile, stacking is fine. On desktop, 3 columns is fine. But the in-between is broken.
**Why it happens**: Responsive breakpoints were not tested at all viewport sizes.
**Severity**: MEDIUM — only visible at certain widths, but still looks broken.

### Pattern 10: After Interactive Elements With No Supporting Content Below
**What it looks like**: A form, calculator, or converter sits in a section, and below it there is nothing — just padding and then the footer.
**Why it happens**: The interactive element was the focus, and nobody thought about what comes next. No "what happens after you submit" section, no related content, no trust signals.
**Severity**: HIGH — the user completes the action and hits a void.

### Pattern 11: Around Images Too Small for Their Container
**What it looks like**: A 400x300 image sitting in a container meant for 800x600, surrounded by empty space. Or an image in a flex container that does not grow to fill available space.
**Why it happens**: Image dimensions are smaller than the container, and no `object-fit: cover` or sizing constraints are applied.
**Severity**: MEDIUM — looks like a broken layout.

### Pattern 12: Feature/Benefit Sections With Unequal Content Lengths
**What it looks like**: Three feature cards where one has a 3-line description and the others have 1 line. The short cards have visible empty space at the bottom.
**Why it happens**: Content is not normalized in length. Cards use a fixed height or stretch to the tallest card, leaving shorter cards with dead space.
**Severity**: LOW-MEDIUM — common but somewhat expected in card layouts.

### Pattern 13: Single-Column Layouts With No Visual Breaks
**What it looks like**: A long page of text sections, all with the same background color and padding, creating a monotonous scroll where sections blur together and the spaces between them feel dead rather than structural.
**Why it happens**: No alternating backgrounds, no visual dividers, no change in rhythm. The whitespace between sections has no visual purpose.
**Severity**: HIGH — makes the entire page feel flat and lifeless.

### Pattern 14: Testimonial/Logo Sections With Too Few Items
**What it looks like**: A "Trusted by" section with 2-3 logos spread across a full-width container, or a testimonials carousel with a single testimonial.
**Why it happens**: The section exists because the template includes it, but not enough real content was provided.
**Severity**: HIGH — actually hurts credibility (showing 2 logos implies you only have 2 customers).

### Pattern 15: Featured Element That Doesn't Fill Its Row
**What it looks like**: A "featured" testimonial, card, or content block that spans only 60-70% of the width, leaving a dead void on one side. The element was meant to be prominent but instead creates an awkward empty column next to it.
**Why it happens**: The element uses a max-width or fixed width that doesn't fill its grid row. Or it's in a 2-column grid but only occupies one column.
**Severity**: CRITICAL — the dead space is right next to the focal content, drawing the eye to the void.
**Fix**: Either make the featured element full-width (`col-span-full` or `w-full`), or add a supporting element in the empty space (a decorative graphic, a stat, a secondary quote, a rating badge). Never leave a featured element with dead space beside it.

```jsx
{/* BAD: Featured card only spans part of the row */}
<div className="max-w-3xl">  {/* leaves void on right */}
  <TestimonialCard featured />
</div>

{/* GOOD: Featured card spans full width */}
<div className="w-full">
  <TestimonialCard featured />
</div>

{/* ALSO GOOD: Featured card + supporting element fills the row */}
<div className="grid grid-cols-3 gap-6">
  <div className="col-span-2"><TestimonialCard featured /></div>
  <div className="flex flex-col justify-center items-center">
    <p className="text-6xl font-bold">4.9★</p>
    <p className="text-sm text-muted">from 2,400+ reviews</p>
  </div>
</div>
```

### Pattern 16: CTA Sections That Are Just a Button in an Ocean of Padding
**What it looks like**: A full-width section with a background color, containing only a single line of text and a button, with 80-120px of padding above and below.
**Why it happens**: CTA sections are given the same spacing treatment as content-heavy sections.
**Severity**: MEDIUM — the CTA should feel urgent and tight, not lost in space.

---

## 3. HOW TO FIX DEAD SPACE (Concrete Solutions)

### Fix 1: Hero-to-Content Gap
```css
/* BAD: Both sections add their own spacing */
.hero { padding-bottom: 80px; }
.first-section { padding-top: 80px; }
/* Result: 160px gap */

/* GOOD: Use consistent section spacing, collapse adjacent padding */
.hero { padding-bottom: 0; }
.first-section { padding-top: 48px; }

/* BETTER: Use gap on a parent flex container */
main {
  display: flex;
  flex-direction: column;
  gap: 48px; /* or 64px — one value controls all section spacing */
}
main > section {
  padding-top: 0;
  padding-bottom: 0;
}
```

### Fix 2: Hero `min-h-screen` With Sparse Content
```css
/* BAD */
.hero { min-height: 100vh; }

/* GOOD: Let content dictate height */
.hero {
  padding: 80px 0 64px;
  /* No min-height — content determines size */
}

/* IF you want a tall hero, fill the space: */
.hero {
  min-height: 80vh; /* Not 100vh */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically center content */
}
```
**Content fix**: If using a tall hero, ADD content to justify the height: trust badges, animated graphic, secondary description, social proof counter, or a preview image/screenshot.

### Fix 3: Sections With Insufficient Content
**Rule: If a section cannot justify 3+ meaningful elements, it should not be a standalone section.** Merge it into an adjacent section or remove it entirely.

```jsx
/* BAD: Standalone section with one line */
<section className="py-24">
  <h2>Our Mission</h2>
  <p>We build great software.</p>
</section>

/* GOOD: Merge into hero or another section */
<section className="py-16">
  <h2>Why Choose Us</h2>
  <p>We build great software.</p>
  <div className="grid grid-cols-3 gap-6 mt-8">
    <StatCard number="500+" label="Projects Delivered" />
    <StatCard number="99%" label="Client Satisfaction" />
    <StatCard number="24/7" label="Support" />
  </div>
</section>
```

### Fix 4: Gap Before Footer
```jsx
/* GOOD: End the page with a CTA section that flows into the footer */
<section className="bg-slate-900 text-white py-12 text-center">
  <h2 className="text-2xl font-bold">Ready to get started?</h2>
  <p className="mt-2 text-slate-300">Join thousands of happy customers.</p>
  <Button className="mt-6">Get Started Free</Button>
</section>
<footer className="bg-slate-950 text-slate-400 py-8">
  {/* Footer with TIGHT padding — 32px, not 80px */}
</footer>
```
**Technique**: Make the last content section and footer share a color family (dark section → darker footer) so there is no visible gap — they feel like one continuous block.

### Fix 5: Card Grids With Incomplete Last Row
```css
/* BEST: Use auto-fit so items stretch to fill */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* ALTERNATIVE: Use dense packing */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: dense;
  gap: 24px;
}
```

```css
/* For fixed-column grids, make orphan items span remaining space */
/* 3-column grid: if last item is alone, span all 3 */
.card:last-child:nth-child(3n - 2) {
  grid-column: span 3;
}
/* If 2 items on last row, make last one span 2 */
.card:last-child:nth-child(3n - 1) {
  grid-column: span 2;
}
```

**Best approach for AI-generated pages**: Choose card counts that are divisible by the column count (3, 6, 9 for 3-col; 4, 8 for 4-col). If content dictates an awkward number, use `auto-fit` with `minmax`.

### Fix 6: Narrow Centered Text on Wide Screens
```css
/* BAD: Narrow text, nothing else */
.section {
  max-width: 640px;
  margin: 0 auto;
}

/* GOOD: Wide section with constrained text */
.section {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr minmax(0, 640px) 1fr;
}
.section-content {
  grid-column: 2;
}
```

**Content fixes for wide screens:**
- Add a sidebar (table of contents, related links, quick stats)
- Use a two-column layout: text + illustration
- Add background patterns or subtle decorative elements to the gutters
- Use a full-width background color/gradient so the "empty" sides are the section's background, not void

### Fix 7: Navigation-to-Hero Gap
```css
/* Reset default margins on hero content */
.hero h1 {
  margin-top: 0;
}

/* If nav is separate from hero, remove gap */
nav { margin-bottom: 0; }
.hero { padding-top: 0; } /* or a deliberate small value like 16px */

/* BEST: Overlay nav on top of hero */
nav {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
}
.hero {
  padding-top: 80px; /* Account for nav height */
}
```

### Fix 8: Footer With Excessive Padding
```css
/* BAD */
footer { padding: 80px 0; } /* Same as content sections */

/* GOOD: Compact footer */
footer { padding: 32px 0 24px; }

/* If footer has multiple rows (links + copyright), use gap not padding */
footer {
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px 0 16px;
}
```
**Rule**: Footer padding should be 30-50% of content section padding. Footers are utility zones, not content zones.

### Fix 9: Responsive Grid Breakpoint Issues
```css
/* Use auto-fit to avoid awkward breakpoints entirely */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

/* If using fixed breakpoints, test ALL widths */
/* Mobile: 1 col, Tablet: 2 col, Desktop: 3 col */
.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### Fix 10: After Interactive Elements
**Never end a page section on an interactive element alone.** Always follow with:
```jsx
<section>
  <ContactForm />
  {/* Supporting content BELOW the form */}
  <div className="mt-8 grid grid-cols-3 gap-4 text-center text-sm text-slate-500">
    <div>
      <ShieldIcon />
      <p>Your data is secure</p>
    </div>
    <div>
      <ClockIcon />
      <p>Response within 24hrs</p>
    </div>
    <div>
      <ChatIcon />
      <p>Or chat with us live</p>
    </div>
  </div>
</section>
```

### Fix 11: Images Too Small for Containers
```css
/* Always constrain images to their container */
img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fill the container, crop if needed */
}

/* For aspect-ratio control */
.image-container {
  aspect-ratio: 16 / 9;
  overflow: hidden;
}
.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

### Fix 12: Cards With Unequal Content Lengths
```css
/* Let cards grow naturally — do NOT set fixed heights */
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  align-items: start; /* Cards are only as tall as their content */
}

/* OR: If cards must be equal height, push content to fill */
.card {
  display: flex;
  flex-direction: column;
}
.card-body {
  flex: 1; /* Body expands to fill available space */
}
.card-footer {
  margin-top: auto; /* Footer sticks to bottom */
}
```

### Fix 13: Monotonous Single-Column Layouts — The "Section Sandwich"
```jsx
/* Alternate backgrounds to create visual rhythm */
<section className="bg-white py-16">        {/* Light */}
  <Content1 />
</section>
<section className="bg-slate-50 py-16">      {/* Slightly different */}
  <Content2 />
</section>
<section className="bg-slate-900 text-white py-16"> {/* Dark break */}
  <Content3 />
</section>
<section className="bg-white py-16">        {/* Back to light */}
  <Content4 />
</section>
```

**Visual divider techniques between sections:**
- Alternate `bg-white` / `bg-slate-50` / `bg-slate-900` to create rhythm
- Use SVG wave dividers between sections with different backgrounds
- Add a thin colored accent line: `border-top: 3px solid var(--accent)`
- Use CSS gradients to transition between section backgrounds
- Insert a "stats bar" or "logo bar" as a visual break between content sections

```css
/* SVG wave divider between sections */
.section-divider {
  width: 100%;
  height: 48px;
  background: white; /* Match the section above */
}
.section-divider svg {
  display: block;
  width: 100%;
  height: 100%;
  fill: #f8fafc; /* Match the section below (slate-50) */
}
```

### Fix 14: Testimonial/Logo Sections With Too Few Items
**Rule: If you have fewer than 4 logos or 2 testimonials, do NOT create a dedicated section.** Instead:
- Inline logos as a trust bar within the hero section
- Place a single testimonial as a pull-quote within a content section
- Use a compact horizontal strip instead of a full section

```jsx
/* GOOD: Inline trust bar in hero */
<div className="mt-8 flex items-center gap-6 opacity-60">
  <span className="text-sm">Trusted by</span>
  <Logo1 className="h-6" />
  <Logo2 className="h-6" />
  <Logo3 className="h-6" />
</div>
```

### Fix 15: CTA Sections That Are Just a Button in Space
```css
/* BAD */
.cta-section { padding: 80px 0; }

/* GOOD: Tight, urgent CTA */
.cta-section { padding: 32px 0; }

/* BEST: Inline CTA strip */
.cta-strip {
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  background: var(--accent);
  border-radius: 12px;
  margin: 0 auto;
  max-width: 900px;
}
```

---

## 4. HOW TO AUDIT A PAGE FOR DEAD SPACE

### The Full-Page Screenshot Test
1. Take a full-page screenshot (browser DevTools → Ctrl+Shift+P → "Capture full size screenshot")
2. Open it in any image viewer
3. Mentally draw a rectangle around every area that has no content, no imagery, and no visual purpose
4. If any rectangle is taller than 120px AND wider than 50% of the page, it is dead space
5. If you can scroll for more than one full viewport height without seeing new content, something is wrong

### The Browser DevTools Box Model Audit
1. Open DevTools (F12)
2. Use the element picker to click on sections
3. Look at the box model diagram — padding is shown in green, margin in orange
4. If any padding value exceeds 80px on a section with fewer than 3 content elements, it is likely excessive
5. Install "Spacing Inspector" Chrome extension to visualize all margins/padding at once

### The Squint Test
1. Sit back from the screen (or squint)
2. The page should appear as a series of dense content blocks with thin separators
3. If you see large uniform-color rectangles with no content shapes inside them, those are dead space

### The Fold Test
1. Set your browser to a common viewport height (768px, 900px, 1080px)
2. At each fold (each viewport-height of scroll), there should be meaningful content visible
3. If any fold shows mostly empty space, that fold has a dead space problem

---

## 5. PREVENTION (How to Never Create Dead Space)

### Rule 1: Content-First, Containers Never
**NEVER create a section container without knowing what goes in it.** Do not create:
- An empty "testimonials" section with placeholder text
- A "services" section with fewer than 3 items
- A "team" section with one person
- Any section where the content has not been defined

If content does not exist, the section does not exist.

### Rule 2: The Minimum Content Density Rules

| Section Type | Minimum Content Required |
|---|---|
| Hero | Heading + subtext + CTA + at least ONE visual element (image, illustration, badge strip, or background) |
| Feature grid | 3+ features minimum (divisible by column count) |
| Testimonials | 3+ testimonials (dedicated section) OR 1 inline pull-quote |
| Logo/trust bar | 4+ logos (dedicated strip) OR inline in hero |
| Stats section | 3-4 stat items |
| CTA section | Heading + supporting line + button (keep padding TIGHT: 32-48px vertical) |
| About/mission | Heading + 2+ paragraphs + visual element OR merge into another section |
| Footer | Links + copyright. Padding: 24-40px vertical max |

### Rule 3: Adaptive Padding Scale
Do NOT use the same padding on every section. Use this scale:

```
Hero:                py-16 to py-24 (64-96px) — BUT only if content fills it
Content sections:    py-12 to py-16 (48-64px) — standard
Dense sections:      py-8 to py-12 (32-48px) — stats, CTAs, trust bars
Footer:              py-6 to py-8 (24-32px) — utility zone, keep tight
Between sections:    0px — let backgrounds create the separation, not padding
```

### Rule 4: Use `gap` on Parent, Not Padding on Children
```css
/* GOOD: Parent controls spacing */
main {
  display: flex;
  flex-direction: column;
  gap: 0; /* Sections touch — backgrounds create separation */
}

/* Each section handles its OWN internal padding only */
section {
  padding: 48px 24px;
}
```

### Rule 5: Background Color Alternation Is Free Real Estate
Alternating section backgrounds eliminates the perception of dead space between sections because each section clearly starts and ends at its color boundary. No gap is needed.

```
Section 1: bg-white
Section 2: bg-slate-50 (barely different — still breaks monotony)
Section 3: bg-slate-900 (dark accent — visual break)
Section 4: bg-white
Section 5: bg-slate-50
CTA: bg-accent-600
Footer: bg-slate-950
```

### Rule 6: The 8-Point Grid
Use spacing values that are multiples of 8: 8, 16, 24, 32, 48, 64, 80, 96. In Tailwind: 2, 4, 6, 8, 12, 16, 20, 24. Never use arbitrary values. Consistent spacing looks intentional; inconsistent spacing looks accidental (which IS dead space).

### Rule 7: Every Section Gets a Layout Audit Question
Before adding a section, ask:
1. Does this section have at least 3 content elements?
2. Will the content fill the width on desktop?
3. Does the padding match the content density? (Dense content → less padding, sparse content → REMOVE the section or add content)
4. Does this section's background differ from its neighbors?
5. If I took a screenshot, would I see content or void?

If any answer is "no," redesign the section before building it.

### Rule 8: Never Use `min-h-screen` Unless You Can Fill It
`min-h-screen` is for:
- Full-screen landing pages with hero image, heading, subtext, CTA, and trust badges
- Full-screen interactive experiences (dashboards, tools, canvases)
- Splash/loading screens

`min-h-screen` is NOT for:
- Sections with just a heading and paragraph
- Any section where content only fills 30-50% of viewport height
- Footers, CTAs, or utility sections

### Rule 9: Test at 3 Viewports Minimum
Always verify that no dead space appears at:
- **375px wide** (iPhone SE — mobile)
- **768px wide** (iPad — tablet)
- **1440px wide** (standard desktop)
- **1920px wide** (large desktop — check for excessive side gutters)

### Rule 10: When in Doubt, Remove the Section
If a section feels empty, the answer is not "add more padding to make it look intentional." The answer is one of:
1. **Add more content** to the section (stats, visuals, testimonials)
2. **Merge it** into an adjacent section
3. **Delete it entirely**

Option 3 is always better than leaving dead space.

---

## Quick Reference: Tailwind Spacing for Section Types

```
Hero (content-rich):     py-16 md:py-24
Hero (minimal):          py-12 md:py-16  (and ADD content or use smaller hero)
Content section:         py-12 md:py-16
Stats/trust bar:         py-8 md:py-12
CTA strip:               py-6 md:py-8
Footer:                  py-6 md:py-8
Card grid gap:           gap-4 md:gap-6
Section inner max-width: max-w-6xl mx-auto px-4 md:px-6
Text content max-width:  max-w-2xl (but within a wider section layout)
```

---

## Summary: The Dead Space Elimination Checklist

Before shipping ANY page, verify:

- [ ] No section uses `min-h-screen` unless content fills 70%+ of viewport
- [ ] No two adjacent sections have the same background color (use alternation)
- [ ] Every section has 3+ content elements
- [ ] Card grids use item counts divisible by column count, OR use `auto-fit`
- [ ] Footer padding is less than half of content section padding
- [ ] CTA sections are tight (32-48px vertical padding)
- [ ] No gap between nav and hero exceeds 16px
- [ ] Images fill their containers (`object-fit: cover` + `width: 100%`)
- [ ] Full-page screenshot shows no void taller than 120px and wider than 50%
- [ ] Every viewport (375, 768, 1440) has been checked for layout voids
- [ ] The page uses a consistent spacing scale (8-point grid)
- [ ] Sections with interactive elements have supporting content below them
