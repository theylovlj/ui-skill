# Premium Landing Page Section Templates

> **Usage**: These are complete, production-ready React + Tailwind v4 components.
> Copy the section you need, adapt colors/copy/images, and drop it into any page.
> Every component is self-contained and independently exportable.

---

## Google Fonts Import

Place this in your `index.html` `<head>` or at the top of your root CSS file:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
```

---

## Global CSS (Required)

Add this to your global CSS file or `index.css`:

```css
/* ── Grain / Noise Overlay ── */
.grain-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 256px 256px;
}

/* ── Marquee / Infinite Ticker ── */
@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 30s linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

/* ── Font families ── */
.font-serif-display {
  font-family: 'DM Serif Display', serif;
}

.font-body {
  font-family: 'DM Sans', sans-serif;
}

/* ── Custom easing ── */
:root {
  --ease-premium: cubic-bezier(0.25, 1, 0.5, 1);
}
```

---

## Shared Utilities

```jsx
// utils/animations.js
// Shared animation config for all sections

export const EASING = [0.25, 1, 0.5, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASING },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: EASING },
  },
};
```

---

## SECTION 1: Dark Cinematic Hero with Floating Converter Widget

```jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASING, delay: i * 0.1 },
  }),
};

const avatars = [
  "https://i.pravatar.cc/40?img=1",
  "https://i.pravatar.cc/40?img=2",
  "https://i.pravatar.cc/40?img=3",
  "https://i.pravatar.cc/40?img=4",
  "https://i.pravatar.cc/40?img=5",
];

