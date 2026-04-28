# recipes/mockup-library.md — Pre-built screen content for device mockups

**Drop these straight into the chrome at the catalog coordinates.** Stops the model from inventing sparse half-empty dashboards.

Each primitive ships with realistic data + correct app density (12-13px body / 28-32px row / 12-16px padding / 1px @ 6-10% borders / NO drop shadows / tabular-nums / tinted status badges).

---

## Pick the right primitive

| Product type | Primitive | Device |
|---|---|---|
| Observability / incident response | `IncidentDashboard` | MacBook |
| Fintech / banking / payments | `FintechDashboard` | MacBook or iPhone |
| Generic SaaS / project management | `ProjectDashboard` | MacBook |
| Mobile consumer app (home view) | `MobileHome` | iPhone |
| Smart home / IoT app | `SmartHomeMobile` | iPhone |
| Music / audio / creator | `MusicPlayer` | iPhone or MacBook |
| Messaging / chat | `ChatScreen` | iPhone or MacBook |
| Calendar / scheduler | `CalendarView` | MacBook or iPad |

---

## 1. IncidentDashboard (observability — Stratus, Datadog, etc.)

```jsx
function IncidentDashboard() {
  return (
    <div className="flex h-full bg-stone-50 text-stone-900 text-[13px] font-sans">
      {/* Sidebar 240px */}
      <aside className="w-[240px] border-r border-stone-200 bg-stone-100/50 flex flex-col">
        <div className="h-11 px-3 flex items-center gap-2 border-b border-stone-200">
          <div className="size-5 rounded bg-stone-900" />
          <span className="font-semibold">stratus</span>
        </div>
        <div className="flex-1 px-2 py-2">
          <div className="px-2 pt-3 pb-1 text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Workspace</div>
          {[
            ["Overview", null],
            ["Incidents", "8"],
            ["Services", "147"],
            ["Alerts", "3"],
            ["Runbooks", null],
          ].map(([label, count]) => (
            <div key={label} className={`h-7 px-2 rounded flex items-center justify-between text-[13px] ${label === "Incidents" ? "bg-stone-200/70 font-medium" : "hover:bg-stone-200/40"}`}>
              <span>{label}</span>
              {count && <span className="text-[11px] tabular-nums text-stone-500">{count}</span>}
            </div>
          ))}
          <div className="px-2 pt-4 pb-1 text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Monitoring</div>
          {["Dashboards", "Logs", "Traces", "Metrics"].map(label => (
            <div key={label} className="h-7 px-2 rounded text-[13px] hover:bg-stone-200/40 flex items-center">{label}</div>
          ))}
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Topbar 44px */}
        <div className="h-11 px-4 border-b border-stone-200 flex items-center justify-between text-[13px]">
          <div className="text-stone-500">workspace <span className="text-stone-300 mx-1">/</span> incidents <span className="text-stone-300 mx-1">/</span> <span className="text-stone-900">INC-2841</span></div>
          <div className="flex items-center gap-3 text-[12px]">
            <span className="flex items-center gap-1.5"><span className="size-1.5 rounded-full bg-emerald-500" />Live · synced 2s ago</span>
            <span className="size-7 rounded-full bg-stone-300" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-hidden">
          {/* KPI strip */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              ["MTTD", "42s", "↓ 38% vs 30d", "emerald"],
              ["MTTR", "6m 18s", "↓ 21% vs 30d", "emerald"],
              ["ACTIVE", "3", "2 SEV2 · 1 SEV1", "stone"],
              ["HEALTHY", "247 / 251", "98.4%", "emerald"],
            ].map(([label, value, delta, color]) => (
              <div key={label} className="border border-stone-200 rounded-lg p-3 bg-white">
                <div className="text-[10px] uppercase tracking-wider text-stone-500 font-semibold mb-1">{label}</div>
                <div className="text-[22px] font-semibold tabular-nums">{value}</div>
                <div className={`text-[11px] mt-0.5 ${color === "emerald" ? "text-emerald-700" : "text-stone-500"}`}>{delta}</div>
              </div>
            ))}
          </div>

          {/* Active incidents */}
          <div className="border border-stone-200 rounded-lg bg-white">
            <div className="px-3 h-9 border-b border-stone-200 flex items-center justify-between">
              <span className="text-[13px] font-semibold">Active incidents</span>
              <span className="text-[11px] text-stone-500">8 open</span>
            </div>
            <div className="text-[12px]">
              {[
                ["SEV1", "INC-2841", "Elevated 5xx on /v1/checkout (eu-west-1)", "Maya", "4m 12s", "red"],
                ["SEV1", "INC-2840", "Redis primary failover — payments cluster", "Devon", "11m", "red"],
                ["SEV2", "INC-2837", "auth-service: 0.043% 5xx spike", "Ana", "27m", "amber"],
                ["SEV2", "INC-2832", "GraphQL N+1 detected on /search", "Yuki", "1h 04m", "amber"],
                ["SEV3", "INC-2828", "Worker queue lag — invoicing", "Arjun", "2h", "blue"],
                ["SEV3", "INC-2823", "S3 replication delay — eu-west-2", "Lin", "3h 18m", "blue"],
              ].map(([sev, id, title, owner, age, color]) => (
                <div key={id} className="h-8 px-3 grid grid-cols-[60px_80px_1fr_70px_70px] items-center gap-3 border-b border-stone-100 last:border-0 hover:bg-stone-50">
                  <span className={`text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-${color}-950 text-${color}-400 border border-${color}-900 inline-flex items-center justify-center`}>{sev}</span>
                  <span className="text-stone-500 tabular-nums">{id}</span>
                  <span className="truncate">{title}</span>
                  <span className="text-stone-500">{owner}</span>
                  <span className="text-stone-500 tabular-nums text-right">{age}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 2. FintechDashboard (banking / payments / treasury)

```jsx
function FintechDashboard() {
  return (
    <div className="flex h-full bg-white text-stone-900 text-[13px]">
      <aside className="w-[224px] border-r border-stone-200 p-2">
        <div className="h-9 px-2 flex items-center gap-2 mb-3">
          <div className="size-5 rounded bg-stone-900" />
          <span className="font-semibold">Treasury</span>
        </div>
        {["Accounts", "Transactions", "Cards", "Transfers", "Recipients", "Statements"].map((l, i) => (
          <div key={l} className={`h-8 px-2 rounded flex items-center text-[13px] ${i === 1 ? "bg-stone-100 font-medium" : ""}`}>{l}</div>
        ))}
      </aside>
      <main className="flex-1 p-5 overflow-hidden">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Operating · USD</div>
            <div className="text-[36px] font-semibold tabular-nums tracking-tight">$1,847,394.<span className="text-stone-400">22</span></div>
            <div className="text-[12px] text-emerald-700 mt-0.5">↑ $42,184 this week</div>
          </div>
          <button className="px-4 h-9 rounded-full bg-stone-900 text-white text-[13px] font-medium">Send money</button>
        </div>
        <div className="border border-stone-200 rounded-lg overflow-hidden">
          <div className="h-9 px-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/50">
            <span className="text-[13px] font-semibold">Recent transactions</span>
            <span className="text-[11px] text-stone-500">Last 7 days</span>
          </div>
          <div className="text-[12px]">
            {[
              ["Apr 28", "14:32", "Stripe payout", "ACH credit", "+$12,847.50", "emerald"],
              ["Apr 28", "11:08", "AWS — eu-west-1", "Card · ending 4188", "−$3,481.22", "stone"],
              ["Apr 27", "22:14", "Vercel Inc.", "Wire · outbound", "−$840.00", "stone"],
              ["Apr 27", "16:50", "Linear Pro · annual", "Card · ending 4188", "−$948.00", "stone"],
              ["Apr 27", "09:12", "Refund — Order #8412", "ACH credit", "+$129.99", "emerald"],
              ["Apr 26", "18:42", "Payroll batch", "ACH outbound × 12", "−$48,128.50", "stone"],
            ].map(([d, t, payee, method, amt, color], i) => (
              <div key={i} className="h-9 px-4 grid grid-cols-[80px_1fr_1fr_120px] items-center gap-3 border-b border-stone-100 last:border-0">
                <span className="text-stone-500 tabular-nums">{d} · {t}</span>
                <span className="font-medium">{payee}</span>
                <span className="text-stone-500">{method}</span>
                <span className={`tabular-nums text-right ${color === "emerald" ? "text-emerald-700" : ""}`}>{amt}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
```

---

## 3. MobileHome (generic iOS home / consumer app — vertical iPhone)

```jsx
function MobileHome() {
  return (
    <div className="h-full bg-stone-50 flex flex-col text-[14px] font-sans">
      {/* Status bar */}
      <div className="h-11 px-6 flex items-center justify-between text-[13px] font-semibold pt-3">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px]">●●●●●</span>
          <span className="text-[10px]">100</span>
        </div>
      </div>
      {/* Header */}
      <div className="px-5 pt-4 pb-3">
        <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Tuesday, Apr 28</div>
        <div className="text-[28px] font-semibold tracking-tight">Good evening, Maya.</div>
      </div>
      {/* Cards */}
      <div className="px-4 flex-1 space-y-3 overflow-hidden">
        <div className="bg-white rounded-2xl p-4 border border-stone-200/60">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Living room</span>
            <span className="size-2 rounded-full bg-emerald-500" />
          </div>
          <div className="text-[24px] font-semibold tabular-nums">21.4°<span className="text-stone-400 text-[16px]"> / 47% RH</span></div>
          <div className="text-[12px] text-stone-500 mt-1">Holding · target 22.0°</div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-2xl p-4 border border-stone-200/60">
            <div className="size-8 rounded-lg bg-amber-100 mb-3" />
            <div className="text-[13px] font-semibold">Lights · 4 of 7</div>
            <div className="text-[11px] text-stone-500">Kitchen · Hall</div>
          </div>
          <div className="bg-white rounded-2xl p-4 border border-stone-200/60">
            <div className="size-8 rounded-lg bg-blue-100 mb-3" />
            <div className="text-[13px] font-semibold">Locked · all</div>
            <div className="text-[11px] text-stone-500">Front · Garage</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-4 border border-stone-200/60">
          <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-2">Recent activity</div>
          {[
            ["Front door unlocked", "Maya · 6:42 PM"],
            ["Goodnight scene started", "Auto · 6:30 PM"],
            ["Bedroom temp adjusted", "Hearth · 6:12 PM"],
          ].map(([t, m]) => (
            <div key={t} className="py-2 border-t border-stone-100 first:border-0 first:pt-0">
              <div className="text-[13px] font-medium">{t}</div>
              <div className="text-[11px] text-stone-500">{m}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Tab bar */}
      <div className="h-16 border-t border-stone-200 grid grid-cols-4 px-4 pt-2">
        {["Home", "Devices", "Activity", "You"].map((l, i) => (
          <div key={l} className="flex flex-col items-center gap-0.5">
            <div className={`size-5 rounded ${i === 0 ? "bg-stone-900" : "bg-stone-300"}`} />
            <span className={`text-[10px] ${i === 0 ? "text-stone-900 font-semibold" : "text-stone-500"}`}>{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## 4. SmartHomeMobile (Hearth-style — devices grid)

Use `MobileHome` above as starting point — already smart-home themed. Swap the activity feed for room cards:

```jsx
{/* Room grid in place of activity feed */}
<div className="bg-white rounded-2xl p-4 border border-stone-200/60">
  <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold mb-3">Rooms</div>
  <div className="grid grid-cols-3 gap-2">
    {["Living", "Kitchen", "Bedroom", "Bath", "Office", "Hall"].map((r, i) => (
      <div key={r} className="aspect-square rounded-xl bg-stone-100 p-2 flex flex-col justify-between">
        <div className={`size-2 rounded-full ${i < 4 ? "bg-emerald-500" : "bg-stone-300"}`} />
        <div>
          <div className="text-[12px] font-semibold">{r}</div>
          <div className="text-[10px] text-stone-500 tabular-nums">{i < 4 ? "21°" : "off"}</div>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## 5. MusicPlayer (creator / audio products)

```jsx
function MusicPlayer() {
  return (
    <div className="h-full bg-stone-900 text-stone-100 flex flex-col text-[13px]">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="size-64 rounded-2xl bg-gradient-to-br from-amber-200 via-orange-300 to-rose-400 mb-6" />
        <div className="text-center mb-1">
          <div className="text-[20px] font-semibold tracking-tight">Lebensraum (Slowed)</div>
          <div className="text-[13px] text-stone-400">Lucia Marchetti · Field Notes Vol. 04</div>
        </div>
      </div>
      <div className="px-8 pb-6">
        <div className="h-1 bg-stone-700 rounded-full overflow-hidden mb-2">
          <div className="h-full w-1/3 bg-stone-100" />
        </div>
        <div className="flex justify-between text-[11px] tabular-nums text-stone-400 mb-5">
          <span>1:42</span>
          <span>−3:08</span>
        </div>
        <div className="flex items-center justify-around">
          <div className="size-8 rounded-full bg-stone-700" />
          <div className="size-10 rounded-full bg-stone-700" />
          <div className="size-14 rounded-full bg-stone-100" />
          <div className="size-10 rounded-full bg-stone-700" />
          <div className="size-8 rounded-full bg-stone-700" />
        </div>
      </div>
    </div>
  );
}
```

---

## 6. ChatScreen (messaging / customer support / AI assistant)

```jsx
function ChatScreen() {
  const messages = [
    { from: "them", text: "Hey — got a sec? My deploy is paging in eu-west-1.", time: "14:32" },
    { from: "me", text: "On it. What's the alert say?", time: "14:32" },
    { from: "them", text: "Elevated 5xx, payments-api. ~4.7 errs/s, climbing.", time: "14:33" },
    { from: "me", text: "Stratus has it correlated to deploy a3f1c22 — 2 min ago. Rolling back now.", time: "14:34" },
    { from: "them", text: "Rolled back. Error rate dropping.", time: "14:36" },
    { from: "me", text: "Nice catch. Drafting the post-mortem in #incidents.", time: "14:37" },
  ];
  return (
    <div className="h-full bg-stone-50 flex flex-col text-[14px]">
      <div className="h-12 px-4 border-b border-stone-200 bg-white flex items-center gap-3">
        <div className="size-8 rounded-full bg-amber-300" />
        <div>
          <div className="text-[13px] font-semibold">Devon Park</div>
          <div className="text-[11px] text-emerald-600 flex items-center gap-1"><span className="size-1.5 rounded-full bg-emerald-500" />Active</div>
        </div>
      </div>
      <div className="flex-1 p-4 space-y-2 overflow-hidden">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-[13px] ${m.from === "me" ? "bg-stone-900 text-white" : "bg-white border border-stone-200"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-stone-200 bg-white">
        <div className="h-10 px-4 rounded-full bg-stone-100 flex items-center text-[13px] text-stone-500">Reply to Devon…</div>
      </div>
    </div>
  );
}
```

---

## 7. ProjectDashboard (generic SaaS — Linear-style)

```jsx
function ProjectDashboard() {
  return (
    <div className="flex h-full bg-stone-50 text-stone-900 text-[13px]">
      <aside className="w-[224px] border-r border-stone-200 p-2">
        <div className="h-9 px-2 flex items-center gap-2 mb-2">
          <div className="size-5 rounded bg-stone-900" />
          <span className="font-semibold">Acme Studio</span>
        </div>
        {[["Inbox", "12"], ["My Issues", "8"], ["Projects", null], ["Views", null], ["Roadmap", null]].map(([l, c]) => (
          <div key={l} className="h-8 px-2 rounded flex items-center justify-between text-[13px]">
            <span>{l}</span>
            {c && <span className="text-[11px] tabular-nums text-stone-500">{c}</span>}
          </div>
        ))}
      </aside>
      <main className="flex-1 p-5 overflow-hidden">
        <div className="flex items-baseline justify-between mb-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">Project</div>
            <div className="text-[24px] font-semibold tracking-tight">Q2 Mobile Refactor</div>
          </div>
          <div className="text-[12px] text-stone-500">38 / 64 done · 7 in review</div>
        </div>
        <div className="border border-stone-200 rounded-lg bg-white">
          {[
            ["IN PROGRESS", "ENG-1284", "Migrate auth to OAuth 2.1 device flow", "Maya", "Apr 28"],
            ["IN PROGRESS", "ENG-1281", "Refactor checkout queue worker", "Devon", "Apr 28"],
            ["IN REVIEW", "ENG-1278", "Tabular nums on currency cells", "Ana", "Apr 27"],
            ["IN REVIEW", "ENG-1276", "Pagination cursor consistency", "Yuki", "Apr 27"],
            ["TODO", "ENG-1273", "Dark mode for transactions list", "Arjun", "Apr 30"],
            ["TODO", "ENG-1271", "Fix safe-area inset on iPad split view", "Lin", "May 02"],
          ].map(([status, id, title, owner, due], i) => (
            <div key={id} className="h-9 px-4 grid grid-cols-[100px_80px_1fr_80px_80px] items-center gap-3 border-b border-stone-100 last:border-0 text-[12px]">
              <span className={`text-[10px] font-semibold uppercase tracking-wider ${status === "IN PROGRESS" ? "text-amber-700" : status === "IN REVIEW" ? "text-blue-700" : "text-stone-500"}`}>{status}</span>
              <span className="text-stone-500 tabular-nums">{id}</span>
              <span className="truncate font-medium">{title}</span>
              <span className="text-stone-500">{owner}</span>
              <span className="text-stone-500 tabular-nums text-right">{due}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
```

---

## CALENDAR / SCHEDULING

For calendar product mockups, build a 5-day week grid with events. Day columns 14% wide, 60-min rows 56px tall. Events as rounded blocks with 4px hairline accent stripe on left.

---

## Composing into a device

Pull the chrome from `assets/mockups/` and use the catalog coordinates:

```jsx
import { IncidentDashboard } from "./mockup-library";

<div className="relative inline-block w-full max-w-[clamp(28rem,42vw,52rem)]">
  <div
    className="absolute overflow-hidden rounded-md"
    style={{ top: "5.5%", left: "12%", width: "76%", height: "82%" }}
  >
    <IncidentDashboard />
  </div>
  <img src="/mockups/macbook-pro-14.webp" alt="" aria-hidden
       className="relative block w-full h-auto pointer-events-none select-none" />
</div>
```

For iPhone, use `iphone-16-pro-black.webp` + coordinates `top: 3%, left: 5%, width: 90%, height: 94%, borderRadius: 8%`.

---

## Cross-references

- `recipes/device-mockups-catalog.md` — all 17 devices + screen-area coordinates
- `recipes/asset-sourcing.md` — how to download legit logos / images
- `spacing.md` § DASHBOARD DENSITY — why these primitives use the values they do
- `anti-slop.md` § Mockup compositing — the 2-layer wrapper rule
