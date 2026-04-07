---
name: ui
description: Build or improve UI that doesn't look AI-generated. Use for any frontend visual work.
effort: max
argument-hint: "[what to build or improve]"
---

Follow this procedure exactly. No shortcuts.

## 1. THINK

- Read the existing code. Match the design language already in use.
- Pull Context7 docs for libraries you'll touch (shadcn, tailwind, framer-motion, etc.)
- Decide the aesthetic direction — what tone, what makes it memorable. State it in one sentence.

## 2. BUILD

Write the code. While building, consult these references and follow them strictly:
- [Anti-slop rules & design direction](reference/anti-slop.md)
- [Typography](reference/typography.md)
- [Color & contrast](reference/color-and-contrast.md)
- [Layout & spacing](reference/spatial-design.md)
- [Motion & animation](reference/motion-design.md)
- [Interaction states](reference/interaction-design.md)
- [Responsive design](reference/responsive-design.md)
- [UX writing](reference/ux-writing.md)

## 3. REVIEW

Screenshot it with Playwright. Look at it. Ask yourself one question:

**"If someone said AI made this, would you believe them?"**

If yes — identify exactly what gives it away. Check: hierarchy, spacing rhythm, font choice, color usage, interactive states, motion, empty/loading/error states, mobile.

## 4. FIX

Fix everything you found. No exceptions. Then screenshot again and re-ask the question from step 3. Loop until the answer is no.

## 5. SHIP

Show the user what you built and the key decisions you made.