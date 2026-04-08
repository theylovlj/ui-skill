# Premium Background Catalog

26 curated AI-generated backgrounds bundled in `assets/backgrounds/`. All are 1920px wide WebP files ready for production use. Source: Ahmed Hassan (@uihsn) Figma collection.

When the user asks to build a hero section or landing page, select a background from the appropriate category below. Copy the file from assets into the project's public/assets directory.

---

## Quick Selection Guide

| Need | Pick From | Files |
|------|-----------|-------|
| Dark/moody hero | Dark Cinematic | 028, 029, 031, 041 |
| Clean SaaS hero | Abstract Gradient | 08, 010, 011, 014, 015, 017, 038, 044 |
| Dreamy/soft hero | Dreamy Bokeh | 09, 019 |
| Nature/aspirational | Pastoral Landscape | 050, 051, 052, 053, 054 |
| Fantasy/magical | Enchanted Nature | 043, 048, 049 |
| Unique/editorial | Atmospheric | 01, 05, 06, 037 |

---

## Category 1: Dark Cinematic
**Files:** AI_Bg_028, AI_Bg_029, AI_Bg_031, AI_Bg_041

Dark backgrounds (60-90% near-black) with isolated light accents. Dramatic, moody, premium.

- **028** — Deep blue-black mountain silhouettes with star particles. Sci-fi/space feel.
- **029** — Misty dark forest with faint golden light beams. Mysterious, organic.
- **031** — Twin stone monoliths rising from pine forest, blood-red sunset between them. Epic, mythic.
- **041** — Diagonal red-orange light leak on pure black. Minimal, cinematic, analog film feel.

**Best for:** Premium brands, dark-mode SaaS, gaming, film, luxury products, creative agencies.

**Text overlay:** White or cream text directly — NO scrim needed. These images are dark enough for text readability out of the box.

```css
.hero-dark-cinematic {
  background: url('/backgrounds/AI_Bg_041.webp') center/cover;
  color: white;
  /* No overlay needed */
}
```

---

## Category 2: Abstract Gradient
**Files:** AI_Bg_08, AI_Bg_010, AI_Bg_011, AI_Bg_014, AI_Bg_015, AI_Bg_017, AI_Bg_038, AI_Bg_044

Pure color fields with smooth or textured transitions. No representational content. The most versatile category — zero narrative conflict with any copy.

- **08** — Deep navy with subtle blue light streaks. Tech/minimal.
- **010** — Cool blue-grey atmospheric gradient. Professional, neutral.
- **011** — Soft white-to-pink gradient with muted warmth. Light, airy.
- **014** — Pastel rainbow gradient (pink, peach, mint, blue). Playful, modern.
- **015** — Soft cyan-to-white gradient. Clean, fresh.
- **017** — Light mint/cream gradient with soft glow. Wellness, calm.
- **038** — Cyan/coral/magenta with vertical ribbed texture (lenticular effect). Energetic, creative.
- **044** — Burnt orange to navy diagonal gradient. Warm sophistication.

**Best for:** SaaS, fintech, mobile app landing pages, startup pitch pages, any hero that needs text readability first.

**Text overlay:** Light gradients (011, 014, 015, 017) use dark text. Dark gradients (08, 044) use white text. Mid-tone gradients (038) use a text container.

```css
/* These can also be approximated in pure CSS for performance */
.hero-gradient {
  background: linear-gradient(135deg, #d94f2b 0%, #1a1a5e 60%, #8b2a5e 100%);
}
```

---

## Category 3: Dreamy Bokeh
**Files:** AI_Bg_09, AI_Bg_019

Soft, blurred, ethereal light patterns. Warm and organic.

- **09** — Flowing white/iridescent light waves on soft white. Elegant, premium.
- **019** — Soft pink/lavender/white gradient with dreamy blur. Wedding/wellness vibe.

**Best for:** Wellness, beauty, luxury, SaaS with a soft touch, creative portfolios.

