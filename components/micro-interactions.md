# Micro-Interactions & Advanced Component Patterns

Premium interactive states built with Framer Motion. All patterns follow a shared easing vocabulary and accessibility-first approach.

---

## Easing Vocabulary (Apply Consistently)

Three curves only. Never `ease-in-out` anywhere.

```js
const EASE_OUT = [0.22, 1, 0.36, 1]         // expo-out — ALL entrances
const EASE_IN  = [0.55, 0, 1, 0.45]         // ease-in  — ALL exits
const EASE_SPRING = { type: 'spring', stiffness: 300, damping: 28 }
// Gesture-driven (magnetic, drawer): stiffness 280, damping 22–32
```

**Semantic rules:**
- `EASE_OUT` for anything entering the screen or transitioning to active state
- `EASE_IN` for anything leaving — fast out feels natural, slow out doesn't
- Spring for anything driven by pointer/touch — physics feels correct

---

## Button Micro-Interactions

### Morph Button (Loading → Success)

The key detail most implementations miss: the button **physically collapses width** to 44px during loading/success, then expands back. The shape change is the signal.

```jsx
const EASE_OUT = [0.22, 1, 0.36, 1]

function MorphButton() {
  const [state, setState] = useState('idle') // idle | loading | success

  const cycle = async () => {
    if (state !== 'idle') return
    setState('loading')
    await new Promise(r => setTimeout(r, 1800))
    setState('success')
    await new Promise(r => setTimeout(r, 2200))
    setState('idle')
  }

  const isLoading = state === 'loading'
  const isSuccess = state === 'success'
  const label = { idle: 'Save changes', loading: 'Saving…', success: 'Saved' }[state]

  return (
    <motion.button
      onClick={cycle}
      disabled={state !== 'idle'}
      aria-busy={isLoading}
      aria-label={label}
      animate={{
        width: isLoading || isSuccess ? 44 : 'auto',
        backgroundColor: isSuccess ? 'oklch(62% 0.18 150)' : 'oklch(72% 0.12 70)',
      }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="relative flex items-center justify-center overflow-hidden rounded-full px-5 py-2.5 text-sm font-semibold disabled:cursor-not-allowed"
      style={{ minWidth: isLoading || isSuccess ? 44 : 148, height: 44 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.span key="spinner"
            initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-25" />
              <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-80" />
            </svg>
          </motion.span>
        ) : isSuccess ? (
          <motion.span key="check"
            initial={{ opacity: 0, scale: 0.4, rotate: -20 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </motion.span>
        ) : (
          <motion.span key="label"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }} className="whitespace-nowrap"
          >{label}</motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
```

### Magnetic Button

```jsx
function MagneticButton({ children, strength = 0.35 }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 280, damping: 22 })
  const springY = useSpring(y, { stiffness: 280, damping: 22 })
  const shouldReduce = useReducedMotion()

  const onMove = (e) => {
    if (shouldReduce) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - rect.left - rect.width / 2) * strength)
    y.set((e.clientY - rect.top - rect.height / 2) * strength)
  }

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}
```

### Tasteful Ripple (Not Material)

No persistent ink. Just a brief radial expansion that fades immediately.

```jsx
function RippleButton({ children }) {
  const [ripples, setRipples] = useState([])

  const addRipple = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const id = Date.now()
    setRipples(prev => [...prev, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }])
    setTimeout(() => setRipples(prev => prev.filter(r => r.id !== id)), 600)
  }

  return (
    <button onClick={addRipple} className="relative overflow-hidden rounded-md ...">
      <span className="relative z-10">{children}</span>
      <AnimatePresence>
        {ripples.map(r => (
          <motion.span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{ left: r.x, top: r.y, x: '-50%', y: '-50%' }}
            initial={{ width: 0, height: 0, opacity: 0.6 }}
            animate={{ width: 200, height: 200, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </AnimatePresence>
    </button>
  )
}
```

### Shimmer Loading Button

