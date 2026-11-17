# Textarea

> Multi-line text input for notes and longer entries. States: Default/Hover/Focus/Disabled/Error/Focus + Error. Atomic — pair with Form Field for label + helper.

## Import

```tsx
import { Textarea } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `error` | `boolean` | no | Default false. |

Also accepts every attribute of `TextareaHTMLAttributes<HTMLTextAreaElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Mirrors Input's state tokens exactly rather than defining its own, so a form mixing single- and multi-line fields stays visually consistent.

States — Default, Hover (border/emphasis), Focus (focus/ring), Disabled, Error, and Focus + Error: the error border with a 2px focus/ring outside it, so an invalid field that is being edited still shows keyboard focus. Hover is pointer only. Height comes from rows, not Size.

Hit area — pointer: the whole field. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-textarea--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2280-44 (Textarea, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Textarea/Textarea.tsx
