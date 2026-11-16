---
'@anm/design-system': minor
---

One status palette from the colour ramps. `semantic/*` and `text/<status>` values change (all pass WCAG AA in both themes, AAA for tinted pairs); `surface-success | warning | error | info` are removed, use `semantic-<status>-surface`. `text-text-<status>` is now a readable status colour on neutral surfaces in dark mode. Fixes the `@anm/design-system/styles.css` export, which pointed at a file the build does not produce. MIT licensed.
