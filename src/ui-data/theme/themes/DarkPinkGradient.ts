import styled from '@emotion/styled'
import { AppTheme } from 'src/util/theme/AppTheme.ts'
import { DarkPink } from 'src/ui-data/theme/themes/DarkPink.ts'
import Theme = AppTheme.Theme
import themeIconGradientCss = AppTheme.themeIconGradientCss





const DarkPinkGradientProps = { ...DarkPink,
  
  page: {
    ...DarkPink.page,
    bgGradient: ['#992c46','#282c34','#282c34'],
    //bg: ['#992c46','#282c34','#994500'],
  },
  statusBar: {
    ...DarkPink.statusBar,
    bg: ['#992c46'],
  },
  nav: {
    ...DarkPink.nav,
    bg: ['#282c34'],
  },
  navButton: {
    ...DarkPink.navButton,
    contentAccent: ['#d92a54'],
  },
  
  inputRadio: {
    ...DarkPink.buttonMain,
    bgFocus:  ['#d16780'],
  },
}



export const DarkPinkGradient = {
  ...DarkPinkGradientProps,
  name: 'Dark Pink Gradient' as const,
  icon: styled.div(themeIconGradientCss({
    accentColor: DarkPinkGradientProps.buttonAccent.bg[0],
    bgColor1:   DarkPinkGradientProps.buttonAccent.bg[0],
    bgColor2:   DarkPinkGradientProps.page.bg[0],
  })),
} satisfies Theme


