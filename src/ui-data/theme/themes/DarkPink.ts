import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkProps } from 'src/ui-data/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkPinkProps: ThemeProps = { ...DarkProps,
  
  page: { ...DarkProps.page,
    bg:          '#18191b',
    bgGrad:  ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...DarkProps.statusBar,
    bg: '#282c34',
  },
  nav: { ...DarkProps.nav,
    bg: '#282c34',
  },
  navButton: { ...DarkProps.navButton,
    bgFc:      '#2e3440',
    ct:       ['#bdbdbd'],
    cta: '#984559',
  },
  
  boxNormal: { ...DarkProps.boxNormal,
    bg:       ['#000000'],
    bg2:      ['#282c34'],
    ct:   ['#bdbdbd'],
    ct2:  ['#999999'],
    ct3:  '#7b7b7b',
  },
  boxAccent: { ...DarkProps.boxAccent,
    bg:     ['#992c46'],
    ct: ['#bdbdbd'],
  },
  
  buttonMain: { ...DarkProps.buttonMain,
    bg:      ['#971f3b'],
    ct:      ['#bdbdbd'],
    bgFc:    '#c6294e',
    ctFc:    '#bdbdbd',
  },
  buttonAccent: { ...DarkProps.buttonAccent,
    bg:           ['#d16780'],
    ct:       ['#cdcdcd'],
    bgFc:      '#da5474',
    ctFc:  '#000000',
  },
  buttonSecondary: { ...DarkProps.buttonSecondary,
  
  },
  inputRadio: { ...DarkProps.inputRadio,
    bgFc:  '#d16780',
  },
  buttonTrans: { ...DarkProps.buttonTrans,
    bgFc: '#ffffff22',
  },
  
  gradIcon: { ...DarkProps.gradIcon,
    ctGrad:       ['#984559', '#984559'],
  },
  
  input: { ...DarkProps.input,
    bg:           ['#282c34'],
    ct:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    borderGrad:        ['#b32e56', '#b32e56'],
    borderHover:   ['#2393c6'],
    bgError:      ['#5e252c'],
  },
  
  elementDisabled: { ...DarkProps.elementDisabled,
    bg:     ['#DCDCDC'],
    ct: ['#555555'],
  },
  elementDanger: { ...DarkProps.elementDanger,
    bg:      ['#ac2c26'],
    bgFc: '#c43730',
    ct:  ['#bdbdbd'],
  },
  elementError: { ...DarkProps.elementError,
  
  },
  
  ripple: { ...DarkProps.ripple,
    ct:              '#000000',
    ctOnTrans: '#aaaaaa',
  },
  
  photos: { ...DarkProps.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...DarkProps.bottomSheet,
    bg:     '#121212',
  },
  
  bottomSheetHandle: { ...DarkProps.bottomSheetHandle,
    bg:     '#8b8b8b',
  },
  
  toast: { ...DarkProps.toast,
    bg:                   ['#121212'],
    ct:                   ['#ffffff'],
    ct2:                  ['#b8b8b8'],
    ct3:                  '#ffffff',
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:      ['#e0e0e0'],
    accentLoadingCt:      ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...DarkProps.scrollbar,
    track: ['#F8F8F822'],
    thumb: ['#F8F8F844'],
  },
}



export const DarkPink = {
  ...DarkPinkProps,
  type: 'dark',
  name: 'Dark Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkPinkProps.buttonAccent.bg[0],
    bgColor1:   DarkPinkProps.buttonAccent.bg[0],
    bgColor2:   DarkPinkProps.page.bg,
  })),
} satisfies Theme

