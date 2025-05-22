import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.tsx'
import Theme = AppTheme.Theme
import themeIconCss = AppTheme.themeIconCss




export const LightOrange = { ...LightPink,
  type: 'light',
  name: 'Light Orange' as const,
  icon: (
    <div
      css={themeIconCss({
        colorAccent: '#fbb027',
        bgColor1:    '#fbb027',
        bgColor2:    '#ffffff',
      })}
    />
  ),
  
  
  
  statusBar: { ...LightPink.statusBar,
    bg: '#ffdb99',
  },
  nav: { ...LightPink.nav,
    bg: '#ffdb99',
  },
  navButton: { ...LightPink.navButton,
    bgFc:      '#ffffff',
    cta: '#ff802a',
  },
  
  boxAccent: { ...LightPink.boxAccent,
    bg:       '#fbb027',
    bgf:  '#ffb833',
  },
  boxAccent4: { ...LightPink.boxAccent4,
    bg:     '#fdca6d',
  },
  boxMain: { ...LightPink.boxMain,
    bg:      '#ff935e',
    bgFc: '#ff802a',
  },
  inputRadio: { ...LightPink.inputRadio,
    bgFc:  '#ffb833',
  },
  
  input: { ...LightPink.input,
    borderGrad:      ['#ef7b7d', '#ef7b7d'],
    borderHover: '#00a8f3',
  },
  
  bottomSheetHandle: { ...LightPink.bottomSheetHandle,
    bg:       '#ff935e',
  },
  
} satisfies Theme
