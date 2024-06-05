import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss



const LightProps = {
  
  page: {
    bgc:         ['#f5f5f5'],
    bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content1:    ['#000000'],
    content2:    ['#000000'],
    content3:    ['#999999'],
  },
  statusBar: {
    bgc: ['#ffffff'],
  },
  nav: {
    bgc: ['#ffffff'],
  },
  navButton: {
    bgcFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#333333'],
  },
  
  containerNormal: {
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content1b: ['#232020'],
    content2:  ['#555555'],
    content2b: ['#5b5b5b'],
    content3:  ['#7b7b7b'],
    content4:  ['#d1d1d1'],
    shadow:    ['#00000026'],
    contentAccent:   ['#333333'],
    contentAccent2:  ['#d1d1d1'],
    contentAccent3:  ['#d1d1d1'],
  },
  containerAccent: {
    bgc:      ['#bbbbbb'],
    bgc2:     ['#333333'],
    content:  ['#000000'],
    content2: ['#F8F8F8'],
  },
  
  buttonMain: {
    bgc:      ['#7b7b7b'],
    bgcFocus: ['#aaaaaa'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: {
    bgc:       ['#bbbbbb'],
    bgcFocus:  ['#999999'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonNormal: {
    bgc:       ['#bbbbbb'],
    bgcFocus:  ['#999999'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonSecondary: {
    bgc:       ['transparent'],
    bgcFocus:  ['#99999988'],
    content:   ['#bbbbbb'],
  },
  inputRadio: {
    bgcFocus:  ['#7b7b7b']
  },
  buttonTransparent: {
    bgcFocus: ['#00000011'],
  },
  
  iconGradient: {
    content:       ['#444444','#444444'],
  },
  
  input: {
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#ffced2'],
  },
  
  rangePicker: {
    trackBgc:      ['#d1d1d1'],
    barBgc:        ['#333333'],
    handleBgc:     ['#F8F8F8'],
  },
  
  elementDisabled: {
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: {
    bgc:      ['#7b7b7b'],
    bgcFocus: ['#999999'],
    content:  ['#ffffff'],
  },
  elementError: {
    bgc:      ['#ffced2'],
  },
  
  ripple: {
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: {
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#000000'],
  },
  
  bottomSheet: {
    bgc:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: {
    bgc:                  ['#ffffff'],
    content:              ['#757575'],
    content2:             ['#b2b2b2'],
    content3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
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
    accentColor: LightProps.buttonAccent.bgc[0],
    bgcColor1:   LightProps.page.bgc[0],
    bgcColor2:   LightProps.page.bgc[0],
  })),
} satisfies Theme