```jsx
function ShimmerButton({ loading, children }) {
  return (
    <button
      disabled={loading}
      aria-busy={loading}
      className={cn(
        'relative overflow-hidden rounded-md px-5 py-2.5 text-sm font-semibold transition-all duration-200',
        loading
          ? 'bg-[oklch(18%_0.01_55)] text-transparent cursor-wait border border-[oklch(22%_0.01_55)]'
          : 'bg-[oklch(72%_0.12_70)] text-[oklch(8%_0.01_55)]'
      )}
    >
      <span className={loading ? 'invisible' : ''}>{children}</span>
      {loading && (
        <span
          className="pointer-events-none absolute inset-0"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, oklch(72% 0.12 70 / 0.15) 50%, transparent 100%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s ease-in-out infinite',
          }}
          aria-hidden
        />
      )}
    </button>
  )
}

// CSS (global or in tailwind @layer):
// @keyframes shimmer { 0%,100% { background-position: 200% 0 } 50% { background-position: -200% 0 } }
```

---

## Form Premium States

### Floating Label Input (The Good Version)

**Rules:**
- Validate on `blur` only, never on every keystroke
- Specific error messages: "Must include an @ symbol" not "Invalid email"
- Success tick appears after blur when valid, disappears on re-focus

```jsx
function FloatingLabelInput({ id, label, type = 'text' }) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const [touched, setTouched] = useState(false)
  const [valid, setValid] = useState(null) // null | true | false
  const lifted = focused || value.length > 0

  const validate = () => {
    if (!touched) return
    if (type === 'email') setValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
    else setValid(value.trim().length >= 2)
  }

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        aria-invalid={valid === false}
        aria-describedby={valid === false ? `${id}-error` : undefined}
        onChange={e => setValue(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => { setFocused(false); setTouched(true); validate() }}
        className={cn(
          'peer w-full rounded-lg border bg-surface px-4 pb-2.5 pt-6 text-sm outline-none transition-all duration-200 placeholder:text-transparent',
          focused && 'border-primary ring-2 ring-primary/20',
          valid === true && !focused && 'border-success',
          valid === false && 'border-error ring-2 ring-error/20',
          !focused && valid === null && 'border-border'
        )}
      />
      <label htmlFor={id} className={cn(
        'pointer-events-none absolute left-4 font-medium transition-all duration-200',
        lifted ? 'top-2 text-[10px] tracking-wide' : 'top-1/2 -translate-y-1/2 text-sm',
        focused ? 'text-primary' : 'text-muted'
      )}>
        {label}
      </label>

      {/* Success tick */}
      <AnimatePresence>
        {valid === true && !focused && (
          <motion.span className="absolute right-3 top-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }} aria-hidden
          >
            <CheckIcon className="h-4 w-4 text-success" />
          </motion.span>
        )}
      </AnimatePresence>

      {/* Specific error message */}
      <AnimatePresence>
        {valid === false && (
          <motion.p id={`${id}-error`} role="alert"
            initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-1.5 flex items-center gap-1 text-xs text-error"
          >
            {type === 'email' ? 'Must include an @ symbol and domain' : `${label} must be at least 2 characters`}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
```

### OTP / Verification Code Input

```jsx
function OTPInput({ length = 6, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(''))
  const inputs = useRef([])

  const handleChange = (i, e) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1)
    const next = [...values]
    next[i] = char
    setValues(next)
    if (char && i < length - 1) inputs.current[i + 1]?.focus()
    if (next.every(v => v) && onComplete) onComplete(next.join(''))
  }

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) {
      inputs.current[i - 1]?.focus()
      const next = [...values]; next[i - 1] = ''; setValues(next)
    }
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < length - 1) inputs.current[i + 1]?.focus()
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    const next = [...values]
    pasted.split('').forEach((c, j) => { next[j] = c })
    setValues(next)
    inputs.current[Math.min(pasted.length, length - 1)]?.focus()
    if (pasted.length === length && onComplete) onComplete(pasted)
  }

  return (
    <div role="group" aria-label="Verification code" className="flex items-center gap-2">
      {values.map((v, i) => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el }}
          type="text"
          inputMode="numeric"
          pattern="[0-9]"
          maxLength={1}
          value={v}
          onChange={e => handleChange(i, e)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-label={`Digit ${i + 1} of ${length}`}
          className="h-12 w-10 rounded-lg border text-center text-lg font-semibold tabular-nums outline-none transition-all duration-150 ..."
        />
      ))}
    </div>
  )
}
```

