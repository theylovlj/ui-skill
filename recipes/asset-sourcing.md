# recipes/asset-sourcing.md — How to find and download legit logos & images

**Stop letting the model fake App Store badges, Google Play buttons, and brand logos with divs and gradients.** Real brand assets exist for free, are CC0 or freely licensed, and are one `curl` away.

---

## DECISION TREE — what do I need?

| Need | Source | License |
|---|---|---|
| Apple App Store badge | Apple Marketing Resources | Apple guidelines (free use) |
| Google Play "Get it on" badge | Google Play Brand Guidelines | Google guidelines (free use) |
| Microsoft Store badge | Microsoft Store Marketing Tools | Microsoft guidelines |
| Mac App Store badge | Apple Marketing Resources | Apple guidelines |
| Tech brand logo (any major company) | **simpleicons.org** (3500+ SVGs) | CC0 |
| Brand logos in SVG | **worldvectorlogo.com** | Free for personal/commercial |
| Specific brand SVG | **vectorlogo.zone** (1700+) | Free |
| Stock photography | **picsum.photos** (deterministic by seed) | CC0 |
| Stock photography (curated) | **unsplash.com** API (with attribution) | Unsplash License |
| App icons / iconography | **lucide.dev** / **phosphor-icons.com** / **radix-ui.com/icons** | MIT / ISC / MIT |
| Illustration sets | **undraw.co** / **blush.design** | MIT / various free |
| Country flags | **flagcdn.com** / **circle-flags** package | Public domain |
| Crypto / token logos | **cryptoicons.org** / **cryptologos.cc** | Free |

---

## APP STORE / GOOGLE PLAY BADGES (the right way)

The `● Download on the App Store` style fake button the model defaults to is SLOP. Real apps use the official badges.

### Apple App Store badge

**Official source:** https://developer.apple.com/app-store/marketing/guidelines/

The badge SVG embedded inline (CC: Apple, free use under marketing guidelines):

```jsx
function AppStoreBadge({ className = "h-12" }: { className?: string }) {
  return (
    <a href="#" className={`inline-block ${className}`} aria-label="Download on the App Store">
      <img
        src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
        alt="Download on the App Store"
        className="h-full w-auto"
      />
    </a>
  );
}
```

The hosted URL Apple provides is the canonical source — auto-updates if Apple updates the badge.

**Color variants:** `/black/`, `/white/`, `/standard-black/`, `/standard-white/` in the URL.

**Localized:** swap `/en-us` for `/de-de`, `/ja-jp`, `/fr-fr`, etc. (39 locales supported).

### Google Play badge

**Official source:** https://play.google.com/intl/en_us/badges/

```jsx
function GooglePlayBadge({ className = "h-12" }: { className?: string }) {
  return (
    <a href="#" className={`inline-block ${className}`} aria-label="Get it on Google Play">
      <img
        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
        alt="Get it on Google Play"
        className="h-full w-auto"
      />
    </a>
  );
}
```

To download locally for self-hosting:
```bash
curl -o public/google-play-badge.png \
  "https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
```

### Combined Apple + Google badges

```jsx
<div className="flex items-center gap-3">
  <AppStoreBadge className="h-12" />
  <GooglePlayBadge className="h-12" />
</div>
```

**Sizing:** match heights, NOT widths (the badges have different aspect ratios). 40-56px height range. Never stretch them.

**Spacing:** 12-16px gap between badges. NEVER overlap them or put borders around them.

**Don't:**
- ❌ Don't render the badges with `<button className="bg-black rounded-lg">App Store</button>` (the AI default — banned)
- ❌ Don't add a `●` dot prefix or "v3.4 LIVE" pill above them
- ❌ Don't tint the badges your brand color — use the official black or white variant

---

## TECH BRAND LOGOS (simpleicons.org)

For "Trusted by these companies" logo strips, the cleanest source is simpleicons.org — 3500+ brand SVGs, CC0, single-color, perfectly optimized.

### Inline (no download)

```jsx
import { SiVercel, SiStripe, SiLinear, SiFigma, SiNotion } from "@icons-pack/react-simple-icons";

<div className="flex items-center gap-12 grayscale opacity-60">
  <SiVercel size={28} />
  <SiStripe size={32} />
  <SiLinear size={28} />
  <SiFigma size={28} />
  <SiNotion size={28} />
</div>
```

Install: `npm i @icons-pack/react-simple-icons` (3500+ React components, tree-shakeable).

### Direct CDN (no install)

```jsx
<img
  src="https://cdn.simpleicons.org/vercel"
  alt="Vercel"
  className="h-7 w-auto"
/>
```

URL pattern: `https://cdn.simpleicons.org/{slug}` or `https://cdn.simpleicons.org/{slug}/{hex_color}`.

