# anm design system

Tokens and React components generated from [anm Design System](https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System), the canonical Figma file.

**What it's for:** building products, whether a designer or engineer works by hand in Figma or in code, or AI agents prototype in either. It includes a dedicated set for analytics dashboards (charts, tables, KPIs, dashboard layouts). Everyone draws on the same components: each Figma component carries a `Why —` note and a Code handoff spec mapping its properties to props, and every state is a Storybook story, so a person or an agent reuses what exists instead of guessing.

**Storybook:** published to GitHub Pages from `main` by `.github/workflows/storybook-pages.yml`.

## Status

Token pipeline is live (color, spacing, radius, type, motion, breakpoints, elevation, opacity, z-index, focus, density). Every component in the Figma file has a code counterpart (Sidebar / Alt and Navbar / Mobile through another component, on purpose), in Storybook for both themes. See [Roadmap](#roadmap).

## Quality checks

Every pull request runs `.github/workflows/ci.yml`: typecheck, a check that `src/tokens/*` matches what the transform makes from `tokens/figma-export.json`, the library build, **every Storybook story as a test with an axe accessibility check, in each of the three themes** (`npm test`: dark, light and high contrast, so colour contrast is checked in all of them), and the Storybook build. Visual regression runs through Chromatic once `CHROMATIC_PROJECT_TOKEN` is set as a repository secret.

## Docs for people and agents

Storybook opens on **Start here** (the short rules) and **Foundations** (color, type, spacing and density, radius and elevation, motion — generated from the token export, each colour token with the components that use it). Every component's docs page starts with its import line, offers **Copy for AI** and **View as Markdown**, and carries its Figma design notes under the props table.

`npm run docs:build` (`scripts/build-docs.mjs`, also run before every Storybook build) generates the data behind this: `src/docs/component-api.json` (props read from each component's TypeScript), `src/docs/token-usage.json`, one Markdown page per component in `public/components/`, and `public/llms.txt`, which links them. The hosted Storybook serves them at `/components/<Name>.md` and `/llms.txt`. The content is plain Markdown and JSON, so it moves unchanged to a future docs site.

## Figma scripts

`scripts/figma/` holds `use_figma` scripts, each run by pasting its contents into one call from a Claude Code session with Figma access:

- `pull-tokens.js` (read-only) → then `node scripts/format-export.mjs pulled.json` writes `tokens/figma-export.json`.
- `pull-notes.js` (read-only) → `src/docs/figma-notes.json`, the design notes shown in Storybook and `llms.txt`.
- `lint-variants.js` (read-only): component property names and values against the agreed vocabulary.
- `refresh-color-labels.js` and `refresh-contrast.js` (write): regenerate the Color page labels and the Accessibility page ratios from live variables.

## Stack

- React 19 + TypeScript, built with Vite (library mode) + `vite-plugin-dts`
- Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.js`)
- [class-variance-authority](https://cva.style/) for variant APIs, [Radix Slot](https://www.radix-ui.com/primitives/docs/utilities/slot) for `asChild`
- [Storybook](https://storybook.js.org/) for visual QA and as the human-facing doc site
- [Changesets](https://github.com/changesets/changesets) for versioning

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

This step needs live Figma access (the Figma MCP plugin connection, from a Claude Code session with the anm Design System file open). Ask Claude to re-export the file's variable collections — it resolves every variable (including cross-collection aliases) to its final value per mode and writes the result to `tokens/figma-export.json`. This file is checked into git specifically so every token change shows up as a reviewable diff.

### 2. Transform into code (`scripts/transform-tokens.mjs`)

```bash
npm run tokens:transform
```

Pure Node, no Figma access needed — reads `tokens/figma-export.json`, writes:

- `src/tokens/tokens.css` — raw CSS custom properties. Colors are theme-aware (`:root` = dark, `[data-theme="light"]` and `[data-theme="high-contrast"]` override; high contrast also widens borders and the focus ring). Density is too, on its own axis (`:root` = comfortable, `[data-density="compact"]` overrides control heights, table padding and container padding). Everything else (radius, spacing, motion, breakpoints) is a single constant.
- `src/tokens/theme.css` — the Tailwind v4 `@theme` block that turns those tokens into real utility classes (`bg-surface-page`, `rounded-md`, `p-16`, `text-sm`, …).
- `src/tokens/index.ts` — the same tokens as typed TS constants (`color.text.primary`, `radius.md`, …), for the cases a Tailwind class isn't the right tool (canvas/chart colors, inline styles).

**Elevation is exported separately.** Figma variables cannot hold effects, so the shadow scale lives in Figma as *effect styles* and comes through as a top-level `effectStyles` array in `figma-export.json` rather than inside `collections`. The transform turns it into Tailwind's `--shadow-*` namespace, which deliberately overrides Tailwind's default shadows — `shadow-lg` means the same concept in both systems, so replacing the values is the intended outcome (unlike the spacing case below, where the two scales meant different things).

**Both files are generated — never hand-edit `src/tokens/*`.** If a value looks wrong, fix it at the source (Figma) and re-run the pipeline, or fix the transform script if it's a mapping bug.

A gotcha the transform script works around: Figma's `radius/*`, `spacing/*`, and `breakpoint/*` token names collide exactly with Tailwind v4's own theme namespaces. They're intentionally defined **once**, directly in `theme.css`, rather than once in `tokens.css` and re-exported — doing both creates a self-referencing CSS variable that silently resolves to nothing.

### 3. Review, then commit

Since this is a manual pull, treat it like any other change: read the diff in `tokens/figma-export.json` and the regenerated `src/tokens/*`, confirm nothing unexpected moved, commit both together.

### Components don't auto-sync — that's intentional

Figma can't reliably generate production React from a component; component code stays hand-built to spec. Code Connect would show the real snippet in Dev Mode, but it needs an Organization or Enterprise plan and this team is on Pro, so it is not used.

Instead, each component page in Figma carries a **Code handoff** spec (a Figma Spec block beside the frames): the React export and source file for every component, how each Figma property maps to a prop, the page's build rules, and the components that have no code yet. When a component's API changes, update its page's spec in the same change.

The history of the Figma file itself is in [`docs/figma-changelog.md`](docs/figma-changelog.md); add an entry there whenever a Figma change ships.

**Variant-name lint.** [`scripts/figma/lint-variants.js`](scripts/figma/lint-variants.js) checks every component property name and value against the agreed vocabulary; run it before a changelog entry that adds or changes a component (see Figma scripts above).

## Repo structure

```
docs/figma-changelog.md      history of the Figma file
tokens/figma-export.json     raw pull from Figma (source of truth for token values)
scripts/transform-tokens.mjs deterministic JSON -> CSS/TS transform
src/tokens/                  generated — do not hand-edit
src/components/<Name>/
  <Name>.tsx                 the component
  <Name>.stories.tsx         Storybook states, mirrors the Figma variant grid
  index.ts
src/lib/utils.ts             cn() (clsx + tailwind-merge)
src/styles.css               entry point: Tailwind + tokens
src/index.ts                 package barrel export
```

## Component checklist

When porting a component from Figma:

1. Match the Figma variant axes to a real API — `State=Hover/Focus/Disabled` usually become CSS pseudo-classes (`:hover`, `:focus-visible`, `:disabled`), not props; `State=Loading` (no native equivalent) becomes a real prop.
2. Build with Tailwind utilities from the generated token classes only — no raw hex, no magic numbers. **For spacing specifically, use the `Npx`-suffixed classes** (`px-16px`, `gap-8px`, `py-6px`) for any value that has to match a real Figma spacing token — bare `p-4`/`gap-2`/etc. are a *different*, unrelated Tailwind scale (see the note in `scripts/transform-tokens.mjs`). Radius (`rounded-md`), breakpoints, and font sizes (`text-sm`) don't have this problem — use them bare.
3. For a custom control that isn't backed by a real `<input>` visually (Checkbox, Radio, Switch), the pattern is: a visually-hidden native input with the `peer` class, then the visible box/knob/icon elements as its **direct siblings** (not nested inside each other) using `peer-checked:`/`peer-disabled:`/etc. — Tailwind's `peer-*` only reaches true siblings, not a sibling's descendants.
4. Write a `.stories.tsx` that reproduces the same grid the Figma component page shows, so a visual diff against Figma is a straight comparison.
5. Add or update the component's row in its page's Code handoff spec in Figma.
6. `npm run changeset` to record what shipped.

## Roadmap

**The roadmap lives in Figma, not here** — the [Roadmap page](https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2357-2) (node `2357:2`, right after About & Guidelines) is the canonical list of open work, grouped Now / Next / Later / Accepted. Design and code both draw from it, and it is kept current as work ships.

This section used to duplicate that list and drifted badly out of date, so it no longer tries. What follows is only the **code-side** state, which the Figma page does not track.

### Ported to code

- [x] Token pipeline (color, spacing, radius, type, motion, breakpoints, elevation, opacity, z-index, density)
- [x] Core: Button, Input, Select, Search, Checkbox, Radio, Switch, Tag, Badge, Avatar, Tooltip, Form Field, Divider, Textarea, Segmented Control, Skeleton, Spinner, Icon Button, Slider, Stepper, Multi-select, Date Picker, File Upload, Link, Combobox, Accordion, Radio Group, Rating
- [x] Core, touch input: Choice Tile, List Row, Counter, Count Row, PIN Field
- [x] Navigation: Tabs, Breadcrumb, Pagination, Menu Item, Menu, Dropdown Menu, Navbar, Sidebar, Date Indicator, Topbar, App Bar, Action Bar
- [x] Data Display: Card, Stat, List, Table, Bar Chart, Sparkline (each with Empty/Loading/Error states), Legend, Chart Tooltip, Line Chart, Area Chart, Stacked Bar Chart, Donut Chart, Detailed Line Chart, Small Multiples, chart textures (`texture` on Stacked Bar, Donut and Legend)
- [x] Feedback & Overlays: Banner, Progress, Toast, Popover, Modal, Drawer, Bottom Sheet
- [x] Product Patterns: Metric Card, Content Panel, Page Header, Benchmark Table, Table Toolbar, Empty State, Timeline
- [x] Templates (Storybook only, not exported): Dashboard, Settings, Records (List + Detail), Dashboard · Top navbar

### Designed in Figma, not yet in code

Nothing. As of Figma v0.96 every component has a code counterpart, mapped in each page's Code handoff spec in Figma. The two below are covered by another component on purpose.

### Not ported, on purpose

- **Sidebar / Alt** — a layout rearrangement (profile on top, brand bar at the bottom) rather than a distinct component. Reachable today by passing different `brand`/`footer` slots to `Sidebar`.
- **Navbar / Mobile** — the responsive form of Navbar. Best added as a real responsive behaviour on `Navbar` once breakpoint usage is settled, rather than as a second component that callers must swap manually.

## License

MIT. See [LICENSE](LICENSE).