**Accessibility:** `role="group"` on container, `aria-label="Digit N of 6"` on each input, arrow-key navigation between cells, full paste handling.

---

## Toast Stack (Sonner Style)

Stacked toasts with `scale + y-offset` for depth illusion, swipe-to-dismiss, auto-dismiss progress bar via `requestAnimationFrame`.

```jsx
const EASE_IN = [0.55, 0, 1, 0.45]
const EASE_OUT = [0.22, 1, 0.36, 1]

function Toast({ toast, index, onRemove }) {
  const [progress, setProgress] = useState(100)
  const duration = toast.type === 'error' ? 6000 : 4000
  const startRef = useRef(null)
  const rafRef = useRef(null)

  // rAF progress bar + auto-dismiss (not setInterval — avoids timer drift)
  useEffect(() => {
    startRef.current = Date.now()
    const tick = () => {
      const pct = Math.max(0, 100 - ((Date.now() - startRef.current) / duration) * 100)
      setProgress(pct)
      if (pct > 0) rafRef.current = requestAnimationFrame(tick)
      else onRemove(toast.id)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // Swipe-to-dismiss: x motion → opacity transform
  const x = useMotionValue(0)
  const opacity = useTransform(x, [-120, -40, 0], [0, 0.5, 1])

  // Stack visual: items behind get scaled down and translated up
  const scale = 1 - index * 0.04
  const yOffset = index * -8
  const isTopmost = index === 0

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.92 }}
      animate={{ opacity: 1, y: yOffset, scale, zIndex: 10 - index }}
      exit={{ opacity: 0, x: -80, transition: { duration: 0.2, ease: EASE_IN } }}
      transition={{ duration: 0.3, ease: EASE_OUT }}
      drag={isTopmost ? 'x' : false}
      dragConstraints={{ left: -200, right: 10 }}
      dragElastic={0.1}
      style={{ x: isTopmost ? x : 0, opacity: isTopmost ? opacity : undefined, position: 'absolute', width: '100%' }}
      onDragEnd={(_, info) => { if (info.offset.x < -60) onRemove(toast.id) }}
    >
      <div className="relative overflow-hidden rounded-xl border bg-surface shadow-lg">
        {/* Progress bar — depletes as toast ages */}
        <div
          className="absolute inset-x-0 top-0 h-0.5 origin-left"
          style={{ width: `${progress}%`, background: toast.type === 'error' ? 'oklch(55% 0.22 25)' : 'var(--accent)' }}
        />
        <div className="flex items-center gap-3 px-4 py-3">
          <p className="flex-1 text-sm">{toast.msg}</p>
          {toast.action && (
            <button onClick={() => onRemove(toast.id)} className="text-xs font-semibold text-accent underline-offset-2 hover:underline">
              {toast.action}
            </button>
          )}
          <button onClick={() => onRemove(toast.id)} aria-label="Dismiss" className="p-1 text-muted hover:text-foreground">
            <XIcon className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
```

**Toast container** (`role="region" aria-live="polite"`, `position: absolute`, `h-24` for demo or `fixed top-4 right-4` in production):
```jsx
<div role="region" aria-label="Notifications" aria-live="polite" className="pointer-events-none relative h-24">
  <AnimatePresence>
    {toasts.slice(0, 3).map((toast, i) => (
      <Toast key={toast.id} toast={toast} index={i} onRemove={remove} />
    ))}
  </AnimatePresence>
</div>
```

