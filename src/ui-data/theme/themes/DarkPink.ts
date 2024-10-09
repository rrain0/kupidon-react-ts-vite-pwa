import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkProps } from 'src/ui-data/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss
import ThemeProps = AppTheme.ThemeProps




export const DarkPinkProps: ThemeProps = { ...DarkProps,
  
  page: { ...DarkProps.page,
    bg:          ['#18191b'],
    bgGradient:  ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...DarkProps.statusBar,
    bg: ['#282c34'],
  },
  nav: { ...DarkProps.nav,
    bg: ['#282c34'],
  },
  navButton: { ...DarkProps.navButton,
    bgFocus:      ['#2e3440'],
    content:       ['#bdbdbd'],
    contentAccent: ['#984559'],
  },
  
  containerNormal: { ...DarkProps.containerNormal,
    bg:       ['#000000'],
    bg2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
  },
  containerAccent: { ...DarkProps.containerAccent,
    bg:     ['#992c46'],
    content: ['#bdbdbd'],
  },
  
  buttonMain: { ...DarkProps.buttonMain,
    bg:      ['#971f3b'],
    bgFocus: ['#c6294e'],
    content:  ['#bdbdbd'],
  },
  buttonAccent: { ...DarkProps.buttonAccent,
    bg:           ['#d16780'],
    content:       ['#cdcdcd'],
    bgFocus:      ['#da5474'],
    contentFocus:  ['#000000'],
  },
  buttonSecondary: { ...DarkProps.buttonSecondary,
  
  },
  inputRadio: { ...DarkProps.inputRadio,
    bgFocus:  ['#d16780'],
  },
  buttonTransparent: { ...DarkProps.buttonTransparent,
    bgFocus: ['#ffffff22'],
  },
  
  iconGradient: { ...DarkProps.iconGradient,
    content:       ['#984559', '#984559'],
  },
  
  input: { ...DarkProps.input,
    bg:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#b32e56', '#b32e56'],
    borderHover:   ['#2393c6'],
    bgError:      ['#5e252c'],
  },
  
  elementDisabled: { ...DarkProps.elementDisabled,
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...DarkProps.elementDanger,
    bg:      ['#ac2c26'],
    bgFocus: ['#c43730'],
    content:  ['#bdbdbd'],
  },
  elementError: { ...DarkProps.elementError,
  
  },
  
  ripple: { ...DarkProps.ripple,
    content:              ['#000000'],
    contentOnTransparent: ['#aaaaaa'],
  },
  
  photos: { ...DarkProps.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...DarkProps.bottomSheet,
    bg:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...DarkProps.toast,
    bg:                  ['#121212'],
    content:              ['#ffffff'],
    content2:             ['#b8b8b8'],
    content3:             ['#ffffff'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBg:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
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
    bgColor2:   DarkPinkProps.page.bg[0],
  })),
} satisfies Theme

