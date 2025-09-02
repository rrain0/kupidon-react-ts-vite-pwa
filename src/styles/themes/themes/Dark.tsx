import { AppTheme } from 'src/styles/themes/AppTheme.ts'
import { Light } from 'src/styles/themes/themes/Light.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const Dark = {
  type: 'dark',
  name: 'Dark Grey' as const,
  icon: (
    <div
      css={themeIconCss({
        colorAccent: '#bdbdbd',
        bgColor1:    '#282c34',
        bgColor2:    '#282c34',
      })}
    />
  ),
  
  
  
  
  page: {
    bg:            '#282c34', // #18191b #424854
    bgGrad:        ['#282c34', '#282c34', '#282c34'],
    ct:            '#ffffff',
    ct2:           '#bdbdbd',
    ct3:           '#b0b0b0',
    ctSec:         '#858585',
    ctSec2:        '#7b7b7b',
  },
  statusBar: {
    bg:            '#282c34',
  },
  nav: {
    bg:            '#282c34',
  },
  navButton: {
    bgFc:          '#2e3440',
    ct:            '#7b7b7b',
    cta:           '#bdbdbd',
  },
  
  
  
  boxDefault: { bg: '#24272d', ct: '#bdbdbd' },
  boxDefault2: { bg: '#24272d', ct: '#bdbdbd', cta: '#2e343f' },
  boxDefault3: { bg: '#282c34', ct: '#bdbdbd' },
  boxDefault4: { ct: '#dddddd', cta: '#738cbe' },
  boxDefault5: { ct: '#909090', ctSec: '#666666' },
  boxDefault6: { ct: '#7b7b7b' },
  boxDefault7: { ct: '#838383' },
  boxDefault8: { ct: '#777777' },
  boxDefault9: { bg: '#aaaaaa', ct: '#000000' },
  boxDefault10: { ctSec: '#42414c' },
  boxDefault11: { ctSec: '#42414c' },
  
  
  boxNormal: {
    bg:            '#999999',
    ct:            '#000000',
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  boxNormalCt: {
    bg:            'transparent',
    ct:            '#999999',
    bgf:           '#00000008',
    ctf:           '#999999',
  },
  boxNormal2: {
    bg:            '#999999',
    ct:            '#000000',
    bgf:           '#7b7b7b',
    ctf:           '#000000',
  },
  boxNormal3: {
    bg:            '#909090',
    ct:            '#000000',
    bgf:           '#c5c5c5',
    ctf:           '#000000',
  },
  boxNormal4: {
    bg:            '#24272d',
    ct:            '#d0d0d0',
    shadow:        '#ffffff00',
    bgf:           '#18181a',
    ctf:           '#d0d0d0',
  },
  
  boxAccent: {
    bg:            '#bdbdbd',
    ct:            '#000000',
    bgf:           '#999999',
    ctf:           '#000000',
  },
  boxAccentCt: {
    bg:            'transparent',
    ct:            '#bdbdbd',
    bgf:           '#99999933',
    ctf:           '#bdbdbd',
    ctRipple:      '#42414c88',
  },
  boxAccent2: {
    bg:            '#999999',
    ct:            '#000000',
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  boxAccent3: {
    bg:            '#999999',
    ct:            '#000000',
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  boxAccent4: {
    bg:            '#aaaaaa',
    ct:            '#000000',
  },
  boxAccentCt4: {
    bg:            '#24272d',
    ct:            '#d0d0d0',
    ctGrad:        ['#42414c', '#ffffff'],
    shadow:        '#ffffff00',
    bgf:           '#18181a',
    ctf:           '#d0d0d0',
  },
  boxAccent5: {
    ct:            '#bdbdbd',
  },
  boxAccent6Ct: {
    bg:            '#000000',
    ct:            '#ffffff',
  },
  
  boxMain: {
    bg:            '#aaaaaa',
    ct:            '#000000',
    bgFc:          '#bbbbbb',
    ctFc:          '#000000',
  },
  boxMain2: {
    bgGrad:        ['#ffffff', '#ffffff', '#42414c'],
    ct:            '#FFFFFF',
    ctFc:          '#FFFFFF',
  },
  
  boxSecondary: {
    bg:            '#39404d',
    ct:            '#999999',
  },
  boxSecondary2: {
    ct:            '#939393',
  },
  boxSecondary3: {
    bg:            '#39404d',
    ct:            '#5c677a',
  },
  boxSecondary4: {
    ct:            '#858585',
  },
  
  boxDanger: {
    bg:            '#24272d',
    ct:            '#c90000',
    bgf:           '#18181a',
    ctf:           '#c90000',
  },
  boxDisabled: {
    bg:            '#61656b88',
    ct:            '#a5aab488',
  },
  boxTransNormal: {
    bg:            'transparent',
    ct:            '#bdbdbd',
    bgf:           '#ffffff22',
    ctf:           '#bdbdbd',
  },
  boxTransSec: {
    bg:            'transparent',
    ct:            '#bdbdbd',
    bgf:           '#ffffff22',
    ctf:           '#bdbdbd',
  },
  boxTransSec2: {
    bg:            'transparent',
    ct:            '#848484',
  },
  boxSemitrans: {
    bg:            '#30333999',
    ct:            '#dddddd',
    ctSec:         '#394351',
  },
  boxWhite: { ...Light.boxWhite },
  
  
  
  
  ripple: {
    ct:            '#00000055',
    ctOnLight:     '#cccccc33',
    ctOnTrans:     '#aaaaaa33',
  },
  error: {
    ct:            '#e74c3c',
  },
  errorSec: {
    ct:            '#7a514c',
  },
  shadow: {
    bg:            'transparent',
    bg2:           'transparent',
    bg3OnLight:    '#000000aa',
  },
  
  
  
  inputRadio: {
    bgFc:          '#aaaaaa',
  },
  
  
  
  input: {
    bg:            '#282c34',
    ct:            '#cdcdcd',
    placeholder:   '#7b7b7b',
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   '#7b7b7b',
    bgError:       '#5e252c',
  },
  
  rangePicker: {
    trackBg:       '#2e343f',
    barBg:         '#bdbdbd',
    handleBg:      '#000000',
  },
  
  
  
  
  
  previewButtonNorm: { ...Light.previewButtonNorm },
  previewButtonMain: { ...Light.previewButtonMain },
  previewOverlayInfoBox: { ...Light.previewOverlayInfoBox },
  previewFullInfoBox: {
    bg:            '#282c34',
    ct:            '#dddddd',
    ct2:           '#999999',
  },
  previewFullInfoBubble: {
    bg:            '#242528',
    ct:            '#bdbdbd',
    ct2:           '#999999',
    bgMainGrad:    ['#1F1F1F', '#6D6D6D'],
    ctMain:        '#ffffff',
  },
  previewPhotosProgress: { ...Light.previewPhotosProgress },
  previewOverlayInfoMatchIndicator: { ...Light.previewOverlayInfoMatchIndicator },
  
  
  
  photos: {
    bg:                      '#ffeeee',
    ct:                      '#291f1d',
    borderDrag:              '#1F8DCD',
    highlightFrameBg:        '#8B8B8B',
    highlightFrameAccentBg:  '#ffffff',
  },
  
  bottomSheet: {
    bg:            '#121212',
    ct:            '#bdbdbd',
  },
  bottomSheetHandle: {
    bg:            '#8b8b8b',
    bgFc:          '#bdbdbd',
  },
  
  
  toast: { ...Light.toast,
    bg:            '#121212',
    ct:            '#ffffff',
    ct2:           '#b8b8b8',
    ct3:           '#ffffff',
  },
  scrollbar: {
    track:         '#F8F8F822',
    thumb:         '#F8F8F844',
    thumbActive:   '#999999',
  },
  
} satisfies Theme
