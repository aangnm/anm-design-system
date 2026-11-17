# Switch

> Immediate on/off toggle for settings that apply instantly (no explicit save). Focus state uses the focus/ring token, matching Input/Button.

## Import

```tsx
import { Switch } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'>` (spread onto the root element).

## Design notes (from Figma)

Why — The Off knob uses icon/muted, which clears 3:1 against the track and every surface in both themes (a fixed light grey vanished on the light track), and the Off track carries a 1px border/default outline so its edge is visible. The Disabled knob stays a raw primitive (color/charcoal/600), deliberately NOT promoted into a semantic token: it is this component’s one-off choice, and disabled controls are exempt from contrast.

Two axes: Value (Off, On) × State (Default, Hover, Focus, Disabled), so On + Disabled and On + Focus exist. Hover lays the 8% state layer over the track — text/primary on Off, interactive/primary-foreground on On (see Button) — and is pointer only.

Hit area — pointer: the whole row, track and label, 24 high. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-switch--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2103-14 (Switch, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Switch/Switch.tsx
