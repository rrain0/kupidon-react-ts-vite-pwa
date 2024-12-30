import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightProps: ThemeProps = {
  
  page: {
    bg:          '#f5f5f5',
    bgGradient:  ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
    ct1:    '#000000',
    ct2:    '#000000',
    ct3:    '#999999',
  },
  statusBar: {
    bg: ['#f5f5f5'],
  },
  nav: {
    bg: ['#ffffff'],
  },
  navButton: {
    bgFocus:       ['#f0f0f0'],
    ct:       ['#7b7b7b'],
    cta: ['#333333'],
  },
  
  boxNormal: {
    bg:              ['#ffffff'],
    bg2:             ['#f0f0f0'],
    bg3:             ['#f0f0f0'],
    
    ct:         ['#000000'],
    ct1a:       ['#1b1919'],
    ct1b:       ['#444444'],
    ct2:        ['#555555'],
    ct2b:       ['#5b5b5b'],
    ct2c:       '#666666',
    ct3:        ['#7b7b7b'],
    ct3d:       ['#838383'],
    ct3e:       ['#999999'],
    ct4:        ['#d1d1d1'],
    ct4b:       ['#dddddd'],
    ct5:        '#e3e3e3',
    ct6:        '#ececec',
    
    cta:   ['#333333'],
    cta2:  '#d1d1d1',
    cta3:  ['#d1d1d1'],
    
    shadow:          ['#00000026'],
  },
  boxAccent: {
    bg:       ['#bbbbbb'],
    bg3:      '#aaaaaa',
    ct:  ['#000000'],
    ct2: ['#F8F8F8'],
    ct3:       '#ffffff',
  },
  
  buttonMain: {
    bg:       ['#7b7b7b'],
    bgFocus:  ['#aaaaaa'],
    ct:  ['#F8F8F8'],
  },
  buttonAccent: {
    bg:            ['#bbbbbb'],
    bg2:           ['#bbbbbb'],
    ct:       ['#000000'],
    ct2:           '#000000',
    bgFocus:       ['#999999'],
    ctFocus:  ['#000000'],
  },
  buttonNormal: {
    bg:            ['#bbbbbb'],
    bg2:           '#dddddd',
    ct:       ['#000000'],
    bgFocus:       ['#dddddd'],
    bgFocus2:      '#dddddd',
    ctFocus:  ['#000000'],
  },
  buttonSecondary: {
    bg:        ['transparent'],
    bgFocus:   ['#99999988'],
    ct:   ['#bbbbbb'],
  },
  inputRadio: {
    bgFocus:  ['#7b7b7b'],
  },
  buttonTransparent: {
    bgFocus: ['#00000011'],
  },
  
  iconGradient: {
    ct:       ['#444444', '#444444'],
  },
  
  input: {
    bg:            ['#F8F8F8'],
    ct:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:       ['#ffced2'],
  },
  
  rangePicker: {
    trackBg:      ['#d1d1d1'],
    barBg:        ['#333333'],
    handleBg:     ['#F8F8F8'],
  },
  
  elementDisabled: {
    bg:      ['#DCDCDC'],
    ct: ['#555555'],
  },
  elementDanger: {
    bg:       ['#7b7b7b'],
    bgFocus:  ['#999999'],
    ct:  ['#ffffff'],
  },
  elementError: {
    bg:       ['#ffced2'],
  },
  
  ripple: {
    ct:              ['#ffffff'],
    ctOnTransparent: ['#666666'],
  },
  
  
  boxTransparent: {
    bg: '#ffffff99',
    ct:  '#291f1d',
  },
  
  boxPink: {
    bg: ['#F0849D', '#CD617A'],
    ct:  '#FFFFFF',
  },
  boxWithPink: {
    bg:  '#FFFFFF',
    ct:   '#DD718A',
    
    bgFocus: ['#ffa9bd', '#ffffff'],
    ctFocus:  '#DD718A',
  },
  
  boxWine: {
    bg: ['#BB2649', '#F75F82'],
    ct:  '#FFFFFF',
  },
  boxWithWine: {
    bg:  '#FFFFFF',
    ct:   '#BB2649',
    
    bgFocus: ['#F75F82', '#ffffff'],
    ctFocus:  '#BB2649',
  },
  
  boxViolet: {
    bg: ['#AB6FE7', '#8B43D3'],
    ct:  '#FFFFFF',
  },
  boxWithViolet: {
    bg:  '#FFFFFF',
    ct:   '#934DD8',
    
    bgFocus: ['#d2abf9', '#ffffff'],
    ctFocus:  '#934DD8',
  },
  
  boxBlue: {
    bg:  ['#67A9D9', '#2E85C3'],
    ct:   '#FFFFFF',
  },
  boxWithBlue: {
    bg:  '#FFFFFF',
    ct:   '#398CC8',
    
    bgFocus: ['#bae2ff', '#ffffff'],
    ctFocus:  '#398CC8',
  },
  
  
  photos: {
    bg:                      ['#ffeeee'],
    ct:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#000000'],
  },
  
  bottomSheet: {
    bg:     ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bg:                   ['#ffffff'],
    ct:              ['#757575'],
    ct2:             ['#b2b2b2'],
    ct3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:      ['#e0e0e0'],
    accentLoadingCt: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: {
    track:       ['#25283622'],
    thumb:       ['#25283644'],
    thumbActive: ['#999999'],
  },
}



export const Light = {
  ...LightProps,
  type: 'light',
  name: 'Light Grey' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightProps.buttonAccent.bg[0],
    bgColor1:    LightProps.page.bg,
    bgColor2:    LightProps.page.bg,
  })),
} satisfies Theme

