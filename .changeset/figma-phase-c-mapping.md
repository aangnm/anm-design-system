---
"@anm/design-system": minor
---

Phase C mapping to the reviewed Figma file (changelog v0.72). Tokens re-pulled (surface/scrim, brand/logo, hit targets, icon stroke widths, contrast changes; text-min removed). New components: Link, Combobox, Accordion, Radio Group, Rating, Table Toolbar, Empty State, Timeline. Updated to Figma: Button/Input/Select/Search/Textarea sizes and text scale, Hover and Focus + Error on text fields, Value x State on Checkbox/Radio/Switch, Size and states on Stepper and Multi-select (with Open), Date Picker day states, Banner title and action, searchable Dropdown Menu, Scrim on Modal and Drawer (the `overlay` prop is on by default; pass `overlay={false}` for the body-only component), 24px target sizes, rebuilt Bar Chart, 11px text floor, Tallos sample data. Templates are Storybook stories. `cn()` now knows the token font-size scale so size and colour classes no longer cancel each other.
