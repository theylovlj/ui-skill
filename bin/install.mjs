#!/usr/bin/env node
import { mkdirSync, copyFileSync, readdirSync, statSync, rmSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { homedir } from "os";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = join(__dirname, "..");

const TARGET = join(homedir(), ".claude", "skills", "ui");

const FILES_TO_COPY = ["SKILL.md", "tokens.md", "anti-slop.md", "review.md"];
const DIRS_TO_COPY = ["recipes", "assets"];

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const s = join(src, entry);
    const d = join(dest, entry);
    if (statSync(s).isDirectory()) {
      copyDir(s, d);
    } else {
      copyFileSync(s, d);
    }
  }
}

function countFiles(dir) {
  let n = 0;
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) {
      n += countFiles(p);
    } else {
      n += 1;
    }
  }
  return n;
}

const isDryRun = process.argv.includes("--dry-run");

console.log("");
console.log("  ╔═══════════════════════════════════════════╗");
console.log("  ║   /ui skill installer                     ║");
console.log("  ║   Premium UI for Claude Code              ║");
console.log("  ║   v2.0 — rebuilt from 58 curated designs  ║");
console.log("  ╚═══════════════════════════════════════════╝");
console.log("");

if (isDryRun) {
  console.log("  [DRY RUN] Would install to:", TARGET);
  console.log("");
  process.exit(0);
}

if (existsSync(TARGET)) {
  console.log("  ⚠  Existing skill at:", TARGET);
  console.log("  ⚠  Backing up to: .ui-skill-backup-" + Date.now());
  const backup = TARGET + "-backup-" + Date.now();
  // Simple rename via copy + remove
  copyDir(TARGET, backup);
  rmSync(TARGET, { recursive: true, force: true });
  console.log("  ✓  Backed up");
}

mkdirSync(TARGET, { recursive: true });

for (const f of FILES_TO_COPY) {
  copyFileSync(join(PACKAGE_ROOT, f), join(TARGET, f));
}

for (const d of DIRS_TO_COPY) {
  copyDir(join(PACKAGE_ROOT, d), join(TARGET, d));
}

const fileCount = countFiles(TARGET);

console.log("");
console.log("  ✓  Installed to", TARGET);
console.log("  ✓ ", fileCount, "files");
console.log("");
console.log("  What's included:");
console.log("    • SKILL.md — the procedure + 3 rules");
console.log("    • tokens.md — color/font/motion presets (no inventing)");
console.log("    • anti-slop.md — patterns that scream 'AI-generated'");
console.log("    • review.md — pre-ship Playwright checklist");
console.log("    • recipes/ — 14 ready-to-adapt React components");
console.log("    • assets/backgrounds/ — 26 bundled WebP backgrounds");
console.log("");
console.log("  Usage in Claude Code:");
console.log("    /ui              # invoke the skill");
console.log("    /ui build me a fintech landing page for [product]");
console.log("");
console.log("  Source: github.com/theylovlj/ui-skill");
console.log("");
