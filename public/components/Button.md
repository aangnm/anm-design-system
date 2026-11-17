# Button

> Action trigger. Type sets emphasis (Primary > Secondary > Outline > Ghost); Size sets density; toggle Leading icon for an optional icon. Use one Primary per view. States: Default/Hover/Focus/Disabled/Loading.

## Import

```tsx
import { Button } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost'` | no | Default 'primary'. |
| `size` | `'sm' \| 'md' \| 'lg'` | no | Default 'md'. |
| `asChild` | `boolean` | no | Renders as its child (Radix Slot) instead of a <button> — e.g. an <a>. |
| `loading` | `boolean` | no | Shows a spinner in place of the leading icon and dims the label. |
| `leadingIcon` | `ReactNode` | no | Icon rendered before the label — maps to Figma's "Leading icon" slot. |
| `trailingIcon` | `ReactNode` | no | Icon rendered after the label. Figma only models a leading slot, but a trailing affordance is required by real triggers (a dropdown chevron), so this is an additive extension rather than something the design contradicts. |

Also accepts every attribute of `ButtonHTMLAttributes<HTMLButtonElement>` (spread onto the root element).

## Design notes (from Figma)

Why — Focus and Loading were added using existing tokens rather than new ones. Loading is the one state with no CSS pseudo-class equivalent, so in code it becomes a real prop while Hover/Focus/Disabled stay pseudo-classes. Icon: a swap property. Pick any icon/<name> from the instance, then switch Leading icon on to show it.

Hit area — pointer: the button itself (SM 32, MD 36, LG 48 high). On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

Label — a text property, so the label is set from the instance panel (and from Action Bar, Bottom Sheet and any composition) instead of drilling into the layer.

Label size — LG uses Headline Small / Medium (18/28), one step above MD, with a 20px icon: the label reads at arm's length on a phone. LG is 48 high, the same as LG fields, so a button and a field line up in a form row (it was 52 until v0.99).

Secondary — a filled button. Its edge is border/subtle, not border/default: the fill and the label identify it (label on fill 14.1:1 Light / 11.5 Dark), so a heavy outline only made it look like a wireframe. Outline is the type that depends on its border and keeps border/default (3:1).

Why — Hover is a state layer, not a hover colour: a "State layer" child in the label colour at opacity/state-hover (8%) over the Default fill. Every Type gets the same treatment, so a fill never needs its own hover token and any future colour gets a hover for free. Pressed is the same layer at opacity/state-pressed (12%) and exists in code only (:active), so the variant grid does not grow. Replaced interactive/hover and interactive/primary-hover in v0.89 (Material 3 audit).

Focus — a Focus ring frame, focus/ring at border-width/focus (2px, 3px in High contrast), 2px outside the button (focus/offset). Why — an outline on the fill disappears on Primary in dark and on Ghost over a busy surface; a ring outside the control is visible on any fill, and the same treatment on every control means one rule to learn.

Trailing icon — a boolean plus its own icon swap (Trailing icon · Icon, chevron-down by default), the same pattern as Leading. Use it for a trigger that opens something, such as a menu; not for decoration.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-button--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2097-56 (Button, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/Button/Button.tsx
