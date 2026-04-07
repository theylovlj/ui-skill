---
name: ui
description: Build or improve UI that doesn't look AI-generated. Use for any frontend visual work.
effort: max
argument-hint: "[what to build or improve]"
---

Follow this procedure exactly. No shortcuts.

## 1. THINK

- Read the existing code. Identify the **site/app type**: marketing site / SaaS dashboard / e-commerce / editorial / internal tool / portfolio / mobile-first app. This unlocks the decision trees.
- Match the design language already in use (fonts, colors, spacing, border-radius personality).
- Pull Context7 docs for every library you'll touch (shadcn, tailwind, framer-motion, radix, etc.).
- Decide the aesthetic direction — what tone, what makes it memorable. **State it in one sentence before writing any code.**
- Consult `reference/design-decisions.md` for your identified site type to lock in style defaults.

## 2. BUILD

Write the code. For every component you touch, consult the matching file in `components/`. For every design decision, consult `reference/`. Follow them strictly.

**Reference files:**
- [Anti-slop rules](reference/anti-slop.md) — read this first, every time
- [Design decisions by site type](reference/design-decisions.md)
- [Typography](reference/typography.md)
- [Color & contrast](reference/color-and-contrast.md)
- [Layout & spacing](reference/spatial-design.md)
- [Motion & animation](reference/motion-design.md)
- [Interaction states](reference/interaction-design.md)
- [Responsive design](reference/responsive-design.md)
- [UX writing](reference/ux-writing.md)
- [Accessibility](reference/accessibility.md)

**Component files:**
- [Buttons](components/buttons.md)
- [Forms & inputs](components/forms.md)
- [Navigation](components/navigation.md)
- [Data display](components/data-display.md)
- [Feedback & states](components/feedback.md)
- [Overlays](components/overlays.md)
- [Layout patterns](components/layout.md)

## 3. REVIEW

Screenshot it with Playwright. Look at it. Ask yourself one question:

**"If someone said AI made this, would you believe them?"**

If yes — work through this checklist and identify every specific failure:

- [ ] Visual hierarchy: can you squint and still identify the 1st and 2nd most important elements?
- [ ] Spacing rhythm: does spacing vary intentionally, or is everything equally spaced?
- [ ] Font choice: are you using a banned font (Inter, Roboto, Space Grotesk, Montserrat)?
- [ ] Color usage: purple gradient? cyan on dark? pure black or white? gray text on color?
- [ ] All 8 interactive states present: default, hover, focus, active, disabled, loading, error, success?
- [ ] Motion: ease-out-quart only? transform+opacity only? no bounce/elastic?
- [ ] Empty state: does it acknowledge + explain value + offer an action?
- [ ] Loading state: skeleton screen (not spinner) for content-shaped UI?
- [ ] Error state: specific message, not "Something went wrong"?
- [ ] Mobile: tested at 375px? touch targets 44px+? no hover-only interactions?
- [ ] Anti-slop check: re-read `reference/anti-slop.md` and `components/[component].md` "What AI gets wrong" section

## 4. FIX

Fix every failure from the checklist. No exceptions. Screenshot again, re-run the checklist. Loop until every item passes and the answer to the question is **no**.

## 5. SHIP

Show the user:
1. Screenshot of the final result
2. The aesthetic direction you chose and why
3. The 3 most important design decisions you made
4. Any tradeoffs or limitations to be aware of
