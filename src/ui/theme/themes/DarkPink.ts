import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { Dark } from 'src/ui/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkPinkProps = { ...Dark,
  
  page: { ...Dark.page,
    bgc:         ['#18191b'],
    bgcGradient: ['#282c34','#282c34','#282c34'],
    content:     ['#bdbdbd','#ffffff'],
  },
  statusBar: { ...Dark.statusBar,
    bgc: ['#984559'],
  },
  nav: { ...Dark.nav,
    bgc: ['#282c34'],
  },
  
  containerNormal: { ...Dark.containerNormal,
    bgc:       ['#000000'],
    bgc2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
    contentGradIcon: ['#984559','#984559'],
  },
  containerAccent: { ...Dark.containerAccent,
    bgc:     ['#992c46'],
    content: ['#bdbdbd'],
  },
  
  buttonMain: { ...Dark.buttonMain,
    bgc:      ['#971f3b'],
    bgcFocus: ['#c6294e'],
    content:  ['#bdbdbd'],
  },
  buttonAccent: { ...Dark.buttonAccent,
    bgc:       ['#d16780'],
    bgcFocus:  ['#da5474'],
    content:   ['#cdcdcd'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...Dark.buttonSecondary,
  
  },
  inputRadio: { ...Dark.inputRadio,
    bgcFocus:  ['#d16780']
  },
  buttonTransparent: { ...Dark.buttonTransparent,
    bgcFocus: ['#ffffff22'],
  },
  buttonNav: { ...Dark.buttonNav,
    bgcFocus:      ['#2e3440'],
    content:       ['#bdbdbd'],
    contentAccent: ['#984559'],
  },
  
  input: { ...Dark.input,
    bgc:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#b32e56','#b32e56'],
    borderHover:   ['#2393c6'],
    bgcError:      ['#5e252c'],
  },
  
  elementDisabled: { ...Dark.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Dark.elementDanger,
    bgc:      ['#ac2c26'],
    bgcFocus: ['#c43730'],
    content:  ['#bdbdbd'],
  },
  elementError: { ...Dark.elementError,
  
  },
  
  ripple: { ...Dark.ripple,
    content:              ['#000000'],
    contentOnTransparent: ['#ffffff88'],
  },
  
  photos: { ...Dark.photos,
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffe1e1'],
  },
  
  bottomSheet: { ...Dark.bottomSheet,
    bgc:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Dark.toast,
    bgc:                  ['#121212'],
    content:              ['#ffffff'],
    content2:             ['#b8b8b8'],
    content3:             ['#ffffff'],
    accentNormal:         ['#bb86fc'],
    accentLoadingBgc:     ['#e0e0e0'],
    accentLoadingContent: ['#616161'],
    accentInfo:           ['#3498db'],
    accentOk:             ['#07bc0c'],
    accentWarn:           ['#f1c40f'],
    accentDanger:         ['#e74c3c'],
  },
  scrollbar: { ...Dark.scrollbar,
    track: ['#F8F8F822'],
    thumb: ['#F8F8F844'],
  },
}



export const DarkPink = {
  ...DarkPinkProps,
  type: 'dark',
  name: 'Dark Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkPinkProps.buttonAccent.bgc[0],
    bgcColor1:   DarkPinkProps.buttonAccent.bgc[0],
    bgcColor2:   DarkPinkProps.page.bgc[0],
  })),
} satisfies Theme

