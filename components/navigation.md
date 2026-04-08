# Navigation

## Decision Tree

```
How many top-level destinations?
├── 2-4 items
│   ├── Content/marketing site → Top nav (horizontal links)
│   └── App with context switching → Tabs
├── 5-7 items
│   ├── Desktop app, data-dense → Sidebar (collapsible)
│   ├── Marketing site → Top nav (with dropdown mega-menu if needed)
│   └── Mobile-first → Bottom nav tabs (max 5 items)
└── 8+ items
    ├── Split into groups → Sidebar with sections
    └── Flat with search → Command palette (Cmd+K) as primary nav

Is content hierarchical (parent → child pages)?
├── Yes, 2 levels → Sidebar with nested items (collapsed by default)
├── Yes, 3+ levels → Redesign IA — don't go 3+ levels deep
└── No → Flat nav, no nesting needed

Mobile context?
├── Simple app (2-4 destinations) → Bottom nav tabs
├── Complex app (5+ destinations) → Hamburger + drawer (right side)
└── Content site → Hamburger + fullscreen overlay or top drawer
```

---

## Variants

### Top Navigation
**When to use:** Marketing sites, content sites, apps with 3-5 top-level sections, when branding prominence matters.

**When NOT to use:** Data-dense dashboards (sidebar gives more persistent context), mobile-first apps (bottom nav or drawer).

**Structure:**
- Logo left, links center or right, CTA button rightmost
- Max 5-6 nav items before it feels crowded
- Active state: bold weight + accent underline (not just color change)
- Sticky on scroll for apps; non-sticky for editorial

**The premium pattern — transparent on load, frosted glass on scroll:**

```css
/* CSS approach */
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  transition: background 200ms ease, backdrop-filter 200ms ease, border-color 200ms ease;
  border-bottom: 1px solid transparent;
}
.nav.scrolled {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}
```

```jsx
// React: transparent top, frosted glass after 60px scroll
'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-200",
        scrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Logo />
        <div className="hidden items-center gap-1 md:flex">
          {links.map(link => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <a href="/login" className="text-sm text-white/70 hover:text-white transition-colors">Sign in</a>
          <a href="/signup" className="text-sm font-medium bg-white text-black px-4 py-2 rounded-md hover:bg-white/90 transition-colors">
            Get started
          </a>
        </div>
      </div>
    </nav>
  );
}
```

**Link style rules:**
- `text-sm font-medium` — 14px, weight 500
- `opacity: 0.7` at rest, `opacity: 1.0` on hover, `transition: 150ms`
- NO underline on hover. NO box shadow. Just opacity change.
- CTA button: filled, accent color — same button as hero CTA for consistency

**Anti-pattern:** Solid background nav with `box-shadow: 0 2px 8px rgba(0,0,0,0.1)` — looks like a 2019 Bootstrap template.

---

### Sidebar (Full)
**When to use:** Dashboards, admin panels, apps with 5+ nav destinations, when persistent context matters.

**When NOT to use:** Marketing sites, mobile-only apps, anything under 5 nav items.

**States:**
- Expanded (240px): icon + label
- Collapsed (60px): icon only, tooltip on hover
- Mobile: hidden by default, triggered by hamburger

```jsx
<aside className={cn(
  "flex h-full flex-col border-r border-white/10 bg-background transition-all duration-200",
  collapsed ? "w-[60px]" : "w-[240px]"
)}>
  <div className="flex h-16 items-center justify-between px-4">
    {!collapsed && <Logo />}
    <CollapseButton onClick={toggleCollapse} />
  </div>
  <nav className="flex-1 overflow-y-auto px-2 py-4">
    {sections.map(section => (
      <NavSection key={section.label} section={section} collapsed={collapsed} />
    ))}
  </nav>
  <UserMenu collapsed={collapsed} />
</aside>
```

**Active state:** Background fill (not just color change) — `bg-white/10` in dark mode, `bg-black/5` in light mode. Left border accent: `border-l-2 border-primary`.

