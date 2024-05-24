import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { DarkSimple } from 'src/ui/theme/themes/DarkSimple.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkSimplePinkProps = { ...DarkSimple,
  containerNormal: { ...DarkSimple.containerNormal,
    bgc:       ['#24272d'],
    bgc2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
    contentAccent:   ['#b7405c'], // ['#984559']
    contentAccent2:  ['#2e343f'],
    contentGradIcon: ['#BB2649','#F75F82'],
  },
  containerAccent: { ...DarkSimple.containerAccent,
    bgc:      ['#aaaaaa'],
    bgc2:     ['#bdbdbd'], // ['#984559']
    content:  ['#000000'],
    content2: ['#000000'],
  },
  
  buttonMain: { ...DarkSimple.buttonMain,
    bgc:      ['#aaaaaa'],
    bgcFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: { ...DarkSimple.buttonAccent,
    bgc:       ['#999999'],
    bgcFocus:  ['#7b7b7b'],
    content:   ['#000000'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...DarkSimple.buttonSecondary,
    bgc:       ['transparent'],
    bgcFocus:  ['#7b7b7b88'],
    content:   ['#999999'],
  },
  inputRadio: { ...DarkSimple.inputRadio,
    bgcFocus:  ['#aaaaaa']
  },
  buttonTransparent: { ...DarkSimple.buttonNav,
    bgcFocus: ['#ffffff22'],
  },
  buttonNav: { ...DarkSimple.buttonNav,
    bgcFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#b7405c'], // ['#984559']
  },
  
  input: { ...DarkSimple.input,
    bgc:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#5e252c'],
  },
  
  elementDisabled: { ...DarkSimple.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...DarkSimple.elementDanger,
    bgc:      ['#bbbbbb'],
    bgcFocus: ['#cccccc'],
    content:  ['#000000'],
  },
  elementError: { ...DarkSimple.elementError,
    bgc:      ['#5e252c'],
  },
  
  ripple: { ...DarkSimple.ripple,
    content:              ['#000000'],
    contentOnTransparent: ['#ffffff88'],
  },
  
  photos: { ...DarkSimple.photos,
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBgc:       ['#8B8B8B'],
    highlightFrameAccentBgc: ['#ffe1e1'],
  },
  
  bottomSheet: { ...DarkSimple.bottomSheet,
    bgc:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  card: { ...DarkSimple.card,
    bgc: ['#00000000'],
  },
  page: { ...DarkSimple.page,
    bgc:         ['#18191b'],
    bgcGradient: ['#282c34','#282c34','#282c34'],
  },
  
  statusBar: { ...DarkSimple.statusBar,
    bgc: ['#282c34'],
  },
  nav: { ...DarkSimple.nav,
    bgc: ['#282c34'],
  },
  
  toast: { ...DarkSimple.toast,
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
  scrollbar: { ...DarkSimple.scrollbar,
    track:       ['#F8F8F822'],
    thumb:       ['#F8F8F844'],
    thumbActive: ['#999999'],
  },
}



export const DarkSimplePink = {
  ...DarkSimplePinkProps,
  type: 'dark',
  name: 'Dark Simple Pink' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkSimplePinkProps.photos.highlightFrameAccentBgc[0],
    bgcColor1:   DarkSimplePinkProps.photos.highlightFrameAccentBgc[0],
    bgcColor2:   DarkSimplePinkProps.page.bgc[0],
  })),
} satisfies Theme

