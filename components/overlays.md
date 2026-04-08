# Overlays

## Decision Tree

```
Does the user need to complete an action before continuing?
├── Yes, truly blocking → Modal dialog
└── No, contextual help or selection
    ├── Interactive content (form, picker, menu) → Popover
    ├── Simple info/label (no interaction) → Tooltip
    ├── Long-form task without leaving page → Drawer/Sheet
    └── Multiple items from a list → Dropdown menu

Modal vs Drawer:
├── Is the content a form or multi-step flow? → Drawer (right) or Sheet (bottom)
├── Is it a brief confirmation or destructive action? → Modal (small/sm size)
├── Is it a detail view (record, settings)? → Drawer (right side)
└── Is it on mobile? → Bottom sheet

Tooltip vs Popover:
├── No interactive content (just text/labels) → Tooltip
├── Has buttons, links, or form elements → Popover (never put interactive content in a tooltip)
└── Appears on click (not hover) → Popover

Dropdown vs Select:
├── Native form field for submitting data → <select>
├── Custom filtering, searching, grouping → Combobox/Command
└── List of actions to trigger → Dropdown menu
```

---

## Modals

**When to use:** When the task is truly blocking — a confirmation that cannot be dismissed without a decision, or a focused action that shouldn't be mixed with the background context.

**When NOT to use:**
- Detail views (use drawer instead — modals kill context)
- Forms longer than 3-4 fields (use a separate page or drawer)
- Anything that could be done inline (prefer in-place editing)
- Confirmations that could be replaced with undo (prefer undo over "are you sure?")

### Size Variants
- **sm (400px)**: Confirmation dialogs, destructive action confirms
- **md (540px)**: Short forms, simple editors (default)
- **lg (720px)**: Multi-field forms, previews
- **fullscreen**: Complex workflows, image editors, code editors

```jsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent
    className="sm:max-w-[540px]"
    // Always: focus trap, scroll lock, backdrop click closes, Escape closes
  >
    <DialogHeader>
      <DialogTitle>Delete project</DialogTitle>
      <DialogDescription>
        This will permanently delete "{project.name}" and all its contents.
        This action cannot be undone.
      </DialogDescription>
    </DialogHeader>

    <DialogFooter className="gap-2 sm:gap-0">
      {/* Cancel first, then action — destructive action rightmost */}
      <Button variant="outline" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? (
          <>
            <Spinner className="mr-2 h-4 w-4" />
            Deleting...
          </>
        ) : (
          "Delete project"
        )}
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Modal Behavior Requirements
- **Focus trap**: Tab can only cycle within the modal while it's open
- **Scroll lock**: `body` scroll is locked when modal is open
- **Backdrop click**: closes the modal (unless destructive confirm — then require explicit button)
- **Escape key**: always closes
- **Focus on open**: first focusable element inside modal (not the backdrop)
- **Focus on close**: returns to the trigger element that opened the modal
- **Stacking**: avoid modal-on-modal. If unavoidable, use z-index correctly and separate backdrop layers

---

## Drawers / Sheets

**When to use:** Detail views, settings panels, long forms, content that benefits from seeing the background page for context.

**Placement:**
- **Right drawer**: default for desktop — detail panels, settings, filters
- **Left drawer**: navigation on mobile (hamburger menu)
- **Bottom sheet**: mobile-first primary action, media pickers, share menus

```jsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="right" className="w-[480px] sm:max-w-[480px]">
    <SheetHeader>
      <SheetTitle>Edit member</SheetTitle>
    </SheetHeader>

    <div className="flex-1 overflow-y-auto py-6">
      {/* Form content */}
    </div>

    <SheetFooter className="border-t border-white/10 pt-4">
      <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={handleSave}>Save changes</Button>
    </SheetFooter>
  </SheetContent>
</Sheet>
```

### Bottom Sheet (Mobile)
```jsx
<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="bottom" className="rounded-t-2xl px-0">
    {/* Drag handle */}
    <div className="mx-auto mt-2 mb-4 h-1.5 w-12 rounded-full bg-white/20" />
    <SheetHeader className="px-4">
      <SheetTitle>Share project</SheetTitle>
    </SheetHeader>
    <div className="overflow-y-auto px-4 pb-safe-bottom">
      {/* Content */}
    </div>
  </SheetContent>
</Sheet>
```

---

## Tooltips

**When to use:** Brief text labels for icon-only buttons, abbreviations, or any UI element whose purpose isn't immediately obvious.

**When NOT to use:**
- Interactive content (use popover instead)
- Content that wraps longer than ~40 words (too long for a tooltip)
- Touch devices as primary interaction (no hover on mobile)
- Required information to use the UI (if it's required, it should be visible)

### Timing
- **Show delay**: 300ms (prevents tooltips from flashing on quick mouse movements)
- **Hide delay**: 0ms (instant hide — no need to delay, user has moved on)

### Content Rules
- Max width: 240px
- No interactive elements (links, buttons) — use a popover
- Plain text only — no HTML, no markdown
- Never wrap longer than 2 lines

```jsx
<Tooltip>
  <TooltipTrigger asChild>
    <Button variant="ghost" size="icon" aria-label="Delete item">
      <TrashIcon className="h-4 w-4" />
    </Button>
  </TooltipTrigger>
  <TooltipContent side="top" sideOffset={4}>
    <p>Delete item</p>
    {/* Keyboard shortcut if one exists */}
    <kbd className="ml-2 text-xs text-muted-foreground">⌫</kbd>
  </TooltipContent>
