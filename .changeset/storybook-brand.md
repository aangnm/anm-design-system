---
'@anm/design-system': patch
---

- Fix: `Button asChild` crashed (Radix Slot received the icon, label and icon as siblings). The child is now marked with Slottable and the icons render inside it, so `<Button asChild trailingIcon={…}><a href="…">…</a></Button>` works.
- Storybook is branded for anm (Ink, Bone and Amber chrome) and opens on an Introduction page with live components in the current theme.
