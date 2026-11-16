# Working in this repo

`@anm/design-system` (the **anm design system**) — React 19 + TypeScript component library and design-token pipeline, generated from a Figma file.

## Start here

**The Figma file is the source of truth, not this repo.** Tokens and component specs are decided in Figma and flow outward into code. Never "fix" a token value here to match a design; fix it in Figma and re-run the pipeline.

**File:** anm Design System — [open](https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System) — fileKey `OSexn3GQ7oIOo7X2sGVlSb`

**The canonical list of open work is the Roadmap page in Figma** (node `2357:2`, second page, right after About & Guidelines). It carries Now / Next / Later / Accepted, and each item says what it needs. Read it before planning work. It supersedes any task list in this repo.

Two other Figma pages orient you fast:
- **About & Guidelines** (`2081:2`) — purpose, file organisation, conventions, the **Decisions that apply everywhere** card. The file's changelog (v0.1 onward) lives in this repo at `docs/figma-changelog.md`, not in Figma.
- **Elevation** (`2081:3`) — the depth page: shadows, plus the `z-index` stacking contract and `opacity` tokens.

**Design rationale lives in the Figma file, not in this repo.** Every component's description carries a `Why —` note explaining the decision behind it; the rules that belong to no single component are on the Decisions card above. **Read a component's description before changing it** — several treatments that look like inconsistencies are deliberate and say so (Switch's raw knob colour, Badge's literal white label, Toast's neutral surface against Banner's tinted one).

## The token pipeline

Two steps, deliberately manual. Figma's Variables REST API is Enterprise-only and this team is on Pro, so there is no webhook.

1. **Pull** — needs a live Figma MCP connection. Walk `figma.variables.getLocalVariableCollectionsAsync()` + `getLocalVariablesAsync()`, resolve `VARIABLE_ALIAS` chains recursively, and write the result to `tokens/figma-export.json`. Effect styles come through `figma.getLocalEffectStylesAsync()` as a top-level `effectStyles` array — **variables cannot hold effects**, so shadows are easy to miss on a re-export. Each shadow carries `colorVar` (shadow/key or shadow/ambient) because the colours are bound Themes variables. Text styles go in a top-level `textStyles` array (role, size variable, line-height variable), which the transform turns into `text-body-default`-style role utilities. Keep the file's one-variable-per-line layout so diffs stay readable.
2. **Transform** — `npm run tokens:transform`. Pure Node, no Figma access, deterministic.

`src/tokens/{tokens.css,theme.css,index.ts}` are **generated — never hand-edit them.** `tokens/figma-export.json` is committed on purpose so every token change is a reviewable diff.

Components do **not** auto-sync. Figma cannot generate production React reliably, so component code is hand-built to spec. Code Connect is not used (it needs an Organization plan); each component page in Figma has a **Code handoff** spec instead, listing the React export, source file and property-to-prop mapping. Update it when a component API changes.

## Traps that cost real time

**Node version.** The `node` on PATH is Anaconda's v20.12.2, below the floor for Vite 8 / rolldown. Symptom: `npm install` silently skips the native binding and `vite build` fails with "Cannot find native binding" — while `tsc` passes clean, so a green typecheck proves nothing. `.nvmrc` pins 22.20.0; prefix commands with `PATH="$HOME/.nvm/versions/node/v22.20.0/bin:$PATH"` or `nvm use`. `.claude/launch.json` already carries its own `env.PATH` for Storybook.

**Tailwind spacing collision.** Figma's `spacing/8` means 8px; Tailwind v4's bare `p-8` means `8 × 0.25rem` = 32px. Both want the `--spacing-8` theme key. Our tokens are emitted with a `px` suffix — **use `px-16px` / `gap-8px` / `h-32px` for any exact-token value, never bare `p-4` / `gap-2`.** Bare numbered classes are a different, unrelated scale. This shipped a visually broken Button once; typecheck and build both stayed green.

**Verify in the browser, not the compiler.** Every real bug in this project's history passed typecheck and build. Check Storybook, and check both themes (`data-theme="light"` on the iframe root).

**`peer-*` only reaches true siblings.** Checkbox / Radio / Switch use a visually-hidden input with `peer`, and the visible box/knob must be a **direct sibling**, not nested inside another element.

## Figma MCP working rules

Use the **plugin** server (`mcp__plugin_figma_figma__use_figma`) for anything that writes. The Dev Mode server (`mcp__Figma__*`) is read/inspect only. Load the `figma-use` skill before calling `use_figma` and pass `skillNames: 'figma-use'`.

Accumulated API gotchas, each found the hard way:

- **Opacity variables are stored in percent, not 0–1.** `opacity/loading = 0.7` renders at 0.7%. Correct values are `70` / `18` / `60`; export as value ÷ 100. Binding a wrong value silently breaks every consumer while the script reports success.
- **`addComponentProperty(name, "INSTANCE_SWAP", default)` wants a component's node id** (`"2104:2"`), not its `key`.
- **A freshly cloned instance's nested children are not traversable in the same tick.** `clone.findOne(...)` returns null right after `clone()` + `appendChild()`. Split clone-then-edit-nested-content across two `use_figma` calls.
- **`get_metadata` with no nodeId only ever lists "Cover"** for this file, despite ~26 pages. Not a broken connection. Enumerate with `figma.root.children` instead.
- **`figma.createAutoLayout()` / `createFrame()` leave a default white fill.** Set `fills = []` on structural wrappers or they render as white cards over dark pages.
- **`node.clone()` parents the clone to the current page**, not to the source's parent. `appendChild` before setting frame-relative x/y.
- Colours are 0–1, not 0–255. Fills are read-only arrays — clone, modify, reassign. `figma.notify()` throws. Switch pages only with `await figma.setCurrentPageAsync(page)`, at most once per call.

**Always verify writes visually.** Two bugs this week were invisible to the returning script and only showed up in a screenshot.

- **Pattern fills cannot be written** (`type: 'PATTERN'` fails validation). Chart textures are `IMAGE` fills with `scaleMode: 'TILE'`, made with `figma.createImage(figma.base64Decode(png))`; the Chart Texture set on Data Display holds the canonical tiles, so copy fills from it.
- **Variant option order is stored separately from child order.** Reordering children does not reorder the instance panel. Rename each option to a temporary value in one call, then back in the next, in the order you want.
- **Cross-collection aliases resolve in the layer's own mode for the target collection**, not the referencing collection's mode. That is why theme-specific primitives keep -dark / -light suffixes.
- Run `scripts/figma-lint-variants.js` (read-only, paste as `use_figma` code) after adding or changing a component; extend its vocabulary deliberately.

## Conventions

- Identifiers in English; user-facing copy in Spanish (es-EC).
- Build from token classes only — no raw hex, no magic numbers. Text: prefer the role utilities (`text-body-default`, `text-title-large` …) over raw size classes; add new ones to the font-size group in `src/lib/utils.ts` or tailwind-merge will drop them.
- Density is `data-density="compact"`; sized controls use `h-control-sm|md|lg` (Button LG `h-control-button-lg`) and table cells `py-table-cell-y`, never a fixed `h-36px`, so they follow it.
- Focus is one utility: `focus-visible:focus-ring` (or `peer-focus-visible:focus-ring` on the visible box of a hidden-input control). Never `ring-*` or a border recolour for focus. Forced Focus states in stories need `focus-ring!` to beat a base `outline-none`.
- Sample copy is generic fintech/analytics in es-EC (Cuenta 4021, Ventas, USD, Conversión). Never farming vocabulary.
- Figma variant axes map to a real API: `State=Hover/Focus/Disabled` become CSS pseudo-classes, not props. `State=Loading` has no native equivalent, so it becomes a real prop.
- A component's Storybook grid should mirror the Figma variant grid, so a visual diff is a straight comparison.
- Large Figma variant sets use a manual grid (`layoutMode = 'NONE'`), matching Button and Icon Button. Growing a set means shifting everything below it on the page.
- Component status: there are no status labels. Every component in the file has been through a full review pass (Beta tags were retired in changelog v0.68). When work ships, delete the item from the Figma Roadmap page and add an entry to `docs/figma-changelog.md`.
- **Record design decisions where the designer will find them** — as a `Why —` note in the Figma component's description, not only in a commit message or a changelog line. If the decision applies system-wide, it belongs on the Decisions card on About & Guidelines instead.
- When adding text to a Figma documentation page, **bind the fill to a token**. Four changelog entries sat unbound at pure black on a dark card, effectively invisible, until a screenshot caught it.

## Commands

```bash
npm run dev                # Storybook at localhost:6006
npm run build              # library build -> dist/
npm run typecheck
npm run tokens:transform   # regenerate src/tokens/* from tokens/figma-export.json
npm run changeset          # record what shipped
```

## Project history

Session memory for this project lives in `~/.claude/projects/-Users-andres-Documents-anm-design-system/memory/`: scaffold, token pipeline, the Figma Roadmap page, git remote, and `project_figma_file_history.md`, **the long history of the Figma file itself** (~45KB: the four-phase UX audit, every component build, page and node ids). Read that one before any substantial Figma work.

`field-work` is a **UI reference only, never a mapping target** — treat any resemblance as coincidental until reconciliation happens deliberately.
