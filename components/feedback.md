# Feedback & States

## Decision Tree

```
What feedback scenario is this?
│
├── User completed an action successfully
│   ├── Transient confirmation, no follow-up needed → Toast (auto-dismissing)
│   └── Important status change that persists → Inline success state
│
├── Something went wrong
│   ├── Full page blocked (auth error, 404) → Error page
│   ├── Form field invalid → Inline field error (not a toast)
│   ├── An action failed but page still works → Toast (error variant) or inline alert
│   └── Service-wide outage → Page-level banner (persistent)
│
├── Warning / user should know something
│   ├── Blocking (must resolve to proceed) → Inline alert with action
│   └── Informational (can ignore) → Dismissible banner or toast
│
├── Content is loading
│   ├── Content-shaped UI loading → Skeleton screen
│   ├── Action in progress (button clicked) → Button loading state
│   ├── File upload / long operation → Progress bar
│   └── Indeterminate wait (no known end) → Spinner (sparingly)
│
└── No content to show
    ├── First-time empty (user hasn't added anything) → Onboarding empty state
    └── Filtered empty (search/filter returned nothing) → Filter-empty state
```

---

## Toasts

**When to use:** Transient, non-blocking feedback for completed actions. Auto-dismisses. User can continue working.

**When NOT to use:**
- Errors that require action (use an alert instead)
- Form validation errors (show inline next to the field)
- Confirmations for destructive actions (show a modal instead)
- Information that users will need to reference

### Position
- **Default:** top-right
- **Mobile:** top-center or bottom-center (thumb-reachable dismiss)
- **Never:** bottom-left (hardest corner to reach on both desktop and mobile)

### Duration Rules
- Success: 4 seconds auto-dismiss
- Error: 6 seconds (users need more time to read errors), or persistent with manual dismiss
- Info/Warning: 5 seconds
- Always: manual dismiss (×) available regardless of auto-dismiss

### Stacking
- Max 3 visible at once — oldest dismisses first when limit is exceeded
- Stack downward from top-right, newest on top
- Each toast is independent — clicking one doesn't dismiss others

```jsx
// Toast variants
const toastVariants = {
  success: {
    icon: <CheckCircleIcon className="h-5 w-5 text-emerald-500" />,
    className: "border-emerald-500/20 bg-emerald-500/10",
  },
  error: {
    icon: <XCircleIcon className="h-5 w-5 text-red-500" />,
    className: "border-red-500/20 bg-red-500/10",
    duration: 6000,
  },
  warning: {
    icon: <AlertTriangleIcon className="h-5 w-5 text-amber-500" />,
    className: "border-amber-500/20 bg-amber-500/10",
    duration: 5000,
  },
  info: {
    icon: <InfoIcon className="h-5 w-5 text-blue-500" />,
    className: "border-blue-500/20 bg-blue-500/10",
  },
};

// Action in toast: only for simple, single-step undos
toast.success("Message deleted", {
  action: {
    label: "Undo",
    onClick: () => restoreMessage(id),
  }
});
```

### What NOT to put in toasts
- Multi-step actions ("Click here to configure your settings")
- Long messages (over ~80 characters)
- Content users will need to copy
- Critical errors that block the user

---

## Alerts & Banners

### Inline Alerts (within content)
**When to use:** Warnings or info that's contextually relevant to the content around it. Persists until condition resolves.

```jsx
// Semantic colors — not just red=bad
const alertVariants = {
  info: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
  warning: "border-amber-500/20 bg-amber-500/10 text-amber-400",
  error: "border-red-500/20 bg-red-500/10 text-red-400",
};

<div role="alert" className={cn(
  "flex gap-3 rounded-lg border p-4",
  alertVariants[variant]
)}>
  <AlertIcon className="mt-0.5 h-5 w-5 shrink-0" />
  <div className="flex-1">
    {title && <p className="font-semibold">{title}</p>}
    <p className="text-sm">{message}</p>
    {action && (
      <button onClick={action.onClick} className="mt-2 text-sm font-medium underline underline-offset-4">
        {action.label}
      </button>
    )}
  </div>
  {dismissible && (
    <button onClick={onDismiss} aria-label="Dismiss">
      <XIcon className="h-4 w-4" />
    </button>
  )}
</div>
```