Examples:
- `https://cdn.simpleicons.org/vercel/000000`
- `https://cdn.simpleicons.org/stripe/635BFF`
- `https://cdn.simpleicons.org/openai/000000`

Find the slug at simpleicons.org/?q=brandname.

### Download local copies

```bash
mkdir -p public/logos
for brand in vercel stripe linear figma notion supabase openai anthropic; do
  curl -o "public/logos/${brand}.svg" "https://cdn.simpleicons.org/${brand}"
done
```

---

## REAL BRAND COMPLIANCE LOGOS (SOC 2, HIPAA, etc.)

These are not on simpleicons. Sources:

| Logo | Source |
|---|---|
| SOC 2 (AICPA) | https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services |
| HIPAA | Not a logo — say "HIPAA-compliant" in text. No official badge exists. |
| ISO 27001 | https://www.iso.org/iso-27001-information-security.html |
| GDPR | Wikipedia public domain SVG |
| PCI DSS | https://www.pcisecuritystandards.org/about_us/press_releases/ |

**Important:** these badges have strict usage rules. Most require you to actually be certified. If you're not, render the compliance label as TEXT (`SOC 2 Type II compliant`), not a badge. Faking compliance badges is a legal issue, not a design choice.

---

## STOCK PHOTOGRAPHY

### picsum.photos (deterministic, free, CC0)

```jsx
<img
  src={`https://picsum.photos/seed/${stableId}/600/400`}
  alt=""
  className="rounded-lg"
/>
```

Same `seed` = same photo. Use semantic seeds (`testimonial-maya-okafor`, not `test1`).

### Unsplash (curated, requires attribution)

```jsx
{/* Unsplash API URL — auto-attributes if you use the API + UTM params */}
<img
  src="https://images.unsplash.com/photo-1545987796-200677ee1011?w=800&q=80"
  alt="Photo by Annie Spratt on Unsplash"
/>
```

Better: use the Unsplash API for permissioned use with attribution:
```bash
# Get a free dev API key at unsplash.com/developers
curl "https://api.unsplash.com/photos/random?query=workspace&client_id=YOUR_KEY"
```

---

## DOWNLOADING ASSETS — the safe pattern

When the user wants real logos / images downloaded into the project:

```bash
# Make a public/ folder for static assets
mkdir -p public/logos public/images

# Download from a known canonical URL
curl -o public/logos/apple-app-store.svg \
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Download_on_the_App_Store_Badge.svg/1280px-Download_on_the_App_Store_Badge.svg.png"

# Verify the file is real and not an HTML error page
file public/logos/apple-app-store.svg
# Should say: SVG XML or PNG image data — NOT "HTML document"

# If file is broken, the URL changed. Check the source page directly:
# - Apple: https://developer.apple.com/app-store/marketing/guidelines/
# - Google: https://play.google.com/intl/en_us/badges/
# - simpleicons: https://simpleicons.org/?q=brandname
```

**Always verify downloads:**
```bash
ls -lh public/logos/  # Should show file sizes — 0KB or 4KB usually = error page
```

---

## THE NEVER-FAKE LIST

These cannot be faked with divs/gradients. ALWAYS use the real asset:

- ❌ App Store / Google Play / Microsoft Store badges
- ❌ Brand logos in "Trusted by" / "As seen in" strips
- ❌ Compliance badges (SOC 2, ISO, etc.) — use text instead if you're not certified
- ❌ Payment provider logos (Visa, Mastercard, PayPal, Stripe) — they have specific brand kits
- ❌ Operating system logos (Apple, Windows, Linux) — simpleicons has these
- ❌ Country flags — `circle-flags` npm package or flagcdn.com

---

## QUICK CODE — drop-in CTAs section

The standard "Available on iOS / Android" section, done right:

```jsx
function AppStoreCTAs() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <a href="#" className="inline-block hover:opacity-80 transition-opacity">
        <img
          src="https://tools.applemediaservices.com/api/badges/download-on-the-app-store/black/en-us"
          alt="Download on the App Store"
          className="h-12 w-auto"
        />
      </a>
      <a href="#" className="inline-block hover:opacity-80 transition-opacity">
        <img
          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
          alt="Get it on Google Play"
          className="h-[3.6rem] w-auto -my-1.5"
          // Slight negative margin compensates for Google's looser badge bbox
        />
      </a>
    </div>
  );
}
```

---

## CROSS-REFERENCES

- `recipes/mockup-library.md` — pre-built screen content for device mockups
- `recipes/device-mockups-catalog.md` — all 17 bundled device chromes
- `anti-slop.md` § Floating-chip family — the banned `● Download on the App Store` fake-button pattern
