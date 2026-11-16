---
'@anm/design-system': minor
---

One focus treatment and Figma-accurate Button LG.

- New `focus-ring` utility in styles.css: `outline: var(--border-width-focus) solid var(--focus-ring); outline-offset: var(--focus-offset)`. Every focusable component uses it on `:focus-visible`, replacing the old mix of 1px rings, 2px rings and border recolours. Inputs keep their own border when focused. Hidden-input controls (Checkbox, Radio, Switch) put `peer-focus-visible:focus-ring` on the visible box.
- Tokens: `--border-width-focus` is 2px (it was 1px). `--focus-offset` is new, at 2px.
- Button LG now matches Figma: 52px high, an 18/28 label and a 20px icon (it was 48px with a 16px label). SM and MD icons are pinned to 16px.
- BenchmarkTable and template sample copy were adjusted to match the Figma review.
