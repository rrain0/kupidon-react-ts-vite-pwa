import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { Dark } from 'src/ui-data/theme/themes/Dark.ts'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




const DarkBurgundyProps = { ...Dark,
  
  page: { ...Dark.page,
    bg:         ['#18191b'],
    bgGradient: ['#282c34','#282c34','#282c34'],
  },
  statusBar: { ...Dark.statusBar,
    bg: ['#282c34'],
  },
  nav: { ...Dark.nav,
    bg: ['#282c34'],
  },
  navButton: { ...Dark.navButton,
    bgFocus:      ['#2e3440'],
    content:       ['#7b7b7b'],
    contentAccent: ['#b7405c'], // ['#984559']
  },
  
  containerNormal: { ...Dark.containerNormal,
    bg:       ['#24272d'],
    bg2:      ['#282c34'],
    content:   ['#bdbdbd'],
    content2:  ['#999999'],
    content3:  ['#7b7b7b'],
    contentAccent:   ['#b7405c'], // ['#984559']
    contentAccent2:  ['#F75F82'],
    contentAccent3:  ['#BB2649'],
  },
  containerAccent: { ...Dark.containerAccent,
    bg:      ['#aaaaaa'],
    bg2:     ['#bdbdbd'], // ['#984559']
    content:  ['#000000'],
    content2: ['#000000'],
  },
  
  buttonMain: { ...Dark.buttonMain,
    bg:      ['#aaaaaa'],
    bgFocus: ['#bbbbbb'],
    content:  ['#000000'],
  },
  buttonAccent: { ...Dark.buttonAccent,
    bg:           ['#bdbdbd'],
    content:       ['#000000'],
    bgFocus:      ['#7b7b7b'],
    contentFocus:  ['#000000'],
  },
  buttonNormal: { ...Dark.buttonNormal,
    bg:            ['#999999'],
    content:        ['#000000'],
    bgFocus:       ['#7b7b7b'],
    contentFocus:   ['#000000'],
  },
  buttonSecondary: { ...Dark.buttonSecondary,
    bg:       ['transparent'],
    bgFocus:  ['#7b7b7b88'],
    content:   ['#999999'],
  },
  inputRadio: { ...Dark.inputRadio,
    bgFocus:  ['#aaaaaa']
  },
  buttonTransparent: { ...Dark.navButton,
    bgFocus: ['#ffffff22'],
  },
  
  iconGradient: { ...Dark.iconGradient,
    content:       ['#BB2649','#F75F82'],
  },
  
  input: { ...Dark.input,
    bg:           ['#282c34'],
    content:       ['#cdcdcd'],
    placeholder:   ['#7b7b7b'],
    border:        ['#7b7b7b','#7b7b7b'],
    borderHover:   ['#7b7b7b'],
    bgError:      ['#5e252c'],
  },
  
  rangePicker: { ...Dark.rangePicker,
    trackBg:      ['#2e343f'],
    barBg:        ['#bdbdbd'],
    handleBg:     ['#000000'],
  },
  
  elementDisabled: { ...Dark.elementDisabled,
    bg:     ['#DCDCDC'],
    content: ['#555555'],
  },
  elementDanger: { ...Dark.elementDanger,
    bg:      ['#bbbbbb'],
    bgFocus: ['#cccccc'],
    content:  ['#000000'],
  },
  elementError: { ...Dark.elementError,
    bg:      ['#5e252c'],
  },
  
  ripple: { ...Dark.ripple,
    content:              ['#000000'],
    contentOnTransparent: ['#aaaaaa'],
  },
  
  photos: { ...Dark.photos,
    bg:                     ['#ffeeee'],
    content:                 ['#291f1d'],
    borderDrag:              ['#1F8DCD'],
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...Dark.bottomSheet,
    bg:    ['#121212'],
    handle: ['#8b8b8b'],
  },
  
  toast: { ...Dark.toast,
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
    accentColor: DarkBurgundyProps.containerNormal.contentAccent3[0],
    bgColor1:   DarkBurgundyProps.containerNormal.contentAccent2[0],
    bgColor2:   DarkBurgundyProps.page.bg[0],
  })),
} satisfies Theme

