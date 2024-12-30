import styled from '@emotion/styled'
import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { DarkPinkProps } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss
import ThemeProps = AppTheme.ThemeProps





export const DarkPinkGradientProps: ThemeProps = { ...DarkPinkProps,
  
  page: {
    ...DarkPinkProps.page,
    bgGradient: ['#992c46', '#282c34', '#282c34'],
    //bg: ['#992c46','#282c34','#994500'],
  },
  statusBar: {
    ...DarkPinkProps.statusBar,
    bg: ['#992c46'],
  },
  nav: {
    ...DarkPinkProps.nav,
    bg: ['#282c34'],
  },
  navButton: {
    ...DarkPinkProps.navButton,
    cta: ['#d92a54'],
  },
  
  inputRadio: {
    ...DarkPinkProps.buttonMain,
    bgFocus:  ['#d16780'],
  },
}



export const DarkPinkGradient = {
  ...DarkPinkGradientProps,
  type: 'dark',
  name: 'Dark Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: DarkPinkGradientProps.buttonAccent.bg[0],
    bgColor1:   DarkPinkGradientProps.buttonAccent.bg[0],
    bgColor2:   DarkPinkGradientProps.page.bg,
  })),
} satisfies Theme


