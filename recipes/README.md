# recipes/ — Decision Tree

Read this first when picking which recipes to use. Each recipe is a complete React component you adapt — you do NOT build from scratch.

---

## Step 1 — Identify the page type

| User says... | Page type | Hero recipe |
|---|---|---|
| "landing page", "marketing site", "SaaS" | SaaS | `hero-saas.md` |
| "agency", "studio", "portfolio", "freelance" | Agency | `hero-agency.md` |
| "fintech", "currency", "money", "wallet", "crypto", "banking", "payments" | Fintech | `hero-fintech.md` |
| "dashboard", "analytics", "admin", "control panel" | Dashboard | `dashboard-shell.md` |
| "mobile app", "iOS", "onboarding", "sign-up flow" | Mobile | `mobile-onboarding.md` |

---

## Step 2 — Compose your page from blocks

Most landing pages need 4-6 blocks. Pick from this menu:

### Heroes (always 1)
- `hero-saas.md` — SaaS, B2B, AI products
- `hero-agency.md` — Agencies, studios, portfolios
- `hero-fintech.md` — Money/payment products

### Features (usually 1)
- `features-bento.md` — 4-7 mixed-importance features (default)
- `features-3step.md` — Sequential "how it works" (3 steps only)
- `features-tabs.md` — Product tour with persistent stage (4-6 features)

### Social proof (optional, 0-1)
- *Use the testimonials pattern from `dashboard-shell.md`'s KPI strip, or a horizontal grayscale logo bar after the hero*

### Pricing (only if relevant, 0-1)
- `pricing-2col.md` — 2 tiers + "Talk to sales" link

### FAQ (always 1 if pre-purchase)
- `faq-pillrows.md` — Thin pill rows, never accordion

### Footer (always 1)
- `footer-modern.md` — With ghost wordmark

### Micro-interactions (sprinkled in any block)
- `morphing-button.md` — Click-to-expand pill (newsletter signup)
- `text-roll.md` — Brand-swap word in headline

---

## Step 3 — Always read these BEFORE building

```
Read SKILL.md           # the procedure (you're already here)
Read tokens.md          # colors, fonts, motion presets
Read anti-slop.md       # the patterns to NEVER use
```

These are required for EVERY build. They take ~10 seconds to scan.

---

## Step 4 — Optional reads based on need

| If you're using... | Also read... |
|---|---|
| Any hero with a background image | `recipes/backgrounds-catalog.md` |
| Layout morphs (button → input, card expand) | `tokens.md` "Motion presets" section + `recipes/morphing-button.md` |
| Tab UI / segmented control | `recipes/features-tabs.md` (for `layoutId` pattern) |

---

## Common page compositions

### B2B SaaS landing page (the standard)
```
<HeroSaas />
<TrustLogosBar />        // grayscale, scroll-hint
<FeaturesBento />
<Features3Step />        // "How it works" — only if process matters
<Pricing2Col />
<FaqPillRows />
<FooterModern />
```

### Agency / portfolio landing page
```
<HeroAgency />
<CaseStudiesGrid />      // adapt FeaturesBento — replace features with project tiles
<ServicesList />         // adapt Features3Step
<TestimonialQuote />     // single big quote, not 3-card carousel
<FooterModern />
```

### Fintech landing page
```
<HeroFintech />          // includes live converter widget
<Features3Step />        // "Sign up → Send → Done"
<TrustBar />             // banks, partners, regulators
<Pricing2Col />          // optional — many fintechs are free
<FaqPillRows />
<FooterModern />
```

### Mobile app marketing page (web)
```
<HeroSaas />             // with phone mockup as the product image
<FeaturesBento />        // each card shows a screen
<TestimonialQuote />     // user reviews
<DownloadCTA />          // app store + google play badges
<FooterModern />
```

### In-app dashboard (logged-in)
```
<DashboardShell>
  <KpiStrip />
  <RecentActivityList />
  <ProjectsGrid />
</DashboardShell>
```

---

## Anti-compositions (NEVER do these)

- ❌ Hero + 3 testimonials + features + 3 testimonials + features + footer (alternating reads as desperate)
- ❌ Multiple hero sections (only ONE per page)
- ❌ Pricing AND "talk to sales" big banner (redundant — Pricing has a Talk-to-sales link)
- ❌ FAQ with only 2 questions (combine with Pricing or skip)
- ❌ "How it works" with 5+ steps (use bento or features-tabs instead)

---

## Final check before building

Before you start writing code, confirm:

- [ ] I've identified the page type from the table above
- [ ] I've read SKILL.md, tokens.md, anti-slop.md
- [ ] I know which 4-6 recipe blocks I'll use
- [ ] I've read each chosen recipe file
- [ ] I have a real product context (no Lorem ipsum, no fake screenshots)

If any are NO — go back. Don't ship without all 5.
