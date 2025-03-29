import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.tsx'
import Theme = AppTheme.Theme
import themeGradIconCss = AppTheme.themeGradIconCss




export const DarkPinkGradient = { ...DarkPink,
  type: 'dark',
  name: 'Dark Pink Gradient' as const,
  icon: (
    <div
      css={themeGradIconCss({
        accentColor: '#d16780',
        bgColor1:    '#d16780',
        bgColor2:    '#282c34',
      })}
    />
  ),
  
  
  
  page: { ...DarkPink.page,
    bgGrad: ['#992c46', '#282c34', '#282c34'],
    //bg: ['#992c46','#282c34','#994500'],
  },
  statusBar: { ...DarkPink.statusBar,
    bg: '#992c46',
  },
  nav: { ...DarkPink.nav,
    bg: '#282c34',
  },
  navButton: { ...DarkPink.navButton,
    cta: '#d92a54',
  },
  
  inputRadio: { ...DarkPink.inputRadio,
    bgFc:  '#d16780',
  },
  
} satisfies Theme


