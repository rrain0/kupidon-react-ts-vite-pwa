/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightSimpleProps = {
  containerNormal: {
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: {
    bgc:     ['#bbbbbb'],
    content: ['#000000'],
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
  buttonNav: {
    bgcFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#333333'],
  },
  
  input: {
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#ffced2'],
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
  
  card: {
    bgc: ['#ffffff00'],
  },
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



export const LightSimple = {
  ...LightSimpleProps,
  type: 'light',
  name: 'Light Simple' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightSimpleProps.buttonAccent.bgc[0],
    bgcColor1:   LightSimpleProps.page.bgc[0],
    bgcColor2:   LightSimpleProps.page.bgc[0],
  })),
} satisfies Theme

