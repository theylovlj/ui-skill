# Data Display

## Decision Tree

```
What type of data?
├── Comparative (amounts, values across categories)
│   ├── Few categories (2-6) → Bar chart (horizontal if labels are long)
│   ├── Many categories (7+) → Horizontal bar chart or table
│   └── Part of a whole → Bar chart with total (NOT pie chart)
│
├── Trend over time
│   ├── Single metric → Line chart
│   ├── Multiple metrics → Multi-line (max 4 lines before it's unreadable)
│   └── Show area under curve → Area chart (only for cumulative data)
│
├── Distribution
│   ├── Range of values → Histogram or box plot
│   └── Single value in a range → Progress bar or gauge
│
├── Relationship
│   ├── Two variables → Scatter plot
│   └── Three variables → Bubble chart
│
├── Summary metrics (KPIs)
│   ├── 1-4 metrics → Stat cards (big number + label)
│   └── Many metrics → Table
│
├── Structured records
│   ├── Users need to scan, sort, filter → Table
│   ├── Users need to skim → List
│   └── Ordered ranking → Leaderboard / ranked list
│
└── Sequences / history
    ├── Linear events → Activity feed
    └── Milestones → Timeline

When to use pie/donut charts: ALMOST NEVER.
Exception: Part-of-whole with exactly 2-3 segments where the exact percentages matter less than the proportion.
Bar charts are almost always clearer.
```

---

## Stat Cards (KPI Cards)

**When to use:** Hero metrics that users need to see at a glance, top of dashboards, summary sections.

**When NOT to use:** As decorative filler, for data that doesn't need immediate attention, for more than 4-6 metrics (use a table instead).

### The Good Stat Card
A good stat card has: a clear metric label, the value in large readable type, context (change vs previous period, or target progress).

```jsx
<div className="rounded-lg border border-white/10 bg-white/5 p-6">
  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
  <p className="mt-2 text-3xl font-bold tabular-nums text-foreground">$48,295</p>
  <div className="mt-2 flex items-center gap-1.5 text-sm">
    <TrendingUpIcon className="h-4 w-4 text-emerald-500" />
    <span className="font-medium text-emerald-500">+12.4%</span>
    <span className="text-muted-foreground">vs last month</span>
  </div>
</div>
```

**Rules:**
- Use `tabular-nums` on all numbers so digits align if multiple cards are in a grid
- Trend indicator is optional — only show if the trend direction is actionable
- Sparklines are decoration unless the shape of the trend matters (see below)
- Never make all cards identical — vary the primary metric type, not just the number

