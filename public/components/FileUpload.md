# FileUpload

> Dropzone for file input (XLSX import, image attach). Dashed border + upload icon + prompt + accepted-formats hint. States: Default / Dragging (border→interactive/primary) / Disabled. Shows uploaded files as rows below on success.

## Import

```tsx
import { FileUpload } from '@anm/design-system'
import '@anm/design-system/styles.css' // once, at the app root
```

## Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `hint` | `string` | no |  |
| `onFilesSelected` | `(files: FileList) => void` | no |  |

Also accepts every attribute of `Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'onChange'>` (spread onto the root element).

## Design notes (from Figma)

Why — The dashed border is the whole affordance: it says drop target in a way a solid bordered field does not. Keep the accepted-formats hint — it prevents the most common upload error. Icon: a swap property. Pick any icon/<name> from the instance.

Hit area — pointer: the whole drop zone. On touch, extend the hit area to 48 × 48 px (hit/touch) without changing the visual. See Target size on the Accessibility page.

## Links

- Storybook: https://aangnm.github.io/anm-design-system/?path=/docs/core-file-upload--docs
- Figma: https://www.figma.com/design/OSexn3GQ7oIOo7X2sGVlSb/anm-Design-System?node-id=2326-65 (File Upload, Core page)
- Source: https://github.com/aangnm/anm-design-system/blob/main/src/components/FileUpload/FileUpload.tsx
