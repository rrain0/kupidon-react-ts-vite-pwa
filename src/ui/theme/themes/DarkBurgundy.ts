import styled from '@emotion/styled'
import { AppTheme } from '@util/theme/AppTheme.ts'
import { Dark } from 'src/ui/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkBurgundyProps = { ...Dark,
  
  page: { ...Dark.page,
    bgc:         ['#18191b'],
    bgcGradient: ['#282c34','#282c34','#282c34'],
  },
  statusBar: { ...Dark.statusBar,
    bgc: ['#282c34'],
  },
  nav: { ...Dark.nav,
    bgc: ['#282c34'],
  },
  
  containerNormal: { ...Dark.containerNormal,
    bgc:       ['#24272d'],
    bgc2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
    contentAccent:   ['#b7405c'], // ['#984559']
    contentAccent2:  ['#2e343f'],
    contentGradIcon: ['#BB2649','#F75F82'],
  },
  containerAccent: { ...Dark.containerAccent,
    bgc:      ['#aaaaaa'],
    bgc2:     ['#bdbdbd'], // ['#984559']
    content:  ['#000000'],
    content2: ['#000000'],
  },
  
  buttonMain: { ...Dark.buttonMain,
    bgc:      ['#aaaaaa'],
    bgcFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: { ...Dark.buttonAccent,
    bgc:       ['#999999'],
    bgcFocus:  ['#7b7b7b'],
    content:   ['#000000'],
    content2:  ['#000000'],
  },
  buttonSecondary: { ...Dark.buttonSecondary,
    bgc:       ['transparent'],
    bgcFocus:  ['#7b7b7b88'],
    content:   ['#999999'],
  },
  inputRadio: { ...Dark.inputRadio,
    bgcFocus:  ['#aaaaaa']
  },
  buttonTransparent: { ...Dark.buttonNav,
    bgcFocus: ['#ffffff22'],
  },
  buttonNav: { ...Dark.buttonNav,
    bgcFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#b7405c'], // ['#984559']
  },
  
  input: { ...Dark.input,
    bgc:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgcError:      ['#5e252c'],
  },
  
  rangePicker: { ...Dark.rangePicker,
  
  },
  
  elementDisabled: { ...Dark.elementDisabled,
    bgc:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Dark.elementDanger,
    bgc:      ['#bbbbbb'],
    bgcFocus: ['#cccccc'],
    content:  ['#000000'],
  },
  elementError: { ...Dark.elementError,
    bgc:      ['#5e252c'],
  },
  
  ripple: { ...Dark.ripple,
    content:              ['#000000'],
    contentOnTransparent: ['#ffffff88'],
  },
  
  photos: { ...Dark.photos,
    bgc:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
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
    track:       ['#F8F8F822'],
    thumb:       ['#F8F8F844'],
    thumbActive: ['#999999'],
  },
}



export const DarkBurgundy = {
  ...DarkBurgundyProps,
  type: 'dark',
  name: 'Dark Burgundy' as const,
  icon: styled.div(themeIconCss({
    accentColor: DarkBurgundyProps.photos.highlightFrameAccentBgc[0],
    bgcColor1:   DarkBurgundyProps.photos.highlightFrameAccentBgc[0],
    bgcColor2:   DarkBurgundyProps.page.bgc[0],
  })),
} satisfies Theme