---

### Bottom Navigation (Mobile)
**When to use:** Mobile-first apps with 3-5 primary destinations, when thumb reachability matters.

**When NOT to use:** Desktop apps, content sites, more than 5 items (tabs become too small).

**Rules:**
- 3-5 items only — never more
- Icon + short label (1 word)
- Active: filled icon + accent color (not just icon change)
- Touch target: 44px minimum height
- Safe area padding for iOS (env(safe-area-inset-bottom))

```jsx
<nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-background pb-[env(safe-area-inset-bottom)]">
  <div className="flex h-16 items-center justify-around">
    {tabs.map(tab => (
      <Link key={tab.href} href={tab.href}
        className={cn(
          "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1 px-3",
          pathname === tab.href ? "text-primary" : "text-muted-foreground"
        )}>
        <tab.icon className={cn("h-5 w-5", pathname === tab.href && "fill-primary")} />
        <span className="text-[10px] font-medium">{tab.label}</span>
      </Link>
    ))}
  </div>
</nav>
```

---

### Breadcrumbs
**When to use:** When users are 2+ levels deep in a hierarchy, file systems, e-commerce category pages, multi-step settings.

**When NOT to use:** Single-level apps, dashboards where full path is already clear from sidebar.

**Rules:**
- Current page is the last item — never a link, slightly muted text
- Use `>` or `/` separator, not `→` (arrow implies directionality, not hierarchy)
- Collapse middle items on mobile: `Home / ... / Current Page`
- Never more than 5 levels — if you have more, your IA is broken

```jsx
<nav aria-label="Breadcrumb">
  <ol className="flex items-center gap-1 text-sm text-muted-foreground">
    {crumbs.map((crumb, i) => (
      <li key={crumb.href} className="flex items-center gap-1">
        {i > 0 && <span aria-hidden>/</span>}
        {i < crumbs.length - 1
          ? <Link href={crumb.href} className="hover:text-foreground">{crumb.label}</Link>
          : <span className="text-foreground" aria-current="page">{crumb.label}</span>
        }
      </li>
    ))}
  </ol>
</nav>
```

---

### Tabs
**When to use:** Switching between views of the same content (not different destinations), when all tabs are equally common, when content doesn't require separate URLs.

**When NOT to use:** Main app navigation (use sidebar/top nav), more than 6 tabs (use select dropdown instead), when one tab is significantly more used.

**Types:**
- **Underline tabs** — editorial, dashboards, clean apps
- **Pill/segment tabs** — compact, filter-like (iOS control style)
- **Card tabs** — heavy UI, admin panels

**Rules:**
- Active tab is visually unambiguous (not just slightly bolder)
- Tab panel has `role="tabpanel"` and `aria-labelledby`
- Keyboard: Arrow keys navigate tabs, Enter/Space activates

```jsx
// Underline tabs
<div className="border-b border-white/10">
  <div className="flex gap-6" role="tablist">
    {tabs.map(tab => (
      <button key={tab.id}
        role="tab"
        aria-selected={activeTab === tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={cn(
          "-mb-px border-b-2 pb-3 text-sm font-medium transition-colors",
          activeTab === tab.id
            ? "border-primary text-foreground"
            : "border-transparent text-muted-foreground hover:text-foreground"
        )}>
        {tab.label}
        {tab.count && <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-xs">{tab.count}</span>}
      </button>
    ))}
  </div>
</div>
```

---

### Stepper (Multi-step Navigation)
**When to use:** Multi-step flows (checkout, onboarding, setup wizard) where order matters and progress tracking adds value.

**When NOT to use:** Simple 2-step flows (just use back/next), non-linear flows where order doesn't matter.

