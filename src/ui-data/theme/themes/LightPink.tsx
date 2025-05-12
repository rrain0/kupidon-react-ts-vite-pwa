import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { Light } from 'src/ui-data/theme/themes/Light.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const LightPink = { ...Light,
  type: 'light',
  name: 'Light Pink' as const,
  icon: (
    <div
      css={themeIconCss({
        accentColor: '#ff8ea9',
        bgColor1:    '#ff8ea9',
        bgColor2:    '#f0f0f0',
      })}
    />
  ),
  
  
  
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
  
  boxDefault: { ...Light.boxDefault,
    bg:       '#ffffff',
    ct:  '#555555',
  },
  boxDefault2: { ...Light.boxDefault2,
    bg:       '#ffffff',
    ct:   '#000000',
  },
  boxDefault3: { ...Light.boxDefault3,
    bg:       '#f0f0f0',
    ct:   '#000000',
  },
  boxDefault4: { ...Light.boxDefault4,
    ct:   '#7b7b7b',
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
  boxMain: { ...Light.boxMain,
    bg:      '#BB2649',
    ct:      '#F8F8F8',
    bgFc: '#d93b5f',
    ctFc:    '#F8F8F8',
  },
  inputRadio: { ...Light.inputRadio,
    bgFc:  '#f37190',
  },
  
  input: { ...Light.input,
    bg:           '#F8F8F8',
    ct:       '#000000',
    placeholder:   '#777777',
    borderGrad:        ['#fb3570', '#fb3570'],
    borderHover:   '#9c20aa',
    bgError:       '#ffced2',
  },
  
  ripple: { ...Light.ripple,
    ct:              '#ffffff',
    ctOnTrans: '#666666',
  },
  
  photos: { ...Light.photos,
    highlightFrameBg:       '#8B8B8B',
    highlightFrameAccentBg: '#ffbaba',
  },
  
  bottomSheet: { ...Light.bottomSheet,
    bg:     '#ffffff',
  },
  
  bottomSheetHandle: { ...Light.bottomSheetHandle,
    bg:     '#8b8b8b',
  },
  
  
  scrollbar: { ...Light.scrollbar,
    track: '#25283622',
    thumb: '#25283644',
  },
  
} satisfies Theme

