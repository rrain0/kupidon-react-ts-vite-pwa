import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightPinkProps = { ...Light,
  
  page: { ...Light.page,
    bgc:         ['#f5f5f5'],
    bgcGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content:     ['#000000'],
  },
  statusBar: { ...Light.statusBar,
    bgc: ['#ffffff'],
  },
  nav: { ...Light.nav,
    bgc: ['#ffffff'],
  },
  navButton: { ...Light.navButton,
    bgcFocus:      ['#ffeaee'],
    content:       ['#333333'],
    contentAccent: ['#BB2649'],
  },
  
  containerNormal: { ...Light.containerNormal,
    bgc:       ['#ffffff'],
    bgc2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...Light.containerAccent,
    bgc:     ['#ffaeba'],
    content: ['#000000'],
  },
  
  buttonMain: { ...Light.buttonMain,
    bgc:      ['#BB2649'],
    bgcFocus: ['#d93b5f'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: { ...Light.buttonAccent,
    bgc:       ['#ff8ea9'],
    bgcFocus:  ['#f17492'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...Light.buttonSecondary,
  
  },
  inputRadio: { ...Light.inputRadio,
    bgcFocus:  ['#f37190']
  },
  buttonTransparent: { ...Light.buttonTransparent,
    bgcFocus: ['#00000011'],
  },
  
  iconGradient: { ...Light.iconGradient,
    content:       ['#f17492','#f17492'],
  },
  
  input: { ...Light.input,
    bgc:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#fb3570','#fb3570'],
    borderHover:   ['#9c20aa'],
    bgcError:      ['#ffced2'],
  },
  
  elementDisabled: { ...Light.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Light.elementDanger,
    bgc:      ['#de4f48'],
    bgcFocus: ['#e74c3c'],
    content:  ['#ffffff'],
  },
  elementError: { ...Light.elementError,
  
  },
  
  ripple: { ...Light.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#00000088'],
  },
  
  photos: { ...Light.photos,
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bgc:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Light.toast,
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
  scrollbar: { ...Light.scrollbar,
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