---

## Card Interactions

### 3D Tilt Card

```jsx
function TiltCard({ children }) {
  const ref = useRef(null)
  const rX = useMotionValue(0)
  const rY = useMotionValue(0)
  const sX = useSpring(rX, { stiffness: 260, damping: 24 })
  const sY = useSpring(rY, { stiffness: 260, damping: 24 })
  const shouldReduce = useReducedMotion()

  const onMove = (e) => {
    if (shouldReduce) return
    const rect = ref.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    rX.set(-ny * 14)  // ±7deg
    rY.set(nx * 14)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rX.set(0); rY.set(0) }}
      style={{ rotateX: sX, rotateY: sY, transformPerspective: 900, transformStyle: 'preserve-3d' }}
      className="rounded-2xl border bg-surface p-6 will-change-transform"
    >
      {children}
    </motion.div>
  )
}
```

### Spotlight Card

Mouse-tracked radial gradient gives the card a "lit from within" feel on hover.

```jsx
function SpotlightCard({ children }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -999, y: -999 })
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={e => {
        const r = ref.current.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative overflow-hidden rounded-2xl border bg-surface p-6"
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          background: `radial-gradient(300px circle at ${pos.x}px ${pos.y}px, oklch(72% 0.12 70 / 0.12), transparent 70%)`,
        }}
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
```

### Card Flip (Accessible)

```jsx
function FlipCard({ front, back }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative h-40 w-full cursor-pointer"
      style={{ perspective: 1000 }}
      onClick={() => setFlipped(f => !f)}
      onKeyDown={e => e.key === 'Enter' && setFlipped(f => !f)}
      role="button"
      tabIndex={0}
      aria-label={flipped ? 'Showing back — click to flip' : 'Showing front — click to flip'}
      aria-pressed={flipped}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', width: '100%', height: '100%', position: 'relative' }}
      >
        <div className="absolute inset-0 backface-hidden rounded-2xl border bg-surface p-6">{front}</div>
        <div className="absolute inset-0 backface-hidden rounded-2xl border bg-surface-elevated p-6"
          style={{ transform: 'rotateY(180deg)' }}>{back}</div>
      </motion.div>
    </div>
  )
}
```

### Expandable Card (No Modal)

Uses `motion.div layout` for smooth height animation without explicit height tracking.

```jsx
function ExpandableCard({ title, preview, children }) {
  const [expanded, setExpanded] = useState(false)
  const contentId = useId()

  return (
    <motion.div layout className="overflow-hidden rounded-2xl border bg-surface"
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center justify-between p-5">
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-muted">{preview}</p>
        </div>
        <button
          onClick={() => setExpanded(e => !e)}
          aria-expanded={expanded}
          aria-controls={contentId}
          aria-label={expanded ? 'Collapse' : 'Expand'}
          className="rounded-lg p-2 text-muted hover:bg-surface-elevated hover:text-foreground"
        >
          <motion.svg animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div id={contentId} key="content"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-t border-border px-5 pb-5 pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
```

---

## Data Table with Inline Editing

Key features: sortable headers with `aria-sort`, skeleton loading rows, hover-reveal action buttons, inline cell editing.

