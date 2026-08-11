---
"@iankha/design-system": minor
---

Data Display category: Card (with CardTitle/CardDescription), Stat, List, and Table — each with Default/Empty/Loading/Error states — plus the Bar Chart and Sparkline data-viz primitives. All ported from the Data Display page in Figma with matching Storybook stories and Code Connect mappings.

Table renders as a semantic `<table>` and accepts any ReactNode per cell, so status columns compose the existing Tag. Bar Chart and Sparkline are data-driven (the Sparkline generates its polyline from a `data` array rather than shipping a static vector), with theme-aware token-bound styling verified in both light and dark.
