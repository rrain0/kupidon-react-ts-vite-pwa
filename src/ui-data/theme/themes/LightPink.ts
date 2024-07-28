import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const LightPinkProps = { ...Light,
  
  page: { ...Light.page,
    bg:         ['#f5f5f5'],
    bgGradient: ['#f5f5f5','#f5f5f5','#f5f5f5'],
    content:     ['#000000'],
  },
  statusBar: { ...Light.statusBar,
    bg: ['#ffffff'],
  },
  nav: { ...Light.nav,
    bg: ['#ffffff'],
  },
  navButton: { ...Light.navButton,
    bgFocus:      ['#ffeaee'],
    content:       ['#333333'],
    contentAccent: ['#BB2649'],
  },
  
  containerNormal: { ...Light.containerNormal,
    bg:       ['#ffffff'],
    bg2:      ['#f0f0f0'],
    content:   ['#000000'],
    content2:  ['#555555'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...Light.containerAccent,
    bg:     ['#ffaeba'],
    content: ['#000000'],
  },
  
  buttonMain: { ...Light.buttonMain,
    bg:      ['#BB2649'],
    bgFocus: ['#d93b5f'],
    content:  ['#F8F8F8'],
  },
  buttonAccent: { ...Light.buttonAccent,
    bg:       ['#ff8ea9'],
    bgFocus:  ['#f17492'],
    content:   ['#F8F8F8'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...Light.buttonSecondary,
  
  },
  inputRadio: { ...Light.inputRadio,
    bgFocus:  ['#f37190']
  },
  buttonTransparent: { ...Light.buttonTransparent,
    bgFocus: ['#00000011'],
  },
  
  iconGradient: { ...Light.iconGradient,
    content:       ['#f17492','#f17492'],
  },
  
  input: { ...Light.input,
    bg:           ['#F8F8F8'],
    content:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#fb3570','#fb3570'],
    borderHover:   ['#9c20aa'],
    bgError:      ['#ffced2'],
  },
  
  elementDisabled: { ...Light.elementDisabled,
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Light.elementDanger,
    bg:      ['#de4f48'],
    bgFocus: ['#e74c3c'],
    content:  ['#ffffff'],
  },
  elementError: { ...Light.elementError,
  
  },
  
  ripple: { ...Light.ripple,
    content:              ['#ffffff'],
    contentOnTransparent: ['#666666'],
  },
  
  photos: { ...Light.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bg:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Light.toast,
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
    accentColor: LightPinkProps.buttonAccent.bg[0],
    bgColor1:   LightPinkProps.buttonAccent.bg[0],
    bgColor2:   LightPinkProps.containerNormal.bg2[0],
  })),
} satisfies Theme

