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

---

## 1. THINK (silently — do not output this to the user)

- Read the existing code. Identify the **site/app type** and match any existing design language.
- If Context7 is available: pull docs for every library you'll touch.
- **MUST READ `reference/owner-inspirations.md`** — this contains patterns from real sites the owner loves. You MUST pull at least 2 premium techniques from this file into every build. Examples: floating card compositions, odometer animations, halftone masking, watercolor textures, mega typography nav, light-to-dark scroll arcs, website-as-floating-card, selective skeuomorphism, cross-fade transitions.
- **MUST READ `reference/aesthetic-styles.md`** — 34 styles. Pick a specific numbered style. State the number in your thinking.
  - **BANNED defaults:** warm cream/editorial, plain dark mode with cyan/teal accents, centered minimal with serif italic, white background with teal buttons. These are what Claude ALWAYS picks. Choose something else.
  - If no strong cues from the user, pick from: styles 5, 8, 10, 14, 17, 21, 23, 29, 32, 34
- **MUST READ `reference/anti-slop.md`** — internalize the banned patterns before you write a single line.
- **MUST READ `reference/background-catalog.md`** for any landing page — select a background from the catalog and copy the WebP file from `assets/backgrounds/` into the project's public directory.
- Consult `reference/design-decisions.md` for your identified site type.
- If the site needs interactivity, consult `reference/advanced-interactivity.md`.

## 2. BUILD

Write the code. All of it. Complete, working, production-quality. For every component, consult the matching file in `components/`. For every design decision, consult `reference/`.

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

**Reference files:**
- [Anti-slop rules](reference/anti-slop.md) — the banned patterns list
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

### Failure checklist (if ANY are true, go back to BUILD and fix):
- [ ] Is there ANY section with a heading but no content below it? **FAIL — fill it or delete it**
- [ ] Is the color scheme teal, cyan, or indigo-on-white? **FAIL — change the palette**
- [ ] Is there a giant void of empty space anywhere on the page? **FAIL — add content or remove the section**
- [ ] Are all the cards identical? **FAIL — vary them**
- [ ] Is the layout centered and symmetrical throughout? **FAIL — break the symmetry**
- [ ] Could you swap the brand name and it'd look like any other site? **FAIL — add personality**
- [ ] Is the hero just text on a flat white/dark background with no visual texture? **FAIL — add depth**
- [ ] Is the footer just links floating in a dark void? **FAIL — give it structure**
- [ ] Are there fewer than 5 fully-built sections? **FAIL — a landing page needs density**

**"If someone said AI made this, would you believe them?"** If yes, go fix it.

## 4. FIX

Fix every issue from the review. Screenshot FULL PAGE again. If it still looks AI-generated, keep iterating. **Do not show the user until the page is COMPLETE and FULL — no empty sections, no missing content, no generic filler.**

## 5. SHIP

Show the user:
1. Screenshot of the final result
2. One sentence: the aesthetic direction and why
3. The 2-3 boldest design decisions you made