```jsx
function DataTable({ data }) {
  const [rows, setRows] = useState(data)
  const [editCell, setEditCell] = useState(null) // { row: id, col: 'name' }
  const [loading, setLoading] = useState(false)
  const [sortKey, setSortKey] = useState('name')
  const [sortDir, setSortDir] = useState('asc')
  const editRef = useRef(null)

  useEffect(() => { if (editCell) editRef.current?.focus() }, [editCell])

  const sort = (key) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc')
    else { setSortKey(key); setSortDir('asc') }
  }

  const sorted = [...rows].sort((a, b) => {
    const cmp = typeof a[sortKey] === 'number'
      ? a[sortKey] - b[sortKey]
      : String(a[sortKey]).localeCompare(String(b[sortKey]))
    return sortDir === 'asc' ? cmp : -cmp
  })

  const commitEdit = (id, col, value) => {
    setRows(prev => prev.map(r => r.id === id ? { ...r, [col]: value } : r))
    setEditCell(null)
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="overflow-x-auto" aria-busy={loading}>
        <table className="w-full text-sm" aria-label="Team members">
          <thead className="sticky top-0 border-b bg-surface-base">
            <tr>
              {columns.map(col => (
                <th key={col.key} scope="col"
                  aria-sort={sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : 'none'}
                  className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-muted text-left"
                >
                  <button onClick={() => sort(col.key)} className="hover:text-foreground rounded focus-visible:outline-2">
                    {col.label}
                    {sortKey === col.key && <SortIcon dir={sortDir} />}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {loading
              ? Array(4).fill(0).map((_, i) => (
                <tr key={i}>
                  {columns.map((col, j) => (
                    <td key={col.key} className="px-4 py-3.5">
                      <div className="h-4 rounded-md bg-surface-elevated animate-pulse"
                        style={{ width: `${[65, 40, 50, 35][j]}%`, animationDelay: `${i * 0.1}s` }} />
                    </td>
                  ))}
                </tr>
              ))
              : sorted.map(row => (
                <tr key={row.id}
                  onMouseEnter={() => setHoveredRow(row.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="group hover:bg-surface-elevated transition-colors duration-100"
                >
                  <td className="px-4 py-3">
                    {editCell?.row === row.id && editCell?.col === 'name' ? (
                      <input
                        ref={editRef}
                        defaultValue={row.name}
                        onBlur={e => commitEdit(row.id, 'name', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && commitEdit(row.id, 'name', e.target.value)}
                        className="w-full rounded border border-primary bg-surface px-2 py-0.5 text-sm ring-2 ring-primary/25 outline-none"
                        aria-label="Edit name"
                      />
                    ) : (
                      <span
                        onClick={() => setEditCell({ row: row.id, col: 'name' })}
                        role="button" tabIndex={0} title="Click to edit"
                        aria-label={`Edit name: ${row.name}`}
                        onKeyDown={e => e.key === 'Enter' && setEditCell({ row: row.id, col: 'name' })}
                        className="cursor-text rounded px-1 hover:bg-surface-elevated"
                      >{row.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums font-medium">${row.revenue.toLocaleString()}</td>
                  {/* Hover-reveal action */}
                  <td className="px-4 py-3 w-0">
                    <AnimatePresence>
                      {hoveredRow === row.id && (
                        <motion.div initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                          <button onClick={() => setEditCell({ row: row.id, col: 'name' })} aria-label={`Edit ${row.name}`}
                            className="rounded p-1.5 text-muted hover:bg-surface-elevated hover:text-foreground">
                            <EditIcon className="h-3.5 w-3.5" aria-hidden />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}
```

**Critical:** Use `tabular-nums` font-variant on all numeric data columns. Use `aria-sort` on every sortable header.

---

## Command Palette (⌘K)

Full implementation: fuzzy search, grouped results, keyboard navigation, accessible dialog.

