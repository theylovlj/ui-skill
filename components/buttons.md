# Buttons

## Decision Tree

```
What is the primary goal of this action?
├── Move the user toward a key outcome (sign up, purchase, save, submit)
│   └── PRIMARY BUTTON (filled, solid color)
│       └── Rule: Only ONE primary button visible per section/screen
├── Offer an alternative or secondary action
│   ├── Alongside a primary → SECONDARY (outlined)
│   └── Low-emphasis, space-constrained → GHOST
├── Permanently destroy or remove something
│   └── DESTRUCTIVE
│       ├── Primary context (confirm screen) → filled red
│       └── Secondary context (action menu) → outlined red or ghost red
├── Navigate to a new page (not trigger an action)
│   └── LINK STYLE — use <a> not <button>
├── Action with only an icon (toolbar, compact UI)
│   └── ICON-ONLY — always requires aria-label
└── Persistent mobile action always in reach
    └── FAB (floating action button) — one per screen max
```

**Size selection:**
| Size | Use Case |
|------|----------|
| `xs` | Dense tables, inline tags, compact dashboards |
| `sm` | Secondary actions, toolbars, filter chips |
| `md` | Default — forms, cards, most UI |
| `lg` | Hero CTAs, prominent page actions |
| `xl` | Marketing landing pages only |

Never mix more than 2 button sizes in a single view.

---

## Variants

### Primary (Filled)

One per section. The highest-emphasis action. No gradient — solid color only in product UI.

```tsx
<button className="
  bg-violet-600 hover:bg-violet-700 active:bg-violet-800
  text-white font-medium text-sm
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600
  disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
">
  Save changes
</button>

// With Framer Motion press feedback
import { motion } from "framer-motion"
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: "tween", duration: 0.15 }}
  className="bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm px-4 py-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600"
>
  Save changes
</motion.button>
```

### Secondary (Outlined)

Alongside a primary button. Never the sole button on a screen.

```tsx
<button className="
  border border-zinc-300 dark:border-zinc-700
  bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50
  active:bg-zinc-100 dark:active:bg-zinc-800
  text-zinc-700 dark:text-zinc-300
  font-medium text-sm
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400
  disabled:opacity-50 disabled:cursor-not-allowed
">
  Cancel
</button>
```

### Ghost

Low visual weight. For actions that don't need prominence — sidebar items, table row actions, icon toolbars.

```tsx
<button className="
  bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800
  active:bg-zinc-200 dark:active:bg-zinc-700
  text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100
  font-medium text-sm
  px-3 py-2 rounded-md
  transition-colors duration-150
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400
">
  Edit
</button>
```

### Destructive

Permanent deletion or irreversible actions.

```tsx
// Filled — primary context (confirm deletion screen)
<button className="
  bg-red-600 hover:bg-red-700 active:bg-red-800
  text-white font-medium text-sm
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600
">
  Delete project
</button>

// Outlined — secondary context (actions dropdown, not the main action)
<button className="
  border border-red-300 dark:border-red-800
  bg-transparent hover:bg-red-50 dark:hover:bg-red-900/20
  text-red-600 dark:text-red-400
  font-medium text-sm
  px-4 py-2 rounded-md
  transition-colors duration-150
  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500
">
  Delete
</button>
```

### Icon-Only

Toolbars, compact actions. **aria-label is mandatory. No exceptions.**

```tsx
<button
  aria-label="Close dialog"
  className="
    p-2 rounded-md
    text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-200
    hover:bg-zinc-100 dark:hover:bg-zinc-800
    transition-colors duration-150
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-400
  "
>
  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
</button>
```

### Icon + Text

Icon reinforces the label. Leading icon for actions, trailing icon for navigation/links.

```tsx
// Leading icon (action)
<button className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm px-4 py-2 rounded-md transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600">
  <svg aria-hidden="true" className="w-4 h-4 shrink-0">...</svg>
  Add member
</button>

// Trailing icon (link / navigation)
<a href="/docs" className="inline-flex items-center gap-1.5 text-violet-600 hover:text-violet-700 font-medium text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 rounded">
  View docs
  <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0">...</svg>
</a>
```

### Loading State

Any async action needs a loading state. Never leave the button unresponsive.

```tsx
<button
  disabled
  aria-busy="true"
  className="flex items-center gap-2 bg-violet-600 opacity-75 cursor-wait text-white font-medium text-sm px-4 py-2 rounded-md"
>
  <svg aria-hidden="true" className="w-4 h-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Saving...
</button>
```

### Toggle Button

Binary state (bold/italic, active/inactive filter). Uses `aria-pressed`.

```tsx
function ToggleButton({ label }: { label: string }) {
  const [active, setActive] = React.useState(false)
  return (
    <button
      aria-pressed={active}
      onClick={() => setActive(!active)}
      className={`
        font-medium text-sm px-3 py-1.5 rounded-md transition-colors duration-150
        focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500
        ${active
          ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300'
          : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
        }
      `}
    >
      {label}
    </button>
  )
}
```

---

## All 8 Interactive States

| State | Visual | Implementation |
|-------|--------|----------------|
| **Default** | Base color, full opacity | Base classes |
| **Hover** | Slightly darker bg | `hover:bg-*-700` + `transition-colors duration-150` |
| **Focus** | 2px outline, 2px offset | `focus-visible:outline-2 focus-visible:outline-offset-2` |
| **Active** | Noticeably darker (pressed) | `active:bg-*-800` |
| **Disabled** | 50% opacity, not-allowed cursor | `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` |
| **Loading** | Spinner + updated label | `aria-busy="true"` + `disabled` + spinner icon |
| **Error** | Red variant or error icon | Use destructive variant or add red ring |
| **Success** | Green check, brief confirmation | Auto-resets after 2s, `aria-live="polite"` for announcement |

---

## What AI Gets Wrong

- **Every button is primary** — no visual hierarchy, all equally loud. One primary per screen.
- **Gradient fills** on primary buttons in product/app UI — gradient is a marketing pattern, not a default.
- **`rounded-full` everywhere** — pill shape is a design decision, not a default. Dashboards use `rounded-md`.
- **Missing loading state** — the button just freezes during async actions. Always show feedback.
- **Icon gap wrong** — should be `gap-2` (8px) for icon+text. Too tight or too loose looks unpolished.
- **`disabled` without `cursor-not-allowed`** — disabled prop removes pointer-events but not the cursor style in all browsers.
- **No `focus-visible`** — either no focus ring (a11y failure) or ring shows on mouse click (ugly). Use `focus-visible:`.
- **Destructive same style as safe actions** — users can't distinguish danger from normal actions.
- **`onClick` on `<div>` or `<span>`** — always use `<button>` for actions. Gets keyboard support for free.
- **Toggle buttons missing `aria-pressed`** — screen readers can't tell if it's on or off.

---

## Accessibility Requirements

- `<button>` for actions, `<a href>` for navigation — never swap them
- Every button must have an accessible name (visible text or `aria-label`)
- Icon-only: `aria-label` on button, `aria-hidden="true"` on the SVG
- Loading: `aria-busy="true"` + `disabled` attribute (not just visual)
- Toggle: `aria-pressed="true/false"` — updates on state change
- Disabled: use HTML `disabled` attribute (removes from tab order) + visual styles
- Focus ring: `focus-visible:` — visible for keyboard, hidden for mouse
- Minimum size: 44×44px touch target (use padding to achieve without affecting visual size)