</Tooltip>
```

### Placement Logic
- Default: `top` (most common, least obstructing)
- Flip automatically if it would clip the viewport
- Maintain 4-8px gap from the trigger element

---

## Popovers

**When to use:** Interactive content that appears on click — color pickers, date pickers, mini forms, option lists with filters.

**Difference from tooltip**: Popovers appear on click (not hover), contain interactive content, and the user must explicitly dismiss them.

**Difference from modal**: Popovers are non-blocking — the user can click outside to dismiss, and the background remains interactive.

```jsx
<Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" size="sm">
      <FilterIcon className="mr-2 h-4 w-4" />
      Filter
      {activeFilters > 0 && (
        <span className="ml-2 rounded-full bg-primary px-1.5 text-xs text-primary-foreground">
          {activeFilters}
        </span>
      )}
    </Button>
  </PopoverTrigger>
  <PopoverContent className="w-80" align="start">
    <div className="space-y-4">
      <h4 className="font-medium">Filter results</h4>
      {/* Filter form fields */}
      <div className="flex justify-between">
        <Button variant="ghost" size="sm" onClick={clearFilters}>Clear all</Button>
        <Button size="sm" onClick={applyFilters}>Apply filters</Button>
      </div>
    </div>
  </PopoverContent>
</Popover>
```

### Dismiss Behavior
- Click outside: always closes
- Escape: closes, returns focus to trigger
- Scroll outside (when not inside popover): closes (prevents content jumping)
- Clicking the trigger again: toggles closed

---

## Dropdown Menus

**When to use:** Lists of actions triggered from a single button. Not for form selection (use `<select>` or combobox).

**Rules:**
- Max visible items before scroll: 8-10
- Add search when list exceeds ~12 items
- Group related actions with section headers
- Destructive actions last, separated from non-destructive
- Never more than 2 levels of nesting (submenus)

```jsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="icon">
      <MoreHorizontalIcon className="h-4 w-4" />
      <span className="sr-only">Open menu</span>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    <DropdownMenuItem onClick={handleEdit}>
      <EditIcon className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDuplicate}>
      <CopyIcon className="mr-2 h-4 w-4" />
      Duplicate
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem onClick={handleDelete} className="text-red-400 focus:text-red-400">
      <TrashIcon className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Positioning
- Default: `align="end"` (appears below trigger, right-aligned — less likely to clip)
- Flip automatically if near viewport edge
- Never clip inside `overflow: hidden` containers — use a portal

---

## What AI Gets Wrong

- **Modals for things that should be inline** — confirmation "are you sure?" for non-destructive actions that could just be undoable. Delete account? Modal. Archive a post? Just do it with an undo toast.
- **No focus management** — modal opens but focus stays on the page behind it. Screen readers read background content.
- **No focus trap** — keyboard users can tab outside an open modal and interact with the background.
- **Tooltips on touch devices** — no hover on mobile. Tooltips on icon-only buttons need `aria-label` as the actual fallback, not the tooltip.
- **Interactive content in tooltips** — links inside tooltips. Tooltips aren't keyboard-navigable. Use a popover.
- **Dropdown clipping inside overflow containers** — dropdown appears but is clipped by a parent with `overflow: hidden`. Fix: use a portal (render outside the container).
- **z-index wars** — overlapping elements with wrong stacking. Use a z-index scale: base (0), dropdown (10), sticky (20), modal (50), toast (60).
- **No scroll lock on modal** — background page scrolls while modal is open.
- **Missing Escape key support** — user presses Escape expecting the modal to close. Nothing happens.
- **Backdrop that doesn't close** — user clicks outside the modal expecting to dismiss. Nothing happens.
- **Right drawer for mobile** — right drawers are awkward on mobile (thumb reach). Use bottom sheets.

---

## Accessibility Requirements

- **Modals**: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to title, `aria-describedby` for description. Focus trap. Focus returns to trigger on close.
- **Drawers**: Same as modal. Use `aria-label` if title is visually implied but not in DOM.
- **Tooltips**: Target element needs `aria-label` or `aria-describedby`. Never put required info in tooltip only.
- **Popovers**: `aria-haspopup="true"` on trigger, `aria-expanded` reflects open state. Interactive content must be keyboard-navigable.
- **Dropdowns**: `role="menu"`, items use `role="menuitem"`. Arrow keys navigate items. Enter/Space activates. Escape closes. Home/End go to first/last item.
- **All overlays**: Must be announced by screen readers when opened. `role="status"` or `aria-live` where appropriate.

### z-index Scale (use this, don't improvise)
```css
:root {
  --z-base: 0;
  --z-raised: 1;        /* Cards with hover effects */
  --z-dropdown: 10;     /* Dropdowns, menus */
  --z-sticky: 20;       /* Sticky nav, table headers */
  --z-modal-backdrop: 40;
  --z-modal: 50;        /* Modals, drawers */
  --z-toast: 60;        /* Toasts above everything */
  --z-tooltip: 70;      /* Tooltips above toasts */
}
```
