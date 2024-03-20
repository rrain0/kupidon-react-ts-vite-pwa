import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkSimpleProps = {
  containerNormal: {
    bgc:       ['#24272d'],
    bgc2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: {
    bgc:     ['#aaaaaa'],
    content: ['#000000'],
  },
  
  buttonMain: {
    bgc:      ['#aaaaaa'],
    bgcFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: {
    bgc:       ['#999999'],
    bgcFocus:  ['#7b7b7b'],
    content:   ['#000000'],
    content2:  ['#000000'],
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
  buttonNav: {
    bgcFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#bdbdbd'],
  },
  
  input: {
    bgc:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#5e252c'],
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
  
  card: {
    bgc: ['#00000000'],
  },
  page: {
    bgc:         ['#18191b'],
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



export const DarkSimple = {
  type: 'dark',
  name: 'Dark Simple' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkSimpleProps.buttonAccent.bgc[0],
    bgcColor1:   DarkSimpleProps.page.bgc[0],
    bgcColor2:   DarkSimpleProps.page.bgc[0],
  })),
  ...DarkSimpleProps,
} satisfies Theme