**Rules:**
- Show all steps upfront (5 max before it's overwhelming)
- Completed steps are clickable (allow going back)
- Current step is visually prominent
- Never hide how many steps remain — users abandon when they can't see the end

```jsx
<div className="flex items-center">
  {steps.map((step, i) => (
    <Fragment key={step.id}>
      <div className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
        i < currentStep ? "bg-primary text-primary-foreground cursor-pointer" : // completed
        i === currentStep ? "bg-primary text-primary-foreground" : // active
        "bg-white/10 text-muted-foreground" // upcoming
      )}
        onClick={() => i < currentStep && goToStep(i)}>
        {i < currentStep ? <CheckIcon className="h-4 w-4" /> : i + 1}
      </div>
      {i < steps.length - 1 && (
        <div className={cn("h-px flex-1 mx-2", i < currentStep ? "bg-primary" : "bg-white/10")} />
      )}
    </Fragment>
  ))}
</div>
```

---

### Command Palette (Cmd+K)
**When to use:** Power-user apps with many destinations or actions, as a secondary nav layer, when users know what they want but the path is buried.

**When NOT to use:** Simple apps with 5 or fewer destinations, consumer apps where Cmd+K is unfamiliar.

**Rules:**
- Global keyboard shortcut: `Cmd+K` (Mac) / `Ctrl+K` (Windows)
- Search across nav items, actions, and recent pages
- Results grouped by type (Pages, Actions, Recent)
- Escape closes, Arrow keys navigate, Enter activates
- Shows keyboard shortcut in result when one exists

---

### Pagination
**When to use:** Long lists where you know the total count, search results, tables.

**When NOT to use:** Feeds/social content (infinite scroll), short lists under 20 items.

**Decision: Pagination vs Infinite Scroll:**
```
Can users link to a specific page? → Pagination
Is content feed-like (social, news)? → Infinite scroll
Is content task-like (search results, tables)? → Pagination
Do users need to find their place again? → Pagination
```

```jsx
<nav aria-label="Pagination" className="flex items-center justify-between">
  <p className="text-sm text-muted-foreground">
    Showing {start}–{end} of {total} results
  </p>
  <div className="flex items-center gap-1">
    <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
      Previous
    </Button>
    {/* Page numbers — show max 7, ellipsis for gaps */}
    <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
      Next
    </Button>
  </div>
</nav>
```

---

## States

All navigation items need:
- **Default**: base style
- **Hover**: subtle background shift (`bg-white/5`), no text color change alone
- **Active/current**: clear differentiation — background + weight + color
- **Focus**: visible ring (`ring-2 ring-primary ring-offset-2`), never remove outline
- **Disabled**: `opacity-40 cursor-not-allowed pointer-events-none`

---

## What AI Gets Wrong

- **Active state barely different from default** — a slight color shift is not enough. Background fill or bold weight is required.
- **No mobile navigation** — desktop-only nav with no mobile consideration.
- **Nested nav 3+ levels deep** — signals broken IA. Flatten it.
- **Missing keyboard navigation** — Arrow keys should move between menu items, Home/End for first/last.
- **No skip link** — keyboard users need `<a href="#main-content" className="sr-only focus:not-sr-only">Skip to content</a>` as the first focusable element.
- **Sidebar with no collapsed state** — wastes space on smaller desktops.
- **Hamburger with no visible state when open** — hamburger should visually transform to X.
- **Tabs used for main navigation** — tabs are for view-switching, not app-level navigation.
- **No visual feedback for current page in breadcrumbs** — the current item should be `aria-current="page"` and visually distinct.

---

## Accessibility Requirements

- Top nav: `<nav aria-label="Main navigation">`, active link has `aria-current="page"`
- Sidebar: `<nav aria-label="Sidebar">`, collapsed state uses `aria-expanded`
- Dropdown menus: `role="menu"`, items use `role="menuitem"`, escape closes, arrow keys navigate
- Tabs: `role="tablist"`, `role="tab"`, `aria-selected`, `role="tabpanel"`, `aria-labelledby`
- Breadcrumbs: `<nav aria-label="Breadcrumb">`, last item has `aria-current="page"`
- Mobile drawer: focus trapped when open, `aria-modal="true"`, escape closes
- Skip link: first element in `<body>`, visible on focus, links to `#main-content`