```jsx
const EASE_OUT = [0.22, 1, 0.36, 1]

function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef(null)

  // Global keyboard shortcut
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50)
    else { setQuery(''); setCursor(0) }
  }, [open])

  // Simple sequential fuzzy match (use Fuse.js in production for scored matching)
  const fuzzyScore = (q, target) => {
    if (!q) return 1
    const [ql, tl] = [q.toLowerCase(), target.toLowerCase()]
    if (tl.includes(ql)) return 2
    let qi = 0, score = 0
    for (let i = 0; i < tl.length && qi < ql.length; i++) {
      if (tl[i] === ql[qi]) { score++; qi++ }
    }
    return qi === ql.length ? score / ql.length : 0
  }

  const results = query
    ? items.map(item => ({ ...item, score: fuzzyScore(query, item.label) }))
        .filter(i => i.score > 0).sort((a, b) => b.score - a.score)
    : items.filter(i => recentIds.includes(i.id))

  const onKeyDown = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(c => Math.min(c + 1, results.length - 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(c => Math.max(c - 1, 0)) }
    if (e.key === 'Enter') setOpen(false) // execute results[cursor].action here
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Open command palette (⌘K)"
        className="flex items-center gap-2 rounded-lg border px-3 py-2 text-sm text-muted hover:text-foreground">
        <SearchIcon className="h-4 w-4" aria-hidden />
        <span>Search…</span>
        <kbd className="ml-auto rounded border px-1.5 py-0.5 text-xs">⌘K</kbd>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div key="backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setOpen(false)} aria-hidden />

            <motion.div key="palette"
              role="dialog" aria-modal="true" aria-label="Command palette"
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -8 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="fixed inset-x-4 top-[20%] z-50 mx-auto max-w-xl overflow-hidden rounded-2xl border bg-surface shadow-2xl"
              onKeyDown={onKeyDown}
            >
              <div className="flex items-center gap-3 border-b px-4 py-3.5">
                <SearchIcon className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={e => { setQuery(e.target.value); setCursor(0) }}
                  placeholder="Search actions and pages…"
                  aria-autocomplete="list"
                  aria-controls="cmd-results"
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
                />
                <kbd className="rounded border px-1.5 py-0.5 text-xs text-muted">Esc</kbd>
              </div>

              <div id="cmd-results" className="max-h-80 overflow-y-auto py-2" role="listbox">
                {/* Group label */}
                <p className="px-4 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted">
                  {query ? 'Results' : 'Recent'}
                </p>
                {results.map((item, i) => (
                  <div key={item.id}
                    role="option" aria-selected={i === cursor}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setCursor(i)}
                    className={cn(
                      'mx-2 flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-75',
                      i === cursor ? 'bg-primary/12 text-foreground' : 'text-muted'
                    )}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-surface-elevated text-sm" aria-hidden>
                      {item.icon}
                    </span>
                    <span className="flex-1">{item.label}</span>
                    {item.shortcut && <kbd className="shrink-0 text-[10px] text-muted">{item.shortcut}</kbd>}
                  </div>
                ))}
                {results.length === 0 && query && (
                  <p className="px-4 py-8 text-center text-sm text-muted">No results for "{query}"</p>
                )}
              </div>

              {/* Keyboard legend */}
              <div className="flex gap-4 border-t px-4 py-2.5">
                {[['↑↓', 'Navigate'], ['↵', 'Select'], ['Esc', 'Close']].map(([k, l]) => (
                  <span key={k} className="flex items-center gap-1.5 text-[10px] text-muted">
                    <kbd className="rounded border px-1 py-0.5">{k}</kbd>
                    {l}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
```

---

## Bottom Sheet / Drawer

Spring entrance, drag-to-dismiss with velocity threshold, resizable via pointer capture, nested drawer support.

