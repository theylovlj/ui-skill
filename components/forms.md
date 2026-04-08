# Forms & Inputs

## Decision Tree

```
What are you collecting?
├── Free text (short) → <input type="text">
├── Email → <input type="email"> (triggers email keyboard on mobile)
├── Password → <input type="password"> + show/hide toggle
├── Phone → <input type="tel"> (triggers numeric keyboard on mobile)
├── Number → <input type="number"> for spinners, type="text" inputmode="numeric" for plain numbers
├── Long text → <textarea> (use field-sizing: content for auto-resize)
├── One from a list
│   ├── ≤7 options, always visible → Radio group
│   ├── 2-7 options, toggle style → ToggleGroup (shadcn)
│   └── 8+ options → <select> (native) or Combobox (searchable)
├── Multiple from a list
│   ├── ≤7 options → Checkbox group
│   └── 8+ options → Multi-select combobox
├── True/false single → Checkbox (with visible label) or Toggle/Switch
├── Date/time → <input type="date"> native (unless custom picker is a hard requirement)
├── File → Custom drag-and-drop zone wrapping <input type="file">
└── Range/slider → <input type="range"> with visible value display
```

**Layout decisions:**
- Single column — default, most scannable, required for mobile
- Two column — only for dense settings/admin forms on desktop
- Multi-step — for forms with 7+ fields or distinct logical sections

---

## Label Rules (Non-Negotiable)

1. **Always use a visible `<label>`** — never placeholder-only. Placeholder disappears when user types.
2. **Label above the input** — not inline/left-aligned (exception: compact horizontal form in settings panel)
3. **Associate label with input**: `<label htmlFor="field-id">` + `<input id="field-id">`
4. **Mark the minority**: if most fields are required, mark optional ones. If most are optional, mark required ones.

```tsx
// Correct
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
    Email <span className="text-zinc-400 font-normal">(required)</span>
  </label>
  <input
    id="email"
    type="email"
    autoComplete="email"
    className="..."
  />
</div>

// Wrong — placeholder as label
<input type="email" placeholder="Email address" />
```

---

## Input Types

### Text Input

```tsx
<input
  type="text"
  id="name"
  autoComplete="name"
  className="
    w-full px-3 py-2 text-sm
    bg-white dark:bg-zinc-900
    border border-zinc-300 dark:border-zinc-700
    rounded-md
    text-zinc-900 dark:text-zinc-100
    placeholder:text-zinc-400 dark:placeholder:text-zinc-600
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:border-violet-500
    disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-50 dark:disabled:bg-zinc-800
    aria-[invalid=true]:border-red-500 aria-[invalid=true]:ring-red-500
  "
/>
```

### Textarea (auto-resize)

```tsx
<textarea
  id="bio"
  rows={3}
  className="
    w-full px-3 py-2 text-sm
    bg-white dark:bg-zinc-900
    border border-zinc-300 dark:border-zinc-700
    rounded-md resize-none
    [field-sizing:content] min-h-[80px]
    transition-colors duration-150
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
  "
  style={{ fieldSizing: 'content' } as React.CSSProperties}
/>
```

### Select (native)

Use native `<select>` unless the design requires custom option rendering (custom images, colors, complex content).

```tsx
<select
  id="country"
  autoComplete="country"
  className="
    w-full px-3 py-2 text-sm
    bg-white dark:bg-zinc-900
    border border-zinc-300 dark:border-zinc-700
    rounded-md
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500
  "
>
  <option value="">Select country...</option>
  <option value="us">United States</option>
</select>
```

### Checkbox

```tsx
<div className="flex items-start gap-3">
  <input
    id="terms"
    type="checkbox"
    className="
      mt-0.5 w-4 h-4 rounded
      border-zinc-300 dark:border-zinc-600
      text-violet-600
      focus-visible:ring-2 focus-visible:ring-violet-500
    "
  />
  <label htmlFor="terms" className="text-sm text-zinc-700 dark:text-zinc-300">
    I agree to the <a href="/terms" className="text-violet-600 underline">Terms of Service</a>
  </label>
</div>
```

### Toggle / Switch

For settings that apply immediately on toggle (without a save button).

```tsx
// shadcn Switch
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

<div className="flex items-center gap-3">
  <Switch id="notifications" aria-describedby="notifications-desc" />
  <div>
    <Label htmlFor="notifications">Email notifications</Label>
    <p id="notifications-desc" className="text-xs text-zinc-500">
      Receive emails about your account activity
    </p>
  </div>
</div>
```

### File Upload

