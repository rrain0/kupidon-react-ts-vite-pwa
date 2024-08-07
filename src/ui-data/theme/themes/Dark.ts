import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkProps = {
  
  page: {
    bg:         ['#18191b'], // #424854
    bgGradient: ['#282c34', '#282c34', '#282c34'],
    content1:    ['#ffffff'],
    content2:    ['#bdbdbd'],
    content3:    ['#999999'],
  },
  statusBar: {
    bg: ['#282c34'],
  },
  nav: {
    bg: ['#282c34'],
  },
  navButton: {
    bgFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#bdbdbd'],
  },
  
  containerNormal: {
    bg:       ['#24272d'],
    bg2:      ['#282c34'],
    bg3:      ['#525354'],
    content:   ['#bdbdbd'],
    content1b: ['#dddddd'],
    content2:  ['#999999'],
    content2b: ['#909090'],
    content3:  ['#7b7b7b'],
    content4:  ['#666666'],
    contentAccent:   ['#bdbdbd'],
    contentAccent2:  ['#2e343f'],
    contentAccent3:  ['#2e343f'],
    shadow:    ['#00000000'],
  },
  containerAccent: {
    bg:      ['#aaaaaa'],
    bg2:     ['#bdbdbd'],
    content:  ['#000000'],
    content2: ['#000000'],
  },
  
  buttonMain: {
    bg:      ['#aaaaaa'],
    bgFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: {
    bg:           ['#999999'],
    content:       ['#000000'],
    bgFocus:      ['#7b7b7b'],
    contentFocus:  ['#000000'],
  },
  buttonNormal: {
    bg:            ['#999999'],
    content:        ['#000000'],
    bgFocus:       ['#7b7b7b'],
    contentFocus:   ['#000000'],
  },
  buttonSecondary: {
    bg:       ['transparent'],
    bgFocus:  ['#7b7b7b88'],
    content:   ['#999999'],
  },
  inputRadio: {
    bgFocus:  ['#aaaaaa']
  },
  buttonTransparent: {
    bgFocus: ['#ffffff22'],
  },
  
  iconGradient: {
    content:       ['#bdbdbd','#bdbdbd'],
  },
  
  input: {
    bg:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:      ['#5e252c'],
  },
  
  rangePicker: {
    trackBg:      ['#2e343f'],
    barBg:        ['#bdbdbd'],
    handleBg:     ['#000000'],
  },
  
  elementDisabled: {
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: {
    bg:      ['#bbbbbb'],
    bgFocus: ['#cccccc'],
    content:  ['#000000'],
  },
  elementError: {
    bg:      ['#5e252c'],
  },
  
  ripple: {
    content:              ['#000000'],
    contentOnTransparent: ['#aaaaaa'],
  },
  
  photos: {
    bg:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffffff'],
  },
  
  bottomSheet: {
    bg:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bg:                  ['#121212'],
    content:              ['#ffffff'],
    content2:             ['#b8b8b8'],
    content3:             ['#ffffff'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:     ['#e0e0e0'],
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
    accentColor: DarkProps.buttonAccent.bg[0],
    bgColor1:   DarkProps.page.bg[0],
    bgColor2:   DarkProps.page.bg[0],
  })),
} satisfies Theme
