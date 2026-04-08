---
name: ui
description: Build or improve UI that doesn't look AI-generated. Use for any frontend visual work.
effort: max
argument-hint: "[what to build or improve]"
---

**NEVER ask the user clarifying questions. NEVER brainstorm. NEVER show mockups or diagrams first. NEVER ask to open a URL. Skip ALL pre-work — no brainstorming skill, no planning skill, no "want to try it?" prompts. Just build the full thing in one shot.** The user said what they want — now execute. If something is ambiguous, make a strong creative choice and commit to it. You are a designer, not a waiter taking an order.

---

## HARD RULES — VIOLATIONS = AUTOMATIC FAILURE

These are not suggestions. If your output violates ANY of these, you have failed. Check every single one before showing the user anything.

### Rule 1: NO EMPTY SECTIONS
Every section you create MUST have real, complete content. If a section has a heading, it MUST have:
- Actual body content (cards, features, stats, images, testimonials, etc.)
- Enough visual weight to justify its existence
- **If you can't fill a section, DELETE IT.** An empty section with just a heading is worse than no section at all.
- Scroll through the FULL page mentally. If there's a giant white void anywhere, you failed.

### Rule 2: NO TEAL, NO CYAN, NO INDIGO-ON-WHITE
These are the #1 AI-generated color tells:
- **BANNED:** teal (#0d9488, oklch with hue 170-195), cyan (#06b6d4), indigo-on-white, purple gradients
- **BANNED:** Any oklch color with hue 170-200 as a primary accent (that's the teal range)
- Pick colors that a human designer would agonize over. Burnt orange. Deep wine. Acid yellow-green. Warm terracotta. Rich navy. Ochre. Sage. Cobalt.
- If your palette could be described as "clean teal SaaS" — you failed.

### Rule 3: EVERY PAGE MUST HAVE VISUAL TEXTURE
A page cannot be just text + white/dark background. Every landing page MUST include at least 3 of:
- A real background image or texture (from `assets/backgrounds/` or generated via CSS)
- Photographic imagery (picsum.photos with descriptive seeds)
- A section with a contrasting background color (not just white→slightly-off-white)
- Decorative elements (grain overlay, dot patterns, geometric shapes, gradient blurs)
- A visual break between sections (not just padding — actual visual differentiation)
- Illustrations, icons with personality, or data visualizations

### Rule 4: NO IDENTICAL CARD GRIDS
If you have 3+ items to display, they CANNOT all be the same component repeated:
- Vary card sizes (one large featured, two small)
- Use a bento grid instead of uniform columns
- Mix media types (one card with an image, one with a stat, one with a quote)
- Alternate layout direction (one card horizontal, next vertical)

### Rule 5: EVERY SECTION MUST EARN ITS SPACE
Before adding a section, ask: "What visual story does this section tell?" If the answer is "it displays some text with an icon," that's not enough. Each section needs a distinct visual treatment — different background, different layout, different energy than the section before it.

### Rule 6: NO SAFE LAYOUTS
- The hero CANNOT be "left text + right widget/image" unless the widget is genuinely complex and interactive
- At least one section must break the grid (full-bleed image, overlapping elements, asymmetric split)
- Footer must have real content and visual identity, not just links floating in a dark box

### Rule 7: COPY MUST BE SPECIFIC
- No "Built for speed. Priced for scale." — that says nothing
- No "The future of X" — meaningless
- Write copy as if you're a specific human at a specific company. Name real features, real numbers, real outcomes
- Headlines should be surprising or opinionated, not corporate filler

### Rule 8: FINISH WHAT YOU START
- If you create a section, it MUST be complete with real content. No empty wrappers.
- If you're running long, build FEWER sections but make each one COMPLETE. 5 great sections beats 8 empty shells.
- Every `<section>` must have at least 3 visual elements inside it (heading + content + detail).
- After writing each section, mentally check: "If I screenshot just this section, does it look complete?" If not, finish it before moving on.

### Rule 9: CARDS IN A ROW MUST BE PERFECTLY ALIGNED
This is the #1 layout bug. When you have 2+ cards side by side:
- The grid/flex parent MUST use `items-stretch` (or Tailwind `items-stretch`) so all cards are the same height
- Each card MUST use `flex flex-col` internally
- The LAST element in each card (button, attribution, footer) MUST use `mt-auto` to push it to the bottom
- This ensures buttons align across cards, avatars align across cards, quotes start at the same position
- **Test pattern:** If card A has 2 lines of text and card B has 4 lines, the buttons should STILL be at the same Y position

```jsx
{/* CORRECT — cards align */}
<div className="grid grid-cols-3 gap-6 items-stretch">
  <div className="flex flex-col p-6 rounded-2xl border">
    <p className="text-lg">"Quote text here..."</p>
    <div className="mt-auto pt-6 flex items-center gap-3">
      <img src="..." className="w-10 h-10 rounded-full" />
      <div><p className="font-medium">Name</p><p className="text-sm text-muted">Role</p></div>
    </div>
  </div>
  {/* ... more cards with same structure */}
</div>
```

### Rule 10: NO LAYOUT OVERFLOW
- All content must be visible within the viewport width. No horizontal scrollbars.
- Floating/absolute elements must not clip outside their parent containers.
- Widgets, cards, and images must be fully visible — not cut off at the right edge.
- Test your grid: `grid-cols-12` on desktop must have a `grid-cols-1` fallback for mobile.
- Use `max-w-7xl mx-auto px-6` or similar on ALL section content containers for consistent alignment.

---

## 1. THINK (silently — do not output this to the user)

- Read the existing code. Identify the **site/app type** and match any existing design language.
- If Context7 is available: pull docs for every library you'll touch.
- **MUST READ `reference/owner-inspirations.md`** — this contains patterns from real sites the owner loves. You MUST pull at least 2 premium techniques from this file into every build. Examples: floating card compositions, odometer animations, halftone masking, watercolor textures, mega typography nav, light-to-dark scroll arcs, website-as-floating-card, selective skeuomorphism, cross-fade transitions.
- **MUST READ `reference/aesthetic-styles.md`** — 34 styles. Pick a specific numbered style. State the number in your thinking.
  - **BANNED defaults:** warm cream/editorial, plain dark mode with cyan/teal accents, centered minimal with serif italic, white background with teal buttons. These are what Claude ALWAYS picks. Choose something else.
  - If no strong cues from the user, pick from: styles 5, 8, 10, 14, 17, 21, 23, 29, 32, 34
- **MUST READ `reference/anti-slop.md`** — internalize the banned patterns before you write a single line.
- **MUST READ `reference/dead-space.md`** — the owner HATES dead space. Every pixel must earn its place. Know the 16 detection patterns and their fixes.
- **MUST READ `reference/background-catalog.md`** for any landing page — select a background from the catalog and copy the WebP file from `assets/backgrounds/` into the project's public directory.
- Consult `reference/design-decisions.md` for your identified site type.
- If the site needs interactivity, consult `reference/advanced-interactivity.md`.

## 2. BUILD

**START FROM TEMPLATES, NOT FROM SCRATCH.** Read `templates/premium-sections.md` FIRST. It contains 7 complete, production-ready React sections (hero, features, social proof, stats, CTA, footer, nav) built to the owner's taste. **Copy these templates and adapt them** — change the copy, colors, and content to match the user's request. Do NOT build sections from scratch when a template exists.

This is the single most important instruction: **adapt templates, don't invent from nothing.** Building from scratch is how you get generic AI output. The templates encode premium patterns that are hard to generate on the fly.

**Make it look like a human designer spent days on it, not like AI generated it in 10 seconds.**

### Content completeness checklist (MANDATORY for landing pages):
A landing page is NOT done until it has ALL of these filled with real content:
1. **Nav** — with personality (pill-shaped, asymmetric, sticky with scroll effect — NOT just plain text links)
2. **Hero** — with visual depth (background image/texture, not just a flat color)
3. **Social proof** — logos, testimonials, stats, or trust badges with real-looking data
4. **Features/benefits** — at least 3-4, in a NON-uniform layout (bento, varied cards, or editorial)
5. **Visual break** — a full-bleed image, gradient section, or dramatic color shift
6. **Secondary content** — pricing, how-it-works, case study, or comparison
7. **CTA section** — a strong closing section with personality, not just "Get started"
8. **Footer** — with real structure, links, and visual weight

If ANY of these sections is just a heading with no content below it — you are NOT done. Finish it.

### Specific rules:
- **Images** — use `https://picsum.photos/seed/[word]/[w]/[h]` with descriptive seeds, or `https://i.pravatar.cc/150?img=[1-70]` for avatars. Different seeds per image. Never grey boxes.
- **Backgrounds** — for hero sections, copy a background from `assets/backgrounds/` into the project's public folder and use it. Reference `reference/background-catalog.md` for which category fits.
- **Write real copy** — not lorem ipsum, not corporate fluff. Write like a real human copywriter. Short, punchy, specific, opinionated.
- **Don't be safe** — safe = generic = AI-looking. One strong opinion > ten safe defaults.

**Templates (USE THESE FIRST):**
- [Premium sections](templates/premium-sections.md) — **THE MOST IMPORTANT FILE.** 7 complete React sections (hero, bento features, social proof, stats, CTA, footer, nav) with all styles, animations, and content. Copy and adapt these instead of building from scratch.

**Reference files:**
- [Anti-slop rules](reference/anti-slop.md) — the banned patterns list
- [Dead space](reference/dead-space.md) — 16 dead space patterns, detection, and fixes. The owner HATES dead space.
- [Owner inspirations](reference/owner-inspirations.md) — premium techniques from real sites
- [Background catalog](reference/background-catalog.md) — 26 bundled backgrounds in `assets/backgrounds/`
- [Design decisions by site type](reference/design-decisions.md)
- [Aesthetic styles catalog](reference/aesthetic-styles.md)
- [Typography](reference/typography.md)
- [Color & contrast](reference/color-and-contrast.md)
- [Layout & spacing](reference/spatial-design.md)
- [Motion & animation](reference/motion-design.md)
- [Interaction states](reference/interaction-design.md)
- [Responsive design](reference/responsive-design.md)
- [UX writing](reference/ux-writing.md)
- [Advanced interactivity](reference/advanced-interactivity.md)
- [Accessibility](reference/accessibility.md)

**Component files:**
- [Buttons](components/buttons.md)
- [Forms & inputs](components/forms.md)
- [Navigation](components/navigation.md)
- [Data display](components/data-display.md)
- [Feedback & states](components/feedback.md)
- [Overlays](components/overlays.md)
- [Layout patterns](components/layout.md)
- [Micro-interactions](components/micro-interactions.md)

## 3. REVIEW

**Get eyes on it.** Use Playwright MCP to screenshot (`mcp__playwright__browser_take_screenshot`). Take a FULL PAGE screenshot. **NEVER call `mcp__playwright__browser_close`** — always leave the browser open so the user can see and interact with it.

### Layout & Alignment Check (CRITICAL — most common failure):
After screenshotting, visually inspect for these layout bugs that happen EVERY TIME:
- [ ] **Overflow/cutoff** — Is any element cut off at the edge of the viewport? (widgets, cards, images clipped on the right side). Fix with `overflow-hidden` on parent or constrain widths.
- [ ] **Centering** — Are centered sections actually centered? Check `max-w-*` + `mx-auto` on all containers.
- [ ] **Spacing consistency** — Are gaps between sections consistent? No random 500px voids.
- [ ] **Mobile responsiveness** — Does the grid collapse properly? `lg:grid-cols-*` must have a default `grid-cols-1`.
- [ ] **Z-index stacking** — Is the nav above everything? Are overlapping elements layered correctly?
- [ ] **Text readability** — Can you actually read text over background images? Add overlays if not.
- [ ] **Card alignment** — Are cards in a row the same height? Are their internal elements (text, avatars, buttons) vertically aligned across cards? Use `items-stretch` on the grid and `flex flex-col` inside cards with `mt-auto` on the bottom element to push footers down.
- [ ] **Element alignment within cards** — Quotes should start at the same Y position, avatars/names should be at the same Y position across all cards. If content varies in length, the card structure must handle it gracefully (flex-grow on the content area, not fixed heights).
- [ ] **Dropdown/select visibility** — Dropdowns MUST be allowed to overflow their parent card (they need to be visible!). Use `overflow-visible` on the parent, NOT `overflow-hidden`. The dropdown uses `position: absolute` + `z-50`. The card itself should NOT have `overflow-hidden` if it contains a dropdown. Dropdowns should not clip outside the VIEWPORT though — use `max-h` with scroll if needed.

### Content Completeness Check:
- [ ] Is there ANY section with a heading but no content below it? **FAIL — fill it or delete it**
- [ ] Is there a giant void of empty space (100px+ of nothing) anywhere? **FAIL — add content or remove the section**
- [ ] Are there fewer than 5 fully-built sections with real content? **FAIL — a landing page needs density**
- [ ] Is the color scheme teal, cyan, or indigo-on-white? **FAIL — change the palette**
- [ ] Is the hero just text on a flat white/dark background with no visual texture? **FAIL — add depth**

**"If someone said AI made this, would you believe them?"** If yes, go fix it.

## 4. FIX

Fix every issue from the review. Screenshot FULL PAGE again. If it still looks AI-generated, keep iterating. **Do not show the user until the page is COMPLETE and FULL — no empty sections, no missing content, no generic filler.**

## 5. SHIP

Show the user:
1. Screenshot of the final result
2. One sentence: the aesthetic direction and why
3. The 2-3 boldest design decisions you made
