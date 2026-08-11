# Iankha Design System

Tokens and React components generated from [Iankha-Design-System-New](https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/Iankha-Design-System-New), the canonical Figma file.

## Status

🚧 Early. Token pipeline is live and pulling real values from Figma. One component (`Button`) is built end-to-end as the reference pattern for the rest. See [Roadmap](#roadmap).

## Stack

- React 19 + TypeScript, built with Vite (library mode) + `vite-plugin-dts`
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- [class-variance-authority](https://cva.style/) for variant APIs, [Radix Slot](https://www.radix-ui.com/primitives/docs/utilities/slot) for `asChild`
- [Storybook](https://storybook.js.org/) for visual QA and as the human-facing doc site
- [Changesets](https://github.com/changesets/changesets) for versioning
- [Figma Code Connect](https://www.figma.com/code-connect-docs/) so Figma Dev Mode shows the real component source

## Getting started

```bash
npm install
npm run dev        # Storybook at localhost:6006
npm run build       # library build -> dist/
npm run typecheck
```

## How this repo stays in sync with Figma

Figma's Variables REST API is Enterprise-only, and this team is on Pro — so there's no headless webhook pulling changes automatically. Instead, sync is a two-step, human-in-the-loop process:

### 1. Pull tokens from Figma (`tokens/figma-export.json`)

This step needs live Figma access (the Figma MCP plugin connection, from a Claude Code session with the Iankha-Design-System-New file open). Ask Claude to re-export the file's variable collections — it resolves every variable (including cross-collection aliases) to its final value per mode and writes the result to `tokens/figma-export.json`. This file is checked into git specifically so every token change shows up as a reviewable diff.

### 2. Transform into code (`scripts/transform-tokens.mjs`)

```bash
npm run tokens:transform
```

Pure Node, no Figma access needed — reads `tokens/figma-export.json`, writes:

- `src/tokens/tokens.css` — raw CSS custom properties. Colors are theme-aware (`:root` = dark, `[data-theme="light"]` overrides); everything else (radius, spacing, motion, breakpoints) is a single constant.
- `src/tokens/theme.css` — the Tailwind v4 `@theme` block that turns those tokens into real utility classes (`bg-surface-page`, `rounded-md`, `p-16`, `text-sm`, …).
- `src/tokens/index.ts` — the same tokens as typed TS constants (`color.text.primary`, `radius.md`, …), for the cases a Tailwind class isn't the right tool (canvas/chart colors, inline styles).

**Both files are generated — never hand-edit `src/tokens/*`.** If a value looks wrong, fix it at the source (Figma) and re-run the pipeline, or fix the transform script if it's a mapping bug.

A gotcha the transform script works around: Figma's `radius/*`, `spacing/*`, and `breakpoint/*` token names collide exactly with Tailwind v4's own theme namespaces. They're intentionally defined **once**, directly in `theme.css`, rather than once in `tokens.css` and re-exported — doing both creates a self-referencing CSS variable that silently resolves to nothing.

### 3. Review, then commit

Since this is a manual pull, treat it like any other change: read the diff in `tokens/figma-export.json` and the regenerated `src/tokens/*`, confirm nothing unexpected moved, commit both together.

### Components don't auto-sync — that's intentional

Figma can't reliably generate production React from a component; component code stays hand-built to spec. What keeps it from drifting silently is **Code Connect**: every component gets a `ComponentName.figma.tsx` file mapping its props to the Figma component's variant properties (see `src/components/Button/Button.figma.tsx`). Once published (`npm run figma:connect`, needs `FIGMA_ACCESS_TOKEN`), Figma's Dev Mode shows the actual `<Button variant="primary" size="md">` snippet next to the design — so a designer changing a variant in Figma without a matching code change becomes visible there, not a silent gap.

## Repo structure

```
tokens/figma-export.json     raw pull from Figma (source of truth for token values)
scripts/transform-tokens.mjs deterministic JSON -> CSS/TS transform
src/tokens/                  generated — do not hand-edit
src/components/<Name>/
  <Name>.tsx                 the component
  <Name>.stories.tsx         Storybook states, mirrors the Figma variant grid
  <Name>.figma.tsx           Code Connect mapping
  index.ts
src/lib/utils.ts             cn() (clsx + tailwind-merge)
src/styles.css               entry point: Tailwind + tokens
src/index.ts                 package barrel export
```

## Component checklist

When porting a component from Figma:

1. Match the Figma variant axes to a real API — `State=Hover/Focus/Disabled` usually become CSS pseudo-classes (`:hover`, `:focus-visible`, `:disabled`), not props; `State=Loading` (no native equivalent) becomes a real prop.
2. Build with Tailwind utilities from the generated token classes only — no raw hex, no magic numbers.
3. Write a `.stories.tsx` that reproduces the same grid the Figma component page shows, so a visual diff against Figma is a straight comparison.
4. Add the `.figma.tsx` Code Connect mapping.
5. `npm run changeset` to record what shipped.

## Roadmap

Mirrors the Figma file's own Core → Navigation → Data Display → Feedback & Overlays structure:

- [x] Token pipeline
- [x] Button (reference pattern)
- [ ] Core: Input, Select, Search, Checkbox, Radio, Switch, Tag, Badge, Avatar, Tooltip, Form Field
- [ ] Navigation: Tabs, Breadcrumb, Pagination, Menu Item, Menu, Dropdown Menu, Navbar, Sidebar, Topbar
- [ ] Data Display: Card, Stat, List, Table, Bar Chart, Sparkline (each with Empty/Loading/Error states)
- [ ] Feedback & Overlays: Banner, Progress, Toast, Popover, Modal, Drawer
- [ ] Code Connect published for every component
