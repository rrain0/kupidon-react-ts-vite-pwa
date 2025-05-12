import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Dark } from 'src/ui-data/theme/themes/Dark.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const DarkWine = { ...Dark,
  type: 'dark',
  name: 'Dark Wine' as const,
  icon: (
    <div
      css={themeIconCss({
        accentColor: '#a71538',
        bgColor1:    '#a71538',
        bgColor2:    '#282c34',
      })}
    />
  ),
  
  
  
  page: { ...Dark.page,
    bg:            '#282c34', // #18191b
    bgGrad:        ['#282c34', '#282c34', '#282c34'],
  },
  statusBar: { ...Dark.statusBar,
    bg:            '#282c34',
  },
  nav: { ...Dark.nav,
    bg:            '#282c34',
  },
  navButton: { ...Dark.navButton,
    bgFc:          '#2e3440',
    ct:            '#7b7b7b',
    cta:           '#b7405c', // '#984559'
  },
  
  
  
  boxAccent: { ...Dark.boxAccent,
    bg:            '#a71538',
    ct:            '#ffffff',
    bgf:           '#c1163e',
    ctf:           '#ffffff',
  },
  boxAccentCt: { ...Dark.boxAccentCt,
    bg:            'transparent',
    ct:            '#a71538',
    bgf:           '#ff5c8344',
    ctf:           '#a71538',
    ctRipple:      '#ffd0db55',
  },
  boxAccent2: { ...Dark.boxAccent2,
    bg:            '#c51841',
    ct:            '#ffffff',
    bgFc:          '#e83f66',
    ctFc:          '#ffffff',
  },
  boxAccent3: { ...Dark.boxAccent3,
    bg:            '#f6839e',
    ct:            '#ffffff',
    bgFc:          '#F59CB1',
    ctFc:          '#ffffff',
  },
  boxAccent4: { ...Dark.boxAccent4,
    bg:            '#BB2649',
    ct:            '#ffffff',
    // cta:           '#b7405c', // '#984559'
    // cta2:          '#b7405c',
    // cta3:          '#BB2649',
  },
  boxAccentCt4: { ...Dark.boxAccentCt4,
    ct:            '#BB2649',
    ctGrad:        ['#BB2649', '#F75F82'],
    ctf:           '#BB2649',
  },
  boxAccent5: { ...Dark.boxAccent5,
    ct:            '#c51841',
  },
  boxMain: { ...Dark.boxMain,
    bg:            '#aaaaaa',
    ct:            '#000000',
    bgFc:          '#bbbbbb',
    ctFc:          '#000000',
  },
  
  
  
  
  ripple: { ...Dark.ripple },
  
  
  
  inputRadio: { ...Dark.inputRadio,
    bgFc:          '#aaaaaa',
  },
  
  
  
  input: { ...Dark.input,
    bg:            '#282c34',
    ct:            '#cdcdcd',
    placeholder:   '#7b7b7b',
    borderGrad:    ['#7b7b7b', '#7b7b7b'],
    borderHover:   '#7b7b7b',
    bgError:       '#5e252c',
  },
  
  rangePicker: { ...Dark.rangePicker,
    trackBg:       '#2e343f',
    barBg:         '#bdbdbd',
    handleBg:      '#000000',
  },
  
  
  
  previewButtonNorm: { ...Dark.previewButtonNorm },
  previewButtonMain: { ...Dark.previewButtonMain,
    bgGrad:        ['#BB2649', '#F75F82'],
  },
  previewFullInfoBox: { ...Dark.previewFullInfoBox },
  previewFullInfoBubble: { ...Dark.previewFullInfoBubble,
    bgMainGrad:    ['#BB2649', '#F75F82'],
  },
  previewPhotosProgress: { ...Dark.previewPhotosProgress },
  
  
  
  photos: { ...Dark.photos,
    bg:                       '#ffeeee',
    ct:                       '#291f1d',
    borderDrag:               '#1F8DCD',
    highlightFrameBg:         '#8B8B8B',
    highlightFrameAccentBg:   '#ffe1e1',
  },
  
  bottomSheet: { ...Dark.bottomSheet },
  bottomSheetHandle: { ...Dark.bottomSheetHandle },
  
} satisfies Theme

