import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightProps } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightPinkProps: ThemeProps = { ...LightProps,
  
  page: { ...LightProps.page,
    bg:         '#f5f5f5',
    bgGradient: ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
  },
  statusBar: { ...LightProps.statusBar,
    bg: '#f5f5f5',
  },
  nav: { ...LightProps.nav,
    bg: '#ffffff',
  },
  navButton: { ...LightProps.navButton,
    bgFocus:      ['#ffeaee'],
    ct:       ['#333333'],
    cta: ['#BB2649'],
  },
  
  boxNormal: { ...LightProps.boxNormal,
    bg:       ['#ffffff'],
    bg2:      ['#f0f0f0'],
    ct:   ['#000000'],
    ct2:  ['#555555'],
    ct3:  ['#7b7b7b'],
  },
  boxAccent: { ...LightProps.boxAccent,
    bg:     ['#ffaeba'],
    ct: ['#000000'],
  },
  
  buttonMain: { ...LightProps.buttonMain,
    bg:      ['#BB2649'],
    ct:      ['#F8F8F8'],
    bgFocus: ['#d93b5f'],
    ctFc:    '#F8F8F8',
  },
  buttonAccent: { ...LightProps.buttonAccent,
    bg:       ['#ff8ea9'],
    bgFocus:  ['#f17492'],
    ct:   ['#F8F8F8'],
  },
  buttonSecondary: { ...LightProps.buttonSecondary,
  
  },
  inputRadio: { ...LightProps.inputRadio,
    bgFocus:  ['#f37190'],
  },
  buttonTransparent: { ...LightProps.buttonTransparent,
    bgFocus: ['#00000011'],
  },
  
  iconGradient: { ...LightProps.iconGradient,
    ct:       ['#f17492', '#f17492'],
  },
  
  input: { ...LightProps.input,
    bg:           ['#F8F8F8'],
    ct:       ['#000000'],
    placeholder:   ['#777777'],
    border:        ['#fb3570', '#fb3570'],
    borderHover:   ['#9c20aa'],
    bgError:      ['#ffced2'],
  },
  
  elementDisabled: { ...LightProps.elementDisabled,
    bg:     ['#DCDCDC'],
    ct: ['#555555'],
  },
  elementDanger: { ...LightProps.elementDanger,
    bg:      ['#de4f48'],
    bgFocus: ['#e74c3c'],
    ct:  ['#ffffff'],
  },
  elementError: { ...LightProps.elementError,
  
  },
  
  ripple: { ...LightProps.ripple,
    ct:              '#ffffff',
    ctOnTransparent: '#666666',
  },
  
  photos: { ...LightProps.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffbaba'],
  },
  
  bottomSheet: { ...LightProps.bottomSheet,
    bg:    ['#ffffff'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...LightProps.toast,
    bg:                  ['#ffffff'],
    ct:              ['#757575'],
    ct2:             ['#b2b2b2'],
    ct3:             ['#000000'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:     ['#e0e0e0'],
    accentLoadingCt: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...LightProps.scrollbar,
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
    bgColor2:   LightPinkProps.boxNormal.bg2[0],
  })),
} satisfies Theme

