import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Dark } from 'src/ui-data/theme/themes/Dark.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const DarkPink = { ...Dark,
  type: 'dark',
  name: 'Dark Pink' as const,
  icon: (
    <div
      css={themeIconCss({
        accentColor: '#d16780',
        bgColor1:    '#d16780',
        bgColor2:    '#282c34',
      })}
    />
  ),
  
  
  
  page: { ...Dark.page,
    bg:          '#282c34',
    bgGrad:  ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...Dark.statusBar,
    bg: '#282c34',
  },
  nav: { ...Dark.nav,
    bg: '#282c34',
  },
  navButton: { ...Dark.navButton,
    bgFc:      '#2e3440',
    ct:       '#bdbdbd',
    cta: '#984559',
  },
  
  boxDefault: { ...Dark.boxDefault,
    bg:       '#000000',
    bg2:      '#282c34',
    ct:   '#bdbdbd',
    ct2:  '#999999',
    ct3:  '#7b7b7b',
  },
  boxAccent: { ...Dark.boxAccent,
    bg:           '#d16780',
    ct:       '#cdcdcd',
    bgf:      '#da5474',
    ctf:  '#000000',
  },
  boxAccent4: { ...Dark.boxAccent4,
    bg:     '#992c46',
    ct: '#bdbdbd',
  },
  boxAccentCt4: { ...Dark.boxAccentCt4,
    ct:           '#984559',
    ctGrad:       ['#984559', '#da5474'],
    ctf:          '#984559',
  },
  boxMain: { ...Dark.boxMain,
    bg:      '#971f3b',
    ct:      '#bdbdbd',
    bgFc:    '#c6294e',
    ctFc:    '#bdbdbd',
  },
  inputRadio: { ...Dark.inputRadio,
    bgFc:  '#d16780',
  },
  
  input: { ...Dark.input,
    bg:           '#282c34',
    ct:       '#cdcdcd',
    placeholder:   '#7b7b7b',
    borderGrad:        ['#b32e56', '#b32e56'],
    borderHover:   '#2393c6',
    bgError:       '#5e252c',
  },
  
  ripple: { ...Dark.ripple,
    ct:              '#000000',
    ctOnTrans: '#aaaaaa',
  },
  
  photos: { ...Dark.photos,
    highlightFrameBg:       ['#8B8B8B'],
    highlightFrameAccentBg: ['#ffe1e1'],
  },
  
  bottomSheet: { ...Dark.bottomSheet,
    bg:     '#121212',
  },
  
  bottomSheetHandle: { ...Dark.bottomSheetHandle,
    bg:     '#8b8b8b',
  },
  
  
  scrollbar: { ...Dark.scrollbar,
    track: ['#F8F8F822'],
    thumb: ['#F8F8F844'],
  },
  
} satisfies Theme

