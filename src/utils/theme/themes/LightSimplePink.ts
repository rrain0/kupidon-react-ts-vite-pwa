/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { LightSimple } from 'src/utils/theme/themes/LightSimple'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightSimpleProps = { ...LightSimple,
  containerNormal: { ...LightSimple.containerNormal,
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...LightSimple.containerAccent,
    bgc:     ['#bbbbbb'],
    content: ['#000000'],
  },
  
  buttonMain: { ...LightSimple.buttonMain,
    bgc:      ['#7b7b7b'],
    bgcFocus: ['#aaaaaa'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: { ...LightSimple.buttonAccent,
    bgc:       ['#bbbbbb'],
    bgcFocus:  ['#999999'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...LightSimple.buttonSecondary,
    bgc:       ['transparent'],
    bgcFocus:  ['#99999988'],
    content:   ['#bbbbbb'],
  },
  inputRadio: { ...LightSimple.inputRadio,
    bgcFocus:  ['#7b7b7b']
  },
  buttonTransparent: { ...LightSimple.buttonTransparent,
    bgcFocus: ['#00000011'],
  },
  buttonNav: { ...LightSimple.buttonNav,
    bgcFocus:      ['#f0f0f0'],
    content:       ['#7b7b7b'],
    contentAccent: ['#BB2649'],
  },
  
  input: { ...LightSimple.input,
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#ffced2'],
  },
  
  elementDisabled: { ...LightSimple.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...LightSimple.elementDanger,
    bgc:      ['#7b7b7b'],
    bgcFocus: ['#999999'],
    content:  ['#ffffff'],
  },
  elementError: { ...LightSimple.elementError,
    bgc:      ['#ffced2'],
  },
  
  ripple: { ...LightSimple.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: { ...LightSimple.photos,
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffbaba'],
  },
  
  bottomSheet: { ...LightSimple.bottomSheet,
    bgc:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  card: { ...LightSimple.card,
    bgc: ['#ffffff00'],
  },
  page: { ...LightSimple.page,
    bgc:         ['#f5f5f5'],
    bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content:     ['#000000'],
  },
  
  statusBar: { ...LightSimple.statusBar,
    bgc: ['#ffffff'],
  },
  nav: { ...LightSimple.nav,
    bgc: ['#ffffff'],
  },
  
  toast: { ...LightSimple.toast,
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
  scrollbar: { ...LightSimple.scrollbar,
    track:       ['#25283622'],
    thumb:       ['#25283644'],
    thumbActive: ['#999999'],
  },
}



export const LightSimplePink = {
  ...LightSimpleProps,
  type: 'light',
  name: 'Light Simple Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightSimpleProps.photos.highlightFrameAccentBgc[0],
    bgcColor1:   LightSimpleProps.photos.highlightFrameAccentBgc[0],
    bgcColor2:   LightSimpleProps.page.bgc[0],
  })),
} satisfies Theme

