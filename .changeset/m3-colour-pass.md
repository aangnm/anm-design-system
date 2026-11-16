---
'@anm/design-system': minor
---

Material 3 audit, colour pass (Figma v0.89).

**Breaking — surface and border tokens renamed into one order, page < container < container-high:**

| Removed | Use instead |
|---|---|
| `surface-default` | `surface-page` (same values) |
| `surface-subtle` | `surface-container` (same values) |
| `surface-emphasis` | `surface-container-high` (same values) |
| `surface-muted` | `surface-container-high` (dark: #1c1c1c → #262626) |
| `border-muted` | `border-subtle` (same values) |

**Breaking — hover/pressed colour tokens removed in favour of state layers:** `interactive-hover`, `interactive-active`, `interactive-primary-hover` and `interactive-primary-active` are gone. New `--opacity-state-hover` (0.08) and `--opacity-state-pressed` (0.12), and three utilities in `styles.css`: `state-layer` (paints the label colour over the fill, `--state-on` to override), `state-hover` and `state-pressed`. Button, IconButton, Checkbox, Switch, DatePicker and List use them; Button and IconButton gain a pressed state on every Type.

Also from this pull: `surface-highlight`, `border-width-focus` and `border-width-status` reach the code.
