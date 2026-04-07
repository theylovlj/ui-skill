# Accessibility

## The WCAG 2.2 AA Checklist (Plain English)

These are non-negotiable for any production UI:

### Perceivable
- [ ] All images have `alt` text (empty `alt=""` for decorative)
- [ ] Color is never the only way to convey information (also use shape, text, icon)
- [ ] Contrast: body text 4.5:1, large text 3:1, UI components 3:1
- [ ] Placeholder text contrast 4.5:1 (most placeholders fail this)
- [ ] Content doesn't break at 400% zoom (don't use `user-scalable=no`)
- [ ] Content doesn't break at 200% text size (never set font size in px on body)

### Operable
- [ ] All functionality accessible via keyboard (Tab, Shift+Tab, Enter, Space, arrows)
- [ ] No keyboard traps (except intentional: modals, which must provide Escape)
- [ ] Skip link present: `<a href="#main">Skip to main content</a>`
- [ ] Focus visible on all interactive elements (never `outline: none` without replacement)
- [ ] No content that flashes more than 3 times per second

### Understandable
- [ ] `lang` attribute on `<html>` element
- [ ] Error messages identify the field and explain how to fix it
- [ ] Labels visible and associated with inputs (`<label for="">` or `aria-label`)
- [ ] Consistent navigation across pages
- [ ] No unexpected context changes on focus or input

### Robust
- [ ] Valid HTML (no duplicate IDs, no missing required attributes)
- [ ] All interactive elements have accessible names
- [ ] Status messages use `role="status"` or `role="alert"` (screen reader announcement)
- [ ] Custom widgets use appropriate ARIA roles and keyboard patterns

---

## ARIA: When to Use It

**The first rule of ARIA: don't use ARIA.** Native HTML elements have built-in semantics. Only use ARIA when native HTML can't do the job.

| Situation | Use This |
|-----------|----------|
| Button | `<button>` not `<div role="button">` |
| Navigation | `<nav>` not `<div role="navigation">` |
| Main content | `<main>` not `<div role="main">` |
| Form field | `<label>` + `<input>` not aria-label on a div |
| Custom dropdown | `role="listbox"` + `role="option"` + keyboard handling |
| Custom tab panel | `role="tablist"` + `role="tab"` + `role="tabpanel"` |
| Live region (toast) | `role="status"` (polite) or `role="alert"` (assertive) |
| Loading state | `aria-busy="true"` on the container |
| Expanded/collapsed | `aria-expanded="true/false"` on the trigger |
| Current page in nav | `aria-current="page"` |
| Invalid field | `aria-invalid="true"` + `aria-describedby="error-id"` |

### aria-label vs aria-labelledby vs aria-describedby

- `aria-label`: provides a label directly (use when no visible label exists)
- `aria-labelledby`: points to another element's text as the label
- `aria-describedby`: points to supplementary text (error messages, hints)

```html
<!-- Input with visible label -->
<label for="email">Email</label>
<input id="email" type="email">

<!-- Input with error -->
<input id="email" type="email" aria-invalid="true" aria-describedby="email-error">
<p id="email-error" role="alert">Email must include an @ symbol</p>

<!-- Icon button with no visible label -->
<button aria-label="Close dialog">
  <svg aria-hidden="true">...</svg>
</button>
```

---

## Keyboard Navigation Patterns

### Focus Management

When content changes dynamically, move focus to the right place:

```javascript
// Opening a modal → focus the modal's heading or first focusable element
dialog.showModal();
dialog.querySelector('h2').focus();

// Closing a modal → return focus to the trigger
closeButton.addEventListener('click', () => {
  dialog.close();
  openButton.focus();
});

// Route change in SPA → focus the main heading
router.on('navigate', () => {
  document.querySelector('h1').focus();
});
```

### Roving Tabindex (for tab lists, menu items, radio groups)

```javascript
const items = [...container.querySelectorAll('[role="tab"]')];
let current = 0;

container.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') current = (current + 1) % items.length;
  if (e.key === 'ArrowLeft') current = (current - 1 + items.length) % items.length;
  if (e.key === 'Home') current = 0;
  if (e.key === 'End') current = items.length - 1;

  items.forEach((item, i) => { item.tabIndex = i === current ? 0 : -1; });
  items[current].focus();
});
```

---

## Screen Reader Testing Checklist

Test with VoiceOver (Mac/iOS) and NVDA (Windows, free):

- [ ] Page title is unique and descriptive
- [ ] Heading structure is logical (one H1, H2s for sections, H3s for subsections)
- [ ] Images have meaningful alt text (decorative images have `alt=""`)
- [ ] Form inputs announced with their label
- [ ] Error messages announced immediately on occurrence (`role="alert"`)
- [ ] Modal focus trapped, closes on Escape, focus returns to trigger
- [ ] Dynamic content changes announced (live regions)
- [ ] Custom components announce state changes

---

## Color Blindness Patterns to Avoid

8% of men are color blind. Never rely on color alone:

| Bad (color only) | Good (color + shape/text) |
|-----------------|--------------------------|
| Red field border = error | Red border + ⚠ icon + error text |
| Green = success, red = fail | Green ✓ + "Success" / Red ✗ + "Failed" |
| Blue = clickable | Blue + underline or distinct font weight |
| Colored chart segments only | Colors + labels + patterns |

**Common dangerous combos:** Red/green, blue/purple, green/brown, cyan/grey

---

## What AI Gets Wrong on Accessibility

- Removes focus outlines (`outline: none` without `:focus-visible` replacement)
- Uses placeholder text as the only label for inputs
- Adds `aria-label` to everything instead of using native HTML
- Builds custom dropdown with click-only (no keyboard)
- Missing `alt` text on images
- Uses color alone for status (green = active, red = error)
- Forgetting `role="alert"` on error messages (not announced to screen readers)
- Never tests with keyboard (Tab key)