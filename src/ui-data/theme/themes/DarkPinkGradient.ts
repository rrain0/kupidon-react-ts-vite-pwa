import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themegradIconCss = AppTheme.themegradIconCss
import ThemeProps = AppTheme.ThemeProps





export const DarkPinkGradientProps: ThemeProps = { ...DarkPink,
  
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
  
  inputRadio: { ...DarkPink.buttonMain,
    bgFc:  '#d16780',
  },
}



export const DarkPinkGradient = {
  ...DarkPinkGradientProps,
  type: 'dark',
  name: 'Dark Pink Gradient' as const,
  icon: styled.div(themegradIconCss({
    accentColor: DarkPinkGradientProps.boxAccent.bg,
    bgColor1:    DarkPinkGradientProps.boxAccent.bg,
    bgColor2:    DarkPinkGradientProps.page.bg,
  })),
} satisfies Theme


