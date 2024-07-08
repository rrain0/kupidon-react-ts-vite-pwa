import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkProps = {
  
  page: {
    bgc:         ['#18191b'], // #424854
    bgcGradient: ['#282c34','#282c34','#282c34'],
    content1:    ['#ffffff'],
    content2:    ['#bdbdbd'],
    content3:    ['#999999'],
  },
  statusBar: {
    bgc: ['#282c34'],
  },
  nav: {
    bgc: ['#282c34'],
  },
  navButton: {
    bgcFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#bdbdbd'],
  },
  
  containerNormal: {
    bgc:       ['#24272d'],
    bgc2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content1b: ['#dddddd'],
    content2:  ['#999999'],
    content2b: ['#909090'],
    content3:  ['#7b7b7b'],
    content4:  ['#666666'],
    shadow:    ['#00000000'],
    contentAccent:   ['#bdbdbd'],
    contentAccent2:  ['#2e343f'],
    contentAccent3:  ['#2e343f'],
  },
  containerAccent: {
    bgc:      ['#aaaaaa'],
    bgc2:     ['#bdbdbd'],
    content:  ['#000000'],
    content2: ['#000000'],
  },
  
  buttonMain: {
    bgc:      ['#aaaaaa'],
    bgcFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: {
    bgc:           ['#999999'],
    content:       ['#000000'],
    bgcFocus:      ['#7b7b7b'],
    contentFocus:  ['#000000'],
  },
  buttonNormal: {
    bgc:            ['#999999'],
    content:        ['#000000'],
    bgcFocus:       ['#7b7b7b'],
    contentFocus:   ['#000000'],
  },
  buttonSecondary: {
    bgc:       ['transparent'],
    bgcFocus:  ['#7b7b7b88'],
    content:   ['#999999'],
  },
  inputRadio: {
    bgcFocus:  ['#aaaaaa']
  },
  buttonTransparent: {
    bgcFocus: ['#ffffff22'],
  },
  
  iconGradient: {
    content:       ['#bdbdbd','#bdbdbd'],
  },
  
  input: {
    bgc:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#5e252c'],
  },
  
  rangePicker: {
    trackBgc:      ['#2e343f'],
    barBgc:        ['#bdbdbd'],
    handleBgc:     ['#000000'],
  },
  
  elementDisabled: {
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: {
    bgc:      ['#bbbbbb'],
    bgcFocus: ['#cccccc'],
    content:  ['#000000'],
  },
  elementError: {
    bgc:      ['#5e252c'],
  },
  
  ripple: {
    content:              ['#000000'],
    contentOnTransparent: ['#ffffff88'],
  },
  
  photos: {
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffffff'],
  },
  
  bottomSheet: {
    bgc:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bgc:                  ['#121212'],
    content:              ['#ffffff'],
    content2:             ['#b8b8b8'],
    content3:             ['#ffffff'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
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
    accentColor: DarkProps.buttonAccent.bgc[0],
    bgcColor1:   DarkProps.page.bgc[0],
    bgcColor2:   DarkProps.page.bgc[0],
  })),
} satisfies Theme