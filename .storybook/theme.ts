import { create } from 'storybook/theming'

// Storybook chrome in the anm brand: Ink ground, Bone text, Amber accent
// (color/brand/* in Figma). The manager UI cannot read the CSS tokens, so the
// brand values are repeated here; change them with the palette.
export const anm = create({
  base: 'dark',
  brandTitle: 'anm design system',
  brandUrl: 'https://github.com/aangnm/anm-design-system',
  brandTarget: '_blank',

  colorPrimary: '#F5B935',
  colorSecondary: '#F5B935',

  appBg: '#0E0F11',
  appContentBg: '#131313',
  appPreviewBg: '#131313',
  appBorderColor: '#1B1E24',
  appBorderRadius: 6,

  textColor: '#F1ECE3',
  textMutedColor: '#7D8796',
  textInverseColor: '#0E0F11',

  barBg: '#0E0F11',
  barTextColor: '#C3CAD4',
  barSelectedColor: '#F5B935',
  barHoverColor: '#F5B935',

  inputBg: '#1B1E24',
  inputBorder: '#4A5463',
  inputTextColor: '#F1ECE3',
  inputBorderRadius: 6,

  fontBase: '"Inter", system-ui, sans-serif',
})
