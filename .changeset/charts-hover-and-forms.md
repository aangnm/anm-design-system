---
'@anm/design-system': minor
---

Charts: BarChart, LineChart and AreaChart show a Chart Tooltip on hover (tap on touch), with a crosshair on lines and areas and a tinted column on bars; `tooltip={false}` turns it off. New HorizontalBarChart (ranked rows with values), GaugeChart (one value against its range, optional target and status) and Heatmap (five-step sequential grid with a hover readout). A shared `useChartHover` hook drives every chart readout, Detailed Line included.
