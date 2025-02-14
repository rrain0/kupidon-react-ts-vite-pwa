import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkProps: ThemeProps = {
  
  page: {
    bg:          '#18191b', // #424854
    bgGrad:      ['#282c34', '#282c34', '#282c34'],
    ct1:         '#ffffff',
    ct2:         '#bdbdbd',
    ct2a:        '#b0b0b0',
    ct3:         '#999999',
    ctSec:       '#858585',
    ctSec2:      '#7b7b7b',
  },
  statusBar: {
    bg: '#282c34',
  },
  nav: {
    bg: '#282c34',
  },
  navButton: {
    bgFc:       '#2e3440',
    ct:         ['#7b7b7b'],
    cta:        '#bdbdbd',
  },
  
  
  
  boxNormal: {
    bg:              ['#24272d'],
    bg2:             ['#282c34'],
    bg3:             '#525354',
    
    ct:         ['#bdbdbd'],
    ct1a:       ['#bdbdbd'],
    ct1b:       ['#dddddd'],
    ct2:        ['#999999'],
    ct2b:       ['#909090'],
    ct2c:       '#aaaaaa',
    ct3:        '#7b7b7b',
    ct3d:       ['#838383'],
    ct3e:       ['#777777'],
    ct4:        ['#666666'],
    ct4b:       ['#42414c'],
    ct5:        '#42414c',
    ct6:        '#505050',
    
    ctSec:      '#858585',
    
    cta:        '#bdbdbd',
    cta2:       '#2e343f',
    cta3:       '#2e343f',
    
    shadow:     ['#00000000'],
  },
  boxNormal4: {
    bg:           '#24272d',
    ct:           '#d0d0d0',
    shadow:       '#ffffff00',
    bgf:          '#18181a',
    ctf:          '#d0d0d0',
  },
  boxSec: {
    bg:         '#39404d',
    ct:         '#999999',
  },
  boxAccent: {
    bg:         ['#aaaaaa'],
    bg3:        '#bdbdbd',
    ct:         ['#000000'],
    ct2:        ['#000000'],
    ct3:        '#000000',
  },
  boxDanger: {
    bg:           '#24272d',
    ct:           '#D0214A',
    bgf:          '#18181a',
    ctf:          '#D0214A',
  },
  boxTrans: {
    bg:         '#18191b99',
    ct:         '#dddddd',
    ctSec:      '#394351',
  },
  boxWhite: { ...Light.boxWhite },
  
  
  
  buttonNormal: {
    bg:             ['#999999'],
    ct:             ['#000000'],
    bgFc:           '#7b7b7b',
    ctFc:           '#000000',
    
    bg2:             '#999999',
    bgFc2:          '#7b7b7b',
    
    bg3:            '#909090',
    ct3:            '#000000',
    bg3Fc:          '#c5c5c5',
    ct3Fc:          '#000000',
  },
  buttonMain: {
    bg:       ['#aaaaaa'],
    ct:       ['#000000'],
    bgFc:     '#bbbbbb',
    ctFc:     '#000000',
  },
  buttonAccent: {
    bg:            ['#999999'],
    ct:            ['#000000'],
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  buttonAccent2: {
    bg:            '#999999',
    ct:            '#000000',
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  buttonAccent3: {
    bg:            '#999999',
    ct:            '#000000',
    bgFc:          '#7b7b7b',
    ctFc:          '#000000',
  },
  buttonSecondary: {
    bg:        ['#00000000'],
    bgFc:      '#7b7b7b88',
    ct:        ['#999999'],
  },
  
  ripple: {
    ct:              '#00000055',
    ctOnLight:       '#cccccc33',
    ctOnTrans:       '#aaaaaa33',
  },
  
  
  
  inputRadio: {
    bgFc:      '#aaaaaa',
  },
  buttonTrans: {
    bgFc:      '#ffffff22',
  },
  
  
  
  gradIcon: {
    ctGrad:        ['#bdbdbd', '#bdbdbd'],
  },
  
  
  
  input: {
    bg:            ['#282c34'],
    ct:            ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#5e252c'],
  },
  
  rangePicker: {
    trackBg:      ['#2e343f'],
    barBg:        ['#bdbdbd'],
    handleBg:     ['#000000'],
  },
  
  elementDisabled: {
    bg:      ['#DCDCDC'],
    ct:      ['#555555'],
  },
  elementDanger: {
    bg:       ['#bbbbbb'],
    ct:       ['#000000'],
    bgFc:     '#cccccc',
    ctFc:     '#000000',
  },
  elementError: {
    bg:       ['#5e252c'],
  },
  
  
  
  
  
  previewButtonNorm: { ...Light.previewButtonNorm },
  previewButtonMain: { ...Light.previewButtonMain },
  previewOverlayInfoBox: { ...Light.previewOverlayInfoBox },
  previewFullInfoBox: {
    bg:         '#282c34',
    ct:         '#dddddd',
    ct2:        '#999999',
  },
  previewFullInfoBubble: {
    bg:         '#242528',
    ct:         '#bdbdbd',
    ct2:        '#999999',
    bgMainGrad: ['#1F1F1F', '#6D6D6D'],
    ctMain:     '#ffffff',
  },
  previewPhotosProgress: { ...Light.previewPhotosProgress },
  previewOverlayInfoMatchIndicator: { ...Light.previewOverlayInfoMatchIndicator },
  
  
  
  photos: {
    bg:                      ['#ffeeee'],
    ct:                      ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#ffffff'],
  },
  
  bottomSheet: {
    bg:        '#121212',
    ct:        '#bdbdbd',
  },
  bottomSheetHandle: {
    bg:        '#8b8b8b',
    bgFc:      '#bdbdbd',
  },
  
  toast: {
    bg:                   ['#121212'],
    ct:              ['#ffffff'],
    ct2:             ['#b8b8b8'],
    ct3:             '#ffffff',
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:      ['#e0e0e0'],
    accentLoadingCt: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: {
    track:       ['#F8F8F822'],
    thumb:       ['#F8F8F844'],
    thumbActive: ['#999999'],
  },
}



export const Dark = {
  ...DarkProps,
  type: 'dark',
  name: 'Dark Grey' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkProps.buttonAccent.bg[0],
    bgColor1:    DarkProps.page.bg,
    bgColor2:    DarkProps.page.bg,
  })),
} satisfies Theme