**Text overlay:** Both are light — use dark text (charcoal or dark navy).

---

## Category 4: Pastoral Landscape
**Files:** AI_Bg_050, AI_Bg_051, AI_Bg_052, AI_Bg_053, AI_Bg_054

Realistic natural scenes — meadows, hills, mountains, wildflowers. Golden-hour or daylight. Tilt-shift bokeh foregrounds.

- **050** — Stone archway on hilltop, golden sunset through arch, wildflowers. Romantic, aspirational.
- **051** — Gentle hilltop, cumulus clouds, pink-tinged sky, wildflowers. Peaceful, optimistic.
- **052** — Stone archway in bright daylight, blue sky, wildflowers. Clean, inviting.
- **053** — Grassy hilltop, bright blue sky, pink flowers in foreground bokeh. Cheerful, summery.
- **054** — Alpine valley, golden hour, rocky cliffs, wildflower meadow. Majestic, grounded luxury.

**Best for:** Wellness, organic brands, travel, real estate, insurance, education, coaching.

**Text overlay:** Bright variants (051-053) need dark text + frosted glass container. Sunset variants (050, 054) work with white text + gradient scrim.

```css
/* Frosted glass text container for bright backgrounds */
.hero-pastoral .text-container {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 2rem 3rem;
}

/* Gradient scrim for sunset variants */
.hero-pastoral-sunset::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 50%);
}
```

---

## Category 5: Fantasy / Enchanted Nature
**Files:** AI_Bg_043, AI_Bg_048, AI_Bg_049

Natural scenes enhanced with magical elements — cosmic nebulae, particle effects, rainbows, glowing creatures. High visual density.

- **043** — Mountain peaks lit with liquid gold particles, sun rising between peaks. Aspirational, transcendent.
- **048** — Towering redwoods, rainbow arc, butterflies, purple nebula through canopy. Enchanted, dense.
- **049** — Grassy hilltop, rainbow, purple cosmic cloud, firefly particles. Joyful, magical.

**Best for:** Gaming, fantasy brands, children's products, creative storytelling, spiritual/wellness, NFT/digital art.

**Text overlay:** These REQUIRE a gradient scrim — too much visual detail for clean text overlay.

```css
.hero-fantasy::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom,
    rgba(0,0,0,0.45) 0%,
    rgba(0,0,0,0.15) 40%,
    transparent 70%
  );
}
```

---

## Category 6: Atmospheric / Unique
**Files:** AI_Bg_01, AI_Bg_05, AI_Bg_06, AI_Bg_037

Distinctive images that don't fit neatly into other categories.

- **01** — Geometric crystal/prism floating in blue light. Abstract tech, futuristic.
- **05** — Wind turbine against soft blue sky. Clean energy, sustainability.
- **06** — Wind turbine with dramatic rainbow gradient sky. Bold, environmental.
- **037** — Earth from orbit, thin blue atmosphere line, city lights. Global, aerospace, deep tech.

**Best for:** Depends on image — tech startups (01), sustainability (05, 06), global platforms (037).

---

## Usage Instructions

### Adding a background to a project
```bash
# Copy from skill assets to project
cp ~/.claude/skills/ui/assets/backgrounds/AI_Bg_041.webp ./public/backgrounds/
```

### HTML pattern
```html
<section class="hero" style="background: url('/backgrounds/AI_Bg_041.webp') center/cover no-repeat">
  <div class="hero-content">
    <h1>Your headline here</h1>
  </div>
</section>
```

### Performance
- All files are WebP, avg ~60KB each
- Use `loading="eager"` and `fetchpriority="high"` for hero backgrounds
- Set a matching `background-color` CSS fallback for loading state
- For mobile, consider `background-position` adjustments to keep focal points visible

### Figma source
Full collection (50+ backgrounds): figma.com/design/1RjQY50dy7t9SucZtAIb1p
Credit: Ahmed Hassan (@uihsn)
