---
'@anm/design-system': minor
---

Every Figma component now has code.

- **Core, touch input:** `ChoiceTile` (size, align, state default/selected/done/counted, count), `ListRow` (title, subtitle, icon, selected), `Counter` (a 64px − / value / + control with a typeable numeric field), `CountRow` (a label plus Stepper LG, with a highlight band when filled) and `PinField` (one numeric one-time-code input drawn as four masked boxes).
- **Navigation:** `DateIndicator`, `Topbar` with `TopbarAction`, `AppBar` (mobile) and `ActionBar` (a pinned bottom bar with a Primary LG and an optional Secondary).
- **Feedback & Overlays:** `BottomSheet` (on the Scrim by default; Escape or the scrim closes it).
- **Data Display:** `StackedBarChart` (absolute or percent), `DonutChart` (centre total and a list of values and shares) and `DetailedLineChart` (target, optimal band, forecast zone, event markers and a hover or tap crosshair with ChartTooltip).
- **Accordion:** `size` ('md' | 'lg'), `icon` and `count` props.