### Page-Level Banners
**When to use:** Site-wide announcements, maintenance notices, service degradation — things that affect the whole experience.

**Position:** Above the navigation (very top of page), full-width.

**Rules:**
- Use sparingly — if everything is highlighted, nothing is
- Provide a dismiss mechanism unless the condition must remain visible
- Keep text short — one sentence maximum, link to more details if needed

```jsx
<div className="bg-amber-500 px-4 py-2 text-center text-sm font-medium text-amber-950">
  Scheduled maintenance on April 12, 2–4 AM UTC.{' '}
  <a href="/status" className="underline">Check status →</a>
  <button onClick={dismiss} aria-label="Dismiss" className="absolute right-4 top-1/2 -translate-y-1/2">
    <XIcon className="h-4 w-4" />
  </button>
</div>
```

---

## Empty States

Empty states are onboarding moments. A blank page is a failure; a good empty state teaches.

### The 3-Part Formula
1. **Acknowledge** — brief, not apologetic ("No projects yet")
2. **Value prop** — why filling this is worthwhile ("Projects let you organize your work and share with your team")
3. **Action** — a clear CTA to fill the empty state ("Create your first project")

### First-Time Empty vs Filter-Empty

**First-time empty** (user hasn't created anything yet):
- Illustration or icon to break the blankness
- Explanation + value prop
- Primary CTA
- Optional: link to docs or getting started guide

**Filter/search empty** (data exists but no results match):
- "No results for [search term]" — always include what they searched for
- Suggest adjustments: "Try removing filters" with a clear-filters button
- NO illustration needed — this is a functional state, not an onboarding moment

```jsx
// First-time empty
<div className="flex flex-col items-center justify-center py-20 text-center">
  <div className="mb-4 rounded-full bg-white/5 p-5">
    <FolderIcon className="h-10 w-10 text-muted-foreground" />
  </div>
  <h3 className="text-lg font-semibold">No projects yet</h3>
  <p className="mt-2 max-w-sm text-sm text-muted-foreground">
    Projects help you organize your work and collaborate with your team.
    Create your first one to get started.
  </p>
  <Button className="mt-6" onClick={openCreateDialog}>
    <PlusIcon className="mr-2 h-4 w-4" />
    Create project
  </Button>
</div>

// Filter empty
<div className="flex flex-col items-center justify-center py-16 text-center">
  <p className="font-medium">No results for "{searchTerm}"</p>
  <p className="mt-1 text-sm text-muted-foreground">
    Try adjusting your search or{' '}
    <button onClick={clearFilters} className="underline underline-offset-4 hover:text-foreground">
      clear all filters
    </button>
  </p>
</div>
```

---

## Loading States

### Which Loading Pattern

| Scenario | Pattern |
|---|---|
| Page or section content loading | Skeleton screen |
| Button action in progress | Button loading state (spinner in button) |
| Known-duration operation (upload, export) | Progress bar with % |
| Indeterminate global load | Full-page spinner (sparingly) |
| Table/list loading | Skeleton rows matching expected count |
| Image loading | Blurred placeholder or skeleton |

### Skeleton Screens (preferred for content)
Skeleton screens feel faster than spinners because they show the structure of what's coming. Match the skeleton to the real content shape.

```jsx
// Skeleton should mirror the real content layout
function StatCardSkeleton() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <div className="h-4 w-32 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-8 w-24 animate-pulse rounded bg-white/10" />
      <div className="mt-3 h-3 w-20 animate-pulse rounded bg-white/10" />
    </div>
  );
}

// Shimmer effect — more polished than simple pulse
const shimmer = `
  relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full
  before:animate-[shimmer_1.5s_infinite]
  before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent
`;
```

### Progress Bars
Use when the operation has a known duration or measurable progress.

```jsx
<div className="space-y-2">
  <div className="flex items-center justify-between text-sm">
    <span className="text-muted-foreground">Uploading design assets...</span>
    <span className="tabular-nums font-medium">{progress}%</span>
  </div>
  <div className="h-2 overflow-hidden rounded-full bg-white/10">
    <div
      className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  </div>
  {timeRemaining && (
    <p className="text-xs text-muted-foreground">About {timeRemaining} remaining</p>
  )}
</div>
```

---

## Error States

### Three Types — Each Gets Different Treatment

**User error** (they did something wrong — form, validation):
- Inline, next to the problem
- Specific: "Email must include @" not "Invalid email"
- Don't use red toasts for form errors

**Client error** (network, offline):
- Show connectivity state
- Offer retry
- Don't blame the user
- Copy: "Couldn't connect. Check your internet and try again."

**Server error** (5xx, our fault):
- Apologize briefly, don't be vague
- Offer retry or alternative
- Copy: "Something went wrong on our end. We're looking into it."
- Log the error ID if possible: "Error code: ERR_5821 — Share this with support if the issue persists"

```jsx
// Full-section error state
<div className="flex flex-col items-center justify-center py-16 text-center">
  <div className="mb-4 rounded-full bg-red-500/10 p-4">
    <AlertCircleIcon className="h-8 w-8 text-red-500" />
  </div>
  <h3 className="font-semibold">Couldn't load your projects</h3>
  <p className="mt-2 text-sm text-muted-foreground">
    Something went wrong on our end. Try refreshing the page.
  </p>
  <div className="mt-6 flex gap-3">
    <Button variant="outline" onClick={() => window.location.reload()}>
      Refresh page
    </Button>
    <Button variant="ghost" asChild>
      <a href="/status">Check status</a>
    </Button>
  </div>
</div>
```

---

## What AI Gets Wrong

- **Toast in bottom-left** — bottom-left is the hardest corner to reach with both mouse and thumb. Always top-right (desktop) or top/bottom-center (mobile).
- **Generic "Loading..." text** — every loading state says "Loading..." No specificity. "Fetching your projects..." is better.
- **Empty state with just "No items found"** — missed onboarding opportunity. Every empty state should acknowledge + explain + provide an action.
- **Same loading pattern for all scenarios** — spinner for everything, including content that would benefit from a skeleton.
- **Error toast for form validation** — form field errors should appear inline next to the field, not as a toast.
- **"Something went wrong" as a complete error message** — tells users nothing. What went wrong? Can they retry? Is it their fault?
- **Toast for destructive actions** — "Are you sure?" moments need a confirmation dialog, not a toast.
- **Alert with no way to dismiss** — if an alert is informational (not critical), give users a way to dismiss it.
- **Persistent spinner with no progress** — if an operation takes more than 2 seconds, show a progress bar or at minimum an estimated time.

---

## Accessibility Requirements

- Toasts: `role="status"` for success/info, `role="alert"` for errors/warnings. Announce to screen readers without interrupting user flow.
- Alerts: `role="alert"` for errors, `role="status"` for success. `aria-live="polite"` for non-urgent, `aria-live="assertive"` for critical errors.
- Progress bars: `role="progressbar"`, `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label`
- Skeletons: `aria-busy="true"` on the container while loading, `aria-label="Loading [content type]"` or `aria-hidden="true"` so screen readers don't announce skeleton content
- Empty states: the CTA button must be keyboard-reachable and have a descriptive label ("Create project" not just "Create")
- Toast dismissal: `Escape` key should dismiss the most recent toast, dismiss button has `aria-label="Dismiss"`