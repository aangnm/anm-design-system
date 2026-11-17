# ChoiceTile

> Selectable tile for picking one option from a short set — a number, a category, a plan, a reason — where the answer must be hit fast with a gloved or wet thumb. Size MD 48 / LG 56 high; Align Center (numbers, chips) or Left (names). States: Default, Hover, Focus (the shared Focus ring, 2px wide, 2px outside), Disabled, Selected (solid interactive/primary fill) and Done (surface/highlight tint with a check and a Badge holding the count: this one already has a value) and Counted (the same tint and Badge without the check, 12px side padding). Properties: Label, Leading icon (swap). Set the count on the nested Badge (its Label property).

## Import

```tsx
import { ChoiceTile } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `size` | `'md' \| 'lg'` | no | Default 'md'. |
| `align` | `'center' \| 'left'` | no | Default 'center'. |
| `state` | `'default' \| 'selected' \| 'done' \| 'counted'` | no | Default 'default'. |
| `label` | `ReactNode` | yes |  |
| `icon` | `ReactNode` | no | Figma's "Leading icon" swap. Hidden in Done / Counted, where the check and count take the space. |
| `count` | `number` | no | Count shown in the Badge for Done / Counted. |

Also accepts every attribute of `Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>` (spread onto the root element).

## Design notes (from Figma)

Why — Button is an action trigger. Using Outline Buttons as choices put a 3:1 border on every option, left the selected one barely different from the rest and centred every label. A choice needs its own selected state, and that state is a fill, not a border: Selected is the strongest signal in the system so the answer reads at a glance in bright, messy surroundings (outdoors, on a shop floor). The unselected edge is deliberately soft (border/subtle) so a grid of options reads as finished UI, not as a form of boxes.

Contrast — a tile is identified by its content, not its outline. Default label on the tile 18.6:1 Light / 13.0 Dark; the border/subtle edge is a container edge and is not held to 3:1 (see the Touch choices entry on About). Selected: label 13.2 / 14.1, fill against page 12.6 / 14.1. Done: label 15.2 / 11.3, check 15.2 / 11.3, the Badge fill against the tint 4.3 / 2.8 and its white label 5.2:1. The tint is surface/highlight (blue 100 Light, blue 950 Dark). In Dark the Badge edge sits under 3:1 on the tint; the count it carries is 5.2:1, and the Badge is not a control, so the count, not the edge, identifies it.

Why Counted — in a half-width tile (≈167px) the check, gaps and Badge of Done leave ≈75px for the label, and long labels (International transfer, Direct debit) broke mid-word. Counted drops the check because the tint plus the numeric Badge already say "done" without relying on colour, and frees ≈40px. Use Done where the tile is wide, Counted in two-column grids.

Hit area — the visual is the target: MD 48 and LG 56 are both above hit/touch. For a narrow chip (a two-digit number in a six-column grid) override the horizontal padding; the height keeps the target.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-choice-tile--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2629-1904 (Choice Tile, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/ChoiceTile/ChoiceTile.tsx
