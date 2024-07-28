import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss



const LightProps = {
  
  page: {
    bg:         ['#f5f5f5'],
    bgGradient: ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
    content1:    ['#000000'],
    content2:    ['#000000'],
    content3:    ['#999999'],
  },
  statusBar: {
    bg: ['#ffffff'],
  },
  nav: {
    bg: ['#ffffff'],
  },
  navButton: {
    bgFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#333333'],
  },
  
  containerNormal: {
    bg:       ['#ffffff'],
    bg2:      ['#f0f0f0'],
    bg3:      ['#f0f0f0'],
    content:   ['#000000'],
    content1b: ['#232020'],
    content2:  ['#555555'],
    content2b: ['#5b5b5b'],
    content3:  ['#7b7b7b'],
    content4:  ['#d1d1d1'],
    contentAccent:   ['#333333'],
    contentAccent2:  ['#d1d1d1'],
    contentAccent3:  ['#d1d1d1'],
    shadow:    ['#00000026'],
  },
  containerAccent: {
    bg:      ['#bbbbbb'],
    bg2:     ['#333333'],
    content:  ['#000000'],
    content2: ['#F8F8F8'],
  },
  
  buttonMain: {
    bg:      ['#7b7b7b'],
    bgFocus: ['#aaaaaa'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: {
    bg:           ['#bbbbbb'],
    content:       ['#000000'],
    bgFocus:      ['#999999'],
    contentFocus:  ['#000000'],
  },
  buttonNormal: {
    bg:           ['#bbbbbb'],
    content:       ['#000000'],
    bgFocus:      ['#dddddd'],
    contentFocus:  ['#000000'],
  },
  buttonSecondary: {
    bg:       ['transparent'],
    bgFocus:  ['#99999988'],
    content:   ['#bbbbbb'],
  },
  inputRadio: {
    bgFocus:  ['#7b7b7b'],
  },
  buttonTransparent: {
    bgFocus: ['#00000011'],
  },
  
  iconGradient: {
    content:       ['#444444', '#444444'],
  },
  
  input: {
    bg:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b', '#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:      ['#ffced2'],
  },
  
  rangePicker: {
    trackBg:      ['#d1d1d1'],
    barBg:        ['#333333'],
    handleBg:     ['#F8F8F8'],
  },
  
  elementDisabled: {
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: {
    bg:      ['#7b7b7b'],
    bgFocus: ['#999999'],
    content:  ['#ffffff'],
  },
  elementError: {
    bg:      ['#ffced2'],
  },
  
  ripple: {
    content:              ['#ffffff'],
    contentOnTransparent: ['#666666'],
  },
  
  photos: {
    bg:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#000000'],
  },
  
  bottomSheet: {
    bg:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bg:                  ['#ffffff'],
    content:              ['#757575'],
    content2:             ['#b2b2b2'],
    content3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
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
    bgColor1:   LightProps.page.bg[0],
    bgColor2:   LightProps.page.bg[0],
  })),
} satisfies Theme