export default function HeroCinematic({
  eyebrow = "Introducing Acme Platform",
  headline = "Financial clarity,\nbeautifully delivered.",
  body = "The modern platform for teams who refuse to settle. Real-time insights, seamless payments, and tools that actually respect your time.",
  primaryCta = "Start for free",
  secondaryCta = "See how it works",
  backgroundImage = null,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden font-body"
      style={{
        background: backgroundImage
          ? undefined
          : "linear-gradient(135deg, oklch(0.15 0.03 260) 0%, oklch(0.18 0.04 300) 40%, oklch(0.14 0.03 45) 100%)",
      }}
    >
      {/* Background image layer */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.15 0.03 260 / 0.92) 0%, oklch(0.18 0.04 300 / 0.88) 40%, oklch(0.14 0.03 45 / 0.9) 100%)",
            }}
          />
        </div>
      )}

      {/* Grain overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative gradient blobs */}
      <div
        className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "oklch(0.65 0.2 30)" }}
      />
      <div
        className="absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full opacity-15 blur-[100px]"
        style={{ background: "oklch(0.55 0.18 280)" }}
      />

      {/* Content */}
      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* ── Left: Copy ── */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
            }}
          >
            {/* Eyebrow */}
            <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center gap-3">
              <span
                className="block h-5 w-[3px] rounded-full"
                style={{ background: "oklch(0.7 0.18 45)" }}
              />
              <span
                className="text-sm font-medium uppercase tracking-[0.15em]"
                style={{ color: "oklch(0.7 0.18 45)" }}
              >
                {eyebrow}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              custom={1}
              className="font-serif-display text-5xl leading-[1.08] font-normal tracking-tight text-white sm:text-6xl lg:text-7xl"
              style={{ whiteSpace: "pre-line" }}
            >
              {headline}
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-lg text-lg leading-relaxed"
              style={{ color: "oklch(0.75 0.02 260)" }}
            >
              {body}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} custom={3} className="mt-10 flex items-center gap-6">
              <a
                href="#"
                className="inline-flex items-center rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
                style={{
                  background: "oklch(0.6 0.2 30)",
                  boxShadow: "0 8px 32px oklch(0.6 0.2 30 / 0.3)",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                {primaryCta}
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#"
                className="text-sm font-medium transition-colors duration-300"
                style={{ color: "oklch(0.75 0.02 260)" }}
                onMouseEnter={(e) => (e.target.style.color = "oklch(0.9 0 0)")}
                onMouseLeave={(e) => (e.target.style.color = "oklch(0.75 0.02 260)")}
              >
                {secondaryCta} &rarr;
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div variants={fadeUp} custom={4} className="mt-14 flex items-center gap-4">
              <div className="flex -space-x-2">
                {avatars.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 object-cover"
                    style={{ borderColor: "oklch(0.18 0.04 300)" }}
                  />
                ))}
              </div>
              <div>
                <p className="text-xs font-medium text-white/80">
                  Trusted by <span className="text-white">2,400+</span> teams
                </p>
                <p className="text-[11px]" style={{ color: "oklch(0.6 0.02 260)" }}>
                  Stripe &middot; Linear &middot; Vercel &middot; Raycast
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Floating Card Widget ── */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotateY: -6, rotateX: 4 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    rotateY: -3,
                    rotateX: 2,
                    transition: { duration: 0.9, ease: EASING, delay: 0.3 },
                  }
                : {}
            }
            className="relative hidden lg:block"
            style={{ perspective: "1200px" }}
          >
            <div
              className="relative mx-auto w-[380px] rounded-3xl border p-8"
              style={{
                background: "oklch(0.2 0.02 280 / 0.6)",
                borderColor: "oklch(0.4 0.02 280 / 0.2)",
                backdropFilter: "blur(24px)",
                boxShadow:
                  "0 24px 80px oklch(0 0 0 / 0.4), 0 0 0 1px oklch(1 0 0 / 0.05) inset",
                transform: "rotateY(-3deg) rotateX(2deg)",
              }}
            >
              {/* Card header */}
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider" style={{ color: "oklch(0.6 0.02 260)" }}>
                    Send money
                  </p>
                  <p className="font-serif-display mt-1 text-2xl text-white">$4,250.00</p>
                </div>
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{ background: "oklch(0.6 0.2 30 / 0.15)" }}
                >
                  <svg className="h-5 w-5" style={{ color: "oklch(0.7 0.18 30)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </div>

              {/* Recipient */}
              <div
                className="mb-6 rounded-2xl border p-4"
                style={{
                  background: "oklch(0.15 0.02 280 / 0.5)",
                  borderColor: "oklch(0.35 0.02 280 / 0.2)",
                }}
              >
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider" style={{ color: "oklch(0.55 0.02 260)" }}>
                  To
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/36?img=12"
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-sm font-medium text-white">Sarah Mitchell</p>
                    <p className="text-xs" style={{ color: "oklch(0.55 0.02 260)" }}>
                      @sarah.mitchell
                    </p>
                  </div>
                </div>
              </div>

              {/* Details row */}
              <div className="mb-6 flex justify-between text-xs" style={{ color: "oklch(0.55 0.02 260)" }}>
                <span>Fee: $0.00</span>
                <span>Arrives instantly</span>
              </div>

              {/* CTA */}
              <button
                className="w-full rounded-full py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: "oklch(0.6 0.2 30)",
                  boxShadow: "0 8px 24px oklch(0.6 0.2 30 / 0.25)",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                Send now
              </button>
            </div>

            {/* Floating accent card behind */}
            <div
              className="absolute -right-6 -bottom-6 -z-10 h-[200px] w-[300px] rounded-2xl"
              style={{
                background: "linear-gradient(135deg, oklch(0.5 0.15 30 / 0.15), oklch(0.4 0.1 280 / 0.1))",
                border: "1px solid oklch(0.4 0.02 280 / 0.1)",
                backdropFilter: "blur(12px)",
                transform: "rotate(6deg)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

---

## SECTION 2: Bento Feature Grid (Non-Uniform)

```jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASING },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

function SparklineSVG() {
  return (
    <svg viewBox="0 0 120 40" className="h-10 w-full" fill="none">
      <polyline
        points="0,35 10,30 20,32 30,22 40,25 50,15 60,18 70,10 80,12 90,5 100,8 110,3 120,6"
        stroke="oklch(0.6 0.2 30)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="oklch(0.6 0.2 30)" stopOpacity="0.2" />
        <stop offset="100%" stopColor="oklch(0.6 0.2 30)" stopOpacity="0" />
      </linearGradient>
      <polygon
        points="0,35 10,30 20,32 30,22 40,25 50,15 60,18 70,10 80,12 90,5 100,8 110,3 120,6 120,40 0,40"
        fill="url(#spark-fill)"
      />
    </svg>
  );
}

function IconShield() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function IconZap() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

function IconChart() {
  return (
    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

export default function BentoFeatureGrid({
  eyebrow = "Why teams choose us",
  headlineAccent = "Everything you need.",
  headlineMuted = "Nothing you don't.",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 font-body lg:py-36"
      style={{ background: "oklch(0.97 0.005 80)" }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-16 max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "oklch(0.6 0.2 30)" }}
          >
            {eyebrow}
          </motion.p>
          <motion.h2 variants={fadeUp} className="font-serif-display text-4xl leading-tight sm:text-5xl lg:text-6xl">
            <span style={{ color: "oklch(0.15 0.02 260)" }}>{headlineAccent}</span>
            <br />
            <span style={{ color: "oklch(0.55 0.02 260)" }}>{headlineMuted}</span>
          </motion.h2>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid auto-rows-[minmax(260px,auto)] grid-cols-1 gap-4 md:grid-cols-3"
        >
          {/* ── Card 1: Large featured (2 col) ── */}
          <motion.div
            variants={fadeUp}
            className="group relative col-span-1 overflow-hidden rounded-3xl border transition-all duration-500 md:col-span-2"
            style={{
              borderColor: "oklch(0.88 0.01 80)",
              background: "oklch(1 0 0)",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="flex h-full flex-col justify-between p-8 lg:p-10">
              <div className="max-w-md">
                <div
                  className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium"
                  style={{
                    borderColor: "oklch(0.6 0.2 30 / 0.2)",
                    color: "oklch(0.5 0.18 30)",
                    background: "oklch(0.6 0.2 30 / 0.06)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: "oklch(0.6 0.2 30)" }} />
                  Real-time analytics
                </div>
                <h3 className="font-serif-display text-2xl lg:text-3xl" style={{ color: "oklch(0.15 0.02 260)" }}>
                  See every metric that matters, updated live.
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 260)" }}>
                  Your dashboard tracks revenue, churn, MRR, and 40+ other metrics in real time with zero configuration required.
                </p>
              </div>
              {/* Embedded illustration: sparkline area */}
              <div className="mt-6 rounded-2xl border p-4" style={{ borderColor: "oklch(0.92 0.005 80)", background: "oklch(0.985 0.003 80)" }}>
                <div className="mb-2 flex items-end justify-between">
                  <p className="text-xs font-medium" style={{ color: "oklch(0.5 0.02 260)" }}>Monthly Revenue</p>
                  <p className="text-xs font-semibold" style={{ color: "oklch(0.45 0.18 145)" }}>+24.5%</p>
                </div>
                <SparklineSVG />
              </div>
            </div>
          </motion.div>

          {/* ── Card 2: Stat card ── */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border transition-all duration-500"
            style={{
              borderColor: "oklch(0.88 0.01 80)",
              background: "oklch(1 0 0)",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="flex h-full flex-col justify-between p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "oklch(0.6 0.2 30 / 0.08)", color: "oklch(0.55 0.18 30)" }}
              >
                <IconZap />
              </div>
              <div>
                <p className="font-serif-display text-5xl" style={{ color: "oklch(0.15 0.02 260)" }}>
                  99.9<span className="text-3xl" style={{ color: "oklch(0.6 0.2 30)" }}>%</span>
                </p>
                <p className="mt-1 text-sm font-medium" style={{ color: "oklch(0.5 0.02 260)" }}>
                  Guaranteed uptime
                </p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: "oklch(0.6 0.02 260)" }}>
                  Enterprise-grade infrastructure with automatic failover and zero-downtime deploys.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 3: Icon + text ── */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border transition-all duration-500"
            style={{
              borderColor: "oklch(0.88 0.01 80)",
              background: "oklch(1 0 0)",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="flex h-full flex-col justify-between p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "oklch(0.45 0.15 260 / 0.08)", color: "oklch(0.45 0.15 260)" }}
              >
                <IconShield />
              </div>
              <div>
                <h3 className="font-serif-display text-xl" style={{ color: "oklch(0.15 0.02 260)" }}>
                  Bank-grade security
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 260)" }}>
                  SOC 2 Type II certified. End-to-end encryption. Your data never leaves your control.
                </p>
              </div>
            </div>
          </motion.div>

          {/* ── Card 4: Mini chart card ── */}
          <motion.div
            variants={fadeUp}
            className="group relative overflow-hidden rounded-3xl border transition-all duration-500"
            style={{
              borderColor: "oklch(0.88 0.01 80)",
              background: "oklch(1 0 0)",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="flex h-full flex-col justify-between p-8">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-2xl"
                style={{ background: "oklch(0.45 0.15 145 / 0.08)", color: "oklch(0.4 0.12 145)" }}
              >
                <IconChart />
              </div>
              <div>
                <h3 className="font-serif-display text-xl" style={{ color: "oklch(0.15 0.02 260)" }}>
                  Growth tracking
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 260)" }}>
                  Cohort analysis, funnel metrics, and predictive forecasting baked in.
                </p>
                {/* Mini bar chart */}
                <div className="mt-4 flex items-end gap-1.5">
                  {[40, 55, 35, 70, 60, 85, 75, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h * 0.4}px`,
                        background:
                          i === 7
                            ? "oklch(0.6 0.2 30)"
                            : "oklch(0.6 0.2 30 / 0.15)",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── Card 5: Wide horizontal card (full width) ── */}
          <motion.div
            variants={fadeUp}
            className="group relative col-span-1 overflow-hidden rounded-3xl border transition-all duration-500 md:col-span-3"
            style={{
              borderColor: "oklch(0.88 0.01 80)",
              background: "oklch(1 0 0)",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
            whileHover={{ y: -4 }}
          >
            <div className="flex flex-col items-center gap-8 p-8 sm:flex-row lg:p-10">
              {/* Icon / visual left */}
              <div
                className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl"
                style={{ background: "linear-gradient(135deg, oklch(0.6 0.2 30 / 0.1), oklch(0.5 0.15 280 / 0.08))" }}
              >
                <svg className="h-9 w-9" style={{ color: "oklch(0.55 0.18 30)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
                </svg>
              </div>
              {/* Text right */}
              <div className="flex-1">
                <h3 className="font-serif-display text-2xl" style={{ color: "oklch(0.15 0.02 260)" }}>
                  200+ integrations that just work
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "oklch(0.5 0.02 260)" }}>
                  Connect your existing stack in minutes. Slack, Salesforce, HubSpot, Stripe, GitHub, Linear, Notion, and 190+ more. No custom code, no consultants, no headaches.
                </p>
              </div>
              {/* Logos cluster */}
              <div className="flex shrink-0 gap-3">
                {["Sl", "Sa", "Hu", "St", "Gh"].map((label, i) => (
                  <div
                    key={i}
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold"
                    style={{
                      background: "oklch(0.96 0.005 80)",
                      color: "oklch(0.45 0.02 260)",
                      border: "1px solid oklch(0.9 0.005 80)",
                    }}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## SECTION 3: Social Proof / Trust Section

```jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASING },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const logos = [
  "Stripe",
  "Linear",
  "Vercel",
  "Raycast",
  "Notion",
  "Figma",
  "Arc",
  "Framer",
  "Loom",
  "Pitch",
  "Resend",
  "Cal.com",
];

const testimonials = [
  {
    quote:
      "We replaced three tools with this one platform. Our team actually enjoys looking at dashboards now, which I never thought I'd say.",
    name: "Elena Vasquez",
    role: "VP of Revenue, Streamline",
    avatar: "https://i.pravatar.cc/48?img=23",
  },
  {
    quote:
      "Setup took 15 minutes. We were live before lunch. The ROI was obvious by end of week one.",
    name: "Marcus Chen",
    role: "Head of Growth, Pulsewave",
    avatar: "https://i.pravatar.cc/48?img=11",
  },
  {
    quote:
      "The integrations are flawless. It feels like it was built for our exact stack.",
    name: "Amara Osei",
    role: "CTO, Brightpath",
    avatar: "https://i.pravatar.cc/48?img=32",
  },
];

export default function SocialProof({
  featuredQuote = "This is the first analytics platform where I don't have to explain the UI to my team. They just get it. It's beautiful, fast, and genuinely useful. That combination is rarer than people think.",
  featuredName = "Daniel Park",
  featuredRole = "CEO, Northlight",
  featuredAvatar = "https://i.pravatar.cc/64?img=7",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 font-body lg:py-36"
      style={{
        background: "linear-gradient(180deg, oklch(0.97 0.005 80) 0%, oklch(0.95 0.008 60) 100%)",
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* ── Logo Marquee ── */}
        <div className="mb-20">
          <p
            className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "oklch(0.55 0.02 260)" }}
          >
            Trusted by industry leaders
          </p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
              style={{ background: "linear-gradient(to right, oklch(0.97 0.005 80), transparent)" }}
            />
            <div
              className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
              style={{ background: "linear-gradient(to left, oklch(0.96 0.007 70), transparent)" }}
            />

            <div className="marquee-track">
              {[...logos, ...logos].map((name, i) => (
                <div
                  key={i}
                  className="mx-8 flex shrink-0 items-center text-lg font-semibold tracking-tight"
                  style={{ color: "oklch(0.65 0.02 260)" }}
                >
                  {name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Featured Testimonial ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="relative mx-auto max-w-4xl rounded-3xl border p-10 lg:p-14"
            style={{
              background: "oklch(1 0 0)",
              borderColor: "oklch(0.9 0.005 80)",
            }}
          >
            {/* Oversized quotation mark */}
            <span
              className="font-serif-display absolute -top-4 left-8 text-8xl leading-none select-none lg:left-12 lg:text-9xl"
              style={{ color: "oklch(0.6 0.2 30 / 0.15)" }}
              aria-hidden
            >
              &ldquo;
            </span>

            <blockquote className="relative">
              <p
                className="font-serif-display text-2xl leading-snug lg:text-3xl lg:leading-snug"
                style={{ color: "oklch(0.18 0.02 260)" }}
              >
                {featuredQuote}
              </p>
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              <img
                src={featuredAvatar}
                alt={featuredName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-semibold" style={{ color: "oklch(0.18 0.02 260)" }}>
                  {featuredName}
                </p>
                <p className="text-sm" style={{ color: "oklch(0.55 0.02 260)" }}>
                  {featuredRole}
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Three Testimonial Cards ── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={stagger}
          className="grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="rounded-2xl border p-7 transition-all duration-500"
              style={{
                background: i === 1 ? "oklch(0.18 0.03 260)" : "oklch(1 0 0)",
                borderColor: i === 1 ? "oklch(0.25 0.03 260)" : "oklch(0.9 0.005 80)",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
              whileHover={{ y: -3 }}
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg
                    key={j}
                    className="h-4 w-4"
                    viewBox="0 0 20 20"
                    fill={i === 1 ? "oklch(0.7 0.18 45)" : "oklch(0.6 0.2 30)"}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p
                className="mb-6 text-sm leading-relaxed"
                style={{ color: i === 1 ? "oklch(0.8 0.02 260)" : "oklch(0.4 0.02 260)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover" />
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: i === 1 ? "oklch(0.95 0 0)" : "oklch(0.18 0.02 260)" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: i === 1 ? "oklch(0.6 0.02 260)" : "oklch(0.55 0.02 260)" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

---

## SECTION 4: Stats / Metrics Section

```jsx
import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

function AnimatedNumber({ value, suffix = "", prefix = "", decimals = 0, duration = 2 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(0, value, {
      duration,
      ease: EASING,
      onUpdate(v) {
        setDisplay(decimals > 0 ? v.toFixed(decimals) : Math.round(v));
      },
    });
    return () => controls.stop();
  }, [isInView, value, duration, decimals]);

  return (
    <span ref={ref}>
      {prefix}
      {typeof display === "number" ? display.toLocaleString() : display}
      {suffix}
    </span>
  );
}

function MiniSparkline({ color = "oklch(0.6 0.2 30)", trend = "up" }) {
  const points =
    trend === "up"
      ? "0,20 8,18 16,19 24,14 32,15 40,10 48,11 56,6 64,7 72,3"
      : "0,5 8,7 16,4 24,10 32,8 40,14 48,12 56,17 64,15 72,20";
  return (
    <svg viewBox="0 0 72 24" className="h-6 w-16" fill="none">
      <polyline
        points={points}
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const stats = [
  {
    value: 4.2,
    suffix: "M+",
    prefix: "$",
    decimals: 1,
    label: "Processed monthly",
    sublabel: "+34% vs last quarter",
    trend: "up",
    featured: true,
  },
  {
    value: 99.97,
    suffix: "%",
    prefix: "",
    decimals: 2,
    label: "Platform uptime",
    sublabel: "Last 365 days",
    trend: "up",
    featured: false,
  },
  {
    value: 12,
    suffix: "ms",
    prefix: "<",
    decimals: 0,
    label: "Avg response time",
    sublabel: "P95 globally",
    trend: "up",
    featured: false,
  },
  {
    value: 2400,
    suffix: "+",
    prefix: "",
    decimals: 0,
    label: "Teams worldwide",
    sublabel: "+180 this month",
    trend: "up",
    featured: false,
  },
];

export default function StatsMetrics() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 font-body lg:py-36"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.12 0.03 260) 0%, oklch(0.15 0.04 290) 50%, oklch(0.12 0.03 30) 100%)",
      }}
    >
      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Decorative blurs */}
      <div
        className="absolute top-1/2 left-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[140px]"
        style={{ background: "oklch(0.6 0.2 30)" }}
      />
      <div
        className="absolute right-0 bottom-0 h-[400px] w-[400px] rounded-full opacity-8 blur-[120px]"
        style={{ background: "oklch(0.5 0.15 280)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING } } : {}}
          className="mb-16 text-center"
        >
          <p
            className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]"
            style={{ color: "oklch(0.6 0.2 30)" }}
          >
            By the numbers
          </p>
          <h2 className="font-serif-display text-4xl text-white sm:text-5xl">
            Results that speak for themselves.
          </h2>
        </motion.div>

        {/* Stats grid — featured stat is larger */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.7, ease: EASING, delay: 0.1 + i * 0.1 },
                    }
                  : {}
              }
              className={`relative overflow-hidden rounded-3xl border p-8 ${
                stat.featured ? "md:col-span-2 md:row-span-1" : ""
              }`}
              style={{
                background: stat.featured
                  ? "linear-gradient(135deg, oklch(0.2 0.04 30 / 0.5), oklch(0.18 0.03 280 / 0.3))"
                  : "oklch(0.16 0.02 270 / 0.4)",
                borderColor: stat.featured
                  ? "oklch(0.6 0.2 30 / 0.2)"
                  : "oklch(0.3 0.02 270 / 0.3)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <p
                    className={`font-serif-display leading-none text-white ${
                      stat.featured ? "text-6xl lg:text-7xl" : "text-5xl"
                    }`}
                  >
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      prefix={stat.prefix}
                      decimals={stat.decimals}
                    />
                  </p>
                  <MiniSparkline
                    color={stat.featured ? "oklch(0.7 0.18 30)" : "oklch(0.5 0.1 260)"}
                    trend={stat.trend}
                  />
                </div>

                <div className="mt-6">
                  <p className="text-sm font-medium text-white/90">{stat.label}</p>
                  <p className="mt-1 text-xs" style={{ color: "oklch(0.55 0.02 260)" }}>
                    {stat.sublabel}
                  </p>
                </div>
              </div>

              {/* Subtle inner glow for featured */}
              {stat.featured && (
                <div
                  className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full opacity-20 blur-[60px]"
                  style={{ background: "oklch(0.6 0.2 30)" }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## SECTION 5: CTA / Closing Section

```jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

export default function CtaClosing({
  headline = "Ready to see what you've been missing?",
  subtext = "Join 2,400+ teams who switched this quarter. Free for 14 days, no credit card required.",
  ctaLabel = "Get started free",
  ctaHref = "#",
  backgroundImage = null,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-32 font-body lg:py-44"
      style={{
        background: backgroundImage
          ? undefined
          : "linear-gradient(160deg, oklch(0.13 0.03 270) 0%, oklch(0.16 0.05 300) 40%, oklch(0.12 0.04 30) 100%)",
      }}
    >
      {/* Background image */}
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(160deg, oklch(0.13 0.03 270 / 0.93) 0%, oklch(0.16 0.05 300 / 0.9) 40%, oklch(0.12 0.04 30 / 0.92) 100%)",
            }}
          />
        </div>
      )}

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      {/* Floating decorative circles */}
      <div
        className="absolute top-12 left-1/4 h-72 w-72 rounded-full opacity-15 blur-[100px]"
        style={{ background: "oklch(0.6 0.2 30)" }}
      />
      <div
        className="absolute -right-16 bottom-8 h-64 w-64 rounded-full opacity-12 blur-[90px]"
        style={{ background: "oklch(0.55 0.18 280)" }}
      />
      <div
        className="absolute top-1/2 left-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]"
        style={{ background: "oklch(0.7 0.15 50)" }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASING } }
              : {}
          }
        >
          <h2 className="font-serif-display text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING, delay: 0.12 } }
              : {}
          }
          className="mx-auto mt-6 max-w-xl text-lg leading-relaxed"
          style={{ color: "oklch(0.72 0.02 270)" }}
        >
          {subtext}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASING, delay: 0.24 } }
              : {}
          }
          className="mt-10 flex flex-col items-center gap-5"
        >
          {/* Primary CTA */}
          <a
            href={ctaHref}
            className="inline-flex items-center rounded-full px-9 py-4 text-base font-semibold text-white shadow-xl transition-all duration-300 hover:scale-[1.03]"
            style={{
              background: "oklch(0.6 0.2 30)",
              boxShadow: "0 12px 40px oklch(0.6 0.2 30 / 0.35), 0 0 0 1px oklch(0.7 0.18 30 / 0.1) inset",
              transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            {ctaLabel}
            <svg className="ml-2.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>

          {/* Trust line */}
          <div className="flex items-center gap-3">
            <svg
              className="h-4 w-4"
              style={{ color: "oklch(0.5 0.12 145)" }}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm" style={{ color: "oklch(0.55 0.02 260)" }}>
              No credit card required &middot; Free 14-day trial &middot; Cancel anytime
            </p>
          </div>

          {/* App store badges (optional) */}
          <div className="mt-4 flex items-center gap-3">
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-300 hover:border-white/20"
              style={{
                borderColor: "oklch(0.35 0.02 270)",
                background: "oklch(0.15 0.02 270 / 0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              <div>
                <p className="text-[9px] leading-none" style={{ color: "oklch(0.6 0.02 270)" }}>
                  Download on the
                </p>
                <p className="text-sm font-semibold leading-tight text-white">App Store</p>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 rounded-xl border px-4 py-2.5 transition-all duration-300 hover:border-white/20"
              style={{
                borderColor: "oklch(0.35 0.02 270)",
                background: "oklch(0.15 0.02 270 / 0.5)",
                backdropFilter: "blur(8px)",
              }}
            >
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.79 1.618a1 1 0 010 1.73l-2.79 1.617-2.534-2.534 2.534-2.43zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
              </svg>
              <div>
                <p className="text-[9px] leading-none" style={{ color: "oklch(0.6 0.02 270)" }}>
                  Get it on
                </p>
                <p className="text-sm font-semibold leading-tight text-white">Google Play</p>
              </div>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

---

## SECTION 6: Premium Footer

```jsx
import { useState } from "react";

const footerLinks = {
  Product: ["Features", "Pricing", "Integrations", "Changelog", "API Docs", "Status"],
  Company: ["About", "Blog", "Careers", "Press Kit", "Contact"],
  Resources: ["Documentation", "Guides", "Templates", "Community", "Support"],
  Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy", "DPA"],
};

const socialIcons = [
  {
    name: "Twitter",
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    svg: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function PremiumFooter({
  logoText = "Acme",
  tagline = "The modern platform for teams who refuse to settle.",
}) {
  const [email, setEmail] = useState("");

  return (
    <footer
      className="relative overflow-hidden font-body"
      style={{
        background: "linear-gradient(180deg, oklch(0.13 0.02 270) 0%, oklch(0.1 0.02 260) 100%)",
      }}
    >
      {/* Top separator gradient line */}
      <div
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, oklch(0.6 0.2 30 / 0.3) 50%, transparent 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          {/* ── Logo + Tagline + Newsletter ── */}
          <div className="lg:col-span-4">
            <a href="#" className="font-serif-display text-2xl text-white">
              {logoText}
            </a>
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "oklch(0.55 0.02 260)" }}>
              {tagline}
            </p>

            {/* Newsletter signup */}
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                Stay in the loop
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="flex"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="min-w-0 flex-1 rounded-l-full border-y border-l px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/30"
                  style={{
                    background: "oklch(0.16 0.02 270)",
                    borderColor: "oklch(0.25 0.02 270)",
                  }}
                />
                <button
                  type="submit"
                  className="shrink-0 rounded-r-full px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                  style={{
                    background: "oklch(0.6 0.2 30)",
                    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* ── Link Columns ── */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 lg:col-span-8">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/70">
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm transition-colors duration-200"
                        style={{ color: "oklch(0.55 0.02 260)" }}
                        onMouseEnter={(e) => (e.target.style.color = "oklch(0.85 0 0)")}
                        onMouseLeave={(e) => (e.target.style.color = "oklch(0.55 0.02 260)")}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div
          className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row"
          style={{ borderColor: "oklch(0.2 0.02 270)" }}
        >
          <p className="text-xs" style={{ color: "oklch(0.45 0.02 260)" }}>
            &copy; {new Date().getFullYear()} {logoText}. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {socialIcons.map((social) => (
              <a
                key={social.name}
                href={social.href}
                aria-label={social.name}
                className="transition-colors duration-200"
                style={{ color: "oklch(0.45 0.02 260)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "oklch(0.8 0 0)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "oklch(0.45 0.02 260)")}
              >
                {social.svg}
              </a>
            ))}
          </div>

          <div className="flex gap-4">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "oklch(0.45 0.02 260)" }}
                onMouseEnter={(e) => (e.target.style.color = "oklch(0.8 0 0)")}
                onMouseLeave={(e) => (e.target.style.color = "oklch(0.45 0.02 260)")}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## SECTION 7: Premium Navigation

```jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASING = [0.25, 1, 0.5, 1];

const navLinks = [
  { label: "Product", href: "#product" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Docs", href: "#docs" },
  { label: "Blog", href: "#blog" },
];

export default function PremiumNav({
  logoText = "Acme",
  activeLink = "Product",
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 font-body transition-all duration-500"
        style={{
          transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
          background: scrolled ? "oklch(0.08 0.02 260 / 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(1.2)" : "none",
          borderBottom: scrolled ? "1px solid oklch(0.25 0.02 270 / 0.4)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          {/* Logo */}
          <a href="#" className="font-serif-display relative z-10 text-xl text-white">
            {logoText}
          </a>

          {/* ── Center: Pill nav (desktop) ── */}
          <div
            className="hidden items-center gap-1 rounded-full border px-1.5 py-1.5 md:flex"
            style={{
              background: "oklch(0.15 0.02 270 / 0.5)",
              borderColor: "oklch(0.25 0.02 270 / 0.3)",
              backdropFilter: "blur(8px)",
            }}
          >
            {navLinks.map((link) => {
              const isActive = link.label === activeLink;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300"
                  style={{
                    color: isActive ? "oklch(0.98 0 0)" : "oklch(0.6 0.02 260)",
                    transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.target.style.color = "oklch(0.85 0 0)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.target.style.color = "oklch(0.6 0.02 260)";
                  }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full"
                      style={{ background: "oklch(0.28 0.03 270)" }}
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* ── Right: Auth buttons (desktop) ── */}
          <div className="hidden items-center gap-4 md:flex">
            <a
              href="#"
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: "oklch(0.7 0.02 260)" }}
              onMouseEnter={(e) => (e.target.style.color = "oklch(0.95 0 0)")}
              onMouseLeave={(e) => (e.target.style.color = "oklch(0.7 0.02 260)")}
            >
              Log in
            </a>
            <a
              href="#"
              className="rounded-full px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.03]"
              style={{
                background: "oklch(0.6 0.2 30)",
                boxShadow: "0 4px 16px oklch(0.6 0.2 30 / 0.25)",
                transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
              }}
            >
              Get started
            </a>
          </div>

          {/* ── Hamburger (mobile) ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-10 flex h-10 w-10 items-center justify-center md:hidden"
            aria-label="Toggle menu"
          >
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className="block h-0.5 w-full rounded-full bg-white transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
              <span
                className="block h-0.5 w-full rounded-full bg-white transition-all duration-300"
                style={{
                  opacity: mobileOpen ? 0 : 1,
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
              <span
                className="block h-0.5 w-full rounded-full bg-white transition-all duration-300"
                style={{
                  transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                  transitionTimingFunction: "cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* ── Mobile slide-out panel ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASING }}
              className="fixed inset-0 z-40 bg-black/60 md:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASING }}
              className="fixed inset-y-0 right-0 z-50 w-80 overflow-y-auto font-body md:hidden"
              style={{
                background: "oklch(0.12 0.03 260)",
                borderLeft: "1px solid oklch(0.22 0.02 270)",
              }}
            >
              <div className="flex flex-col px-6 pt-24 pb-8">
                {/* Nav links */}
                <div className="space-y-1">
                  {navLinks.map((link, i) => {
                    const isActive = link.label === activeLink;
                    return (
                      <motion.a
                        key={link.label}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          transition: { delay: 0.1 + i * 0.05, duration: 0.4, ease: EASING },
                        }}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center rounded-xl px-4 py-3 text-base font-medium transition-colors"
                        style={{
                          color: isActive ? "oklch(0.98 0 0)" : "oklch(0.65 0.02 260)",
                          background: isActive ? "oklch(0.2 0.03 270)" : "transparent",
                        }}
                      >
                        {link.label}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Divider */}
                <div
                  className="my-8 h-px"
                  style={{ background: "oklch(0.22 0.02 270)" }}
                />

                {/* Auth */}
                <motion.a
                  href="#"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.35, duration: 0.4, ease: EASING },
                  }}
                  className="mb-3 block rounded-xl px-4 py-3 text-center text-base font-medium"
                  style={{ color: "oklch(0.7 0.02 260)" }}
                >
                  Log in
                </motion.a>
                <motion.a
                  href="#"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.4, duration: 0.4, ease: EASING },
                  }}
                  className="block rounded-full py-3.5 text-center text-base font-semibold text-white"
                  style={{
                    background: "oklch(0.6 0.2 30)",
                    boxShadow: "0 8px 24px oklch(0.6 0.2 30 / 0.3)",
                  }}
                >
                  Get started
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## Full Page Assembly Example

```jsx
// App.jsx — Example: assembling all sections into a full landing page
import PremiumNav from "./components/PremiumNav";
import HeroCinematic from "./components/HeroCinematic";
import BentoFeatureGrid from "./components/BentoFeatureGrid";
import SocialProof from "./components/SocialProof";
import StatsMetrics from "./components/StatsMetrics";
import CtaClosing from "./components/CtaClosing";
import PremiumFooter from "./components/PremiumFooter";

export default function App() {
  return (
    <div className="font-body antialiased">
      {/* Grain overlay (site-wide) */}
      <div className="grain-overlay" />

      <PremiumNav logoText="Acme" activeLink="Product" />
      <HeroCinematic />
      <BentoFeatureGrid />
      <SocialProof />
      <StatsMetrics />
      <CtaClosing />
      <PremiumFooter logoText="Acme" />
    </div>
  );
}
```

---

## Color Palette Quick Reference

| Token           | Value                    | Usage                           |
|-----------------|--------------------------|--------------------------------|
| Accent Primary  | `oklch(0.6 0.2 30)`     | Burnt orange — CTAs, highlights |
| Accent Warm     | `oklch(0.7 0.18 45)`    | Warm amber �� eyebrows, accents  |
| Dark Base       | `oklch(0.15 0.03 260)`  | Deep navy — hero backgrounds    |
| Dark Purple     | `oklch(0.18 0.04 300)`  | Warm purple — gradient mid      |
| Dark Warm       | `oklch(0.14 0.03 45)`   | Warm dark — gradient end        |
| Text Primary    | `oklch(0.15 0.02 260)`  | Near-black — headings on light  |
| Text Secondary  | `oklch(0.5 0.02 260)`   | Muted — body text on light      |
| Text Tertiary   | `oklch(0.55 0.02 260)`  | Dimmed — captions, labels       |
| Surface Light   | `oklch(0.97 0.005 80)`  | Off-white — light sections      |
| Surface Card    | `oklch(1 0 0)`          | Pure white — cards on light bg  |
| Border Light    | `oklch(0.88 0.01 80)`   | Subtle border on light cards    |
| Success         | `oklch(0.45 0.15 145)`  | Sage green — positive trends    |
| Cobalt          | `oklch(0.45 0.15 260)`  | Blue — security, trust icons    |
| Wine            | `oklch(0.45 0.18 10)`   | Deep wine — reserved for alerts |

---

## Easing & Motion Reference

| Property      | Value                              |
|---------------|------------------------------------|
| Custom ease   | `cubic-bezier(0.25, 1, 0.5, 1)`   |
| Framer array  | `[0.25, 1, 0.5, 1]`               |
| Stagger delay | `0.1–0.12s` between children       |
| Fade duration | `0.6–0.7s`                         |
| Hover lift    | `y: -3` to `y: -4`                |
| Scale hover   | `scale: 1.02–1.03`                |

---

## Font Stack

```css
/* Headlines */
font-family: 'DM Serif Display', serif;

/* Body / UI */
font-family: 'DM Sans', sans-serif;
```

Tailwind utility classes: `font-serif-display` and `font-body` (defined in global CSS above).
