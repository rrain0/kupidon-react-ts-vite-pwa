import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const DarkOrange = { ...DarkPink,
  type: 'dark',
  name: 'Dark Orange' as const,
  icon: (
    <div
      css={themeIconCss({
        accentColor: '#dd8f2f',
        bgColor1:    '#dd8f2f',
        bgColor2:    '#282c34',
      })}
    />
  ),
  
  
  
  statusBar: { ...DarkPink.statusBar,
    bg: '#dd8f2f',
  },
  nav: { ...DarkPink.nav,
    bg: '#282c34',
  },
  navButton: { ...DarkPink.navButton,
    cta: '#dd7b39',
  },
  
  boxAccent: { ...DarkPink.boxAccent,
    bg:           '#dd8f2f',
    ct:       '#000000',
    bgf:      '#f3b238',
    ctf:  '#000000',
  },
  boxAccent4: { ...DarkPink.boxAccent4,
    bg:     '#dd7b39',
  },
  boxMain: { ...DarkPink.boxMain,
    bg:      '#ff935e',
    ct:      '#000000',
    bgFc:    '#ff802a',
    ctFc:    '#000000',
  },
  inputRadio: { ...DarkPink.inputRadio,
    bgFc:  '#d9816f',
  },
  
  input: { ...DarkPink.input,
    borderGrad:      ['#ef7b7d', '#ef7b7d'],
    borderHover: '#00a8f3',
  },
  
  bottomSheetHandle: { ...DarkPink.bottomSheetHandle,
    bg: '#ff935e',
  },
  
} satisfies Theme
