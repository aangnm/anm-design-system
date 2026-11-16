# Figma file changelog

History of the **anm Design System** Figma file (fileKey `OSexn3GQ7oIOo7X2sGVlSb`). Until v0.89 this lived on the About & Guidelines page in Figma; from v0.90 on it lives only here. Add a new entry at the bottom whenever a Figma change ships. Code releases are recorded separately through changesets.

Older entries keep the names things had at the time (Patterns & Templates, iankha-site, surface/subtle and so on).

## v0.1
Foundation reset: token collections consolidated, brand aligned to the 2026 guideline, remote-library dependencies removed, and the file restructured into Foundations / Components / Patterns / Resources.

## v0.2
Button Focus + Loading states, Select Error state, Tabs Hover state, Toast Color variants (Info/Warning/Error).

## v0.3
Layout tokens (breakpoints, grid) and Motion tokens (duration, easing); new Accessibility and Motion foundation pages; Logo & Brand usage rules (clear space, minimum size, misuse).

## v0.4
Empty/Loading/Error states for Card, Stat, List, Table; new Dropdown Menu and Drawer components; collapsed Sidebar and mobile Navbar variants; dismissible Tag; Avatar status.

## v0.5
Core essentials: Divider, Textarea, Segmented Control, Skeleton, Spinner, and Icon Button; plus Focus states for Checkbox, Radio, and Switch.

## v0.6
Data-viz layer: validated 8-hue categorical palette (chart/series-1…8, colour-blind-checked in both themes), plus Legend, Chart Tooltip, Line Chart and Area Chart.

## v0.7
Form completeness: Slider, Stepper, Multi-select (dismissible chips), Date Picker (calendar), and File Upload (dropzone).

## v0.8
Product Patterns: Metric Card, Content Panel, Page Header, and Benchmark Table rebuilt on the clean system (new App Ref: Product Patterns page). The original App Ref pages are marked archived — their components map to the current library.

