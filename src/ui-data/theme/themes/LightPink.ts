import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const LightPinkProps: ThemeProps = { ...Light,
  
  page: { ...Light.page,
    bg:         '#f5f5f5',
    bgGrad: ['#f5f5f5', '#f5f5f5', '#f5f5f5'],
  },
  statusBar: { ...Light.statusBar,
    bg: '#f5f5f5',
  },
  nav: { ...Light.nav,
    bg: '#ffffff',
  },
  navButton: { ...Light.navButton,
    bgFc:      '#ffeaee',
    ct:        '#333333',
    cta:       '#BB2649',
  },
  
  boxNormal: { ...Light.boxNormal,
    bg:       '#ffffff',
    bg2:      '#f0f0f0',
    ct:   '#000000',
    ct2:  '#555555',
    ct3:  '#7b7b7b',
  },
  boxAccent: { ...Light.boxAccent,
    bg:       '#ff8ea9',
    bgf:  '#f17492',
    ct:   '#F8F8F8',
  },
  boxAccent4: { ...Light.boxAccent4,
    bg:     '#ffaeba',
    ct: '#000000',
  },
  boxAccentCt4: { ...Light.boxAccentCt4,
    ct:           '#f17492',
    ctGrad:       ['#f17492', '#d93b5f'],
    ctf:          '#f17492',
  },
  
  buttonMain: { ...Light.buttonMain,
    bg:      '#BB2649',
    ct:      '#F8F8F8',
    bgFc: '#d93b5f',
    ctFc:    '#F8F8F8',
  },
  buttonSecondary: { ...Light.buttonSecondary,
  
  },
  inputRadio: { ...Light.inputRadio,
    bgFc:  '#f37190',
  },
  
  input: { ...Light.input,
    bg:           '#F8F8F8',
    ct:       '#000000',
    placeholder:   ['#777777'],
    borderGrad:        ['#fb3570', '#fb3570'],
    borderHover:   ['#9c20aa'],
    bgError:      ['#ffced2'],
  },
  
  ripple: { ...Light.ripple,
    ct:              '#ffffff',
    ctOnTrans: '#666666',
  },
  
  photos: { ...Light.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffbaba'],
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bg:     '#ffffff',
  },
  
  bottomSheetHandle: { ...Light.bottomSheetHandle,
    bg:     '#8b8b8b',
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
    accentColor: LightPinkProps.boxAccent.bg,
    bgColor1:    LightPinkProps.boxAccent.bg,
    bgColor2:    LightPinkProps.boxNormal.bg2,
  })),
} satisfies Theme

