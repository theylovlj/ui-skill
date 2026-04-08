---
name: ui
description: Build or improve UI that doesn't look AI-generated. Use for any frontend visual work.
effort: max
argument-hint: "[what to build or improve]"
---

**NEVER ask the user clarifying questions. NEVER brainstorm. NEVER show mockups or diagrams first. NEVER ask to open a URL. Skip ALL pre-work — no brainstorming skill, no planning skill, no "want to try it?" prompts. Just build the full thing in one shot.** The user said what they want — now execute. If something is ambiguous, make a strong creative choice and commit to it. You are a designer, not a waiter taking an order.

## 1. THINK (silently — do not output this to the user)

- Read the existing code. Identify the **site/app type** and match any existing design language.
- If Context7 is available: pull docs for every library you'll touch.
- **Consult `reference/owner-inspirations.md`** — this contains patterns from real sites the owner loves. Look for techniques that fit your current build (floating cards, odometer animations, halftone masking, mega typography, light-to-dark arcs, etc.). Pull at least one premium technique from this file into every build.
- **Select an aesthetic style.** Consult `reference/aesthetic-styles.md` — there are 34 styles. You MUST actually read the file and pick a specific numbered style. DO NOT default to warm cream editorial, minimal serif, or any "safe" palette. Use the following process:
  1. Read the user's prompt for personality cues (dark? playful? techy? luxury? chaotic?)
  2. Match those cues to a specific style number from the catalog
  3. If no strong cues exist, pick something BOLD and unexpected — styles 5, 8, 10, 14, 17, 21, 23, 29, 32, 34 are all strong choices that avoid the generic trap
  4. **BANNED defaults:** Do not pick warm cream/editorial (styles that look like a design agency portfolio), do not pick plain dark mode with cyan accents, do not pick centered minimal with serif italic. These are the styles Claude always gravitates to — pick something else.
  5. State which style number you chose in your silent thinking so you commit to it
- Consult `reference/design-decisions.md` for your identified site type.
- If the site needs interactivity, consult `reference/advanced-interactivity.md` before writing code.
- Read `reference/anti-slop.md` — internalize the banned patterns before you write a single line.

## 2. BUILD

Write the code. All of it. Complete, working, production-quality. For every component, consult the matching file in `components/`. For every design decision, consult `reference/`.

**Make it look like a human designer spent days on it, not like AI generated it in 10 seconds.**

Specific rules:
- **Images** — only add them if the design genuinely needs them (hero sections, team pages, product showcases, portfolios). Don't force images into dashboards, forms, or data-heavy tools. When images ARE needed, use real photos from `https://picsum.photos/seed/[word]/[w]/[h]` or `https://i.pravatar.cc/150?img=[1-70]` for avatars. Use different seeds per image. Never use grey boxes or empty `src`.
- **Don't preview images individually** — just pick good descriptive seed words that match the content context.
- **Write real copy** — not "Lorem ipsum" and not generic "Welcome to our platform". Write copy that sounds like a real person at a real company wrote it. Short, punchy, specific.
- **Don't be safe** — safe = generic = AI-looking. Make a bold choice: unusual color, asymmetric layout, distinctive type, surprising spacing. One strong opinion is worth more than ten safe defaults.

**Reference files:**
- [Anti-slop rules](reference/anti-slop.md) — the banned patterns list
- [Owner inspirations](reference/owner-inspirations.md) — patterns from sites the owner loves. Consult this for premium techniques (floating cards, odometer animations, halftone masking, watercolor textures, mega typography nav, light-to-dark scroll arcs, etc.)
- [Background catalog](reference/background-catalog.md) — 26 premium backgrounds bundled in `assets/backgrounds/`. When building hero sections, pick one from the catalog by category (dark cinematic, abstract gradient, pastoral, fantasy, etc.) and copy it into the project.
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

**Get eyes on it.** Use Playwright MCP to screenshot (`mcp__playwright__browser_take_screenshot`). **NEVER call `mcp__playwright__browser_close`** — always leave the browser open so the user can see and interact with it.

Self-check (do not output this checklist to the user):
- Does it look like a template? If yes, you failed — go back and add personality.
- Is the layout centered and symmetrical? Break it.
- Are all the cards identical? Vary them.
- Is it using a banned font? Change it.
- Purple gradient anywhere? Remove it.
- Could you swap the brand name and it'd look like any other site? That means it's generic — fix it.

**"If someone said AI made this, would you believe them?"** If yes, go fix it before showing the user.

## 4. FIX

Fix every issue you found in review. Screenshot again. If it still looks AI-generated, keep iterating. Don't show the user until it's genuinely good.

## 5. SHIP

Show the user:
1. Screenshot of the final result
2. One sentence: the aesthetic direction and why
3. The 2-3 boldest design decisions you made
