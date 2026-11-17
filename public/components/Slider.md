# Slider

> Continuous value selector. Rail = interactive/default; filled portion + thumb = interactive/primary with a 2px surface ring. Pair with a value label or Stepper for precise entry.

## Import

```tsx
import { Slider } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `value` | `number` | yes |  |
| `min` | `number` | no |  |
| `max` | `number` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'>` (spread onto the root element).

## Design notes (from Figma)

Rail — a 1px border/default outline around the rail (and a matching primary one around the filled part), so the whole length stays visible on any surface; the soft rail fill alone is 1.3:1 on white.

Why — The thumb carries a 2px surface ring so it stays legible where it overlaps the filled portion of the rail.

Hit area — pointer: a 24px band around the track; the thumb is 16px visual. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-slider--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2322-55 (Slider, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Slider/Slider.tsx