### Sparkline: Data vs Decoration
**Use sparklines when:** The shape of the trend matters (e.g., "revenue spiked then dropped" tells a story a single delta % doesn't).

**Don't use sparklines when:** You just want to make a card look more "dashboardy." A flat or monotonically rising line communicates nothing extra beyond the trend indicator.

```jsx
// Only show sparkline if shape is meaningful
{trend.hasInterestingShape && (
  <SparklineChart data={trend.data} className="mt-4 h-10 w-full" />
)}
```

---

## Tables

**When to use:** Structured data with multiple attributes per record, when users need to sort, filter, or compare rows.

**Anatomy of a good table:**
- Sticky header on scroll for long tables
- Column alignment: text left, numbers right (critical for scannability)
- `tabular-nums` on all number columns
- Sortable columns have a sort indicator (chevron up/down, neutral state = no arrow)
- Row hover for scannability: `hover:bg-white/5`
- Zebra striping is optional — hover state alone is usually sufficient

```jsx
<div className="rounded-lg border border-white/10">
  <table className="w-full text-sm">
    <thead className="sticky top-0 border-b border-white/10 bg-background">
      <tr>
        {columns.map(col => (
          <th key={col.key}
            className={cn(
              "px-4 py-3 font-medium text-muted-foreground",
              col.align === 'right' ? 'text-right' : 'text-left'
            )}>
            {col.sortable ? (
              <button onClick={() => toggleSort(col.key)} className="flex items-center gap-1 hover:text-foreground">
                {col.label}
                <SortIcon direction={sortKey === col.key ? sortDir : null} />
              </button>
            ) : col.label}
          </th>
        ))}
      </tr>
    </thead>
    <tbody className="divide-y divide-white/5">
      {rows.map(row => (
        <tr key={row.id} className="hover:bg-white/5 transition-colors">
          {columns.map(col => (
            <td key={col.key}
              className={cn(
                "px-4 py-3",
                col.align === 'right' ? 'text-right tabular-nums' : ''
              )}>
              {row[col.key]}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
</div>
```

### Bulk Selection
```jsx
// Header checkbox: checked if all selected, indeterminate if some selected
<input type="checkbox"
  checked={selectedIds.size === rows.length}
  ref={el => { if (el) el.indeterminate = selectedIds.size > 0 && selectedIds.size < rows.length }}
  onChange={toggleAll}
  aria-label="Select all rows"
/>
```

### Inline Actions
- Show on row hover only (not always visible — reduces visual noise)
- Destructive actions (Delete) always last, always separated from non-destructive

### Table States (all required)
- **Empty state**: See feedback.md — never just an empty table body
- **Loading skeleton**: Skeleton rows with shimmer, same number of rows as page size
- **Error state**: Full-width error message with retry action
- **Zero results (filtered)**: "No results for [filter]" with clear-filter action

---

## Lists

### Ordered List (Ranked/Numbered)
Use when rank or sequence matters.

```jsx
<ol className="space-y-2">
  {items.map((item, i) => (
    <li key={item.id} className="flex items-center gap-4">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm font-bold tabular-nums text-muted-foreground">
        {i + 1}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{item.title}</p>
        <p className="text-sm text-muted-foreground">{item.subtitle}</p>
      </div>
      <span className="shrink-0 text-sm font-semibold tabular-nums">{item.value}</span>
    </li>
  ))}
</ol>
```

### Activity Feed
Use for chronological event streams — notifications, audit logs, commit history.

**Rules:**
- Group by date (Today, Yesterday, then dates)
- Relative time ("2 hours ago") for recent, absolute date for older
- Actor + verb + object pattern: "Jordan deleted the Figma export"
- Avatar/icon left, content right, timestamp small and trailing

```jsx
<div className="space-y-6">
  {groupedByDate.map(group => (
    <div key={group.date}>
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {group.label}
      </p>
      <div className="space-y-1">
        {group.events.map(event => (
          <div key={event.id} className="flex gap-3 py-2">
            <Avatar user={event.actor} size="sm" className="mt-0.5 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{event.actor.name}</span>{' '}
                <span className="text-muted-foreground">{event.description}</span>
              </p>
            </div>
            <time className="shrink-0 text-xs text-muted-foreground" dateTime={event.timestamp}>
              {event.relativeTime}
            </time>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
```

### Timeline
Use for milestones, project phases, or processes with a clear sequence.

**Rules:**
- Vertical line connecting dots (not cards connected by arrows)
- Completed → active → upcoming states clearly differentiated
- Don't overload each milestone with text — keep it scannable

---

## Charts

### Which Chart Type

| Data question | Chart type |
|---|---|
| How much? (single category) | Single stat card |
| Which category is biggest? | Bar chart |
| How has X changed over time? | Line chart |
| What's the breakdown? | Stacked bar (not pie) |
| How do A and B compare over time? | Multi-line (max 4) |
| What's X as a % of whole? | Horizontal bar with % labels |
| Distribution of values? | Histogram |

**Pie/donut charts:** Only when you have 2-3 segments and the proportion is the story. If you have 4+ segments, use a horizontal bar chart. Humans are terrible at comparing angles.

### Chart Principles
- **Empty state**: "No data available for this period" with a context-appropriate action
- **Loading**: Skeleton of the chart shape — not a spinner
- **Axis labels**: Clear, not crowded. Rotate only if absolutely necessary.
- **Tooltips**: Show on hover, contain exact values + label + date
- **Color accessibility**: Never use red + green as the only differentiator (8% of men are colorblind). Add a pattern or label.
- **Zero baseline**: Bar charts must start at 0. Line charts can start at a non-zero Y axis but must label it clearly.
- **Responsive**: Charts must reflow at mobile widths — consider horizontal scroll or simplified mobile view

```jsx
// Color palette that works for color blindness
const chartColors = [
  'oklch(65% 0.15 230)',  // blue
  'oklch(70% 0.14 140)',  // green
  'oklch(75% 0.16 55)',   // amber
  'oklch(65% 0.18 310)',  // purple
];
```

---

## What AI Gets Wrong

- **Identical stat cards in a grid** — four cards, each with a gradient icon, big number, and delta. Same size, same weight, same padding. Visual hierarchy is zero.
- **Sparklines as decoration** — adding a flat-line sparkline to every stat card because it looks more "data-rich." If the shape doesn't tell a story, remove it.
- **Pie charts for 4+ segments** — humans can't compare 6 pie slices. Use a bar chart.
- **Tables with no empty state** — a table that just renders an empty `<tbody>` on zero results looks broken.
- **No loading skeleton for async data** — content suddenly appearing without any loading treatment.
- **Text-aligned wrong** — numbers left-aligned in tables (makes them unscannably ragged).
- **Missing `tabular-nums`** — numbers in different sizes (1 vs 9 are different widths without tabular-nums) cause alignment jitter.
- **All table columns equal width** — column widths should reflect content: names need more space than status badges.
- **No inline row actions** — tables with no way to act on a row directly.
- **Charts with no empty or error state** — charts that just show nothing when data fails to load.

---

## Accessibility Requirements

- Tables: `<table>` with `<caption>` or `aria-label`, `<th scope="col">` for headers, `<th scope="row">` for row headers
- Sortable columns: `aria-sort="ascending|descending|none"` on `<th>`, update on sort
- Charts: provide a text alternative (`<figcaption>` or `aria-label` with key insight), not just the visual
- Activity feeds: use `<time datetime="ISO-format">` for all timestamps
- Pagination: `aria-label="Pagination"` on `<nav>`, current page has `aria-current="page"`
- Color-only differentiation: never — always add a secondary cue (pattern, label, icon)