## v0.9 — Effects collection and Icon Button completion
- Effects collection: opacity/* (bound to Button's loading label and the Area Chart fills, formerly hardcoded) and z-index/* as a stacking contract for code, both documented on Elevation.
- Icon Button completed: Hover, Focus and Disabled (36 variants).
- New Roadmap page.
- Date Indicator generalized; Iconography size bindings cleaned up; Code Connect deferral restated as a choice.

## v0.10
Design rationale in the file: all 44 components gained a "Why —" note in their description, plus a "Decisions that apply everywhere" card for rules that belong to no single component.

## v0.11
Link: the first text-link primitive (State=Default/Hover/Focus/Visited; External adds an arrow suffix). Reuses existing text tokens instead of adding a link colour.

## v0.12 — Combobox
Searchable single-value picker: Default/Focus/Disabled/Error mirror Select; Open shows the filtered results. First of the target-inventory review, which also queued Accordion, Table Toolbar, Empty State, Timeline / Activity Log, Radio Group / Fieldset, Rating / Severity Scale and Command Menu.

## v0.13
Accordion: a disclosure row for grouped content (State=Collapsed/Expanded, chevron rotates on expand). Second item off the target-inventory queue; Table Toolbar is next.

## v0.14
Table Toolbar (App Ref: Product Patterns page): search + filter chips + a primary action, the header row for Table and Benchmark Table. Third item off the target-inventory queue; Empty State (full page) is next.

## v0.15
Empty State (Product Patterns): full-page/section first-run state (icon badge, heading, guidance, one primary action), distinct from the bounded Empty states in Card, Stat, List and Table. Fourth of the queue; Timeline / Activity Log is next.

## v0.16
Timeline / Activity Log (Product Patterns): ordered per-lote event history, coloured markers on a connector line, reusing Benchmark Table's semantic palette. Fifth of the queue; flagged speculative and confirmed with the user before building. Radio Group / Fieldset is next.

## v0.17
Radio Group / Fieldset (Core page): legend + helper text over a stack of Radio options, built from Radio's own circle styling. Sixth item off the target-inventory queue; Rating / Severity Scale is next, then Command Menu closes it out.

## v0.18
Rating / Severity Scale (Core): 3-segment tier meter (State=Critico/Moderado/Saludable) that generalizes Benchmark Table's Estado chip to show where a value sits among the tiers. Seventh of the queue; Command Menu is last and needs a build-or-reject decision.

## v0.19 — Accessibility in both themes, new Web page
- Accessibility shows Dark and Light side by side, every ratio recomputed, with a new UI boundaries and graphics (3:1) section.
- New Web Design System page: documentation only; source of truth is tokens.json in iankha-site.
- Fixes: white wrapper fills on Radius & Borders; header overlap and off-theme fill on Iconography; Accessibility chips on semantic foreground tokens; Logo & Brand misuse markers now white (5.7:1).

## v0.20 — Contrast fixes, both themes
- Control borders clear 3:1: border/default is charcoal/450 in dark and charcoal/400 in light; border/emphasis is charcoal/450 in light.
- Decorative edges (Divider, Dropdown Menu, chart containers, Page Header, Content Panel, Metric Card, Benchmark Table) moved to border/subtle; the rule is on the Decisions card.
- Chart series 3–5 deeper in light (#239060, #B18303, #BD5792) so every series clears 3:1; worst-case colour-blind separation drops from ΔE 11.2 to 6.9.
- Data scale re-spaced so low, mid and high each clear 3:1.

## v0.21 — Logo & Brand in both themes
- Usage rules in Dark and Light; the light one uses the dark mark, and the recolor demo uses an Add blend so it still tints a black mark.
- Light panel for Web & app sizes.
- The brand-colour variants already covered both polarities.
- The LOGO VERTICAL label no longer hides behind its first variant.

## v0.22 — Light mode across Foundations
- Typography, Spacing, Layout, Radius & Borders, Elevation, Motion, Iconography and Web Design System each gain a Light copy beside the Dark one.
- Spacing's 25 row wrappers had Figma's default white fill; fixed.
- Radius swatches on Radius & Borders and Web Design System gained a 3:1 outline.
- Navy cards in the light copies of Typography and Elevation use surface/subtle.
- Loose page headers unchanged.

## v0.23 — Components in light mode
- Core, Navigation, Data Display, Feedback & Overlays, Patterns & Templates and App Ref: Product Patterns each gain a Light section: instances at their original positions, pinned to Light Mode.
- Audited in both themes, disabled states excluded.
- text/secondary clears AA everywhere (dark: new charcoal/350; light: charcoal/500).
- Badge Warning label near-black; Rating labels, Form Field error and Stat trend use text/error, text/warning and text/success; Modal destructive label white.

## v0.24 — New cover and themeable docs pages
- Cover rebuilt from the brand: Deep Space ground, a black-and-white halftone that decomposes into a dither toward the left, Manrope Light title, Archivo labels, lime marker and current metadata. The previous cover and three alternates sit beside it.
- About & Guidelines and Roadmap use a new token, surface/tinted (graphite blue in dark, white in light), so each switches theme as one frame.

## v0.25
Roadmap and Changelog text tightened: long entries rewritten shorter, and the longest turned into a headline with bullets. Facts unchanged, except that v0.6 no longer repeats the core-essentials list already in v0.5.

## v0.26 — Patterns and Product Patterns review
- Templates: correct active sidebar item, real breadcrumbs, a Page Header instance under the Breadcrumb, and cards aligned to Content Panel chrome (padding 16, gap 12, Title Default/Semibold).
- Dashboard rebalanced into a two-card row; the Table and Bar Chart stretch through instance overrides. On Records, Search moved above the list.
- Product Patterns: named text styles on Table Toolbar, Empty State and Timeline; Empty State badge on radius/pill; Table Toolbar now 474 wide to match Benchmark Table, with a flexing search field; page kicker and subtitle updated.
- Stale references to the deleted App Ref pages removed (Roadmap, About & Guidelines, Product Patterns). Light mirrors rebuilt from the fixed originals.

## v0.27 — Template layouts and placeholder person
- Placeholder person is now Elainy Romero (ER) in the Sidebar, Sidebar / Alt, Navbar, the Drawer and the Records detail; the old name is gone from the file.
- New Dashboard · Top navbar variant: Topbar / Alt with breadcrumb, date and SEM 22 tag instead of the sidebar.
- Settings content now centers vertically below the page header. Records splits half and half, with "Registros recientes", its search and the list inside one card.
- The page-layout rules are on the Decisions card. The missing Dashboard label was added. The light section was rebuilt.

## v0.28 — Dashboard grid, section structure and sample copy
- Dashboard lower row now follows the stat row's three columns: Producción semanal is one third, Registros recientes two thirds, on the same 16px gap.
- Patterns & Templates Dark mode is now its own section like Light; the light section is a clone of it.
- Sample copy follows es-EC across Stat, List, Table, Progress, Metric Card, chart values and the Date Indicator (rule on the Decisions card). Stat samples are varied, with a declining third card.
- Layer names added to the templates, Benchmark Table, Table Toolbar, Empty State, Timeline and the chart components. Product Patterns spacing now sits on one 64px rhythm with tags level with their labels.

## v0.29
Settings form is now centered both horizontally and vertically (rule updated on the Decisions card). The Patterns & Templates sections have their own backgrounds, black in Dark and #E0E0E0 in Light, so the screens read as separate from the canvas.

## v0.30 — Dark and Light sections on every component and pattern page
- Core, Navigation, Data Display, Feedback & Overlays and Product Patterns now have a Dark mode section (black) holding the original components and a Light mode section (#E0E0E0), matching Patterns & Templates.
- Settings: Preferencias is an iOS-style grouped list, with 44px rows and Divider instances between them.
- Fixed on the way: 16 loose page labels had a literal black fill and vanished on dark; they are bound to text/primary. The File Upload hint used text/disabled in its normal state; it now uses text/secondary.

## v0.31 — Switch contrast and row clipping
- Switch Off: the fixed light-grey knob was 1.4:1 on the light track and the track edge was 1.1–1.3:1 in both themes. The knob now uses icon/muted (4.5:1 dark, 3.6:1 light) and the Off track has a 1px border/default outline. On was already 13–14:1.
- Plain wrapper frames in the templates no longer clip their content, which had cropped the Preferencias rows after their height changed.

## v0.32 — Bar Chart can be read
- Bars are capped at 36px and stay centred in equal slots, so a wider card adds space between bars instead of making them thicker. They use chart/series-1 instead of interactive/primary, so data marks weigh less than the figures they show.
- New y-axis (300, 200, 100, 0) aligned to light gridlines, plus a value label above each bar behind a Show values property. The unit goes in the card title, "Producción semanal (t)".
- New Highlight latest property (on by default): earlier weeks draw in icon/muted and the newest keeps the data blue. Muted grey rather than a faded blue, because graphics must keep 3:1 against the card.
- Component is 360px wide by default (was 300). Both Dashboard frames use it at full card width.

## v0.33
Cards in a row keep equal height: the Dashboard chart and table cards, like the Records pair, stretch to the row height instead of being sized by hand. Rule added to the Decisions card.

## v0.34 — Table gets a fourth row
- Table Default now has four sample rows (212px), so the Dashboard's Registros recientes card fills out beside the chart. Loading gets a fourth skeleton row and Empty and Error are padded to 212px, keeping the rule that every variant matches the Default's height.
- Table rows now flex to the width they are given, with the Actividad column absorbing the extra space, so instances no longer need per-instance overrides.
- Data Display blocks below the Table moved down 44px to keep the page rhythm.

## v0.35 — Records Detail card filled out
- The four detail fields are now a grouped list: 40px rows with Divider instances between them, like the Preferencias list on Settings, replacing 49px of dead space inside the card.
- The list absorbs any spare height, so the Cancelar and Guardar buttons always sit at the bottom of the card. Both Records cards stay at 314px.

## v0.36 — Foundations surfaces and swatches
- Section rows and headers on the Foundations pages now sit on surface/tinted instead of the raw graphite-blue primitive: Typography (15 rows) and Elevation (3). Dark mode looks the same; Light now follows the theme through the token. The Elevation specimen cards bind to charcoal/0.
- Color page: the 110 swatches in the Dark and Light token references are bound to their Themes variables, and each frame is pinned to its own mode, so a token change now updates the page that documents it. The Color Primaries swatches are bound too: the 16 charcoal ramp steps and the 12 semantic ramp swatches (success, warning, error, info). Every hex label was checked against its resolved value; none had drifted.
- Primitives are hidden from publishing (114 variables). They stay editable here; library consumers see only the semantic tokens.

## v0.37 — Newest components brought up to spec
- Text: 23 unstyled text nodes in Link, Combobox, Accordion, Radio Group and Rating now use Body Default and Body Small. Checkbox's ✓ stays raw on purpose. Text styles carry their own line height, so Link, Rating, Radio Group, Accordion and the open Combobox grew by 3 to 17px, and their variant sets were resized to match.
- Icons: the ⌄ ⌃ ↗ ⌕ × ⇩ ⊹ text glyphs in Combobox, Accordion, Link, Table Toolbar and Empty State are now Lucide icon instances, coloured from the same tokens as before.
- Tokens: padding, gaps and radii in every component on Core, Navigation, Data Display, Feedback & Overlays and Product Patterns are bound to spacing/* and radius/* (about 490 and 70 bindings). Fully round corners use radius/pill. Two off-scale values moved to the nearest step: Link 1 to 2px and Bar Chart 7 to 8px.
- Layers: 251 default-named layers renamed by role (Row, Stack, Container, Fill, Divider, Dot, Circle, Path), so Dev Mode and Code Connect read clearly.

## v0.38 — 11px text floor
- 11px (Label Default) is now the smallest size used anywhere in the component library. Form Field helper and error text moved to Label Large (12px). Chart ticks, the chart tooltip date, the Date Picker weekday letters, the Sidebar role line and the small Avatar initials moved to Label Default (11px).
- Label Small is renamed Label Micro and kept, with a description that says to avoid it. Nothing in the library uses it. The Typography page labels it as below the floor and gains a note on the floor and on platform units (px = dp = pt at 1x; rem on web, sp on Android, Dynamic Type on iOS). The Radius page labels moved to 11px.

## v0.39 — Label Micro removed
- The 10px text style (Label Micro, briefly Label Small) no longer exists, so there is nothing below the 11px floor to reach for. Its two rows on the Typography page are gone and the floor note is reworded.
- The documentation pages follow the same floor: Web Design System (336 texts), Color (282) and Logo & Brand (21) moved to Label Default, and the Radius page earlier. On Color, each charcoal ramp hex was moved down to clear its label.

## v0.40 — One documentation template
- All documentation pages now follow Radius & Borders. Elevation, Typography, About and Roadmap lost their tinted headers and cards. Motion, Accessibility, Spacing & Layout and Elevation are 1000px wide with 32px between sections, and their section labels use Label Large Medium. Web Design System sections are flat.
- To divide text-heavy sections without a card there is now a 1px hairline and a 720px reading measure: About and Roadmap are built that way, and Elevation uses hairlines between its text blocks. Typography rows are separated by hairlines instead of tinted fills. On Color, the three headers and section labels use the template styles. Three raw text nodes on Roadmap were put on text styles.

## v0.41 — surface/tinted removed
The surface/tinted token is deleted. It was added on 1 October for documentation rows and headers, and the single documentation template replaced it. No page, component or other variable used it. The Themes collection is down to 61 variables.

## v0.42 — Icons are local components
- All 1,509 Lucide icons are now local components named icon/<name>. Before this they were instances of an outside community kit, which a published library would have depended on. The 215 icon instances inside components were re-pointed to the local copies with their colours and sizes intact, and the Light grid and the Icon slot too.
- Icon sizes are standardised to 12, 16, 20 and 24px. Breadcrumb separators and the Dropdown Menu chevron moved from 14 to 16, the Date Picker chevrons from 18 to 16, and the Sidebar, Stat and Banner icons from 18 to 20.
- The Iconography page follows the documentation template, in Dark and Light: colour, size, stroke, the icons in use, the Icon slot and the full library.

## v0.43 — Icon slots
- Six components expose their icon as an instance-swap property, with all 1,509 icons as options: Button and Input (next to the Leading icon toggle), Icon Button, Menu Item, File Upload, and Sidebar and Sidebar / Alt, which have one property for each nav item (Panel, Registros, Análisis, Zonas, Ajustes). The icon takes the colour of its variant, so a Primary Button's icon stays on the Primary foreground.
- Button's Leading icon toggle did nothing in the Focus variants because the icon was not linked to it. It is linked now. Defaults are unchanged: the placeholder circle in Button, Input, Menu Item and the Sidebar, the bell in Icon Button and the upload icon in File Upload.

## v0.44 — Proportional icon strokes
- Icon stroke now scales with size: 1px at 12, 1.33px at 16, 1.67px at 20 and 2px at 24. This is what lucide-react renders, because it scales the stroke with the icon. Figma does not, so a 16px icon used to look about 50% heavier than the code.
- It is a variable. A new Icon collection has four modes (24, 20, 16, 12) and one variable, icon/stroke-width, bound to every one of the 1,509 icon components. Each icon instance in a component carries its size as a mode (232 instances), so the stroke survives swapping the icon from the Icon dropdowns. On an icon you place yourself, set the Icon mode to its size.
- The Table Toolbar search icon moved from 14 to 16px, and the Iconography page documents the stroke by size.

## v0.45 — Logo & Brand rebuilt
- The page follows the documentation template in Dark and Light: header, Symbol, Horizontal logo, Vertical logo, Web & App sizes, Usage rules and a new Lockup colour per surface table. Each set is laid out as a grid (three by two for Symbol, two by three for the lockups) and no longer runs 2,700px sideways. The Light frame holds instances of the same tiles, so there is one source.
- Variants and labels are in English: Verde, Blanco, Azul and Negro are now Lime, White, Blue and Black, and Horizontal's "Claro" and the other sets' "Steel Gray" are one variant, named Mist after its colour. Vertical's tiles are all 360px high. Tile backgrounds and captions are bound to tokens. The four Web and App components are renamed Symbol / Web 24, Symbol / App 40, Logo Horizontal / Web 32 and Logo Horizontal / App 40, and all seven logo components have descriptions.
- The new table gives the contrast of each lockup colour on a dark and a light surface, computed from the brand values: Lime, White and Mist pass 3:1 on dark only, Deep Space and Black on light only, and Blue passes on both. Usage rules moved into the frames unchanged.

## v0.46 — Vector logos and brand rules
- All logo artwork is vector now. Three masters (symbol, horizontal lockup, vertical lockup) and a wordmark-only master were built from the brand SVG files; the 18 tiles and the four Web and App marks are instances of them, so the bitmap images are gone and a logo can be recoloured with a brand token. A new brand/logo token (white on dark, Deep Space on light) drives the Web and App marks, so the Sidebar and Navbar logo now follows the theme.
- Usage rules were rewritten from the brand guideline. Clear space is X, the width of the symbol's central ring (37.5% of the symbol's width, measured on the master), not 25% of the height. Minimum size is 108 × 22 px for the lockup and 32.25 × 30.03 px for the symbol, not 16px. New: app icon (symbol 96px, Signal Orange on Graphite Blue) and browser favicon (32.25 × 30.03 px, white on Ion Blue). Misuse has all eight rules from the guideline, shown on the lockup.
- The Web and App components are renamed by the real width of the lockup: Logo Horizontal / Web 64 and App 80.

## v0.47 — Logo minimums for product UI
- Logo & Brand now separates the brand minimums (symbol 32.25 × 30.03 px, lockup 108 × 22 px, from the guideline) from the product-UI minimums set here: symbol 24px, lockup 108px wide, a compact exception of 20px for secondary symbols in dense toolbars and rails, and 16px for the browser tab only. The basis is the ring stroke: at 24px it is 1.4px, and the 108px lockup already holds a symbol about 25px wide. A logo that is a link needs a hit area of at least 44 × 44 px (48 on Android).
- The Web and App lockup components are now 108 and 120px wide (they were 60 and 76), so the Navbar lockup meets the minimum. They are renamed Logo Horizontal / Web 108 and App 120. The Sidebar symbol stays at 24px, which is the UI minimum and a documented exception to the brand's 32.25px.
- App icon and favicon are shown as examples, not a fixed pairing: the guideline's Signal Orange on Graphite Blue and white on Ion Blue, plus Lime, Ion Blue, Mist and Deep Space on Lime. Any approved colour works at 3:1 against its tile. A delivery-size table follows the industry standards: favicon 16, 32 and 48, Apple touch icon 180, Android and PWA 192 and 512 (maskable), App Store 1024, Google Play 512.
- The vertical lockup tiles are recentred: the lockup sat 19px from the top edge and 62px from the bottom.

## v0.48 — Web Design System checked against tokens.json
- Every value on the Web Design System page was compared with iankha-site's tokens.json (and tokens.css, which agrees with it): the colour ramps, semantic light and dark tokens, data scales, overlays, type scale, radius, shadow, gradient, spacing, motion, layout, breakpoints and component tokens. All match.
- Three corrections to the page. The differences table said the product's primary blue is #2E6BFF; Ion Blue is #2D6BFF, and the product's primary action is neutral, not blue, so the row now reads Primary action. The lime-on-light contrast is 1.1:1, not 1.2:1. The source line is dated 2026-10-02.
- A Known issues row on the page records two contrast shortfalls in the web tokens themselves: the light focus.ring is 2.97:1 on paper, and the dark action.primaryHover with white text is 3.2:1. They need a change in tokens.json, which this file does not make.

## v0.49 — Core regrouped
- The Core page is grouped under four headings in both Dark and Light: Actions (Button, Icon Button, Link), Text fields (Input, Textarea, Search, Select, Combobox, Multi-select, Date Picker, Stepper, Form Field, File Upload), Selection controls (Checkbox, Radio, Radio Group, Switch, Slider, Segmented Control) and Display (Tag, Badge, Avatar, Rating, Tooltip, Spinner, Skeleton, Divider, Accordion). The gap between blocks is a uniform 64px, where it used to run from 24 to 78px. Positions only; no component changed.
- Rating / Severity Scale: its variant property is now Severity, with the values Critical, Moderate and Healthy, instead of State with Critico, Moderado and Saludable. The labels it shows stay in Spanish. Nothing else in the file used the old names.

## v0.50 — Target size policy
- A target-size policy replaces the old rule that everything is 48px: a 24 × 24 px floor everywhere, a 48 × 48 px hit area on touch, and the compact visual sizes kept on desktop. Two tokens, hit/floor (24) and hit/touch (48), join the Dimension collection. The Accessibility page has a Target size section with the rules at actual size, a visual-versus-hit-area demo and a table by element.
- Components that were under the floor: the Checkbox, Radio and Switch rows (20 to 24px high), standalone Link (20 to 24) and the Slider (16 to a 24px band). Components whose target is bigger than their visual now carry an invisible Hit area frame: the close icons on Tag, Toast, Banner, Modal and Drawer, the Stepper cells, the Date Picker arrows, and the Breadcrumb and Navbar links. Every interactive component description has a Hit area line. The Core and Light layouts were re-spaced for the taller rows.

## v0.51 — Target size on Data Display
- The target-size pass on Data Display found nothing under the floor, because almost nothing there is interactive today. In the code only List rows are clickable (a row becomes a button when onSelect is set), and they are 66px high, above the 48px touch size. Table (rows 44, header 36), Legend (items 20), Card, Stat, Sparkline, the three charts and the Chart Tooltip are static.
- Their descriptions now say so, with what to do if they become interactive: table rows and legend toggles need 48 on touch and at least 24 on a pointer. Two rows, List rows and Table rows with legend items, were added to the Target size table on the Accessibility page.

## v0.52 — Target size on Product Patterns
Only Table Toolbar needed work: the filter chips' × icons now carry 24×24 Hit area markers. Page Header, Content Panel and Empty State reuse Icon Button, Button and Segmented Control, which are already covered; Metric Card, Benchmark Table and Timeline are static. Each component description now carries a Hit area line.

## v0.53 — Target size on the templates
The four templates (Dashboard, Settings, Records, Dashboard · Top navbar) are assembled only from covered components, so nothing needed a new marker. Checked: every Button, Icon Button, Select, Search and Switch is 24 high or more; adjacent actions sit 8px apart; Breadcrumb and Topbar links keep their 24px targets; Tags and Stats in the templates are not interactive. This closes the target-size pass.

## v0.54 — Dashboard Sidebar example
Navigation now shows Sidebar with dashboard-style content: Resumen, Reportes, Clientes, Facturación and Configuración, each with its own icon swapped in from the Icon property, in Expanded and Collapsed. It is an instance of the same component, so it shows how the icon slots and label overrides are meant to be used.

## v0.55 — Top bars and the logo
Navbar / Mobile had its menu button touching the logo (a spacer with space-between squeezed the row), breaking the logo clear space. The row is rebuilt: 16px between the menu and the logo, a stretching spacer, and 48 × 48 touch markers on the menu and avatar. Navbar and Topbar / Alt now mark 24 × 24 targets on search and alerts. The Navbar description states the logo rule: 108 px lockup, clear space X on every side.

## v0.56 — Searchable Dropdown Menu, mobile bar without logo
Dropdown Menu gains State=Searchable: a Search field on top of the items and a Limpiar button at the bottom, inside the menu container and divided from the items. Navbar / Mobile drops the logo, leaving the menu button and the avatar.

## v0.57 — Menu Item: Leading icon
Menu Item gains a Leading icon boolean (on by default), like Button. The Searchable Dropdown Menu turns it off, so its items are text only.

## v0.58 — Component descriptions repaired
26 component descriptions (Core, Navigation, Data Display, Feedback and Overlays, Product Patterns) showed raw character codes such as &#39; and &amp; in place of apostrophes, ampersands, quotes and angle brackets, from an earlier text-escaping slip. All are restored to plain text; the wording is unchanged.

## v0.59 — Data Display: Beta tags removed, Table gains Unidad
The Beta tags are removed from every Data Display section. Table splits the old Valor column into Data and Unidad (Tallos, Kg/Ha, Plantas, L/Ha) in all four states; the sample is now five columns wide, so the page and its light section are wider and the dashboard templates pick up the new column from the component.

## v0.60 — Feedback and Overlays review
Banner sample copy is now real Spanish (it read "Mensaje de success para el usuario"). The "Modal / Dialog" label is now "Modal", matching the component. Popover's description no longer claims an arrow it does not have. Progress and Popover gain Hit area lines.

## v0.61 — Scrim, Banner title and action, Beta tags off Feedback
New Scrim component and surface/scrim token (pure black, strength from opacity/scrim), with Modal over scrim and Drawer over scrim examples in both themes. Banner gains optional Title and Action (Title, Action, Title text, Action label), with a row of examples. The Beta tags are removed from Feedback and Overlays.

## v0.62 — Progress track outline
The Progress track is #e0e0e0 on light, the same as grey surfaces, so the unfilled part vanished there and the bar looked shorter than it was. It now has a 1px border/default outline, in both themes. Slider uses the same soft track and has the same weakness, still to be decided.

## v0.63 — Templates review
Settings now shows real field content instead of "Placeholder" and "Texto de ayuda opcional". The Riego row in the Dashboard table read 7.6 and now reads 76. The top-navbar Dashboard no longer shows two bells (topbar and page header). Template labels use the same style as the other pages and sit a consistent 40px above their frames.

## v0.64 — One unit story: Tallos
Production is now in Tallos everywhere. Stat and Metric Card read 1.284 Tallos; the weekly chart is titled Producción semanal (Tallos); the Cosecha row for Lote 07 is 250 Tallos in Table, List and the Records detail; the List sample reads 98 Plantas instead of 98 pts to match Table.

## v0.65 — Template sidebars use real icons
The Sidebar in the Dashboard, Settings and Records templates now shows real icons instead of placeholder circles: layout-dashboard (Panel), clipboard-list (Registros), chart-column (Análisis), map-pin (Zonas) and settings (Ajustes). Names are unchanged so they still match each page title and breadcrumb.

## v0.66 — Patterns & Templates is now Templates
The page holds four full-page layouts, not patterns, so it is renamed Templates (page, sections and eyebrow labels). Product Patterns keeps its name: it holds the reusable composite components. Earlier changelog entries keep the old name because that was its name then.

## v0.67 — Product Patterns review
Benchmark Table's rate column is now Tallos/ha·mes and the Timeline reads "250 Tallos recolectados en Lote 07", matching the Tallos unit story. Page Header's "61.91 ha" is now "61,91 ha" like every other decimal in the file. Table Toolbar's description regains its paragraph break and Empty State's loses an awkward sentence.

## v0.68 — Beta labels retired, Slider rail outlined
All 60 remaining Beta tags are removed (Core, Navigation, Product Patterns, in both themes) and Component status on About now says every component has passed review. The Slider rail gets the same 1px outline as Progress, so the unfilled part no longer disappears on grey or white surfaces.

## v0.69 — Form control states and sizes
Checkbox, Radio and Switch split into Value × State (Default, Hover, Focus, Disabled), so Checked + Disabled, Checked + Focus and the rest exist (12, 8 and 8 variants). Input, Textarea, Select, Combobox, Multi-select and Stepper gain Hover and Focus + Error; Search gains Hover. Select, Search and Combobox gain a Size axis (SM 32, MD 36, LG 48) like Input, and Multi-select and Stepper become component sets with the same Size and State axes. Existing instances kept their meaning. Focus + Error draws the error border with a 2px focus/ring outside it.

## v0.70 — Multi-select Open and Date Picker states
Multi-select gains an Open state at all three Sizes: the field with its chips and a list of Checkbox rows below, checked when the option is selected. Date Picker becomes a set with Default, Hover, Focus and Disabled: Hover fills the day with interactive/hover plus a 1px outline so it shows on the dark surface (interactive/default is the same colour as the picker there), Focus rings the day, and Disabled greys the days that cannot be chosen. The Core review item is removed from the Roadmap; Textarea keeps no Size axis because its height comes from rows.

## v0.71 — text-min and line-height/min removed
The 10px font/size/text-min variable and its 12px partner font/line-height/min are deleted from Typography. No text style or layer used it since the 11px text floor was set, and leaving it would have carried a size the system forbids into the repo on every token pull.

## v0.72 — Fixes found while mapping to code
Textarea and Combobox Disabled now match Input (interactive/disabled fill, border/subtle edge); they used a different treatment. Avatar SM text is Medium in every Status, like MD. Divider's description says border/subtle, which is what it binds to.

## v0.73 — Stacked Bar, Donut and Detailed Line charts
Three chart forms join Data Display. Stacked Bar Chart (Type = Absolute or Percent, Show totals) splits a total across categories; Donut Chart shows one total as 2–6 parts with a legend list of values and shares and an optional centre total; Line Chart · Detailed (State = Default or Hover) layers a target line, an optimal band, a dashed forecast zone, event markers and a crosshair with the Chart Tooltip on top of three series. All use the existing chart/series tokens and surfaces, in both themes. Pie is deliberately not built.

## v0.74 — Loose ends
Target size table: a text field on touch is now "Use Size LG: the field is 48 high", since Size exists and a native input cannot take an invisible extension. About: the Code Connect paragraph no longer counts components. Multi-select Disabled already shows chips, so no extra variant was needed.

## v0.75 — Mobile touch set: Choice Tile, List Row, Counter, Bottom Sheet, Action Bar, App Bar
- Six components for phone-width, gloved-thumb screens, found while building the Nacional field-registry flow against the system. Core, in a new Touch input group: Choice Tile (Size MD/LG × Align Center/Left × Default/Hover/Focus/Disabled/Selected/Done), List Row (Default/Hover/Focus/Disabled/Selected) and Counter (Default/Focus/Disabled/Error). Navigation: App Bar / Mobile (menu, Date Indicator, Avatar) and Action Bar (summary, Primary, optional Secondary). Feedback & Overlays: Bottom Sheet, with a Bottom Sheet over scrim example.
- Changed, all additive so existing instances are unchanged: Progress is now a set (Value 0–100) with a Label property; Button gains a Label text property; Accordion gains Title, Leading icon and Show count.
- Contrast was checked for every state in both themes and the ratios are in each component's description. New entry on the Decisions card: touch choices.
- Not done: Breadcrumb with variable depth (queued on the Roadmap).

## v0.76 — Breadcrumb Depth
Breadcrumb is now a set with Depth 2, 3, 4 and 5 items, for hierarchies longer than three levels (Finca › Poscosecha › Mesa › Bloque › Variedad). Depth 3 is the original component, so Topbar / Alt and every existing instance stay linked. Each variant keeps one Hit area frame per link and none on the current page. Closes the item deferred from v0.75.

## v0.77 — Progress fill scales with the track
Found building the Nacional mobile screens: at a phone's 358px width a Progress variant drew its fill at the 300px width it was authored at, so 60 % showed as about 50 %. The fill's horizontal constraint is now Scale in every Value variant, so a variant is right at any width. No new properties; existing instances keep their value.

## v0.78 — Touch refinements from the Nacional mobile review
- Button LG: the label is now 18/28 Medium (new text style Headline Small / Medium) with a 20px icon, so LG is 52 high — it matches the code library and reads better at arm's length; SM and MD are unchanged. Secondary Button: its edge moves from border/default to border/subtle, since a filled button is identified by its fill and label; Outline keeps border/default.
- Choice Tile: Default and Hover edges are border/subtle; Done is a semantic/info-surface tint with a check and a nested Badge for the count (the Count text property is removed — set the count on the Badge, which now has a Label property); Size LG is 56 high. Counter: the − / + buttons use a border/subtle edge.
- Accessibility: the Control boundary row no longer lists the secondary Button; the touch-target table lists Button at 32, 36, 48 or 52. The Touch choices entry on the Decisions card is rewritten to match.

## v0.79 — Accordion slots: spacing and count
Found building the Nacional Option B screens. Accordion's Row now has 12px spacing, so the optional Leading icon no longer touches the title (no change to the plain header). The Show count slot is a Badge Info instead of Neutral: a count on a header should read as a count, like the tile counts, and the Neutral badge on surface/emphasis was nearly invisible on a light page.

## v0.80 — Highlight resource, Count Row, Accordion LG
- New semantic token surface/highlight (Themes, both modes; it aliases semantic/info-surface): the single resource for 'this item already holds a value'. Choice Tile Done now binds to it.
- New Count Row (Core, Touch input): a label and a Stepper LG in a 64 high row, State = Default / Filled, where Filled carries the highlight band. Stepper gains a Value text property.
- Accordion gains Size = MD / LG. The existing variants are renamed Size=MD and keep linking; LG is the touch size (16px title, 16px side padding, 56 high header, 20px chevron).
- Contrast: label on the highlight 15.9:1 Light / 13.3 Dark; the Stepper keeps its own control border.

## v0.81 — Accordion LG: property links
The LG variants added in v0.80 were cloned from MD and lost their component-property links, so Title, Leading icon, Icon and Show count did nothing on an LG instance. All four now work on both sizes; no visual change.

## v0.82 — Form Field Size
Form Field gains Size = MD / LG. Found building the Nacional login screen: the label was 11px, the text floor, on a form a user has to read in a bright greenhouse. MD keeps the desktop layout with a 12px label (Label Large / Medium); LG is the touch field — 14px label, Input LG (48 high), 13px helper and error text. The existing variants are renamed Size=MD and keep linking. Contrast ratios are in the description.

## v0.83 — PIN Field; Stepper number centring
New PIN Field (Core, Touch input): four masked digit boxes with a label and a helper or error line, State = Default / Focus / Error / Disabled × Filled 0–4, boxes 56 high. Built for the Nacional PIN login; contrast ratios are in its description. Stepper: the number was left-aligned at a fixed spot that was centred only for the two-digit sample, so a single digit sat about 4px left of centre. It is now a text box spanning the whole middle segment, centred, in all 18 variants (SM, MD, LG).

## v0.84 — surface/highlight on the Color page
The surface/highlight token added in v0.80 now has its swatch in both the Dark and the Light theme frames of the Color page, right after surface/info, bound to the variable so it follows any change to it. The rows below were moved down 40px to make room.

## v0.85 — Choice Tile: Counted
New State = Counted on Choice Tile (MD/LG × Center/Left): the Done tint and count Badge without the check and with 12px side padding. Found in the Nacional cause grid, where Done in a half-width tile left ≈75px for the label and long causes (Descabezado, Deshidratado) broke mid-word. Additive: Done is unchanged; use Counted in two-column grids.

## v0.86 — High contrast
Themes gains a third mode, "Light · High contrast" (pure-black text and primary, AAA text 7:1 or more, control edges 7:1, info/Done/Counted marked by a dark-blue border and pill instead of a tint). Dimension gains a "High contrast" mode: border-width/sm 1→2, /md 2→3. New token border-width/focus (1 normal, 3 high contrast) is now bound to every Focus ring, so focus is a 3px ring in this mode with no visible change elsewhere. Additive: Dark and Light are untouched. Accessibility page: new "Accessibility · High contrast" frame with the recomputed pass table and live components. Pin a frame to both modes to preview any screen.

## v0.87 — High contrast: Banner edge
New Dimension token border-width/status (0 in Dark/Light, 2 in High contrast). Banner (Info/Success/Warning/Error) now carries a stroke in its own semantic colour bound to that width, so banners get a 2px edge only in High contrast and are unchanged elsewhere. Found in the Nacional high-contrast screens, where the white tinted banner had no visible boundary. Republish, then bind decorative status shapes in screens to the same token.

## v0.88 — Renamed to anm
The system is now the anm design system; the file, the code package (@anm/design-system) and the GitHub repository follow. Every logo master on Logo & Brand is a placeholder until anm has a designed mark: an outlined Inter Bold "a" for the symbol and "anm" for the lockups, still on the brand/logo token, so every lockup, the Navbar, the Sidebar and the Cover follow it. The Cover logo is now an instance of mark/horizontal instead of an image. The Web Design System page is removed: it documented a separate website with its own source of truth.

## v0.89 — Material 3 audit: colour pass
Audited against the Material 3 Design Kit; the agreed items are on the Roadmap. Surfaces now have one order, page < container < container-high: surface/subtle is renamed container (the old container merged in), surface/emphasis is container-high, surface/default merged into page, surface/muted into container-high (dark Segmented Control, List Row and Content Panel move from #1c1c1c to #262626), and border/muted into border/subtle. Hover is now a state layer: new opacity/state-hover (8) and opacity/state-pressed (12), a State layer child in every Hover variant of Button, Icon Button, Checkbox, Switch and Date Picker, and interactive/hover, interactive/active, interactive/primary-hover, interactive/primary-active and their four primitives removed. Light · High contrast is now fully aliased to Primitives (new charcoal/125, 150, 550, 650, a 950 step on each status ramp, and -hc one-offs for the status bases and the focus ring; values within 6/255 merged into existing steps). red/500 no longer duplicates red/400. Two new rules on the Decisions card. The repository follows in the same change.

## v0.90 — Changelog moves to the repo, generic sample copy, code handoff specs
- The Changelog section is removed from About & Guidelines. This file is now the only history; a line under Conventions points here.
- Sidebar: no logo in the header. The top row shows the workspace name as text ("Espacio de trabajo"), 36 high so the nav items keep their place; Collapsed keeps the empty row. "Santa Fe" is gone from the file.
- Sample copy is generic analytics/fintech instead of farming, in components and templates alike. Nav items are Resumen, Transacciones, Reportes, Clientes and Configuración, and the Sidebar's icon properties are renamed to match (Icon · Resumen …). Lotes become accounts (Cuenta 4021 …), activities become revenue categories (Ventas, Suscripciones, Reembolsos, Comisiones), units become currencies, NDVI/GNDVI/NDRE become Conversión/Retención/Abandono, and Tallos figures become USD amounts. Templates swap the Transacciones and Clientes icons (arrow-left-right, users). App Bar / Mobile's leftover "IK" initials are now "ER".
- Component descriptions that still showed HTML entities (&#39;, &amp;) are plain text again, and sample references in them follow the new copy.
- Each component page (Core, Navigation, Data Display, Feedback & Overlays, Product Patterns) has a "Code handoff" Figma spec beside its frames: the React export and source file per component, how Figma properties map to props, the page's build rules and the components with no code yet. Generated from the Code Connect files.

## v0.91 — New brand palette, one logo treatment, new Cover
- The brand palette is replaced: Ink #0E0F11, Graphite #1B1E24, Slate #4A5463, Steel #7D8796, Fog #C3CAD4, Bone #F1ECE3, Sand #D8C3A1, Clay #9A7452, Amber #F5B935 and Ember #E65C1E. The eight old primitives were renamed in place (deep-space → ink, graphite-blue → graphite, ion-blue → slate, steel-gray → steel, mist → fog, ultraviolet → clay, toxic-lime → amber, signal-orange → ember), so every binding followed; bone and sand are new. brand/accent is now Amber, brand/accent-foreground Ink, and brand/logo Bone on dark and Ink on light.
- Logo & Brand is simplified. The mark is light on dark: Symbol and Logo Horizontal keep two variants each, Surface = Dark (Bone on Ink) and Light (Ink on Bone). The four other colour variants, the vertical lockup set and the colour-per-surface table are removed. App icon and favicon show one pairing, Bone on an Ink tile.
- Color page: the Brand identity row shows the ten colours, with outlines on Ink and Graphite; the theme frames name brand/amber and brand/ink.
- Cover: Ink ground, Bone logo and title, Amber marker; version 0.91, themes Dark · Light · High contrast, updated 15 Nov 2026.
- Decisions card: the Logos rule is rewritten for the single treatment, and a new Brand palette rule says brand colours are for brand surfaces; components use only brand/accent and brand/logo.
- Repository: tokens re-exported and transformed (--brand-accent, --brand-accent-foreground, --brand-logo). No component reads them yet.

## v0.92 — File review, one focus ring, Button trailing icon
- **Focus:** one treatment everywhere. border-width/focus goes from 1 to 2 (High contrast stays 3), and a new Dimension token, focus/offset (2), sets the gap. All 75 Focus variants on Core (Button, Icon Button, Link, Input, Textarea, Select, Search, Combobox, Multi-select, Stepper, Checkbox, Radio, Switch, Date Picker, Choice Tile, List Row, Counter and PIN Field) carry a "Focus ring" frame 2px outside the control, instead of recolouring its stroke. Inputs keep their own border on focus. Focus + Error rings follow the same geometry. The Decisions card, the Accessibility page and four descriptions are rewritten, and Button has a Focus "Why —" note.
- **Button:** a Trailing icon boolean and a Trailing icon · Icon swap (chevron-down by default), the same pattern as Leading.
- **Review fixes:**
  - Color page: 391 text layers are bound to text tokens and text styles (they were raw hex, and the hex labels sat at about 1.9:1), and 16 dividers bind to border/subtle. Every hex label was checked against its live value and none had drifted. A brand/logo row is added to both theme frames.
  - Navigation: the Menu component had collapsed to 36px wide, so its items rendered as vertical text, here and inside the open Dropdown Menu. It is fixed at 232px. App Bar / Mobile and Action Bar sat over the wrong labels and are moved under their own. Sidebar / Alt shows the workspace name instead of a logo. The leftover "IK" initials are now ER, here and in Avatar.
  - Loose App Bar, Action Bar and Bottom Sheet components are moved into their Dark sections.
  - Benchmark Table shows bare account numbers, because "Cuenta 4021" was truncated in its 92px column. Template breadcrumbs read Cartera principal.
  - Stale wording is gone from About & Guidelines (Code Connect, an Archive page that does not exist, the sample-format example) and from Chart Tooltip, Choice Tile and Counter.
- **Roadmap:** focus, trailing icon, the brand-section item, the "code differs" note (Button and Tag now match) and the Blocked full-file-review item are removed. Now holds the code for the Figma-only components.
- **Specs:** all five Code handoff specs drop the Code Connect wording. Core adds the trailingIcon mapping and the focus-ring rule.

## v0.93 — Everything in code
- The 13 components that existed only in Figma now have code and stories: Choice Tile, List Row, Counter, Count Row, PIN Field, Date Indicator, Topbar / Alt (`Topbar`), App Bar / Mobile (`AppBar`), Action Bar, Bottom Sheet, Stacked Bar Chart, Donut Chart and Line Chart · Detailed (`DetailedLineChart`). Accordion gains the Size, Leading icon and Show count props that Figma added in v0.79–v0.80.
- Code handoff specs on Core, Navigation, Data Display and Feedback & Overlays list them with their prop mappings. No page has a "Not in code yet" section any more.
- Choice Tile's description drops its last farming examples.
- Roadmap: the code item is removed, and type by role moves to Now.
