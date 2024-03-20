/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled'
import { AppTheme } from 'src/utils/theme/AppTheme'
import { LightSimple } from 'src/utils/theme/themes/LightSimple'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightPinkProps = { ...LightSimple,
  containerNormal: { ...LightSimple.containerNormal,
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...LightSimple.containerAccent,
    bgc:     ['#ffaeba'],
    content: ['#000000'],
  },
  
  buttonMain: { ...LightSimple.buttonMain,
    bgc:      ['#BB2649'],
    bgcFocus: ['#d93b5f'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: { ...LightSimple.buttonAccent,
    bgc:       ['#ff8ea9'],
    bgcFocus:  ['#f17492'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...LightSimple.buttonSecondary,
  
  },
  inputRadio: { ...LightSimple.inputRadio,
    bgcFocus:  ['#f37190']
  },
  buttonTransparent: { ...LightSimple.buttonTransparent,
    bgcFocus: ['#00000011'],
  },
  buttonNav: { ...LightSimple.buttonNav,
    bgcFocus:      ['#ffeaee'],
    content:       ['#333333'],
    contentAccent: ['#BB2649'],
  },
  
  input: { ...LightSimple.input,
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#fb3570','#fb3570'],
    borderHover:   ['#9c20aa'],
    bgcError:      ['#ffced2'],
  },
  
  elementDisabled: { ...LightSimple.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...LightSimple.elementDanger,
    bgc:      ['#de4f48'],
    bgcFocus: ['#e74c3c'],
    content:  ['#ffffff'],
  },
  elementError: { ...LightSimple.elementError,
  
  },
  
  ripple: { ...LightSimple.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: { ...LightSimple.photos,
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
    track: ['#25283622'],
    thumb: ['#25283644'],
  },
}




export const LightPink = {
  ...LightPinkProps,
  type: 'light',
  name: 'Light Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: LightPinkProps.buttonAccent.bgc[0],
    bgcColor1:   LightPinkProps.buttonAccent.bgc[0],
    bgcColor2:   LightPinkProps.containerNormal.bgc2[0],
  })),
} satisfies Theme