```tsx
<label
  htmlFor="file-upload"
  className="
    flex flex-col items-center gap-2 p-8
    border-2 border-dashed border-zinc-300 dark:border-zinc-700
    rounded-lg cursor-pointer
    hover:border-violet-400 dark:hover:border-violet-600
    hover:bg-violet-50/50 dark:hover:bg-violet-900/10
    transition-colors duration-150
  "
>
  <svg aria-hidden="true" className="w-8 h-8 text-zinc-400">...</svg>
  <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
    Drop files here or <span className="text-violet-600">browse</span>
  </span>
  <span className="text-xs text-zinc-500">PNG, JPG, PDF up to 10MB</span>
  <input id="file-upload" type="file" className="sr-only" />
</label>
```

---

## Validation Rules

| Rule | Implementation |
|------|----------------|
| **When to validate** | On blur — not on every keystroke. Exception: password strength meter |
| **Error placement** | Below the field, `role="alert"`, connected via `aria-describedby` |
| **Error message format** | What's wrong + how to fix: "Email must include an @ symbol" not "Invalid email" |
| **Success state** | Green check or green border after valid input on blur |
| **Required fields** | HTML `required` attribute + visible indicator |
| **Disabled** | `disabled` attribute + `data-disabled` on Field wrapper |

### Error State Pattern (shadcn-verified)

```tsx
<div className="flex flex-col gap-1.5">
  <label htmlFor="email" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
    Email
  </label>
  <input
    id="email"
    type="email"
    aria-invalid="true"
    aria-describedby="email-error"
    className="... border-red-500 focus-visible:ring-red-500"
  />
  <p id="email-error" role="alert" className="text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
    <svg aria-hidden="true" className="w-3.5 h-3.5 shrink-0">...</svg>
    Email must include an @ symbol
  </p>
</div>
```

### Success State Pattern

```tsx
<input
  type="email"
  aria-invalid="false"
  className="... border-green-500 focus-visible:ring-green-500"
/>
<p className="text-xs text-green-600 flex items-center gap-1">
  <svg aria-hidden="true" className="w-3.5 h-3.5">...</svg>
  Looks good
</p>
```

---

## Error Message Templates

| Situation | Message |
|-----------|---------|
| Invalid format | "[Field] needs to be [format]. Example: [example]" |
| Required missing | "Please enter your [field name]" |
| Too short | "[Field] must be at least [N] characters" |
| Too long | "[Field] can't be longer than [N] characters" |
| Already taken | "This [email/username] is already in use. Try signing in instead." |
| Password weak | "Add a number or symbol to make your password stronger" |

---

## Multi-Step Forms

```tsx
// Stepper indicator
<div className="flex items-center gap-2">
  {steps.map((step, i) => (
    <React.Fragment key={step}>
      <div className={`
        flex items-center gap-1.5 text-sm font-medium
        ${i < currentStep ? 'text-violet-600' : i === currentStep ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400'}
      `}>
        <div className={`
          w-6 h-6 rounded-full flex items-center justify-center text-xs
          ${i < currentStep ? 'bg-violet-600 text-white' : i === currentStep ? 'bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400'}
        `}>
          {i < currentStep ? '✓' : i + 1}
        </div>
        {step}
      </div>
      {i < steps.length - 1 && <div className="flex-1 h-px bg-zinc-200 dark:bg-zinc-700" />}
    </React.Fragment>
  ))}
</div>
```

---

## What AI Gets Wrong

- **Placeholder as label** — disappears on type, fails WCAG, fails on autofill
- **Validate on every keystroke** — shows errors before the user finishes typing
- **"Invalid input" error messages** — useless. Always say what's wrong and how to fix it
- **No success state** — valid input deserves acknowledgment
- **`type="text"` for email/tel** — wrong keyboard on mobile, no browser validation
- **Missing `autocomplete`** — breaks browser autofill for name, email, address, password
- **Not grouping radio/checkboxes with `<fieldset>`+`<legend>`** — loses semantic context for screen readers
- **Required asterisk (*) without explanation** — add "* Required" note somewhere visible
- **No `aria-describedby` on errors** — screen readers don't announce the error when focus is on the input
- **Styling `<input>` directly and forgetting `::placeholder` contrast** — placeholder text must be 4.5:1

---

## Accessibility Requirements

- Every input needs a `<label>` with `htmlFor` matching the input `id`
- Use `autocomplete` attributes for common fields (name, email, password, tel, address-line1, postal-code, country)
- Error state: `aria-invalid="true"` on input + `aria-describedby="error-id"` + `id="error-id"` on error
- Error container: `role="alert"` so it's announced immediately
- Required: `required` attribute (not just CSS *) + `aria-required="true"` for custom components
- Group related inputs: `<fieldset>` + `<legend>` for radio groups, checkbox groups
- Disabled: HTML `disabled` attribute removes from tab order; add tooltip explaining why if not obvious