```jsx
const SPRING = { type: 'spring', stiffness: 280, damping: 32 }

function BottomSheet({ open, onClose, children }) {
  const [height, setHeight] = useState(360)
  const dragStartY = useRef(null)
  const dragStartH = useRef(null)
  const y = useMotionValue(0)
  const opacity = useTransform(y, [0, 400], [1, 0])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop — opacity tied to sheet y position */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ opacity }} // fades as user drags sheet down
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            onClick={onClose} aria-hidden
          />

          <motion.div
            role="dialog" aria-modal="true"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={SPRING}
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={{ top: 0.05, bottom: 0.2 }}
            style={{ y, height }}
            onDragEnd={(_, info) => {
              // Dismiss if dragged down 120px OR flicked fast (velocity > 500)
              if (info.offset.y > 120 || info.velocity.y > 500) onClose()
              else y.set(0)
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col overflow-hidden rounded-t-2xl border-t bg-surface"
          >
            {/* Drag handle — also acts as resize handle */}
            <div
              className="relative flex cursor-ns-resize justify-center py-3 select-none"
              onPointerDown={e => {
                e.currentTarget.setPointerCapture(e.pointerId)
                dragStartY.current = e.clientY
                dragStartH.current = height
              }}
              onPointerMove={e => {
                if (dragStartY.current === null) return
                const delta = dragStartY.current - e.clientY
                setHeight(Math.max(200, Math.min(600, dragStartH.current + delta)))
              }}
              onPointerUp={() => { dragStartY.current = null }}
              aria-label="Resize drawer"
            >
              <div className="h-1 w-10 rounded-full bg-border" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between border-b px-5 pb-4">
              <h2 className="text-base font-semibold">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="rounded-lg p-1.5 text-muted hover:text-foreground">
                <XIcon className="h-4 w-4" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**Nested drawer:** Render a second `motion.div` inside the same `AnimatePresence` with `z-[60]` and `SPRING` with slightly higher stiffness (300). Header gets a back button that closes only the nested layer, plus a "Close all" button.

**Production note:** `drag="y"` on Framer Motion conflicts with a resize handle's `onPointerDown`. Use `useDragControls` + `dragListener={false}` on the sheet so resize and dismiss gestures don't compete.

---

## Odometer / Slot-Machine Number Roll

Digits roll up/down based on the direction of change. Handles `useReducedMotion` gracefully.

```jsx
function OdometerDigit({ digit, prevDigit }) {
  const shouldReduce = useReducedMotion()
  const diff = ((digit - prevDigit) + 10) % 10

  return (
    <div className="relative h-10 w-6 overflow-hidden tabular-nums">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={digit}
          initial={shouldReduce ? { opacity: 0 } : { y: `${diff * -100}%`, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={shouldReduce ? { opacity: 0 } : { y: '100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center text-2xl font-bold"
        >
          {digit}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

function OdometerNumber({ value }) {
  const [prev, setPrev] = useState(value)
  useEffect(() => { setPrev(value) }, [value])

  // Format: "$127,840" → ['$', '1', '2', '7', ',', '8', '4', '0']
  const chars = String(value).split('')
  const prevChars = String(prev).split('')

  return (
    <div className="flex items-center">
      {chars.map((char, i) => {
        if (isNaN(Number(char))) return <span key={i}>{char}</span> // non-digit passthrough
        return (
          <OdometerDigit
            key={i}
            digit={Number(char)}
            prevDigit={Number(prevChars[i] ?? char)}
          />
        )
      })}
    </div>
  )
}
```

**Production caveat:** Digit count changes when the formatted number length changes (e.g. `$9,999` → `$10,000`), causing all slots to remount. Either pad to a fixed max-width string or use `layoutId` per digit position.

---

## What AI Gets Wrong on Micro-Interactions

- **Morph button stays the same width** — if the button width doesn't change, the shape isn't communicating anything. Collapse it.
- **Validation fires on every keystroke** — validate on `blur` only. Firing while typing is hostile UX.
- **Toast progress bar uses `setInterval`** — use `requestAnimationFrame` to avoid timer drift and dropped frames.
- **Swipe-to-dismiss with no velocity threshold** — check both `info.offset.x` (distance) AND `info.velocity.x` (flick speed). Offset-only feels sticky.
- **Command palette lacks empty state** — "No results for X" is required. Don't just collapse the list.
- **OTP input paste doesn't work** — always implement `onPaste` on all cells, not just the first one.
- **Floating label input validates on mount** — `valid === null` is the "untouched" state. Only validate once `touched === true`.
- **3D tilt card without `useReducedMotion` check** — vestibular users can't opt out of tilt. Always gate motion effects.
- **Odometer doesn't reduce motion** — `AnimatePresence` transitions must be swapped for a simple `opacity` fade when `shouldReduce` is true.
- **Drawer drag and resize compete** — use `useDragControls` + `dragListener={false}` to keep pointer events separate.
