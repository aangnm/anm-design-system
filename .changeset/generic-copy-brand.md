---
'@anm/design-system': minor
---

Generic sample copy, new brand tokens, Code Connect removed.

- **Breaking — BenchmarkTable:** rows are `{ label, category, rate, tier? }` (were `{ lote, actividad, rate }`). New props `labelHeader`, `categoryHeader`, `rateHeader` (defaults Cuenta / Categoría / Ingresos/mes) and `min` / `ideal` thresholds (400 / 800). `benchmarkTier(rate, min?, ideal?)` takes the thresholds too.
- **SidebarBrand:** `logo` is optional. The Figma sidebar header is the workspace name as text, with no logo; the header row is a fixed 36px, so collapsing keeps the nav items in place.
- Default copy is generic: Combobox and TableToolbar placeholders read "Buscar cuenta…", and List's empty message reads "Sin movimientos para esta cuenta.". Stories and templates use a fintech sample (accounts, revenue categories, USD) instead of farm data.
- Brand tokens follow the new palette: `--brand-accent` is Amber #F5B935, `--brand-accent-foreground` is Ink #0E0F11, and `--brand-logo` is Bone #F1ECE3 on dark and Ink on light.
- Code Connect is removed (the `*.figma.tsx` files, `figma.config.json`, the `figma:connect` script and the `@figma/code-connect` dev dependency). It cannot be published on a Figma Pro plan. Each component page in Figma has a Code handoff spec instead.
