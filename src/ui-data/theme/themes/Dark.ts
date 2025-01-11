import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightProps } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkProps: ThemeProps = {
  
  page: {
    bg:          '#18191b', // #424854
    bgGradient:  ['#282c34', '#282c34', '#282c34'],
    ct1:         '#ffffff',
    ct2:         '#bdbdbd',
    ct3:         '#999999',
  },
  statusBar: {
    bg: '#282c34',
  },
  nav: {
    bg: '#282c34',
  },
  navButton: {
    bgFocus:    ['#2e3440'],
    ct:         ['#7b7b7b'],
    cta:        ['#bdbdbd'],
  },
  
  boxNormal: {
    bg:              ['#24272d'],
    bg2:             ['#282c34'],
    bg3:             ['#525354'],
    
    ct:         ['#bdbdbd'],
    ct1a:       ['#bdbdbd'],
    ct1b:       ['#dddddd'],
    ct2:        ['#999999'],
    ct2b:       ['#909090'],
    ct2c:       '#aaaaaa',
    ct3:        ['#7b7b7b'],
    ct3d:       ['#838383'],
    ct3e:       ['#777777'],
    ct4:        ['#666666'],
    ct4b:       ['#42414c'],
    ct5:        '#42414c',
    ct6:        '#505050',
    
    cta:   ['#bdbdbd'],
    cta2:  '#2e343f',
    cta3:  ['#2e343f'],
    
    shadow:     ['#00000000'],
  },
  boxAccent: {
    bg:         ['#aaaaaa'],
    bg3:        '#bdbdbd',
    ct:         ['#000000'],
    ct2:        ['#000000'],
    ct3:        '#000000',
  },
  
  
  
  buttonMain: {
    bg:       ['#aaaaaa'],
    bgFocus:  ['#bbbbbb'],
    ct:       ['#000000'],
  },
  buttonAccent: {
    bg:            ['#999999'],
    bg2:           ['#999999'],
    ct:            ['#000000'],
    ct2:           '#000000',
    bgFocus:       ['#7b7b7b'],
    ctFocus:       ['#000000'],
  },
  buttonNormal: {
    bg:             ['#999999'],
    bg2:             '#999999',
    ct:             ['#000000'],
    bgFocus:        ['#7b7b7b'],
    bgFocus2:        '#7b7b7b',
    ctFocus:        ['#000000'],
  },
  buttonSecondary: {
    bg:        ['#00000000'],
    bgFocus:   ['#7b7b7b88'],
    ct:        ['#999999'],
  },
  
  ripple: {
    ct:              ['#000000'],
    ctOnTransparent: ['#aaaaaa'],
  },
  
  
  
  inputRadio: {
    bgFocus:   ['#aaaaaa'],
  },
  buttonTransparent: {
    bgFocus:   ['#ffffff22'],
  },
  
  
  
  iconGradient: {
    ct:        ['#bdbdbd', '#bdbdbd'],
  },
  
  
  
  input: {
    bg:            ['#282c34'],
    ct:            ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b', '#7b7b7b'],
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
    bgFocus:  ['#cccccc'],
    ct:       ['#000000'],
  },
  elementError: {
    bg:       ['#5e252c'],
  },
  
  
  
  boxTransparent: {
    bg:  '#18191b99',
    ct:  '#dddddd',
  },
  
  boxPink: {
    bg:  ['#F0849D', '#CD617A'],
    ct:  '#FFFFFF',
  },
  boxWithPink: {
    bg:   '#FFFFFF',
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
    
    bgFocus: ['#ffa9bd', '#ffffff'],
    ctFocus:  '#DD718A',
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
  
  
  
  previewButtonNorm: { ...LightProps.previewButtonNorm },
  previewButtonMain: { ...LightProps.previewButtonMain },
  previewInfoBox: { ...LightProps.previewInfoBox },
  
  
  photos: {
    bg:                      ['#ffeeee'],
    ct:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:        ['#8B8B8B'],
    highlightFrameAccentBg:  ['#ffffff'],
  },
  
  bottomSheet: {
    bg:     ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bg:                   ['#121212'],
    ct:              ['#ffffff'],
    ct2:             ['#b8b8b8'],
    ct3:             ['#ffffff'],
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
